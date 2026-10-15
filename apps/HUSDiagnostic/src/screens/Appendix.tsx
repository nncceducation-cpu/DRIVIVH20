import { useState } from 'react';
import BackHeader from './BackHeader';
import { ATLAS } from '../data/figuresAtlas';

export default function Appendix({ onBack }: { onBack: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  return (
    <>
      <BackHeader title="Appendix" onBack={onBack} />
      <main className="flex-1 space-y-6 p-4">
        <p className="rounded-xl bg-slate-100 p-3 text-[12px] leading-relaxed text-slate-600">
          Reference figures from Mohammad K, et al. Consensus Approach for Standardizing the
          Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound:
          A Canadian Perspective. Front Pediatr. 2021;9:618236. Tap any figure to enlarge.
        </p>
        {ATLAS.map((fig) => (
          <figure key={fig.n} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">Figure {fig.n}</p>
              <p className="text-[13px] font-semibold leading-snug text-slate-900">{fig.title}</p>
            </div>
            <button onClick={() => setZoom(fig.src)} className="block w-full" aria-label={`Enlarge figure ${fig.n}`}>
              <img src={fig.src} alt={fig.title} className="w-full" loading="lazy" />
            </button>
            <figcaption className="p-3 text-[12px] leading-relaxed text-slate-600">{fig.caption}</figcaption>
          </figure>
        ))}
      </main>
      {zoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2" onClick={() => setZoom(null)}>
          <img src={zoom} alt="Figure" className="max-h-full max-w-full object-contain" style={{ touchAction: 'pinch-zoom' }} />
        </div>
      )}
    </>
  );
}
