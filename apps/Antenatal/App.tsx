import React, { useState, useEffect } from 'react';
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
import { getGestationContext } from './utils/gestationContext';

const prematurity = CONSULT_DATA.find(category => category.id === 'prematurity')!;
function AntenatalConsult() {
  const [view, setView] = useState<'guidelines' | 'outcomes' | 'counseling' | 'neolingo'>('counseling');
  const [note, setNote] = useState<{context: string; timestamp: number} | null>(null);
  const [gestationalAge, setGestationalAge] = useState(24);
  const [neoSeparate, setNeoSeparate] = useState(false);
  const [parentActive, setParentActive] = useState(true);
  useEffect(() => {
    const visibility = (event: MessageEvent) => {
      if (event.source === window.parent && event.origin === window.location.origin && event.data?.type === 'DRIVIVH_TOOL_VISIBILITY') setParentActive(event.data.active === true);
    };
    window.addEventListener('message', visibility);
    return () => window.removeEventListener('message', visibility);
  }, []);
  const selected = getGestationContext(gestationalAge);
  const referenceData = { ...prematurity.referenceData, headers: ['Gestation', 'Survival (imported reference)', 'NDD (imported reference)', 'Management Pathway'], rows: [22,23,24,25,26,27,28].map(week => {
    const profile = getGestationContext(week).profile;
    return { Gestation: `${week} Weeks`, 'Survival (imported reference)': `${profile.stats[0].value}%`, 'NDD (imported reference)': `${profile.stats[1].value}% (${profile.stats[1].label})`, 'Management Pathway': prematurity.referenceData.rows[week < 26 ? week - 22 : 4]['Management Pathway'] };
  }) };
  const sendToNote = (context: string) => setNote({ context, timestamp: Date.now() });
  return <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6">
    <header className="flex items-center gap-3 mb-4"><Baby className="text-blue-700" size={30}/><div><h1 className="text-2xl font-bold">Antenatal Consult</h1><p className="text-sm text-slate-600">Prematurity: counseling, survival and outcomes, and consultation drafts</p></div></header>
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950 mb-4">Reference content and gestation-based figures are copied from the supplied NeoConsult app. They are population estimates, not individualized predictions. Confirm the applicable cohort and local care pathway. Notes remain editable drafts; missing patient details stay unfilled.</div>
    <label className="flex flex-wrap items-center gap-3 mb-5 text-sm font-semibold">Selected gestational age<select aria-label="Selected gestational age" value={gestationalAge} onChange={event => setGestationalAge(Number(event.target.value))} className="border border-blue-300 rounded-lg bg-white p-2">{[22,23,24,25,26,27,28].map(week => <option key={week} value={week}>{week} completed weeks</option>)}</select><span className="font-normal text-slate-600">Shared across guidelines, outcomes, counseling and drafts.</span></label>
    <nav aria-label="Antenatal Consult sections" className="flex flex-wrap gap-2 mb-5">
      {([{id:'guidelines',label:'Prematurity Guidelines',icon:BookOpen},{id:'outcomes',label:'Survival and Outcomes',icon:Activity},{id:'counseling',label:'Structured Summary and Parent FAQs',icon:HeartHandshake},{id:'neolingo',label:'NeoLingo',icon:Languages}] as const).map(tab => <button key={tab.id} onClick={()=>setView(tab.id)} aria-pressed={view===tab.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border ${view===tab.id?'bg-blue-700 border-blue-700 text-white':'bg-white border-slate-200 text-slate-700'}`}><tab.icon size={17}/>{tab.label}</button>)}
    </nav>
    {view==='neolingo' && <div>
      <section className="flex flex-col min-h-[700px] rounded-xl overflow-hidden border border-slate-200 bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border-b border-slate-200 p-4"><h2 className="text-lg font-bold flex items-center gap-2"><Languages size={20}/>NeoLingo</h2><div className="flex flex-wrap gap-3"><button onClick={()=>setNeoSeparate(true)} className="text-sm text-blue-700 underline">Stop embedded session</button><a href="https://neolingo.calnncc.chatgpt.site/" onClick={()=>setNeoSeparate(true)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-700 underline">Open NeoLingo separately <ExternalLink size={14}/></a></div></header>
        {!neoSeparate && parentActive ? <ExternalToolFrame url="https://neolingo.calnncc.chatgpt.site/" title="NeoLingo" allow="microphone; autoplay; clipboard-write" /> : <div className="p-6 text-sm"><p>Embedded NeoLingo is stopped. Close or stop any separate NeoLingo session before resuming here.</p><button onClick={()=>setNeoSeparate(false)} className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white">Resume NeoLingo here</button></div>}
      </section>
    </div>}
    <div hidden={view==='neolingo'} className={`grid gap-6 ${view==='outcomes'?'grid-cols-1':'grid-cols-1 xl:grid-cols-2'}`}>
      <div>
        <div hidden={view!=='guidelines'} className="space-y-6">
          <h2 className="text-xl font-bold">Prematurity Quick Reference</h2>
          <ReferenceTable data={referenceData} selectedTopic={`${gestationalAge} Weeks`} colorClass={prematurity.color} onRowSelect={topic=>setGestationalAge(parseInt(topic))}/>
          <section className="rounded-xl bg-white border border-slate-200 p-5 space-y-4"><h2 className="text-lg font-bold">Factors Affecting Survival and Disability</h2><div className="grid sm:grid-cols-2 gap-5">{(['worsen','improve'] as const).map(group=><div key={group}><h3 className="font-semibold capitalize mb-2">{group}</h3><ul className="list-disc pl-5 space-y-2 text-sm">{prematurity.counsellingFactors?.[group].map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>
          <section className="rounded-xl bg-white border border-slate-200 p-5 overflow-x-auto"><h2 className="text-lg font-bold mb-4">Intensive vs. Palliative Care — {gestationalAge} weeks</h2><p className="text-sm text-slate-600 mb-4">{selected.reference} The comparison below describes general care approaches; selecting gestation does not choose a care goal.</p><table className="w-full text-sm text-left"><thead><tr><th className="p-2">Feature</th><th className="p-2">Intensive Care</th><th className="p-2">Palliative Comfort Care</th></tr></thead><tbody><tr className="border-t bg-blue-50"><th className="p-2">Care option at this gestation</th><td className="p-2">Individualized discussion with the family and neonatal team; consider prognosis and local resources.</td><td className="p-2">{gestationalAge <= 23 ? `Yes — palliative comfort care is an acceptable option at ${gestationalAge} weeks, following individualized counselling and shared decision-making.` : "Consider according to the infant’s prognosis, family discussion and local care pathway."}</td></tr>{prematurity.careComparison?.map(row=><tr key={row.feature} className="border-t"><th className="p-2">{row.feature}</th><td className="p-2">{row.feature === 'Survival' ? `${selected.profile.stats[0].value}% (imported reference; unverified)` : row.feature === 'Long-term Disability' ? `${selected.profile.stats[1].value}% (${selected.profile.stats[1].label}; imported reference)` : row.intensive}</td><td className="p-2">{row.palliative}</td></tr>)}</tbody></table><p className="mt-4 text-xs text-slate-600">The survival row describes the treatment goal, not whether comfort care is acceptable. Gestational age alone does not determine the care plan. <a href="https://cps.ca/en/documents/position/management-anticipated-extremely-preterm-birth" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Canadian Paediatric Society guidance (reaffirmed January 2026)</a>.</p></section>
          {view==='guidelines' && <OpenEvidence topic="Prematurity" categoryId="prematurity"/>}
        </div>
        <div hidden={view!=='outcomes'}><RiskCalculator gestationalAge={gestationalAge} onGestationalAgeChange={setGestationalAge} initialCategoryId="prematurity" onGenerate={context=>sendToNote(context)}/></div>
        <div hidden={view!=='counseling'}><ParentCounselingSummary gestationalAge={gestationalAge} categoryId="prematurity" categoryTitle="Prematurity" onSendToEMR={sendToNote}/></div>
      </div>
      <section className="h-[720px] flex flex-col min-w-0"><h2 className="text-lg font-bold mb-3">Editable Consult Note</h2><TemplateEditor gestationalAge={gestationalAge} initialTemplate={prematurity.templateContent} templateName={prematurity.templateName} autoFillTrigger={note}/></section>
    </div>
  </div>;
}
export default function App(){ return <LanguageProvider><AntenatalConsult/></LanguageProvider>; }
