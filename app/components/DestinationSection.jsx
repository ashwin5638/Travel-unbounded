"use client";

import { useState } from "react";
import { indiaDestinations, internationalDestinations } from "../data/destinations";
import DestinationCard from "./DestinationCard";

const tabs = [
  { id: "india", label: "India", caption: "Rooted in the familiar, wild at heart", destinations: indiaDestinations },
  { id: "international", label: "International", caption: "Passports ready? So are we", destinations: internationalDestinations },
];

const DestinationSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section id="destinations" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-strong">
              Curated destinations
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Places that stay
              <br />
              with you forever
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every itinerary is scouted by our team, paced for real humans and led by
              guides who grew up around the corner.
            </p>
          </div>

          <div role="tablist" aria-label="Destination regions" className="inline-flex rounded-full border border-border-soft bg-card p-1.5 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary-strong text-white shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm italic text-muted-foreground">{active.caption}</p>

        <div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-4"
        >
          {active.destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
