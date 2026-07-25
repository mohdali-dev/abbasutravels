import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  MapPin, 
  Clock, 
  Calendar, 
  Compass, 
  AlertCircle, 
  ArrowRightLeft, 
  ChevronRight, 
  Globe, 
  Sparkles 
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openWhatsApp } from '../utils/whatsapp';

interface RouteDetail {
  id: string;
  from: string;
  to: string;
  type: 'Domestic' | 'International';
  duration: string;
  frequency: string;
  airlines: string[];
  scenicLevel: 'Unrivaled' | 'Extreme' | 'High';
  scenicHighlight: string;
  description: string;
  tips: string;
  popularFor: string;
}

const FLIGHT_ROUTES: RouteDetail[] = [
  {
    id: 'skardu-islamabad',
    from: 'Skardu (OPSD)',
    to: 'Islamabad (OPIS)',
    type: 'Domestic',
    duration: '45 Mins',
    frequency: 'Daily Flights (Multiple Operators)',
    airlines: ['PIA', 'Airblue', 'Fly Jinnah'],
    scenicLevel: 'Unrivaled',
    scenicHighlight: 'Direct bird-eye view of Nanga Parbat (8,126m) and the sheer Indus River canyon.',
    popularFor: 'Quickest business, family, and tourist connection to the capital.',
    description: 'The lifeline flight route of Gilgit-Baltistan. Operating multiple times daily, this short flight offers some of the most sensational commercial aviation views on Earth, soaring through deep mountain passes.',
    tips: 'Sit on the right side of the plane when flying to Skardu, and the left side when flying to Islamabad, for the most spectacular mountain views!'
  },
  {
    id: 'skardu-lahore',
    from: 'Skardu (OPSD)',
    to: 'Lahore (OPLA)',
    type: 'Domestic',
    duration: '1 Hr 10 Mins',
    frequency: '3x to 4x Weekly',
    airlines: ['PIA', 'Airblue'],
    scenicLevel: 'Extreme',
    scenicHighlight: 'Sweeping transitions from Punjab\'s lush green plains into the snowy titan walls of the Himalayas.',
    popularFor: 'Direct escape to cooler altitudes for Punjab-based families and corporate teams.',
    description: 'Directly connect the cultural heartland of Lahore with the pristine valleys of Baltistan. Skip the grueling 24-hour road trip via Karakoram Highway for an effortless, incredibly scenic aerial transit.',
    tips: 'Flights are often scheduled in the morning. Secure window seats early during online check-in.'
  },
  {
    id: 'skardu-karachi',
    from: 'Skardu (OPSD)',
    to: 'Karachi (OPKC)',
    type: 'Domestic',
    duration: '2 Hrs 15 Mins',
    frequency: '2x Weekly (Direct) / Daily (via ISB)',
    airlines: ['PIA'],
    scenicLevel: 'High',
    scenicHighlight: 'Contrast of Pakistan\'s southern coastline, the Indus basin desert, and the ultimate vertical Karakoram peaks.',
    popularFor: 'Southern tourists and international arrivals wanting immediate high-altitude access.',
    description: 'Bridging the Arabian Sea with the roof of the world. This premium route allows travelers from Karachi to reach the high-altitude cold deserts of Skardu and Deosai Plains in just over two hours.',
    tips: 'Great option for international visitors landing in Karachi to transition straight to Karakoram base camps.'
  },
  {
    id: 'skardu-gulf',
    from: 'Skardu (OPSD)',
    to: 'Gulf Gateways (DXB / SHJ / JED)',
    type: 'International',
    duration: '3 Hrs 45 Mins',
    frequency: 'Seasonal Directs / Daily Conn. (via ISB)',
    airlines: ['Flydubai', 'Air Arabia', 'PIA'],
    scenicLevel: 'High',
    scenicHighlight: 'Crossing the Gulf of Oman, Pakistan\'s coastal belt, and heading straight into high-altitude mountain territory.',
    popularFor: 'Overseas Pakistanis returning home & international mountain climbers skipping stopovers.',
    description: 'Skardu International Airport is now active! Direct flights from international hubs like Dubai and Sharjah operate seasonally, creating a direct bridge for global mountaineers and tourists into Gilgit-Baltistan.',
    tips: 'Check with our ticketing specialists for active seasonal direct flights or guaranteed baggage-through connecting flights.'
  }
];

