import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/products";

// Mirrors: wishlists table (user_id, product_id)
const WishlistContext = createContext(null);

let nextWishlistId = 1;

export function WishlistProvider({ children }) {
  const [entries, setEntries] = useState([]); // { wishlist_id, product_id }

  function toggle(productId) {
    setEntries((prev) => {
      const exists = prev.find((e) => e.product_id === productId);
      if (exists) return prev.filter((e) => e.product_id !== productId);
      return [...prev, { wishlist_id: nextWishlistId++, product_id: productId }];
    });
  }

  function isWishlisted(productId) {
    return entries.some((e) => e.product_id === productId);
  }

  const items = useMemo(
    () =>
      entries
        .map((e) => products.find((p) => p.product_id === e.product_id))
        .filter(Boolean),
    [entries]
  );

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: entries.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
