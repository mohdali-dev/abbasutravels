/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Users, Wind, Briefcase, ChevronRight } from 'lucide-react';
import { Vehicle } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openWhatsApp } from '../utils/whatsapp';

const VEHICLES: Vehicle[] = [
  {
    id: 'sedan',
    name: 'Sedan (Corolla / Premio)',
    image: '/photos/2TjHXY.jpg',
    capacity: '4 Passengers',
    acType: 'Fully Air Conditioned',
    baggage: '2 Large Bags',
    priceEstimate: 'Sedan (Corolla/Civic)',
  },
  {
    id: 'prado',
    name: 'Premium SUV (Prado)',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    capacity: '4-6 Passengers',
    acType: 'Dual AC System',
    baggage: '3 Large Bags',
    priceEstimate: 'Premium SUV (Prado)',
  },
  {
    id: 'hiace',
    name: 'Hiace Grand Cabin',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    capacity: '12-15 Passengers',
    acType: 'High-Roof Dual AC',
    baggage: 'Ample Space',
    priceEstimate: 'Hiace Grand Cabin',
  },
];

function FleetSkeleton() {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm animate-pulse flex flex-col justify-between min-h-[460px]">
      {/* Vehicle Image Skeleton */}
      <div className="h-48 bg-slate-200 relative animate-pulse" />
      
      {/* Vehicle Info Skeleton */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          {/* Title */}
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 animate-pulse" />
          
          {/* Specs Lines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded-md w-1/2 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded-md w-2/3 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 bg-slate-200 rounded-md w-2/5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* CTA Button Skeleton */}
        <div className="h-12 bg-slate-200 rounded-2xl w-full mt-6 animate-pulse" />
      </div>
    </div>
  );
}

export default function Fleet() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleInquirePrice = (vehicleName: string) => {
    openWhatsApp(
      `Hello ABBASU TRAVELS & TOURS! I would like to inquire about the rental price and availability for the ${vehicleName} for our trip in Gilgit-Baltistan.`
    );
  };

  return (
    <section id="car-rental" className="py-24 bg-white">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Our Reliable Vehicle Fleet
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Modern, Clean, and Well-Maintained Vehicles for Mountain Roads
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-500">
            Engineered to handle the challenging, scenic routes of Karakoram Highway and Hunza Valley comfortably.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <FleetSkeleton key={`fleet-skeleton-${idx}`} />
              ))
            : VEHICLES.map((vehicle, idx) => (
                <div
                  key={vehicle.id}
                  id={`vehicle-card-${vehicle.id}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  className={`bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 flex flex-col justify-between transform hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Vehicle Image */}
                  <div className="h-48 overflow-hidden relative group">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} Car Rental Pakistan - ABBASU Travels`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 bg-brand-orange/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      With Driver
                    </span>
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-brand-dark mb-5 tracking-tight">
                        {vehicle.name}
                      </h3>

                      {/* Bullet Specs */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-brand-blue shrink-0" />
                          <span className="font-sans text-sm font-semibold text-slate-600">
                            Capacity: {vehicle.capacity}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Wind className="w-5 h-5 text-brand-blue shrink-0" />
                          <span className="font-sans text-sm font-semibold text-slate-600">
                            {vehicle.acType}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-brand-blue shrink-0" />
                          <span className="font-sans text-sm font-semibold text-slate-600">
                            {vehicle.baggage}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing / WhatsApp CTA */}
                    <button
                      id={`vehicle-cta-${vehicle.id}`}
                      onClick={() => handleInquirePrice(vehicle.priceEstimate)}
                      className="w-full py-3.5 px-5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white rounded-2xl font-sans text-sm font-bold text-center transition-colors duration-300 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Contact for Price
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
