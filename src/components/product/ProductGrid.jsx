import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <EmptyState
        eyebrow="No matches"
        title="Nothing fits those filters"
        body="Try clearing a filter or two — the full catalog is one click away."
        actionLabel="View all products"
        actionTo="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
      {products.map((p) => (
        <ProductCard key={p.product_id} product={p} />
      ))}
    </div>
  );
}
