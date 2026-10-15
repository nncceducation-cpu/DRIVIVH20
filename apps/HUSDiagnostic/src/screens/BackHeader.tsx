import { ChevronLeft } from 'lucide-react';
export default function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="flex items-center gap-3 bg-sky-800 px-4 py-4 text-white">
      <button onClick={onBack} aria-label="Back" className="p-1"><ChevronLeft size={24} /></button>
      <h1 className="text-lg font-bold tracking-tight">{title}</h1>
    </header>
  );
}
