import React from 'react';

export default function PublishedApp({ app, title }: { app: 'HUSDiagnostic' | 'PHVD' | 'Antenatal'; title: string }) {
  const url = `${import.meta.env.BASE_URL}apps/${app}/index.html`;
  return (
    <section className="h-full min-h-[600px] flex flex-col gap-2">
      <a href={url} target="_blank" rel="noreferrer" className="text-sm text-blue-700 underline self-end">Open {title} in a new tab</a>
      <iframe title={title} src={url} className="w-full flex-1 min-h-[560px] rounded-lg border border-slate-200 bg-white" />
    </section>
  );
}
