import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  Leaf,
  Wheat,
  Egg,
  Cookie,
  Soup,
  type LucideIcon,
} from "lucide-react";
import { categories, productsByCategory } from "@/lib/mock-data";

const departmentIcons: Record<string, LucideIcon> = {
  produce: Leaf,
  pantry: Wheat,
  dairy: Egg,
  snacks: Cookie,
  ready: Soup,
};

export function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setHover(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setHover(null);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hoverCategory = categories.find((c) => c.id === hover);
  const subProducts = hover ? productsByCategory(hover).slice(0, 6) : [];

  const close = () => {
    setOpen(false);
    setHover(null);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex w-60 items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/60"
      >
        <LayoutGrid className="size-4 text-primary" />
        All Categories
        <ChevronDown className={`ml-auto size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 w-60 rounded-md border border-border bg-surface py-1 shadow-xl"
          onMouseLeave={() => setHover(null)}
        >
          {categories.map((c) => {
            const Icon = departmentIcons[c.id] ?? Leaf;
            const isActive = hover === c.id;
            return (
              <Link
                key={c.id}
                to="/browse"
                search={{ category: c.id }}
                onClick={close}
                onMouseEnter={() => setHover(c.id)}
                onFocus={() => setHover(c.id)}
                role="menuitem"
                className={`flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "border-primary bg-muted text-primary"
                    : "border-transparent text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">{c.name}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
              </Link>
            );
          })}

          {/* Submenu flyout */}
          {hoverCategory && subProducts.length > 0 ? (
            <div className="absolute left-full top-0 z-50 -ml-px h-full min-h-full w-64 rounded-r-md border border-l-0 border-border bg-surface p-5 shadow-xl">
              <p className="mb-3 text-sm font-bold text-foreground">{hoverCategory.name}</p>
              <ul className="space-y-2">
                {subProducts.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/products/$id"
                      params={{ id: p.id }}
                      onClick={close}
                      className="block text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
