import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, FileText, BookOpen, ExternalLink, Calendar, Baby, ShieldCheck } from 'lucide-react';
import { RISK_DATA } from '../riskData';
import { RiskProfile } from '../types';
import RiskVisualizer from './RiskVisualizer';
import CNNPostnatalCalculator from './CNNPostnatalCalculator';
import CNNCalculator from '../../../components/CNNCalculator';
import VONBenchmark from '../../../components/VONBenchmark';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskCalculatorProps {
  initialCategoryId: string;
  onGenerate?: (context: string, categoryId: string, topicName: string) => void;
}

const RiskCalculator: React.FC<RiskCalculatorProps> = ({ initialCategoryId, onGenerate }) => {
  const { t } = useLanguage();
  // Determine valid initial category. If current category has no risk data, default to prematurity.
  const validInitialId = RISK_DATA[initialCategoryId] ? initialCategoryId : 'prematurity';
  
  const [activeCategory, setActiveCategory] = useState(validInitialId);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  
  // Prematurity Sub-Mode: 'postnatal_cnn' (Canadian Neonatal Network NOPS) vs 'antenatal' (Pre-delivery)
  const [prematurityMode, setPrematurityMode] = useState<'postnatal_cnn' | 'antenatal' | 'von' | 'cnn_portal'>('antenatal');

  // Prematurity Slider State
  const [gestationalAge, setGestationalAge] = useState(24);

  useEffect(() => {
    if (RISK_DATA[initialCategoryId]) {
      setActiveCategory(initialCategoryId);
      // Reset selections when category changes externally
      if (RISK_DATA[initialCategoryId].isGestational) {
        setGestationalAge(24);
      } else {
        const firstProfile = Object.keys(RISK_DATA[initialCategoryId].profiles)[0];
        setSelectedProfileId(firstProfile || '');
      }
    }
  }, [initialCategoryId]);

  const currentData = RISK_DATA[activeCategory];
  
  // Determine the raw profile to display
  let displayProfile: RiskProfile | null = null;
  if (currentData) {
    if (currentData.isGestational) {
      displayProfile = currentData.profiles[gestationalAge.toString()] || null;
    } else {
      displayProfile = currentData.profiles[selectedProfileId] || null;
    }
  }

  const handleGenerateClick = () => {
    if (displayProfile && onGenerate) {
      const statsSummary = displayProfile.stats.map(s => `${s.label}: ${s.value}%`).join(', ');
      const managementSummary = displayProfile.managementPath.join('. ');
      
      const context = `Diagnosis/Situation: ${displayProfile.name}. Statistics: ${statsSummary}. Typical Management: ${managementSummary}.`;
      
      onGenerate(context, activeCategory, displayProfile.name);
    }
  };

  const handleCNNExport = (note: string) => {
    if (onGenerate) {
      onGenerate(note, 'prematurity', 'CNN Postnatal Outcomes Prediction');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-800 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h2 className="font-semibold">{t('survivalMorbidities')}</h2>
        </div>
        {activeCategory === 'prematurity' && (
          <a
            href="https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-[11px] bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded transition-colors"
          >
            <span>CNN Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="flex-1 bg-slate-50 p-4 overflow-y-auto border-x border-b border-slate-200 rounded-b-lg flex flex-col relative space-y-4">
        
        <nav aria-label="Survival and outcome tools" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {([{id:'antenatal',label:'CNN Survival and Outcome',detail:'Pre-delivery reference figures: 22-28 weeks'}, {id:'von',label:'VON Survival and Outcome',detail:'Vermont Oxford Network benchmark portal'}, {id:'cnn_portal',label:'CNN Calculator',detail:'Official postnatal NOPS portal'}, {id:'postnatal_cnn',label:'Postnatal Educational Estimates',detail:'Imported illustrative model: Day 7, 14 and 28'}] as const).map(tool => <button key={tool.id} type="button" onClick={()=>setPrematurityMode(tool.id)} aria-pressed={prematurityMode===tool.id} className={`p-3 rounded-lg border text-left ${prematurityMode===tool.id?'bg-blue-50 border-blue-600 text-blue-950':'bg-white border-slate-200 text-slate-700'}`}><span className="block text-sm font-bold">{tool.label}</span><span className="block text-xs mt-1">{tool.detail}</span></button>)}
        </nav>

        {/* Content View Based on Category & Submode */}
        {prematurityMode === 'von' ? (
          <VONBenchmark onSwitchToCNN={() => setPrematurityMode('cnn_portal')} />
        ) : prematurityMode === 'cnn_portal' ? (
          <CNNCalculator onSwitchToBenchmark={() => setPrematurityMode('von')} />
        ) : activeCategory === 'prematurity' && prematurityMode === 'postnatal_cnn' ? (
          <div className="flex-1 animate-in fade-in duration-300">
            <CNNPostnatalCalculator 
              onSendToEMR={handleCNNExport}
              defaultGestationalAge={gestationalAge}
            />
          </div>
        ) : (
          <div className="space-y-6 flex-1">
            <p className="text-sm p-3 bg-amber-50 border border-amber-200 rounded-lg">The figures below are the supplied app's gestation-based reference data. CNN cohort attribution has not been independently verified. Use the official CNN calculator for postnatal NOPS predictions.</p>
            {/* Dynamic Inputs for Antenatal or Other Categories */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              {currentData && currentData.isGestational ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">{t('gestationalAge')}</label>
                    <span className="text-2xl font-bold text-blue-600">
                      {gestationalAge} <span className="text-sm font-normal text-slate-500">{t('weeks')}</span>
                    </span>
                  </div>
                  <input 
                    aria-label="Gestational age in completed weeks"
                    type="range" 
                    min="22" 
                    max="28" 
                    step="1" 
                    value={gestationalAge}
                    onChange={(e) => setGestationalAge(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>22w</span>
                    <span>23w</span>
                    <span>24w</span>
                    <span>25w</span>
                    <span>26w</span>
                    <span>27w</span>
                    <span>28w+</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('selectDiagnosis')}</label>
                  <div className="space-y-2">
                    {currentData && Object.values(currentData.profiles).map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => setSelectedProfileId(profile.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                          selectedProfileId === profile.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {profile.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {displayProfile ? (
              <div className="flex-1">
                <RiskVisualizer profile={displayProfile} />
                {onGenerate && (
                  <button 
                    onClick={handleGenerateClick}
                    className="w-full mt-4 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors shadow-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t('generateNote')}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400 flex-1">
                <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">{t('noData')}</p>
              </div>
            )}
            
            {/* Reference Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>
                <strong>{t('reference')}:</strong> {t('refText')} {t('disclaimer')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskCalculator;
