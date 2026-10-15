import React, { useEffect, useState } from 'react';

export default function ExternalToolFrame({ url, title, allow, onLoad, reloadToken = 0 }: { url: string; title: string; allow?: string; onLoad?: () => void; reloadToken?: number }) {
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  useEffect(() => { setLoading(true); setSlow(false); }, [url, reloadToken]);
  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setSlow(true), 10000);
    return () => window.clearTimeout(timer);
  }, [loading]);
  return <div className="relative flex-1 min-h-[580px] bg-white">
    {loading && <div role="status" className="absolute top-2 right-2 z-10 max-w-xs rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm pointer-events-none">
      {slow ? 'Still waiting for the external service. You can also use the open-in-new-tab link.' : `Connecting to ${title}...`}
    </div>}
    <iframe key={reloadToken} src={url} title={title} loading="eager" allow={allow} className="absolute inset-0 w-full h-full border-0" onLoad={() => { setLoading(false); setSlow(false); onLoad?.(); }} />
  </div>;
}
