import React, { useState } from 'react';
import { RefImage } from './types';
import * as Schematics from './components/UltrasoundSchematics';
import DriveIVH from './components/DriveIVH';

const INITIAL_REFS: RefImage[] = [
  { id: 'g1', name: "Grade I GMH", component: Schematics.Grade1, defaultImg: "https://lh3.googleusercontent.com/d/13i_OMwY8u2MpKWwY2RQb7gjcA1qSO8kM", userImg: null },
  { id: 'g2', name: "Grade II GMH-IVH", component: Schematics.Grade2, defaultImg: "https://lh3.googleusercontent.com/d/1f_WHtLSGXV5jPa7_FOBdxh5oXfn1CQkB", userImg: null },
  { id: 'g3', name: "Grade III GMH-IVH", component: Schematics.Grade3, defaultImg: "https://lh3.googleusercontent.com/d/10CmiaL2BNtqgQAK8icV14tOUDAxe50vK", userImg: null },
  { id: 'pvhi', name: "PVHI", component: Schematics.PVHI, defaultImg: "https://lh3.googleusercontent.com/d/1-QOijyrNTk8zwtGaACAn0iqeM3SOuQL8", userImg: null },
  { id: 'wmi', name: "White Matter Injury", component: Schematics.WMI, defaultImg: "https://lh3.googleusercontent.com/d/1SWhVomW023Vfdijlpjj5ZWB-2KtTHQ__", userImg: null },
  { id: 'cbh', name: "Cerebellar Hemorrhage", component: Schematics.Cerebellar, defaultImg: "https://lh3.googleusercontent.com/d/1AuT1LR0iuGe-rgNiiE5bLDEWQPpUauHn", userImg: null },
  { id: 'ahw', name: "Anterior Horn Width (AHW)", component: Schematics.AHW, defaultImg: "https://lh3.googleusercontent.com/d/1xeJacaKZytHq9LKUSgU01sCCeObMq9-e", userImg: null },
];

const AppContent: React.FC = () => {
  const [refs, setRefs] = useState<RefImage[]>(INITIAL_REFS);

  const handleImageUpload = (id: string, file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRefs(refs.map(r => r.id === id ? { ...r, userImg: e.target?.result as string } : r));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageReset = (id: string) => {
    setRefs(refs.map(r => r.id === id ? { ...r, userImg: null } : r));
  };

  return (
    <div className="w-full h-[100dvh] overflow-hidden font-sans text-slate-900">
      <style>{`
        html, body, #root { width: 100%; height: 100%; margin: 0; overflow: hidden; }
        .primary-tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 640px) { .primary-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (min-width: 900px) { .primary-tabs { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        @media (min-width: 1200px) { .primary-tabs { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
        @media (min-width: 2200px) { .primary-tabs { grid-template-columns: repeat(12, minmax(0, 1fr)); } }
      `}</style>
      <DriveIVH refs={refs} onUpload={handleImageUpload} onReset={handleImageReset} />
    </div>
  );
};

const App: React.FC = () => (
    <AppContent />
);

export default App;