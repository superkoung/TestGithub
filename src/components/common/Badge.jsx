const tones = {
  neutral: "bg-blush text-ink-soft",
  signal: "bg-signal/10 text-signal-ink",
  mint: "bg-mint/10 text-mint",
  flare: "bg-flare/10 text-flare",
  outline: "border border-line-strong text-ink-soft",
};

export default function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-1.5 rounded-none px-2 py-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
