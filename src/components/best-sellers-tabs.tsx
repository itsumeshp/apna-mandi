import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";

// Only tabs that actually have stock, so no empty panels.
const TABS = categories
  .filter((c) => products.some((p) => p.categoryId === c.id))
  .slice(0, 5);

export function BestSellersTabs() {
  const [active, setActive] = useState(TABS[0]?.id ?? "");
  const shown = products.filter((p) => p.categoryId === active).slice(0, 4);

  return (
    <section className="mt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Loved by the neighbourhood
          </p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">Best sellers</h2>
        </div>
        <div
          role="tablist"
          aria-label="Best sellers by aisle"
          className="flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1"
        >
          {TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/browse"
          search={{ category: active }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Shop all {TABS.find((t) => t.id === active)?.name}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
