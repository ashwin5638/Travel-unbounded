const features = [
  {
    title: "Local expert guides",
    description:
      "Every trip is led by guides born and raised in the region, sharing stories no guidebook will ever tell you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.4 3.7-5.5 7-5.5s6.2 2.1 7 5.5" />
        <path d="M12 1.5v1M12 21.5v1M1.5 12h1M21.5 12h1" />
      </svg>
    ),
  },
  {
    title: "Small groups only",
    description:
      "Maximum twelve travellers per departure, so you linger longer in the places buses simply drive past.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <circle cx="8" cy="8.5" r="2.8" />
        <circle cx="16.5" cy="9.5" r="2.2" />
        <path d="M3 19c.6-2.8 2.6-4.5 5-4.5s4.4 1.7 5 4.5M14.5 14.7c2 .2 3.7 1.7 4.2 4.3" />
      </svg>
    ),
  },
  {
    title: "24/7 on-trip care",
    description:
      "Flight delayed? Weather turned? A real human on our crew is one message away, across every timezone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M4.5 13a7.5 7.5 0 0 1 15 0" />
        <rect x="2.5" y="13" width="4" height="6" rx="2" />
        <rect x="17.5" y="13" width="4" height="6" rx="2" />
        <path d="M19.5 19a3.5 3.5 0 0 1-3.5 2.5h-2" />
      </svg>
    ),
  },
  {
    title: "Travel that gives back",
    description:
      "We partner with local homestays, offset every kilometre and fund conservation in the parks we explore.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M12 21V11" />
        <path d="M12 11C12 7 9 4.5 4.5 4.5 4.5 8.5 7.5 11 12 11z" />
        <path d="M12 14c0-3.4 2.5-5.5 6.5-5.5 0 3.4-2.5 5.5-6.5 5.5z" />
      </svg>
    ),
  },
];

const Features = () => (
  <section id="experiences" className="scroll-mt-24 bg-card py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-strong">
          Why travel unbounded
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          The difference is in
          <em className="text-primary-strong"> how </em>
          you travel
        </h2>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="group rounded-3xl border border-border-soft/70 bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-sky-900/10"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-strong text-white shadow-md shadow-sky-900/20 transition-colors duration-300 group-hover:bg-accent-strong">
              {feature.icon}
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">{feature.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Features;
