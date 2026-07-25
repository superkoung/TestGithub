import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { categories } from "../../data/taxonomy";

const navLink = ({ isActive }) =>
  `eyebrow transition-colors hover:text-ink ${isActive ? "text-ink" : "text-mute"}`;

export default function Navbar() {
  const { totalQty } = useCart();
  const { count } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="border-b border-line bg-ink text-paper overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-1.5 mono text-[0.65rem] tracking-widest uppercase flex">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {[
                "Free shipping over $75",
                "New arrivals every Friday",
                "Easy 30-day returns",
                "Made-to-order tees restocked",
              ].map((t, j) => (
                <span key={j} className="mx-6">
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            className="md:hidden eyebrow"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <Link to="/" className="display text-2xl font-extrabold tracking-tight">
            NOTCH
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/shop" className={navLink}>
              Shop All
            </NavLink>
            {categories.map((c) => (
              <NavLink key={c.category_id} to={`/shop?category=${c.slug}`} className={navLink}>
                {c.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="eyebrow hidden sm:inline hover:text-ink text-mute"
            >
              {isAuthenticated ? user.name.split(" ")[0] : "Sign in"}
            </Link>
            <Link to="/wishlist" className="relative eyebrow text-mute hover:text-ink" aria-label="Wishlist">
              <HeartIcon />
              {count > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-flare text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative eyebrow text-mute hover:text-ink" aria-label="Cart">
              <BagIcon />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-signal text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-line px-4 py-4 flex flex-col gap-4 bg-paper">
          <NavLink to="/shop" className={navLink} onClick={() => setMenuOpen(false)}>
            Shop All
          </NavLink>
          {categories.map((c) => (
            <NavLink
              key={c.category_id}
              to={`/shop?category=${c.slug}`}
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              {c.name}
            </NavLink>
          ))}
          <NavLink to={isAuthenticated ? "/account" : "/login"} className={navLink} onClick={() => setMenuOpen(false)}>
            {isAuthenticated ? "My account" : "Sign in"}
          </NavLink>
        </nav>
      )}
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2.2 4.5 5.7 4c2-.3 3.9.7 5 2.3C11.8 4.7 13.7 3.7 15.7 4c3.5.5 5.3 4 3.7 7.7C17.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l1 12.5a1 1 0 0 1-1 1.5H6a1 1 0 0 1-1-1.5L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
