import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, ShoppingBasket } from "lucide-react";
import { useState } from "react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* Newsletter */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="font-heading text-2xl font-bold">Join our newsletter for ₹100 off</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Register for the latest updates on promotions & coupons. Don't worry, we don't spam.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-border bg-surface md:w-[440px]"
          >
            <Mail className="ml-4 size-4 text-muted-foreground" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              type="email"
              className="h-11 flex-1 bg-transparent px-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground"
            >
              {subscribed ? "Sent" : "Send"}
            </button>
          </form>
        </div>
        <p className="mx-auto max-w-[1440px] px-4 pb-4 text-[11px] text-muted-foreground">
          By subscribing you agree to our{" "}
          <span className="text-primary underline-offset-2 hover:underline">Terms & Conditions</span>{" "}
          and{" "}
          <span className="text-primary underline-offset-2 hover:underline">Privacy & Cookies Policy</span>.
        </p>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-4 py-14 md:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <ShoppingBasket className="size-5" />
              </span>
              <span className="text-xl font-extrabold leading-none tracking-tight">
                <span className="text-foreground">Apna</span>
                <span className="text-primary">Mandi</span>
              </span>
            </div>
            <h4 className="mt-6 text-sm font-bold">One store. One standard.</h4>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Every basket is sourced, checked and packed to the same Apna Mandi
              promise — farm-fresh produce and trusted staples, delivered across
              your city in minutes.
            </p>
            <div className="mt-4 flex items-start gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-muted text-primary">
                <Phone className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Mon–Fri: 08am–9pm
                </p>
                <p className="font-heading text-lg font-bold">0 800 300-353</p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-muted text-primary">
                <Mail className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Need help with your order?
                </p>
                <p className="text-sm font-semibold">help@apnamandi.co</p>
              </div>
            </div>
          </div>

          <FooterCol
            title="Discover"
            links={[
              ["Fresh Produce", "/browse"],
              ["Pantry Staples", "/browse"],
              ["Dairy & Eggs", "/browse"],
              ["Snacks", "/browse"],
              ["Beverages", "/browse"],
            ]}
          />
          <FooterCol
            title="Let Us Help You"
            links={[
              ["Accessibility Statement", "/"],
              ["Your Orders", "/orders"],
              ["Returns & Replacements", "/"],
              ["Shipping Rates & Policies", "/"],
              ["Refund & Returns", "/"],
              ["Privacy Policy", "/"],
            ]}
          />
          <FooterCol
            title="Get to Know Us"
            links={[
              ["Careers at Apna Mandi", "/"],
              ["About Apna Mandi", "/"],
              ["Investor Relations", "/"],
              ["Apna Mandi Devices", "/"],
              ["Customer Reviews", "/"],
              ["Social Responsibility", "/"],
              ["Store Locations", "/"],
            ]}
          />

          <div>
            <h4 className="font-bold">Download our App</h4>
            <div className="mt-3 flex flex-col gap-3">
              <StoreBadge line1="GET IT ON" line2="Google Play" note="10% Discount" />
              <StoreBadge line1="Download on the" line2="App Store" note="20% Bonus" />
            </div>
            <h4 className="mt-6 text-sm font-bold">Follow us on social media:</h4>
            <div className="mt-3 flex items-center gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-full bg-muted text-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-4 text-[11px] text-muted-foreground">
            <p>
              Copyright © 2026 <span className="font-semibold text-foreground">Apna Mandi</span> Grocery Co. All rights reserved.
            </p>
            <div className="flex items-center gap-3 font-mono">
              <span className="rounded bg-muted px-2 py-1 font-bold text-[#1a1f71]">VISA</span>
              <span className="rounded bg-muted px-2 py-1 font-bold text-[#eb001b]">●●</span>
              <span className="rounded bg-muted px-2 py-1 font-bold text-primary">UPI</span>
              <span className="rounded bg-muted px-2 py-1 font-bold text-[#003087]">PayPal</span>
              <span className="rounded bg-muted px-2 py-1 font-bold text-foreground">COD</span>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-primary">Terms & Conditions</Link>
              <Link to="/" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/orders" className="hover:text-primary">Order Tracking</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-bold">{title}</h4>
      <ul className="mt-3 space-y-2 text-xs">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-muted-foreground hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoreBadge({ line1, line2, note }: { line1: string; line2: string; note: string }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg border border-border bg-ink px-3 py-2 text-background hover:opacity-90"
    >
      <div className="grid size-7 place-items-center rounded bg-background/10 text-lg leading-none">
        ⬇
      </div>
      <div className="flex-1 leading-tight">
        <p className="text-[9px] font-mono uppercase tracking-widest opacity-70">{line1}</p>
        <p className="font-heading text-sm font-bold">{line2}</p>
      </div>
      <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-accent-foreground">
        {note}
      </span>
    </a>
  );
}
