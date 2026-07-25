import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import Breadcrumbs from "../components/common/Breadcrumbs";

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
      <h1 className="display text-4xl md:text-5xl mt-4 mb-10">Wishlist</h1>

      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <EmptyState
          eyebrow="Wishlist"
          title="Nothing saved yet"
          body="Tap the heart on any product to keep track of it here."
          actionLabel="Browse products"
          actionTo="/shop"
        />
      )}
    </div>
  );
}
