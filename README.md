# Travel Unbounded

## Overview

A modern travel agency website built with Next.js, featuring curated destinations, a booking enquiry form, and a responsive design.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- MongoDB
- Mongoose
- Vercel

## Features

- Responsive travel website
- Destination sections (India + International)
- About page
- Travel enquiry form
- Client-side and server-side validation
- MongoDB persistence
- AI chatbot with itinerary sharing
- Admin dashboard with analytics

## Project Structure

```
app/
├── page.js                  # Homepage
├── layout.js                # Root layout
├── globals.css              # Tailwind theme
├── about/page.js            # About page
├── contact/page.js          # Contact / enquiry form
├── components/              # UI components
├── data/                    # Static destination data
├── lib/                     # MongoDB connection
├── models/                  # Mongoose schemas
├── api/enquiry/route.js     # Enquiry API
└── admin/                   # Admin dashboard
```

## Local Setup

```bash
npm install
npm run dev
```

## Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
```

## API

```
POST /api/enquiry
```

## Deployment

<!-- Add your production URL here -->

## Assumptions

None

## Screenshots

<!-- Add screenshots here -->

## Live Demo

<!-- Add URL here -->

## GitHub

<!-- Add URL here -->
