import Hero from "./components/Hero";
import DestinationSection from "./components/DestinationSection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col flex-1">
      <Hero />
      <DestinationSection />
      <Features />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
