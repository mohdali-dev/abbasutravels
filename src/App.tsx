/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import FlightRoutes from './components/FlightRoutes';
import FlightFinder from './components/FlightFinder';
import Destinations from './components/Destinations';
import RouteMap from './components/RouteMap';
import WhyUs from './components/WhyUs';
import HowToBook from './components/HowToBook';
import Fleet from './components/Fleet';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Analytics } from './components/Analytics';
import NotFound from './components/NotFound';

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
      <>
        <Analytics />
        <NotFound />
      </>
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
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Sticky Instant WhatsApp Support Circle */}
      <WhatsAppButton />
    </div>
  );
}


