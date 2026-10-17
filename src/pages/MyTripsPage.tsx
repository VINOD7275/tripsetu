import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Plus, 
  Calendar, 
  MapPin, 
  Wallet, 
  Trash2, 
  Copy, 
  Printer, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Receipt, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { Trip, TripExpense } from '../types';
import { tripTrailApi } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

export const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentCurrency, formatAmount } = useCurrency();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'planning' | 'booked' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Expense modal state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expCategory, setExpCategory] = useState<'transport' | 'stay' | 'food' | 'activity' | 'gear' | 'misc'>('food');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState<number>(500);

  const loadTrips = async () => {
    setIsLoading(true);
    const data = await tripTrailApi.getTrips(user?.id);
    setTrips(data);
    if (data.length > 0 && !selectedTrip) {
      setSelectedTrip(data[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTrips();
  }, [user]);

  const handleDeleteTrip = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip expedition?')) {
      await tripTrailApi.deleteTrip(id);
      const updated = trips.filter((t) => t.id !== id);
      setTrips(updated);
      if (selectedTrip?.id === id) {
        setSelectedTrip(updated.length > 0 ? updated[0] : null);
      }
    }
  };

  const handleDuplicateTrip = async (trip: Trip) => {
    const duplicated: Trip = {
      ...trip,
      id: 'trip-' + Math.random().toString(36).substring(2, 9),
      title: `${trip.title} (Duplicate)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await tripTrailApi.saveTrip(duplicated);
    await loadTrips();
    setSelectedTrip(duplicated);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;

    await tripTrailApi.addExpense(selectedTrip.id, {
      tripId: selectedTrip.id,
      category: expCategory,
      description: expDesc || 'Expense',
      amount: expAmount,
      currency: currentCurrency.code,
      date: new Date().toISOString().split('T')[0]
    });

    setIsExpenseModalOpen(false);
    setExpDesc('');
    setExpAmount(500);
    await loadTrips();
  };

  const filteredTrips = trips.filter((t) => {
    if (activeTab === 'all') return true;
    return t.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-orange-600" />
              <span>Expedition Control Room</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
              My Saved Trips & Budgets
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Track planned versus actual expenditures, manage daily itineraries, and export journey details.
            </p>
          </div>

          <Link
            to="/plan"
            className="px-5 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Expedition</span>
          </Link>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit">
          {(['all', 'planning', 'booked', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Trips & Tracker Split View */}
        {trips.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 max-w-lg mx-auto">
            <Briefcase className="w-12 h-12 text-orange-500 mx-auto opacity-80" />
            <h3 className="text-lg font-bold text-slate-900 font-heading">No Trips Saved Yet</h3>
            <p className="text-xs text-slate-600">
              Start by discovering an adventure destination or using our AI Smart Trip Planner to generate a custom itinerary.
            </p>
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your First Trip</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Trips List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                Your Saved Expeditions ({filteredTrips.length})
              </h3>

              <div className="space-y-3">
                {filteredTrips.map((trip) => {
                  const isSelected = selectedTrip?.id === trip.id;
                  const totalSpent = (trip.expenses || []).reduce((acc, curr) => acc + curr.amount, 0);

                  return (
                    <div
                      key={trip.id}
                      onClick={() => setSelectedTrip(trip)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-orange-50/70 border-orange-400 shadow-md ring-1 ring-orange-400/50'
                          : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={trip.destinationImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80'}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                              {trip.status}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">{trip.durationDays} Days</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 font-heading mt-1 line-clamp-1">
                            {trip.title}
                          </h4>
                          <p className="text-[11px] text-orange-600 font-bold mt-0.5">
                            Budget: {formatAmount(trip.totalBudget)}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Trip Live Tracker & Itinerary (7 cols) */}
            {selectedTrip && (
              <div className="lg:col-span-7 space-y-6">
                
                {/* Trip Header Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{selectedTrip.destinationName}</span>
                        <span>•</span>
                        <span>From {selectedTrip.startingCity}</span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 font-heading">
                        {selectedTrip.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1">
                        {selectedTrip.durationDays} Days • {selectedTrip.travelersCount} Travelers ({selectedTrip.travelGroupType}) • {selectedTrip.comfortLevel} tier
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => handleDuplicateTrip(selectedTrip)}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
                        title="Duplicate Trip"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
                        title="Print Itinerary"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(selectedTrip.id)}
                        className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors shadow-xs"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Budget vs Actual Tracker Bar */}
                  {(() => {
                    const actualTotal = (selectedTrip.expenses || []).reduce((sum, e) => sum + e.amount, 0);
                    const percent = Math.min(100, Math.round((actualTotal / selectedTrip.totalBudget) * 100));
                    const remaining = selectedTrip.totalBudget - actualTotal;

                    return (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Actual Spending vs Budget</span>
                            <p className="text-lg font-black text-slate-900 mt-0.5">
                              {formatAmount(actualTotal)} <span className="text-xs font-normal text-slate-500">spent of {formatAmount(selectedTrip.totalBudget)}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => setIsExpenseModalOpen(true)}
                            className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Expense</span>
                          </button>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 rounded-full ${
                                percent > 90 ? 'bg-rose-500' : percent > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-600 pt-0.5 font-medium">
                            <span>{percent}% Budget Utilized</span>
                            <span className={remaining < 0 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                              {remaining >= 0 ? `${formatAmount(remaining)} Remaining` : `${formatAmount(Math.abs(remaining))} Over Budget!`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Logged Expenses List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-orange-500" />
                      <span>Itemized Expenses Log ({(selectedTrip.expenses || []).length})</span>
                    </h4>

                    {(selectedTrip.expenses || []).length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {selectedTrip.expenses?.map((exp) => (
                          <div key={exp.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="capitalize text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                                {exp.category}
                              </span>
                              <span className="text-slate-800 font-semibold">{exp.description}</span>
                            </div>
                            <span className="font-extrabold text-orange-600">{formatAmount(exp.amount)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        No expenses logged yet. Tap "Add Expense" to track your real-time travel spends!
                      </p>
                    )}
                  </div>

                  {/* Day-by-Day Schedule View */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Scheduled Itinerary Roadmaps
                    </h4>

                    <div className="space-y-3">
                      {selectedTrip.itinerary?.map((day) => (
                        <div key={day.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-orange-600">Day {day.dayNumber}: {day.title}</span>
                            <span className="text-slate-500">{formatAmount(day.dayBudgetInr)} est.</span>
                          </div>
                          <div className="space-y-1.5 text-slate-600 pt-1">
                            {day.schedule.map((item, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-orange-500 font-semibold font-mono shrink-0 text-[11px]">{item.time}</span>
                                <span>{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {isExpenseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Log Travel Expense
                </h3>
                <button onClick={() => setIsExpenseModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
                <div>
                  <label className="block mb-1.5 font-bold text-slate-700">Category</label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                  >
                    <option value="transport">Transportation</option>
                    <option value="stay">Stays / Camps</option>
                    <option value="food">Food & Drinks</option>
                    <option value="activity">Activity / Permits</option>
                    <option value="gear">Gear Rentals</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-slate-700">Description</label>
                  <input
                    type="text"
                    required
                    value={expDesc}
                    onChange={(e) => setExpDesc(e.target.value)}
                    placeholder="e.g. River Rafting Slot, Beatles Cafe Dinner"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-slate-700">Amount ({currentCurrency.code})</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsExpenseModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white rounded-xl font-bold shadow-md shadow-orange-500/20 transition-all"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
