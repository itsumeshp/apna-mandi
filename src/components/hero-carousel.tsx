import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories, getProduct } from "@/lib/mock-data";
import { formatPrice } from "@/lib/cart-store";

type Slide = {
  categoryId: string;
  eyebrow: string;
  title: string;
  productId: string;
};

// Each slide leads with one department and one clean product shot.
const SLIDES: Slide[] = [
  { categoryId: "ready", eyebrow: "Kitchen off tonight", title: "Chef-made meals, just heat and eat", productId: "am-paneer-tikka" },
  { categoryId: "produce", eyebrow: "Fresh this week", title: "Ripe, ready, at your door in minutes", productId: "am-avocado" },
  { categoryId: "pantry", eyebrow: "Pantry restock", title: "Two-year aged basmati and staples", productId: "am-rice" },
];

const tintOf = (categoryId: string) =>
  categories.find((c) => c.id === categoryId)?.tint ?? "oklch(0.94 0.03 75)";

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const go = useCallback((n: number) => setActive((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(() => {
      if (!paused.current) setActive((n) => (n + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];
  const product = getProduct(slide.productId)!;
  const tint = tintOf(slide.categoryId);

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border bg-surface"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-roledescription="carousel"
      aria-label="Featured departments"
    >
      <div className="grid grid-cols-1 items-center gap-6 p-7 md:min-h-[400px] md:grid-cols-2 md:gap-4 md:p-10">
        {/* Copy */}
        <div key={`copy-${active}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 md:pr-4">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/80"
            style={{ backgroundColor: tint }}
          >
            {slide.eyebrow}
          </span>
          <h1 className="mt-4 text-balance font-heading text-3xl font-bold leading-[1.05] text-foreground md:text-5xl">
            {slide.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              to="/browse"
              search={{ category: slide.categoryId }}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-px"
            >
              Shop now <ArrowRight className="size-4" />
            </Link>
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-sale">{formatPrice(product.price)}</span>
              {product.compareAtPrice ? (
                <span className="font-mono text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        {/* Product image */}
        <div className="relative">
          <div
            key={`img-${active}`}
            className="relative mx-auto aspect-[5/4] w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: tint }} />
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-2 size-[calc(100%-1rem)] rounded-xl object-cover shadow-lg"
            />
            <div className="absolute bottom-3 left-3 rounded-lg bg-background/95 px-3 py-1.5 shadow-md backdrop-blur">
              <p className="font-heading text-sm font-bold leading-tight text-foreground">{product.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 p-2 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background md:grid"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={() => go(active + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 p-2 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background md:grid"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.categoryId}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-ink" : "w-2 bg-foreground/25 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
