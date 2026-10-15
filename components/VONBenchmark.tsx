import React from 'react';
import { BarChart2, Calculator, ExternalLink } from 'lucide-react';

export default function VONBenchmark({ onSwitchToCNN, cnnLabel = 'CNN Calculator' }: { onSwitchToCNN: () => void; cnnLabel?: string }) {
  return (
          <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[600px]">
             <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
                <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-full text-blue-600 border border-blue-200">
                      <BarChart2 size={20} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800">VON Survival and Outcome</h3>
                        <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                          Vermont Oxford Network
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Interactive benchmarking & neonatal quality metrics</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button
                     onClick={() => onSwitchToCNN()}
                     className="flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900 bg-red-50 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg hover:bg-red-100 transition-all shadow-sm"
                     title="Switch to Canadian Neonatal Network (CNN) Calculator"
                   >
                      <Calculator size={14} className="text-red-600" />
                      <span>{cnnLabel}</span>
                   </button>
                   <a 
                     href="https://von-reference-benchmark-tool-915899500738.us-west1.run.app/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-bold bg-white border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all shadow-sm"
                   >
                      Open in New Window <ExternalLink size={14} />
                   </a>
                </div>
             </div>
             <div className="flex-1 relative bg-slate-100">
                <iframe 
                  src="https://von-reference-benchmark-tool-915899500738.us-west1.run.app/"
                  title="VON Survival and Outcome"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
             </div>
          </div>
  );
}
