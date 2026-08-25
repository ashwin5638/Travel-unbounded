import Link from "next/link";

export const metadata = {
  title: "About Us | Travel Unbounded",
  description:
    "India's Most Trusted Experiential Travel Experts. Learn about Travel Unbounded — our story, offices, and what makes us different."
};

const offices = [
  {
    city: "Bengaluru",
    label: "Headquarters",
    lines: [
      "541, 7th Main Rd, HAL 2nd Stage",
      "Indiranagar, Bengaluru – 560008",
      "India"
    ]
  },
  {
    city: "Kochi",
    label: "Kerala Office",
    lines: [
      "LR Towers, S Janatha Road",
      "Palavivatton, Kochi – 682025",
      "India"
    ]
  },
  {
    city: "Nairobi",
    label: "Kenya Office",
    lines: [
      "Westpark Towers, Muthithi Road",
      "Nairobi, P.O. Box 6950",
      "Postal Code 00100, Kenya"
    ]
  }
];

const values = [
  {
    title: "Personally-Vetted Experiences",
    description:
      "Every destination, resort, and activity we recommend has been personally experienced by our team. We never sell what we have not seen ourselves.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    )
  },
  {
    title: "Local Guides",
    description:
      "We partner with local guides who know every trail, market, and hidden gem. Your money stays where you travel, supporting real communities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    )
  },
  {
    title: "Custom Itineraries",
    description:
      "No two travellers are alike. We build every trip from scratch around the people taking it — their pace, their interests, their story.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  },
  {
    title: "24/7 On-Trip Support",
    description:
      "From the moment you land to the moment you fly back, our team is a phone call away. Real people, not bots, ready to help at any hour.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    )
  }
];

const AboutPage = () => {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-strong">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            Our story
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            India&apos;s Most Trusted
            <br />
            <em className="text-accent not-italic">Experiential Travel Experts</em>
          </h1>
        </div>

        {/* Company Story */}
        <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Travel Unbounded was born from a simple belief — that the best
            journeys aren&apos;t sold from a catalogue. They&apos;re built
            around the people taking them.
          </p>
          <p>
            Headquartered in Bangalore with offices in Kerala and Nairobi, we
            design trips that blend comfort, culture, and raw nature. Every
            destination, resort, and activity we recommend has been personally
            experienced by our team.
          </p>
          <p>
            From spotting the Big Five at dawn in the Masai Mara to cruising Ha
            Long Bay at sunset — we go where real stories are written, and we
            bring you along.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Why choose us
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-card p-8 shadow-md shadow-sky-950/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-strong">
                  {value.icon}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-20">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Our offices
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.city}
                className="rounded-3xl bg-card p-8 text-center shadow-md shadow-sky-950/5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-strong">
                  {office.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  {office.city}
                </h3>
                <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-primary-strong p-10 text-center shadow-xl shadow-sky-900/30 sm:p-14">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to start planning?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sky-100">
            Send us your travel ideas and we will craft a handpicked itinerary
            with an honest quote within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:bg-accent-strong"
          >
            Get in touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
