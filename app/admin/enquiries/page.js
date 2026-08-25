"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const STATUSES = ["All", "New", "Contacted", "Converted", "Closed"];

const STATUS_STYLES = {
  New: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  Contacted: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  Converted: "bg-teal-500/15 text-teal-400 ring-teal-500/20",
  Closed: "bg-slate-500/15 text-slate-400 ring-slate-500/20"
};

const STATUS_DOTS = {
  New: "bg-emerald-400",
  Contacted: "bg-amber-400",
  Converted: "bg-teal-400",
  Closed: "bg-slate-400"
};

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border border-white/[0.04] bg-white/[0.02] px-5 py-3">
          <div className="h-4 w-28 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-4 w-36 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-4 w-12 animate-pulse rounded bg-white/[0.06]" />
          <div className="ml-auto h-6 w-20 animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15"
      });
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/enquiries?${params}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  async function handleStatusChange(id, newStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Enquiries</h1>
        <p className="mt-1 text-sm text-slate-400">
          {pagination.total} total enquiries
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-white/[0.03] p-1 ring-1 ring-white/[0.06]">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                statusFilter === s
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}
              {statusFilter === s && (
                <span className="absolute inset-x-1 -bottom-px h-px bg-emerald-400" />
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          >
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 transition-colors focus:border-emerald-500/50 focus:bg-white/[0.05] focus:outline-none sm:w-72"
          />
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : enquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] py-16">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-slate-600">
            <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5z" clipRule="evenodd" />
          </svg>
          <p className="mt-3 text-sm text-slate-400">No enquiries found</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Contact
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Travel
                    </th>
                    <th className="hidden px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                      People
                    </th>
                    <th className="hidden px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                      Category
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {enquiries.map((enq) => (
                    <tr
                      key={enq._id}
                      className="group transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-white">{enq.fullName}</p>
                        <p className="text-xs text-slate-500">{enq.email}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-slate-300">
                          {new Date(enq.dateOfTravel).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short"
                          })}
                        </p>
                        <p className="text-xs text-slate-500">
                          {enq.countryCode} {enq.contactNumber}
                        </p>
                      </td>
                      <td className="hidden px-5 py-3.5 md:table-cell">
                        <span className="text-slate-300">{enq.numberOfPeople}</span>
                        {enq.numberOfChildren > 0 && (
                          <span className="text-slate-500"> +{enq.numberOfChildren}c</span>
                        )}
                      </td>
                      <td className="hidden px-5 py-3.5 md:table-cell">
                        <span className="inline-flex items-center rounded-md bg-white/[0.04] px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/[0.06]">
                          {enq.hotelCategory}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="relative">
                          <select
                            value={enq.status || "New"}
                            disabled={updatingId === enq._id}
                            onChange={(e) =>
                              handleStatusChange(enq._id, e.target.value)
                            }
                            className={`appearance-none rounded-md px-2.5 py-1 pr-7 text-xs font-medium ring-1 cursor-pointer transition-all ${
                              STATUS_STYLES[enq.status || "New"]
                            } disabled:opacity-50`}
                          >
                            {STATUSES.filter((s) => s !== "All").map((s) => (
                              <option key={s} value={s} className="bg-[#1A1A1A] text-white">
                                {s}
                              </option>
                            ))}
                          </select>
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-current opacity-50"
                          >
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        {formatDate(enq.createdAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/enquiries/${enq._id}`}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          Details
                          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                            <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing {(page - 1) * 15 + 1}-
                {Math.min(page * 15, pagination.total)} of {pagination.total}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="flex items-center px-3 text-xs text-slate-500">
                  {page}/{pagination.pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
