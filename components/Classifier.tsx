import React, { useState } from 'react';
import { 
  Stethoscope, 
  ChevronRight, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Loader, 
  FileText,
  ArrowRight,
  Check,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { generateParentExplanation, generateClinicalReport } from '../services/gemini';
import { RefImage, DiagnosisResult, ClassificationStep } from '../types';
import { ImageCard, GeneratedContent } from './Shared';

interface ClassifierProps {
  refs: RefImage[];
}

interface HistoryItem {
  step: number;
  answer: string;
  value: string;
  tempResult?: string;
}

const CLASSIFICATION_STEPS: ClassificationStep[] = [
  {
    id: 1,
    question: "Is there hemorrhage within/around the germinal matrix AND/OR within the lateral, 3rd, or 4th ventricle?",
    options: [
      { label: "No", next: 4, value: "no_hemorrhage" },
      { label: "Yes", next: 2, value: "hemorrhage_present" }
    ],
    info: "Look for echogenicity (brightness) higher than choroid plexus."
  },
  {
    id: 2,
    question: "Is the hemorrhage confined to the germinal matrix region?",
    options: [
      { label: "Yes (Confined)", next: 4, result: "Grade I GMH-IVH", value: "confined" },
      { label: "No (In Ventricle)", next: 3, value: "in_ventricle" }
    ],
    info: "Check if blood is restricted to the notch or extends into the ventricular cavity."
  },
  {
    id: 3,
    question: "Is the IVH distending the ipsilateral lateral ventricle (>50%) AND the AHW measures > 6mm?",
    options: [
      { label: "No (<50% or AHW ≤ 6mm)", next: 4, result: "Grade II GMH-IVH", value: "grade_2" },
      { label: "Yes (>50% and AHW > 6mm)", next: 4, result: "Grade III GMH-IVH", value: "grade_3" }
    ],
    info: "Anterior Horn Width (AHW) is measured diagonally at the widest point in coronal plane at foramen of Monro."
  },
  {
    id: 4,
    question: "Is focal echogenicity present in the periventricular white matter ipsilateral to the injury?",
    options: [
      { label: "No", end: true, value: "no_pve" },
      { label: "Yes", end: true, value: "pve_present" }
    ],
    info: "Look for fan-shaped echodensity adjacent to the ventricle."
  }
];

const Classifier: React.FC<ClassifierProps> = ({ refs }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [finalDiagnosis, setFinalDiagnosis] = useState<DiagnosisResult | null>(null);
  
  const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [aiType, setAiType] = useState<'explanation' | 'report' | null>(null);

  const handleOption = (option: any) => {
    // 1. Visual feedback immediately
    setSelectedOptionValue(option.value);

    // 2. Delayed state update to allow animation to play
    setTimeout(() => {
        const newHistory = [...history, { step: currentStep, answer: option.label, value: option.value, tempResult: option.result }];
        setHistory(newHistory);
        setSelectedOptionValue(null);

        if (option.end) {
          determineDiagnosis(newHistory, option.value);
        } else if (option.next) {
          setCurrentStep(option.next);
        }
    }, 400);
  };

  const handleBack = () => {
    // If we are looking at a final diagnosis, we want to go back to the step that led us here.
    if (finalDiagnosis) {
        setFinalDiagnosis(null);
        setAiContent(null);
        // The last history item is the one that completed the flow.
        const lastAction = history[history.length - 1];
        if (lastAction) {
            setCurrentStep(lastAction.step);
            setHistory(prev => prev.slice(0, -1));
        }
        return;
    }

    // Normal navigation back
    if (history.length > 0) {
        const previous = history[history.length - 1];
        setCurrentStep(previous.step);
        setHistory(prev => prev.slice(0, -1));
    }
  };

  const determineDiagnosis = (hist: HistoryItem[], lastValue: string) => {
    const hasHemorrhage = hist.find(h => h.step === 1)?.value === "hemorrhage_present";
    const pvePresent = lastValue === "pve_present";
    
    let provisional = "Normal";
    const grade1 = hist.find(h => h.step === 2)?.value === "confined";
    const grade2 = hist.find(h => h.step === 3)?.value === "grade_2";
    const grade3 = hist.find(h => h.step === 3)?.value === "grade_3";

    if (grade1) provisional = "Grade I GMH-IVH";
    if (grade2) provisional = "Grade II GMH-IVH";
    if (grade3) provisional = "Grade III GMH-IVH";
    if (!hasHemorrhage) provisional = "No GMH-IVH";

    let diagnosis = provisional;
    let description = "No significant findings.";
    let type: DiagnosisResult['type'] = "success";

    if (pvePresent) {
      if (hasHemorrhage) {
        diagnosis = "Periventricular Hemorrhagic Infarction (PVHI)";
        description = "Patient has Grade III GMH-IVH complicated by ipsilateral parenchymal involvement (Venous Infarction).";
        type = "critical";
      } else {
        diagnosis = "Ischemic White Matter Injury";
        description = "Focal echogenicity without IVH suggests primary ischemic injury rather than hemorrhagic extension.";
        type = "warning";
      }
    } else {
      if (provisional === "Grade III GMH-IVH") {
        diagnosis = "Grade III GMH-IVH";
        description = "Acute ventricular dilatation > 6mm or >50% ventricular filling.";
        type = "danger";
      } else if (provisional === "Grade II GMH-IVH") {
        diagnosis = "Grade II GMH-IVH";
        description = "Hemorrhage identified without parenchymal extension.";
        type = "warning";
      } else if (provisional === "Grade I GMH-IVH") {
        diagnosis = "Grade I GMH-IVH";
        description = "Hemorrhage identified without parenchymal extension.";
        type = "warning";
      } else {
         diagnosis = "No GMH-IVH";
      }
    }

    // Track usage stats
    try {
      const currentCount = parseInt(localStorage.getItem('stats_classifications') || '0');
      localStorage.setItem('stats_classifications', (currentCount + 1).toString());
      window.dispatchEvent(new Event('stats_updated'));
    } catch (e) {
      console.error("Failed to update stats", e);
    }

    setFinalDiagnosis({ title: diagnosis, desc: description, type });
  };

  const reset = () => {
    setCurrentStep(1);
    setHistory([]);
    setFinalDiagnosis(null);
    setAiContent(null);
    setAiLoading(false);
    setSelectedOptionValue(null);
  };

  const handleGenerateExplanation = async () => {
    if (!finalDiagnosis) return;
    setAiLoading(true);
    setAiType('explanation');
    setAiContent(null);

    const text = await generateParentExplanation(finalDiagnosis);
    setAiContent(text);
    setAiLoading(false);
  };

  const handleGenerateReport = async () => {
    if (!finalDiagnosis) return;
    setAiLoading(true);
    setAiType('report');
    setAiContent(null);

    // Track usage stats for report
    try {
        const currentCount = parseInt(localStorage.getItem('stats_reports') || '0');
        localStorage.setItem('stats_reports', (currentCount + 1).toString());
        window.dispatchEvent(new Event('stats_updated'));
    } catch (e) { console.error(e); }

    const text = await generateClinicalReport(finalDiagnosis);
    setAiContent(text);
    setAiLoading(false);
  };

  const getDiagnosisRef = (title?: string) => {
    if (!title) return null;
    if (title.includes("Grade I ")) return refs.find(r => r.id === 'g1');
    if (title.includes("Grade II ")) return refs.find(r => r.id === 'g2');
    if (title.includes("Grade III ")) return refs.find(r => r.id === 'g3');
    if (title.includes("PVHI")) return refs.find(r => r.id === 'pvhi');
    if (title.includes("White Matter")) return refs.find(r => r.id === 'wmi');
    return null;
  };

  const diagnosisRef = getDiagnosisRef(finalDiagnosis?.title);
  const stepData = CLASSIFICATION_STEPS.find(s => s.id === currentStep);

  // Styling helpers
  const getHeaderColor = (type: string) => {
    switch(type) {
      case 'critical': return 'bg-gradient-to-r from-red-500 to-rose-600';
      case 'danger': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'warning': return 'bg-gradient-to-r from-amber-400 to-orange-500';
      default: return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    }
  };

  const getResultIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className={`w-12 h-12 text-emerald-500`} />;
      default: return <AlertTriangle className={`w-12 h-12 ${type === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />;
    }
  };

  const progress = ((currentStep - 1) / CLASSIFICATION_STEPS.length) * 100;

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200/60 p-0 max-w-2xl mx-auto overflow-hidden transition-all duration-300">
      
      {/* Header Section */}
      <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          {(history.length > 0 || finalDiagnosis) ? (
            <button 
                onClick={handleBack} 
                className="p-2 -ml-2 rounded-lg hover:bg-slate-200/50 text-slate-500 hover:text-slate-700 transition-colors"
                title="Go Back"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Stethoscope className="w-6 h-6" />
            </div>
          )}
          <h2 className="text-xl font-bold text-slate-800">
            {finalDiagnosis ? "Assessment Result" : "Diagnostic Assessment"}
          </h2>
        </div>

        {!finalDiagnosis && (
          <button onClick={reset} className="relative z-10 text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 group">
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500" />
            Reset
          </button>
        )}
        
        {/* Progress Bar (Only visible during steps) */}
        {!finalDiagnosis && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100">
             <div 
               className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        {!finalDiagnosis ? (
          stepData && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-100">
                  Step {currentStep} of {CLASSIFICATION_STEPS.length}
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
                {stepData.question}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stepData.options.map((opt, idx) => {
                  const isSelected = selectedOptionValue === opt.value;
                  const isOtherSelected = selectedOptionValue !== null && !isSelected;

                  return (
                    <button
                        key={idx}
                        onClick={() => !selectedOptionValue && handleOption(opt)}
                        disabled={selectedOptionValue !== null}
                        className={`relative group p-6 text-left border rounded-xl transition-all duration-300 shadow-sm overflow-hidden
                            ${isSelected 
                                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200 shadow-lg scale-[1.02]' 
                                : 'border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1'
                            }
                            ${isOtherSelected ? 'opacity-50 grayscale' : 'opacity-100'}
                        `}
                    >
                        {/* Decorative Background for Hover */}
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 
                            ${isSelected ? 'scale-150' : 'group-hover:scale-150'}
                        `}></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <span className={`font-bold text-lg flex items-center gap-2 transition-colors
                                ${isSelected ? 'text-blue-900' : 'text-slate-700 group-hover:text-blue-800'}
                            `}>
                            {opt.label.startsWith('Yes') && <Check className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-emerald-500'}`} />}
                            {opt.label}
                            </span>
                            <div className="flex justify-end">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                                ${isSelected ? 'bg-blue-600' : 'bg-slate-100 group-hover:bg-blue-600'}
                            `}>
                                <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                            </div>
                            </div>
                        </div>
                    </button>
                  );
                })}
              </div>
              
              {stepData.info && (
                <div className="mt-8 bg-slate-50 p-5 rounded-xl flex gap-4 text-sm text-slate-600 border border-slate-100 shadow-sm">
                  <div className="bg-white p-2 rounded-lg h-fit shadow-sm text-blue-500">
                    <Info className="w-5 h-5" />
                  </div>
                  <div className="leading-relaxed py-1">
                    <span className="font-semibold text-slate-900 block mb-1">Clinical Note</span>
                    {stepData.info}
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="animate-in zoom-in duration-300">
            {/* Result Card Header */}
            <div className="relative mb-12 text-center">
              <div className={`absolute -top-16 -left-8 -right-8 h-32 ${getHeaderColor(finalDiagnosis.type)} opacity-10 rounded-b-[50%] blur-3xl`}></div>
              
              <div className="relative inline-flex mb-6">
                <div className="bg-white p-4 rounded-full shadow-xl shadow-slate-200 border-4 border-white">
                  {getResultIcon(finalDiagnosis.type)}
                </div>
              </div>

              <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {finalDiagnosis.title}
              </h3>
              <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
                {finalDiagnosis.desc}
              </p>
            </div>
            
            {diagnosisRef && (
              <div className="mt-8 mb-10 bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-slate-300 rounded-full"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reference Appearance</p>
                  </div>
                  <div className="max-w-sm mx-auto shadow-lg rounded-xl overflow-hidden bg-white">
                    <ImageCard reference={diagnosisRef} onUpload={() => {}} onReset={() => {}} readOnly={true} />
                  </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <button
                onClick={handleGenerateExplanation}
                disabled={aiLoading}
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 text-indigo-700 p-4 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all text-left flex flex-col justify-between h-24"
              >
                <div className="flex items-center gap-2">
                   <Sparkles className="w-5 h-5 text-indigo-500" />
                   <span>Parent Explanation</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-xs font-normal text-indigo-400">Generate script</span>
                   {aiLoading && aiType === 'explanation' ? <Loader className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />}
                </div>
              </button>

              <button
                onClick={handleGenerateReport}
                disabled={aiLoading}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-200 text-slate-700 p-4 rounded-xl font-bold hover:shadow-lg hover:shadow-slate-500/10 hover:border-slate-300 transition-all text-left flex flex-col justify-between h-24"
              >
                <div className="flex items-center gap-2">
                   <FileText className="w-5 h-5 text-slate-500" />
                   <span>Draft Report</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-xs font-normal text-slate-400">Clinical summary</span>
                   {aiLoading && aiType === 'report' ? <Loader className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />}
                </div>
              </button>
            </div>
            
            <button
              onClick={reset}
              className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Start New Case
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {aiContent && (
              <GeneratedContent 
                  title={aiType === 'explanation' ? "Parent Explanation Script" : "Draft Clinical Report"}
                  content={aiContent}
                  onClose={() => setAiContent(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classifier;