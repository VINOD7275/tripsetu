import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  SlidersHorizontal, 
  Map as MapIcon, 
  Grid, 
  RotateCcw, 
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/mockData';
import { DestinationCard } from '../components/common/DestinationCard';
import { AdventureMap } from '../components/common/AdventureMap';
import { useCurrency } from '../context/CurrencyContext';

export const DestinationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { formatAmount } = useCurrency();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [maxBudget, setMaxBudget] = useState<number>(Number(searchParams.get('maxBudget')) || 60000);
  const [isInternationalOnly, setIsInternationalOnly] = useState<boolean>(searchParams.get('intl') === 'true');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'affordability' | 'popularity' | 'duration'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Terrains' },
    { id: 'mountains', label: 'Mountains & Peaks' },
    { id: 'beaches', label: 'Beaches & Oceans' },
    { id: 'forests', label: 'Rainforests & Falls' },
    { id: 'deserts', label: 'Deserts & Valleys' },
    { id: 'islands', label: 'Islands & Reefs' },
  ];

  // Filtering & Sorting
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((dest) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesCountry = dest.stateCountry.toLowerCase().includes(query);
        const matchesActivity = dest.adventureActivities.some((a) => a.toLowerCase().includes(query));
        if (!matchesName && !matchesCountry && !matchesActivity) return false;
      }

      // Category
      if (selectedCategory !== 'all' && dest.category !== selectedCategory) {
        return false;
      }

      // Budget
      if (dest.minBudgetInr > maxBudget) {
        return false;
      }

      // Domestic vs International
      if (isInternationalOnly && !dest.isInternational) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && dest.difficultyLevel !== selectedDifficulty) {
        return false;
      }

      // Activity
      if (selectedActivity !== 'all') {
        const hasActivity = dest.adventureActivities.some((a) =>
          a.toLowerCase().includes(selectedActivity.toLowerCase())
        );
        if (!hasActivity) return false;
      }

      // Duration
      if (durationFilter === 'short' && dest.recommendedDurationDays > 3) return false;
      if (durationFilter === 'medium' && (dest.recommendedDurationDays < 4 || dest.recommendedDurationDays > 5)) return false;
      if (durationFilter === 'long' && dest.recommendedDurationDays < 6) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'affordability') return a.minBudgetInr - b.minBudgetInr;
      if (sortBy === 'duration') return a.recommendedDurationDays - b.recommendedDurationDays;
      return b.popularityScore - a.popularityScore;
    });
  }, [
    searchQuery,
    selectedCategory,
    maxBudget,
    isInternationalOnly,
    selectedDifficulty,
    selectedActivity,
    durationFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxBudget(60000);
    setIsInternationalOnly(false);
    setSelectedDifficulty('all');
    setSelectedActivity('all');
    setDurationFilter('all');
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Destination Explorer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
              Discover Verified Adventures
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-xl font-medium">
              Filter by your exact bank balance, preferred terrain, and extreme thrills across India and the globe.
            </p>
          </div>

          {/* Grid vs Map View Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-[#FF6B35] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'map' ? 'bg-[#FF6B35] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination name, state/country, or activity (e.g. Manali, Scuba, Bali)..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] shadow-sm transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF6B35]" />
            <span>{showFiltersMobile ? 'Hide Filters' : 'Refine Filters'}</span>
          </button>
        </div>

        {/* Filter Panel (Desktop Always, Mobile Collapsible) */}
        <div className={`${showFiltersMobile ? 'block' : 'hidden sm:block'} p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-lg`}>
          
          {/* Row 1: Terrains */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Landscape & Terrain
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                    selectedCategory === c.id
                      ? 'bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white shadow-md shadow-orange-500/25'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Budget Slider + Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
            
            {/* Budget Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Max Budget Cap</span>
                <span className="font-black text-[#FF5722] text-sm">{formatAmount(maxBudget)}</span>
              </div>
              <input
                type="range"
                min={4500}
                max={70000}
                step={2500}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>{formatAmount(4500)}</span>
                <span>{formatAmount(70000)}+</span>
              </div>
            </div>

            {/* Duration Filter */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Trip Duration</span>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="all">Any Duration</option>
                <option value="short">Quick Weekend (2-3 Days)</option>
                <option value="medium">Standard Trip (4-5 Days)</option>
                <option value="long">Deep Expedition (6+ Days)</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Difficulty Level</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy (Family / Leisure)</option>
                <option value="Moderate">Moderate (Active)</option>
                <option value="Challenging">Challenging (High Altitude)</option>
                <option value="Extreme">Extreme (Pro Mountaineering)</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="popularity">Most Popular First</option>
                <option value="affordability">Affordability (Low to High)</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>
          </div>

          {/* Row 3: Domestic/International Toggle & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={isInternationalOnly}
                onChange={(e) => setIsInternationalOnly(e.target.checked)}
                className="rounded bg-slate-100 border-slate-300 text-[#FF6B35] focus:ring-0 w-4 h-4"
              />
              <span>Show International destinations only (Bali, Vietnam, etc.)</span>
            </label>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>

        {/* Results Count bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>Found <strong className="text-slate-900 font-black">{filteredDestinations.length}</strong> matching destinations</span>
          <span>Prices verified for {new Date().getFullYear()}</span>
        </div>

        {/* Content View: Grid or Map */}
        {viewMode === 'map' ? (
          <div className="space-y-4">
            <AdventureMap
              destinations={filteredDestinations}
              className="h-[600px] w-full rounded-3xl"
            />
            <p className="text-center text-xs font-medium text-slate-500">
              Click on any orange adventure pin on the map to preview destination info, pricing, and itinerary routes.
            </p>
          </div>
        ) : (
          <div>
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 p-8 rounded-3xl bg-white border border-slate-200 space-y-4 max-w-md mx-auto shadow-sm">
                <Compass className="w-12 h-12 text-[#FF6B35] mx-auto opacity-70" />
                <h3 className="text-lg font-bold text-slate-900">No destinations found</h3>
                <p className="text-xs text-slate-500">
                  Try broadening your budget cap or resetting filters to view more adventure locations.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
