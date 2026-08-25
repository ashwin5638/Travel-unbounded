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

## Screenshots

<img width="1535" height="741" alt="Screenshot 2026-08-25 234819" src="https://github.com/user-attachments/assets/27a757ae-058c-4cd5-ae74-5ae603118bce" />
<img width="1525" height="747" alt="Screenshot 2026-08-25 234840" src="https://github.com/user-attachments/assets/a178787e-f85b-427f-89e3-1b42efbe8695" />
<img width="1513" height="738" alt="Screenshot 2026-08-25 234906" src="https://github.com/user-attachments/assets/c534fe49-9aa2-4e1a-8e23-d61989bffb2c" />

## Live Demo

live-url : https://travel-unbounded-lilac.vercel.app/

## GitHub

[https://github.com/ashwin5638/Travel-unbounded](https://github.com/ashwin5638/Travel-unbounded)
