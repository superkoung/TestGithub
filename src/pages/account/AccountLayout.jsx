import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const links = [
  { to: "/account", label: "Profile", end: true },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/addresses", label: "Addresses" },
];

export default function AccountLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Account" }]} />
      <h1 className="display text-4xl md:text-5xl mt-4 mb-2">Hi, {user.name.split(" ")[0]}</h1>
      <p className="text-ink-soft mb-10">{user.credential.email}</p>

      <div className="grid md:grid-cols-[200px_1fr] gap-10">
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `eyebrow px-3 py-2.5 whitespace-nowrap transition-colors ${
                  isActive ? "bg-ink text-paper" : "text-ink-soft hover:bg-blush"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="eyebrow px-3 py-2.5 text-left text-flare hover:bg-blush whitespace-nowrap"
          >
            Sign out
          </button>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
