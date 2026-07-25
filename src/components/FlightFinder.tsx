import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Users, 
  Plane, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Ticket 
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openWhatsApp } from '../utils/whatsapp';

interface FlightSchedule {
  flightNo: string;
  airline: string;
  departure: string;
  arrival: string;
  days: string[];
  duration: string;
  priceClass: 'Economy' | 'Executive Economy' | 'Business';
  baseFare: string;
}

const ROUTE_FLIGHTS: Record<string, FlightSchedule[]> = {
  'ISB-KDU': [
    { flightNo: 'PK-451', airline: 'PIA', departure: '07:00 AM', arrival: '07:45 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 18,500' },
    { flightNo: 'PK-453', airline: 'PIA', departure: '10:30 AM', arrival: '11:15 AM', days: ['Wed', 'Fri', 'Sun'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 19,000' },
    { flightNo: 'PA-251', airline: 'Airblue', departure: '08:15 AM', arrival: '09:00 AM', days: ['Tue', 'Thu', 'Sat'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 17,900' },
    { flightNo: 'FJ-351', airline: 'Fly Jinnah', departure: '09:45 AM', arrival: '10:30 AM', days: ['Mon', 'Wed', 'Sat'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 16,800' }
  ],
  'KDU-ISB': [
    { flightNo: 'PK-452', airline: 'PIA', departure: '08:30 AM', arrival: '09:15 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 18,500' },
    { flightNo: 'PA-252', airline: 'Airblue', departure: '09:45 AM', arrival: '10:30 AM', days: ['Tue', 'Thu', 'Sat'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 17,900' },
    { flightNo: 'FJ-352', airline: 'Fly Jinnah', departure: '11:15 AM', arrival: '12:00 PM', days: ['Mon', 'Wed', 'Sat'], duration: '45m', priceClass: 'Economy', baseFare: 'PKR 16,800' }
  ],
  'LHE-KDU': [
    { flightNo: 'PK-609', airline: 'PIA', departure: '06:15 AM', arrival: '07:25 AM', days: ['Wed', 'Sat'], duration: '1h 10m', priceClass: 'Economy', baseFare: 'PKR 24,500' },
    { flightNo: 'PA-412', airline: 'Airblue', departure: '07:45 AM', arrival: '08:55 AM', days: ['Thu', 'Sun'], duration: '1h 10m', priceClass: 'Economy', baseFare: 'PKR 23,800' }
  ],
  'KDU-LHE': [
    { flightNo: 'PK-610', airline: 'PIA', departure: '08:15 AM', arrival: '09:25 AM', days: ['Wed', 'Sat'], duration: '1h 10m', priceClass: 'Economy', baseFare: 'PKR 24,500' },
    { flightNo: 'PA-413', airline: 'Airblue', departure: '09:40 AM', arrival: '10:50 AM', days: ['Thu', 'Sun'], duration: '1h 10m', priceClass: 'Economy', baseFare: 'PKR 23,800' }
  ],
  'KHI-KDU': [
    { flightNo: 'PK-536', airline: 'PIA', departure: '05:30 AM', arrival: '07:45 AM', days: ['Tue', 'Sat'], duration: '2h 15m', priceClass: 'Economy', baseFare: 'PKR 36,000' }
  ],
  'KDU-KHI': [
    { flightNo: 'PK-537', airline: 'PIA', departure: '08:30 AM', arrival: '10:45 AM', days: ['Tue', 'Sat'], duration: '2h 15m', priceClass: 'Economy', baseFare: 'PKR 36,000' }
  ]
};

export default function FlightFinder() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const [origin, setOrigin] = useState('ISB');
  const [destination, setDestination] = useState('KDU');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');
  const [searchedFlights, setSearchedFlights] = useState<FlightSchedule[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Swap origin and destination safely
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setSearchedFlights(null);
    setHasSearched(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const routeKey = `${origin}-${destination}`;
    const results = ROUTE_FLIGHTS[routeKey] || [];
    setSearchedFlights(results);
    setHasSearched(true);
  };

  const handleBookFlight = (flight: FlightSchedule) => {
    const originLabel = origin === 'ISB' ? 'Islamabad (ISB)' : origin === 'LHE' ? 'Lahore (LHE)' : origin === 'KHI' ? 'Karachi (KHI)' : 'Skardu (KDU)';
    const destLabel = destination === 'ISB' ? 'Islamabad (ISB)' : destination === 'LHE' ? 'Lahore (LHE)' : destination === 'KHI' ? 'Karachi (KHI)' : 'Skardu (KDU)';
    const dateStr = travelDate ? `on *${travelDate}*` : 'as soon as possible';

    const formattedMessage = `Hello ABBASU TRAVELS & TOURS! 👋

I would like to book seats on the following flight:

✈️ *Flight No:* ${flight.flightNo} (${flight.airline})
📍 *Route:* ${originLabel} ➡️ ${destLabel}
📅 *Travel Date:* ${dateStr}
👥 *Passengers:* ${passengers} Adult(s)
💼 *Class:* ${flightClass}
💰 *Est. Base Fare:* ${flight.baseFare} per ticket

Please verify seat availability and share booking details. Thank you!`;

    openWhatsApp(formattedMessage);
  };

  return (
    <section id="flights-search" className="py-24 bg-slate-50 relative border-t border-slate-100">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Ticket className="w-3.5 h-3.5" />
            Live Travel Desk
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Search Flight Schedules &amp; Book Tickets
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Instantly view direct commercial schedules connecting Islamabad, Lahore, Karachi and Skardu. Request instantly on WhatsApp for ticket issuance.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Search Engine Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100 max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Origin Selection */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</label>
                <select
                  value={origin}
                  onChange={(e) => {
                    setOrigin(e.target.value);
                    setHasSearched(false);
                  }}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm font-bold text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all duration-300"
                >
                  <option value="ISB">Islamabad (ISB)</option>
                  <option value="LHE">Lahore (LHE)</option>
                  <option value="KHI">Karachi (KHI)</option>
                  <option value="KDU">Skardu (KDU)</option>
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-5">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                  title="Swap Directions"
                >
                  <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                </button>
              </div>

              {/* Destination Selection */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To</label>
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setHasSearched(false);
                  }}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm font-bold text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all duration-300"
                >
                  <option value="KDU">Skardu (KDU)</option>
                  <option value="ISB">Islamabad (ISB)</option>
                  <option value="LHE">Lahore (LHE)</option>
                  <option value="KHI">Karachi (KHI)</option>
                </select>
              </div>

              {/* Travel Date */}
              <div className="md:col-span-3 flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm font-semibold text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Search Submit */}
              <div className="md:col-span-2 pt-5">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-sans text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 shadow-md shadow-brand-blue/15 hover:shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  Find Flights
                </button>
              </div>

            </div>

            {/* Additional filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-100">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Passengers</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="font-sans text-sm font-black w-8 text-center">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 cursor-pointer text-lg font-bold"
                  >
                    +
                  </button>
                  <span className="text-xs text-slate-400 font-medium ml-2">Adult Passengers</span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Cabin Class</label>
                <div className="flex gap-2">
                  {['Economy', 'Executive Economy', 'Business'].map((cls) => {
                    const isSelected = flightClass === cls;
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setFlightClass(cls)}
                        className={`px-4 py-2 rounded-lg border font-sans text-xs font-bold cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'bg-brand-blue border-brand-blue text-white shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>

          {/* Results Block */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              {hasSearched && searchedFlights && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-display text-base font-bold text-brand-dark flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      Schedules Available ({searchedFlights.length})
                    </h4>
                    <span className="text-xs font-sans font-medium text-slate-400">
                      Standard operating times shown. Rates depend on real-time class load.
                    </span>
                  </div>

                  {searchedFlights.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center text-slate-500 font-sans text-sm">
                      <AlertCircle className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                      No direct flights found for this specific routing combination. 
                      Please search connections via Islamabad.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {searchedFlights.map((flight) => (
                        <div
                          key={flight.flightNo}
                          className="border border-slate-100 hover:border-brand-blue/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 bg-slate-50/50 hover:bg-white hover:shadow-md"
                        >
                          <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
                            {/* Airline Identity */}
                            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm min-w-[120px]">
                              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Plane className="w-4 h-4 rotate-45" />
                              </div>
                              <div>
                                <span className="font-display text-xs font-bold text-brand-dark block">{flight.airline}</span>
                                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wide">{flight.flightNo}</span>
                              </div>
                            </div>

                            {/* Departure & Flight track */}
                            <div className="flex items-center gap-3 sm:gap-5">
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Departure</span>
                                <span className="font-display text-sm sm:text-base font-black text-brand-dark">{flight.departure}</span>
                              </div>
                              <div className="flex flex-col items-center px-2">
                                <span className="text-[9px] font-sans font-bold text-slate-400">{flight.duration}</span>
                                <div className="w-12 h-[2px] bg-slate-200 relative my-1">
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                </div>
                                <span className="text-[9px] font-sans font-bold text-emerald-500 uppercase">Direct</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Arrival</span>
                                <span className="font-display text-sm sm:text-base font-black text-brand-dark">{flight.arrival}</span>
                              </div>
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Estimated Fare</span>
                              <span className="font-display text-base font-extrabold text-brand-blue">{flight.baseFare}</span>
                              <span className="text-[9px] text-slate-400 block mt-0.5">Seat + 20kg Baggage</span>
                            </div>
                            <button
                              id={`flight-book-btn-${flight.flightNo}`}
                              onClick={() => handleBookFlight(flight)}
                              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-sans text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300 shadow-md shadow-brand-blue/15 hover:shadow-lg hover:-translate-y-0.5"
                            >
                              Inquire Booking
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Notice */}
          <div className="mt-8 bg-slate-50 border border-slate-100 p-4.5 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              <strong>Premium Seat Allocation Assistance:</strong> Standard airline packages include up to 20kg checked baggage and 7kg hand baggage. Let our travel desk assist you with priority window seats, infant booking, senior citizen discounts, and ticket refund protection.
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
