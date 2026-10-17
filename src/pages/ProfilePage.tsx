import React, { useState } from 'react';
import { User, MapPin, Compass, Shield, Save, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, isDemo } = useAuth();
  const { currentCurrency, setCurrency } = useCurrency();

  const [fullName, setFullName] = useState(user?.fullName || 'Traveler');
  const [homeCity, setHomeCity] = useState(user?.homeCity || 'New Delhi');
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || 'High Adrenaline & Budget Backpacking');
  const [bio, setBio] = useState(user?.bio || 'Himalayan trekker and weekend summit chaser.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName,
      homeCity,
      travelStyle,
      bio,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5 text-orange-600" />
            <span>Traveler Identity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Your Explorer Profile
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Personalize your travel preferences and default starting points.
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt=""
              className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-400 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading">{user?.fullName}</h3>
                {isDemo && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Demo Mode Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-orange-500" /> {homeCity}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-emerald-600" /> {user?.adventuresCompleted || 8} Expeditions</span>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile details updated and synchronized with Supabase database!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-slate-700">Home City (Departure Point)</label>
                <input
                  type="text"
                  required
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 font-bold text-slate-700">Primary Travel Style & Persona</label>
              <input
                type="text"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                placeholder="e.g. Solo Mountain Explorer, Whitewater Enthusiast"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-bold text-slate-700">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Updates</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
