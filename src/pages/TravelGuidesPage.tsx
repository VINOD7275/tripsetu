import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TRAVEL_GUIDES_DATA } from '../data/mockData';

export const TravelGuidesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Tested Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Expedition Survival & Travel Guides
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Written by high-altitude mountaineers, river expedition captains, and seasoned backpackers.
          </p>
        </div>

        {/* Featured Guide Hero */}
        {TRAVEL_GUIDES_DATA.filter((g) => g.featured).slice(0, 1).map((guide) => (
          <div
            key={guide.id}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Featured Survival Guide
                </span>
                <span className="text-xs text-slate-500 font-medium">{guide.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
                {guide.title}
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {guide.summary}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span>By {guide.author}</span>
                <span>•</span>
                <span>Destination: <strong className="text-slate-700">{guide.destinationName}</strong></span>
              </div>

              <div className="pt-2">
                <Link
                  to={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all"
                >
                  <span>Read Complete Field Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <img src={guide.heroImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}

        {/* Guides Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            All Field Guides & Packing Checklists
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_GUIDES_DATA.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={guide.heroImage} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-white/90 backdrop-blur-md text-emerald-800 border border-emerald-200 shadow-sm">
                    {guide.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1 font-medium">{guide.readTime} • By {guide.author}</span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors font-heading leading-snug">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2 border-t border-slate-100">
                    <span>Open Survival Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
