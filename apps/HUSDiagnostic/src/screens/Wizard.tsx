import { useState } from 'react';
import { ChevronLeft, Check, X, RotateCcw, Home } from 'lucide-react';
import { STEPS, computeResult, type Answers, type StepId } from '../data/decisionTree';
import { RESULT_IMAGES } from '../data/resultImages';

export default function Wizard({ onHome }: { onHome: () => void }) {
  const [current, setCurrent] = useState<StepId>('1');
  const [answers, setAnswers] = useState<Answers>({});
  const [path, setPath] = useState<StepId[]>([]);
  const [done, setDone] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);

  const step = STEPS[current];

  function answer(a: 'YES' | 'NO') {
    const next = a === 'YES' ? step.yes : step.no;
    const updated = { ...answers, [current]: a };
    setAnswers(updated);
    if (next === 'RESULT') {
      setDone(true);
    } else {
      setPath((p) => [...p, current]);
      setCurrent(next);
    }
  }

  function back() {
    if (done) { setDone(false); return; }
    const prev = path[path.length - 1];
    if (prev === undefined) { onHome(); return; }
    setPath((p) => p.slice(0, -1));
    setCurrent(prev);
  }

  function restart() {
    setCurrent('1'); setAnswers({}); setPath([]); setDone(false);
  }

  if (done) {
    const result = computeResult(answers);
    const images = (result.images ?? [])
      .map((k) => RESULT_IMAGES[k])
      .filter((v): v is NonNullable<typeof v> => Boolean(v));
    return (
      <>
        <Header title="Result" onBack={back} />
        <main className="flex-1 space-y-5 p-5">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Report</p>
            <p className="mt-2 text-lg font-bold leading-snug text-slate-900">{result.title}</p>
          </div>
          {images.length > 0 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Example{images.length > 1 ? 's' : ''}
              </p>
              {images.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setZoom(img.src)}
                    className="block w-full"
                    aria-label="Enlarge image"
                  >
                    <img src={img.src} alt={img.caption.split('.')[0]} className="w-full" loading="lazy" />
                  </button>
                  <figcaption className="p-3 text-[12px] leading-relaxed text-slate-600">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="rounded-xl bg-slate-100 p-4 text-xs text-slate-500">
            This is a structured reporting aid reflecting the answers entered. It does not constitute a
            diagnostic interpretation. Verify against the source images and your unit&rsquo;s protocol.
          </div>
          {zoom && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setZoom(null)}
            >
              <img
                src={zoom}
                alt="Enlarged example"
                className="max-h-full max-w-full object-contain"
                style={{ touchAction: 'pinch-zoom' }}
              />
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={restart} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-700 py-3 text-sm font-semibold text-white active:bg-sky-800">
              <RotateCcw size={16} /> Start over
            </button>
            <button onClick={onHome} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 active:bg-slate-50">
              <Home size={16} /> Home
            </button>
          </div>
        </main>
      </>
    );
  }

  const note = undefined;
  return (
    <>
      <Header title={`Step ${current}`} onBack={back} />
      <main className="flex-1 space-y-6 p-5">
        <p className="text-base font-semibold leading-relaxed text-slate-900">{step.question}</p>
        {(step.yesNote || step.noNote) && (
          <div className="space-y-2 rounded-xl bg-slate-100 p-4 text-[13px] leading-relaxed text-slate-600">
            {step.yesNote && <p><span className="font-semibold text-emerald-700">Yes:</span> {step.yesNote}</p>}
            {step.noNote && <p><span className="font-semibold text-rose-700">No:</span> {step.noNote}</p>}
          </div>
        )}
        {note}
        <div className="flex gap-3 pt-2">
          <button onClick={() => answer('YES')} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white active:bg-emerald-700">
            <Check size={20} /> Yes
          </button>
          <button onClick={() => answer('NO')} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 py-4 text-base font-semibold text-white active:bg-rose-700">
            <X size={20} /> No
          </button>
        </div>
      </main>
    </>
  );
}

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="flex items-center gap-3 bg-sky-800 px-4 py-4 text-white">
      <button onClick={onBack} aria-label="Back" className="p-1"><ChevronLeft size={24} /></button>
      <h1 className="text-lg font-bold tracking-tight">{title}</h1>
    </header>
  );
}
