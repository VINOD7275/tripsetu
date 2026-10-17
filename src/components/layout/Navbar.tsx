import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Calculator, 
  Flame, 
  BookOpen, 
  Briefcase, 
  Menu, 
  X, 
  Database, 
  ChevronDown, 
  User, 
  LogOut, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { AuthModal } from '../common/AuthModal';
import { SupabaseConfigModal } from '../common/SupabaseConfigModal';
import { CurrencyCode } from '../../types';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const { user, signOut, isDemo } = useAuth();
  const { currentCurrency, setCurrency, availableCurrencies } = useCurrency();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Explore', path: '/destinations', icon: MapPin },
    { name: 'Plan a Trip', path: '/plan', icon: Sparkles, highlight: true },
    { name: 'Budget Calculator', path: '/budget-calculator', icon: Calculator },
    { name: 'Adventures', path: '/adventures', icon: Flame },
    { name: 'Travel Guides', path: '/guides', icon: BookOpen },
    { name: 'My Trips', path: '/my-trips', icon: Briefcase },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/92 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5722] via-[#FF6B35] to-[#FFA26B] shadow-lg shadow-orange-500/25 text-white group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
              <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-heading">
                  Trip<span className="text-[#FF6B35]">Trail</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                  AI Adventure
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider">BUDGET & THRILL PLANNER</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    link.highlight
                      ? active
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#FA541C] text-white shadow-md shadow-orange-500/30'
                        : 'bg-orange-50 text-[#FF6B35] hover:bg-orange-100 border border-orange-200 shadow-sm'
                      : active
                      ? 'bg-slate-100 text-slate-900 border border-slate-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Supabase Status Pill */}
            <button
              onClick={() => setSupabaseModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-[11px] font-semibold text-slate-700 transition-colors shadow-sm"
              title="View Supabase PostgreSQL Architecture"
            >
              <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-500'}`} />
              <span className="hidden xl:inline">{isSupabaseConfigured ? 'Supabase Connected' : 'Resilient Local Mode'}</span>
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm transition-colors"
              >
                <span>{currentCurrency.symbol} {currentCurrency.code}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 z-50"
                  >
                    {availableCurrencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code as CurrencyCode);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold ${
                          currentCurrency.code === c.code
                            ? 'bg-orange-50 text-[#FF6B35]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{c.code} ({c.symbol})</span>
                        <span className="text-[10px] text-slate-400 font-normal">{c.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-orange-300 shadow-sm transition-all"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#FF6B35]/40"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                        {isDemo && (
                          <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Demo Traveler Active
                          </span>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl"
                      >
                        <User className="w-4 h-4 text-[#FF6B35]" />
                        <span>Traveler Profile</span>
                      </Link>
                      <Link
                        to="/my-trips"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl"
                      >
                        <Briefcase className="w-4 h-4 text-emerald-600" />
                        <span>My Trips & Budgets</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1 border-t border-slate-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sign In / Demo</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
            >
              {currentCurrency.symbol}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                        active
                          ? 'bg-[#FF6B35] text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSupabaseModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <Database className={`w-4 h-4 ${isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-500'}`} />
                    <span>Supabase Database</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isSupabaseConfigured ? 'Connected' : 'Local Mode'}
                  </span>
                </button>

                {user ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                        <p className="text-[10px] text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-[#FF6B35] text-white font-bold text-sm rounded-xl text-center shadow-lg shadow-orange-500/25"
                  >
                    Sign In / Instant Demo Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <SupabaseConfigModal isOpen={supabaseModalOpen} onClose={() => setSupabaseModalOpen(false)} />
    </>
  );
};
