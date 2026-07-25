import { categories, brands, colors, sizes } from "../../data/taxonomy";

export default function FilterSidebar({ filters, setFilters, resultCount }) {
  function toggleArrayFilter(key, value) {
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: [...set] };
    });
  }

  function clearAll() {
    setFilters({ category: [], brand: [], color: [], size: [], maxPrice: 300 });
  }

  const activeCount =
    filters.category.length + filters.brand.length + filters.color.length + filters.size.length;

  return (
    <aside className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{resultCount} results</span>
        {activeCount > 0 && (
          <button onClick={clearAll} className="eyebrow text-flare hover:underline">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {categories.map((c) => (
          <Checkbox
            key={c.category_id}
            label={c.name}
            checked={filters.category.includes(c.slug)}
            onChange={() => toggleArrayFilter("category", c.slug)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <Checkbox
            key={b.brand_id}
            label={b.brand_name}
            checked={filters.brand.includes(b.brand_id)}
            onChange={() => toggleArrayFilter("brand", b.brand_id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2.5 pt-1">
          {colors.map((c) => (
            <button
              key={c.color_id}
              onClick={() => toggleArrayFilter("color", c.color_id)}
              title={c.color_name}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                filters.color.includes(c.color_id)
                  ? "border-signal scale-110"
                  : "border-line-strong hover:border-ink-soft"
              }`}
              style={{ backgroundColor: c.color_code }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2 pt-1">
          {sizes.map((s) => (
            <button
              key={s.size_id}
              onClick={() => toggleArrayFilter("size", s.size_id)}
              className={`mono text-xs px-2.5 h-8 border transition-colors ${
                filters.size.includes(s.size_id)
                  ? "bg-ink text-paper border-ink"
                  : "border-line-strong hover:border-ink"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Max price">
        <div className="flex flex-col gap-2 pt-1">
          <input
            type="range"
            min={20}
            max={300}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full"
          />
          <span className="mono text-xs text-mute">Up to ${filters.maxPrice}</span>
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
      <span
        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
          checked ? "bg-ink border-ink" : "border-line-strong group-hover:border-ink-soft"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-ink-soft group-hover:text-ink transition-colors">{label}</span>
    </label>
  );
}
