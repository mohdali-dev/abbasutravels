/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Headset, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function WhyUs() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  return (
    <section id="why-us" className="py-24 bg-slate-50 overflow-hidden">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Overlaid Badge */}
          <div className="lg:col-span-5 relative">
            <motion.div
              id="why-us-image-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] md:h-[520px]"
            >
              <img
                src="/photos/Qamar.png"
                alt="Qamar Abbas - Founder & CEO of ABBASU Travels & Tours"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-brand-dark/15 pointer-events-none" />

              {/* Overlaid 10k+ badge on the image */}
              <motion.div
                id="why-us-badge"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 bg-brand-blue/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl text-white"
              >
                <h4 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
                  10k+
                </h4>
                <p className="mt-2 font-sans text-xs sm:text-sm font-semibold text-white/90 leading-relaxed">
                  Happy travelers assisted across the globe and the magnificent peaks.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Key Selling Points */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
                Why Travel with Us?
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight leading-tight">
                Your Absolute Safe Passage to the Karakoram
              </h2>
              <div className="mt-3 h-1 w-16 bg-brand-orange rounded-full mb-12" />
            </motion.div>

            {/* List of 3 Key Selling Points */}
            <div className="space-y-8">
              
              {/* Point 1: Competitive Prices */}
              <motion.div
                id="why-us-point-prices"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex gap-5 items-start group"
              >
                <div className="p-3.5 rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-md">
                  <DollarSign className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                    Competitive Prices
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-slate-500 leading-relaxed">
                    We leverage our deep local network and global airline partnerships to guarantee the absolute best rates for both flights and heavy-duty tour vehicles.
                  </p>
                </div>
              </motion.div>

              {/* Point 2: Personalized Assistance */}
              <motion.div
                id="why-us-point-assistance"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-5 items-start group"
              >
                <div className="p-3.5 rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-md">
                  <Headset className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                    Personalized Assistance
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-slate-500 leading-relaxed">
                    No automated chat-bots. Speak directly with real destination experts on WhatsApp for tailor-made itinerary suggestions, vehicle selection, and verified booking support.
                  </p>
                </div>
              </motion.div>

              {/* Point 3: Reliable & Verified */}
              <motion.div
                id="why-us-point-verified"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-5 items-start group"
              >
                <div className="p-3.5 rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-md">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200">
                    Reliable &amp; Verified
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-slate-500 leading-relaxed">
                    All fleet vehicles undergo meticulous, multi-point inspections prior to departure. Our flight tickets are instantly verified, ensuring full safety and complete peace of mind.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
