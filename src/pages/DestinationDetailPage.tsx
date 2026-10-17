import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Flame, 
  ArrowLeft, 
  Sparkles, 
  Train, 
  Plane, 
  Bus, 
  Car, 
  Home, 
  Utensils, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { DESTINATIONS_DATA, ACTIVITIES_DATA } from '../data/mockData';
import { useCurrency } from '../context/CurrencyContext';
import { ActivityCard } from '../components/common/ActivityCard';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { formatAmount } = useCurrency();

  const destination = DESTINATIONS_DATA.find((d) => d.slug === slug || d.id === slug);
  const relatedActivities = ACTIVITIES_DATA.filter(
    (a) => a.destinationName.toLowerCase().includes(destination?.name.toLowerCase() || '') || a.destinationId === destination?.id
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Destination Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested destination could not be located in our expedition catalog.</p>
        <Link to="/destinations" className="px-5 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl shadow-md">
          Return to Destinations Explorer
        </Link>
      </div>
    );
  }

  const allImages = [destination.imageUrl, ...(destination.gallery || [])];

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'flight': return <Plane className="w-4 h-4 text-sky-600" />;
      case 'train': return <Train className="w-4 h-4 text-emerald-600" />;
      case 'bus': return <Bus className="w-4 h-4 text-amber-600" />;
      default: return <Car className="w-4 h-4 text-[#FF6B35]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20">
      
      {/* Hero Image Showcase */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={allImages[activeImageIndex]}
          alt={destination.name}
          className="w-full h-full object-cover transition-all duration-700 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/25 to-black/30 pointer-events-none" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 text-xs font-bold text-slate-900 hover:bg-white transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Title & Badges */}
        <div className="absolute bottom-10 left-4 sm:left-8 right-4 sm:right-8 z-20 max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 shadow-sm">
              {destination.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-sm backdrop-blur-md">
              {destination.difficultyLevel} Difficulty
            </span>
            {destination.isInternational && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow-sm backdrop-blur-md">
                International Destination
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-white font-heading tracking-tight drop-shadow-md">
            {destination.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-200 mt-2 font-medium">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>{destination.stateCountry}</span>
            <span>•</span>
            <span className="text-orange-300 font-bold">{destination.tagline}</span>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {allImages.length > 1 && (
          <div className="absolute bottom-6 right-4 sm:right-8 z-20 hidden md:flex items-center gap-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shadow-md ${
                  activeImageIndex === idx ? 'border-[#FF6B35] scale-105' : 'border-white/50 opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Details & Sections */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                <span>Expedition Overview</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {destination.description}
              </p>

              {/* Best Season & Weather Months */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Best Expedition Season:</span>
                  </span>
                  <span className="text-slate-900 font-bold">{destination.bestSeason}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => {
                    const isIdeal = destination.bestMonths.includes(m);
                    return (
                      <span
                        key={m}
                        className={`text-[11px] px-2.5 py-1 rounded-xl font-bold ${
                          isIdeal
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {m}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* How to Reach (Transport Options) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Train className="w-5 h-5 text-emerald-600" />
                <span>Affordable Transportation Routes</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified transit connections based on direct rail, express buses, and regional airports.
              </p>

              <div className="space-y-3 pt-2">
                {destination.transportOptions.map((opt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                        {getTransportIcon(opt.mode)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{opt.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 font-medium">{opt.notes}</p>
                        <span className="text-[11px] text-slate-500 font-semibold mt-1 inline-block">Estimated travel time: ~{opt.durationHours} hrs</span>
                      </div>
                    </div>
                    <div className="text-right sm:shrink-0 bg-white px-3.5 py-1.5 rounded-xl border border-orange-200 shadow-sm">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Tariff from</p>
                      <p className="text-sm font-black text-[#FF5722]">{formatAmount(opt.estimatedCostInr)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Where to Stay (Hostels, Camps, Homestays) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Home className="w-5 h-5 text-[#FF6B35]" />
                <span>Base Camps & Backpacker Stays</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Safe, highly-rated accommodations vetted for solo travelers, groups, and adventure crews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {destination.stayOptions.map((stay, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {stay.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-black text-[#FF5722]">
                          {formatAmount(stay.pricePerNightInr)} <span className="text-[10px] font-medium text-slate-500">/night</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{stay.title}</h4>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-200">
                      {stay.highlights.map((h, i) => (
                        <p key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Food & Dining Guide */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-500" />
                <span>Regional Food Guide & Daily Dining Cost</span>
              </h3>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-bold">Average Daily Food Spend per Traveler:</span>
                <span className="text-base font-black text-amber-900">{formatAmount(destination.foodGuide.avgDailyCost)} / day</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold mb-2">Must-taste local dishes & drinks:</p>
                <div className="flex flex-wrap gap-2">
                  {destination.foodGuide.famousDishes.map((dish, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm">
                      🍲 {dish}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50 border border-rose-200 space-y-3 shadow-md">
              <h3 className="text-lg font-bold text-rose-900 font-heading flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Crucial Adventure Safety Advisories</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                {destination.safetyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Available Thrills & Activities */}
            {relatedActivities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#FF6B35]" />
                  <span>Available Adventure Thrills in {destination.name}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relatedActivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Sticky Booking & Action Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Estimated Base Trip</span>
                  <p className="text-2xl font-black text-[#FF5722]">
                    {formatAmount(destination.minBudgetInr)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Duration</span>
                  <p className="text-sm font-bold text-slate-900">
                    {destination.recommendedDurationDays} Days / {destination.recommendedDurationDays - 1} Nights
                  </p>
                </div>
              </div>

              {/* Highlights Summary */}
              <div className="space-y-2.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Terrain:</span>
                  <span className="font-bold capitalize text-slate-900">{destination.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Daily Average Spend:</span>
                  <span className="font-bold text-slate-900">{formatAmount(destination.avgCostPerDayInr)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Popularity Rank:</span>
                  <span className="font-black text-emerald-600">{destination.popularityScore} / 100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Coordinates:</span>
                  <span className="font-mono text-[11px] text-slate-500 font-bold">
                    {destination.coordinates.lat.toFixed(2)}°N, {destination.coordinates.lng.toFixed(2)}°E
                  </span>
                </div>
              </div>

              {/* Direct Plan CTA */}
              <Link
                to={`/plan?destination=${destination.slug}`}
                className="w-full py-4 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Plan Trip to {destination.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-[10px] text-slate-500 font-medium">
                Generates instant day-by-day itinerary, transit options, and Recharts budget graph.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
