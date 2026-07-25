import { useState } from "react";
import Rating from "../common/Rating";
import Button from "../common/Button";
import { formatDate } from "../../utils/format";

export function ReviewList({ reviews }) {
  if (!reviews.length) {
    return (
      <p className="text-ink-soft text-sm py-6">
        No reviews yet — be the first to share how these fit and feel.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line">
      {reviews.map((r) => (
        <li key={r.review_id} className="py-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Rating value={r.rating} size="sm" />
            <span className="eyebrow">{formatDate(r.created_at)}</span>
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">{r.comment}</p>
          <span className="text-xs font-medium">{r.user_name}</span>
        </li>
      ))}
    </ul>
  );
}

export function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ rating, comment, user_name: name.trim() || "Guest" });
    setComment("");
    setName("");
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-line p-5">
      <div>
        <label className="eyebrow block mb-2">Your rating</label>
        <div className="flex gap-1 text-2xl">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={n <= rating ? "text-ink" : "text-line-strong"}
              aria-label={`${n} star`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="review-name" className="eyebrow block mb-2">
          Name
        </label>
        <input
          id="review-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan R."
          className="w-full border border-line-strong px-3 py-2 text-sm bg-paper focus:border-ink transition-colors"
        />
      </div>
      <div>
        <label htmlFor="review-comment" className="eyebrow block mb-2">
          Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="How did it fit, wear, and hold up?"
          className="w-full border border-line-strong px-3 py-2 text-sm bg-paper focus:border-ink transition-colors resize-none"
        />
      </div>
      <Button type="submit" variant="primary" className="self-start">
        Post review
      </Button>
    </form>
  );
}
