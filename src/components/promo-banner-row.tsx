import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/mock-data";

type Banner = {
  categoryId: string;
  eyebrow: string;
  title: string;
  note: string;
  productId: string;
};

// Three wide "Only This Week" banners — copy left, product image right.
const BANNERS: Banner[] = [
  {
    categoryId: "breakfast-dairy",
    eyebrow: "Only this week",
    title: "Farm eggs at an honest price",
    note: "Eat one every day",
    productId: "am-eggs",
  },
  {
    categoryId: "biscuits-snacks",
    eyebrow: "Only this week",
    title: "Snacks that nourish mind & body",
    note: "Shine through the morning",
    productId: "am-chips",
  },
  {
    categoryId: "grocery-staples",
    eyebrow: "Only this week",
    title: "Unbeatable quality, unbeatable prices",
    note: "Stock the pantry, save more",
    productId: "am-rice",
  },
];

export function PromoBannerRow() {
  return (
    <section className="mt-14">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {BANNERS.map((b) => {
          const product = getProduct(b.productId);
          return (
            <Link
              key={b.categoryId}
              to="/browse"
              search={{ category: b.categoryId }}
              className="group flex items-center overflow-hidden rounded-2xl bg-muted transition-shadow hover:shadow-lg"
            >
              <div className="flex-1 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {b.eyebrow}
                </p>
                <h3 className="mt-2 max-w-[11rem] text-lg font-bold leading-tight text-foreground">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{b.note}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                  Shop now
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              {product ? (
                <img
                  src={product.image}
                  alt=""
                  aria-hidden
                  className="h-full max-h-40 w-32 shrink-0 self-center object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
