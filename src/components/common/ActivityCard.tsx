import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Clock, Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { Activity } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface ActivityCardProps {
  activity: Activity;
  onSelect?: (activity: Activity) => void;
  isSelected?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onSelect, isSelected }) => {
  const { formatAmount } = useCurrency();

  const getThrillBadge = (level: string) => {
    switch (level) {
      case 'Mild':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'High':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Extreme':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col rounded-3xl bg-white border overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all ${
        isSelected
          ? 'border-[#FF6B35] ring-2 ring-[#FF6B35]/30 shadow-orange-500/15'
          : 'border-slate-200/90 hover:border-orange-300 hover:shadow-[0_16px_30px_-8px_rgba(255,107,53,0.12)]'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 card-image-overlay-light pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 shadow-sm">
            {activity.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md flex items-center gap-1 shadow-sm ${getThrillBadge(activity.thrillLevel)}`}>
            <Flame className="w-3 h-3" />
            <span>{activity.thrillLevel} Thrill</span>
          </span>
        </div>

        {/* Bottom image overlay: Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{activity.durationHours} Hours</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-orange-200 shadow-md">
            <span className="text-sm font-black text-[#FF5722]">
              {formatAmount(activity.costInr)}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold"> /person</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1 font-semibold">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
              <span className="truncate">{activity.destinationName}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 text-xs shrink-0 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{activity.rating}</span>
              <span className="text-slate-400 font-normal">({activity.reviewsCount})</span>
            </div>
          </div>

          <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#FF6B35] transition-colors font-heading line-clamp-2">
            {activity.title}
          </h4>
        </div>

        {/* Gear info */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span>Certified Safety & Guides Included</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {activity.gearProvided.slice(0, 2).map((gear) => (
              <span key={gear} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 font-medium">
                ✓ {gear}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="pt-2">
          {onSelect ? (
            <button
              onClick={() => onSelect(activity)}
              className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-[#FF6B35] hover:text-white text-slate-700'
              }`}
            >
              {isSelected ? '✓ Activity Added' : '+ Add to Itinerary'}
            </button>
          ) : (
            <Link
              to={`/plan?destination=${activity.destinationName}&activity=${activity.slug}`}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-[#FF6B35] text-slate-800 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <span>Book in Custom Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
