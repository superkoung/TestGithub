import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { productVariants, getImagesForColor } from "../data/variants";
import { colors as allColors, sizes as allSizes, brands, categories } from "../data/taxonomy";
import { getReviewsForProduct, getAverageRating } from "../data/reviews";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Breadcrumbs from "../components/common/Breadcrumbs";
import PriceTag from "../components/common/PriceTag";
import Rating from "../components/common/Rating";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import QuantityStepper from "../components/common/QuantityStepper";
import { ColorSwatches, SizeChips } from "../components/product/VariantSelector";
import { ReviewList, ReviewForm } from "../components/product/Reviews";
import ProductGrid from "../components/product/ProductGrid";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center">
        <h1 className="display text-3xl mb-4">Product not found</h1>
        <Button as={Link} to="/shop">Back to shop</Button>
      </div>
    );
  }

  return <ProductDetailBody product={product} navigate={navigate} />;
}

function ProductDetailBody({ product, navigate }) {
  const variants = useMemo(
    () => productVariants.filter((v) => v.product_id === product.product_id),
    [product.product_id]
  );
  const colorIds = [...new Set(variants.map((v) => v.colors_id))];
  const colorOptions = colorIds.map((id) => allColors.find((c) => c.color_id === id)).filter(Boolean);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.color_id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedMessage, setAddedMessage] = useState(false);
  const [localReviews, setLocalReviews] = useState(getReviewsForProduct(product.product_id));

  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const sizesForColor = variants.filter((v) => v.colors_id === selectedColor);
  const availableSizeIds = sizesForColor.filter((v) => v.stock > 0).map((v) => v.size_id);
  const lowStockSizeIds = sizesForColor.filter((v) => v.stock > 0 && v.stock <= 3).map((v) => v.size_id);
  const relevantSizes = allSizes.filter((s) => sizesForColor.some((v) => v.size_id === s.size_id));

  const selectedVariant = variants.find(
    (v) => v.colors_id === selectedColor && v.size_id === selectedSize
  );

  const images = getImagesForColor(product.product_id, selectedColor);
  const brand = brands.find((b) => b.brand_id === product.brand_id);
  const category = categories.find((c) => c.category_id === product.category_id);
  const rating = getAverageRating(product.product_id);

  const related = products.filter(
    (p) => p.category_id === product.category_id && p.product_id !== product.product_id
  ).slice(0, 3);

  function handleColorSelect(colorId) {
    setSelectedColor(colorId);
    setSelectedSize(null);
    setActiveImage(0);
  }

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem(selectedVariant.variant_id, qty);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  }

  const wishlisted = isWishlisted(product.product_id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", to: "/" },
          { label: category?.name, to: `/shop?category=${category?.slug}` },
          { label: product.name },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div>
          <div className="aspect-[4/5] bg-blush overflow-hidden mb-3">
            <img
              src={images[activeImage]?.image_path}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.image_id}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border-2 ${
                    activeImage === i ? "border-signal" : "border-transparent"
                  }`}
                >
                  <img src={img.image_path} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="eyebrow">{brand?.brand_name}</span>
          <h1 className="display text-3xl md:text-4xl mt-1 mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-5">
            {localReviews.length > 0 ? (
              <Rating value={rating} count={localReviews.length} />
            ) : (
              <span className="eyebrow">No reviews yet</span>
            )}
            <PriceTag
              amount={product.price + (selectedVariant?.price_modifier || 0)}
              size="lg"
              tone="signal"
            />
          </div>

          <p className="text-ink-soft leading-relaxed mb-8 max-w-md">{product.description}</p>

          <div className="flex flex-col gap-6 mb-8">
            <div>
              <div className="eyebrow mb-3">
                Color {selectedColor && `— ${allColors.find((c) => c.color_id === selectedColor)?.color_name}`}
              </div>
              <ColorSwatches colors={colorOptions} selected={selectedColor} onSelect={handleColorSelect} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow">Size</span>
                <span className="eyebrow text-mute">• low stock</span>
              </div>
              <SizeChips
                sizes={relevantSizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
                availableSizeIds={availableSizeIds}
                outOfStockSizeIds={lowStockSizeIds}
              />
            </div>

            <div className="flex items-center gap-4">
              <QuantityStepper value={qty} onChange={setQty} max={selectedVariant?.stock || 10} />
              {selectedVariant && (
                <span className="eyebrow">
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in stock`
                    : "Out of stock"}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={!selectedVariant || selectedVariant.stock === 0}
              onClick={handleAddToCart}
            >
              {!selectedSize ? "Select a size" : selectedVariant?.stock === 0 ? "Out of stock" : "Add to cart"}
            </Button>
            <button
              onClick={() => toggle(product.product_id)}
              aria-label="Toggle wishlist"
              className={`w-14 flex items-center justify-center border transition-colors ${
                wishlisted ? "border-flare text-flare" : "border-line-strong text-ink-soft hover:text-ink"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2.2 4.5 5.7 4c2-.3 3.9.7 5 2.3C11.8 4.7 13.7 3.7 15.7 4c3.5.5 5.3 4 3.7 7.7C17.5 16.4 12 21 12 21z" />
              </svg>
            </button>
          </div>

          {addedMessage && (
            <div className="flex items-center justify-between border border-line-strong px-4 py-3 mono text-xs">
              <span>Added to cart.</span>
              <Link to="/cart" className="underline hover:text-signal">
                View cart
              </Link>
            </div>
          )}

          <div className="flex gap-2 mt-6">
            <Badge tone="outline">SKU {selectedVariant?.sku || "—"}</Badge>
            <Badge tone="outline">{category?.name}</Badge>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-10 mt-20 pt-10 border-t border-line">
        <div>
          <h2 className="display text-2xl mb-2">Reviews</h2>
          {localReviews.length > 0 && <Rating value={rating} count={localReviews.length} />}
        </div>
        <div className="flex flex-col gap-8">
          <ReviewForm
            onSubmit={(review) =>
              setLocalReviews((prev) => [
                { review_id: Date.now(), product_id: product.product_id, created_at: new Date().toISOString(), ...review },
                ...prev,
              ])
            }
          />
          <ReviewList reviews={localReviews} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 pt-10 border-t border-line">
          <h2 className="display text-2xl mb-8">You might also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
