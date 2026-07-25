export function ColorSwatches({ colors, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {colors.map((c) => (
        <button
          key={c.color_id}
          type="button"
          onClick={() => onSelect(c.color_id)}
          title={c.color_name}
          className={`w-9 h-9 rounded-full border-2 transition-all ${
            selected === c.color_id ? "border-signal scale-110" : "border-line-strong hover:border-ink-soft"
          }`}
          style={{ backgroundColor: c.color_code }}
          aria-label={c.color_name}
          aria-pressed={selected === c.color_id}
        />
      ))}
    </div>
  );
}

export function SizeChips({ sizes, selected, onSelect, availableSizeIds, outOfStockSizeIds }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const disabled = !availableSizeIds.includes(s.size_id);
        const lowStock = outOfStockSizeIds?.includes(s.size_id);
        return (
          <button
            key={s.size_id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(s.size_id)}
            className={`mono text-xs min-w-11 h-11 px-3 border transition-colors ${
              selected === s.size_id
                ? "bg-ink text-paper border-ink"
                : disabled
                ? "border-line text-line-strong line-through cursor-not-allowed"
                : "border-line-strong text-ink hover:border-ink"
            }`}
          >
            {s.name}
            {lowStock && !disabled && "•"}
          </button>
        );
      })}
    </div>
  );
}
