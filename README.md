# NOTCH — E-commerce Storefront (UI only)

A front-end-only React implementation of an e-commerce shop, built to match the
database schema you shared (users, credentials, roles, products, product_variants,
product_images, categories, brands, colors, sizes, carts/cartItems, wishlists,
reviews, coupons, orders/orderItems, payments, user_addresses).

There is **no backend** — all data lives in `src/data/*.js` as mock records shaped
like the tables in your ERD, and cart/wishlist/auth state is kept in React Context
for the session only (nothing persists after a refresh).

## Stack
- React 19 + Vite
- Tailwind CSS v4
- React Router v7

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  data/               Mock "tables" — one file per group of related entities
    taxonomy.js         categories, brands, colors, sizes, roles
    products.js          products, product photo sets
    variants.js           product_variants + product_images (generated combos)
    reviews.js              reviews
    coupons.js                coupons + validation helper
    users.js                    current user, credentials, user_addresses
    orders.js                     sample order history (orders/orderItems/payments)

  context/            App-wide state (mirrors session-scoped tables)
    CartContext.jsx     carts + cartItems
    WishlistContext.jsx wishlists
    AuthContext.jsx     mock sign-in/out (no real auth)

  components/
    layout/            Navbar, Footer, page Layout shell
    product/           ProductCard, ProductGrid, variant swatch/size pickers, reviews UI
    cart/              Cart line item, order summary, coupon form
    filters/           Shop page filter sidebar (category/brand/color/size/price)
    common/            Button, Badge, Rating, PriceTag, Breadcrumbs, EmptyState, QuantityStepper

  pages/
    Home.jsx           Landing page
    Shop.jsx            Product listing with filters + sort
    ProductDetail.jsx    Single product, variant selection, reviews
    Cart.jsx              Cart contents + coupon
    Wishlist.jsx            Saved products
    Checkout.jsx              Address / payment / place order
    OrderConfirmation.jsx      Post-checkout confirmation
    Login.jsx / Register.jsx    Auth forms (UI only)
    NotFound.jsx                 404
    account/
      AccountLayout.jsx  Sidebar shell for signed-in area
      Profile.jsx        Edit profile
      Orders.jsx          Order history list
      OrderDetail.jsx       Single order status + items + payment
      Addresses.jsx           Manage shipping addresses

  App.jsx              Route table, wraps app in Auth/Wishlist/Cart providers
  main.jsx             Entry point
  index.css            Design tokens (Tailwind v4 @theme), fonts, base styles
```

## Notes for wiring up a real backend later
- Swap the functions/arrays in `src/data/*.js` for API calls (e.g. React Query or
  fetch) — the components already consume plain arrays/objects shaped like your
  tables, so the prop contracts should mostly carry over.
- `CartContext` / `WishlistContext` / `AuthContext` are the natural seams to replace
  with real API-backed state (session cart, persisted wishlist, real auth/JWT).
- Checkout currently fabricates an order id client-side — replace with the real
  `POST /orders` response.
