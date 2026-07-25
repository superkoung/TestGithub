import { products, productPhotos } from "./products";

// Config per product: which colors + sizes it comes in
const variantConfig = {
  1: { colors: [1, 3, 4], sizes: [6, 7, 8, 9] }, // Strata Runner
  2: { colors: [1, 2, 7], sizes: [6, 7, 8, 9] }, // Glide Trainer
  3: { colors: [1, 3, 5], sizes: [2, 3, 4, 5] }, // Ridge Shell Jacket
  4: { colors: [1, 6], sizes: [2, 3, 4, 5] }, // Talus Parka
  5: { colors: [1, 2, 3, 6], sizes: [1, 2, 3, 4, 5] }, // Core Tee
  6: { colors: [7, 5, 2], sizes: [2, 3, 4] }, // Mesh Knit Crew
  7: { colors: [1, 5, 4], sizes: [3] }, // Field Cap (one size, stored as M)
  8: { colors: [1, 6, 2], sizes: [3] }, // Transit Tote (one size)
};

// Deterministic pseudo-random stock generator so numbers stay stable across renders
function pseudoStock(seed) {
  const x = Math.sin(seed * 999) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * 24); // 0-23 units
}

function skuFor(product, colorId, sizeId) {
  const base = product.slug.split("-").map((w) => w.slice(0, 2).toUpperCase()).join("");
  return `${base}-C${colorId}-S${sizeId}`;
}

export const productVariants = [];
export const productImages = [];

let variantId = 1;
let imageId = 1;

products.forEach((product) => {
  const cfg = variantConfig[product.product_id];
  const photos = productPhotos[product.product_id] || [];

  cfg.colors.forEach((colorId, colorIdx) => {
    cfg.sizes.forEach((sizeId, sizeIdx) => {
      const stock = pseudoStock(product.product_id * 31 + colorId * 7 + sizeId);
      // occasional price bump for larger sizes / premium colorway
      const price_modifier = sizeIdx === cfg.sizes.length - 1 && cfg.sizes.length > 4 ? 5 : 0;

      productVariants.push({
        variant_id: variantId,
        product_id: product.product_id,
        size_id: sizeId,
        colors_id: colorId,
        stock,
        price_modifier,
        status: stock > 0 ? "active" : "out_of_stock",
        deleted_at: null,
        sku: skuFor(product, colorId, sizeId),
      });

      // only attach images once per color (first size in that color) to keep gallery tidy
      if (sizeIdx === 0) {
        photos.forEach((path, i) => {
          productImages.push({
            image_id: imageId++,
            variant_id: variantId,
            image_path: path,
            is_primary: colorIdx === 0 && i === 0,
          });
        });
      }

      variantId++;
    });
  });
});

export function getVariantsForProduct(productId) {
  return productVariants.filter((v) => v.product_id === productId);
}

export function getImagesForColor(productId, colorId) {
  const variantIdsForColor = productVariants
    .filter((v) => v.product_id === productId && v.colors_id === colorId)
    .map((v) => v.variant_id);
  const imgs = productImages.filter((img) => variantIdsForColor.includes(img.variant_id));
  if (imgs.length) return imgs;
  // fallback to product's first available images
  const anyVariantIds = productVariants
    .filter((v) => v.product_id === productId)
    .map((v) => v.variant_id);
  return productImages.filter((img) => anyVariantIds.includes(img.variant_id));
}

export function getPrimaryImage(productId) {
  const variantIdsForProduct = productVariants
    .filter((v) => v.product_id === productId)
    .map((v) => v.variant_id);
  const primary = productImages.find(
    (img) => variantIdsForProduct.includes(img.variant_id) && img.is_primary
  );
  if (primary) return primary.image_path;
  const first = productImages.find((img) => variantIdsForProduct.includes(img.variant_id));
  return first?.image_path;
}
