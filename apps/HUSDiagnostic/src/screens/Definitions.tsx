import BackHeader from './BackHeader';
import { DEFINITIONS } from '../data/content';

export default function Definitions({ onBack }: { onBack: () => void }) {
  return (
    <>
      <BackHeader title="Definitions" onBack={onBack} />
      <main className="flex-1 space-y-4 p-5">
        {DEFINITIONS.map((d) => (
          <section key={d.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-sky-800">{d.title}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-slate-700">
              {d.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
