import React, { useState, useEffect, useRef } from 'react';
import { Copy, RotateCcw, Wand2, Check } from 'lucide-react';
import { generateEnhancedConsult } from '../services/geminiService';
import { LoadingState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { syncGestationReference, syncGestationDraft } from '../utils/gestationContext';
import { mergeCounselingDraft } from '../utils/counselingDraft';

interface TemplateEditorProps {
  initialTemplate: string;
  templateName: string;
  gestationalAge: number;
  autoFillTrigger?: { context: string, timestamp: number } | null;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ initialTemplate, templateName, autoFillTrigger, gestationalAge }) => {
  const { t, language } = useLanguage();
  const [content, setContent] = useState(() => syncGestationReference(initialTemplate.replaceAll('*** weeks', `${gestationalAge} weeks`), gestationalAge));
  const previousGA = useRef(gestationalAge);
  const previousCounseling = useRef('');
  const [needsReview, setNeedsReview] = useState(false);
  const [contextInput, setContextInput] = useState('');
  const [cnnResult, setCnnResult] = useState('');
  const [cnnResultGA, setCnnResultGA] = useState<number | null>(null);
  const attachCNN = (text: string) => {
    const start = '--- OFFICIAL CNN RESULT (USER-ENTERED) ---';
    const end = '--- END OFFICIAL CNN RESULT ---';
    const first = text.indexOf(start), last = text.indexOf(end, first);
    if (first >= 0 && last >= first) text = text.slice(0, first) + text.slice(last + end.length);
    return cnnResult.trim() ? `${text.trimEnd()}\n\n${start}\nSource: official CNN calculator; copied by the user, not independently retrieved or verified. Entered for GA ${cnnResultGA} weeks.\n${cnnResultGA !== gestationalAge ? 'GA HAS CHANGED: rerun the official calculator and replace this result before use.\n' : ''}${cnnResult.trim()}\nhttps://www.canadianneonatalnetwork.org/CAL/Calculator.aspx\n${end}` : text;
  };
  const [aiStatus, setAiStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [copyStatus, setCopyStatus] = useState(false);

  // Reset content when the template changes
  useEffect(() => {
    setContent(syncGestationReference(initialTemplate.replaceAll('*** weeks', `${gestationalAge} weeks`), gestationalAge));
    setContextInput('');
    setAiStatus(LoadingState.IDLE);
  }, [initialTemplate]);

  useEffect(() => {
    if (previousGA.current === gestationalAge) return;
    const oldGA = previousGA.current;
    setContent(current => attachCNN(syncGestationDraft(current, oldGA, gestationalAge)));
    setContextInput(current => current.trim() ? syncGestationDraft(current, oldGA, gestationalAge) : current);
    previousGA.current = gestationalAge;
    setNeedsReview(true);
  }, [gestationalAge]);

  // Handle auto-fill trigger from calculator
  useEffect(() => {
    if (autoFillTrigger && autoFillTrigger.context) {
        setContextInput('');
        
        const runAutoGeneration = async () => {
             setAiStatus(LoadingState.LOADING);
             try {
                // Use the context directly from the trigger to avoid state staleness
                const isCounseling = autoFillTrigger.context.includes('**ANTENATAL CONSULTATION & PARENT COUNSELING DRAFT**');
                const previous = previousCounseling.current;
                setContent(current => attachCNN(syncGestationReference(isCounseling ? mergeCounselingDraft(current, autoFillTrigger.context, previous) : `${current}\n\n${autoFillTrigger.context}`, gestationalAge)));
                if (isCounseling) previousCounseling.current = autoFillTrigger.context;
                setAiStatus(LoadingState.SUCCESS);
             } catch (error) {
                console.error("Template generation error:", error);
                setAiStatus(LoadingState.SUCCESS);
             }
        };
        runAutoGeneration();
    }
  }, [autoFillTrigger, language, initialTemplate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleReset = async () => {
    setContent(attachCNN(syncGestationReference(initialTemplate.replaceAll('*** weeks', `${gestationalAge} weeks`), gestationalAge)));
    setNeedsReview(false);
  };

  const handleAIGenerate = async () => {

    setAiStatus(LoadingState.LOADING);
    try {
      const generated = contextInput.trim() ? `${content}\n\n--- USER-ENTERED CONTEXT ---\n${contextInput.trim()}` : content;
      setContent(attachCNN(syncGestationReference(generated, gestationalAge)));
      setAiStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error("AI generate error:", error);
      setAiStatus(LoadingState.SUCCESS);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <p className="text-sm text-blue-800">Draft for {gestationalAge} completed weeks. {needsReview && 'Gestation changed: your text has been retained. Review prior figures, clinical statements and plans before using the note.'}</p>
      {/* AI Assistant Section */}
      <details className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
        <summary className="cursor-pointer font-semibold">Add an official CNN calculator result</summary>
        <p className="text-xs text-slate-600 my-2">Copy the result with its day of life, inputs and outcome labels from the official CNN calculator, then click Prepare Draft. The embedded calculator cannot transfer results automatically. Antenatal reference figures above are separate and unverified.</p>
        <textarea aria-label="Official CNN calculator result" value={cnnResult} onChange={event => { setCnnResult(event.target.value); setCnnResultGA(gestationalAge); }} className="w-full h-24 border rounded p-2" placeholder="Paste the official result, including inputs and day of life" />
        {cnnResult.trim() && cnnResultGA !== gestationalAge && <p className="text-amber-800 text-xs">GA has changed. Recalculate and replace the CNN result.</p>}
      </details>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Prepare Consult Draft Locally
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={contextInput}
            onChange={(e) => setContextInput(e.target.value)}
            placeholder={t('aiPlaceholder')}
            className="flex-1 rounded-md border-slate-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
          />
          <button
            onClick={handleAIGenerate}
            disabled={aiStatus === LoadingState.LOADING}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-sm"
          >
            {aiStatus === LoadingState.LOADING ? (
              <span className="animate-spin mr-2">⟳</span>
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            Prepare Draft
          </button>
        </div>
        {aiStatus === LoadingState.SUCCESS && (
          <p className="text-emerald-600 text-xs mt-2 font-medium flex items-center">
            <Check className="w-3.5 h-3.5 mr-1" /> Draft prepared; review all missing details.
          </p>
        )}
        {aiStatus === LoadingState.ERROR && (
          <p className="text-red-500 text-xs mt-2">{t('error')}</p>
        )}
      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col relative rounded-lg border border-slate-300 shadow-sm bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
          <span className="text-xs font-mono text-slate-500">{templateName}</span>
          <div className="flex space-x-2">
             <button
              onClick={handleReset}
              className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors"
              title={t('reset')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
                copyStatus 
                ? 'bg-green-100 text-green-700' 
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {copyStatus ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copyStatus ? t('copied') : t('copy')}
            </button>
          </div>
        </div>
        <textarea
          aria-label="Consult note draft"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-100 leading-relaxed text-slate-800"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default TemplateEditor;
