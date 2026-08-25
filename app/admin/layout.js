"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "Destinations",
    href: "/admin/destinations",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a4.103 4.103 0 00.645.507l.018.008zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
      </svg>
    )
  }
];

function LogoMark() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-7 w-7">
      <rect x="1" y="1" width="18" height="18" rx="5" stroke="#34D399" strokeWidth="1.5" fill="#141414" />
      <path d="M14 7.5L10.5 14L7 7.5" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="10" cy="7" r="1.3" fill="#34D399" />
    </svg>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const main = document.getElementById("admin-main-scroll");
    if (!main) return;
    function onScroll() {
      setScrolled(main.scrollTop > 4);
    }
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.06] bg-[#141414]/95 backdrop-blur-xl transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[68px] items-center gap-3 px-5">
          <LogoMark />
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              TravelUnbounded
            </span>
            <span className="text-[11px] font-medium text-emerald-400/90">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="mx-4 h-px bg-white/[0.06]" />

        <div className="px-3 pt-4 pb-1">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Management
          </p>
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-emerald-500/[0.1] text-emerald-400"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                }`}
              >
                <span
                  className={`transition-colors duration-150 ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {link.icon}
                </span>
                {link.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 h-px bg-white/[0.06]" />

        <div className="px-3 pb-4 pt-2 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-400 transition-all duration-150 hover:bg-white/[0.04] hover:text-slate-200"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px] text-slate-500">
              <path fillRule="evenodd" d="M17 2.75a.75.75 0 00-1.5 0v12.59l-4.72-4.72a.75.75 0 00-1.06 0L3.75 16.34V3.75a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0h15a.75.75 0 000-1.5H3.75l4.72-4.72a.75.75 0 011.06 0l5.97 5.97V2.75z" clipRule="evenodd" />
            </svg>
            View Website
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-400 transition-all duration-150 hover:bg-red-500/[0.08] hover:text-red-400"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
              <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clipRule="evenodd" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header
          className={`sticky top-0 z-30 flex h-[68px] shrink-0 items-center border-b px-4 backdrop-blur-xl sm:px-6 transition-colors duration-150 ${
            scrolled
              ? "border-white/[0.08] bg-[#141414]/90 shadow-lg shadow-black/40"
              : "border-white/[0.06] bg-[#141414]/60"
          }`}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-300">Live</span>
            </div>
          </div>
        </header>

        <main id="admin-main-scroll" className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
