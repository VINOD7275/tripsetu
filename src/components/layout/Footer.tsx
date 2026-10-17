import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Database, 
  ShieldAlert, 
  Send, 
  MapPin, 
  PhoneCall, 
  Heart, 
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { SupabaseConfigModal } from '../common/SupabaseConfigModal';

export const Footer: React.FC = () => {
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <footer className="w-full bg-slate-100/90 border-t border-slate-200/90 pt-16 pb-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5722] to-[#FF6B35] text-white shadow-md shadow-orange-500/25">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-slate-900 font-heading">
                    Trip<span className="text-[#FF6B35]">Trail</span>
                  </span>
                  <p className="text-[10px] text-slate-500 font-bold tracking-wider">AI ADVENTURE & BUDGET TRAVEL</p>
                </div>
              </Link>

              <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
                Empowering solo backpackers, couples, families, and adventure seekers to conquer mountains, river rapids, and hidden beaches within a realistic, verified budget.
              </p>

              {/* Supabase backend status */}
              <div className="pt-2">
                <button
                  onClick={() => setSupabaseModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-sm transition-colors"
                >
                  <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-500'}`} />
                  <span>
                    Backend: {isSupabaseConfigured ? 'Supabase PostgreSQL (Live)' : 'Local Resilient Mode'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Col 2: Discover */}
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4 font-heading tracking-wide">
                Discover
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li><Link to="/destinations" className="hover:text-[#FF6B35] transition-colors">All Destinations</Link></li>
                <li><Link to="/destinations?category=mountains" className="hover:text-[#FF6B35] transition-colors">Himalayan Peaks</Link></li>
                <li><Link to="/destinations?category=beaches" className="hover:text-[#FF6B35] transition-colors">Coastal Adventures</Link></li>
                <li><Link to="/destinations?intl=true" className="hover:text-[#FF6B35] transition-colors">Southeast Asia Loops</Link></li>
                <li><Link to="/adventures" className="hover:text-[#FF6B35] transition-colors">Thrill Catalog</Link></li>
              </ul>
            </div>

            {/* Col 3: Smart Tools */}
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4 font-heading tracking-wide">
                Smart Tools
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li><Link to="/plan" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1.5 text-orange-600 font-bold"><span>AI Trip Planner</span><Sparkles className="w-3 h-3" /></Link></li>
                <li><Link to="/budget-calculator" className="hover:text-[#FF6B35] transition-colors">Budget Breakdown Calculator</Link></li>
                <li><Link to="/my-trips" className="hover:text-[#FF6B35] transition-colors">Expense & Itinerary Tracker</Link></li>
                <li><Link to="/guides" className="hover:text-[#FF6B35] transition-colors">High-Altitude Survival Guides</Link></li>
                <li><button onClick={() => setSupabaseModalOpen(true)} className="hover:text-[#FF6B35] transition-colors text-left">Supabase Schema & Docs</button></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="text-slate-900 font-bold text-sm mb-4 font-heading tracking-wide">
                Adventure Dispatch
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Receive weekly hidden budget itineraries, off-season deals, and trek permits advisories.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="explorer@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#FF6B35] hover:bg-[#FA541C] text-white rounded-lg text-xs flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] font-bold text-emerald-600">
                    Welcome to the expedition club!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Pricing & Safety Disclaimers */}
          <div className="my-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              <strong className="text-amber-950 font-bold">Important Traveler Notice & Price Transparency: </strong>
              TripTrail provides dynamic, algorithmic cost estimations synthesized from seasonal tariffs, regional transit averages, and local partner listings. Prices are strictly indicative and never guaranteed. High-altitude trekking and extreme adventure sports carry inherent physical risks. Always consult medical professionals and register with certified mountaineering associations (IMF, UTDB, PADI) before participating.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4">
            <p>© {new Date().getFullYear()} TripTrail Inc. Built with React, TypeScript, Tailwind CSS & Supabase.</p>
            <div className="flex items-center gap-4 font-medium">
              <span>Emergency Rescue Hotline: 112 / 108</span>
              <span>•</span>
              <button onClick={() => setSupabaseModalOpen(true)} className="hover:text-slate-800 transition-colors">
                Architecture Spec
              </button>
            </div>
          </div>
        </div>
      </footer>

      <SupabaseConfigModal isOpen={supabaseModalOpen} onClose={() => setSupabaseModalOpen(false)} />
    </>
  );
};