export default function FlightRoutes() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const [selectedRouteId, setSelectedRouteId] = useState<string>('skardu-islamabad');

  const selectedRoute = FLIGHT_ROUTES.find(r => r.id === selectedRouteId) || FLIGHT_ROUTES[0];

  const handleInquireRoute = (route: RouteDetail) => {
    openWhatsApp(`Hello ABBASU TRAVELS & TOURS! I want to inquire about flight availability and ticket pricing for the ${route.from} ↔ ${route.to} route. Please share schedules and fare options.`);
  };

  return (
    <section id="flight-routes" className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3..5 h-3.5" />
            Skardu Flight Connections
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            International &amp; Domestic Flight Routes
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Fly directly to Skardu International Airport (OPSD). Skip long road journeys and enjoy some of the world's most spectacular aerial views of Karakoram and Himalayan peaks.
          </p>
          <div className="mt-4 h-1 w-20 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Interactive Route List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-blue rounded-full inline-block" />
                Select Your Connection
              </h3>
              
              <div className="space-y-3">
                {FLIGHT_ROUTES.map((route) => {
                  const isSelected = route.id === selectedRouteId;
                  return (
                    <button
                      key={route.id}
                      id={`route-btn-${route.id}`}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/25 scale-[1.01]'
                          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-brand-blue/10 text-brand-blue'
                        }`}>
                          {route.type === 'International' ? <Globe className="w-5 h-5" /> : <Plane className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold tracking-tight">
                              {route.from.split(' ')[0]} ↔ {route.to.split(' ')[0]}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              isSelected 
                                ? 'bg-white/25 text-white' 
                                : route.type === 'International' 
                                  ? 'bg-purple-100 text-purple-700' 
                                  : 'bg-brand-orange/10 text-brand-orange'
                            }`}>
                              {route.type}
                            </span>
                          </div>
                          <span className={`text-xs font-sans font-medium block mt-1 ${
                            isSelected ? 'text-white/80' : 'text-slate-400'
                          }`}>
                            {route.duration} • {route.frequency.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                        isSelected ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Fact Box */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-3.5 mt-6">
              <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-sm font-bold text-brand-dark">Important Aviation Notice</h4>
                <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                  Flights to and from Skardu are visual flight rule (VFR) routes, which are highly weather-dependent. Early morning flights have the highest success rates. We strongly suggest adding a 1-day buffer to your plans.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visualizer & Info Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoute.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm"
              >
                <div>
                  {/* Route Visualizer Path */}
                  <div className="relative bg-brand-dark rounded-2xl p-6 mb-8 overflow-hidden text-white flex flex-col justify-between min-h-[160px] shadow-inner">
                    {/* Stars / grid design */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                    
                    {/* Visual connections and plane drawing */}
                    <div className="relative z-10 flex justify-between items-center px-4 py-3">
                      {/* From City */}
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Origin</span>
                        <span className="font-display text-lg sm:text-xl font-extrabold text-white">{selectedRoute.from.split(' ')[0]}</span>
                        <span className="text-xs text-slate-300 block font-mono mt-0.5">{selectedRoute.from.match(/\(([^)]+)\)/)?.[0]}</span>
                      </div>

                      {/* Flight Curve */}
                      <div className="flex-grow mx-4 relative flex items-center justify-center">
                        {/* Wavy dash line */}
                        <div className="w-full h-[2px] bg-dashed border-t-2 border-dashed border-white/20 relative">
                          {/* Pulsing indicator center */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md animate-bounce">
                            <Plane className="w-4 h-4 rotate-45" />
                          </div>
                        </div>
                      </div>

                      {/* To City */}
                      <div className="text-center sm:text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Destination</span>
                        <span className="font-display text-lg sm:text-xl font-extrabold text-white">{selectedRoute.to.split(' ')[0]}</span>
                        <span className="text-xs text-slate-300 block font-mono mt-0.5">{selectedRoute.to.match(/\(([^)]+)\)/)?.[0]}</span>
                      </div>
                    </div>

                    {/* Quick duration footer */}
                    <div className="relative z-10 border-t border-white/10 pt-4 flex flex-wrap gap-4 justify-between items-center text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-orange" />
                        <span>Duration: <strong className="text-white font-bold">{selectedRoute.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-orange" />
                        <span>Frequency: <strong className="text-white font-bold">{selectedRoute.frequency}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Route descriptions */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">Route Overview</span>
                      <h4 className="font-display text-xl font-bold text-brand-dark mb-2">
                        Connecting the plains to the Karakoram base
                      </h4>
                      <p className="text-sm font-sans text-slate-600 leading-relaxed">
                        {selectedRoute.description}
                      </p>
                    </div>

                    {/* Grid Specs */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Compass className="w-4 h-4 text-brand-blue" />
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Scenic Vista Rating</span>
                        </div>
                        <p className="text-xs text-slate-800 font-bold flex items-center gap-1.5">
                          {selectedRoute.scenicLevel} Experience
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </p>
                        <p className="text-[11px] text-slate-500 font-sans mt-1 leading-relaxed">
                          {selectedRoute.scenicHighlight}
                        </p>
                      </div>

                      <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Plane className="w-4 h-4 text-brand-orange" />
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Supported Airlines</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedRoute.airlines.map((airline) => (
                            <span key={airline} className="text-[10px] font-bold text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full">
                              {airline}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans mt-1.5 leading-relaxed">
                          {selectedRoute.popularFor}
                        </p>
                      </div>
                    </div>

                    {/* Operational Tip Card */}
                    <div className="bg-brand-blue/[0.03] border border-brand-blue/10 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-4 h-4 text-brand-blue" />
                        <span className="text-[10px] text-brand-blue uppercase tracking-wider font-black">Local Expert In-Flight Tip</span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed italic">
                        "{selectedRoute.tips}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Inquire Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    id={`route-cta-wa-${selectedRoute.id}`}
                    onClick={() => handleInquireRoute(selectedRoute)}
                    className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-2xl font-sans text-sm font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                  >
                    {/* WhatsApp Custom SVG */}
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.34c1.472.8 3.124 1.222 4.81 1.225h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 0 0-2.927-7.06A9.92 9.92 0 0 0 12.012 2zm5.82 14.18c-.24.675-1.22 1.232-1.68 1.293-.413.056-.947.086-2.69-.617-2.228-.9-3.655-3.114-3.766-3.26-.11-.148-.9-1.173-.9-2.242 0-1.068.553-1.593.75-1.802.196-.208.43-.262.573-.262.143 0 .285.002.408.008.13.006.305-.047.478.36.18.423.616 1.47.67 1.578.05.108.087.234.012.378-.074.144-.11.234-.22.36-.11.127-.234.283-.33.38-.11.11-.225.23-.097.443.127.214.567.92 1.218 1.493.837.736 1.54.962 1.76.1.22-.11.474-.294.67-.532.2-.238.266-.2.4-.11l1.246.6c.14.07.23.104.26.16.035.056.035.328-.084.664z" />
                    </svg>
                    Book This Route via WhatsApp
                  </button>
                  <span className="text-[11px] text-slate-400 font-sans font-medium text-center sm:text-left">
                    Instant flight reservation &amp; live schedule check with our agent.
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
