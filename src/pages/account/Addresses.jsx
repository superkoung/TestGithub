import { useState } from "react";
import { userAddresses as initialAddresses } from "../../data/users";
import Button from "../../components/common/Button";

export default function Addresses() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ receiver_name: "", receiver_phone: "", address_line: "", city_province: "" });

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    setAddresses((prev) => [
      ...prev,
      { address_id: Date.now(), user_id: 1, is_default: prev.length === 0, ...form },
    ]);
    setForm({ receiver_name: "", receiver_phone: "", address_line: "", city_province: "" });
    setShowForm(false);
  }

  function makeDefault(id) {
    setAddresses((prev) => prev.map((a) => ({ ...a, is_default: a.address_id === id })));
  }

  function remove(id) {
    setAddresses((prev) => prev.filter((a) => a.address_id !== id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">Saved addresses</h2>
        <Button variant="outline" size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Add address"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4 border border-line p-5 max-w-xl">
          <Field label="Receiver name" value={form.receiver_name} onChange={(v) => set("receiver_name", v)} required />
          <Field label="Phone" value={form.receiver_phone} onChange={(v) => set("receiver_phone", v)} required />
          <Field label="Address" value={form.address_line} onChange={(v) => set("address_line", v)} className="sm:col-span-2" required />
          <Field label="City / province" value={form.city_province} onChange={(v) => set("city_province", v)} required />
          <div className="sm:col-span-2">
            <Button type="submit" variant="primary">
              Save address
            </Button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3 max-w-xl">
        {addresses.map((addr) => (
          <div key={addr.address_id} className="border border-line-strong p-4 flex items-start justify-between gap-4">
            <div className="text-sm">
              <div className="font-medium flex items-center gap-2">
                {addr.receiver_name}
                {addr.is_default && <span className="eyebrow text-signal">Default</span>}
              </div>
              <div className="text-ink-soft">{addr.address_line}, {addr.city_province}</div>
              <div className="text-ink-soft">{addr.receiver_phone}</div>
            </div>
            <div className="flex flex-col gap-2 items-end shrink-0">
              {!addr.is_default && (
                <button onClick={() => makeDefault(addr.address_id)} className="eyebrow hover:text-ink text-mute">
                  Make default
                </button>
              )}
              <button onClick={() => remove(addr.address_id)} className="eyebrow text-flare hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, className = "", required }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="eyebrow">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="border border-line-strong px-3 py-2.5 text-sm bg-paper focus:border-ink transition-colors"
      />
    </label>
  );
}
