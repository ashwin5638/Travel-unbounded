# Travel Unbounded

A full-stack travel agency platform built with Next.js 16, featuring curated destinations, AI-powered trip planning, an admin dashboard, and shareable itineraries.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 with Tailwind CSS v4
- **Database:** MongoDB Atlas via Mongoose
- **Auth:** Auth.js v5 (Credentials provider + JWT)
- **AI:** OpenRouter API (streaming chat)
- **Charts:** Recharts
- **Fonts:** Inter (sans) + Playfair Display (display)

## Getting Started

```bash
npm install
```

Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```
ATLAS_URL=mongodb+srv://...
OpenRoute_API=sk-or-v1-...
AUTH_SECRET=your-random-secret
ADMIN_EMAIL=admin@travelunbounded.com
ADMIN_PASSWORD=admin123
```

Seed the admin user and sample destinations:

```bash
node scripts/seed.js
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.js                      # Homepage
├── layout.js                    # Root layout (fonts, Navbar, Footer, ChatWidget)
├── globals.css                  # Tailwind v4 theme + print styles
├── about/page.js                # About page
├── contact/page.js              # Contact / booking enquiry page
├── itinerary/[id]/page.js       # Public shareable itinerary page
│
├── admin/
│   ├── layout.js                # Admin sidebar + header
│   ├── login/page.js            # Admin login
│   ├── dashboard/page.js        # Analytics dashboard (charts)
│   ├── enquiries/page.js        # Enquiries list with filters
│   ├── enquiries/[id]/page.js   # Enquiry detail + status management
│   └── destinations/page.js     # Destinations CRUD
│
├── api/
│   ├── enquiry/route.js         # Public enquiry API (POST/GET)
│   ├── chat/route.js            # AI chat streaming API
│   ├── itinerary/route.js       # Save/list itineraries
│   ├── itinerary/[id]/route.js  # Public itinerary fetch
│   ├── auth/[...nextauth]/route.js
│   └── admin/                   # Admin APIs (enquiries, destinations, analytics)
│
├── components/                  # Reusable UI components
├── data/                        # Static destination data
├── lib/                         # MongoDB connection utility
└── models/                      # Mongoose schemas (Enquiry, Admin, Destination, Itinerary)

auth.config.js                   # Edge-safe auth config
auth.js                           # Auth.js with Credentials provider
proxy.js                         # Route protection middleware
scripts/seed.js                  # DB seed script
```

## Features

### Public Site
- Responsive homepage with hero, destination grid, features, testimonials, CTA
- Tabbed destination browsing (India + International)
- About page with company story and office locations
- Contact page with booking enquiry form
- Print-friendly styles

### Booking Form
- Client + server-side validation (email, phone, future date, min travellers)
- Loading, success, and error states
- MongoDB persistence with timestamps

### AI Chatbot
- Floating chat widget on all pages
- Streaming responses via OpenRouter API with fallback model
- Itinerary generation from chat conversations
- Save, share, print, and email itineraries

### Admin Dashboard
- Auth.js login with JWT sessions
- Route protection for all `/admin/*` paths
- Analytics dashboard (area chart, donut chart, bar chart, conversion funnel)
- Enquiries: search, filter by status, pagination, inline status update
- Enquiry detail: status management, internal notes, delete
- Destinations: full CRUD with image, interests, active toggle
- Dark theme with emerald accent palette

### Itinerary Sharing
- Auto-generated shareable links (`/itinerary/[id]`)
- Public read-only itinerary view
- Share via link, print, and email actions

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ATLAS_URL` | MongoDB Atlas connection string |
| `OpenRoute_API` | OpenRouter API key for AI chat |
| `AUTH_SECRET` | Random secret for Auth.js JWT |
| `ADMIN_EMAIL` | Default admin email |
| `ADMIN_PASSWORD` | Default admin password |

## Default Admin Credentials

- **Email:** admin@travelunbounded.com
- **Password:** admin123

> Change these after first login in production.
