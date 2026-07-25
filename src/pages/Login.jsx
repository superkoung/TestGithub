import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login();
    navigate("/account");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <span className="eyebrow">Welcome back</span>
      <h1 className="display text-4xl mt-2 mb-8">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={password} onChange={setPassword} required />
        <div className="flex justify-between eyebrow">
          <label className="flex items-center gap-2 normal-case text-ink-soft">
            <input type="checkbox" className="accent-ink" /> Remember me
          </label>
          <Link to="/login" className="hover:text-ink">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-ink-soft mt-8 text-center">
        New to Notch?{" "}
        <Link to="/register" className="text-ink underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="border border-line-strong px-3 py-2.5 text-sm bg-paper focus:border-ink transition-colors"
      />
    </label>
  );
}
