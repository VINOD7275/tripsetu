import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, signInAsDemo } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        onClose();
      }
    } else {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        setIsSubmitting(false);
        return;
      }
      const res = await signUp(email, password, fullName);
      if (res.error) {
        setError(res.error);
      } else {
        onClose();
      }
    }
    setIsSubmitting(false);
  };

  const handleDemoLogin = () => {
    signInAsDemo();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Subtle colorful glow accents */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF6B35]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {mode === 'signin' ? 'Welcome Back Traveler' : 'Join TripTrail Expeditions'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'signin' ? 'Access your saved trips and adventure budgets' : 'Plan, budget, and customize your next thrill'}
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 mb-6 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-white text-[#FF6B35] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#FF6B35] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Instant Demo Account Button */}
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 mb-5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl hover:bg-emerald-100 transition-all group shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span>1-Click Instant Demo Login (Arjun Verma)</span>
          </button>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Or with credentials
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {error && (
            <div className="p-3 mb-4 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block mb-1.5 text-xs font-bold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arjun Verma"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#FF5722] via-[#FF6B35] to-[#FA541C] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <span>{mode === 'signin' ? 'Sign In to TripTrail' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected by Supabase Auth with Row Level Security</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
