// Mirrors: coupons table
export const coupons = [
  {
    coupon_id: 1,
    code: "WELCOME10",
    discount_type: "percent",
    discount_value: 10,
    min_order_amount: 50,
    max_discount_amount: 40,
    usage_limit: 500,
    used_count: 128,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
  },
  {
    coupon_id: 2,
    code: "FREESHIP",
    discount_type: "fixed",
    discount_value: 8,
    min_order_amount: 75,
    max_discount_amount: 8,
    usage_limit: 1000,
    used_count: 402,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
  },
  {
    coupon_id: 3,
    code: "STUDIO25",
    discount_type: "percent",
    discount_value: 25,
    min_order_amount: 150,
    max_discount_amount: 60,
    usage_limit: 200,
    used_count: 198,
    start_date: "2026-06-01",
    end_date: "2026-08-01",
  },
];

export function validateCoupon(code, subtotal) {
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!coupon) return { ok: false, message: "That code doesn't match an active coupon." };
  if (coupon.used_count >= coupon.usage_limit)
    return { ok: false, message: "This coupon has reached its usage limit." };
  if (subtotal < coupon.min_order_amount)
    return {
      ok: false,
      message: `Add $${(coupon.min_order_amount - subtotal).toFixed(2)} more to use this code.`,
    };
  const rawDiscount =
    coupon.discount_type === "percent" ? (subtotal * coupon.discount_value) / 100 : coupon.discount_value;
  const discount = Math.min(rawDiscount, coupon.max_discount_amount);
  return { ok: true, coupon, discount };
}
