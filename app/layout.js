import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

export const metadata = {
  title: {
    default: "Travel Unbounded",
    template: "%s | Travel Unbounded"
  },
  description:
    "Travel Unbounded creates personalised travel experiences across India and international destinations.",
  keywords: [
    "Travel Unbounded",
    "India travel",
    "international travel",
    "travel packages",
    "holiday packages"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />

        <ChatWidget />
      </body>
    </html>
  );
}