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
    id: 'ceo',
    name: 'Qamar Abbas',
    role: 'Founder & CEO, ABBASU Travels',
    rating: 5,
    text: '"Our mission at ABBASU Travels is to connect travelers with the awe-inspiring beauty of Gilgit-Baltistan and Pakistan through world-class service, seamless logistics, and unforgettable mountain journeys."',
    avatar: '/photos/Qamar.png',
    isLeader: true,
  },
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
    <section id="testimonials-section" className="py-24 bg-slate-50">
      <div
        id="testimonials"
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Leadership &amp; Client Stories
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Leadership Vision &amp; Client Feedback
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-500">
            Hear from our Founder and real stories from travelers exploring Gilgit-Baltistan and across Pakistan.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <TestimonialSkeleton key={`testimonial-skeleton-${idx}`} />
              ))
            : TESTIMONIALS.map((t, idx) => {
                const isLeader = t.isLeader;
                return (
                  <div
                    key={t.id}
                    id={`testimonial-card-${t.id}`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    className={`rounded-3xl p-7 shadow-xl flex flex-col justify-between transition-all duration-700 transform hover:-translate-y-2 ${
                      isLeader
                        ? 'bg-slate-900 border border-slate-800 text-white shadow-slate-900/10'
                        : 'bg-white border border-slate-100 text-slate-900 shadow-slate-100'
                    } ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* Badge & Star Rating / Quote Content */}
                    <div>
                      {isLeader ? (
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                            Founder's Vision
                          </span>
                          <div className="flex gap-1 text-amber-400">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-1 text-amber-400 mb-6">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      )}

                      <blockquote className={`font-sans text-sm leading-relaxed italic ${isLeader ? 'text-slate-200' : 'text-slate-600'}`}>
                        {t.text}
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className={`flex items-center gap-3.5 mt-8 pt-6 border-t ${isLeader ? 'border-slate-800' : 'border-slate-100'}`}>
                      <img
                        src={t.avatar}
                        alt={`${t.name} - ${t.role}`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className={`w-12 h-12 rounded-full object-cover shrink-0 ${
                          isLeader ? 'border-2 border-brand-orange ring-2 ring-brand-orange/20' : 'border-2 border-brand-blue/20'
                        }`}
                      />
                      <div>
                        <h4 className={`font-display text-sm font-black ${isLeader ? 'text-white' : 'text-brand-dark'}`}>
                          {t.name}
                        </h4>
                        <p className={`text-xs font-semibold mt-0.5 ${isLeader ? 'text-amber-300' : 'text-brand-blue'}`}>
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
