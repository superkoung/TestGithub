import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <span className="eyebrow">404</span>
      <h1 className="display text-4xl md:text-5xl mt-4 mb-6">Page not found</h1>
      <p className="text-ink-soft mb-10">
        The page you're after has been discontinued or never existed.
      </p>
      <Button as={Link} to="/" variant="primary">
        Back to home
      </Button>
    </div>
  );
}
