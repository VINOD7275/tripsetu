import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Wallet, Sparkles, ArrowRight, Shuffle } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

export const HeroSearchForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentCurrency, convertToInr, formatAmount } = useCurrency();

  const [startingCity, setStartingCity] = useState('New Delhi');
  const [destinationId, setDestinationId] = useState('');
  const [budgetVal, setBudgetVal] = useState(15000);
  const [travelers, setTravelers] = useState(2);
  const [durationDays, setDurationDays] = useState(4);
  const [isSurpriseMe, setIsSurpriseMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetInInr = currentCurrency.code === 'INR' ? budgetVal : convertToInr(budgetVal);

    const queryParams = new URLSearchParams({
      from: startingCity,
      to: isSurpriseMe ? 'surprise' : destinationId,
      budget: budgetInInr.toString(),
      travelers: travelers.toString(),
      days: durationDays.toString(),
    });

    navigate(`/plan?${queryParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/95 backdrop-blur-xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(255,107,53,0.12),0_10px_25px_rgba(0,0,0,0.08)] border border-orange-100 relative z-20 text-slate-800">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Top Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* 1. Starting City */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Starting City</span>
            </label>
            <input
              type="text"
              required
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. New Delhi, Mumbai"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
            />
          </div>

          {/* 2. Destination or Surprise Me */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Destination</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsSurpriseMe(!isSurpriseMe);
                  if (!isSurpriseMe) setDestinationId('');
                }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isSurpriseMe
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {isSurpriseMe ? '✓ Surprise Active' : '🎲 Surprise Me'}
              </button>
            </div>

            {isSurpriseMe ? (
              <div className="w-full px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center justify-between">
                <span>AI Adventure Matcher</span>
                <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            ) : (
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
              >
                <option value="">Any Destination (Within Budget)</option>
                {DESTINATIONS_DATA.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name} ({d.stateCountry}) — From {formatAmount(d.minBudgetInr)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 3. Travelers */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>Travelers</span>
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
              <button
                type="button"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black font-bold text-sm shadow-sm"
              >
                -
              </button>
              <span className="flex-1 text-center text-xs sm:text-sm font-bold text-slate-900">
                {travelers} {travelers === 1 ? 'Solo' : 'People'}
              </span>
              <button
                type="button"
                onClick={() => setTravelers(travelers + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black font-bold text-sm shadow-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* 4. Duration */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Duration</span>
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
            >
              <option value="2">2 Days (Quick Escape)</option>
              <option value="3">3 Days (Long Weekend)</option>
              <option value="4">4 Days (Standard Trip)</option>
              <option value="5">5 Days (Full Adventure)</option>
              <option value="7">7 Days (Week Expedition)</option>
              <option value="10">10 Days (Deep Explorer)</option>
            </select>
          </div>
        </div>

        {/* Budget Slider & Action Bar */}
        <div className="pt-3 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-slate-200">
          
          {/* Slider */}
          <div className="w-full md:max-w-md space-y-1.5 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-700 font-bold">
                <Wallet className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Total Target Budget</span>
              </span>
              <span className="text-base font-black text-[#FF5722]">
                {currentCurrency.symbol}{budgetVal.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={100000}
              step={1000}
              value={budgetVal}
              onChange={(e) => setBudgetVal(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
              <span>{currentCurrency.symbol}3,000 (Backpacker)</span>
              <span>{currentCurrency.symbol}25,000</span>
              <span>{currentCurrency.symbol}100,000+ (Expedition)</span>
            </div>
          </div>

          {/* Quick city presets & Submit */}
          <div className="w-full md:w-auto flex items-center gap-3">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Build My Custom Adventure</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
