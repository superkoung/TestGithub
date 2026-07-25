import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    login();
    navigate("/account");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <span className="eyebrow">Join Notch</span>
      <h1 className="display text-4xl mt-2 mb-8">Create account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
        <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} required />
        <Field label="Password" type="password" value={form.password} onChange={(v) => set("password", v)} required />
        <Button type="submit" variant="primary" size="lg">
          Create account
        </Button>
      </form>

      <p className="text-sm text-ink-soft mt-8 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-ink underline">
          Sign in
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
