/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Plane, Car, Check } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openWhatsApp } from '../utils/whatsapp';

export default function Services() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  const handleFlightInquiry = () => {
    openWhatsApp(
      "Hello ABBASU TRAVELS & TOURS! I would like to inquire about flight bookings. Please share availability and pricing details."
    );
  };

  const scrollToFleet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fleetSection = document.getElementById('car-rental');
    if (fleetSection) {
      const offsetTop = fleetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="flights" className="py-24 bg-slate-50">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Our Premium Services
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Seamless Travel Logistics Tailored for the Majestic North
          </h2>
          <div className="mt-3 h-1 w-20 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Flight Booking */}
          <motion.div
            id="service-card-flights"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                  <Plane className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-brand-dark">
                    Flight Booking
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">Domestic &amp; International travel</p>
                </div>
              </div>

              {/* Bullet Points Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">International</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Group Booking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Domestic</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Business Class</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">One Way / Round</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Student Rates</span>
                </div>
              </div>
            </div>

            {/* Inquire Button */}
            <button
              id="service-flights-inquire-btn"
              onClick={handleFlightInquiry}
              className="w-full py-4 px-6 rounded-2xl border-2 border-brand-blue text-brand-blue font-sans text-base font-bold text-center transition-all duration-300 hover:bg-brand-blue hover:text-white transform hover:scale-[1.01] shadow-sm hover:shadow-md cursor-pointer"
            >
              Inquire Now
            </button>
          </motion.div>

          {/* Card 2: Car Rental */}
          <motion.div
            id="service-card-car-rental"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Title */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-brand-dark">
                    Car Rental
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">Reliable rides with expert drivers</p>
                </div>
              </div>

              {/* Bullet Points Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Economy &amp; Sedans</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Airport Transfers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">SUVs / 4x4 Prado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Private Driver</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Hiace &amp; Coasters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-orange stroke-[3]" />
                  </div>
                  <span className="font-sans text-sm font-semibold text-slate-700">Family Tours</span>
                </div>
              </div>
            </div>

            {/* View Fleet Button */}
            <button
              id="service-car-rental-view-fleet-btn"
              onClick={scrollToFleet}
              className="w-full py-4 px-6 rounded-2xl border-2 border-brand-orange text-brand-orange font-sans text-base font-bold text-center transition-all duration-300 hover:bg-brand-orange hover:text-white transform hover:scale-[1.01] shadow-sm hover:shadow-md cursor-pointer"
            >
              View Fleet
            </button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
