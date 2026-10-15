import { Stethoscope, BookOpen, Images, Link2, Info } from 'lucide-react';
import type { Route } from '../App';

const ITEMS: { label: string; route: Route; icon: typeof Stethoscope }[] = [
  { label: 'Make the diagnosis', route: 'wizard', icon: Stethoscope },
  { label: 'Definitions', route: 'definitions', icon: BookOpen },
  { label: 'Appendix', route: 'appendix', icon: Images },
  { label: 'References', route: 'references', icon: Link2 },
];

export default function HomePage({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <>
      <header className="flex items-center justify-between bg-sky-800 px-5 py-4 text-white">
        <div>
          <h1 className="text-xl font-bold tracking-tight">HUS Diagnostic</h1>
          <p className="text-xs text-sky-100">Neonatal cranial ultrasound &mdash; reporting aid</p>
        </div>
        <button onClick={() => onNavigate('about')} aria-label="About" className="p-1">
          <Info size={22} />
        </button>
      </header>
      <main className="flex-1 space-y-3 p-5">
        {ITEMS.map(({ label, route, icon: Icon }) => (
          <button
            key={route}
            onClick={() => onNavigate(route)}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm active:bg-slate-50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <Icon size={22} />
            </span>
            <span className="text-base font-semibold text-slate-800">{label}</span>
          </button>
        ))}
      </main>
      <footer className="px-5 py-3 text-center text-[11px] text-slate-400">
        Reporting/education aid &mdash; not a diagnostic interpretation. A Sarnat-NNCC program tool.
      </footer>
    </>
  );
}
