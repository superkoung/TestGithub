import { Link } from "react-router-dom";
import { getPrimaryImage } from "../../data/variants";
import { formatCurrency } from "../../utils/format";
import QuantityStepper from "../common/QuantityStepper";

export default function CartLineItem({ item, onQtyChange, onRemove }) {
  const image = getPrimaryImage(item.product.product_id);

  return (
    <div className="flex gap-4 py-6 border-b border-line">
      <Link to={`/product/${item.product.slug}`} className="w-24 h-28 shrink-0 bg-blush overflow-hidden">
        <img src={image} alt={item.product.name} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <Link to={`/product/${item.product.slug}`} className="display text-lg hover:text-signal transition-colors">
            {item.product.name}
          </Link>
          <div className="eyebrow mt-1">
            {item.color?.color_name} · {item.size?.name}
          </div>
          <div className="mono text-xs text-mute mt-1">SKU {item.variant.sku}</div>
          <button
            type="button"
            onClick={() => onRemove(item.variant_id)}
            className="eyebrow text-flare hover:underline mt-3"
          >
            Remove
          </button>
        </div>

        <div className="flex sm:flex-col items-end sm:items-end justify-between sm:justify-start gap-3">
          <span className="mono text-sm font-medium">{formatCurrency(item.sub_total)}</span>
          <QuantityStepper
            value={item.qty}
            onChange={(qty) => onQtyChange(item.variant_id, qty)}
            max={item.variant.stock}
          />
        </div>
      </div>
    </div>
  );
}
