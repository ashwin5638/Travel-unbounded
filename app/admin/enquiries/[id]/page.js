"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATUSES = ["New", "Contacted", "Converted", "Closed"];

const STATUS_COLORS = {
  New: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  Contacted: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  Converted: "bg-teal-500/15 text-teal-400 ring-teal-500/20",
  Closed: "bg-slate-500/15 text-slate-400 ring-slate-500/20"
};

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="h-7 w-40 animate-pulse rounded bg-white/[0.06]" />
      <div className="space-y-4 rounded-xl border border-white/[0.06] bg-[#141414]/80 p-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 w-32 animate-pulse rounded bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EnquiryDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchEnquiry() {
      try {
        const res = await fetch(`/api/admin/enquiries/${id}`);
        const data = await res.json();
        if (data.success) {
          setEnquiry(data.data);
          setStatus(data.data.status || "New");
          setNotes(data.data.notes || "");
        }
      } catch (err) {
        console.error("Failed to fetch enquiry:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiry();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Changes saved successfully.");
        setEnquiry(data.data);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Failed to save.");
      }
    } catch {
      setMessage("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this enquiry? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) router.push("/admin/enquiries");
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  if (loading) return <DetailSkeleton />;

  if (!enquiry) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-10 w-10 text-slate-600">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <p className="mt-4 text-sm text-slate-400">Enquiry not found</p>
        <Link href="/admin/enquiries" className="mt-3 text-sm font-medium text-emerald-400 hover:text-emerald-300">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  const infoItems = [
    { label: "Full Name", value: enquiry.fullName },
    { label: "Email", value: enquiry.email, href: `mailto:${enquiry.email}` },
    { label: "Phone", value: `${enquiry.countryCode} ${enquiry.contactNumber}`, href: `tel:${enquiry.countryCode}${enquiry.contactNumber}` },
    { label: "Travel Date", value: new Date(enquiry.dateOfTravel).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
    { label: "Travellers", value: `${enquiry.numberOfPeople}${enquiry.numberOfChildren > 0 ? ` + ${enquiry.numberOfChildren} children` : ""}` },
    { label: "Category", value: enquiry.hotelCategory },
    { label: "Submitted", value: new Date(enquiry.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/enquiries"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Enquiry Details</h1>
          <p className="mt-0.5 text-sm text-slate-400">{enquiry.fullName}</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#141414]/80 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {infoItems.map((item) => (
            <div key={item.label}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="mt-1 block text-sm text-emerald-400 hover:text-emerald-300">{item.value}</a>
              ) : (
                <p className="mt-1 text-sm text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#141414]/80 p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">Manage</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Status</label>
            <div className="flex gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ring-1 ${
                    status === s
                      ? STATUS_COLORS[s]
                      : "bg-white/[0.03] text-slate-400 ring-white/[0.06] hover:bg-white/[0.06] hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="Add internal notes about this enquiry..."
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
            <p className="mt-1 text-right text-xs text-slate-500">{notes.length}/1000</p>
          </div>

          {message && (
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm ${
              message.includes("success") || message.includes("saved")
                ? "bg-emerald-500/[0.08] text-emerald-400"
                : "bg-red-500/[0.08] text-red-400"
            }`}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              {message}
            </div>
          )}

          <div className="flex gap-3 border-t border-white/[0.06] pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50"
            >
              {saving && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              Save Changes
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500/[0.08] px-5 py-2.5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/[0.15]"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022 1.005 9.558A2.75 2.75 0 007.745 18h4.51a2.75 2.75 0 002.742-2.53l1.005-9.558.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
