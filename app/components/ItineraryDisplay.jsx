"use client";

const ACTIVITY_ICONS = {
  adventure: "⛰️",
  relaxation: "🧘",
  culture: "🏛️",
  wildlife: "🦁",
  food: "🍽️",
  sightseeing: "📸",
  transport: "🚗",
  other: "⭐"
};

export default function ItineraryDisplay({ itinerary, shareUrl }) {
  if (!itinerary || !itinerary.itinerary) {
    return null;
  }

  const { title, itinerary: days, preferences } = itinerary;

  function handleShare() {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleEmail() {
    const subject = encodeURIComponent(`My Travel Itinerary: ${title}`);
    let body = `${title}\n\n`;
    body += `Duration: ${preferences?.duration || "?"} days\n`;
    body += `Destination: ${preferences?.destination || "?"}\n`;
    body += `Budget: ${preferences?.budget || "?"}\n`;
    body += `Travellers: ${preferences?.travelers || "?"}\n\n`;

    days.forEach((day) => {
      body += `=== Day ${day.day}: ${day.title} ===\n`;
      day.activities.forEach((act) => {
        body += `  ${act.time} - ${act.title}\n`;
        body += `  ${act.description}\n`;
      });
      if (day.accommodation) {
        body += `  Stay: ${day.accommodation}\n`;
      }
      body += "\n";
    });

    body += `\nPlan your trip with Travel Unbounded!`;
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-white">
          {title}
        </h3>
      </div>

      {preferences && (
        <div className="flex flex-wrap gap-2 text-xs">
          {preferences.destination && (
            <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-400 ring-1 ring-sky-500/20">
              {preferences.destination}
            </span>
          )}
          {preferences.duration && (
            <span className="rounded-full bg-purple-500/15 px-3 py-1 text-purple-400 ring-1 ring-purple-500/20">
              {preferences.duration} days
            </span>
          )}
          {preferences.travelers && (
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-green-400 ring-1 ring-green-500/20">
              {preferences.travelers} travellers
            </span>
          )}
          {preferences.budget && (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-400 ring-1 ring-amber-500/20">
              {preferences.budget}
            </span>
          )}
          {preferences.travelStyle && (
            <span className="rounded-full bg-pink-500/15 px-3 py-1 text-pink-400 ring-1 ring-pink-500/20 capitalize">
              {preferences.travelStyle}
            </span>
          )}
        </div>
      )}

      <div className="space-y-4">
        {days.map((day) => (
          <div
            key={day.day}
            className="rounded-xl bg-slate-700/30 p-4 ring-1 ring-slate-600/30"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                {day.day}
              </span>
              <h4 className="font-semibold text-white">{day.title}</h4>
            </div>

            <div className="space-y-2 pl-11">
              {day.activities.map((act, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg bg-slate-800/50 p-3"
                >
                  <span className="text-lg">{ACTIVITY_ICONS[act.type] || "⭐"}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-sky-400">
                        {act.time}
                      </span>
                      <span className="text-xs capitalize text-slate-500">
                        {act.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white">{act.title}</p>
                    <p className="text-xs text-slate-400">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {day.accommodation && (
              <p className="mt-2 pl-11 text-xs text-slate-500">
                <span className="font-medium">Stay:</span> {day.accommodation}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {shareUrl && (
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        )}
        <button
          onClick={handleEmail}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Email
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print
        </button>
      </div>
    </div>
  );
}
