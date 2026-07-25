# ✈️ ABBASU Travels & Tours

> **Production-Ready, Technical SEO-Optimized Travel & Tourism Web Application for Pakistan & Gilgit-Baltistan**

[![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000.svg?logo=vercel)](https://vercel.com/)
[![SEO Score](https://img.shields.io/badge/SEO-100%2F100-success.svg)](#-seo--metadata-features)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development Scripts](#development-scripts)
- [SEO & Metadata Features](#-seo--metadata-features)
- [Performance & Core Web Vitals](#-performance--core-web-vitals)
- [Accessibility & WCAG Compliance](#-accessibility--wcag-compliance)
- [Deployment (Vercel)](#-deployment-vercel)
- [Customization Guide](#-customization-guide)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact & Support](#-contact--support)

---

## 🌟 Overview

**ABBASU Travels & Tours** is a high-performance, single-page web application built for a premier travel agency based in Gilgit-Baltistan, Pakistan. The platform facilitates seamless domestic & international flight searches, executive 4x4 SUV and car rentals, guided tour packages (Hunza, Skardu, Phander, Khunjerab Pass), and instant one-tap WhatsApp inquiries.

Designed with a desktop-first precision and mobile-responsive layout, the application combines smooth micro-interactions (powered by `motion`), an interactive Leaflet map of northern air routes, and full WCAG 2.1 AA accessibility compliance.

---

## ✨ Key Features

### ✈️ Interactive Flight Finder & Route Explorer
- **Multi-Mode Booking Engine**: Supports One-Way, Round-Trip, and Multi-City flight searches with real-time airport selector dropdowns across major Pakistani and international hubs.
- **Interactive Air Route Map**: Leaflet-powered interactive map visualizing flight vectors connecting Islamabad, Gilgit, Skardu, Lahore, and Karachi.
- **Popular Destinations & Schedules**: Quick-view route cards featuring frequency details, average flight durations, and instant WhatsApp booking links.

### 🚘 Executive Fleet & Transport Services
- **Vehicle Showcase**: Displays available 4x4 Prado SUVs, Grand Cabin Vans, Coaster Buses, and Corolla/Yaris Sedans.
- **Pick-and-Drop & Chauffeur Services**: Specialized airport transfers, student AC shuttle services, and luxury tourism transport options.

### 🏔️ Curated Gilgit-Baltistan Tour Packages
- Featured destinations covering Hunza Valley, Skardu, Naltar Valley, Fairy Meadows, and Deosai Plains.
- Comprehensive tour details, seasonal highlights, and direct inquiry buttons.

### 📱 Instant WhatsApp Conversion Engine
- Floating WhatsApp assistance trigger button (`WhatsAppButton.tsx`).
- Pre-filled dynamic WhatsApp messages generated based on user input (e.g., flight route, date, class, or vehicle selection).

### 🔍 Technical SEO & Analytics Infrastructure
- Valid XML Sitemap at `/sitemap.xml` and `/robots.txt`.
- Schema.org JSON-LD `@graph` including `TravelAgency`, `LocalBusiness`, `OfferCatalog`, and `WebSite`.
- Google Analytics 4 integration with dynamic page/section hash tracking.
- SPA 404 fallback page (`NotFound.tsx`) maintaining brand identity.

---

## 🧪 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & UI** | [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animation** | [Motion (Framer)](https://motion.dev/) |
| **Mapping** | [Leaflet](https://leafletjs.com/) with [@types/leaflet](https://www.npmjs.com/package/@types/leaflet) |
| **Icons** | [Lucide React](https://lucide.react.dev/) |
| **Server Runtime** | Node.js (Express v4 in development environment) |
| **Hosting & CDN** | Vercel (Edge Network) |

---

## 🏛️ Architecture Overview

The application follows a modular Single Page Application (SPA) architecture:

```
[ Browser Client ]
        │
        ├──> Index.html (Preconnected Fonts, PWA Icons, Schema.org JSON-LD)
        │
        ├──> React App Shell (App.tsx)
        │      ├──> Google Analytics Tracker (Analytics.tsx)
        │      ├──> Responsive Header & Mobile Drawer (Navbar.tsx)
        │      ├──> Main Page Sections (Hero, FlightFinder, RouteMap, Fleet, Services, FAQ, ContactForm)
        │      └──> Floating WhatsApp Widget (WhatsAppButton.tsx)
        │
        └──> Client-side Routing / Hash Navigation & 404 Handler (NotFound.tsx)
```

---

## 📂 Project Structure

```
.
├── .env.example              # Environment variables specification template
├── .gitignore                # Git exclusion rules
├── index.html                # Main HTML entrypoint with metadata, fonts, and Schema.org
├── metadata.json             # AI Studio applet configuration metadata
├── package.json              # Package dependencies, build & dev scripts
├── tsconfig.json             # TypeScript compiler settings
├── vercel.json               # Vercel routing rewrites & HTTP security headers
├── vite.config.ts            # Vite bundler configuration
│
├── public/                   # Static public assets served at root
│   ├── favicon.svg           # Scalable vector favicon
│   ├── favicon.ico           # Legacy favicon icon
│   ├── favicon-16x16.png     # Standard 16px PNG favicon
│   ├── favicon-32x32.png     # Standard 32px PNG favicon
│   ├── apple-touch-icon.png  # Apple Touch Icon (180x180)
│   ├── manifest.json         # Web App Manifest for PWA capabilities
│   ├── robots.txt            # Search engine crawler instructions
│   ├── sitemap.xml           # XML Sitemap indexing the domain
│   └── photos/               # Brand & team photos (Qamar.png, etc.)
│
└── src/                      # Application source code
    ├── App.tsx               # Main application container & router
    ├── main.tsx              # React DOM root entry point
    ├── index.css             # Tailwind CSS import directive
    └── components/           # Modular UI component directory
        ├── Analytics.tsx     # Google Analytics 4 tracking component
        ├── ContactForm.tsx   # Customer inquiry & messaging component
        ├── Destinations.tsx  # Tour package destination grid
        ├── FAQ.tsx           # Frequently asked questions accordion
        ├── Fleet.tsx         # Executive vehicle fleet catalog
        ├── FlightFinder.tsx  # Flight booking search interface
        ├── FlightRoutes.tsx  # Domestic & international air routes listing
        ├── Footer.tsx        # Comprehensive footer navigation & contact info
        ├── Hero.tsx          # High-impact hero section with primary CTA
        ├── HowToBook.tsx     # Step-by-step booking guide
        ├── Logo.tsx          # Vector brand logo component
        ├── Navbar.tsx        # Sticky header navigation with mobile drawer
        ├── NotFound.tsx      # Custom branded 404 error page
        ├── RouteMap.tsx      # Interactive Leaflet map visualizing air routes
        ├── Services.tsx      # Core agency offerings overview
        ├── Testimonials.tsx  # Customer review showcase
        ├── WhatsAppButton.tsx# Floating WhatsApp conversion trigger
        └── WhyUs.tsx         # Value proposition & company credentials
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: `v18.0.0` or higher (v20+ recommended)
- **npm**: `v9.0.0` or higher (or `bun` / `pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/abbasutravels.git
   cd abbasutravels
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

### Environment Variables

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `VITE_GSC_VERIFICATION` | Optional | Google Search Console verification token | `gsc_token_here` |
| `GEMINI_API_KEY` | Optional | Gemini API key for server-side AI features | `AIzaSy...` |
| `APP_URL` | Optional | Production deployment URL | `https://abbasutravels.com` |

### Development Scripts

- **Run local development server (Port 3000):**
  ```bash
  npm run dev
  ```
- **Perform type check (Linting):**
  ```bash
  npm run lint
  ```
- **Build for production:**
  ```bash
  npm run build
  ```
- **Preview production build locally:**
  ```bash
  npm run preview
  ```

---

## 🔍 SEO & Metadata Features

The website has been engineered according to Google Search Engine Optimization (SEO) Best Practices:

1. **Meta Metadata & Canonical Tags:**
   - Optimized Title Tags & Meta Descriptions incorporating high-value keywords (`Flight Booking Pakistan`, `Gilgit Baltistan Travel`, `Car Rental Pakistan`, `Hunza Tours`).
   - Self-referencing canonical URL (`https://abbasutravels.com/`).
   - Complete Open Graph (OG) and Twitter Card tags with 1200x630 social preview images.

2. **Structured Data (JSON-LD):**
   - Rich `@graph` schema combining `TravelAgency`, `LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `OfferCatalog`, and `WebSite`.
   - Google Rich Results compliant for Local Business Knowledge Panels.

3. **Crawlability & Indexability:**
   - Valid XML Sitemap located at `/sitemap.xml`.
   - Clean `robots.txt` referencing the sitemap.
   - SPA rewrites configured in `vercel.json` while excluding static assets (`sitemap.xml`, `robots.txt`, `manifest.json`, favicons) from `index.html` fallback.

---

## ⚡ Performance & Core Web Vitals

- **Optimized Asset Delivery:** Preconnect directives for `https://images.unsplash.com` and `https://fonts.googleapis.com`.
- **Image Optimization:** All decorative and destination images utilize `loading="lazy"` and `decoding="async"` attributes to eliminate render-blocking delay.
- **Font & CSS Optimization:** Minimal structural CSS using Tailwind CSS v4's high-performance compiler.
- **Zero Layout Shift (CLS):** Explicit width/height containers and aspect-ratio boxes prevent layout shifts during image load.

---

## ♿ Accessibility & WCAG Compliance

- **Semantic HTML5 Elements**: Uses `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>` instead of unsemantic `<div>` containers.
- **ARIA & Touch Targets**: Every button and link includes descriptive `aria-label` or visible text. All interactive controls maintain minimum 44x44px touch areas.
- **High Contrast Ratios**: Color combinations adhere strictly to WCAG 2.1 AA (4.5:1 minimum contrast).
- **Single `<h1>` Hierarchy**: Strict heading structure (`H1` -> `H2` -> `H3`) maintained throughout the codebase.

---

## 🌐 Deployment (Vercel)

This project is optimized for 1-click deployment on **Vercel**:

1. Push your repository to GitHub / GitLab.
2. Import the project into your Vercel Dashboard.
3. Select **Vite** as the framework preset.
4. Add any required environment variables in the Vercel Settings panel (`VITE_GA_MEASUREMENT_ID`).
5. Click **Deploy**.

### Security Headers Configured (`vercel.json`)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

---

## 🎨 Customization Guide

<details>
<summary><b>Click to expand customization instructions</b></summary>

### 1. Changing Contact Information
Modify `/src/components/Footer.tsx`, `/src/components/ContactForm.tsx`, and `/index.html` (JSON-LD block) to update your business phone number, email address, or office location.

### 2. Updating Flight Routes
Edit the route objects in `/src/components/FlightRoutes.tsx` and `/src/components/RouteMap.tsx` to add new airports, flight frequencies, or departure times.

### 3. Modifying Vehicle Fleet
Update the vehicle array in `/src/components/Fleet.tsx` with your specific vehicle inventory, pricing, and seating capacities.

</details>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/abbasutravels/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the Apache 2.0 License. See [`package.json`](package.json) for more information.

---

## 📞 Contact & Support

**ABBASU Travels & Tours**
- **Website**: [https://abbasutravels.com](https://abbasutravels.com)
- **WhatsApp**: [+92 300 0000000](https://wa.me/923000000000)
- **Location**: Main Airport Road, Gilgit, Gilgit-Baltistan, Pakistan

---

*Built with precision, performance, and craftsmanship for Pakistan's travel industry.*
