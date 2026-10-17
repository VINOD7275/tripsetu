import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Flame, 
  Wallet, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Star,
  ChevronRight,
  TrendingUp,
  Mountain,
  Waves,
  Trees,
  Sun
} from 'lucide-react';
import { HeroSearchForm } from '../components/home/HeroSearchForm';
import { BudgetCollections } from '../components/home/BudgetCollections';
import { InteractiveBudgetPreview } from '../components/home/InteractiveBudgetPreview';
import { DestinationCard } from '../components/common/DestinationCard';
import { DESTINATIONS_DATA, TRAVEL_GUIDES_DATA, SAMPLE_USER_TRIPS } from '../data/mockData';
import { useCurrency } from '../context/CurrencyContext';

export const HomePage: React.FC = () => {
  const { formatAmount } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Landscapes', icon: Compass },
    { id: 'mountains', name: 'Himalayas & Peaks', icon: Mountain },
    { id: 'beaches', name: 'Coastal & Coral', icon: Waves },
    { id: 'forests', name: 'Rainforests & Falls', icon: Trees },
    { id: 'deserts', name: 'Deserts & Valleys', icon: Sun },
  ];

  const filteredDestinations = selectedCategory === 'all'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter((d) => d.category === selectedCategory);

  const stats = [
    { value: '10,000+', label: 'Adventures Planned' },
    { value: '50+', label: 'Verified Thrill Sports' },
    { value: '₹4,500', label: 'Starting Budget Tier' },
    { value: '99.4%', label: 'Traveler Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      
      {/* 1. CINEMATIC LIGHT & COLORFUL HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden">
        
        {/* Background Image with Light Sunlit Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
            alt="Sunny Alpine Mountain Panorama"
            className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-95"
          />
          <div className="absolute inset-0 hero-overlay-light" />
        </div>

        {/* Ambient Warm Sun Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-orange-300/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-300/20 blur-[100px] rounded-full pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-orange-200 backdrop-blur-md text-xs sm:text-sm font-bold text-orange-700 shadow-md shadow-orange-500/10"
          >
            <Sparkles className="w-4 h-4 text-[#FF5722] animate-spin-slow" />
            <span>Smart AI Engine • Realistic Cost Forecasts • Zero Hidden Tariffs</span>
          </motion.div>

          {/* Headline requested in prompt */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 font-heading leading-[1.08]"
          >
            Your Budget. <br className="hidden sm:inline" />
            <span className="text-sunset-gradient">Your Adventure.</span> <br className="hidden sm:inline" />
            Your World.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Discover breathtaking mountain passes, whitewater rapids, and tropical islands. Plan full day-by-day itineraries tailored strictly to your bank balance.
          </motion.p>

          {/* Prominent Trip Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 w-full"
          >
            <HeroSearchForm />
          </motion.div>

          {/* Key Stat Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-300/60"
          >
            {stats.map((s) => (
              <div key={s.label} className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-black text-slate-900 font-heading">{s.value}</p>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. ACTIVITY CATEGORIES (Trekking, Camping, Rafting, Paragliding, Scuba, etc.) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Thrill Classifications</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Choose Your Level of Adrenaline
              </h2>
            </div>
            <Link to="/adventures" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5722] hover:text-orange-700">
              <span>View all 50+ adventure sports</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Whitewater Rafting', category: 'rafting', count: 'Grade III-IV', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-emerald-500' },
              { name: 'Paragliding & Glides', category: 'paragliding', count: 'Billing & Solang', img: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-orange-500' },
              { name: 'High Alpine Treks', category: 'trekking', count: 'Bhrigu & Kedarkantha', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-sky-500' },
              { name: 'Coral Scuba Diving', category: 'scuba', count: 'Grande & Havelock', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-cyan-500' },
              { name: 'Riverside Camping', category: 'camping', count: 'Shivpuri & Pangong', img: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-amber-500' },
              { name: 'High Pass Roadtrips', category: 'roadtrip', count: 'Manali-Leh-Spiti', img: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=400&q=80', badgeColor: 'bg-purple-500' }
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/adventures?category=${cat.category}`}
                className="group relative h-48 rounded-3xl overflow-hidden border border-slate-200 p-4 flex flex-col justify-end shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative z-10">
                  <span className={`inline-block text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full ${cat.badgeColor} uppercase tracking-wider mb-1`}>
                    {cat.count}
                  </span>
                  <h4 className="text-sm font-black text-white group-hover:text-orange-300 transition-colors font-heading leading-tight">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS (Across India and the World) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Expeditions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                Popular Adventure Destinations
              </h2>
              <p className="text-slate-600 text-sm mt-2 font-medium">
                From budget Himalayan weekends to bucket-list Southeast Asian loops.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                      selectedCategory === c.id
                        ? 'bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white shadow-md shadow-orange-500/25'
                        : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all shadow-md"
            >
              <span>Explore All Destinations with Map & Budget Filters</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BUDGET COLLECTIONS (Under ₹5K, ₹10K, ₹25K, ₹50K) */}
      <BudgetCollections />

      {/* 5. INTERACTIVE BUDGET CALCULATOR PREVIEW (Recharts Visuals) */}
      <InteractiveBudgetPreview />

      {/* 6. FEATURED DAY-BY-DAY ITINERARY PREVIEW */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Step-by-Step Roadmaps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
              Featured Adventure Itineraries
            </h2>
            <p className="text-slate-600 text-sm mt-3 font-medium">
              Inspect how TripTrail schedules activities, mountain meals, acclimatization, and campfire evenings hour-by-hour.
            </p>
          </div>

          {/* Sample Itinerary Showcase */}
          {SAMPLE_USER_TRIPS.slice(0, 1).map((sampleTrip) => (
            <div key={sampleTrip.id} className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    Verified 3-Day Weekend Itinerary
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-2">
                    {sampleTrip.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Starting from {sampleTrip.startingCity} • Budget: <strong className="text-slate-900 font-bold">{formatAmount(sampleTrip.totalBudget)}</strong> for {sampleTrip.travelersCount} travelers
                  </p>
                </div>

                <Link
                  to={`/plan?destination=${sampleTrip.destinationName}`}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white text-xs font-bold rounded-2xl shadow-md shadow-orange-500/20 transition-all self-start md:self-auto hover:brightness-110"
                >
                  Customize This Itinerary
                </Link>
              </div>

              {/* Day Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                {sampleTrip.itinerary.map((day) => (
                  <div key={day.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                        Day {day.dayNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-bold">{formatAmount(day.dayBudgetInr)} est.</span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 font-heading">
                      {day.title}
                    </h4>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {day.schedule.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-[#FF6B35] font-bold text-[11px] shrink-0">{item.time}</span>
                          <span className="line-clamp-1 font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-emerald-800 font-semibold pt-1">
                      🍴 {day.meals.lunch}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRAVEL GUIDES & SURVIVAL TIPS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Field Tested Knowledge</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                Safety Guides & Budget Hacks
              </h2>
            </div>
            <Link to="/guides" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5722] hover:text-orange-700">
              <span>Read all expedition guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_GUIDES_DATA.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={guide.heroImage}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/95 text-emerald-800 border border-slate-200 shadow-sm">
                    {guide.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">{guide.readTime} • By {guide.author}</span>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-[#FF6B35] transition-colors font-heading leading-snug">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-bold text-[#FF5722] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read full survival guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-orange-50/40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-orange-500 via-[#FF6B35] to-[#FA541C] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight mb-4">
              Ready to Conquer the Wild Without Emptying Your Wallet?
            </h2>
            <p className="text-orange-50 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium leading-relaxed">
              Input your available budget and let TripTrail configure your complete transit routes, safe camping, and high-altitude adventures.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/plan"
                className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 hover:text-orange-700 font-black text-sm rounded-2xl shadow-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span>Launch Smart Trip Planner</span>
              </Link>
              <Link
                to="/destinations"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600/60 hover:bg-orange-600/80 text-white font-black text-sm rounded-2xl border border-white/30 transition-colors"
              >
                Browse All Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
