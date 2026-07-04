// Mock catalog. seller_id / store_name simulate the multi-vendor backend
// reality — NEVER render them in customer-facing UI.

export type Category = {
  id: string;
  name: string;
  tagline: string;
  tint: string;
};

export type ProductBadge = "organic" | "cold_sale" | "bestseller";

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  brandId: string;
  price: number;
  compareAtPrice?: number;
  unit: string;
  description: string;
  image: string;
  tag?: string;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  color?: "black" | "blue" | "brown" | "gray" | "green" | "red";
  inStock: boolean;
  /** Hidden backend field — NEVER render. */
  seller_id: string;
  /** Hidden backend field — NEVER render. */
  store_name: string;
};

export const categories: Category[] = [
  { id: "produce", name: "Fresh Produce", tagline: "Picked at peak", tint: "oklch(0.92 0.08 140)" },
  { id: "pantry", name: "Pantry Staples", tagline: "Everyday essentials", tint: "oklch(0.93 0.06 75)" },
  { id: "dairy", name: "Dairy & Eggs", tagline: "Cold-chain fresh", tint: "oklch(0.95 0.03 220)" },
  { id: "snacks", name: "Snacks", tagline: "Clean labels", tint: "oklch(0.92 0.08 40)" },
  { id: "ready", name: "Ready-to-Eat", tagline: "Kitchen off", tint: "oklch(0.93 0.06 20)" },
];

export const brands = [
  { id: "harvest", name: "Harvest Co", count: 4 },
  { id: "daily", name: "Daily Fresh", count: 3 },
  { id: "orchard", name: "Orchard Lane", count: 3 },
  { id: "millhouse", name: "Millhouse", count: 3 },
  { id: "kitchen", name: "Slow Kitchen", count: 3 },
];

export const productColors = [
  { id: "green", name: "Green", swatch: "#4d8b3f", count: 4 },
  { id: "red", name: "Red", swatch: "#c94a3a", count: 3 },
  { id: "brown", name: "Brown", swatch: "#8a5a3b", count: 3 },
  { id: "blue", name: "Blue", swatch: "#3b6fa0", count: 2 },
  { id: "gray", name: "Gray", swatch: "#8a8a8a", count: 2 },
  { id: "black", name: "Black", swatch: "#111111", count: 2 },
];

