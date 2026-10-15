import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Wand2, Check } from 'lucide-react';
import { generateEnhancedConsult } from '../services/geminiService';
import { LoadingState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TemplateEditorProps {
  initialTemplate: string;
  templateName: string;
  autoFillTrigger?: { context: string, timestamp: number } | null;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ initialTemplate, templateName, autoFillTrigger }) => {
  const { t, language } = useLanguage();
  const [content, setContent] = useState(initialTemplate);
  const [contextInput, setContextInput] = useState('');
  const [aiStatus, setAiStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [copyStatus, setCopyStatus] = useState(false);

  // Reset content when the template changes
  useEffect(() => {
    setContent(initialTemplate);
    setContextInput('');
    setAiStatus(LoadingState.IDLE);
  }, [initialTemplate]);

  // Handle auto-fill trigger from calculator
  useEffect(() => {
    if (autoFillTrigger && autoFillTrigger.context) {
        setContextInput(autoFillTrigger.context);
        
        const runAutoGeneration = async () => {
             setAiStatus(LoadingState.LOADING);
             try {
                // Use the context directly from the trigger to avoid state staleness
                const generated = await generateEnhancedConsult(initialTemplate, autoFillTrigger.context, language);
                setContent(generated);
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
    setContent(initialTemplate);
  };

  const handleAIGenerate = async () => {
    if (!contextInput.trim()) return;

    setAiStatus(LoadingState.LOADING);
    try {
      const generated = await generateEnhancedConsult(initialTemplate, contextInput, language);
      setContent(generated);
      setAiStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error("AI generate error:", error);
      setAiStatus(LoadingState.SUCCESS);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* AI Assistant Section */}
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
            disabled={aiStatus === LoadingState.LOADING || !contextInput}
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