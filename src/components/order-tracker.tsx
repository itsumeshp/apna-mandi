import { Check, Package, Truck, Home } from "lucide-react";
import type { OrderStatus } from "@/lib/mock-data";

const steps: { id: OrderStatus; label: string; icon: typeof Check }[] = [
  { id: "placed", label: "Order placed", icon: Check },
  { id: "packed", label: "Packed", icon: Package },
  { id: "out_for_delivery", label: "Out for delivery", icon: Truck },
  { id: "delivered", label: "Delivered", icon: Home },
];

export function OrderTracker({
  status,
  etaMinutes,
  compact = false,
}: {
  status: OrderStatus;
  etaMinutes?: number;
  compact?: boolean;
}) {
  const currentIndex = steps.findIndex((s) => s.id === status);
  const progressPct = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={compact ? "" : "rounded-2xl border border-border bg-surface p-6"}>
      {!compact ? (
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Delivery status
            </p>
            <h3 className="mt-1 font-heading text-2xl font-bold">
              {status === "delivered"
                ? "Delivered"
                : etaMinutes
                  ? `Arriving in ${etaMinutes} min`
                  : "On the way"}
            </h3>
          </div>
        </div>
      ) : null}

      <div className="relative">
        <div className="absolute left-4 right-4 top-4 h-0.5 bg-border" />
        <div
          className="absolute left-4 top-4 h-0.5 bg-primary transition-all duration-700"
          style={{ width: `calc((100% - 2rem) * ${progressPct / 100})` }}
        />
        <ol className="relative grid grid-cols-4 gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i <= currentIndex;
            const active = i === currentIndex;
            return (
              <li key={step.id} className="flex flex-col items-center text-center">
                <div
                  className={`relative grid size-8 place-items-center rounded-full border-2 transition-colors ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {active && status !== "delivered" ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                  ) : null}
                </div>
                <p
                  className={`mt-2 text-[11px] font-medium ${
                    done ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
