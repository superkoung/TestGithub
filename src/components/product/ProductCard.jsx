import { Link } from "react-router-dom";
import { getPrimaryImage, productVariants } from "../../data/variants";
import { colors as allColors, categories, brands } from "../../data/taxonomy";
import { getAverageRating, getReviewsForProduct } from "../../data/reviews";
import { useWishlist } from "../../context/WishlistContext";
import PriceTag from "../common/PriceTag";
import Rating from "../common/Rating";

export default function ProductCard({ product }) {
  const { isWishlisted, toggle } = useWishlist();
  const variants = productVariants.filter((v) => v.product_id === product.product_id);
  const colorIds = [...new Set(variants.map((v) => v.colors_id))];
  const swatches = colorIds.map((id) => allColors.find((c) => c.color_id === id)).filter(Boolean);
  const inStock = variants.some((v) => v.stock > 0);
  const image = getPrimaryImage(product.product_id);
  const brand = brands.find((b) => b.brand_id === product.brand_id);
  const category = categories.find((c) => c.category_id === product.category_id);
  const rating = getAverageRating(product.product_id);
  const reviewCount = getReviewsForProduct(product.product_id).length;
  const wishlisted = isWishlisted(product.product_id);

  return (
    <div className="group relative flex flex-col">
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-blush">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!inStock && (
          <span className="absolute top-3 left-3 eyebrow bg-paper px-2 py-1">Sold out</span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => toggle(product.product_id)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-paper/90 backdrop-blur transition-colors ${
          wishlisted ? "text-flare" : "text-ink-soft hover:text-ink"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2.2 4.5 5.7 4c2-.3 3.9.7 5 2.3C11.8 4.7 13.7 3.7 15.7 4c3.5.5 5.3 4 3.7 7.7C17.5 16.4 12 21 12 21z" />
        </svg>
      </button>

      <div className="pt-4 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="eyebrow">{brand?.brand_name}</div>
            <Link to={`/product/${product.slug}`} className="display text-lg leading-tight hover:text-signal transition-colors">
              {product.name}
            </Link>
          </div>
          <PriceTag amount={product.price} size="sm" />
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5">
            {swatches.slice(0, 5).map((s) => (
              <span
                key={s.color_id}
                title={s.color_name}
                className="w-3.5 h-3.5 rounded-full border border-line-strong"
                style={{ backgroundColor: s.color_code }}
              />
            ))}
          </div>
          {reviewCount > 0 ? (
            <Rating value={rating} count={reviewCount} />
          ) : (
            <span className="eyebrow">{category?.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
