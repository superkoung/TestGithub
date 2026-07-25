import { formatCurrency } from "../../utils/format";

export default function PriceTag({ amount, size = "md", tone = "light" }) {
  const sizes = {
    sm: "text-xs px-2.5 py-1 pl-4",
    md: "text-sm px-3 py-1.5 pl-5",
    lg: "text-base px-4 py-2 pl-6",
  };
  const tones = {
    light: "bg-ink text-paper",
    signal: "bg-signal text-white",
    outline: "bg-paper text-ink border border-line-strong",
  };

  return (
    <span
      className={`tag-notch mono inline-flex items-center font-medium ${sizes[size]} ${tones[tone]}`}
    >
      {formatCurrency(amount)}
    </span>
  );
}
