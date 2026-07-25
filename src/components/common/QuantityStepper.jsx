export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center border border-line-strong">
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-blush transition-colors disabled:opacity-30"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="mono w-8 text-center text-sm">{value}</span>
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-blush transition-colors disabled:opacity-30"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
