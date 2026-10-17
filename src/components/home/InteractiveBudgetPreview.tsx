import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Calculator, ArrowRight, DollarSign } from 'lucide-react';
import { DESTINATIONS_DATA } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

export const InteractiveBudgetPreview: React.FC = () => {
  const { currentCurrency, formatAmount } = useCurrency();

  const [budgetVal, setBudgetVal] = useState(18000);
  const [durationDays, setDurationDays] = useState(4);
  const [travelers, setTravelers] = useState(2);

  // Dynamic cost allocation percentages
  const transportCost = Math.round(budgetVal * 0.28);
  const stayCost = Math.round(budgetVal * 0.26);
  const foodCost = Math.round(budgetVal * 0.20);
  const activitiesCost = Math.round(budgetVal * 0.16);
  const bufferCost = Math.round(budgetVal * 0.10);

  const chartData = [
    { name: 'Transport & Transit', value: transportCost, color: '#FF5722' },
    { name: 'Stays & Camps', value: stayCost, color: '#10B981' },
    { name: 'Food & Dining', value: foodCost, color: '#0EA5E9' },
    { name: 'Adventure Thrills', value: activitiesCost, color: '#F59E0B' },
    { name: 'Emergency Buffer', value: bufferCost, color: '#8B5CF6' },
  ];

  const matchingDestinations = DESTINATIONS_DATA.filter(
    (d) => d.minBudgetInr <= budgetVal
  ).slice(0, 3);

  const perPerson = Math.round(budgetVal / travelers);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50/30 relative overflow-hidden">
      {/* Background radial colorful glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Budget Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            See Exactly Where Every Penny Goes
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-medium">
            Slide your target budget to observe how TripTrail automatically balances transit, base camps, mountain meals, and adrenaline activities.
          </p>
        </div>

        {/* Interactive Workspace Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          
          {/* Left Column: Sliders & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Budget Slider */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Total Adventure Budget
                </span>
                <span className="text-xl font-black text-[#FF5722]">
                  {formatAmount(budgetVal)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={60000}
                step={1000}
                value={budgetVal}
                onChange={(e) => setBudgetVal(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>{formatAmount(5000)} (Solo Weekend)</span>
                <span>{formatAmount(60000)} (Multi-Day)</span>
              </div>
            </div>

            {/* Travelers & Days Controls */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Travelers
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{travelers} People</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black flex items-center justify-center font-bold text-xs shadow-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black flex items-center justify-center font-bold text-xs shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Duration
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{durationDays} Days</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setDurationDays(Math.max(2, durationDays - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black flex items-center justify-center font-bold text-xs shadow-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setDurationDays(durationDays + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-black flex items-center justify-center font-bold text-xs shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Per Person Stat */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider">Estimated Cost Per Traveler</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">
                  {formatAmount(perPerson)}
                </p>
              </div>
              <span className="text-[10px] text-emerald-800 font-bold bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                Includes 10% buffer
              </span>
            </div>

            {/* Quick Destinations matched */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Eligible Destinations for This Budget ({matchingDestinations.length}+):
              </p>
              <div className="flex flex-wrap gap-2">
                {matchingDestinations.map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/destinations/${dest.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#FF6B35] text-xs font-bold text-slate-700 hover:text-white transition-all shadow-sm border border-slate-200"
                  >
                    <span>{dest.name}</span>
                    <span className="text-[10px] opacity-80">({formatAmount(dest.minBudgetInr)})</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/budget-calculator"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-black text-xs rounded-2xl shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Open Detailed Budget Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Interactive Recharts Visualization (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Visual Budget Allocation Model
            </h4>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${formatAmount(Number(value))}`, 'Estimated']}
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '1rem', fontSize: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: '600' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full mt-4">
              {chartData.map((item) => (
                <div key={item.name} className="p-3 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full mx-auto mb-1.5" style={{ backgroundColor: item.color }} />
                  <p className="text-[10px] text-slate-500 font-bold truncate">{item.name.split(' ')[0]}</p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">{formatAmount(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
