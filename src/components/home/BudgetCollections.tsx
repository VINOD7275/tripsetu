import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/mockData';
import { DestinationCard } from '../common/DestinationCard';
import { useCurrency } from '../../context/CurrencyContext';
import { Link } from 'react-router-dom';

interface BudgetTier {
  id: string;
  label: string;
  maxBudgetInr: number;
  tagline: string;
  icon: string;
}

export const BudgetCollections: React.FC = () => {
  const { formatAmount } = useCurrency();

  const tiers: BudgetTier[] = [
    { id: 'under-5k', label: 'Under ₹5,000', maxBudgetInr: 6000, tagline: 'Quick weekend thrill escapes & riverside camps', icon: '🎒' },
    { id: 'under-10k', label: 'Under ₹10,000', maxBudgetInr: 10000, tagline: 'Snow peaks, coastal scooters & desert dunes', icon: '🏕️' },
    { id: 'under-25k', label: 'Under ₹25,000', maxBudgetInr: 25000, tagline: 'Living root bridges, high passes & deep valleys', icon: '🧗' },
    { id: 'under-50k', label: 'Under ₹50,000', maxBudgetInr: 50000, tagline: 'Southeast Asia loops & island scuba paradises', icon: '✈️' },
  ];

  const [activeTierId, setActiveTierId] = useState(tiers[1].id);
  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[1];

  const filteredDestinations = DESTINATIONS_DATA.filter(
    (d) => d.minBudgetInr <= activeTier.maxBudgetInr
  ).sort((a, b) => b.popularityScore - a.popularityScore);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-orange-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Wallet className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Tailored Budget Collections</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
              Where Can You Travel On Your Budget?
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl font-medium">
              Curated adventure packages calculated with real transit fares, verified backpacker stays, and certified activity passes.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5722] hover:text-orange-700 transition-colors"
          >
            <span>Explore all {DESTINATIONS_DATA.length}+ verified destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tier Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 p-2 mb-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTierId(tier.id)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                activeTierId === tier.id
                  ? 'bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tier.icon}</span>
              <span>{tier.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tier Tagline */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-orange-200/80 flex items-center justify-between text-xs sm:text-sm shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Showing verified trips where complete minimum cost is capped at <strong className="text-slate-950 font-bold">{formatAmount(activeTier.maxBudgetInr)}</strong>.</span>
          </div>
          <span className="text-orange-700 font-bold hidden sm:inline bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
            {filteredDestinations.length} adventures match
          </span>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTierId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDestinations.slice(0, 3).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
