import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Lightbulb, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TRAVEL_GUIDES_DATA } from '../data/mockData';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const guide = TRAVEL_GUIDES_DATA.find((g) => g.slug === slug || g.id === slug);
  const [checkedGear, setCheckedGear] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Guide Not Found</h2>
        <Link to="/guides" className="px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-xl shadow-md">
          Return to Travel Guides
        </Link>
      </div>
    );
  }

  const toggleGear = (item: string) => {
    setCheckedGear((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-orange-500" />
          <span>Back to Guides</span>
        </button>

        {/* Hero banner */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img src={guide.heroImage} alt={guide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500 text-white shadow-md backdrop-blur-md">
              {guide.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading mt-2 leading-tight">
              {guide.title}
            </h1>
            <p className="text-xs text-slate-200 mt-2 font-medium">
              {guide.readTime} • Written by {guide.author} • Focusing on {guide.destinationName}
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed font-medium">
          {guide.summary}
        </div>

        {/* Safety Alerts Box */}
        {guide.safetyAlerts.length > 0 && (
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-bold text-rose-700 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Field Safety Advisories</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {guide.safetyAlerts.map((alert, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="space-y-6">
          {guide.sections.map((sec, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {sec.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Gear Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Interactive Gear Packing Checklist</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Tick items as you pack</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {guide.gearChecklist.map((item) => {
              const isChecked = Boolean(checkedGear[item]);
              return (
                <div
                  key={item}
                  onClick={() => toggleGear(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 text-xs font-medium ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Hacks */}
        {guide.budgetTips.length > 0 && (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tested Budget Optimization Hacks</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {guide.budgetTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA to Plan Trip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-heading">
              Ready to explore {guide.destinationName}?
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Generate a day-by-day customized itinerary with verified budget estimates.
            </p>
          </div>
          <Link
            to={`/plan?destination=${guide.destinationName}`}
            className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FA541C] hover:from-[#FA541C] hover:to-[#E0400B] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Plan Expedition Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
