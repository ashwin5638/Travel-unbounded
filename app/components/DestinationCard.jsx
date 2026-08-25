import Link from "next/link";

const DestinationCard = ({ destination }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-soft/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-900/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-accent-strong shadow backdrop-blur-sm">
          {destination.price}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-sky-950/60 px-3 py-1.5 text-xs font-semibold text-sky-100 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
            <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          {destination.country}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-card-foreground transition-colors group-hover:text-primary-strong">
          {destination.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border-soft/70 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <svg viewBox="0 0 20 20" fill="#fbbf24" aria-hidden="true" className="h-4 w-4">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
            4.8 · Guided
          </span>
          <Link
            href="/contact"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-primary-strong transition-colors hover:bg-muted hover:text-accent-strong"
            aria-label={`Enquire about ${destination.name}`}
          >
            Enquire
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
