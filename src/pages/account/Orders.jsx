import { Link } from "react-router-dom";
import { pastOrders } from "../../data/orders";
import { formatCurrency, formatDate } from "../../utils/format";
import Badge from "../../components/common/Badge";
import EmptyState from "../../components/common/EmptyState";

const statusTone = {
  processing: "outline",
  shipped: "signal",
  delivered: "mint",
  cancelled: "flare",
};

export default function Orders() {
  if (!pastOrders.length) {
    return (
      <EmptyState
        eyebrow="Orders"
        title="No orders yet"
        body="Once you place an order, it'll show up here with live status."
        actionLabel="Start shopping"
        actionTo="/shop"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="eyebrow">Order history</h2>
      <div className="flex flex-col divide-y divide-line border-t border-b border-line">
        {pastOrders.map((order) => (
          <Link
            key={order.order_id}
            to={`/account/orders/${order.order_id}`}
            className="flex flex-wrap items-center justify-between gap-3 py-5 hover:bg-blush/50 transition-colors px-2 -mx-2"
          >
            <div>
              <div className="font-medium mono text-sm">#{order.order_id}</div>
              <div className="eyebrow mt-1">{formatDate(order.created_at)} · {order.items.length} item(s)</div>
            </div>
            <Badge tone={statusTone[order.status] || "outline"} className="capitalize">
              {order.status}
            </Badge>
            <span className="mono text-sm font-medium">{formatCurrency(order.net_amount)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
