import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Activity, 
  Brain, 
  Thermometer, 
  Wind, 
  Droplet, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Clock,
  BookOpen,
  Stethoscope,
  Image as ImageIcon,
  Calendar,
  Download,
  Users,
  LineChart,
  BarChart2,
  ExternalLink,
  Calculator,
} from 'lucide-react';
import PublishedApp from './PublishedApp';
import Guide from './Guide';
import Timeline from './Timeline';

import Counseling from './Counseling';
import CNNCalculator from './CNNCalculator';
import { RefImage } from '../types';

interface DriveIVHProps {
  refs: RefImage[];
  onUpload: (id: string, file: File) => void;
  onReset: (id: string) => void;
}

// Helper for CSV Download
const downloadCSV = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const DriveIVH: React.FC<DriveIVHProps> = ({ refs, onUpload, onReset }) => {
  const [activeTab, setActiveTab] = useState('protocols');
  const [expandedSection, setExpandedSection] = useState('golden_hour');

  // Navigation Tabs
  const tabs = [
    { id: 'protocols', label: "Protocols", icon: <BookOpen size={18} /> },
    { id: 'checklists', label: "Checklists", icon: <ClipboardCheck size={18} /> },
    { id: 'classification', label: "Diagnosis", icon: <Stethoscope size={18} /> },
    { id: 'phvd', label: "PHVD", icon: <LineChart size={18} /> },
    { id: 'benchmark', label: "VON Benchmark", icon: <BarChart2 size={18} /> },
    { id: 'cnn_calculator', label: "CNN Calculator", icon: <Calculator size={18} /> },
    { id: 'counseling', label: "Family Care", icon: <Users size={18} /> },
    { id: 'audit', label: "Audit Tool", icon: <Activity size={18} /> },
    { id: 'screening', label: "CUS Screening", icon: <Calendar size={18} /> },
    { id: 'library', label: "Image Library", icon: <ImageIcon size={18} /> },
    { id: 'evidence', label: "Evidence", icon: <FileText size={18} /> },
  ];

  return (
    <div className="flex flex-col bg-slate-50/90 backdrop-blur-sm font-sans text-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-200 h-[calc(100vh-3rem)] w-full max-w-6xl mx-auto transition-all">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 shadow-md shrink-0 relative z-20">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full text-white ring-1 ring-white/20">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">DRIVE IVH 2.0</h1>
              <p className="text-xs text-blue-200 font-medium">Neuroprotective Care Pathway & Consensus Tools</p>
            </div>
          </div>
          
          {/* Centered License Plate - CSS Recreation */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block z-0 pointer-events-none select-none opacity-95">
             <div className="bg-white w-32 h-16 rounded-[4px] shadow-lg border border-slate-300 flex flex-col relative overflow-hidden">
                {/* Bolt Holes */}
                <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-inner"></div>
                <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-inner"></div>
                <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-inner"></div>
                <div className="absolute bottom-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-200 shadow-inner"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center pt-0.5 h-full">
                    <div className="w-full flex justify-center items-end relative px-4">
                        <span className="text-[8px] font-black text-blue-800 uppercase tracking-widest font-serif leading-none">Alberta</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center -mt-1">
                        <span className="text-3xl font-bold text-[#ce1126] tracking-tighter scale-y-[1.3] font-sans drop-shadow-sm">
                            DRIVH20
                        </span>
                    </div>
                </div>
                
                {/* Rose Logo */}
                 <div className="absolute top-1 right-5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#ce1126" className="opacity-90">
                         <path d="M12 2L14.5 8L21 8L16 12.5L18 19L12 15L6 19L8 12.5L3 8L9.5 8Z" stroke="none"/>
                    </svg>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="hidden sm:block text-xs bg-blue-800/50 border border-blue-700/50 px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
              Target: &lt;29 Weeks
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex bg-white border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-none md:flex-1 flex items-center justify-center space-x-2 py-4 px-5 text-sm font-medium transition-all duration-200 whitespace-nowrap border-b-2
              ${activeTab === tab.id 
               ? 'text-blue-700 border-blue-700 bg-blue-50/50' 
                : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 scroll-smooth">
        
        {/* PROTOCOLS VIEW */}
        {activeTab === 'protocols' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md shadow-sm mb-6">
              <div className="flex items-start">
                <AlertTriangle className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-amber-800 text-sm">Critical Window: First 72 Hours</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    90% of IVH occurs within the first 3 days. Strict adherence to midline positioning, minimal handling, and hemodynamic stability is mandatory during this period.
                  </p>
                </div>
              </div>
            </div>

            <ProtocolSection 
              title="The Golden Hour (Delivery Room)"
              icon={<Clock size={20} />}
              isOpen={expandedSection === 'golden_hour'}
              toggle={() => setExpandedSection(expandedSection === 'golden_hour' ? '' : 'golden_hour')}
            >
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-0.5 text-green-600 shrink-0" /> 
                  <span><strong>Cord Management:</strong> Delayed Cord Clamping (30-60s) if feasible. 
                  <span className="text-red-600 font-semibold ml-1">AVOID Cord Milking</span> (associated with severe IVH in &lt;28 wks).</span>
                </li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-0.5 text-green-600 shrink-0" /> 
                  <span><strong>Thermoregulation:</strong> Maintain 36.5°C - 37.5°C. Use polyethylene bag/wrap without drying for &lt;32 weeks.</span>
                </li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-0.5 text-green-600 shrink-0" /> 
                  <span><strong>Respiratory:</strong> T-Piece Resuscitator (CPAP 5-8). Avoid bag-mask. Intubate only if necessary by most experienced provider.</span>
                </li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-0.5 text-green-600 shrink-0" /> 
                  <span><strong>Transport:</strong> Use "Transport Neuroprotection Bundle" (Gel mattress, earmuffs, midline head).</span>
                </li>
              </ul>
            </ProtocolSection>

            <ProtocolSection 
              title="NICU Care Bundle (First 72 Hours)"
              icon={<Brain size={20} />}
              isOpen={expandedSection === 'nicu_72'}
              toggle={() => setExpandedSection(expandedSection === 'nicu_72' ? '' : 'nicu_72')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-slate-200">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                    <Activity size={16} className="mr-2" /> Positioning
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Head:</strong> Midline/Neutral (Rotation &lt;30°).</li>
                    <li>• <strong>Bed:</strong> Elevated 20-30 degrees.</li>
                    <li>• <strong>Body:</strong> Supine preferred if intubated.</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                    <Wind size={16} className="mr-2" /> Handling
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Cluster Care:</strong> Max 10-15 mins. Cue-based.</li>
                    <li>• <strong>Two-Person Care:</strong> One for containment (tucking).</li>
                    <li>• <strong>No Weighing:</strong> No length/weight for 72h (use birth metrics).</li>
                    <li>• <strong>Diapers:</strong> Lift hips gently; <span className="text-red-600 font-bold">NEVER</span> lift legs by ankles.</li>
                  </ul>
                </div>
              </div>
            </ProtocolSection>

            <ProtocolSection 
              title="Hemodynamic & Respiratory Targets"
              icon={<Droplet size={20} />}
              isOpen={expandedSection === 'hemo'}
              toggle={() => setExpandedSection(expandedSection === 'hemo' ? '' : 'hemo')}
            >
              <div className="space-y-4 text-sm text-slate-700">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-bold text-slate-900">Treat Shock, Not Numbers</h4>
                  <p className="mt-1">
                    Accept physiologic and transitional low blood pressure in the first 72 hours of birth. 
                    Permissive hypotension tolerated if perfusion is adequate. Inotropes only if:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Lactate &gt; 3.5 mmol/L (rising)</li>
                    <li>Capillary Refill &gt; 3 sec</li>
                    <li>Urine Output &lt; 1 mL/kg/hr (after 24h)</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-bold text-slate-900">Fluid Boluses</h4>
                  <p className="mt-1">Avoid rapid expansion. Administer bolus over <strong>30-60 minutes</strong>.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-bold text-slate-900">Respiratory Targets</h4>
                  <p className="mt-1"><strong>PCO2:</strong> 45 - 55 mmHg. Avoid rapid fluctuations.</p>
                  <p><strong>Suctioning:</strong> Only as needed (not routine). Closed system.</p>
                  <p><strong>Intubation:</strong> Strict protocolization of intubation, extubation, and re-intubation practice.</p>
                </div>
              </div>
            </ProtocolSection>

            <ProtocolSection 
              title="Pharmacology"
              icon={<Thermometer size={20} />}
              isOpen={expandedSection === 'pharma'}
              toggle={() => setExpandedSection(expandedSection === 'pharma' ? '' : 'pharma')}
            >
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start">
                  <span className="font-bold w-32 flex-shrink-0">Indomethacin:</span> 
                  <span>Consider prophylaxis within 12h for high-risk (&lt;26w, no ACS, or male) if Platelets &ge; 60k.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold w-32 flex-shrink-0">Inotropes:</span> 
                  <span><span className="text-red-600 font-bold">AVOID</span> in the first 72 hours (if possible).</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold w-32 flex-shrink-0">Vitamin K:</span> 
                  <span>Give <strong>IV</strong> (not IM) on admission to minimize pain/stress.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold w-32 flex-shrink-0">Sodium Bicarb:</span> 
                  <span><span className="text-red-600 font-bold">AVOID</span> if possible. If necessary, infuse over hours, never bolus.</span>
                </li>
              </ul>
            </ProtocolSection>
          </div>
        )}

        {/* CHECKLISTS VIEW */}
        {activeTab === 'checklists' && (
          <div className="max-w-3xl mx-auto">
            <ChecklistModule />
          </div>
        )}

        {/* CLASSIFICATION TOOL */}
        {activeTab === 'classification' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <PublishedApp app="HUSDiagnostic" title="Diagnosis" />
           </div>
        )}

        {/* PHVD MODULE */}
        {activeTab === 'phvd' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <PublishedApp app="PHVD" title="PHVD" />
           </div>
        )}

        {/* BENCHMARK TOOL */}
        {activeTab === 'benchmark' && (
          <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[600px]">
             <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
                <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-full text-blue-600 border border-blue-200">
                      <BarChart2 size={20} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800">VON Reference Benchmark Tool</h3>
                        <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                          Vermont Oxford Network
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Interactive benchmarking & neonatal quality metrics</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button
                     onClick={() => setActiveTab('cnn_calculator')}
                     className="flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900 bg-red-50 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg hover:bg-red-100 transition-all shadow-sm"
                     title="Switch to Canadian Neonatal Network (CNN) Calculator"
                   >
                      <Calculator size={14} className="text-red-600" />
                      <span>CNN Calculator</span>
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
                  title="VON Reference Benchmark Tool"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
             </div>
          </div>
        )}

        {/* CNN CALCULATOR TOOL */}
        {activeTab === 'cnn_calculator' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full">
             <CNNCalculator onSwitchToBenchmark={() => setActiveTab('benchmark')} />
           </div>
        )}
        
        {/* COUNSELING / FAMILY CARE MODULE */}
        {activeTab === 'counseling' && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <Counseling />
           </div>
        )}

        {/* AUDIT VIEW */}
        {activeTab === 'audit' && (
          <div className="max-w-3xl mx-auto">
            <AuditModule />
          </div>
        )}

        {/* CUS SCREENING */}
        {activeTab === 'screening' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Timeline />
          </div>
        )}
        
        {/* IMAGE LIBRARY */}
        {activeTab === 'library' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Guide refs={refs} onUpload={onUpload} onReset={onReset} />
          </div>
        )}

        {/* EVIDENCE VIEW */}
        {activeTab === 'evidence' && (
          <div className="space-y-6 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800">Evidence</h3>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-blue-800">Calgary Zone Neuroprotection Bundle (2019-2025)</h4>
              <p className="mt-2 text-slate-600">
                Protocols emphasize the "Critical Window" (first 72h). Implementation of these bundles and outreach education 
                has been shown to reduce death or severe brain injury (Adjusted Odds Ratio 0.36) in transported neonates.
              </p>
              <div className="mt-2 text-xs text-slate-500">Source: Mohammad et al. (2022) [1]; Murthy et al. (2020) [1]; Calgary Zone Guidelines.</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-blue-800">Counseling Parents on Neuroimaging Findings (2021)</h4>
              <p className="mt-2 text-slate-600">
                Proposes the "FIGURE" framework to guide clinicians in counseling parents about brain imaging results: Formulate a plan, Identify needs, Give information, Acknowledge Uncertainty, Recognize emotions, and Establish follow-up.
              </p>
              <div className="mt-2 text-xs text-slate-500">
                  <a href="https://doi.org/10.1016/j.semperi.2021.151474" target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">
                      Source: Bernstein SM, Lemmon ME. Semin Perinatol. 2021;45(7):151474.
                  </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-blue-800">Management of PHVD in the Preterm Infant (2020)</h4>
              <p className="mt-2 text-slate-600">
                International consensus statement advocating for early intervention based on sequential cranial ultrasound measurements. 
                Establishes the risk stratification framework (Green, Yellow, Red zones) implemented in this tool's PHVD Analysis module.
              </p>
              <div className="mt-2 text-xs text-slate-500">
                  <a href="https://pubmed.ncbi.nlm.nih.gov/32739263/" target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">
                      Source: El-Dib et al. J Pediatr. 2020 Nov;226:16-27.e3.
                  </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h4 className="font-bold text-blue-800">Canadian Consensus on Preterm Brain Injury (2021)</h4>
                <p className="mt-2 text-slate-600">
                    Standardizes screening/classification for Canadian NICUs. Recommends scanning at 4-7 days, 4-6 weeks, and ~36 weeks PMA. Defines significant injury as Grade III IVH, PVHI, severe dilatation, cystic WMI, or moderate/large CBH.
                </p>
                <div className="mt-2 text-xs text-slate-500">
                    <a href="https://pubmed.ncbi.nlm.nih.gov/33763004/" target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">
                        Source: Mohammad et al. Front Pediatr. 2021;9:618236.
                    </a>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h4 className="font-bold text-blue-800">Canadian Neonatal Network (CNN) Outcome Calculator</h4>
                <p className="mt-2 text-slate-600">
                  National Neonatal Outcomes Probability Score (NOPS) calculator predicting mortality, severe morbidity (PVL, ROP, NEC), 
                  and bronchopulmonary dysplasia (BPD) on Day 7, Day 14, and Day 28 for preterm infants born &lt;30 weeks (2010–2023 Canadian NICU cohort).
                </p>
                <div className="mt-2 text-xs text-slate-500">
                    <a href="https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx" target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">
                        Source: Canadian Neonatal Network (CNN) NOPS Calculator Portal.
                    </a>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-blue-800">CPS Position Statement (2019)</h4>
              <p className="mt-2 text-slate-600">
                Strong recommendation for Delayed Cord Clamping (30-120s) and antenatal magnesium sulfate. 
                Recommends against routine use of inotropes for hypotension without signs of poor perfusion.
              </p>
              <div className="mt-2 text-xs text-slate-500">Source: CPS Position Statement.</div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-blue-800">Future Therapies</h4>
              <p className="mt-2 text-slate-600">
                Research into EPO, Stem Cells, and Melatonin is ongoing but not yet standard of care for IVH prevention in all units.
              </p>
              <div className="mt-2 text-xs text-slate-500">Source: Molloy et al. (2023).</div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

// Sub-component for Protocol Accordions
const ProtocolSection: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode, isOpen: boolean, toggle: () => void}> = ({ title, icon, children, isOpen, toggle }) => (
  <div className="border border-slate-200 rounded-md bg-white overflow-hidden shadow-sm transition-all duration-200">
    <button 
      onClick={toggle}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors text-left"
    >
      <div className="flex items-center space-x-3 text-slate-800 font-semibold">
        <span className="text-blue-600">{icon}</span>
        <span>{title}</span>
      </div>
      {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
    </button>
    {isOpen && (
      <div className="p-4 border-t border-slate-100 bg-slate-50 animate-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);

// Sub-component for Interactive Checklists
const ChecklistModule = () => {
  const checklistItems = [
    { key: 'dcc', label: "Delayed Cord Clamping performed (30-60s)", subtext: "Contraindicated if placental abruption or immediate resuscitation required." },
    { key: 'temp', label: "Admission Temperature 36.5°C - 37.5°C" },
    { key: 'cpap', label: "Stabilized on T-Piece CPAP (Avoided Bag-Mask)" },
    { key: 'midline', label: "Head Midline / Neutral Position", subtext: "Ensure rotation < 30 degrees. No neck flexion/extension." },
    { key: 'hob', label: "Head of Bed Elevated 20-30°" },
    { key: 'vitk', label: "Vitamin K given Intravenously (IV)", subtext: "Avoid IM injection pain/stress in first 72h." },
    { key: 'handling', label: "Minimal Handling Protocol Active", subtext: "Signage up. No routine weights. Two-person cares." },
    { key: 'parents', label: "Parents Educated on Bundle", subtext: "Explain 'containment holding' and sensory environment." }
  ];

  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    checklistItems.reduce((acc, item) => ({...acc, [item.key]: false}), {})
  );

  const toggleItem = (key: string) => {
    setChecklist(prev => ({...prev, [key]: !prev[key] }));
  };

  const calculateProgress = () => {
    const total = Object.keys(checklist).length;
    const checked = Object.values(checklist).filter(Boolean).length;
    return Math.round((checked / total) * 100);
  };

  const handleExport = () => {
    const headers = ["Item", "Status", "Notes"];
    const rows = checklistItems.map(item => [
      `"${item.label}"`,
      checklist[item.key] ? "Completed" : "Pending",
      `"${item.subtext || ''}"`
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    downloadCSV(`neuroprotection-checklist-${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-slate-800">Bedside Neuroprotection Checklist</h3>
          <div className="flex items-center gap-3">
             <div className="text-sm font-bold text-blue-600">{calculateProgress()}% Complete</div>
             <button 
                onClick={handleExport}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md flex items-center gap-1.5 font-semibold transition-colors border border-slate-200"
             >
                <Download size={14} />
                Export CSV
             </button>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
        </div>

        <div className="space-y-3">
          {checklistItems.map(item => (
            <ChecklistItem 
                key={item.key}
                label={item.label}
                checked={checklist[item.key]}
                onChange={() => toggleItem(item.key)}
                subtext={item.subtext}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ChecklistItem: React.FC<{label: string, checked: boolean, onChange: () => void, subtext?: string}> = ({ label, checked, onChange, subtext }) => (
  <div 
    onClick={onChange}
    className={`flex items-start p-3 rounded-md border cursor-pointer transition-all
      ${checked ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
  >
    <div className={`mt-0.5 mr-3 flex items-center justify-center w-5 h-5 rounded border transition-colors
      ${checked ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`}>
      {checked && <CheckCircle size={14} className="text-white" />}
    </div>
    <div>
      <div className={`text-sm font-medium ${checked ? 'text-green-900' : 'text-slate-800'}`}>
        {label}
      </div>
      {subtext && <div className="text-xs text-slate-500 mt-1">{subtext}</div>}
    </div>
  </div>
);

// Sub-component for Audit (CORE Form simulation)
const AuditModule = () => {
  const auditSections = [
    {
      title: "Antenatal Factors",
      items: [
        { id: 'an_steroids', label: "Full course Antenatal Steroids?" },
        { id: 'mg_sulfate', label: "Magnesium Sulfate administered?" },
        { id: 'inborn', label: "Born at Tertiary Center (Inborn)?" },
      ]
    },
    {
      title: "Resuscitation & Transport",
      items: [
        { id: 'dcc', label: "Delayed Cord Clamping performed?" },
        { id: 'normothermia', label: "Normothermia maintained (36.5-37.5)?" },
        { id: 'avoid_intubation', label: "Avoided Intubation (CPAP only)?" },
        { id: 'transport_bundle', label: "Transport Bundle used (Gel mattress/Earmuffs)?" },
      ]
    },
    {
      title: "First 72 Hours (NICU)",
      items: [
        { id: 'midline', label: "Head Midline & HOB Elevated 100% of time?" },
        { id: 'pco2', label: "PCO2 maintained 45-55 mmHg (No fluctuations)?" },
        { id: 'fluids', label: "Avoided rapid fluid boluses?" },
        { id: 'bicarb', label: "Avoided Sodium Bicarbonate?" },
        { id: 'suction', label: "Avoided routine suctioning?" },
      ]
    },
  ];

  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | null>>({});

  const handleAnswer = (id: string, value: 'yes' | 'no') => {
    setAnswers(prev => ({...prev, [id]: value}));
  };

  const handleExport = () => {
    const headers = ["Category", "Question", "Response"];
    const rows: string[][] = [];
    
    auditSections.forEach(section => {
      section.items.forEach(item => {
         const ans = answers[item.id];
         rows.push([
           `"${section.title}"`,
           `"${item.label}"`,
           ans ? (ans === 'yes' ? 'Yes' : 'No') : 'Not Recorded'
         ]);
      });
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    downloadCSV(`ivh-core-audit-${new Date().toISOString().split('T')[0]}.csv`, csvContent);
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-blue-800 flex items-start flex-1">
                <Info size={16} className="inline mr-2 mt-0.5 shrink-0" />
                <div>
                    Based on the <strong>CORE (Clinical Outcome Review & Evaluation)</strong> form. 
                    Use this to debrief every case of Grade 3/4 IVH.
                </div>
            </div>
            <button 
                onClick={handleExport}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
                <Download size={16} />
                Export Audit Data
            </button>
        </div>

        <div className="space-y-4">
        {auditSections.map((section, idx) => (
            <AuditSection key={idx} title={section.title}>
                {section.items.map(item => (
                    <AuditRow 
                        key={item.id} 
                        label={item.label} 
                        value={answers[item.id] || null}
                        onAnswer={(val) => handleAnswer(item.id, val)}
                    />
                ))}
            </AuditSection>
        ))}
        </div>
    </div>
  );
};

const AuditSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
  <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
    <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 text-sm">{title}</div>
    <div className="divide-y divide-slate-100">
      {children}
    </div>
  </div>
);

const AuditRow: React.FC<{label: string, value: 'yes' | 'no' | null, onAnswer: (v: 'yes' | 'no') => void}> = ({ label, value, onAnswer }) => (
  <div className="flex items-center justify-between p-3 text-sm hover:bg-slate-50 transition-colors">
    <span className="text-slate-700">{label}</span>
    <div className="flex space-x-2 shrink-0 ml-4">
      <button 
        onClick={() => onAnswer('yes')}
        className={`px-3 py-1 rounded border text-xs transition-colors font-medium
            ${value === 'yes' 
                ? 'bg-green-100 border-green-400 text-green-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-green-300 hover:text-green-700'
            }`}
      >
        Yes
      </button>
      <button 
        onClick={() => onAnswer('no')}
        className={`px-3 py-1 rounded border text-xs transition-colors font-medium
            ${value === 'no' 
                ? 'bg-red-100 border-red-400 text-red-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-700'
            }`}
      >
        No
      </button>
    </div>
  </div>
);

export default DriveIVH;
