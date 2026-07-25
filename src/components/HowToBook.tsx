/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, FileText, ClipboardList, CheckSquare, Ticket } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  {
    number: '1',
    title: 'WhatsApp Us',
    description: 'Send a quick message with your travel dates and specific needs.',
    icon: MessageSquare,
  },
  {
    number: '2',
    title: 'Provide Details',
    description: 'Share passenger information or select vehicle preferences.',
    icon: FileText,
  },
  {
    number: '3',
    title: 'Get Options',
    description: 'Receive the best verified prices and custom vehicle models.',
    icon: ClipboardList,
  },
  {
    number: '4',
    title: 'Confirm',
    description: 'Secure your booking with a simple and safe confirmation.',
    icon: CheckSquare,
  },
  {
    number: '5',
    title: 'Receive Ticket',
    description: 'Get your E-Ticket or rental slip instantly on WhatsApp.',
    icon: Ticket,
  },
];

export default function HowToBook() {
  return (
    <section id="how-to-book" className="py-20 bg-brand-blue relative overflow-hidden text-white">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            How to Book
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-white/80">
            Booking with ABBASU TRAVELS &amp; TOURS is incredibly easy and entirely conversational.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-white/20 -z-10" />

          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                id={`how-to-book-step-${step.number}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle with Icon */}
                <div className="w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white mb-6 relative transition-all duration-300 transform group-hover:scale-110 shadow-lg cursor-default">
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-orange text-[10px] font-black flex items-center justify-center text-white shadow">
                    {step.number}
                  </span>
                  <IconComponent className="w-8 h-8 group-hover:rotate-6 transition-transform duration-300" />
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="font-display text-lg font-black text-white group-hover:text-brand-orange transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="mt-2.5 font-sans text-xs text-white/70 max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
