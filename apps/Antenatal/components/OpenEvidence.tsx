import React from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface OpenEvidenceProps {
  topic: string;
  categoryId: string;
}

const getDefaultQuery = (categoryId: string, topic: string) => {
  switch (categoryId) {
    case 'prematurity':
      return 'What are the neurodevelopmental outcomes and survival rates for extreme prematurity (22-26 weeks gestation)?';
    case 'neurology':
      return 'What is the prognosis and management of severe intraventricular hemorrhage (IVH) and periventricular leukomalacia (PVL) in premature infants?';
    case 'cardiology':
      return 'What is the evidence-based management of patent ductus arteriosus (PDA) in extremely low birth weight infants?';
    case 'pulmonology':
      return 'What are the optimal prevention and ventilation strategies for bronchopulmonary dysplasia (BPD)?';
    case 'gastroenterology':
      return 'What are the risk factors and management guidelines for necrotizing enterocolitis (NEC) in premature infants?';
    default:
      return `What are the latest clinical guidelines and outcomes for ${topic} in neonatology?`;
  }
};

const OpenEvidence: React.FC<OpenEvidenceProps> = ({ topic, categoryId }) => {
  const { t } = useLanguage();
  
  const query = getDefaultQuery(categoryId, topic);
  const openEvidenceUrl = `https://www.openevidence.com/?mode=snow&q=${encodeURIComponent(query)}`;

  return (
    <div className="mt-8 bg-white rounded-lg border border-slate-200 shadow-sm p-0 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
             <Search className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Open Evidence</h3>
            <p className="text-xs text-slate-500">AI-powered medical evidence (Sign in required)</p>
          </div>
        </div>
        <a 
          href={openEvidenceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors border border-blue-200 flex-shrink-0"
        >
          <span>Open in New Tab</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 w-full bg-slate-100 relative">
        <iframe 
          src={openEvidenceUrl} 
          className="w-full h-full border-0 absolute inset-0"
          title="Open Evidence"
        />
      </div>
    </div>
  );
};

export default OpenEvidence;