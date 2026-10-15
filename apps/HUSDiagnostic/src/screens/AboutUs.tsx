import { ExternalLink } from 'lucide-react';
import BackHeader from './BackHeader';
import { ABOUT_LINKS } from '../data/content';

export default function AboutUs({ onBack }: { onBack: () => void }) {
  return (
    <>
      <BackHeader title="About Us" onBack={onBack} />
      <main className="flex-1 space-y-4 p-5">
        <p className="text-sm font-semibold text-slate-800">
          To learn more about the Neonatal Neuro-Critical Care (NNCC) program:
        </p>
        {ABOUT_LINKS.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:bg-slate-50">
            <ExternalLink size={16} className="flex-shrink-0 text-sky-600" />
            <span className="text-[13px] font-medium text-sky-700">{l.label}</span>
          </a>
        ))}
        <p className="pt-2 text-center text-[11px] text-slate-400">A Sarnat-NNCC program tool.</p>
      </main>
    </>
  );
}
