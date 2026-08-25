"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/#stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
];

function CompassMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-9 w-9"
      role="img"
      aria-label="Travel Unbounded logo"
    >
      <circle cx="20" cy="20" r="18" fill="#0c4a6e" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
      <path d="M27 13 L22.5 22.5 L13 27 L17.5 17.5 Z" fill="#ea580c" />
      <path d="M27 13 L22.5 22.5 L17.5 17.5 Z" fill="#f97316" />
      <circle cx="20" cy="20" r="1.6" fill="#f0f9ff" />
    </svg>
  );
}

function BarsIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-background/95 shadow-[0_1px_0_0_var(--color-border-soft)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <Link
            href="/"
            className={`flex items-center gap-2.5 font-display text-xl font-bold tracking-tight transition-colors ${
              scrolled || menuOpen ? "text-ink" : "text-white"
            }`}
          >
            <CompassMark />
            Travel<span className="-ml-1 text-accent">Unbounded</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                    scrolled ? "text-muted-foreground hover:text-ink" : "text-sky-100 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent"
            >
              Plan My Trip
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
              scrolled || menuOpen ? "text-ink hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
          >
            <BarsIcon open={menuOpen} />
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={`${menuOpen ? "block" : "hidden"} border-t border-border-soft bg-background md:hidden`}
        >
          <ul className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white"
              >
                Plan My Trip
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
