const variants = {
  primary: "bg-ink text-paper hover:bg-signal",
  signal: "bg-signal text-white hover:bg-signal-ink",
  outline: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
  ghost: "bg-transparent text-ink hover:bg-blush",
  flare: "bg-flare text-white hover:opacity-90",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Tag = "button",
  disabled = false,
  ...rest
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ letterSpacing: "0.04em" }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Tag>
  );
}
