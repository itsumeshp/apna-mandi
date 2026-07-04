import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, ShieldCheck, Truck, Leaf } from "lucide-react";
import { getProduct, products } from "@/lib/mock-data";
import { useCart, formatPrice } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Apna Mandi` },
          { name: "description", content: loaderData.product.description },
        ]
      : [{ title: "Product — Apna Mandi" }],
  }),
  component: PDP,
});

function PDP() {
  const { product } = Route.useLoaderData();
  const { add, setDrawerOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const onAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const onBuy = () => {
    add(product.id, qty);
    setDrawerOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <nav className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/browse" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="aspect-square">
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={`aspect-square overflow-hidden rounded-lg border ${
                  i === 0 ? "border-foreground" : "border-border"
                } bg-muted`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="size-full object-cover opacity-90"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Apna Mandi · {product.unit}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold leading-tight md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground">Inclusive of taxes</span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            {product.description}
          </p>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-mono text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid size-11 place-items-center hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                added
                  ? "bg-primary text-primary-foreground"
                  : "bg-ink text-background hover:-translate-y-px"
              }`}
            >
              {added ? (
                <>
                  <Check className="size-4" /> Added
                </>
              ) : (
                <>Add to basket · {formatPrice(product.price * qty)}</>
              )}
            </button>
            <button
              onClick={onBuy}
              className="rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
            >
              Buy now
            </button>
          </div>

          {/* Trust rail */}
          <ul className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-muted/40 p-4 sm:grid-cols-3">
            {[
              { icon: Leaf, t: "Farm-direct", s: "Sourced this week" },
              { icon: Truck, t: "18 min delivery", s: "Free over ₹499" },
              { icon: ShieldCheck, t: "Quality checked", s: "By Apna Mandi" },
            ].map(({ icon: Icon, t, s }) => (
              <li key={t} className="flex items-start gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-background text-primary">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Details table */}
          <dl className="mt-8 divide-y divide-border rounded-2xl border border-border">
            {[
              ["Category", product.categoryId],
              ["Pack size", product.unit],
              ["Storage", "Refrigerate on arrival"],
              ["Country of origin", "India"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] px-4 py-3 text-sm">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
                <dd className="capitalize">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length ? (
        <section className="mt-16">
          <h2 className="mb-6 font-heading text-2xl font-bold">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
