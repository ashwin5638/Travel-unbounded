# Travel Unbounded

A modern travel agency website built with Next.js (App Router), featuring curated destination listings, a booking enquiry form, and a responsive single-page design.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 with Tailwind CSS v4
- **Database:** MongoDB via Mongoose
- **Fonts:** Inter (sans) + Playfair Display (display)

## Getting Started

```bash
npm install
```

Copy the environment file and add your MongoDB connection string:

```bash
cp .env.example 
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.js                  # Homepage (hero, destinations, features, testimonials, CTA)
├── layout.js                # Root layout (fonts, Navbar, Footer)
├── globals.css              # Tailwind config + custom theme tokens
├── about/page.js            # About page
├── contact/page.js          # Contact / booking enquiry page
├── api/enquiry/route.js     # POST endpoint for saving enquiries to MongoDB
├── components/              # Reusable UI components
├── data/                    # Static destination data
├── lib/                     # MongoDB connection utility
└── models/                  # Mongoose schemas
```

## Features

- Responsive single-page homepage with SVG illustration scenes
- Tabbed destination grid (India + International)
- Booking enquiry form with client-side validation
- Server-side validation and MongoDB persistence
- Mobile-friendly navigation with scroll detection
