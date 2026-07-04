import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/mock-data";

type Tile = {
  categoryId: string;
  eyebrow: string;
  title: string;
  productId: string;
};

// Four tall "Only This Week" banners — copy top, product image filling the base.
const TILES: Tile[] = [
  { categoryId: "fruits-veg", eyebrow: "Only this week", title: "Experienced quality produce", productId: "am-avocado" },
  { categoryId: "beverages", eyebrow: "Only this week", title: "Better quality, best price", productId: "am-milk" },
  { categoryId: "meats-seafood", eyebrow: "Only this week", title: "The lowest prices in town", productId: "am-tomatoes" },
  { categoryId: "breads-bakery", eyebrow: "Only this week", title: "Favourite brands, one roof", productId: "am-bread" },
];

export function PromoMosaic() {
  return (
    <section className="mt-14">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t) => {
          const product = getProduct(t.productId);
          return (
            <Link
              key={t.categoryId}
              to="/browse"
              search={{ category: t.categoryId }}
              className="group relative flex h-64 flex-col overflow-hidden rounded-2xl bg-muted transition-shadow hover:shadow-lg"
            >
              <div className="relative z-10 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {t.eyebrow}
                </p>
                <h3 className="mt-2 max-w-[10rem] text-lg font-bold leading-tight text-foreground">
                  {t.title}
                </h3>
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
                  className="absolute inset-x-0 bottom-0 h-32 w-full object-contain px-6 pb-4 transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
