/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhatsAppButton from './components/WhatsAppButton';
import { Analytics } from './components/Analytics';

// Lazy-loaded components for optimal initial bundle size
const FlightRoutes = lazy(() => import('./components/FlightRoutes'));
const FlightFinder = lazy(() => import('./components/FlightFinder'));
const Destinations = lazy(() => import('./components/Destinations'));
const Fleet = lazy(() => import('./components/Fleet'));
const RouteMap = lazy(() => import('./components/RouteMap'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const HowToBook = lazy(() => import('./components/HowToBook'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const NotFound = lazy(() => import('./components/NotFound'));

// Minimal non-blocking Section Skeleton Loader
function SectionSkeleton() {
  return (
    <div className="w-full py-16 px-4 max-w-7xl mx-auto flex justify-center items-center min-h-[200px]">
      <div className="w-8 h-8 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      setIs404(true);
    }
  }, []);

  if (is404) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <Analytics />
        <NotFound />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fcfdfe]">
      <Analytics />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Home / Hero Banner */}
        <Hero />

        {/* Core Services: Flight Booking, Car Rental overview */}
        <Services />

        <Suspense fallback={<SectionSkeleton />}>
          {/* International & Domestic Flight Routes */}
          <FlightRoutes />

          {/* Search Schedules and Book Tickets */}
          <FlightFinder />

          {/* 8-Grid Popular Destinations */}
          <Destinations />

          {/* Detailed Vehicle Fleet Catalog (Car Rental) */}
          <Fleet />

          {/* Interactive Travel Route Map Visualization */}
          <RouteMap />

          {/* High-quality corporate / trust section */}
          <WhyUs />

          {/* Conversational How-to-Book timeline section */}
          <HowToBook />

          {/* Customer Social Proof Testimonials */}
          <Testimonials />

          {/* Common Frequently Asked Questions */}
          <FAQ />

          {/* Contact info and Lead-generating WhatsApp Inquiry Form */}
          <ContactForm />

          {/* Site Footer */}
          <Footer />
        </Suspense>
      </main>

      {/* Floating Sticky Instant WhatsApp Support Circle */}
      <WhatsAppButton />
    </div>
  );
}


