import { Link, useParams } from "react-router-dom";
import { pastOrders, orderStatusSteps } from "../../data/orders";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

export default function OrderDetail() {
  const { orderId } = useParams();
  const order = pastOrders.find((o) => String(o.order_id) === orderId);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-soft mb-6">Order not found.</p>
        <Button as={Link} to="/account/orders">
          Back to orders
        </Button>
      </div>
    );
  }

  const currentStepIndex = orderStatusSteps.indexOf(order.status);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/account/orders" className="eyebrow hover:text-ink text-mute">
            ← All orders
          </Link>
          <h2 className="display text-2xl mt-2">Order #{order.order_id}</h2>
          <span className="eyebrow">{formatDate(order.created_at)}</span>
        </div>
        <Badge tone="outline" className="capitalize">
          Payment: {order.payment_status}
        </Badge>
      </div>

      {order.status !== "cancelled" && (
        <div className="flex items-center">
          {orderStatusSteps.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    i <= currentStepIndex ? "bg-signal" : "bg-line-strong"
                  }`}
                />
                <span className="eyebrow capitalize">{step}</span>
              </div>
              {i < orderStatusSteps.length - 1 && (
                <div className={`h-px flex-1 mx-2 ${i < currentStepIndex ? "bg-signal" : "bg-line-strong"}`} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-[1fr_280px] gap-10">
        <div>
          <h3 className="eyebrow mb-4">Items</h3>
          <div className="flex flex-col divide-y divide-line border-t border-b border-line">
            {order.items.map((item) => (
              <div key={item.orderItem_id} className="flex justify-between items-center py-4">
                <div>
                  <div className="font-medium text-sm">{item.product_name}</div>
                  <div className="eyebrow mt-1">{item.color} · {item.size} · Qty {item.qty}</div>
                </div>
                <span className="mono text-sm">{formatCurrency(item.sub_total)}</span>
              </div>
            ))}
          </div>

          {order.note && (
            <div className="mt-6 text-sm">
              <span className="eyebrow block mb-1">Note</span>
              <p className="text-ink-soft">{order.note}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-line p-5">
            <h3 className="eyebrow mb-3">Shipping to</h3>
            <p className="text-sm text-ink-soft">{order.shipping_address}</p>
            <p className="text-sm text-ink-soft mt-1">{order.receiver_phone}</p>
          </div>

          <div className="border border-line p-5 flex flex-col gap-2 text-sm">
            <h3 className="eyebrow mb-1">Totals</h3>
            <Row label="Subtotal" value={formatCurrency(order.total_amount)} />
            {order.discount_amount > 0 && (
              <Row label="Discount" value={`− ${formatCurrency(order.discount_amount)}`} />
            )}
            <Row label="Tax" value={formatCurrency(order.tax_amount)} />
            <div className="flex justify-between border-t border-line pt-2 mt-1 font-medium">
              <span>Net paid</span>
              <span className="mono">{formatCurrency(order.net_amount)}</span>
            </div>
          </div>

          <div className="border border-line p-5 text-sm">
            <h3 className="eyebrow mb-3">Payment</h3>
            <Row label="Method" value={order.payment.method.toUpperCase()} />
            <Row label="Status" value={order.payment.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-soft">{label}</span>
      <span className="mono capitalize">{value}</span>
    </div>
  );
}
