import { formatCurrency } from "../../utils/format";

export default function OrderSummary({ subtotal, discount = 0, shipping = 0, taxRate = 0.05, children }) {
  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * taxRate;
  const total = taxable + tax + shipping;

  return (
    <div className="border border-line p-6 flex flex-col gap-4">
      <h3 className="eyebrow">Order summary</h3>

      <div className="flex flex-col gap-2.5 text-sm">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />
        {discount > 0 && <Row label="Discount" value={`− ${formatCurrency(discount)}`} tone="signal" />}
        <Row label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
        <Row label="Estimated tax" value={formatCurrency(tax)} />
      </div>

      <div className="border-t border-line pt-4 flex items-center justify-between">
        <span className="display text-lg">Total</span>
        <span className="mono text-lg font-semibold">{formatCurrency(total)}</span>
      </div>

      {children}
    </div>
  );
}

function Row({ label, value, tone }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-soft">{label}</span>
      <span className={`mono ${tone === "signal" ? "text-signal" : ""}`}>{value}</span>
    </div>
  );
}
