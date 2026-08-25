"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const STATUS_COLORS = {
  New: "#34D399",
  Contacted: "#FBBF24",
  Converted: "#2DD4BF",
  Closed: "#64748B"
};

const PIE_COLORS = ["#34D399", "#FBBF24", "#2DD4BF", "#64748B"];

function StatCard({ label, value, change, icon, color }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#141414]/80 p-5 transition-all duration-200 hover:border-white/[0.1] hover:bg-[#1A1A1A]/80">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-400">{label}</p>
          <p className={`mt-2 text-3xl font-bold tracking-tight ${color || "text-white"}`}>
            {value}
          </p>
          {change && (
            <p className="mt-1 text-xs text-slate-500">{change}</p>
          )}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${icon.bg}`}>
          <span className={icon.color}>{icon.svg}</span>
        </div>
      </div>
      <div className={`absolute inset-x-0 bottom-0 h-px ${
        color?.includes("emerald")
          ? "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
          : color?.includes("teal")
          ? "bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
          : color?.includes("amber")
          ? "bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
          : "bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"
      }`} />
    </div>
  );
}

function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-[#141414]/80 ${className}`}>
      <div className="flex items-center justify-between px-5 pt-5 pb-1">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>
      <div className="px-3 pb-4 pt-2">{children}</div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#141414]/80 p-5">
      <div className="h-4 w-24 animate-pulse rounded bg-white/[0.06]" />
      <div className="mt-3 h-8 w-16 animate-pulse rounded bg-white/[0.06]" />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        if (data.success) setAnalytics(data.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-7 w-32 animate-pulse rounded bg-white/[0.06]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-xl border border-white/[0.06] bg-[#141414]/80" />
          <div className="h-72 animate-pulse rounded-xl border border-white/[0.06] bg-[#141414]/80" />
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-red-400">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="mt-4 text-sm text-slate-400">Failed to load analytics</p>
      </div>
    );
  }

  const { totalEnquiries, statusBreakdown, enquiriesOverTime, hotelCategoryBreakdown } = analytics;

  const pieData = Object.entries(statusBreakdown)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0);

  const hotelData = Object.entries(hotelCategoryBreakdown).map(([name, value]) => ({
    name,
    value
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-white/[0.1] bg-[#1A1A1A] px-3 py-2 shadow-xl">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-sm font-semibold text-white">{payload[0].value} enquiries</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Overview of your travel business</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Enquiries"
          value={totalEnquiries}
          color="text-white"
          icon={{
            bg: "bg-emerald-500/10",
            color: "text-emerald-400",
            svg: (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5z" clipRule="evenodd" />
              </svg>
            )
          }}
        />
        <StatCard
          label="New"
          value={statusBreakdown.New}
          color="text-emerald-400"
          icon={{
            bg: "bg-emerald-500/10",
            color: "text-emerald-400",
            svg: (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
            )
          }}
        />
        <StatCard
          label="Converted"
          value={statusBreakdown.Converted}
          color="text-teal-400"
          icon={{
            bg: "bg-teal-500/10",
            color: "text-teal-400",
            svg: (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            )
          }}
        />
        <StatCard
          label="Closed"
          value={statusBreakdown.Closed}
          color="text-slate-400"
          icon={{
            bg: "bg-slate-500/10",
            color: "text-slate-400",
            svg: (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )
          }}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard title="Enquiries Trend" className="lg:col-span-2">
          {enquiriesOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={enquiriesOverTime}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#34D399"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEnquiries)"
                  name="Enquiries"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
              No data yet
            </div>
          )}
        </ChartCard>

        <ChartCard title="Status Breakdown">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#F8FAFC" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
              No data yet
            </div>
          )}
          {pieData.length > 0 && (
            <div className="flex flex-wrap gap-4 px-5 pb-2">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <span className="text-xs text-slate-400">
                    {entry.name} <span className="font-medium text-slate-300">{entry.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <ChartCard title="Hotel Category">
          {hotelData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hotelData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.2)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#34D399" radius={[6, 6, 0, 0]} name="Enquiries" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-56 items-center justify-center text-sm text-slate-500">
              No data yet
            </div>
          )}
        </ChartCard>

        <ChartCard title="Conversion Funnel" className="lg:col-span-2">
          <div className="space-y-4 px-2 pt-2">
            {["New", "Contacted", "Converted", "Closed"].map((status) => {
              const count = statusBreakdown[status] || 0;
              const pct = totalEnquiries > 0 ? Math.round((count / totalEnquiries) * 100) : 0;
              return (
                <div key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: STATUS_COLORS[status] }}
                      />
                      <span className="text-slate-300">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{count}</span>
                      <span className="text-xs text-slate-500">({pct}%)</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: STATUS_COLORS[status]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
