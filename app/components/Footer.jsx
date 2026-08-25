import Link from "next/link";

const exploreLinks = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#experiences", label: "Why us" },
  { href: "/#stories", label: "Traveller stories" },
  { href: "/contact", label: "Plan a trip" },
];

const topDestinations = [
  "Kerala",
  "Ladakh",
  "Serengeti",
  "Iceland",
  "Vietnam",
];

const socials = [
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4.5 w-4.5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M17.7 3H21l-7.3 8.3L22.2 21h-6.7l-5.2-6.2L4.4 21H1l7.8-8.9L1.8 3h6.9l4.7 5.6L17.7 3zm-1.2 16h1.9L6.9 4.9H4.9L16.5 19z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4.5 w-4.5">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26.5 26.5 0 0 0 2 12a26.5 26.5 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26.5 26.5 0 0 0 22 12a26.5 26.5 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-sky-950 text-sky-100">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-strong">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                <circle cx="12" cy="12" r="9" />
                <path d="m15.5 8.5-2 5-5 2 2-5z" />
              </svg>
            </span>
            Travel<span className="-ml-1 text-accent">Unbounded</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sky-200/90">
            We design small-group and private journeys across India and four
            continents, crafted slowly, led locally and remembered forever.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sky-100 transition-colors hover:border-accent hover:bg-accent-strong hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Explore">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Explore</h3>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-sky-100/85 transition-colors hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Top destinations">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Top trips</h3>
          <ul className="mt-5 space-y-3">
            {topDestinations.map((destination) => (
              <li key={destination}>
                <Link href="/#destinations" className="text-sm text-sky-100/85 transition-colors hover:text-white hover:underline">
                  {destination}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-sky-100/85">
            <p>
              <a href="mailto:hello@travelunbounded.com" className="transition-colors hover:text-white hover:underline">
                hello@travelunbounded.com
              </a>
            </p>
            <p>
              <a href="tel:+919820012345" className="transition-colors hover:text-white hover:underline">
                +91 98200 12345
              </a>
            </p>
            <Link href="/contact" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-white">
              Plan a trip
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <p className="text-xs text-sky-200/70">
          &copy; {new Date().getFullYear()} Travel Unbounded. All rights reserved.
        </p>
        <p className="text-xs text-sky-200/70">
          Crafted with care for curious travellers.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
