import React, { useState } from 'react';
import { ImageIcon, Download, Brain, Activity, AlertTriangle } from 'lucide-react';
import { RefImage, WmiGrade } from '../types';
import { ImageCard, Toast } from './Shared';

interface GuideProps {
  refs: RefImage[];
  onUpload: (id: string, file: File) => void;
  onReset: (id: string) => void;
}

const Guide: React.FC<GuideProps> = ({ refs, onUpload, onReset }) => {
  const [showToast, setShowToast] = useState(false);

  const WMI_GRADES: WmiGrade[] = [
    { grade: "Grade 1", desc: "Transient areas of increased periventricular echogenicity (PVE) persisting for ≥ 7 days.", icon: Activity },
    { grade: "Grade 2", desc: "Transient PVE that evolves into small, localized cysts in the fronto-parietal white matter.", icon: AlertTriangle },
    { grade: "Grade 3", desc: "PVE evolving into extensive periventricular cystic lesions in fronto-parieto-occipital white matter.", icon: Brain },
    { grade: "Grade 4", desc: "PVE evolving into extensive cystic lesions in deep white matter or subcortical white matter.", icon: AlertTriangle },
  ];

  const downloadPortable = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="space-y-8 relative">
      {showToast && (
        <Toast 
          message="This feature would generate a standalone HTML file with your embedded custom images for offline use." 
          onClose={() => setShowToast(false)} 
        />
      )}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-slate-100 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ImageIcon className="text-purple-600" />
              Clinical Reference Images
            </h3>
            <p className="text-slate-500 text-sm mt-1">Illustrations provided. Replace with your own images for a custom report.</p>
          </div>
          <button 
            onClick={downloadPortable}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download Portable App
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refs.map((ref) => (
            <ImageCard 
              key={ref.id} 
              reference={ref} 
              onUpload={onUpload}
              onReset={onReset}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Brain className="text-purple-600" />
            White Matter Injury (WMI)
          </h3>
          <div className="space-y-3">
            {WMI_GRADES.map((g, i) => {
              const Icon = g.icon;
              return (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2.5 h-fit rounded-full shadow-sm border border-slate-200">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{g.grade}</div>
                    <div className="text-sm text-slate-600 leading-snug">{g.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="text-red-600" />
            PHVD Definition
          </h3>
          <div className="space-y-4">
            <div className="p-5 border-l-4 border-amber-400 bg-amber-50 rounded-r-lg">
              <h4 className="font-bold text-amber-900 mb-1">Moderate PHVD</h4>
              <p className="text-sm text-amber-800">
                Ventricular Index (VI) &gt; 97th centile AND AHW &gt; 6mm
              </p>
            </div>
            <div className="p-5 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
              <h4 className="font-bold text-red-900 mb-1">Severe PHVD</h4>
              <p className="text-sm text-red-800">
                VI &gt; 97th centile + 4mm OR AHW &gt; 10mm
              </p>
            </div>
            <div className="mt-4 text-xs text-slate-400 italic">
              Note: PHVD (Post-Hemorrhagic Ventricular Dilatation) is graded after the first week of age.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;