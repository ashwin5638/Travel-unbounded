import BookingForm from "../components/BookingForm";

export const metadata = {
  title: "Plan Your Trip | Travel Unbounded",
  description:
    "Send your travel enquiry to Travel Unbounded and start planning your next journey."
};

const ContactPage = () => {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-strong">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M4 6l8 6 8-6M4 6h16v12H4z" />
            </svg>
            Get in touch
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Tell us about your <em className="text-accent not-italic">trip</em>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Share your travel requirements and our curators will craft a
            personalised itinerary with an honest quote.
          </p>
        </div>

        <BookingForm />
      </div>
    </main>
  );
};

export default ContactPage;
