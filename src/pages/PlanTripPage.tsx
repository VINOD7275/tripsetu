import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wallet, 
  Train, 
  Plane, 
  Bus, 
  Car, 
  Home, 
  Utensils, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Save, 
  Printer, 
  Copy, 
  Check, 
  Shuffle,
  Info
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { DESTINATIONS_DATA, ACTIVITIES_DATA } from '../data/mockData';
import { Destination, Trip, TripItineraryDay } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { tripTrailApi } from '../lib/supabase';
import { calculateTripBudgetEstimate, generateIntelligentItinerary, BudgetBreakdown } from '../utils/budgetCalculations';

export const PlanTripPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentCurrency, formatAmount } = useCurrency();
  const { user } = useAuth();

  // Multi-step wizard
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [startingCity, setStartingCity] = useState(searchParams.get('from') || 'New Delhi');
  const [destinationSlug, setDestinationSlug] = useState(searchParams.get('destination') || searchParams.get('to') || 'rishikesh');
  const [isSurpriseMe, setIsSurpriseMe] = useState(searchParams.get('to') === 'surprise');
  const [budgetVal, setBudgetVal] = useState<number>(Number(searchParams.get('budget')) || 16000);
  const [startDate, setStartDate] = useState('2026-11-20');
  const [durationDays, setDurationDays] = useState<number>(Number(searchParams.get('days')) || 4);
  const [travelersCount, setTravelersCount] = useState<number>(Number(searchParams.get('travelers')) || 2);
  const [travelGroupType, setTravelGroupType] = useState<'solo' | 'couple' | 'family' | 'friends'>('friends');
  const [comfortLevel, setComfortLevel] = useState<'backpacker' | 'standard' | 'comfort' | 'luxury'>('standard');
  const [travelStyle, setTravelStyle] = useState<'adventure' | 'relaxed' | 'cultural' | 'nature' | 'foodie'>('adventure');
  const [transportMode, setTransportMode] = useState<'train' | 'flight' | 'bus' | 'road_trip'>('train');
  const [accommodationType, setAccommodationType] = useState<'hostel' | 'budget_hotel' | 'boutique' | 'luxury_resort' | 'camping'>('budget_hotel');
  const [dietaryPreference, setDietaryPreference] = useState('mixed');
  const [accessibilityNotes, setAccessibilityNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Generated Plan State
  const [activeDestination, setActiveDestination] = useState<Destination>(DESTINATIONS_DATA[0]);
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown | null>(null);
  const [itineraryDays, setItineraryDays] = useState<TripItineraryDay[]>([]);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  // Handle destination resolution
  useEffect(() => {
    if (isSurpriseMe) {
      const matches = DESTINATIONS_DATA.filter((d: Destination) => d.minBudgetInr <= budgetVal);
      const chosen = matches.length > 0 ? matches[Math.floor(Math.random() * matches.length)] : DESTINATIONS_DATA[0];
      setActiveDestination(chosen);
      setDestinationSlug(chosen.slug);
    } else {
      const match = DESTINATIONS_DATA.find((d: Destination) => d.slug === destinationSlug || d.id === destinationSlug) || DESTINATIONS_DATA[0];
      setActiveDestination(match);
    }
  }, [destinationSlug, isSurpriseMe, budgetVal]);

  // Compute budget & itinerary when user enters step 5
  useEffect(() => {
    if (currentStep === 5 && activeDestination) {
      const breakdown = calculateTripBudgetEstimate(activeDestination, {
        durationDays,
        travelersCount,
        budget: budgetVal,
        transportMode,
        accommodationType,
        comfortLevel,
        selectedActivities
      });
      setBudgetBreakdown(breakdown);

      const generated = generateIntelligentItinerary(
        activeDestination,
        durationDays,
        travelersCount,
        selectedActivities
      );
      setItineraryDays(generated);
      setActiveDayTab(1);
    }
  }, [currentStep, activeDestination, durationDays, travelersCount, budgetVal, transportMode, accommodationType, comfortLevel, selectedActivities]);

  const handleActivityToggle = (actTitle: string) => {
    if (selectedActivities.includes(actTitle)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== actTitle));
    } else {
      setSelectedActivities([...selectedActivities, actTitle]);
    }
  };

  const handleSaveTrip = async () => {
    if (!budgetBreakdown) return;

    const newTrip: Trip = {
      id: 'trip-' + Math.random().toString(36).substring(2, 9),
      userId: user?.id || 'guest-traveler',
      title: `${activeDestination.name} Adventure Expedition`,
      destinationId: activeDestination.id,
      destinationName: activeDestination.name,
      destinationImage: activeDestination.imageUrl,
      startDate,
      endDate: new Date(new Date(startDate).getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      durationDays,
      startingCity,
      travelersCount,
      travelGroupType,
      totalBudget: budgetVal,
      currency: currentCurrency.code,
      comfortLevel,
      travelStyle,
      transportMode,
      accommodationType,
      dietaryPreference,
      accessibilityNotes,
      estimatedCosts: {
        transport: budgetBreakdown.transport,
        stay: budgetBreakdown.stay,
        food: budgetBreakdown.food,
        activities: budgetBreakdown.activities,
        buffer: budgetBreakdown.buffer,
        total: budgetBreakdown.total,
      },
      actualTotalCost: 0,
      status: 'planning',
      itinerary: itineraryDays,
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await tripTrailApi.saveTrip(newTrip);
    setIsSaved(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pieData = budgetBreakdown ? [
    { name: 'Transport', value: budgetBreakdown.transport, color: '#FF5722' },
    { name: 'Stay', value: budgetBreakdown.stay, color: '#10B981' },
    { name: 'Food', value: budgetBreakdown.food, color: '#0EA5E9' },
    { name: 'Activities', value: budgetBreakdown.activities, color: '#F59E0B' },
    { name: 'Buffer (10%)', value: budgetBreakdown.buffer, color: '#8B5CF6' },
  ] : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Step Navigation Progress Bar */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Step {currentStep} of 5
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-1.5">
                {currentStep === 1 && 'Where & When are you exploring?'}
                {currentStep === 2 && 'Who is traveling & What is your style?'}
                {currentStep === 3 && 'Transit, Stays & Dietary Choices'}
                {currentStep === 4 && 'Pick Your Adrenaline Thrills'}
                {currentStep === 5 && 'Your Verified Custom Adventure Plan'}
              </h1>
            </div>
            {currentStep < 5 && (
              <span className="text-xs text-slate-500 hidden sm:inline font-semibold">
                Real-time Budget: <strong className="text-[#FF5722] text-sm font-black">{formatAmount(budgetVal)}</strong>
              </span>
            )}
          </div>

          {/* Progress bar line */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex-1 h-full transition-colors ${
                  step <= currentStep ? 'bg-[#FF6B35]' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: DESTINATION & DATES */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Starting City */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span>Starting Location</span>
                </label>
                <input
                  type="text"
                  required
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  placeholder="e.g. New Delhi, Mumbai, Bangalore"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#FF6B35] focus:bg-white font-medium"
                />
              </div>

              {/* Destination Preference */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Destination</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSurpriseMe(!isSurpriseMe)}
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                      isSurpriseMe ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {isSurpriseMe ? '✓ Surprise Active' : '🎲 Surprise Me Based on Budget'}
                  </button>
                </div>

                {isSurpriseMe ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between">
                    <span>TripTrail will pick the best thrill within {formatAmount(budgetVal)}</span>
                    <Shuffle className="w-4 h-4 text-emerald-600" />
                  </div>
                ) : (
                  <select
                    value={destinationSlug}
                    onChange={(e) => setDestinationSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6B35] focus:bg-white"
                  >
                    {DESTINATIONS_DATA.map((d: Destination) => (
                      <option key={d.id} value={d.slug}>
                        {d.name} ({d.stateCountry}) — Min {formatAmount(d.minBudgetInr)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Departure Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Departure Date</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#FF6B35] focus:bg-white font-medium"
                />
              </div>

              {/* Trip Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Trip Duration</span>
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6B35] focus:bg-white"
                >
                  <option value="2">2 Days (Quick Escape)</option>
                  <option value="3">3 Days (Long Weekend)</option>
                  <option value="4">4 Days (Standard Trip)</option>
                  <option value="5">5 Days (Full Adventure)</option>
                  <option value="6">6 Days (Extended)</option>
                  <option value="7">7 Days (Week Expedition)</option>
                  <option value="10">10 Days (Deep Mountain Explorer)</option>
                </select>
              </div>

              {/* Target Budget Slider */}
              <div className="sm:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-[#FF6B35]" />
                    <span>Total Available Budget</span>
                  </span>
                  <span className="text-xl font-black text-[#FF5722]">
                    {formatAmount(budgetVal)}
                  </span>
                </div>
                <input
                  type="range"
                  min={4000}
                  max={80000}
                  step={1000}
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>{formatAmount(4000)} (Weekend Camp)</span>
                  <span>{formatAmount(80000)}+ (International/Expedition)</span>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <span>Continue to Travelers & Style</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: TRAVELERS & STYLE */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl"
          >
            {/* Travelers count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Number of Travelers
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTravelersCount(num)}
                    className={`flex-1 py-3 rounded-2xl text-xs sm:text-sm font-black border transition-all ${
                      travelersCount === num
                        ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {num === 1 ? '1 (Solo)' : `${num} People`}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Group Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Group Dynamics
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'solo', label: 'Solo Backpacker', icon: '🎒' },
                  { id: 'couple', label: 'Couple Escape', icon: '💑' },
                  { id: 'friends', label: 'Friends Squad', icon: '🏕️' },
                  { id: 'family', label: 'Family Trip', icon: '👨‍👩‍👧‍👦' },
                ].map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setTravelGroupType(grp.id as any)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      travelGroupType === grp.id
                        ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{grp.icon}</span>
                    <span className="text-xs font-bold">{grp.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comfort Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Comfort Level Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'backpacker', label: 'Backpacker', sub: 'Shared dorms & local buses', mult: '₹ Save 25%' },
                  { id: 'standard', label: 'Standard', sub: 'Comfortable private rooms & trains', mult: 'Balanced' },
                  { id: 'comfort', label: 'Comfort Plus', sub: 'Boutique stays & AC cabs', mult: '+20% Comfort' },
                  { id: 'luxury', label: 'Luxury Retreat', sub: 'High-end eco resorts & flights', mult: 'Premium' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setComfortLevel(tier.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      comfortLevel === tier.id
                        ? 'bg-orange-50 border-orange-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-black block text-slate-900">{tier.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{tier.sub}</span>
                    <span className="text-[9px] font-bold text-emerald-700 mt-2 block">{tier.mult}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Primary Vibe
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'adventure', label: 'High Adrenaline & Thrills' },
                  { id: 'nature', label: 'Scenic Nature & Lakes' },
                  { id: 'relaxed', label: 'Chill & Cafe Hopping' },
                  { id: 'cultural', label: 'Monasteries & Heritage' },
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setTravelStyle(style.id as any)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                      travelStyle === style.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <span>Continue to Transit & Stay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: TRANSIT & STAYS */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl"
          >
            {/* Transportation Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Preferred Mode of Transport
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'train', label: 'Express Train', desc: 'Jan Shatabdi / Rajdhani', icon: Train },
                  { id: 'bus', label: 'AC Sleeper Bus', desc: 'Volvo / UTC Semi-Sleeper', icon: Bus },
                  { id: 'flight', label: 'Domestic Flight', desc: 'Fastest connection', icon: Plane },
                  { id: 'road_trip', label: 'Self Drive / Bike', desc: 'Highway freedom', icon: Car },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTransportMode(item.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        transportMode === item.id
                          ? 'bg-orange-50 border-orange-400 text-slate-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#FF6B35] mb-2" />
                      <span className="text-xs font-black block text-slate-900">{item.label}</span>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accommodation Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Base Camp & Accommodation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'hostel', label: 'Backpacker Bunk', desc: 'Social vibes & WiFi (Zostel/Hosteller)' },
                  { id: 'camping', label: 'Riverside Dome Camp', desc: 'Bonfires, starry skies & tents' },
                  { id: 'budget_hotel', label: 'Budget Mountain Hotel', desc: 'Clean private room with view' },
                  { id: 'boutique', label: 'Eco Bamboo Cottage', desc: 'Tranquil natural architecture' },
                  { id: 'luxury_resort', label: 'Premium Alpine Resort', desc: 'Full-service mountain luxury' },
                ].map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => setAccommodationType(acc.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      accommodationType === acc.id
                        ? 'bg-emerald-50 border-emerald-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-black block text-slate-900">{acc.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{acc.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Preference & Accessibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Dietary Preferences
                </label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="mixed">Mixed (Local specialties & Veg/Non-Veg)</option>
                  <option value="pure_veg">Strict Vegetarian</option>
                  <option value="vegan">Vegan / Plant Based</option>
                  <option value="jain">Jain Friendly</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Accessibility / Medical Notes (Optional)
                </label>
                <input
                  type="text"
                  value={accessibilityNotes}
                  onChange={(e) => setAccessibilityNotes(e.target.value)}
                  placeholder="e.g. Asthma, Knee pain, Beginner swimmer"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <span>Continue to Thrill Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: THRILL SELECTION */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl"
          >
            <div>
              <h2 className="text-xl font-black text-slate-900 font-heading">
                Select Your Adrenaline Thrills in {activeDestination.name}
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Choose the activities you wish to schedule into your personalized itinerary. All items feature verified certified guides.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeDestination.adventureActivities.map((act: string) => {
                const isSelected = selectedActivities.includes(act);
                const matchActivity = ACTIVITIES_DATA.find((a: any) => a.title.includes(act) || act.includes(a.category));
                const cost = matchActivity ? matchActivity.costInr : 1500;

                return (
                  <div
                    key={act}
                    onClick={() => handleActivityToggle(act)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 shadow-sm ${
                      isSelected
                        ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-[#FF6B35] text-white' : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {isSelected ? '✓' : '+'}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 font-heading">{act}</h4>
                        <span className="text-[10px] text-emerald-700 font-semibold">Certified instructor included</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#FF5722]">
                      ~{formatAmount(cost)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Verified Adventure Itinerary</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: GENERATED ITINERARY & BUDGET FORECAST */}
        {currentStep === 5 && budgetBreakdown && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Alert: Budget Status & Alternatives */}
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
              budgetBreakdown.budgetStatus === 'under'
                ? 'bg-emerald-50 border-emerald-300'
                : budgetBreakdown.budgetStatus === 'over'
                ? 'bg-amber-50 border-amber-300'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                {budgetBreakdown.budgetStatus === 'under' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {budgetBreakdown.budgetStatus === 'under'
                      ? `Great News! You are ${formatAmount(budgetBreakdown.differenceFromTarget)} Under Budget!`
                      : `Heads Up: This Expedition Exceeds Your Target by ${formatAmount(budgetBreakdown.differenceFromTarget)}`}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {budgetBreakdown.budgetStatus === 'under'
                      ? `Your estimated total of ${formatAmount(budgetBreakdown.total)} fits comfortably within your ${formatAmount(budgetVal)} budget.`
                      : `Recommended: Switch to a budget hostel, travel via train/bus, or consider the alternative destinations below.`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  onClick={handlePrint}
                  className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 shadow-sm"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 shadow-sm"
                  title="Copy Share Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSaveTrip}
                  disabled={isSaved}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white shadow-orange-500/25 hover:brightness-110'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaved ? '✓ Saved to My Trips' : 'Save Trip'}</span>
                </button>
              </div>
            </div>

            {/* Over-budget alternatives if applicable */}
            {budgetBreakdown.budgetStatus === 'over' && budgetBreakdown.alternatives.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-lg">
                <p className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Affordable Alternative Destinations Within Your {formatAmount(budgetVal)} Budget:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {budgetBreakdown.alternatives.map((alt: Destination) => (
                    <div
                      key={alt.id}
                      onClick={() => {
                        setDestinationSlug(alt.slug);
                        setIsSaved(false);
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 cursor-pointer transition-all flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{alt.name}</h4>
                        <span className="text-[10px] text-slate-500 font-semibold">{alt.stateCountry}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-700">{formatAmount(alt.minBudgetInr)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Budget Breakdown (Recharts) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF6B35]">
                  Detailed Cost Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                  Estimated Total: {formatAmount(budgetBreakdown.total)}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Approx. <strong className="text-slate-900 font-bold">{formatAmount(budgetBreakdown.perPerson)}</strong> per person for {travelersCount} travelers across {durationDays} days.
                </p>

                {/* Line Item Breakdown */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Transportation ({transportMode}):</span>
                    <strong className="text-slate-900">{formatAmount(budgetBreakdown.transport)}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Base Camp & Stays ({accommodationType.replace('_', ' ')}):</span>
                    <strong className="text-slate-900">{formatAmount(budgetBreakdown.stay)}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Meals & Regional Dining:</span>
                    <strong className="text-slate-900">{formatAmount(budgetBreakdown.food)}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Adventure Activities:</span>
                    <strong className="text-slate-900">{formatAmount(budgetBreakdown.activities)}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <span>Emergency Contingency Buffer (10%):</span>
                    <strong>{formatAmount(budgetBreakdown.buffer)}</strong>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="lg:col-span-7 h-64 w-full flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${formatAmount(Number(val))}`, 'Cost']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '1rem', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Day-by-Day Customized Itinerary */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-heading">
                    Day-by-Day Expedition Schedule
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Morning, afternoon, evening activities and local dining recommendations.
                  </p>
                </div>

                {/* Day Tabs */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  {itineraryDays.map((day) => (
                    <button
                      key={day.dayNumber}
                      onClick={() => setActiveDayTab(day.dayNumber)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                        activeDayTab === day.dayNumber
                          ? 'bg-[#FF6B35] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Day {day.dayNumber}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Day Content */}
              {itineraryDays.filter((d) => d.dayNumber === activeDayTab).map((day) => (
                <div key={day.id} className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#FF5722]">
                        {day.theme}
                      </span>
                      <h4 className="text-base font-black text-slate-900 font-heading mt-0.5">
                        {day.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Day Spend</span>
                      <p className="text-sm font-black text-[#FF5722]">{formatAmount(day.dayBudgetInr)}</p>
                    </div>
                  </div>

                  {/* Hourly Schedule */}
                  <div className="space-y-3">
                    {day.schedule.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-sm">
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-[11px] font-mono text-[#FF5722] font-black shrink-0">
                            {item.time}
                          </span>
                          <div>
                            <h5 className="text-sm font-black text-slate-900">{item.title}</h5>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{item.description}</p>
                            {item.tip && (
                              <p className="text-[11px] text-emerald-800 font-bold mt-1.5 flex items-center gap-1">
                                <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>Tip: {item.tip}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        {item.estimatedCostInr > 0 && (
                          <span className="text-xs font-black text-slate-800 sm:shrink-0 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl self-end sm:self-auto">
                            {formatAmount(item.estimatedCostInr)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Meals & Stays Note */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                      <p className="font-black text-amber-900 flex items-center gap-1.5 mb-1.5">
                        <Utensils className="w-4 h-4 text-amber-600" />
                        <span>Day Dining Guide</span>
                      </p>
                      <p className="text-slate-700 font-medium"><strong>Breakfast:</strong> {day.meals.breakfast}</p>
                      <p className="text-slate-700 font-medium mt-0.5"><strong>Lunch:</strong> {day.meals.lunch}</p>
                      <p className="text-slate-700 font-medium mt-0.5"><strong>Dinner:</strong> {day.meals.dinner}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                      <p className="font-black text-emerald-900 flex items-center gap-1.5 mb-1.5">
                        <Home className="w-4 h-4 text-emerald-600" />
                        <span>Base Camp Night Stay</span>
                      </p>
                      <p className="text-slate-700 font-medium">{day.stayNotes}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">Confirmed booking details sent to registered email.</p>
                    </div>
                  </div>

                </div>
              ))}

            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Adjust Thrills</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/my-trips')}
                  className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-black text-xs rounded-2xl shadow-sm"
                >
                  View in My Trips Dashboard
                </button>
                <button
                  onClick={handleSaveTrip}
                  disabled={isSaved}
                  className={`px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-md ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white shadow-orange-500/25 hover:brightness-110'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaved ? 'Trip Saved to Supabase Database' : 'Save & Confirm Itinerary'}</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};
