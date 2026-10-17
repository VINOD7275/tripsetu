import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Filter, 
  Search, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowRight, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/mockData';
import { ActivityCard } from '../components/common/ActivityCard';
import { useCurrency } from '../context/CurrencyContext';

export const AdventuresPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { formatAmount } = useCurrency();

  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
  const [thrillFilter, setThrillFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxCost, setMaxCost] = useState<number>(5000);

  const categories = [
    { id: 'all', label: 'All Thrills' },
    { id: 'rafting', label: 'River Rafting' },
    { id: 'paragliding', label: 'Paragliding & Bungee' },
    { id: 'trekking', label: 'Alpine Treks' },
    { id: 'scuba', label: 'Coral Scuba' },
    { id: 'skiing', label: 'Snow Skiing' },
  ];

  const filteredActivities = useMemo(() => {
    return ACTIVITIES_DATA.filter((act) => {
      if (categoryFilter !== 'all' && act.category !== categoryFilter) return false;
      if (thrillFilter !== 'all' && act.thrillLevel !== thrillFilter) return false;
      if (act.costInr > maxCost) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesDest = act.destinationName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest) return false;
      }
      return true;
    });
  }, [categoryFilter, thrillFilter, maxCost, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              <span>Thrill Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
              Adventure Activities & Sports
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Inspect certified instructor requirements, equipment provided, and live prices across India’s extreme playgrounds.
            </p>
          </div>

          <Link
            to="/plan"
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Trip with Custom Thrills</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-sm">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  categoryFilter === c.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            {/* Search */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Search Activity</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rafting, bungee, scuba..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            {/* Thrill Level */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Thrill Intensity</span>
              <select
                value={thrillFilter}
                onChange={(e) => setThrillFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
              >
                <option value="all">All Levels</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High Adrenaline</option>
                <option value="Extreme">Extreme Risk / Extreme Thrill</option>
              </select>
            </div>

            {/* Max Cost slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Max Cost per Person</span>
                <span className="text-orange-600 font-extrabold">{formatAmount(maxCost)}</span>
              </div>
              <input
                type="range"
                min={800}
                max={5000}
                step={200}
                value={maxCost}
                onChange={(e) => setMaxCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>Showing <strong className="text-slate-800">{filteredActivities.length}</strong> certified adventure thrills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