const img = (q: string) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  {
    id: "am-bananas",
    name: "Organic Bananas, 500g Bunch",
    categoryId: "produce", brandId: "harvest",
    price: 79, compareAtPrice: 99,
    unit: "500 g bunch",
    description: "Naturally ripened, thick-skinned bananas from small-batch growers.",
    image: img("1571771894821-ce9b6c11b08e"),
    tag: "Peak season", badge: "organic",
    rating: 4.6, reviewCount: 128, color: "green",
    inStock: true,
    seller_id: "s_101", store_name: "Harit Farms Co-op",
  },
  {
    id: "am-tomatoes",
    name: "Vine Tomatoes, 500g",
    categoryId: "produce", brandId: "harvest",
    price: 64, compareAtPrice: 79,
    unit: "500 g",
    description: "Juicy tomatoes ripened on the vine. Perfect for salads and slow-cooked curries.",
    image: img("1592841200221-a6898f307baa"),
    rating: 4.4, reviewCount: 82, color: "red",
    inStock: true,
    seller_id: "s_101", store_name: "Harit Farms Co-op",
  },
  {
    id: "am-spinach",
    name: "Baby Spinach, Triple-Washed",
    categoryId: "produce", brandId: "orchard",
    price: 55,
    unit: "200 g pack",
    description: "Tender, triple-washed baby spinach. Ready to eat right out of the bag.",
    image: img("1576045057995-568f588f82fb"),
    badge: "organic",
    rating: 4.2, reviewCount: 44, color: "green",
    inStock: true,
    seller_id: "s_102", store_name: "Green Valley",
  },
  {
    id: "am-avocado",
    name: "Hass Avocados, Ready to Eat",
    categoryId: "produce", brandId: "orchard",
    price: 199, compareAtPrice: 249,
    unit: "2 pcs",
    description: "Buttery, ripe-when-you-are Hass avocados. Sourced weekly.",
    image: img("1523049673857-eb18f1d7b578"),
    tag: "Ready to eat",
    rating: 4.7, reviewCount: 210, color: "green",
    inStock: true,
    seller_id: "s_102", store_name: "Green Valley",
  },
  {
    id: "am-rice",
    name: "Aged Basmati Rice, 1 kg",
    categoryId: "pantry", brandId: "millhouse",
    price: 349, compareAtPrice: 399,
    unit: "1 kg",
    description: "Two-year aged long-grain basmati. Fluffs up beautifully every time.",
    image: img("1586201375761-83865001e31c"),
    rating: 4.8, reviewCount: 342, color: "brown",
    inStock: true,
    seller_id: "s_201", store_name: "Grains United",
  },
  {
    id: "am-oil",
    name: "Cold-Pressed Mustard Oil, 1 L",
    categoryId: "pantry", brandId: "millhouse",
    price: 285, compareAtPrice: 349,
    unit: "1 L bottle",
    description: "Kachi ghani mustard oil, cold-pressed and unrefined. Bold flavour, rich colour.",
    image: img("1620574387735-3624d75b2dbc"),
    rating: 4.5, reviewCount: 95, color: "brown",
    inStock: true,
    seller_id: "s_202", store_name: "Pure Press Mills",
  },
  {
    id: "am-lentils",
    name: "Red Lentils, Stone-Cleaned 500g",
    categoryId: "pantry", brandId: "millhouse",
    price: 129,
    unit: "500 g",
    description: "Split red lentils, sorted and stone-cleaned. Cook in under 20 minutes.",
    image: img("1585996288133-13d3f5a83a0f"),
    rating: 4.3, reviewCount: 61, color: "red",
    inStock: true,
    seller_id: "s_201", store_name: "Grains United",
  },
  {
    id: "am-milk",
    name: "Farm Fresh Whole Milk, 1 L",
    categoryId: "dairy", brandId: "daily",
    price: 68,
    unit: "1 L",
    description: "A2 whole milk, pasteurised and bottled within hours of milking.",
    image: img("1550583724-b2692b85b150"),
    badge: "cold_sale",
    rating: 4.6, reviewCount: 178, color: "gray",
    inStock: true,
    seller_id: "s_301", store_name: "Daily Dairy",
  },
  {
    id: "am-eggs",
    name: "Brown Farm Eggs, Pack of 12",
    categoryId: "dairy", brandId: "daily",
    price: 149, compareAtPrice: 179,
    unit: "12 pcs",
    description: "Free-range brown eggs from small farms. Deep-orange yolks, thick whites.",
    image: img("1587486913049-53fc88980cfc"),
    tag: "Best seller", badge: "bestseller",
    rating: 4.9, reviewCount: 512, color: "brown",
    inStock: true,
    seller_id: "s_301", store_name: "Daily Dairy",
  },
  {
    id: "am-yogurt",
    name: "Greek Yogurt, High Protein",
    categoryId: "dairy", brandId: "daily",
    price: 95,
    unit: "200 g",
    description: "Thick, strained yogurt with 10 g protein per serving. No added sugar.",
    image: img("1571212515416-fca325c9d4a1"),
    badge: "cold_sale",
    rating: 4.4, reviewCount: 88, color: "gray",
    inStock: true,
    seller_id: "s_302", store_name: "Milkhouse",
  },
  {
    id: "am-granola",
    name: "Honey Almond Granola, 300g",
    categoryId: "snacks", brandId: "kitchen",
    price: 249, compareAtPrice: 299,
    unit: "300 g",
    description: "Slow-baked oats with real honey and roasted almonds. No refined sugar.",
    image: img("1517593456243-3c8fc4bd6a9d"),
    rating: 4.5, reviewCount: 76, color: "brown",
    inStock: true,
    seller_id: "s_401", store_name: "Crunch Kitchen",
  },
  {
    id: "am-chips",
    name: "Kettle Chips, Sea Salt 150g",
    categoryId: "snacks", brandId: "kitchen",
    price: 89, compareAtPrice: 109,
    unit: "150 g",
    description: "Hand-cooked in small batches. Extra crunch, just the right salt.",
    image: img("1566478989037-eec170784d0b"),
    rating: 4.3, reviewCount: 54, color: "black",
    inStock: true,
    seller_id: "s_401", store_name: "Crunch Kitchen",
  },
  {
    id: "am-dal",
    name: "Ready Dal Makhani, 300g Pouch",
    categoryId: "ready", brandId: "kitchen",
    price: 179, compareAtPrice: 219,
    unit: "300 g pouch",
    description: "Slow-cooked overnight the traditional way. Just heat and serve.",
    image: img("1596797038530-2c107229654b"),
    rating: 4.6, reviewCount: 143, color: "brown",
    inStock: true,
    seller_id: "s_501", store_name: "Home Kitchen",
  },
  {
    id: "am-paneer-tikka",
    name: "Paneer Tikka Bowl, 1 Serving",
    categoryId: "ready", brandId: "kitchen",
    price: 229,
    unit: "1 serving",
    description: "Char-grilled paneer with peppers and onions in a smoky masala.",
    image: img("1567337710282-00832b415979"),
    tag: "Chef's pick", badge: "bestseller",
    rating: 4.7, reviewCount: 96, color: "red",
    inStock: true,
    seller_id: "s_501", store_name: "Home Kitchen",
  },
  {
    id: "am-bread",
    name: "Artisan Sourdough Loaf, 450g",
    categoryId: "pantry", brandId: "harvest",
    price: 180, compareAtPrice: 220,
    unit: "450 g loaf",
    description: "Naturally leavened, 24-hour ferment. Crisp crust, open crumb.",
    image: img("1585478259715-876a6a81fc08"),
    rating: 4.8, reviewCount: 187, color: "brown",
    inStock: true,
    seller_id: "s_601", store_name: "Slow Bakehouse",
  },
  {
    id: "am-honey",
    name: "Wildflower Honey, 250g Jar",
    categoryId: "pantry", brandId: "orchard",
    price: 320,
    unit: "250 g jar",
    description: "Raw, unfiltered honey from Himalayan foothills. Floral and mellow.",
    image: img("1587049352846-4a222e784d38"),
    badge: "organic",
    rating: 4.6, reviewCount: 71, color: "brown",
    inStock: false,
    seller_id: "s_602", store_name: "Hive & Comb",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function productsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function discountPct(p: Product) {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

export type OrderStatus = "placed" | "packed" | "out_for_delivery" | "delivered";

export type Order = {
  id: string;
  placedAt: string;
  items: { productId: string; qty: number; price: number }[];
  subtotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
  etaMinutes?: number;
  address: string;
};

export const pastOrders: Order[] = [
  {
    id: "AM-9402",
    placedAt: "2026-07-04T10:12:00Z",
    items: [
      { productId: "am-bananas", qty: 2, price: 79 },
      { productId: "am-bread", qty: 1, price: 180 },
      { productId: "am-milk", qty: 2, price: 68 },
    ],
    subtotal: 474, delivery: 0, total: 474,
    status: "out_for_delivery", etaMinutes: 14,
    address: "Flat 402, Sector 62, Noida",
  },
  {
    id: "AM-8829",
    placedAt: "2026-07-01T18:40:00Z",
    items: [
      { productId: "am-paneer-tikka", qty: 1, price: 229 },
      { productId: "am-dal", qty: 2, price: 179 },
    ],
    subtotal: 587, delivery: 29, total: 616,
    status: "delivered",
    address: "Flat 402, Sector 62, Noida",
  },
  {
    id: "AM-8551",
    placedAt: "2026-06-24T09:05:00Z",
    items: [
      { productId: "am-rice", qty: 1, price: 349 },
      { productId: "am-lentils", qty: 2, price: 129 },
      { productId: "am-oil", qty: 1, price: 285 },
    ],
    subtotal: 892, delivery: 0, total: 892,
    status: "delivered",
    address: "Flat 402, Sector 62, Noida",
  },
];
