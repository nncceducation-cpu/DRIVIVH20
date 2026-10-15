import React, { useState } from 'react';
import { Baby, BookOpen, Activity, HeartHandshake, Languages, ExternalLink } from 'lucide-react';
import { CONSULT_DATA } from './constants';
import ReferenceTable from './components/ReferenceTable';
import RiskCalculator from './components/RiskCalculator';
import ParentCounselingSummary from './components/ParentCounselingSummary';
import TemplateEditor from './components/TemplateEditor';
import OpenEvidence from './components/OpenEvidence';
import { LanguageProvider } from './contexts/LanguageContext';
import PersistentPanel from '../../components/PersistentPanel';
import ExternalToolFrame from '../../components/ExternalToolFrame';
import './index.css';

const prematurity = CONSULT_DATA.find(category => category.id === 'prematurity')!;
function AntenatalConsult() {
  const [view, setView] = useState<'guidelines' | 'outcomes' | 'counseling' | 'neolingo'>('counseling');
  const [note, setNote] = useState<{context: string; timestamp: number} | null>(null);
  const sendToNote = (context: string) => setNote({ context, timestamp: Date.now() });
  return <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6">
    <header className="flex items-center gap-3 mb-4"><Baby className="text-blue-700" size={30}/><div><h1 className="text-2xl font-bold">Antenatal Consult</h1><p className="text-sm text-slate-600">Prematurity: counseling, survival and outcomes, and consultation drafts</p></div></header>
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950 mb-4">Reference content and gestation-based figures are copied from the supplied NeoConsult app. They are population estimates, not individualized predictions. Confirm the applicable cohort and local care pathway. Notes remain editable drafts; missing patient details stay unfilled.</div>
    <nav aria-label="Antenatal Consult sections" className="flex flex-wrap gap-2 mb-5">
      {([{id:'guidelines',label:'Prematurity Guidelines',icon:BookOpen},{id:'outcomes',label:'Survival and Outcomes',icon:Activity},{id:'counseling',label:'Structured Summary and Parent FAQs',icon:HeartHandshake},{id:'neolingo',label:'NeoLingo',icon:Languages}] as const).map(tab => <button key={tab.id} onClick={()=>setView(tab.id)} aria-pressed={view===tab.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border ${view===tab.id?'bg-blue-700 border-blue-700 text-white':'bg-white border-slate-200 text-slate-700'}`}><tab.icon size={17}/>{tab.label}</button>)}
    </nav>
    <PersistentPanel active={view==='neolingo'}>
      <section className="flex flex-col min-h-[700px] rounded-xl overflow-hidden border border-slate-200 bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border-b border-slate-200 p-4"><h2 className="text-lg font-bold flex items-center gap-2"><Languages size={20}/>NeoLingo</h2><a href="https://neolingo.calnncc.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-700 underline">Open NeoLingo separately <ExternalLink size={14}/></a></header>
        <ExternalToolFrame url="https://neolingo.calnncc.chatgpt.site/" title="NeoLingo" allow="microphone; autoplay; clipboard-write" />
      </section>
    </PersistentPanel>
    <div hidden={view==='neolingo'} className={`grid gap-6 ${view==='outcomes'?'grid-cols-1':'grid-cols-1 xl:grid-cols-2'}`}>
      <div>
        <div hidden={view!=='guidelines'} className="space-y-6">
          <h2 className="text-xl font-bold">Prematurity Quick Reference</h2>
          <ReferenceTable data={prematurity.referenceData} colorClass={prematurity.color} onRowSelect={(topic,details)=>sendToNote(`Reference selected: ${topic}. ${details}`)}/>
          <section className="rounded-xl bg-white border border-slate-200 p-5 space-y-4"><h2 className="text-lg font-bold">Factors Affecting Survival and Disability</h2><div className="grid sm:grid-cols-2 gap-5">{(['worsen','improve'] as const).map(group=><div key={group}><h3 className="font-semibold capitalize mb-2">{group}</h3><ul className="list-disc pl-5 space-y-2 text-sm">{prematurity.counsellingFactors?.[group].map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>
          <section className="rounded-xl bg-white border border-slate-200 p-5 overflow-x-auto"><h2 className="text-lg font-bold mb-4">Intensive vs. Palliative Care</h2><table className="w-full text-sm text-left"><thead><tr><th className="p-2">Feature</th><th className="p-2">Intensive Care</th><th className="p-2">Palliative Comfort Care</th></tr></thead><tbody>{prematurity.careComparison?.map(row=><tr key={row.feature} className="border-t"><th className="p-2">{row.feature}</th><td className="p-2">{row.intensive}</td><td className="p-2">{row.palliative}</td></tr>)}</tbody></table></section>
          {view==='guidelines' && <OpenEvidence topic="Prematurity" categoryId="prematurity"/>}
        </div>
        <div hidden={view!=='outcomes'}><RiskCalculator initialCategoryId="prematurity" onGenerate={context=>sendToNote(context)}/></div>
        <div hidden={view!=='counseling'}><ParentCounselingSummary categoryId="prematurity" categoryTitle="Prematurity" onSendToEMR={sendToNote}/></div>
      </div>
      <section className="h-[720px] flex flex-col min-w-0"><h2 className="text-lg font-bold mb-3">Editable Consult Note</h2><TemplateEditor initialTemplate={prematurity.templateContent} templateName={prematurity.templateName} autoFillTrigger={note}/></section>
    </div>
  </div>;
}
export default function App(){ return <LanguageProvider><AntenatalConsult/></LanguageProvider>; }
