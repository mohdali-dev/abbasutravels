import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Plane, 
  Compass, 
  Clock, 
  Info, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  PhoneCall
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openWhatsApp } from '../utils/whatsapp';

interface CityPoint {
  id: string;
  name: string;
  category: 'Major City' | 'Airport Hub' | 'High Altitude Spot' | 'Border Point';
  coords: [number, number]; // [lat, lng]
  elevation: string;
  description: string;
  highlights: string[];
}

interface TravelRoute {
  id: string;
  title: string;
  from: string;
  to: string;
  type: 'Flight' | 'Highway Drive' | '4x4 SUV Track';
  color: string;
  distanceKm: number;
  duration: string;
  path: [number, number][]; // coordinates array
  recommendedVehicle: string;
  season: string;
  description: string;
  highlights: string[];
}

const CITIES: CityPoint[] = [
  {
    id: 'isb',
    name: 'Islamabad',
    category: 'Airport Hub',
    coords: [33.6844, 73.0479],
    elevation: '540 m',
    description: 'Capital gateway with direct flights and highway connectivity to Gilgit-Baltistan.',
    highlights: ['Islamabad International Airport (ISB)', 'Hazara Motorway Entry', 'Central Travel Desk']
  },
  {
    id: 'kdu',
    name: 'Skardu',
    category: 'Airport Hub',
    coords: [35.2971, 75.6333],
    elevation: '2,230 m',
    description: 'Heart of Baltistan valley surrounded by 8,000m Karakoram peaks and cold deserts.',
    highlights: ['Skardu International Airport', 'Shangrila Lake', 'Katpana Cold Desert', 'Kharpocho Fort']
  },
  {
    id: 'glt',
    name: 'Gilgit',
    category: 'Major City',
    coords: [35.9208, 74.3144],
    elevation: '1,500 m',
    description: 'Administrative capital of GB and strategic junction of Karakoram Highway & Skardu road.',
    highlights: ['Gilgit Airport (GIL)', 'Karakoram Highway Hub', 'Suspension Bridges', 'Local Bazaars']
  },
  {
    id: 'hnz',
    name: 'Hunza (Karimabad)',
    category: 'Major City',
    coords: [36.3167, 74.6500],
    elevation: '2,438 m',
    description: 'Famous mountain valley renowned for 800-year-old Baltit Fort and apricot orchards.',
    highlights: ['Baltit & Altit Forts', "Eagle's Nest Sunset Viewpoint", 'Rakaposhi Viewpoint', 'Attabad Lake']
  },
  {
    id: 'att',
    name: 'Attabad Lake & Passu',
    category: 'High Altitude Spot',
    coords: [36.3333, 74.8667],
    elevation: '2,558 m',
    description: 'Turquoise glacier-fed water lake formed in 2010, surrounded by iconic Passu Cones.',
    highlights: ['Attabad Boating & Jet Ski', 'Passu Cones Cathedral Peaks', 'Hussaini Suspension Bridge']
  },
  {
    id: 'khj',
    name: 'Khunjerab Pass',
    category: 'Border Point',
    coords: [36.8497, 75.4248],
    elevation: '4,693 m',
    description: "World's highest paved international border crossing between Pakistan and China.",
    highlights: ['Pak-China Friendship Gate', 'World\'s Highest ATM', 'Marco Polo Sheep Habitat']
  },
  {
    id: 'deo',
    name: 'Deosai Plains (Sheosar Lake)',
    category: 'High Altitude Spot',
    coords: [35.0500, 75.4667],
    elevation: '4,114 m',
    description: "World's 2nd highest alpine plateau known as the 'Land of Giants' with wildflowers and brown bears.",
    highlights: ['Sheosar Lake', 'Himalayan Brown Bear Sanctuary', 'Bara Pani Camping Grounds']
  },
  {
    id: 'khp',
    name: 'Khaplu Valley',
    category: 'Major City',
    coords: [35.1558, 76.3361],
    elevation: '2,600 m',
    description: 'Picturesque valley along Shyok River with historic royal forts and ancient wooden mosques.',
    highlights: ['Khaplu Palace (Serena)', 'Chaqchan Mosque (1370 AD)', 'Haldi Cones View']
  },
  {
    id: 'bab',
    name: 'Naran & Babusar Top',
    category: 'High Altitude Spot',
    coords: [35.1481, 73.7128],
    elevation: '4,173 m',
    description: 'High mountain pass connecting Kaghan Valley to Chilas on the Karakoram Highway.',
    highlights: ['Babusar Top Viewpoint', 'Lake Saif-ul-Mulook Access', 'Scenic Alpine Meadows']
  }
];

