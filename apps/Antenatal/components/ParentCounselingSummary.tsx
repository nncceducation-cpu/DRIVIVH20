import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HeartHandshake, 
  ShieldCheck, 
  Activity, 
  Users, 
  BookOpen
} from 'lucide-react';
import { PARENT_COUNSELING_DATABASE, FAQItem, StructuredConsultSummary } from '../data/counselingData';
import { useLanguage } from '../contexts/LanguageContext';

interface ParentCounselingSummaryProps {
  categoryId: string;
  categoryTitle: string;
  onSendToEMR: (formattedNote: string) => void;
}

export const ParentCounselingSummary: React.FC<ParentCounselingSummaryProps> = ({
  categoryId,
  categoryTitle,
  onSendToEMR
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaqIds, setSelectedFaqIds] = useState<string[]>([]);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'faqs'>('summary');
  const [parentName, setParentName] = useState('');
  const [decisionChoice, setDecisionChoice] = useState<'active' | 'palliative' | 'pending'>('pending');

  const data: StructuredConsultSummary = PARENT_COUNSELING_DATABASE[categoryId] || PARENT_COUNSELING_DATABASE['prematurity'];

  const toggleFaqSelection = (id: string) => {
    setSelectedFaqIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedFaqId(prev => prev === id ? null : id);
  };

  const filteredFaqs = data.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateAndExport = () => {
    const selectedFaqItems = data.faqs.filter(f => selectedFaqIds.includes(f.id));

    let note = `**ANTENATAL CONSULTATION & PARENT COUNSELING DRAFT**\n`;
    note += `**Category / Topic:** ${categoryTitle}\n`;
    if (parentName) {
      note += `**Parents/Support Present:** ${parentName}\n`;
    }
    note += `\n--- CLINICAL & DIAGNOSTIC SUMMARY ---\n`;
    note += `${data.diagnosticSummary}\n\n`;

    note += `--- PERINATAL & DELIVERY ROOM PLAN ---\n`;
    note += `${data.deliveryRoomPlan}\n\n`;

    note += `--- NICU COURSE & INPATIENT EXPECTATIONS ---\n`;
    note += `${data.nicuExpectations}\n\n`;

    note += `--- PROGNOSIS & LONG-TERM OUTCOMES ---\n`;
    note += `${data.longTermPrognosis}\n\n`;

    note += `--- PARENT COUNSELING & COMMUNICATION RECORD ---\n`;
    note += `**Resuscitation / Care Path Decision:** ${
      decisionChoice === 'active' 
        ? 'Active Planned Resuscitation & Full Intervention' 
        : decisionChoice === 'palliative' 
          ? 'Palliative Comfort Care Plan (Birth Plan documented)' 
          : 'Pending family deliberation following multidisciplinary review'
    }\n\n`;

    note += `**Suggested Information & Guidance to Review:**\n`;
    data.communicationKeyPoints.forEach(pt => {
      note += `- ${pt}\n`;
    });

    if (selectedFaqItems.length > 0) {
      note += `\n**Selected Parent Questions to Review:**\n`;
      selectedFaqItems.forEach((faq, idx) => {
        note += `\n${idx + 1}. **Q:** "${faq.question}"\n   **Suggested Counseling:** ${faq.answer}\n`;
      });
    } else {
      note += `\n**Specific Parent Questions Addressed:** *** Complete after discussion.\n`;
    }

    note += `\n**PLAN & ANCILLARY SUPPORT:**\n`;
    note += `- Maternal medical record documentation: ***\n`;
    note += `- Neonatal team notification: ***\n`;
    note += `- Referrals and social work support: ***\n`;

    onSendToEMR(note);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-5 h-5 text-medical-400" />
            <h3 className="font-bold text-lg text-white">Detailed Structured Summary & Parent Counseling</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized consult framework & evidence-based parent Q&A (Davies et al., Antenatal Consults)
          </p>
        </div>

        <button
          onClick={handleGenerateAndExport}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-medical-600 to-indigo-600 hover:from-medical-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Send Draft to Consult Note</span>
        </button>
      </div>

      {/* Control Bar: Mode Toggle & Inputs */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'summary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Structured Clinical Summary</span>
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'faqs' ? 'bg-white text-medical-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Parent FAQs ({selectedFaqIds.length} Selected)</span>
            </button>
          </div>

          {/* Decision Selection */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="font-semibold text-slate-600">Care Goal:</span>
            <select
              aria-label="Care goal"
              value={decisionChoice}
              onChange={(e) => setDecisionChoice(e.target.value as any)}
              className="bg-white border border-slate-300 text-slate-800 rounded-md px-2 py-1 font-medium focus:ring-2 focus:ring-medical-500 outline-none"
            >
              <option value="active">Active Planned Resuscitation</option>
              <option value="palliative">Palliative Comfort Care</option>
              <option value="pending">Pending Family Deliberation</option>
            </select>
          </div>
        </div>

        {/* Optional Parent Name Input */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 font-medium">Parents/Support Name(s):</span>
          <input
            aria-label="Parents or support present"
            type="text"
            placeholder="e.g. Sarah & Mark Miller"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="min-w-0 flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-medical-500 outline-none"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
        {activeTab === 'summary' ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 1. Diagnostic Summary */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-blue-800 font-bold text-sm mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <h4>1. Diagnostic & Clinical Overview</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.diagnosticSummary}
              </p>
            </div>

            {/* 2. Delivery Room Plan */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm mb-2">
                <Activity className="w-4 h-4 text-amber-600" />
                <h4>2. Immediate Perinatal & Delivery Room Plan</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.deliveryRoomPlan}
              </p>
            </div>

            {/* 3. NICU Course */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-purple-800 font-bold text-sm mb-2">
                <Users className="w-4 h-4 text-purple-600" />
                <h4>3. Inpatient & NICU Expectations</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.nicuExpectations}
              </p>
            </div>

            {/* 4. Prognosis */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4>4. Survival & Neurodevelopmental Prognosis</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.longTermPrognosis}
              </p>
            </div>

            {/* 5. Key Counseling Points */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Key Parent Communication Checklist (Davies et al. Table 1.3)
              </h4>
              <ul className="space-y-2">
                {data.communicationKeyPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start">
                    <span className="text-medical-600 font-bold mr-2">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search parent questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-medical-500 outline-none"
              />
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isSelected = selectedFaqIds.includes(faq.id);
                const isExpanded = expandedFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`border rounded-xl transition-all ${
                      isSelected 
                        ? 'border-medical-500 bg-medical-50/20 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="p-3 sm:p-4 flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <button
                          onClick={() => toggleFaqSelection(faq.id)}
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                            isSelected 
                              ? 'bg-medical-600 border-medical-600 text-white' 
                              : 'bg-white border-slate-300 hover:border-medical-400'
                          }`}
                          title={isSelected ? 'Deselect from Note' : 'Select to include in EMR Note'}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>

                        <div className="cursor-pointer flex-1" onClick={() => toggleExpand(faq.id)}>
                          <h5 className="text-xs font-bold text-slate-800 leading-snug">
                            {faq.question}
                          </h5>
                          <span className="text-[10px] text-slate-400 mt-0.5 inline-block">
                            Ref: {faq.evidenceRef}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleExpand(faq.id)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-700 leading-relaxed bg-slate-50/50 rounded-b-xl">
                        <div className="font-semibold text-medical-800 mb-1">
                          Counseling Response:
                        </div>
                        <p>{faq.answer}</p>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => toggleFaqSelection(faq.id)}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all ${
                              isSelected
                                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                : 'bg-medical-100 text-medical-800 hover:bg-medical-200'
                            }`}
                          >
                            {isSelected ? 'Remove from EMR Note' : '+ Add to EMR Note'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  No matching parent questions found for "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          <span className="font-bold text-slate-700">{selectedFaqIds.length}</span> specific parent Q&A(s) selected for inclusion in EMR note.
        </div>

        <button
          onClick={handleGenerateAndExport}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-medical-600 hover:bg-medical-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Prepare Full Consult Draft</span>
        </button>
      </div>
    </div>
  );
};

export default ParentCounselingSummary;
