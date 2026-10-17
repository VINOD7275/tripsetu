import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Destination } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { formatAmount } = useCurrency();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Challenging':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Extreme':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_35px_-10px_rgba(255,107,53,0.16)] hover:border-[#FF6B35]/40 transition-all"
    >
      {/* Image & Top Overlays */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 card-image-overlay-light pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 shadow-sm">
            {destination.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${getDifficultyColor(destination.difficultyLevel)}`}>
            {destination.difficultyLevel}
          </span>
        </div>

        {/* Bottom overlay in image: Days & Budget Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{destination.recommendedDurationDays} Days Ideal</span>
          </div>

          <div className="text-right bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl border border-orange-200 shadow-md">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">From Approx</p>
            <p className="text-sm font-black text-[#FF5722]">
              {formatAmount(destination.minBudgetInr)}
            </p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
            <span className="truncate">{destination.stateCountry}</span>
            {destination.isInternational && (
              <span className="ml-1 text-[9px] font-extrabold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-full border border-sky-200">
                INTL
              </span>
            )}
          </div>

          <h3 className="text-lg font-black text-slate-900 group-hover:text-[#FF6B35] transition-colors font-heading tracking-tight">
            {destination.name}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>
        </div>

        {/* Adventure Activity Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {destination.adventureActivities.slice(0, 3).map((act) => (
            <span
              key={act}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
            >
              {act}
            </span>
          ))}
          {destination.adventureActivities.length > 3 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-lg bg-orange-50 text-orange-700 border border-orange-200">
              +{destination.adventureActivities.length - 3}
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            <span>Avg/Day: </span>
            <strong className="text-slate-800">{formatAmount(destination.avgCostPerDayInr)}</strong>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/destinations/${destination.slug}`}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              title="View destination details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to={`/plan?destination=${destination.slug}`}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 hover:brightness-110 transition-all flex items-center gap-1"
            >
              <span>Plan Trip</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
