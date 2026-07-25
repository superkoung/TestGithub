import { Link } from "react-router-dom";
import { categories } from "../../data/taxonomy";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="display text-2xl font-extrabold mb-3">NOTCH</div>
          <p className="text-sm text-paper/60 max-w-xs">
            Gear built in small batches, sized honestly, and priced without the markup theater.
          </p>
        </div>

        <FooterCol
          title="Shop"
          links={categories.map((c) => ({ label: c.name, to: `/shop?category=${c.slug}` }))}
        />

        <FooterCol
          title="Account"
          links={[
            { label: "Orders", to: "/account/orders" },
            { label: "Addresses", to: "/account/addresses" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Sign in", to: "/login" },
          ]}
        />

        <FooterCol
          title="Support"
          links={[
            { label: "Shipping", to: "/shop" },
            { label: "Returns", to: "/shop" },
            { label: "Size guide", to: "/shop" },
            { label: "Contact", to: "/shop" },
          ]}
        />
      </div>
      <div className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 mono text-[0.68rem] tracking-wide text-paper/40 uppercase">
          <span>© 2026 Notch Studio — UI concept, not a live store</span>
          <span>Phnom Penh · Remote</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="eyebrow !text-paper/50 mb-4">{title}</div>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-paper/80 hover:text-paper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
