/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book a flight via WhatsApp?',
    answer: 'Simply click "Book Flight" or text us directly with your travel dates, destinations, and passenger details. Our travel experts will check live seating availability, send you the best customized pricing options, and issue your verified E-Ticket instantly once you confirm.',
  },
  {
    id: 'faq-2',
    question: 'Are drivers included with our rentals?',
    answer: 'Yes, all our vehicle rentals across Gilgit-Baltistan and Northern Pakistan come with highly skilled, experienced local drivers. They are well-trained to handle steep, narrow mountain passes, off-road terrain, and long mountain journeys, ensuring your family travels in absolute comfort and safety.',
  },
  {
    id: 'faq-3',
    question: 'What is your cancellation policy?',
    answer: 'Flight booking cancellations and date changes are governed strictly by the respective airlines. Car rentals can be cancelled or rescheduled free of charge up to 48 hours before your scheduled travel date. Contact our support agent directly on WhatsApp for immediate and personalized assistance.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Have Questions?
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-blue/30 bg-brand-blue/5 shadow-md shadow-brand-blue/5'
                    : 'border-slate-100 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                {/* Trigger Button */}
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center px-6 py-5 sm:px-8 font-sans text-left text-base font-bold text-brand-dark focus:outline-none cursor-pointer group"
                >
                  <span className="flex items-center gap-3 pr-4 group-hover:text-brand-blue transition-colors duration-200">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-brand-blue' : 'text-slate-400'}`} />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-brand-blue' : ''
                    }`}
                  />
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 font-sans text-sm text-slate-600 leading-relaxed pl-[3.25rem]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
