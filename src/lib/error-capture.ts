// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.
//
// The captured error is held in a *request-scoped* slot via AsyncLocalStorage,
// not a module-level global. A module global is shared across every in-flight
// request, so under concurrency one request's 500 handler could consume a
// different request's error and log the wrong stack. Each request runs inside
// its own ALS context, so captures never cross request boundaries. Worst case
// is a miss (no stack), never a mix-up.

import { AsyncLocalStorage } from "node:async_hooks";

type CaptureSlot = { error: unknown };

const storage = new AsyncLocalStorage<CaptureSlot>();

/** Run the request handler inside a fresh capture context. */
export function runWithErrorCapture<T>(fn: () => Promise<T>): Promise<T> {
  return storage.run({ error: undefined }, fn);
}

function record(error: unknown) {
  const slot = storage.getStore();
  // Outside a request context (e.g. a global listener firing between requests)
  // there is nothing to attribute the error to — drop it rather than guess.
  if (slot) slot.error = error;
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  const slot = storage.getStore();
  if (!slot) return undefined;
  const { error } = slot;
  slot.error = undefined;
  return error;
}
