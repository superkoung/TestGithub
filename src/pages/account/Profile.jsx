import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import { formatDate } from "../../utils/format";

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.credential.email,
  });
  const [saved, setSaved] = useState(false);

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="eyebrow mb-4">Personal details</h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 max-w-xl">
          <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} className="sm:col-span-2" />
          <div className="sm:col-span-2 flex items-center gap-4">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
            {saved && <span className="eyebrow text-mint">Saved</span>}
          </div>
        </form>
      </section>

      <section className="border-t border-line pt-8">
        <h2 className="eyebrow mb-4">Account activity</h2>
        <dl className="grid sm:grid-cols-2 gap-4 max-w-xl text-sm">
          <Row label="Role" value="Customer" />
          <Row label="Status" value={user.status} />
          <Row label="Email verified" value={formatDate(user.credential.email_verified_at)} />
          <Row label="Last login" value={formatDate(user.credential.last_login_at)} />
        </dl>
      </section>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-line-strong px-3 py-2.5 text-sm bg-paper focus:border-ink transition-colors"
      />
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-line pb-2">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="font-medium capitalize">{value}</dd>
    </div>
  );
}
