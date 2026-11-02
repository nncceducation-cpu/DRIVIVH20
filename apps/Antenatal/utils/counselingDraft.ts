const START = '--- LIVE COUNSELING DRAFT ---';
const END = '--- END LIVE COUNSELING DRAFT ---';
export function mergeCounselingDraft(content: string, next: string, previous = '') {
  const block = `${START}\n${next}\n${END}`;
  const start = content.indexOf(START), end = content.indexOf(END, start);
  if (start < 0 || end < start) return `${block}\n\n--- EDITABLE TEMPLATE AND ADDITIONAL NOTES ---\n${content.trimEnd()}`;
  const existing = content.slice(start + START.length, end).trim();
  const priorLines = new Set(previous.split('\n').map(line => line.trim()));
  const nextLines = new Set(next.split('\n').map(line => line.trim()));
  const edits = previous && existing !== previous.trim() ? existing.split('\n').filter(line => line.trim() && !priorLines.has(line.trim()) && !nextLines.has(line.trim())) : [];
  const retained = edits.length ? `\n\n--- RETAINED NOTE EDITS — REVIEW AGAINST CURRENT SELECTION ---\n${edits.join('\n')}\n` : '';
  return content.slice(0, start) + block + retained + content.slice(end + END.length);
}
