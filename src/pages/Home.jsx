import { Link } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/taxonomy";
import ProductGrid from "../components/product/ProductGrid";
import Button from "../components/common/Button";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="eyebrow">Spring / Summer 2026</span>
          <h1 className="display text-5xl md:text-7xl leading-[0.95] mt-4 mb-6">
            Gear that
            <br />
            earns its <span className="text-signal">price tag.</span>
          </h1>
          <p className="text-ink-soft max-w-md mb-8 leading-relaxed">
            No mystery markups. Every listing shows exactly what you're paying for —
            the material, the fit, and the stock on hand.
          </p>
          <div className="flex gap-3">
            <Button as={Link} to="/shop" variant="primary" size="lg">
              Shop all products
            </Button>
            <Button as={Link} to="/shop?category=footwear" variant="outline" size="lg">
              Footwear
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] bg-blush overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
            alt="Model wearing Notch outerwear"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 tag-notch bg-paper mono text-sm px-4 py-2 pl-6">
            Ridge Shell — $210
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.category_id}
              to={`/shop?category=${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-blush block"
            >
              <img
                src={c.image_path}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/25 transition-colors" />
              <span className="absolute bottom-4 left-4 display text-xl text-white drop-shadow">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="eyebrow">Just landed</span>
            <h2 className="display text-3xl md:text-4xl mt-2">New this week</h2>
          </div>
          <Link to="/shop" className="eyebrow hover:text-ink text-mute hidden sm:block">
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="bg-ink text-paper py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <Stat label="Restock cadence" value="Every Friday" />
          <Stat label="Return window" value="30 days" />
          <Stat label="Ships from" value="Phnom Penh" />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="display text-2xl mb-1">{value}</div>
      <div className="eyebrow !text-paper/50">{label}</div>
    </div>
  );
}
