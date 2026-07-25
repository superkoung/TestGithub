import { Link, Navigate, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import { formatCurrency } from "../utils/format";

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state) return <Navigate to="/" replace />;

  const { orderId, total, method } = state;

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-24 text-center">
      <span className="eyebrow text-mint">Order confirmed</span>
      <h1 className="display text-4xl md:text-5xl mt-4 mb-6">Thanks — it's on the way.</h1>
      <p className="text-ink-soft mb-10">
        Order <span className="mono text-ink">#{orderId}</span> has been placed
        {method === "cod" ? ", pay on delivery." : " and your payment is confirmed."} A
        confirmation summary is available in your account.
      </p>

      <div className="tag-notch inline-flex items-center bg-ink text-paper mono text-lg px-6 py-3 pl-8 mb-10">
        {formatCurrency(total)}
      </div>

      <div className="flex gap-3 justify-center">
        <Button as={Link} to="/account/orders" variant="primary">
          View order status
        </Button>
        <Button as={Link} to="/shop" variant="outline">
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
