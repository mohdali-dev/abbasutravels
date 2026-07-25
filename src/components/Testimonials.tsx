/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Anum Riaz',
    role: 'Domestic Traveler',
    rating: 5,
    text: '"Booked our flight from Lahore to Skardu. The process was so easy over WhatsApp and they handled everything. Very professional service!"',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: '2',
    name: 'Sana Khan',
    role: 'Family Tour',
    rating: 5,
    text: '"We rented a Prado for our Hunza family trip. The driver was very skilled on mountain roads and the car was in perfect condition. Highly recommend!"',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: '3',
    name: 'Zubair Ali',
    role: 'Business Traveler',
    rating: 5,
    text: '"Fastest response time I\'ve ever seen for ticket bookings. They even helped me with a last-minute change to my return flight from Islamabad."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
  },
];

function TestimonialSkeleton() {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100 flex flex-col justify-between animate-pulse min-h-[260px]">
      <div>
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-slate-200" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded-md w-full animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-md w-5/6 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-md w-2/3 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
        <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 animate-pulse" />
        <div className="space-y-2 w-full">
          <div className="h-4 bg-slate-200 rounded-md w-1/3 animate-pulse" />
          <div className="h-3 bg-slate-200 rounded-md w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Client Success
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-500">
            Real stories and direct feedback from travelers exploring Gilgit-Baltistan and across Pakistan.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <TestimonialSkeleton key={`testimonial-skeleton-${idx}`} />
              ))
            : TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-100 flex flex-col justify-between transition-all duration-700 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Star Rating & Quote Content */}
              <div>
                <div className="flex gap-1 text-amber-400 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-sans text-base text-slate-600 leading-relaxed italic">
                  {t.text}
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/20"
                />
                <div>
                  <h4 className="font-display text-sm font-black text-brand-dark">
                    {t.name}
                  </h4>
                  <p className="text-xs font-semibold text-brand-blue mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