const ROUTES: TravelRoute[] = [
  {
    id: 'r-isb-kdu-air',
    title: 'Islamabad ✈️ Skardu Direct Flight Route',
    from: 'Islamabad',
    to: 'Skardu',
    type: 'Flight',
    color: '#0284c7', // Sky Blue
    distanceKm: 280,
    duration: '45 mins',
    path: [
      [33.6844, 73.0479],
      [34.5000, 74.2000],
      [35.2971, 75.6333]
    ],
    recommendedVehicle: 'PIA / Airblue Commercial Aircraft',
    season: 'Year-Round (Weather Permitting)',
    description: 'Spectacular aerial flight passing right beside Nanga Parbat (8,126m) and K2 range.',
    highlights: ['Aerial Nanga Parbat View', '45-Min Direct Express Flight', 'Daily Schedule Options']
  },
  {
    id: 'r-isb-kdu-road',
    title: 'Islamabad to Skardu via Jaglot (Scenic Highway Drive)',
    from: 'Islamabad',
    to: 'Skardu',
    type: 'Highway Drive',
    color: '#d97706', // Warm Amber
    distanceKm: 630,
    duration: '14 - 16 Hours',
    path: [
      [33.6844, 73.0479],
      [34.3333, 73.2000], // Abbottabad
      [35.4167, 74.1000], // Chilas
      [35.9208, 74.3144], // Gilgit / Jaglot
      [35.5000, 74.9000], // Astak Nala
      [35.2971, 75.6333]  // Skardu
    ],
    recommendedVehicle: 'Toyota Prado 4x4 / HiAce Grand Cabin',
    season: 'Year-Round',
    description: 'Classic road journey along Karakoram Highway and freshly paved Skardu Highway through deep gorges.',
    highlights: ['3 Mountain Ranges Junction', 'Indus River Gorge Drive', 'Astak Nala Waterfall Stop']
  },
  {
    id: 'r-glt-hnz',
    title: 'Gilgit to Hunza Valley (KKH Highway)',
    from: 'Gilgit',
    to: 'Hunza (Karimabad)',
    type: 'Highway Drive',
    color: '#16a34a', // Emerald Green
    distanceKm: 100,
    duration: '2 Hours',
    path: [
      [35.9208, 74.3144],
      [36.0500, 74.4500],
      [36.3167, 74.6500]
    ],
    recommendedVehicle: 'Toyota Corolla / Prado / Grand Cabin',
    season: 'Year-Round',
    description: 'Smooth highway drive along Hunza River with views of Rakaposhi (7,788m) and ancient Silk Route remnants.',
    highlights: ['Rakaposhi Viewpoint Stopover', 'Old Silk Route Memorial', 'Baltit & Altit Forts']
  },
  {
    id: 'r-hnz-khj',
    title: 'Hunza to Khunjerab Pass (China Border Express)',
    from: 'Hunza (Karimabad)',
    to: 'Khunjerab Pass',
    type: 'Highway Drive',
    color: '#9333ea', // Purple
    distanceKm: 175,
    duration: '3.5 Hours',
    path: [
      [36.3167, 74.6500],
      [36.3333, 74.8667], // Attabad Lake
      [36.4500, 74.9000], // Passu
      [36.7000, 75.1000], // Sost
      [36.8497, 75.4248]  // Khunjerab Pass
    ],
    recommendedVehicle: 'Toyota Prado 4x4 / Coaster / Van',
    season: 'April to November',
    description: 'Cross Attabad Tunnels, Passu Cones, and climb up to the snow-covered Pak-China border at 4,693 meters.',
    highlights: ['Attabad Lake Tunneling System', 'Passu Cathedral Peaks', 'Pak-China Monument']
  },
  {
    id: 'r-kdu-deo',
    title: 'Skardu to Deosai Plateau & Sheosar Lake 4x4 Safari',
    from: 'Skardu',
    to: 'Deosai Plains (Sheosar Lake)',
    type: '4x4 SUV Track',
    color: '#dc2626', // Crimson Red
    distanceKm: 80,
    duration: '2.5 Hours',
    path: [
      [35.2971, 75.6333],
      [35.2000, 75.5500], // Sadpara Lake
      [35.0500, 75.4667]  // Sheosar Lake
    ],
    recommendedVehicle: 'Toyota Prado 4x4 SUV (High Clearance Required)',
    season: 'June to October',
    description: 'Ascend Sadpara Lake winding tracks to reach the vast high-altitude plateau, blooming with alpine flora.',
    highlights: ['Sadpara Lake Overlook', 'Bara Pani Wooden Bridge', 'Sheosar Lake Wilds']
  },
  {
    id: 'r-kdu-khp',
    title: 'Skardu to Khaplu Valley Heritage Route',
    from: 'Skardu',
    to: 'Khaplu Valley',
    type: 'Highway Drive',
    color: '#0891b2', // Cyan
    distanceKm: 100,
    duration: '2 Hours',
    path: [
      [35.2971, 75.6333],
      [35.2200, 75.9500], // Shyok River Bend
      [35.1558, 76.3361]  // Khaplu
    ],
    recommendedVehicle: 'Toyota Corolla Sedan / Prado 4x4',
    season: 'Year-Round',
    description: 'Picturesque valley drive following Shyok River lined with poplar trees, apple orchards, and heritage monuments.',
    highlights: ['Shyok River Confluence', 'Khaplu Serena Fort Palace', 'Chaqchan Mosque']
  }
];

