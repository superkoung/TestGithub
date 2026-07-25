// Mirrors: orders, orderItems, payments tables
// Static order history used by the Account > Orders screens.

export const pastOrders = [
  {
    order_id: 1001,
    user_id: 1,
    coupon_id: 1,
    total_amount: 173,
    discount_amount: 17.3,
    tax_amount: 8.65,
    net_amount: 164.35,
    shipping_address: "228 Milbrook Lane, Apt 4B, Phnom Penh",
    receiver_phone: "+1 555 010 2938",
    status: "delivered",
    order_type: "standard",
    payment_status: "paid",
    note: "",
    created_at: "2026-06-18",
    items: [
      { orderItem_id: 1, product_name: "Strata Runner", color: "Jet Black", size: "US 9", qty: 1, unit_price: 128, sub_total: 128 },
      { orderItem_id: 2, product_name: "Core Tee", color: "Signal Blue", size: "M", qty: 1, unit_price: 38, sub_total: 38 },
    ],
    payment: { paymentId: 501, method: "card", amount_paid: 164.35, status: "completed", paid_at: "2026-06-18" },
  },
  {
    order_id: 1002,
    user_id: 1,
    coupon_id: null,
    total_amount: 210,
    discount_amount: 0,
    tax_amount: 10.5,
    net_amount: 220.5,
    shipping_address: "228 Milbrook Lane, Apt 4B, Phnom Penh",
    receiver_phone: "+1 555 010 2938",
    status: "shipped",
    order_type: "standard",
    payment_status: "paid",
    note: "Leave with concierge",
    created_at: "2026-07-10",
    items: [
      { orderItem_id: 3, product_name: "Ridge Shell Jacket", color: "Jet Black", size: "M", qty: 1, unit_price: 210, sub_total: 210 },
    ],
    payment: { paymentId: 502, method: "card", amount_paid: 220.5, status: "completed", paid_at: "2026-07-10" },
  },
  {
    order_id: 1003,
    user_id: 1,
    coupon_id: 2,
    total_amount: 90,
    discount_amount: 8,
    tax_amount: 4.5,
    net_amount: 86.5,
    shipping_address: "Suite 12, Riverside Business Center, Phnom Penh",
    receiver_phone: "+1 555 010 2938",
    status: "processing",
    order_type: "standard",
    payment_status: "paid",
    note: "",
    created_at: "2026-07-21",
    items: [
      { orderItem_id: 4, product_name: "Field Cap", color: "Jet Black", size: "M", qty: 1, unit_price: 32, sub_total: 32 },
      { orderItem_id: 5, product_name: "Mesh Knit Crew", color: "Stone Grey", size: "M", qty: 1, unit_price: 68, sub_total: 58 },
    ],
    payment: { paymentId: 503, method: "cod", amount_paid: 0, status: "pending", paid_at: null },
  },
];

export const orderStatusSteps = ["processing", "shipped", "delivered"];
