export default function Rating({ value = 0, count, size = "sm" }) {
  const rounded = Math.round(value * 2) / 2;
  const dim = size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${dim} text-ink`} aria-label={`${value.toFixed(1)} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rounded ? "opacity-100" : "opacity-20"}>
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="eyebrow !text-mute normal-case">({count})</span>
      )}
    </div>
  );
}
