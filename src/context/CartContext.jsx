import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/products";
import { productVariants } from "../data/variants";
import { colors, sizes } from "../data/taxonomy";

// Mirrors: carts + cartItems tables (single active cart for the current session)
const CartContext = createContext(null);

let nextCartItemId = 1;

export function CartProvider({ children }) {
  const [status] = useState("active"); // carts.status
  const [items, setItems] = useState([]); // cartItems rows, enriched at read-time

  function addItem(variantId, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.variant_id === variantId);
      if (existing) {
        return prev.map((i) => (i.variant_id === variantId ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { cartItem_id: nextCartItemId++, variant_id: variantId, qty }];
    });
  }

  function updateQty(variantId, qty) {
    setItems((prev) =>
      prev
        .map((i) => (i.variant_id === variantId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(variantId) {
    setItems((prev) => prev.filter((i) => i.variant_id !== variantId));
  }

  function clearCart() {
    setItems([]);
  }

  const enrichedItems = useMemo(() => {
    return items
      .map((item) => {
        const variant = productVariants.find((v) => v.variant_id === item.variant_id);
        if (!variant) return null;
        const product = products.find((p) => p.product_id === variant.product_id);
        const color = colors.find((c) => c.color_id === variant.colors_id);
        const size = sizes.find((s) => s.size_id === variant.size_id);
        const unitPrice = product.price + (variant.price_modifier || 0);
        const sub_total = unitPrice * item.qty;
        return { ...item, variant, product, color, size, unitPrice, sub_total };
      })
      .filter(Boolean);
  }, [items]);

  const totalQty = enrichedItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = enrichedItems.reduce((sum, i) => sum + i.sub_total, 0);

  const value = {
    status,
    items: enrichedItems,
    totalQty,
    subtotal,
    addItem,
    updateQty,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
