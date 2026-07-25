/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Plane, Car, Shield, MessageCircle, Globe, Award } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function Hero() {
  const handleAction = (type: 'flight' | 'car') => {
    const isFlight = type === 'flight';
    const service = isFlight ? 'Flight Booking' : 'Car Rental';
    openWhatsApp(
      `Hello ABBASU TRAVELS & TOURS! I am interested in inquiring about your ${service} services. Please guide me on options and rates.`
    );
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 26, 48, 0.55), rgba(12, 26, 48, 0.45)), url('https://images.unsplash.com/photo-1686040556614-024e4bc5c735?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      {/* Decorative gradient overlay at bottom to transition to white content */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Hero content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10 flex flex-col justify-center items-start pt-12 md:pt-20">
        
        {/* Hero Headlines */}
        <div className="max-w-3xl">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md"
          >
            Book International &amp; <br />
            Domestic Flights <span className="text-brand-orange font-serif italic font-normal">with</span> <br />
            <span className="text-white relative inline-block">
              Confidence
              <span className="absolute left-0 right-0 bottom-1 h-2 bg-brand-orange/30 -z-10" />
            </span>
          </motion.h1>

          <motion.p
            id="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 font-sans text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed drop-shadow"
          >
            ABBASU TRAVELS &amp; TOURS finds the best flight options and provides reliable transportation across Gilgit-Baltistan. Contact our travel experts on WhatsApp for fast, personalized assistance.
          </motion.p>
        </div>

        {/* Hero Call to Action Buttons */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-book-flight-btn"
            onClick={() => handleAction('flight')}
            className="flex items-center justify-center gap-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-full font-sans text-base font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-brand-blue/30 cursor-pointer group"
          >
            <Plane className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            Book Flight
          </button>
          <button
            id="hero-rent-car-btn"
            onClick={() => handleAction('car')}
            className="flex items-center justify-center gap-2.5 bg-brand-dark/60 hover:bg-brand-dark/80 backdrop-blur-md text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-sans text-base font-bold transition-all duration-300 transform hover:scale-[1.03] shadow-lg cursor-pointer group"
          >
            <Car className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Rent a Car
          </button>
        </motion.div>
      </div>

      {/* Bottom Highlights Bar (translucent dark bar) as seen in the screenshot */}
      <div className="w-full z-10 mt-auto px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          id="hero-highlights"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-brand-dark/90 backdrop-blur-lg border border-white/10 rounded-2xl py-6 px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs sm:text-sm font-semibold text-gray-200">
              Trusted Travel Partner
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs sm:text-sm font-semibold text-gray-200">
              Fast WhatsApp Support
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs sm:text-sm font-semibold text-gray-200">
              Domestic &amp; International
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-orange/15 text-brand-orange shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-sans text-xs sm:text-sm font-semibold text-gray-200">
              Reliable Car Rentals
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
