import React, { useEffect, useState } from 'react';

// Retain visited tools so their forms and external connections survive tab changes.
export default function PersistentPanel({ active, preload = false, children }: { active: boolean; preload?: boolean; children: React.ReactNode }) {
  const [opened, setOpened] = useState(active || preload);
  useEffect(() => { if (active) setOpened(true); }, [active]);
  if (!opened && !active) return null;
  return <div hidden={!active} style={{ display: active ? undefined : 'none' }} className="h-full">{children}</div>;
}
