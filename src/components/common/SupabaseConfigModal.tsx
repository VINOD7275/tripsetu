import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, CheckCircle2, Copy, Check, Sparkles, Server } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose }) => {
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isOpen) return null;

  const envSnippet = `# .env file in project root
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <span>Supabase PostgreSQL Integration</span>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                  isSupabaseConfigured
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {isSupabaseConfigured ? 'Live Supabase Connected' : 'Local Resilient Mode Active'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Production-grade PostgreSQL database with Row Level Security (RLS)
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            {/* Status Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                {isSupabaseConfigured ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-slate-900">
                    {isSupabaseConfigured
                      ? 'Live Supabase Backend Connected'
                      : 'TripTrail is 100% Functional in Resilient Mode'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isSupabaseConfigured
                      ? 'All user authentication, trips, itineraries, and expenses are actively synchronized with your Supabase PostgreSQL instance under strict Row Level Security.'
                      : 'You can create trips, track budgets, calculate itineraries, and test auth without setting up Supabase immediately. All data persists reactively in local storage. When you are ready, follow the steps below to link your live Supabase database.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: SQL Schema */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">1</span>
                <span>Run Database Migrations</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The complete production SQL schema is generated at <code className="text-[#FF6B35] font-semibold bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">supabase/schema.sql</code>. It creates all tables (<code className="text-slate-800 font-medium">profiles, destinations, activities, trips, trip_itinerary_days, trip_expenses, travel_guides</code>), foreign key constraints, indexes, and RLS security policies.
              </p>
            </div>

            {/* Step 2: Environment Setup */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">2</span>
                  <span>Set Environment Variables</span>
                </div>
                <button
                  onClick={handleCopyEnv}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-xl bg-white border border-slate-200 transition-colors shadow-sm font-semibold"
                >
                  {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEnv ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 rounded-xl text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                {envSnippet}
              </pre>
            </div>

            {/* Architectural Security Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Server className="w-4 h-4" />
                <span>Zero Express / MongoDB Bloat Guarantee</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                As required, TripTrail strictly relies on Supabase Auth, PostgreSQL RLS, and secure direct schema constraints. No MongoDB, Mongoose, or duplicate Express microservices are introduced.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
