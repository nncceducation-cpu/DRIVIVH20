import { RISK_DATA } from '../riskData';
import { PARENT_COUNSELING_DATABASE } from '../data/counselingData';
import { VON_NETWORK_REPORT } from '../data/vonNetworkReport';
import { VON_HISTORICAL_GA } from '../data/vonHistorical';

export const REFERENCE_WARNING = 'Imported NeoConsult reference figures; cohort attribution has not been independently verified. These are not individualized predictions.';
export function getGestationContext(weeks: number) {
  const profile = RISK_DATA.prematurity.profiles[String(weeks)];
  if (!profile) throw new Error('Select a completed gestational week from 22 to 28.');
  const statistics = profile.stats.map(stat => `${stat.label}: ${stat.value}%`).join('; ');
  const reference = `${weeks} completed weeks. ${statistics}. ${REFERENCE_WARNING}`;
  return { weeks, profile, statistics, reference };
}

export function getGestationCounseling(weeks: number, careGoal: 'active' | 'palliative' | 'pending' = 'pending') {
  const base = PARENT_COUNSELING_DATABASE.prematurity;
  const { reference } = getGestationContext(weeks);
  return {
    ...base,
    diagnosticSummary: base.diagnosticSummary.replace('at borderline viability (22-28 weeks gestation)', `at ${weeks} completed weeks gestation`),
    deliveryRoomPlan: `Selected gestation: ${weeks} completed weeks. ` + (careGoal === 'active' ? base.deliveryRoomPlan.split(' If comfort care elected:')[0] : careGoal === 'palliative' ? `Selected goal: palliative comfort care. ${base.deliveryRoomPlan.split('If comfort care elected: ')[1]}` : `Care goal pending; the following alternatives require discussion, not confirmation of a plan. ${base.deliveryRoomPlan}`),
    nicuExpectations: careGoal === 'palliative' ? `For delivery at ${weeks} completed weeks, palliative comfort care is selected. The intensive NICU course is not the selected care pathway. Confirm and document the individualized comfort-care plan.` : `For delivery at ${weeks} completed weeks${careGoal === 'pending' ? ', if intensive care is chosen' : ''}: ${base.nicuExpectations}`,
    longTermPrognosis: reference,
    faqs: base.faqs.map(faq => {
      if (faq.id === 'prem_survival' || faq.id === 'prem_disability') return {
        ...faq, question: faq.id === 'prem_survival' ? `What are the survival reference figures at ${weeks} weeks?` : `What are the developmental outcome reference figures at ${weeks} weeks?`,
        answer: reference, evidenceRef: 'Imported NeoConsult gestation table; source attribution unverified'
      };
      if (faq.id === 'prem_postnatal_survival') return { ...faq,
        answer: `For an infant born at ${weeks} weeks, postnatal estimates also depend on the day of life and clinical course. Use the official CNN calculator for postnatal NOPS predictions; the antenatal reference figures are not conditional survival estimates.`,
        evidenceRef: 'Official CNN calculator: https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx'
      };
      return { ...faq, answer: `Selected gestation: ${weeks} completed weeks. ${faq.answer}` };
    })
  };
}

const START = '--- CURRENT GESTATION REFERENCE (AUTO-UPDATED) ---';
const END = '--- END CURRENT GESTATION REFERENCE ---';
export function getDraftOutcomeLines(weeks: number) {
  const { profile } = getGestationContext(weeks);
  return {
    survival: `- Antenatal survival reference to review for ${weeks} completed weeks: ${profile.stats[0].value}% with active care (imported NeoConsult figure; CNN attribution unverified).`,
    disability: `- Developmental outcome reference to review for ${weeks} completed weeks: ${profile.stats[1].label} ${profile.stats[1].value}% (imported NeoConsult figure; source attribution and denominator unverified).`
  };
}

export function fillConsultNumbers(content: string, weeks: number) {
  const lines = getDraftOutcomeLines(weeks);
  return content
    .replaceAll('*** weeks', `${weeks} weeks`)
    .replaceAll(`- Discussed current survival statistics for ${weeks} weeks gestation in Canada (approx ***%).`, lines.survival)
    .replaceAll('- Long-term neurodevelopmental risks discussed (Significant Disability approx ***%). Definitions of disability provided including motor, cognitive, and sensory.', lines.disability);
}

