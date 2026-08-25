"use client";

import Link from "next/link";

const stats = [
  { value: "12k+", label: "Happy travellers" },
  { value: "40+", label: "Destinations curated" },
  { value: "4.9", label: "Average rating", star: true },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="#fbbf24" aria-hidden="true" className="h-5 w-5">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

function HeroScene() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="45%" stopColor="#0c4a6e" />
            <stop offset="78%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#fde68a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#075985" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#052e45" />
            <stop offset="100%" stopColor="#02101c" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#sky)" />

        <circle cx="1080" cy="300" r="230" fill="url(#sunGlow)" />
        <circle cx="1080" cy="300" r="64" fill="#fef3c7" opacity="0.9" />

        <g className="clouds-drift" fill="#ffffff">
          <g opacity="0.16" transform="translate(0,120)">
            <ellipse cx="180" cy="40" rx="90" ry="18" />
            <ellipse cx="520" cy="90" rx="130" ry="22" />
            <ellipse cx="980" cy="60" rx="110" ry="20" />
            <ellipse cx="1340" cy="110" rx="150" ry="24" />
            <ellipse cx="1620" cy="40" rx="90" ry="18" />
            <ellipse cx="1920" cy="90" rx="130" ry="22" />
            <ellipse cx="2380" cy="60" rx="110" ry="20" />
            <ellipse cx="2740" cy="110" rx="150" ry="24" />
          </g>
          <g opacity="0.1" transform="translate(0,220)">
            <ellipse cx="420" cy="30" rx="160" ry="26" />
            <ellipse cx="1120" cy="70" rx="200" ry="30" />
            <ellipse cx="1820" cy="30" rx="160" ry="26" />
            <ellipse cx="2520" cy="70" rx="200" ry="30" />
          </g>
        </g>

        <path
          d="M0 560 L140 480 L260 545 L400 430 L560 560 L700 500 L840 565 L1010 450 L1160 555 L1300 495 L1440 560 L1440 900 L0 900 Z"
          fill="url(#ridgeFar)"
        />
        <path
          d="M1010 450 L1060 488 L1035 492 L1085 532 L1120 512 L1160 555 L1040 585 L980 520 Z"
          fill="#e0f2fe"
          opacity="0.85"
        />
        <path
          d="M400 430 L448 472 L420 475 L468 520 L392 545 L340 480 Z"
          fill="#e0f2fe"
          opacity="0.8"
        />
        <path
          d="M0 660 L170 560 L330 650 L520 540 L720 665 L900 575 L1090 670 L1260 585 L1440 665 L1440 900 L0 900 Z"
          fill="url(#ridgeMid)"
        />
        <path
          d="M0 790 L210 690 L430 800 L640 700 L880 815 L1100 705 L1320 810 L1440 750 L1440 900 L0 900 Z"
          fill="url(#ridgeNear)"
        />

        <g stroke="#f0f9ff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M320 250 q12 -12 24 0 M344 238 q10 -10 20 0" />
          <path d="M420 190 q10 -10 20 0 M440 202 q9 -9 18 0" />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#04121e]/80 to-transparent" />
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-[72px]">
      <HeroScene />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          Handcrafted journeys since 2011
        </p>

        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          India&apos;s Most Trusted
          <br />
          Experiential <em className="text-accent not-italic underline decoration-accent/60 decoration-8 underline-offset-8">Travel Experts</em>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky-100">
          From Himalayan monasteries to African savannas, we design trips that
          blend comfort, culture, and raw nature. Every destination, resort, and
          activity has been personally experienced by our team.
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent-strong px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          Plan Your Trip
        </Link>

        <dl className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-white">{stat.value}</span>
              {stat.star && <StarIcon />}
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-sky-200">
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
