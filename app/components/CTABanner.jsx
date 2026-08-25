import Link from "next/link";

const CTABanner = () => {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary-strong shadow-2xl shadow-sky-900/30">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full opacity-25"
        >
          <path d="M0 320 L150 220 L300 300 L480 180 L660 310 L840 210 L1020 305 L1200 230 L1200 400 L0 400 Z" fill="#082f49" />
          <path d="M0 360 L200 280 L420 365 L640 290 L880 370 L1080 300 L1200 350 L1200 400 L0 400 Z" fill="#02101c" />
        </svg>

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-8 py-16 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:px-16 lg:py-20">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Ready to wander
              <em className="text-accent"> unbounded</em>?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-sky-100">
              Tell us where your heart is pointing. We will send a handcrafted
              itinerary and an honest quote within 24 hours.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm text-sky-100">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 text-accent">
                  <path d="M4 6l8 6 8-6M4 6h16v12H4z" />
                </svg>
                <a href="mailto:hello@travelunbounded.com" className="hover:text-white hover:underline">
                  hello@travelunbounded.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 text-accent">
                  <path d="M5 4h4l1.5 4L8 10c1 2.5 3.5 5 6 6l2-2.5 4 1.5v4a1 1 0 0 1-1 1C10.8 20 4 13.2 4 5a1 1 0 0 1 1-1z" />
                </svg>
                <span>+91 98200 12345</span>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl bg-white/95 p-7 shadow-xl backdrop-blur-sm sm:p-8">
            <p className="block text-sm font-bold text-ink">
              Get a free itinerary
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              No spam, no pressure. One beautiful plan, crafted by our travel
              experts.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-strong px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent"
            >
              Plan My Trip
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
