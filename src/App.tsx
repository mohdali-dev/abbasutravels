/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#fcfdfe]">
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

        {/* Interactive Travel Route Map Visualization */}
        <RouteMap />

        {/* High-quality corporate / trust section */}
        <WhyUs />

        {/* Conversational How-to-Book timeline section */}
        <HowToBook />

        {/* Detailed Vehicle Fleet Catalog */}
        <Fleet />

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

