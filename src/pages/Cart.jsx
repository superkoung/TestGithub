import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartLineItem from "../components/cart/CartLineItem";
import OrderSummary from "../components/cart/OrderSummary";
import CouponForm from "../components/cart/CouponForm";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Breadcrumbs from "../components/common/Breadcrumbs";

export default function Cart() {
  const { items, subtotal, updateQty, removeItem } = useCart();
  const [applied, setApplied] = useState(null);
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <EmptyState
          eyebrow="Cart"
          title="Your cart is empty"
          body="Browse the catalog and add something that fits."
          actionLabel="Continue shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <h1 className="display text-4xl md:text-5xl mt-4 mb-10">Your cart</h1>

      <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">
        <div>
          {items.map((item) => (
            <CartLineItem
              key={item.cartItem_id}
              item={item}
              onQtyChange={updateQty}
              onRemove={removeItem}
            />
          ))}
          <Link to="/shop" className="eyebrow inline-block mt-6 hover:text-ink text-mute">
            ← Continue shopping
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary subtotal={subtotal} discount={applied?.discount || 0}>
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-2"
              onClick={() => navigate("/checkout", { state: { applied } })}
            >
              Checkout
            </Button>
          </OrderSummary>
          <CouponForm
            subtotal={subtotal}
            applied={applied}
            onApply={setApplied}
            onRemove={() => setApplied(null)}
          />
        </div>
      </div>
    </div>
  );
}
