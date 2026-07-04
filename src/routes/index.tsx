import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products, getProduct } from "@/lib/mock-data";
import { formatPrice } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  component: Index,
});

// The department word in the hero headline cycles, tying the tagline to the
// new Departments menu. Held still when the visitor prefers reduced motion.
const DEPARTMENTS = ["produce", "pantry", "dairy", "kitchen", "snacks"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(() => setI((n) => (n + 1) % DEPARTMENTS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span key={i} className="am-word text-primary">
      {DEPARTMENTS[i]}
    </span>
  );
}

function Index() {
  const featured = products.slice(0, 4);
  const pantry = products.filter((p) => p.categoryId === "pantry").slice(0, 4);
  const ready = products.filter((p) => p.categoryId === "ready");

  // Two hand-picked products for the kraft "market crate" collage in the hero.
  const heroFront = getProduct("am-paneer-tikka")!;
  const heroBack = getProduct("am-avocado")!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-kraft">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(oklch(0.72 0.08 65 / 0.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-12 md:gap-6 md:p-14">
          <div className="md:col-span-6 md:pr-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-kraft-dark/30 bg-background/60 px-3 py-1 backdrop-blur">
              <span className="font-heading text-sm font-bold leading-none text-kraft-dark">मंडी</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-kraft-dark">
                One bag · One promise
              </span>
            </span>

            <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-[1.02] text-foreground md:text-5xl lg:text-6xl">
              Your whole <RotatingWord /> run,
              <br className="hidden lg:block" /> packed into one bag.
            </h1>

            <p className="mt-5 max-w-md text-base text-foreground/70 md:text-lg">
              Produce, pantry, dairy, snacks and ready meals — every department
              hand-checked and packed together, delivered by Apna Mandi.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-px"
              >
                Start shopping <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/orders/$id"
                params={{ id: "AM-9402" }}
                className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 bg-background/80 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur"
              >
                Track live order
              </Link>
            </div>

            {/* Receipt-style stat line */}
            <dl className="mt-9 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-dashed border-kraft-dark/40 pt-5">
              {[
                ["Avg delivery", "18 min"],
                ["In store", "12,400+"],
                ["Rating", "4.9 ★"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-kraft-dark">
                    {k}
                  </dt>
                  <dd className="font-mono text-base font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Kraft "market crate" collage */}
          <div className="relative min-h-[360px] md:col-span-6 md:min-h-[420px]">
            <div className="absolute inset-x-3 bottom-2 top-10 rounded-3xl border border-kraft-dark/25 bg-kraft-dark/10" />

            {/* Back card */}
            <div className="absolute right-3 top-0 w-40 rotate-6 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-xl md:right-6 md:w-52">
              <div className="aspect-square overflow-hidden">
                <img src={heroBack.image} alt={heroBack.name} className="size-full object-cover" loading="eager" />
              </div>
              <div className="px-3 py-2">
                <p className="line-clamp-1 text-xs font-semibold text-foreground">{heroBack.name}</p>
                <p className="font-mono text-[11px] font-bold text-sale">{formatPrice(heroBack.price)}</p>
              </div>
            </div>

            {/* Front card */}
            <div className="absolute bottom-4 left-1 w-48 -rotate-3 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-2xl md:left-2 md:w-64">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={heroFront.image} alt={heroFront.name} className="size-full object-cover" loading="eager" />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">{heroFront.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Chef's pick
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-ink px-2 py-1 font-mono text-xs font-bold text-background">
                  {formatPrice(heroFront.price)}
                </span>
              </div>
            </div>

            {/* Rubber-stamp seal */}
            <div className="absolute -right-1 bottom-10 z-20 rotate-[-12deg] md:right-4">
              <div className="grid size-20 place-items-center rounded-full border-2 border-dashed border-accent/60 bg-background/90 shadow-md backdrop-blur md:size-24">
                <p className="text-center font-mono text-[8px] font-bold uppercase leading-tight tracking-widest text-accent md:text-[9px]">
                  Quality
                  <br />
                  checked
                  <br />
                  <span className="text-base leading-none">✓</span>
                </p>
              </div>
            </div>

            {/* Packed chip */}
            <div className="absolute left-2 top-1 z-20 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                Packing now · 18 min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-3">
        {[
          { icon: Leaf, label: "Farm-direct freshness", note: "Sourced daily" },
          { icon: Truck, label: "18-minute delivery", note: "Free over ₹499" },
          { icon: ShieldCheck, label: "One quality standard", note: "The Apna Mandi promise" },
        ].map(({ icon: Icon, label, note }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {note}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              01 · Departments
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">Shop by aisle</h2>
          </div>
          <Link to="/browse" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/browse"
              search={{ category: c.id }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="aspect-[4/3] w-full"
                style={{ backgroundColor: c.tint }}
              >
                <div className="flex h-full items-end p-4">
                  <span className="font-heading text-2xl font-bold leading-none text-foreground">
                    {c.name.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {c.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured shelf */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              02 · Picked for you
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">This week's shelf</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Split promo */}
      <section className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-ink p-8 text-background">
          <p className="font-mono text-[11px] uppercase tracking-widest text-background/60">
            Ready-to-eat
          </p>
          <h3 className="mt-3 font-heading text-3xl font-bold">Kitchen off. Meal on.</h3>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Slow-cooked classics packed at 4pm, at your door by 7.
          </p>
          <Link
            to="/browse"
            search={{ category: "ready" }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-foreground"
          >
            Shop ready meals <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-kraft p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-kraft-dark">
            Pantry
          </p>
          <h3 className="mt-3 font-heading text-3xl font-bold">Restock the essentials.</h3>
          <p className="mt-3 max-w-sm text-sm text-foreground/70">
            Rice, oil, dals and grains — the everyday things, sorted.
          </p>
          <Link
            to="/browse"
            search={{ category: "pantry" }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background"
          >
            Shop pantry <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Pantry shelf */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              03 · Pantry
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">Everyday essentials</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {pantry.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Ready shelf */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              04 · Ready-to-eat
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">Meals in minutes</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {ready.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
