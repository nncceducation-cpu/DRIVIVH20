import React, { useState, useMemo } from 'react';
import { FileText, Brain, Activity } from 'lucide-react';
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

  // Memoize particles to prevent re-generation and visual jumping on state updates
  const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    width: Math.random() * 6 + 2,
    height: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -30,
    opacity: Math.random() * 0.4 + 0.1
  })), []);

  return (
    <div className="min-h-screen font-sans p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden text-slate-900">
      
      {/* Visual Effects Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.2; }
        }
        @keyframes particle-rise {
            0% { transform: translateY(120vh) scale(0); opacity: 0; }
            100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
        }
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-animated-gradient {
            background: linear-gradient(-45deg, #f8fafc, #e0f2fe, #f0f9ff, #f8fafc);
            background-size: 400% 400%;
            animation: gradient-shift 30s ease infinite;
        }
        .particle {
            position: absolute;
            background: rgba(147, 197, 253, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-rise linear infinite;
        }
      `}</style>

      {/* Main Animated Gradient Background */}
      <div className="fixed inset-0 -z-30 bg-animated-gradient"></div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Background Container for Particles and Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        
        {/* Floating Particles */}
        {particles.map((p) => (
             <div 
                key={p.id}
                className="particle"
                style={{
                    left: `${p.left}%`,
                    width: `${p.width}px`,
                    height: `${p.height}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                    opacity: p.opacity
                }}
             />
        ))}

        {/* Animated Color Blobs */}
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Abstract Icons */}
        <div className="absolute top-[15%] left-[10%] text-blue-900/5" style={{ animation: 'float-slow 6s ease-in-out infinite' }}>
          <Brain size={120} />
        </div>
        <div className="absolute bottom-[20%] right-[10%] text-indigo-900/5" style={{ animation: 'float-slow 8s ease-in-out infinite reverse' }}>
          <Activity size={100} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl z-10 animate-in fade-in zoom-in duration-500">
        <DriveIVH refs={refs} onUpload={handleImageUpload} onReset={handleImageReset} />
      </div>

      <div className="mt-8 text-center animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 relative z-10">
        <a 
          href="https://doi.org/10.3389/fped.2021.618236" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-all hover:scale-105 bg-white/50 px-4 py-2 rounded-full border border-slate-200 hover:border-blue-300 shadow-sm backdrop-blur-sm"
        >
          <FileText className="w-3 h-3" />
          <span>Evidence Base: Front. Pediatr. 2021 Consensus</span>
        </a>
      </div>
    </div>
  );
};

const App: React.FC = () => (
    <AppContent />
);

export default App;