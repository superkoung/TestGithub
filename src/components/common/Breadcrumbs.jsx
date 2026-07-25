import { Link } from "react-router-dom";

export default function Breadcrumbs({ trail }) {
  return (
    <nav className="eyebrow flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
      {trail.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-ink transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ink-soft">{crumb.label}</span>
          )}
          {i < trail.length - 1 && <span className="text-line-strong">/</span>}
        </span>
      ))}
    </nav>
  );
}
