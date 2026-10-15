import React, { useEffect, useState } from 'react';
import { RiskProfile, RiskStat } from '../types';
import { Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskVisualizerProps {
  profile: RiskProfile;
}

const ProgressBar: React.FC<{ stat: RiskStat }> = ({ stat }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Small delay for animation effect
    const timer = setTimeout(() => setWidth(stat.value), 100);
    return () => clearTimeout(timer);
  }, [stat.value]);

  let barColor = 'bg-slate-500';
  if (stat.color) barColor = stat.color;
  else if (stat.type === 'survival') barColor = 'bg-emerald-500';
  else if (stat.type === 'morbidity') barColor = 'bg-rose-500';
  else if (stat.type === 'neutral') barColor = 'bg-amber-500';

  return (
    <div className="mb-5 group">
      <div className="flex justify-between items-end mb-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-slate-700">{stat.label}</span>
          {stat.description && (
             <div className="relative group-hover:block">
               <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
             </div>
          )}
        </div>
        <span className="text-sm font-bold text-slate-900">{stat.value}%</span>
      </div>
      
      {/* Tooltip for description */}
      {stat.description && (
        <div className="hidden group-hover:block text-xs text-slate-500 italic mb-1">
          {stat.description}
        </div>
      )}

      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

const RiskVisualizer: React.FC<RiskVisualizerProps> = ({ profile }) => {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          {profile.name} - {t('outcomeProjections')}
        </h3>
        
        <div className="space-y-2">
          {profile.stats.map((stat, idx) => (
            <ProgressBar key={`${profile.id}-${idx}`} stat={stat} />
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5">
        <h4 className="text-indigo-900 font-semibold mb-3 text-sm uppercase tracking-wide">
          {t('typicalManagement')}
        </h4>
        <ul className="space-y-2">
          {profile.managementPath.map((step, idx) => (
            <li key={idx} className="flex items-start text-sm text-indigo-800">
              <span className="inline-block w-5 h-5 bg-indigo-200 text-indigo-700 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                {idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskVisualizer;