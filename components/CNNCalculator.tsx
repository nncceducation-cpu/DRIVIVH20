import React, { useState } from 'react';
import PersistentPanel from './PersistentPanel';
import ExternalToolFrame from './ExternalToolFrame';
import { 
  Calculator, 
  ExternalLink, 
  RefreshCw, 
  BookOpen, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  BarChart2, 
  ArrowRight, 
  ShieldCheck,
  Activity
} from 'lucide-react';

interface CNNCalculatorProps {
  onSwitchToBenchmark?: () => void;
}

export const CNNCalculator: React.FC<CNNCalculatorProps> = ({ onSwitchToBenchmark }) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'guide'>('calculator');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const CNN_URL = "https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx";

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[700px]">
      {/* Top Header Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2.5 rounded-lg text-red-600 border border-red-200 shadow-sm shrink-0">
            <Calculator size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-800 text-base">Canadian Neonatal Network (CNN) Calculator</h3>
              <span className="text-[11px] font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full border border-red-200">
                NOPS Model
              </span>
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                Day 7 • 14 • 28
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Neonatal Outcomes Probability Score for preterm infants &lt;30 weeks (2010–2023 CNN national cohort)
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Quick peer switch to VON Survival and Outcome */}
          {onSwitchToBenchmark && (
            <button
              onClick={onSwitchToBenchmark}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 bg-white border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
              title="Switch to VON Survival and Outcome"
            >
              <BarChart2 size={14} className="text-blue-600" />
              <span>VON Survival and Outcome</span>
            </button>
          )}

          {/* Sub-tab view selector */}
          <div className="flex bg-slate-200 p-0.5 rounded-lg text-xs font-medium border border-slate-300">
            <button
              onClick={() => setActiveSubTab('calculator')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeSubTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Portal
            </button>
            <button
              onClick={() => setActiveSubTab('guide')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
                activeSubTab === 'guide'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen size={12} />
              <span>Model Guide</span>
            </button>
          </div>

          {/* Open in new tab link */}
          <a
            href={CNN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-red-700 hover:text-red-900 font-semibold bg-red-50 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg hover:bg-red-100 transition-all shadow-sm"
          >
            <span>Open in Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <PersistentPanel active={activeSubTab === 'calculator'} preload>
        <div className="flex-1 flex flex-col relative bg-slate-100 min-h-[640px]">
          {/* Sub-banner notification */}
          <div className="bg-amber-50/90 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-amber-700 shrink-0" />
              <span>
                <strong>Live Official Service:</strong> Connects securely to the Canadian Neonatal Network live engine. For optimal responsiveness or mobile devices, use the "Open in Portal" button.
              </span>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-medium ml-3 shrink-0 hover:underline"
              title="Refresh Embedded Calculator"
            >
              <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
              <span>Reload</span>
            </button>
          </div>

          <ExternalToolFrame reloadToken={iframeKey} url={CNN_URL} title="Canadian Neonatal Network NOPS Calculator" onLoad={() => setIsLoading(false)} />
        </div>
      </PersistentPanel>
      <PersistentPanel active={activeSubTab === 'guide'}>
        {/* Clinical Model Guide & Documentation */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
          {/* Cohort Overview Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider text-red-700 uppercase">Evidence & Methodology</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  Neonatal Outcomes Probability Score (NOPS)
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Developed by the <strong>Canadian Neonatal Network (CNN)</strong> using standardized national data from 
                  infants born between <strong>22 and 29.6 weeks' gestation</strong> admitted to tertiary NICUs across Canada 
                  between January 1, 2010, and December 31, 2023.
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-2xl font-black text-slate-900">26,719+</span>
                <span className="text-xs text-slate-500">Validated Neonatal Records</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Day 7 Prediction Model</span>
                <p className="text-slate-600">
                  Evaluated at 7 days of postnatal life (n = 26,719) with initial respiratory and hemodynamic stability metrics.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Day 14 Prediction Model</span>
                <p className="text-slate-600">
                  Evaluated at 14 days of life (n = 25,317) incorporating cumulative mechanical ventilation and early morbidities.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Day 28 Prediction Model</span>
                <p className="text-slate-600">
                  Evaluated at 28 days of life (n = 22,386) reflecting sustained respiratory requirements and secondary complications.
                </p>
              </div>
            </div>
          </div>

          {/* Model Predictors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Baseline Admission Variables */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-blue-900 font-bold text-sm">
                <ShieldCheck size={18} className="text-blue-600" />
                <span>Baseline Predictors (At Admission)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Gestational Age:</strong> 22 to 29 completed weeks. (Higher GA strongly reduces baseline risk).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Sex:</strong> Male vs Female (females demonstrate lower baseline risk for mortality and IVH).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Birth Weight:</strong> 250 g to 1750 g, auto-calculated for Small for Gestational Age (&lt;10th percentile).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Antenatal Steroids:</strong> Any receipt of antenatal corticosteroids (Yes / No / Unknown).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-red-700">Severe IVH (Grade 3 or 4):</strong> Critical brain injury predictor. Evaluated in DRIVE IVH consensus module.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Spontaneous Intestinal Perforation (SIP):</strong> Verified intestinal perforation independent of NEC.
                  </div>
                </li>
              </ul>
            </div>

            {/* Dynamic Postnatal Predictors */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-indigo-900 font-bold text-sm">
                <Activity size={18} className="text-indigo-600" />
                <span>Postnatal Interventions & Diagnoses</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Mechanical Ventilation:</strong> Ventilated &gt;50% of days (≥4 days by D7; ≥7 days by D14; ≥14 days by D28).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Inhaled Nitric Oxide (iNO):</strong> Administered &gt;50% of days up to observation window.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Inotrope Exposure:</strong> Any inotrope support on or before Day 7, Day 14, or Day 28. (Avoidance in 1st 72h is emphasized in DRIVE IVH).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Infection (EOS/LOS):</strong> Culture-positive early or late-onset sepsis on or before evaluation day.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <strong>Necrotizing Enterocolitis (NEC):</strong> Stage 2 or 3 NEC onset.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Predicted Outcomes Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Predicted Outcomes & Clinical Definitions</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Outcome Measure</th>
                    <th className="p-2.5">Standardized Definition (Canadian Neonatal Network)</th>
                    <th className="p-2.5">DRIVE IVH Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">1. Death Before Discharge</td>
                    <td className="p-2.5">All-cause mortality prior to initial discharge from tertiary level 3 NICU.</td>
                    <td className="p-2.5 text-blue-700">Crucial for antenatal & post-resuscitation family counseling.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">2. Death or Severe Neonatal Morbidity</td>
                    <td className="p-2.5">
                      Composite including: Periventricular Leukomalacia (PVL / cystic WMI by de Vries), Severe ROP (Stage ≥3 or treated), or NEC Stage 2/3.
                    </td>
                    <td className="p-2.5 text-blue-700">Directly maps to ultrasound classification findings in this application.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">3. Death or BPD</td>
                    <td className="p-2.5">
                      Bronchopulmonary dysplasia defined as requirement for supplemental oxygen or respiratory support at 36 weeks PMA or discharge.
                    </td>
                    <td className="p-2.5 text-blue-700">Highlights impact of gentle ventilation and PCO2 stabilization.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">4. Death or Moderate-Severe BPD</td>
                    <td className="p-2.5">
                      Invasive or non-invasive positive pressure ventilation, or nasal cannula O2 &gt;100 cc/min (100% O2) or high-flow &gt;1.5 L/min (&gt;21% O2) at 36 weeks PMA.
                    </td>
                    <td className="p-2.5 text-blue-700">Guides long-term pulmonary & neurodevelopmental prognosis.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical Disclaimer & Action Button */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-blue-700 mt-0.5 shrink-0" />
              <div className="text-xs text-blue-900">
                <p className="font-semibold">Clinical Decision Support Disclaimer:</p>
                <p className="mt-0.5 text-blue-800">
                  NOPS predictions are statistical probabilities designed to aid neonatologists and multidisciplinary teams in clinical assessment. They do not replace individual clinical judgment.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSubTab('calculator')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors shrink-0 shadow-sm flex items-center gap-1.5"
            >
              <span>Launch Calculator</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </PersistentPanel>
    </div>
  );
};

export default CNNCalculator;
