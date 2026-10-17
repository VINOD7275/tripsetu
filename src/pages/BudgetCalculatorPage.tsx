import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Wallet, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { DESTINATIONS_DATA } from '../data/mockData';
import { useCurrency } from '../context/CurrencyContext';
import { DestinationCard } from '../components/common/DestinationCard';

export const BudgetCalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCurrency, formatAmount } = useCurrency();

  // Inputs
  const [travelers, setTravelers] = useState<number>(2);
  const [days, setDays] = useState<number>(4);
  const [comfortLevel, setComfortLevel] = useState<'backpacker' | 'standard' | 'comfort' | 'luxury'>('standard');
  const [transportMode, setTransportMode] = useState<'train' | 'bus' | 'flight' | 'road_trip'>('train');
  const [thrillIntensity, setThrillIntensity] = useState<'mild' | 'moderate' | 'extreme'>('moderate');

  // Math models
  let baseTransportPerPerson = 1200;
  if (transportMode === 'bus') baseTransportPerPerson = 850;
  if (transportMode === 'flight') baseTransportPerPerson = 5500;
  if (transportMode === 'road_trip') baseTransportPerPerson = 1800;

  let baseStayPerNight = 800;
  if (comfortLevel === 'backpacker') baseStayPerNight = 550;
  if (comfortLevel === 'comfort') baseStayPerNight = 2200;
  if (comfortLevel === 'luxury') baseStayPerNight = 4500;

  let baseFoodPerDay = 600;
  if (comfortLevel === 'backpacker') baseFoodPerDay = 450;
  if (comfortLevel === 'comfort') baseFoodPerDay = 900;
  if (comfortLevel === 'luxury') baseFoodPerDay = 1500;

  let baseActivityPerDay = 800;
  if (thrillIntensity === 'mild') baseActivityPerDay = 400;
  if (thrillIntensity === 'extreme') baseActivityPerDay = 1800;

  const totalTransport = baseTransportPerPerson * travelers;
  const totalStay = baseStayPerNight * Math.ceil(travelers / (comfortLevel === 'backpacker' ? 1 : 2)) * Math.max(1, days - 1);
  const totalFood = baseFoodPerDay * travelers * days;
  const totalActivities = baseActivityPerDay * travelers * days;

  const subtotal = totalTransport + totalStay + totalFood + totalActivities;
  const buffer = Math.round(subtotal * 0.1);
  const totalCost = subtotal + buffer;
  const perPerson = Math.round(totalCost / travelers);

  // Data for Recharts Pie
  const categoryData = [
    { name: 'Transport & Transit', value: totalTransport, color: '#FF5722' },
    { name: 'Base Camps & Stays', value: totalStay, color: '#10B981' },
    { name: 'Food & Mountain Dining', value: totalFood, color: '#0EA5E9' },
    { name: 'Adventure Activities', value: totalActivities, color: '#F59E0B' },
    { name: 'Emergency Contingency', value: buffer, color: '#8B5CF6' },
  ];

  // Daily Spending curve data for BarChart
  const dailySpendData = Array.from({ length: days }).map((_, idx) => {
    const dayNum = idx + 1;
    const isFirst = dayNum === 1;
    const isLast = dayNum === days;
    let dayAmount = Math.round((totalStay / Math.max(1, days - 1)) + (totalFood / days) + (totalActivities / days));
    if (isFirst) dayAmount += Math.round(totalTransport / 2);
    if (isLast) dayAmount += Math.round(totalTransport / 2);

    return {
      day: `Day ${dayNum}`,
      amount: dayAmount,
    };
  });

  const matchingDestinations = DESTINATIONS_DATA.filter((d) => d.minBudgetInr <= totalCost).slice(0, 3);

  const handleStartPlanning = () => {
    navigate(`/plan?budget=${totalCost}&travelers=${travelers}&days=${days}`);
  };

  const budgetHacks = [
    {
      title: 'Book Tatkal & Shatabdi 24h Ahead',
      tip: 'Trains offer 70% cheaper transit than last-minute flights with zero luggage surcharge for trekking rucksacks.'
    },
    {
      title: 'Shared Sumos vs Private Cabs',
      tip: 'In Himachal, Ladakh, and Meghalaya, shared sumos at regional stands cost ₹120-₹400 vs ₹3,000 for private taxis.'
    },
    {
      title: 'Hostel Dorms with Kitchens',
      tip: 'Preparing your own morning oats and tea saves ₹300/day per person while connecting you to fellow trek partners.'
    },
    {
      title: 'Rent Gear Locally, Don’t Buy',
      tip: 'High-altitude down jackets, crampons, and sleeping bags rent for ₹150-₹250/day in Old Manali and Tapovan.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Precision Adventure Cost Estimator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
            How Much Will Your Trip Really Cost?
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Configure travelers, duration, transport, and adventure intensity to see verified daily costs and instant breakdown charts.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Controls (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
            <h2 className="text-lg font-black text-slate-900 font-heading flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#FF6B35]" />
              <span>Configure Trip Parameters</span>
            </h2>

            {/* Travelers slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Number of Travelers</span>
                <span className="text-[#FF5722] text-sm font-black">{travelers} {travelers === 1 ? 'Solo' : 'People'}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
            </div>

            {/* Duration slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Duration in Days</span>
                <span className="text-[#FF5722] text-sm font-black">{days} Days / {days - 1} Nights</span>
              </div>
              <input
                type="range"
                min={2}
                max={14}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
            </div>

            {/* Comfort Level Tier */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Comfort Level</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'backpacker', label: 'Backpacker', sub: 'Hostels / Bunks' },
                  { id: 'standard', label: 'Standard', sub: 'Clean Rooms' },
                  { id: 'comfort', label: 'Comfort Plus', sub: 'Boutique Cottages' },
                  { id: 'luxury', label: 'Luxury Retreat', sub: 'Resorts & Glamping' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setComfortLevel(tier.id as any)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      comfortLevel === tier.id
                        ? 'bg-orange-50 border-orange-400 text-slate-900 font-bold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold">{tier.label}</span>
                    <span className="block text-[10px] text-slate-500 font-medium">{tier.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transport choice */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Transportation Mode</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'train', label: 'Train Express' },
                  { id: 'bus', label: 'AC Volvo Bus' },
                  { id: 'flight', label: 'Domestic Flight' },
                  { id: 'road_trip', label: 'Self Drive / Bike' },
                ].map((trans) => (
                  <button
                    key={trans.id}
                    type="button"
                    onClick={() => setTransportMode(trans.id as any)}
                    className={`p-2.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                      transportMode === trans.id
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {trans.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Thrill intensity */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">Adventure Thrill Frequency</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mild', label: 'Mild (1-2 walks)' },
                  { id: 'moderate', label: 'Active (Raft/Trek)' },
                  { id: 'extreme', label: 'Extreme (Bungee)' },
                ].map((thrill) => (
                  <button
                    key={thrill.id}
                    type="button"
                    onClick={() => setThrillIntensity(thrill.id as any)}
                    className={`p-2.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                      thrillIntensity === thrill.id
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {thrill.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartPlanning}
              className="w-full py-4 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Build Complete Itinerary with This Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Visual Breakdown & Graphs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Big Total Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-500 via-[#FF6B35] to-[#FA541C] text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-orange-100">
                  Calculated Complete Trip Cost
                </span>
                <p className="text-3xl sm:text-5xl font-black text-white font-heading mt-1">
                  {formatAmount(totalCost)}
                </p>
                <p className="text-xs text-orange-100 mt-1 font-semibold">
                  Approx. <strong>{formatAmount(perPerson)}</strong> per person for {travelers} travelers.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-right sm:shrink-0">
                <span className="text-[10px] text-white font-bold block uppercase">Includes</span>
                <span className="text-xs font-black text-white">10% Emergency Buffer</span>
                <span className="block text-[10px] text-orange-100 font-bold">{formatAmount(buffer)}</span>
              </div>
            </div>

            {/* Recharts Pie Chart (Cost Distribution) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Cost Allocation Architecture
              </h3>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${formatAmount(Number(val))}`, 'Cost']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '1rem', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: '600' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Quick line details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                {categoryData.slice(0, 4).map((c) => (
                  <div key={c.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block truncate">{c.name.split(' ')[0]}</span>
                    <strong className="text-xs text-slate-900 font-black">{formatAmount(c.value)}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Recharts Bar Chart (Daily Spend Curve) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Daily Expenditure Curve
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Notice how Day 1 and Day {days} account for arrival/departure transit, while middle days center on activities and dining.
              </p>

              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpendData}>
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `${currentCurrency.symbol}${v}`} />
                    <Tooltip
                      formatter={(val: any) => [`${formatAmount(Number(val))}`, 'Estimated Spend']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '1rem', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="amount" fill="#FF6B35" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

        {/* Matching Destinations within this budget */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Destinations You Can Travel to with {formatAmount(totalCost)}
              </h2>
              <p className="text-xs text-slate-500 font-medium">These destinations fall comfortably within your calculated budget.</p>
            </div>
            <Link to="/destinations" className="text-xs font-bold text-[#FF5722] hover:text-orange-700 flex items-center gap-1">
              <span>View all destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>

        {/* TripTrail Budget Hacks Masterclass */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-black text-slate-900 font-heading">
              TripTrail Verified Budget Hacks
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgetHacks.map((hack, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{hack.title}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-5 font-medium">
                  {hack.tip}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
