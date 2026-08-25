const testimonials = [
  {
    quote:
      "Ladakh with Travel Unbounded felt like travelling with old friends who happened to know every monk, every pass and every shortcut. Zero stress, all wonder.",
    name: "Ananya & Rohit Sharma",
    trip: "Ladakh Highlands, 9 days",
    initials: "AS",
  },
  {
    quote:
      "We have done safaris on three continents. The Serengeti itinerary they crafted was the first one where we never once felt like tourists.",
    name: "Meera Krishnan",
    trip: "Tanzania Great Migration, 11 days",
    initials: "MK",
  },
  {
    quote:
      "Northern lights on night two, glacier hike by day four, and a hot spring recovery plan I still think about. Flawless logistics, start to finish.",
    name: "Dev Patel",
    trip: "Iceland Ring Road, 8 days",
    initials: "DP",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

const Testimonials = () => (
  <section id="stories" className="scroll-mt-24 py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-strong">
          Traveller stories
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Don&rsquo;t take our word for it
        </h2>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name}
            className="flex flex-col rounded-3xl border border-border-soft/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/10"
          >
            <Stars />
            <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-card-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4 border-t border-border-soft/70 pt-6">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-bold text-white"
              >
                {testimonial.initials}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{testimonial.name}</span>
                <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {testimonial.trip}
                </span>
              </span>
            </figcaption>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Testimonials;
