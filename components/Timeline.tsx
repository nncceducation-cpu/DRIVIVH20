import React from 'react';
import { Calendar, AlertTriangle, Clock, ArrowRight, Activity } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-slate-100 pb-6">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Standardized Screening Protocol
          </h3>
          <p className="text-slate-500 mt-2">
              Target Population: Infants born at ≤ 31+6 weeks gestation.
              <br/>
              <span className="text-xs text-slate-400">Source: Mohammad et al. (2021) Canadian Consensus</span>
          </p>
      </div>
      
      {/* Standard Flow */}
      <div className="relative">
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200"></div>

        {/* Timepoint 1 */}
        <div className="relative flex gap-6 mb-12">
          <div className="w-16 flex-shrink-0 flex flex-col items-center z-10">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm font-bold text-blue-700 text-xs text-center leading-tight p-1">
                  Day 4-7
              </div>
          </div>
          <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
              <h4 className="font-bold text-slate-900 mb-2">1. Initial Screening</h4>
              <p className="text-sm text-slate-600 mb-3">
                  Performed after the critical 72h window to minimize handling.
              </p>
              <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Detect GMH-IVH</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Identify PVHI</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Check for CBH</span>
              </div>
          </div>
        </div>

        {/* Timepoint 2 */}
        <div className="relative flex gap-6 mb-12">
          <div className="w-16 flex-shrink-0 flex flex-col items-center z-10">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-sm font-bold text-indigo-700 text-xs text-center leading-tight p-1">
                  Week 4-6
              </div>
          </div>
          <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
              <h4 className="font-bold text-slate-900 mb-2">2. Evolution Assessment</h4>
              <p className="text-sm text-slate-600 mb-3">
                  Crucial for identifying late-onset injury or WMI that isn't visible early on.
              </p>
              <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Cystic WMI</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">PHVD Progression</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Clot Evolution</span>
              </div>
          </div>
        </div>

        {/* Timepoint 3 */}
        <div className="relative flex gap-6">
          <div className="w-16 flex-shrink-0 flex flex-col items-center z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-sm font-bold text-emerald-700 text-xs text-center leading-tight p-1">
                  ~36w PMA
              </div>
          </div>
          <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors">
              <h4 className="font-bold text-slate-900 mb-2">3. Term Equivalent Age</h4>
              <p className="text-sm text-slate-600 mb-3">
                  Prognostic scan before discharge.
              </p>
              <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Brain Maturation</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Permanent Injury</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700">Rule out Porencephaly</span>
              </div>
          </div>
        </div>
      </div>

      {/* Intensified Logic */}
      <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" />
              When to Intensify Screening?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-amber-200 p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-amber-900 text-sm mb-2 uppercase tracking-wide">Trigger Findings</div>
                  <ul className="list-disc ml-4 space-y-2 text-sm text-slate-700">
                      <li><strong className="text-slate-900">Grade III IVH</strong></li>
                      <li><strong className="text-slate-900">PVHI</strong></li>
                      <li><strong className="text-slate-900">Ventricular Dilatation:</strong>
                          <ul className="list-circle ml-4 mt-1 text-slate-600">
                              <li>VI &gt; 97th percentile</li>
                              <li>AHW &gt; 6mm</li>
                          </ul>
                      </li>
                  </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex flex-col justify-center shadow-sm">
                  <div className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2 uppercase tracking-wide">
                      <Clock size={16} /> Action Required
                  </div>
                  <div className="text-sm text-blue-900 font-medium">
                      Repeat cUS in 7 days (or earlier if clinically indicated).
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-blue-800">
                      <span className="font-bold">If progressive: Weekly scans until stable.</span>
                  </div>
              </div>
          </div>
      </div>
      
      <div className="mt-6 flex items-start gap-3 p-4 bg-rose-50 rounded-lg border border-rose-100 text-sm text-rose-800">
          <Activity className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
              Outside Standard Timeline: Consider screening for high-risk infants (e.g. 5-min Apgar &lt; 7, rapid Hb drop, shock, NEC) regardless of age.
          </div>
      </div>
    </div>
  );
};

export default Timeline;