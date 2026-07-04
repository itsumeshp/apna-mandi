import { Link } from "@tanstack/react-router";
import { ShoppingCart, Heart, Star, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/mock-data";
import { discountPct } from "@/lib/mock-data";
import { useCart, formatPrice } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";

const badgeStyles: Record<string, { label: string; className: string }> = {
  organic: { label: "Organic", className: "bg-success text-success-foreground" },
  cold_sale: { label: "Cold Sale", className: "bg-primary text-primary-foreground" },
  bestseller: { label: "Best Seller", className: "bg-accent text-accent-foreground" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-3 ${
            i <= Math.round(rating)
              ? "fill-[#f59e0b] text-[#f59e0b]"
              : "fill-transparent text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const discount = discountPct(product);
  const badge = product.badge ? badgeStyles[product.badge] : null;
  const liked = has(product.id);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    add(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-white p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {discount > 0 ? (
          <span className="absolute left-2 top-2 rounded-md bg-sale px-2 py-0.5 text-[11px] font-bold text-sale-foreground shadow-sm">
            {discount}%
          </span>
        ) : null}

        <button
          onClick={onWish}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors ${
            liked ? "text-sale" : "text-foreground/50 hover:text-sale"
          }`}
        >
          <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
        </button>

        {badge ? (
          <span
            className={`absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="font-mono text-[10px] text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-base font-bold text-sale">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="font-mono text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        <button
          onClick={onAdd}
          disabled={!product.inStock}
          className={`mt-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
            !product.inStock
              ? "bg-muted text-muted-foreground"
              : added
                ? "bg-accent text-accent-foreground"
                : "bg-success/10 text-success hover:bg-success hover:text-success-foreground"
          }`}
        >
          {added ? (
            <>
              <Check className="size-3.5" /> Added
            </>
          ) : !product.inStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="size-3.5" /> In Stock
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
