/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface DestinationItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'hunza',
    name: 'Hunza Valley',
    image: 'https://plus.unsplash.com/premium_photo-1698098206457-edeff536c019?q=80&w=687&auto=format&q=80',
    description: 'Breathtaking valleys, historic forts, and ancient cultures nestled in Karakoram.',
  },
  {
    id: 'skardu',
    name: 'Skardu',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80',
    description: 'Gateway to K2, featuring pristine lakes, vast deserts, and rugged peak vistas.',
  },
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows',
    image: 'https://i.pinimg.com/1200x/17/60/de/1760de86e851d77629b5ab24ffdbfb8b.jpg',
    description: 'Lush green alpine meadows at the base of the magnificent Nanga Parbat.',
  },
  {
    id: 'attabad-lake',
    name: 'Attabad Lake',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
    description: 'Striking turquoise waters formed by land slips between Karakoram ranges.',
  },
  {
    id: 'khunjerab-pass',
    name: 'Khunjerab Pass',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    description: 'The highest paved international border crossing, joining Pakistan and China.',
  },
  {
    id: 'deosai',
    name: 'Deosai Plains',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'The "Land of Giants", a majestic high-altitude plateau rich in flora and fauna.',
  },
  {
    id: 'passu',
    name: 'Passu Cones',
    image: 'https://images.unsplash.com/photo-1611918454386-96b08782c739?q=80&w=687&auto=format&fit=crop&w=600&q=80',
    description: 'A striking row of pointed, jagged cathedral mountain peaks in Gojal.',
  },
  {
    id: 'naltar',
    name: 'Naltar Valley',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    description: 'Emerald green pine forests, multi-colored alpine lakes, and skiing slops.',
  },
];

function DestinationSkeleton() {
  return (
    <div className="relative h-80 rounded-3xl overflow-hidden bg-slate-100 animate-pulse shadow-sm border border-slate-100 flex flex-col justify-end p-6">
      {/* Pulse background */}
      <div className="absolute inset-0 bg-slate-200" />
      {/* Gradient overlay to match the original style */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-300/40 via-transparent to-transparent" />
      {/* Text area skeleton */}
      <div className="relative z-10 space-y-3 w-full">
        <div className="h-5 bg-slate-300 rounded-lg w-3/4 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3.5 bg-slate-300 rounded-md w-5/6 animate-pulse" />
          <div className="h-3.5 bg-slate-300 rounded-md w-1/2 animate-pulse" />
        </div>
        <div className="h-3 bg-slate-300 rounded-md w-1/3 pt-1 animate-pulse" />
      </div>
    </div>
  );
}

export default function Destinations() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleInquireDestination = (name: string) => {
    openWhatsApp(
      `Hello ABBASU TRAVELS & TOURS! I am interested in planning a tour to ${name} in Gilgit-Baltistan. Please share standard travel packages or car rental options.`
    );
  };

  return (
    <section id="destinations" className="py-24 bg-white">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* Header Grid */}
        <div className="grid md:grid-cols-12 gap-6 items-end mb-16 pb-6 border-b border-slate-100">
          <div className="md:col-span-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              The North Awaits
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Popular Destinations
            </h2>
          </div>
          <div className="md:col-span-6 md:text-right">
            <p className="font-sans text-base text-slate-500 max-w-lg md:ml-auto leading-relaxed">
              From crystalline lakes to towering peaks, explore the majestic wonders and serene valleys of Gilgit-Baltistan with us.
            </p>
          </div>
        </div>

        {/* 8-Grid of Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <DestinationSkeleton key={`dest-skeleton-${idx}`} />
              ))
            : DESTINATIONS.map((dest, idx) => (
                <div
                  key={dest.id}
                  id={`destination-card-${dest.id}`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  onClick={() => handleInquireDestination(dest.name)}
                  className={`group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-[1.02] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Image with zoom and lazy load */}
                  <img
                    src={dest.image}
                    alt={`${dest.name} Tour Package Gilgit Baltistan - ABBASU Travels`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Black Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/100" />

                  {/* Text content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-1/2">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-brand-orange transition-colors duration-200">
                      {dest.name}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {dest.description}
                    </p>
                    <span className="mt-3 text-[10px] font-bold text-brand-orange uppercase tracking-[0.15em] self-start flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Inquire Tour 
                      <svg className="w-3 h-3 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
