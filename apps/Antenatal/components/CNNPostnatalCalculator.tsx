import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ExternalLink, 
  Calendar, 
  Heart, 
  Wind, 
  Scale, 
  Baby, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  PostnatalDay, 
  InfantSex, 
  RespiratorySupportType, 
  CNNPredictionInput, 
  calculateCNNPrediction, 
  formatCNNPostnatalNote 
} from '../utils/cnnCalculatorModel';
import { useLanguage } from '../contexts/LanguageContext';

interface CNNPostnatalCalculatorProps {
  onSendToEMR?: (note: string) => void;
  defaultGestationalAge?: number;
}

export const CNNPostnatalCalculator: React.FC<CNNPostnatalCalculatorProps> = ({
  onSendToEMR,
  defaultGestationalAge = 24
}) => {
  const { t } = useLanguage();

  // Inputs
  const [dayOfLife, setDayOfLife] = useState<PostnatalDay>(7);
  const [gestationalAge, setGestationalAge] = useState<number>(
    defaultGestationalAge >= 22 && defaultGestationalAge <= 29 ? defaultGestationalAge : 24
  );
  const [sex, setSex] = useState<InfantSex>('male');
  
  // Default birth weight based on GA
  const defaultWeights: Record<number, number> = {
    22: 500,
    23: 585,
    24: 675,
    25: 775,
    26: 885,
    27: 1005,
    28: 1140,
    29: 1290
  };
  const [birthWeight, setBirthWeight] = useState<number>(defaultWeights[gestationalAge] || 675);
  const [respiratorySupport, setRespiratorySupport] = useState<RespiratorySupportType>('cpap');
  const [copiedNote, setCopiedNote] = useState(false);

  // Update birth weight preset when GA changes if it was close to previous default
  const handleGAChange = (newGA: number) => {
    setGestationalAge(newGA);
    // Suggest median weight for new GA
    if (defaultWeights[newGA]) {
      setBirthWeight(defaultWeights[newGA]);
    }
  };

  // Run calculation
  const calculationInput: CNNPredictionInput = useMemo(() => ({
    dayOfLife,
    gestationalAge,
    birthWeight,
    sex,
    respiratorySupport
  }), [dayOfLife, gestationalAge, birthWeight, sex, respiratorySupport]);

  const result = useMemo(() => {
    return calculateCNNPrediction(calculationInput);
  }, [calculationInput]);

  const handleExportClick = () => {
    const note = formatCNNPostnatalNote(calculationInput, result);
    if (onSendToEMR) {
      onSendToEMR(note);
    } else {
      navigator.clipboard.writeText(note);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-medical-900 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-medical-500/30 border border-medical-400/40 text-medical-300 rounded text-[10px] font-bold uppercase tracking-wider">
                Imported Educational Model
              </span>
              <span className="text-xs text-slate-400">Supplied NeoConsult app</span>
            </div>
            <h3 className="font-bold text-lg text-white mt-1">
              Postnatal Outcomes Prediction (Day 7, 14, & 28)
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Illustrative calculations copied from NeoConsult; not the official CNN NOPS model.
            </p>
          </div>

          <a
            href="https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all self-start sm:self-auto"
            title="Open official Canadian Neonatal Network Calculator"
          >
            <span>Official CNN Tool</span>
            <ExternalLink className="w-3.5 h-3.5 text-medical-300" />
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-6 space-y-6"><p className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm">Educational demonstration from the supplied app. These heuristic outputs are not validated CNN predictions and should not be used for individual prognostication.</p>
        
        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/80 p-4 sm:p-5 rounded-xl border border-slate-200">
          
          {/* 1. Postnatal Day of Life */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-medical-600" />
                <span>Prediction Day (Day of Life)</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 lowercase">landmark day</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { day: 7 as PostnatalDay, label: 'Day 7', n: 'Illustrative' },
                { day: 14 as PostnatalDay, label: 'Day 14', n: 'Illustrative' },
                { day: 28 as PostnatalDay, label: 'Day 28', n: 'Illustrative' }
              ].map(item => (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => setDayOfLife(item.day)}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                    dayOfLife === item.day
                      ? 'bg-medical-700 text-white border-medical-800 shadow-sm font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="text-xs sm:text-sm">{item.label}</div>
                  <div className={`text-[10px] ${dayOfLife === item.day ? 'text-medical-200' : 'text-slate-400'}`}>
                    {item.n}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Gestational Age (weeks) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Baby className="w-3.5 h-3.5 text-medical-600" />
                <span>Gestational Age</span>
              </label>
              <span className="text-xs font-bold text-medical-700 bg-medical-50 px-2 py-0.5 rounded border border-medical-200">
                {gestationalAge} completed weeks
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {[22, 23, 24, 25, 26, 27, 28, 29].map(ga => (
                <button
                  key={ga}
                  type="button"
                  onClick={() => handleGAChange(ga)}
                  className={`py-1.5 text-xs rounded border text-center transition-all ${
                    gestationalAge === ga
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {ga}w
                </button>
              ))}
            </div>
          </div>

          {/* 3. Infant Sex */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-medical-600" />
              <span>Infant Sex</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSex('male')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  sex === 'male'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Male (higher risk)
              </button>
              <button
                type="button"
                onClick={() => setSex('female')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  sex === 'female'
                    ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Female (survival benefit)
              </button>
            </div>
          </div>

          {/* 4. Birth Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Scale className="w-3.5 h-3.5 text-medical-600" />
                <span>Birth Weight</span>
              </label>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  result.weightInfo.category === 'SGA' 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : result.weightInfo.category === 'LGA' 
                      ? 'bg-purple-100 text-purple-800 border-purple-300' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {result.weightInfo.category} (~{result.weightInfo.percentile}th %ile)
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {birthWeight} g
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="250"
                max="1750"
                step="25"
                value={birthWeight}
                onChange={(e) => setBirthWeight(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-medical-600"
              />
              <input
                type="number"
                min="250"
                max="1750"
                value={birthWeight}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) setBirthWeight(Math.min(1750, Math.max(250, val)));
                }}
                className="w-20 px-2 py-1 text-xs border border-slate-300 rounded text-right font-medium text-slate-800 focus:ring-1 focus:ring-medical-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
              <span>250g</span>
              <span>Median for {gestationalAge}w: {result.weightInfo.medianForGA}g</span>
              <span>1750g</span>
            </div>
          </div>

          {/* 5. Respiratory Support on Prediction Day */}
          <div className="space-y-2 md:col-span-2 border-t border-slate-200 pt-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Wind className="w-3.5 h-3.5 text-medical-600" />
                <span>Respiratory Support on Day {dayOfLife}</span>
              </span>
              <span className="text-[11px] font-normal text-slate-500">primary predictor for BPD</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: 'ventilator' as RespiratorySupportType, label: 'Invasive Mechanical Vent', sub: 'ET Tube / HFOV' },
                { type: 'cpap' as RespiratorySupportType, label: 'Non-Invasive Positive Pressure', sub: 'CPAP / NIPPV / High Flow' },
                { type: 'cannula' as RespiratorySupportType, label: 'Low-Flow Cannula', sub: 'Nasal O2 unpressurized' },
                { type: 'room_air' as RespiratorySupportType, label: 'Room Air', sub: 'Unassisted spontaneous' }
              ].map(item => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setRespiratorySupport(item.type)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    respiratorySupport === item.type
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold shadow-sm ring-1 ring-indigo-400'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="space-y-5">
          
          {/* Hero Outcome: Conditional Survival */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-xl border border-emerald-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Conditional Postnatal Survival Rate</span>
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  Survival to NICU Discharge: <span className="text-emerald-700">{result.survivalToDischarge}%</span>
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Having survived to <strong>Day {dayOfLife} of life</strong>, the predicted mortality prior to discharge is <strong>{result.mortalityPriorToDischarge}%</strong>.
                </p>
              </div>

              <div className="text-right sm:self-center">
                <div className="text-xs text-slate-500">Survival at Birth (Baseline)</div>
                <div className="text-base font-bold text-slate-700">~{result.baselineBirthSurvival}%</div>
                <div className="text-[10px] text-emerald-600 font-semibold">
                  +{(result.survivalToDischarge - result.baselineBirthSurvival).toFixed(1)}% milestone gain
                </div>
              </div>
            </div>

            {/* Visual Multi-Day Progression Bar */}
            <div className="mt-4">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-medical-600" />
                <span>Survival Trajectory Across Landmark Postnatal Days:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">At Birth</div>
                  <div className="text-sm sm:text-base font-bold text-slate-700">{result.baselineBirthSurvival}%</div>
                  <div className="text-[10px] text-slate-400">Day 1 baseline</div>
                </div>

                <div className={`p-2.5 rounded-lg border transition-all ${
                  dayOfLife === 7 
                    ? 'bg-emerald-100/90 border-emerald-400 ring-2 ring-emerald-300 font-bold' 
                    : 'bg-white/80 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-600 uppercase font-semibold">Day 7</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-800">{result.day7Survival}%</div>
                  <div className="text-[10px] text-emerald-600">Surviving week 1</div>
                </div>

                <div className={`p-2.5 rounded-lg border transition-all ${
                  dayOfLife === 14 
                    ? 'bg-emerald-100/90 border-emerald-400 ring-2 ring-emerald-300 font-bold' 
                    : 'bg-white/80 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-600 uppercase font-semibold">Day 14</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-800">{result.day14Survival}%</div>
                  <div className="text-[10px] text-emerald-600">Surviving week 2</div>
                </div>

                <div className={`p-2.5 rounded-lg border transition-all ${
                  dayOfLife === 28 
                    ? 'bg-emerald-100/90 border-emerald-400 ring-2 ring-emerald-300 font-bold' 
                    : 'bg-white/80 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-600 uppercase font-semibold">Day 28</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-800">{result.day28Survival}%</div>
                  <div className="text-[10px] text-emerald-600">Surviving 1 month</div>
                </div>
              </div>
            </div>
          </div>

          {/* CNN NOPS Outcomes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Survival without major morbidity */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-700">Survival Without Major Morbidity</span>
                <span className="text-base font-bold text-emerald-700">{result.survivalWithoutMajorMorbidity}%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Discharge survival free from PVL, severe ROP (stage ≥3), and NEC (stage 2/3).
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${result.survivalWithoutMajorMorbidity}%` }}
                />
              </div>
            </div>

            {/* Mortality or Major Morbidity */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-700">Mortality or Major Morbidity</span>
                <span className="text-base font-bold text-rose-700">{result.mortalityOrMajorMorbidity}%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Composite of death before discharge, severe ROP, PVL, or late NEC.
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="bg-rose-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${result.mortalityOrMajorMorbidity}%` }}
                />
              </div>
            </div>

            {/* Death or BPD at 36w PMA */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-700">Death or BPD (at 36w PMA)</span>
                <span className="text-base font-bold text-indigo-700">{result.deathOrBPD}%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Requirement for supplemental O2 or positive pressure at 36 weeks PMA.
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${result.deathOrBPD}%` }}
                />
              </div>
            </div>

            {/* Death or Moderate-to-Severe BPD */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-700">Death or Mod-Severe BPD</span>
                <span className="text-base font-bold text-amber-700">{result.deathOrModSevereBPD}%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Requirement for invasive ventilation or non-invasive positive pressure at 36w PMA.
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-700" 
                  style={{ width: `${result.deathOrModSevereBPD}%` }}
                />
              </div>
            </div>
          </div>

          {/* Component Morbidities */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Specific Postnatal Morbidity Probabilities
            </h5>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Severe ROP (≥Stage 3)</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">{result.severeROP}%</div>
                <div className="text-[10px] text-slate-400">Eye screen protocol</div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Periventricular Leukomalacia</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">{result.pvl}%</div>
                <div className="text-[10px] text-slate-400">Cranial US / MRI</div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Late NEC (Stage 2/3)</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">{result.lateNEC}%</div>
                <div className="text-[10px] text-slate-400">Post-Day {dayOfLife}</div>
              </div>
            </div>
          </div>

          {/* Clinical Interpretation / Parent Counseling Narrative */}
          <div className="bg-indigo-50/70 rounded-xl border border-indigo-100 p-4">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Clinical Counseling Narrative</span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              {result.clinicalInterpretation}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
          <div className="text-[11px] text-slate-500">
            Not independently validated. Use the official CNN tool for patient-specific NOPS predictions.
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExportClick}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 bg-gradient-to-r from-medical-600 to-indigo-600 hover:from-medical-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{copiedNote ? 'Copied to Clipboard!' : 'Send Educational Draft to Note'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNNPostnatalCalculator;
