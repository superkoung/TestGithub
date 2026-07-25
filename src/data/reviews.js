// Mirrors: reviews table
export const reviews = [
  {
    review_id: 1,
    product_id: 1,
    user_id: 2,
    user_name: "Marcus T.",
    rating: 5,
    comment: "Broke these in over a week and now I don't want to wear anything else. True to size.",
    created_at: "2026-06-02",
  },
  {
    review_id: 2,
    product_id: 1,
    user_id: 3,
    user_name: "Priya S.",
    rating: 4,
    comment: "Comfortable out of the box. Runs slightly narrow through the midfoot.",
    created_at: "2026-06-11",
  },
  {
    review_id: 3,
    product_id: 1,
    user_id: 4,
    user_name: "Dan O.",
    rating: 5,
    comment: "Best daily trainer I've owned in years. Sizing was spot on for me.",
    created_at: "2026-06-20",
  },
  {
    review_id: 4,
    product_id: 3,
    user_id: 2,
    user_name: "Marcus T.",
    rating: 5,
    comment: "Kept me dry through a full day of rain in the hills. Pit zips actually work.",
    created_at: "2026-05-14",
  },
  {
    review_id: 5,
    product_id: 3,
    user_id: 5,
    user_name: "Leah W.",
    rating: 3,
    comment: "Good shell, but the hood doesn't cinch tight enough in wind for me.",
    created_at: "2026-05-29",
  },
  {
    review_id: 6,
    product_id: 5,
    user_id: 3,
    user_name: "Priya S.",
    rating: 5,
    comment: "The fabric weight is exactly what I look for. Ordered three more.",
    created_at: "2026-07-01",
  },
  {
    review_id: 7,
    product_id: 7,
    user_id: 4,
    user_name: "Dan O.",
    rating: 4,
    comment: "Brim holds its shape well. Strap could use one more notch for smaller heads.",
    created_at: "2026-07-08",
  },
];

export function getReviewsForProduct(productId) {
  return reviews.filter((r) => r.product_id === productId);
}

export function getAverageRating(productId) {
  const list = getReviewsForProduct(productId);
  if (!list.length) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}