export default function RouteMap() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [selectedRouteId, setSelectedRouteId] = useState<string>('r-isb-kdu-road');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Flight' | 'Highway Drive' | '4x4 SUV Track'>('All');

  const selectedRoute = ROUTES.find(r => r.id === selectedRouteId) || ROUTES[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center map around Gilgit-Baltistan central coordinates
    const map = L.map(mapContainerRef.current, {
      center: [35.2500, 74.8000],
      zoom: 7,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Custom sleek CartoDB Positron tiles for clean modern aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render Markers and Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing layers except tiles
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        map.removeLayer(layer);
      }
    });

    // Filter routes
    const filteredRoutes = activeFilter === 'All' 
      ? ROUTES 
      : ROUTES.filter(r => r.type === activeFilter);

    // Draw Polylines for routes
    filteredRoutes.forEach((route) => {
      const isSelected = route.id === selectedRouteId;
      const polyline = L.polyline(route.path, {
        color: route.color,
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 0.95 : 0.4,
        dashArray: route.type === 'Flight' ? '8, 8' : undefined,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      polyline.on('click', () => {
        setSelectedRouteId(route.id);
      });

      // Simple tooltip on hover
      polyline.bindTooltip(`<b>${route.title}</b><br/>${route.distanceKm} km • ${route.duration}`, {
        sticky: true,
        direction: 'top',
        className: 'custom-leaflet-tooltip'
      });
    });

    // Add City Markers
    CITIES.forEach((city) => {
      const isHub = city.category === 'Airport Hub';
      const isBorder = city.category === 'Border Point';

      const iconHtml = `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-6 h-6 rounded-full ${isHub ? 'bg-sky-500/30 animate-ping' : isBorder ? 'bg-purple-500/30' : 'bg-amber-500/20'}"></span>
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg font-bold border-2 border-white ${
            isHub ? 'bg-sky-600' : isBorder ? 'bg-purple-600' : 'bg-brand-dark'
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${isHub ? '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.5-.1-1 .1-1.3.5l-.5.7c-.4.5-.3 1.2.2 1.6l4.2 3.5L5 16l-2.2-.6c-.4-.1-.8.1-1 .4l-.3.5c-.3.4-.2 1 .2 1.2l3.5 2.1 2.1 3.5c.2.4.8.5 1.2.2l.5-.3c.3-.2.5-.6.4-1L8.8 19l2.9-2.9 3.5 4.2c.4.5 1.1.6 1.6.2l.7-.5c.4-.3.6-.8.5-1.3z"/>' : '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'}
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(city.coords, { icon: customIcon }).addTo(map);

      const popupContent = `
        <div class="p-1 max-w-[200px] font-sans">
          <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${city.category} • ${city.elevation}</div>
          <h4 class="font-bold text-sm text-slate-900 mt-0.5">${city.name}</h4>
          <p class="text-xs text-slate-600 mt-1 leading-snug">${city.description}</p>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup'
      });
    });

  }, [selectedRouteId, activeFilter]);

  // Zoom to selected route bounds when route changes
  const handleSelectRoute = (route: TravelRoute) => {
    setSelectedRouteId(route.id);
    const map = mapInstanceRef.current;
    if (map) {
      const bounds = L.latLngBounds(route.path);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 9 });
    }
  };

  const handleWhatsAppRouteInquiry = () => {
    const msg = `Hello ABBASU TRAVELS & TOURS! 👋\n\nI am interested in booking transportation / flight for the following route:\n\n🗺️ *Route:* ${selectedRoute.title}\n📍 *From:* ${selectedRoute.from} ➡️ *To:* ${selectedRoute.to}\n🚗 *Type:* ${selectedRoute.type} (${selectedRoute.recommendedVehicle})\n⏱️ *Est. Duration:* ${selectedRoute.duration} (${selectedRoute.distanceKm} km)\n\nPlease share current rates and availability.`;
    openWhatsApp(msg);
  };

  return (
    <section id="routes-map" className="py-24 bg-slate-50 overflow-hidden border-t border-slate-100">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Interactive Travel Map
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Gilgit-Baltistan Travel Routes &amp; Highways
          </h2>
          <p className="mt-4 text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore flight paths and highway connections across Skardu, Hunza, Deosai, Khaplu, and Khunjerab Pass with distances, travel times, and recommended vehicles.
          </p>
          <div className="mt-3 h-1 w-16 bg-brand-orange mx-auto rounded-full" />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(['All', 'Flight', 'Highway Drive', '4x4 SUV Track'] as const).map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {filter === 'Flight' && <Plane className="w-3.5 h-3.5" />}
                {filter === 'Highway Drive' && <Car className="w-3.5 h-3.5" />}
                {filter === '4x4 SUV Track' && <Navigation className="w-3.5 h-3.5" />}
                {filter === 'All' && <Layers className="w-3.5 h-3.5" />}
                {filter}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Map & Details Drawer */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-3 shadow-xl shadow-slate-100 relative min-h-[420px] sm:min-h-[500px] flex flex-col">
            
            {/* Map Canvas */}
            <div 
              ref={mapContainerRef} 
              className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-100 z-10"
            />

            {/* Map Legend Bar */}
            <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-sans">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-sky-600 rounded-full inline-block border border-sky-400"></span>
                  <span className="font-semibold text-slate-700">Flight Path</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-amber-500 rounded-full inline-block"></span>
                  <span className="font-semibold text-slate-700">Highway Route</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-red-600 rounded-full inline-block"></span>
                  <span className="font-semibold text-slate-700">4x4 Mountain Jeep</span>
                </div>
              </div>
              <span className="text-slate-400 font-medium">Click any route or city marker to view details</span>
            </div>

          </div>

          {/* Route Details Panel Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Route Selector Cards List */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <h3 className="font-display text-sm font-bold text-brand-dark flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-brand-orange" />
                  Popular GB Travel Routes
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-normal">
                  {ROUTES.length} Routes Available
                </span>
              </h3>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                {ROUTES.map((route) => {
                  const isSelected = route.id === selectedRouteId;
                  return (
                    <button
                      key={route.id}
                      onClick={() => handleSelectRoute(route)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                          : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600 shadow-sm'
                        }`}>
                          {route.type === 'Flight' ? <Plane className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="font-display text-xs font-bold line-clamp-1">{route.title}</h4>
                          <span className={`text-[10px] font-mono block mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                            {route.distanceKm} km • {route.duration}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 text-white' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Route Active Focus Card */}
            <div className="bg-brand-dark rounded-3xl p-6 text-white shadow-xl flex-1 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Selected Route Insights
                  </span>
                  <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded-full text-slate-300">
                    {selectedRoute.type}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {selectedRoute.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                    {selectedRoute.description}
                  </p>
                </div>

                {/* Spec Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Distance &amp; Time</span>
                    <span className="font-display text-sm font-black text-brand-orange mt-0.5 block">
                      {selectedRoute.distanceKm} KM ({selectedRoute.duration})
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Best Season</span>
                    <span className="font-display text-xs font-bold text-slate-200 mt-1 block">
                      {selectedRoute.season}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Stops &amp; Highlights</span>
                  {selectedRoute.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  id="route-map-inquire-btn"
                  onClick={handleWhatsAppRouteInquiry}
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-2xl font-sans text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md shadow-brand-orange/20 hover:scale-[1.01]"
                >
                  <PhoneCall className="w-4 h-4" />
                  Inquire Ticket / Driver for This Route
                </button>
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
