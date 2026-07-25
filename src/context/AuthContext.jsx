import { createContext, useContext, useState } from "react";
import { currentUser } from "../data/users";

// UI-only mock: no real authentication happens here, it just toggles
// state so the storefront can demonstrate signed-in vs. guest views.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login() {
    setUser(currentUser);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
