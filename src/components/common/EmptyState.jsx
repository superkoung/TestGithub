import { Link } from "react-router-dom";
import Button from "./Button";

export default function EmptyState({ eyebrow = "Empty", title, body, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6 border border-dashed border-line-strong">
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h2 className="display text-2xl md:text-3xl mb-3">{title}</h2>
      {body && <p className="text-ink-soft max-w-sm mb-8">{body}</p>}
      {actionLabel && actionTo && (
        <Button as={Link} to={actionTo} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
