import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  const pantry = products.filter((p) => p.categoryId === "pantry").slice(0, 4);
  const ready = products.filter((p) => p.categoryId === "ready");

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
        <div className="relative grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:gap-6 md:p-14">
          <div className="md:col-span-7 md:pr-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-kraft-dark">
              One store · One promise
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[0.95] text-foreground md:text-6xl">
              The whole grocery run, <br className="hidden md:block" />
              under one bag.
            </h1>
            <p className="mt-5 max-w-lg text-base text-foreground/70 md:text-lg">
              Fresh produce, pantry staples, dairy, snacks and ready meals — all
              hand-checked, packed, and delivered by Apna Mandi.
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

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-foreground/10 pt-6 text-xs">
              <div>
                <dt className="font-mono uppercase tracking-widest text-kraft-dark">Delivery</dt>
                <dd className="mt-1 font-mono text-lg font-medium">18 min</dd>
              </div>
              <div>
                <dt className="font-mono uppercase tracking-widest text-kraft-dark">Items</dt>
                <dd className="mt-1 font-mono text-lg font-medium">12,400+</dd>
              </div>
              <div>
                <dt className="font-mono uppercase tracking-widest text-kraft-dark">Rating</dt>
                <dd className="mt-1 font-mono text-lg font-medium">4.9</dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative aspect-square rotate-2 overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh produce"
                className="size-full object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-background/95 px-3 py-2 shadow-lg">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Today's harvest
                </p>
                <p className="font-heading text-sm font-bold">Vine tomatoes · ₹64</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden -rotate-3 rounded-2xl border border-foreground/10 bg-background p-3 shadow-xl md:block">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Delivered
              </p>
              <p className="mt-1 font-heading text-sm font-bold">Order #AM-8829</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                ₹616 · 22 min
              </p>
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
