import { notFound } from "next/navigation";
import ItineraryDisplay from "../../components/ItineraryDisplay";

async function getItinerary(id) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/itinerary/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data.success) return data.data;
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const itinerary = await getItinerary(id);

  if (!itinerary) {
    return { title: "Itinerary Not Found" };
  }

  return {
    title: itinerary.title,
    description: `Custom travel itinerary: ${itinerary.title}. Plan your trip with Travel Unbounded.`
  };
}

export default async function ItineraryPage({ params }) {
  const { id } = await params;
  const itinerary = await getItinerary(id);

  if (!itinerary) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-sky-600">
            Travel Unbounded
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Your Custom Itinerary
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crafted just for you by our AI travel assistant
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-border-soft sm:p-8">
          <ItineraryDisplay
            itinerary={itinerary}
            shareUrl={`https://travelunbounded.com/itinerary/${itinerary.shareId}`}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Want to book this trip or make changes?
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent"
          >
            Contact Us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
