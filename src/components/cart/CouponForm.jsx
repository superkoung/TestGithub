import { useState } from "react";
import { validateCoupon } from "../../data/coupons";
import Button from "../common/Button";

export default function CouponForm({ subtotal, applied, onApply, onRemove }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const result = validateCoupon(code, subtotal);
    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }
    onApply(result);
    setMessage({ type: "success", text: `${result.coupon.code} applied.` });
    setCode("");
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between border border-line-strong px-3 py-2.5 mono text-xs">
        <span>
          Code <strong>{applied.coupon.code}</strong> applied
        </span>
        <button type="button" onClick={onRemove} className="text-flare hover:underline">
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 min-w-0 border border-line-strong px-3 py-2 text-sm bg-paper focus:border-ink transition-colors mono"
        />
        <Button type="submit" variant="outline" size="sm">
          Apply
        </Button>
      </div>
      {message && (
        <p className={`text-xs ${message.type === "error" ? "text-flare" : "text-mint"}`}>{message.text}</p>
      )}
    </form>
  );
}
