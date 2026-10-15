export async function generateEnhancedConsult(template = '', clinicalContext = '', _language = 'en'): Promise<string> {
  const context = clinicalContext.trim();
  if (!context) return template;
  if (context.includes('ANTENATAL CONSULTATION') || context.includes('POSTNATAL OUTCOMES')) return context;
  return `${template}\n\n--- USER-ENTERED CONTEXT / SELECTED REFERENCE ---\n${context}\n\nDraft for review: complete all *** fields and confirm which counseling and actions occurred.`;
}
export async function askClinicalQuestion(_topic = '', _question = '', _language = 'en'): Promise<string> {
  return 'Use the linked evidence source to review this question. Automated clinical answers are not enabled in this static app.';
}
