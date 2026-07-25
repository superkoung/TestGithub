import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { userAddresses } from "../data/users";
import OrderSummary from "../components/cart/OrderSummary";
import Button from "../components/common/Button";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { formatCurrency } from "../utils/format";

const paymentMethods = [
  { id: "card", label: "Credit / debit card" },
  { id: "cod", label: "Cash on delivery" },
  { id: "wallet", label: "Digital wallet" },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const applied = location.state?.applied || null;

  const [addressId, setAddressId] = useState(userAddresses[0]?.address_id);
  const [guestAddress, setGuestAddress] = useState({ name: "", phone: "", line: "", city: "" });
  const [method, setMethod] = useState("card");
  const [note, setNote] = useState("");
  const [placing, setPlacing] = useState(false);

  if (!items.length) {
    navigate("/cart");
    return null;
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      const orderId = 2000 + Math.floor(Math.random() * 900);
      clearCart();
      navigate("/order-confirmation", { state: { orderId, total: subtotal, method } });
    }, 700);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      <h1 className="display text-4xl md:text-5xl mt-4 mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-[1fr_340px] gap-10 items-start">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="eyebrow mb-4">01 · Shipping address</h2>
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                {userAddresses.map((addr) => (
                  <label
                    key={addr.address_id}
                    className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
                      addressId === addr.address_id ? "border-ink" : "border-line-strong hover:border-ink-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1 accent-ink"
                      checked={addressId === addr.address_id}
                      onChange={() => setAddressId(addr.address_id)}
                    />
                    <div className="text-sm">
                      <div className="font-medium">{addr.receiver_name}</div>
                      <div className="text-ink-soft">{addr.address_line}, {addr.city_province}</div>
                      <div className="text-ink-soft">{addr.receiver_phone}</div>
                      {addr.is_default && <span className="eyebrow text-signal">Default</span>}
                    </div>
                  </label>
                ))}
                <Link to="/account/addresses" className="eyebrow hover:text-ink text-mute">
                  + Add a new address
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <TextField label="Full name" value={guestAddress.name} onChange={(v) => setGuestAddress((p) => ({ ...p, name: v }))} required />
                <TextField label="Phone" value={guestAddress.phone} onChange={(v) => setGuestAddress((p) => ({ ...p, phone: v }))} required />
                <TextField label="Address" value={guestAddress.line} onChange={(v) => setGuestAddress((p) => ({ ...p, line: v }))} className="sm:col-span-2" required />
                <TextField label="City / province" value={guestAddress.city} onChange={(v) => setGuestAddress((p) => ({ ...p, city: v }))} required />
              </div>
            )}
          </section>

          <section>
            <h2 className="eyebrow mb-4">02 · Payment method</h2>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${
                    method === m.id ? "border-ink" : "border-line-strong hover:border-ink-soft"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    className="accent-ink"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                  />
                  <span className="text-sm">{m.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-4">03 · Order note (optional)</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Delivery instructions, gift note, etc."
              className="w-full border border-line-strong px-3 py-2.5 text-sm bg-paper focus:border-ink transition-colors resize-none"
            />
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-line p-6 flex flex-col gap-3">
            <h3 className="eyebrow">Items ({items.length})</h3>
            {items.map((item) => (
              <div key={item.cartItem_id} className="flex justify-between text-sm">
                <span className="text-ink-soft">
                  {item.product.name} × {item.qty}
                </span>
                <span className="mono">{formatCurrency(item.sub_total)}</span>
              </div>
            ))}
          </div>

          <OrderSummary subtotal={subtotal} discount={applied?.discount || 0}>
            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={placing}>
              {placing ? "Placing order…" : "Place order"}
            </Button>
          </OrderSummary>
        </div>
      </form>
    </div>
  );
}

function TextField({ label, value, onChange, className = "", required }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="eyebrow">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="border border-line-strong px-3 py-2.5 text-sm bg-paper focus:border-ink transition-colors"
      />
    </label>
  );
}