export function formatVONNetworkReference() {
  return `VON NETWORK BENCHMARKS — ${VON_NETWORK_REPORT.reportYear} VLBW (all gestations combined)\n` +
    VON_NETWORK_REPORT.metrics.filter(metric => metric.kind === 'Outcome').map(metric =>
      `${metric.name.replace(' - Your Center', '')}: ${metric['2025'].percent}% (reported N=${metric['2025'].n.toLocaleString('en-US')})`
    ).join('; ') +
    `\nSource: ${VON_NETWORK_REPORT.title}, page ${VON_NETWORK_REPORT.sourcePage}; generated ${VON_NETWORK_REPORT.generatedOn}; Network columns only. Reported N is not the event count. These are aggregate benchmarks, not this infant's predicted risks. This report supplies no VON survival, NDD or gestation-specific estimates.\nhttps://nncceducation-cpu.github.io/VON-benchmark/`;
}
export function formatVONHistoricalReference(weeks: number) {
  getGestationContext(weeks);
  const band = weeks < 24 ? '< 24' : weeks <= 26 ? '24-26' : '27-29';
  const mortality = VON_HISTORICAL_GA.stats[0].rates[band];
  const survival = Number((100 - mortality).toFixed(1));
  return `VON HISTORICAL 2023 — GA band ${band} weeks\nDerived survival: ${survival}% (100 minus reported mortality ${mortality}%). ` +
    VON_HISTORICAL_GA.stats.slice(1).map(metric => `${metric.name}: ${metric.rates[band]}%`).join('; ') +
    '\nSource: historical 2023 table copied from the original VON benchmark app; original cohort attribution has not been independently verified. These are grouped GA figures, not single-week or individualized predictions. Survival is an arithmetic complement, not a separately reported endpoint. These figures are separate from the 2025 Network report.\nhttps://nncceducation-cpu.github.io/VON-benchmark/';
}
export function syncGestationReference(content: string, weeks: number): string {
  content = fillConsultNumbers(content, weeks);
  const block = `${START}\n${getGestationContext(weeks).reference}\n\n${formatVONHistoricalReference(weeks)}\n\n${formatVONNetworkReference()}\n${END}`;
  const start = content.indexOf(START), end = content.indexOf(END, start);
  if (start >= 0 && end >= start) return content.slice(0, start) + block + content.slice(end + END.length);
  return `${content}\n\n${block}`;
}

export function syncGestationDraft(content: string, previous: number, next: number): string {
  const oldData = getGestationCounseling(previous), newData = getGestationCounseling(next);
  let result = content;
  const previousLines = getDraftOutcomeLines(previous), nextLines = getDraftOutcomeLines(next);
  result = result.replaceAll(previousLines.survival, nextLines.survival).replaceAll(previousLines.disability, nextLines.disability);
  const riskContext = (weeks: number) => {
    const { profile } = getGestationContext(weeks);
    return `Diagnosis/Situation: ${profile.name}. Statistics: ${profile.stats.map(s => `${s.label}: ${s.value}%`).join(', ')}. Typical Management: ${profile.managementPath.join('. ')}.`;
  };
  result = result.replaceAll(riskContext(previous), riskContext(next));
  for (const key of ['diagnosticSummary', 'deliveryRoomPlan', 'nicuExpectations', 'longTermPrognosis'] as const) {
    result = result.replaceAll(oldData[key], newData[key]);
  }
  oldData.faqs.forEach((faq, index) => {
    result = result.replaceAll(faq.question, newData.faqs[index].question).replaceAll(faq.answer, newData.faqs[index].answer);
  });
  result = result.replaceAll(`**Gestational Age:** ${previous} completed weeks`, `**Gestational Age:** ${next} completed weeks`)
    .replaceAll(`Threatened preterm delivery at ${previous} weeks`, `Threatened preterm delivery at ${next} weeks`)
    .replaceAll(`implications of delivery at ${previous} weeks`, `implications of delivery at ${next} weeks`)
    .replaceAll(`statistics for ${previous} weeks`, `statistics for ${next} weeks`);
  return syncGestationReference(result, next);
}
