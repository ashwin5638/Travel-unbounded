"use client";

import { useEffect, useState } from "react";

const INTEREST_OPTIONS = ["adventure", "relaxation", "culture", "wildlife", "beach", "mountains", "heritage"];

function DestinationSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div className="h-40 animate-pulse bg-white/[0.04]" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const blank = {
    name: "",
    country: "",
    category: "india",
    description: "",
    price: "",
    image: "",
    interests: [],
    highlights: [],
    isActive: true,
    order: 0
  };

  const [form, setForm] = useState(blank);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    try {
      const res = await fetch("/api/admin/destinations");
      const data = await res.json();
      if (data.success) setDestinations(data.data);
    } catch (err) {
      console.error("Failed to fetch destinations:", err);
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setForm(blank);
    setEditingId(null);
    setShowForm(true);
    setMessage("");
  }

  function openEdit(dest) {
    setForm({
      name: dest.name,
      country: dest.country,
      category: dest.category,
      description: dest.description,
      price: dest.price,
      image: dest.image,
      interests: dest.interests || [],
      highlights: dest.highlights || [],
      isActive: dest.isActive,
      order: dest.order || 0
    });
    setEditingId(dest._id);
    setShowForm(true);
    setMessage("");
  }

  function toggleInterest(interest) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const url = editingId
        ? `/api/admin/destinations/${editingId}`
        : "/api/admin/destinations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        setMessage(editingId ? "Destination updated." : "Destination created.");
        setShowForm(false);
        fetchDestinations();
      } else {
        setMessage(data.message || "Failed to save.");
      }
    } catch {
      setMessage("Failed to save destination.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/destinations/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setDestinations((prev) => prev.filter((d) => d._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Destinations</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage travel destinations
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          Add Destination
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-white/[0.06] bg-[#141414]/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">
              {editingId ? "Edit Destination" : "New Destination"}
            </h2>
            <button
              onClick={() => { setShowForm(false); setMessage(""); }}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                placeholder="Kerala"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Country</label>
              <input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                placeholder="India"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              >
                <option value="india" className="bg-[#1A1A1A]">India</option>
                <option value="international" className="bg-[#1A1A1A]">International</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Price</label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="From ₹18,999"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Image URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/kerala.jpg or https://..."
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-white/[0.2] bg-white/[0.04] text-emerald-500 focus:ring-emerald-500/30"
                />
                Active
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">Interests</label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                      form.interests.includes(interest)
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
                        : "bg-white/[0.04] text-slate-400 ring-1 ring-white/[0.06] hover:text-white"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {message && (
            <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              message.includes("updated") || message.includes("created")
                ? "bg-emerald-500/[0.08] text-emerald-400"
                : "bg-red-500/[0.08] text-red-400"
            }`}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                {message.includes("updated") || message.includes("created") ? (
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                )}
              </svg>
              {message}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 disabled:opacity-50"
            >
              {saving && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {editingId ? "Update" : "Create"}
            </button>
            <button
              onClick={() => { setShowForm(false); setMessage(""); }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <DestinationSkeleton key={i} />)}
        </div>
      ) : destinations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] py-16">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-slate-600">
            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a4.103 4.103 0 00.645.507l.018.008zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
          </svg>
          <p className="mt-3 text-sm text-slate-400">No destinations yet</p>
          <button
            onClick={openAdd}
            className="mt-3 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Add your first destination
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              className="group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.1]"
            >
              <div className="relative h-44 bg-white/[0.04]">
                {dest.image ? (
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-slate-600">
                      <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zM3.25 4.5a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H3.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${
                    dest.isActive
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/20"
                      : "bg-red-500/20 text-red-300 ring-1 ring-red-500/20"
                  }`}>
                    {dest.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-sm capitalize ring-1 ring-white/10">
                    {dest.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white">{dest.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400">{dest.country}</p>
                <p className="mt-1.5 text-xs font-medium text-emerald-400">{dest.price}</p>
                {dest.interests && dest.interests.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {dest.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-slate-400 capitalize ring-1 ring-white/[0.06]"
                      >
                        {interest}
                      </span>
                    ))}
                    {dest.interests.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{dest.interests.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-3 flex gap-2 border-t border-white/[0.06] pt-3">
                  <button
                    onClick={() => openEdit(dest)}
                    className="flex-1 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dest._id, dest.name)}
                    className="rounded-lg bg-red-500/[0.06] px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/[0.12]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
