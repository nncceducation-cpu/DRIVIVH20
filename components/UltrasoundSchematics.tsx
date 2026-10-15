import React from 'react';

export const USNoiseFilter = () => (
  <defs>
    <filter id="us-speckle">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
      <feComponentTransfer in="grayNoise" result="contrastNoise">
        <feFuncR type="linear" slope="1.5" intercept="-0.2" />
        <feFuncG type="linear" slope="1.5" intercept="-0.2" />
        <feFuncB type="linear" slope="1.5" intercept="-0.2" />
      </feComponentTransfer>
      <feComposite operator="in" in="contrastNoise" in2="SourceGraphic" result="textured" />
      <feBlend mode="multiply" in="textured" in2="SourceGraphic" />
    </filter>
    
    <clipPath id="sector-clip">
      <path d="M 100 20 L 180 150 L 20 150 Z" />
    </clipPath>
    
    <radialGradient id="tissue-grad" cx="100" cy="20" r="140" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#222" />
      <stop offset="100%" stopColor="#444" />
    </radialGradient>
  </defs>
);

const USViewBase: React.FC<{ children: React.ReactNode; title: string; sub: string }> = ({ children, title, sub }) => (
  <div className="flex flex-col items-center bg-black p-4 rounded-lg border border-slate-700 w-full h-full justify-between select-none shadow-inner">
    <div className="relative w-full aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        <USNoiseFilter />
        
        <path d="M 80 10 Q 100 5 120 10" stroke="#666" strokeWidth="2" fill="none" />

        <g clipPath="url(#sector-clip)">
          <path d="M -50 0 L 250 0 L 250 200 L -50 200 Z" fill="url(#tissue-grad)" filter="url(#us-speckle)" opacity="0.8" />
          
          <line x1="100" y1="20" x2="100" y2="150" stroke="#888" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.3" />
          
          <path d="M 100 40 Q 140 50 160 80" fill="none" stroke="#666" strokeWidth="1" opacity="0.6" />
          <path d="M 100 40 Q 60 50 40 80" fill="none" stroke="#666" strokeWidth="1" opacity="0.6" />

          {children}
        </g>
        
        <text x="10" y="150" fill="#fbbf24" fontSize="6" fontFamily="monospace">GEN</text>
        <text x="10" y="156" fill="#fbbf24" fontSize="6" fontFamily="monospace">C4-8</text>
        <text x="180" y="150" fill="#fbbf24" fontSize="6" fontFamily="monospace">MI 0.7</text>
        <text x="180" y="156" fill="#fbbf24" fontSize="6" fontFamily="monospace">TIS 0.4</text>
      </svg>
    </div>
    <div className="text-center mt-3 w-full bg-slate-900/50 py-1 rounded">
      <span className="text-slate-200 text-sm font-semibold block">{title}</span>
      {sub && <span className="text-slate-400 text-xs block">{sub}</span>}
    </div>
  </div>
);

export const Grade1 = () => (
  <USViewBase title="Grade I GMH" sub="Subependymal Hemorrhage">
    <path d="M 100 60 L 115 55 L 120 70 L 105 75 Z" fill="#000" />
    <path d="M 100 60 L 85 55 L 80 70 L 95 75 Z" fill="#000" />
    <circle cx="82" cy="72" r="5" fill="#fff" filter="url(#us-speckle)" opacity="0.9" />
    <line x1="82" y1="72" x2="50" y2="100" stroke="#fbbf24" strokeWidth="0.5" />
    <text x="35" y="106" fill="#fbbf24" fontSize="5">SEH</text>
  </USViewBase>
);

export const Grade2 = () => (
  <USViewBase title="Grade II GMH-IVH" sub="Intraventricular, No Dilation">
    <path d="M 100 60 L 85 55 L 80 70 L 95 75 Z" fill="#ccc" filter="url(#us-speckle)" />
    <path d="M 100 60 L 115 55 L 120 70 L 105 75 Z" fill="#000" />
    <path d="M 85 55 L 95 75 L 80 70 Z" fill="#fff" opacity="0.7" />
  </USViewBase>
);

export const Grade3 = () => (
  <USViewBase title="Grade III GMH-IVH" sub="Dilated Ventricle + Blood">
    <path d="M 98 55 Q 70 45 65 75 Q 70 95 98 85 Z" fill="#ddd" filter="url(#us-speckle)" stroke="#fff" strokeWidth="0.5" />
    <path d="M 102 60 L 120 50 L 125 75 L 105 80 Z" fill="#000" />
    <line x1="75" y1="60" x2="90" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
    <text x="60" y="55" fill="#ef4444" fontSize="6" fontWeight="bold">AHW &gt; 6mm</text>
  </USViewBase>
);

export const PVHI = () => (
  <USViewBase title="PVHI" sub="Venous Infarction">
    <path d="M 100 60 L 85 55 L 80 70 L 95 75 Z" fill="#ccc" filter="url(#us-speckle)" />
    <path d="M 80 50 Q 60 40 50 60 L 70 75 Z" fill="#fff" filter="url(#us-speckle)" opacity="0.9" />
    <text x="30" y="50" fill="#fbbf24" fontSize="5">Hemorrhagic Infarct</text>
    <line x1="60" y1="55" x2="40" y2="52" stroke="#fbbf24" strokeWidth="0.5" />
  </USViewBase>
);

export const WMI = () => (
  <USViewBase title="White Matter Injury" sub="Cystic PVL / Echodensities">
    <path d="M 100 60 L 115 55 L 120 70 L 105 75 Z" fill="#000" />
    <path d="M 100 60 L 85 55 L 80 70 L 95 75 Z" fill="#000" />
    <ellipse cx="135" cy="55" rx="10" ry="6" fill="#fff" filter="url(#us-speckle)" opacity="0.6" />
    <ellipse cx="65" cy="55" rx="10" ry="6" fill="#fff" filter="url(#us-speckle)" opacity="0.6" />
    <circle cx="135" cy="55" r="2" fill="#000" />
    <circle cx="132" cy="58" r="1.5" fill="#000" />
    <circle cx="65" cy="55" r="2" fill="#000" />
  </USViewBase>
);

export const Cerebellar = () => (
  <USViewBase title="Cerebellar Hemorrhage" sub="Mastoid View">
    <path d="M 60 110 Q 100 140 140 110 L 130 90 Q 100 110 70 90 Z" fill="#333" />
    <circle cx="115" cy="115" r="8" fill="#fff" filter="url(#us-speckle)" />
    <text x="130" y="120" fill="#fbbf24" fontSize="5">CBH</text>
  </USViewBase>
);

export const AHW = () => (
  <USViewBase title="Anterior Horn Width" sub="Measurement Guide">
     <path d="M 102 60 L 125 50 L 130 75 L 108 80 Z" fill="#000" stroke="#555" strokeWidth="0.5" />
     <line x1="105" y1="62" x2="128" y2="73" stroke="#ef4444" strokeWidth="1" />
     <text x="110" y="55" fill="#ef4444" fontSize="5">Widest Diagonal</text>
  </USViewBase>
);