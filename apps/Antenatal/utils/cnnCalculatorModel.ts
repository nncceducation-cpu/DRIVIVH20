export type PostnatalDay = 7 | 14 | 28;
export type InfantSex = 'male' | 'female';
export type RespiratorySupportType = 'ventilator' | 'cpap' | 'cannula' | 'room_air';

export interface CNNPredictionInput {
  dayOfLife: PostnatalDay;
  gestationalAge: number; // 22 - 29
  birthWeight: number; // 250 - 1750
  sex: InfantSex;
  respiratorySupport: RespiratorySupportType;
}

export interface WeightPercentileInfo {
  percentile: number;
  category: 'SGA' | 'AGA' | 'LGA';
  medianForGA: number;
  p10: number;
  p90: number;
}

export interface CNNPredictionResult {
  // Primary outcomes (CNN NOPS definitions)
  survivalToDischarge: number; // e.g. 87.5%
  mortalityPriorToDischarge: number; // e.g. 12.5%
  mortalityOrMajorMorbidity: number; // Death, PVL, Severe ROP, or NEC
  survivalWithoutMajorMorbidity: number;
  deathOrBPD: number; // O2/support at 36w PMA or Level 3 discharge
  deathOrModSevereBPD: number; // Invasive or non-invasive positive pressure at 36w PMA

  // Specific Morbidities
  severeROP: number; // Stage >= 3 or treated
  pvl: number; // Periventricular Leukomalacia
  lateNEC: number; // Stage 2/3 after prediction day

  // Longitudinal trajectory (conditional survival from Day 1 to Day 28)
  baselineBirthSurvival: number;
  day7Survival: number;
  day14Survival: number;
  day28Survival: number;

  // Growth context
  weightInfo: WeightPercentileInfo;

  // Clinical Summary
  clinicalInterpretation: string;
}

// Fenton growth references for 22-29 weeks (Combined male/female average reference)
const FENTON_GROWTH_REFERENCE: Record<number, { p10: number; p50: number; p90: number; sd: number }> = {
  22: { p10: 430, p50: 505, p90: 590, sd: 62 },
  23: { p10: 495, p50: 585, p90: 690, sd: 75 },
  24: { p10: 570, p50: 675, p90: 800, sd: 90 },
  25: { p10: 650, p50: 775, p90: 920, sd: 105 },
  26: { p10: 740, p50: 885, p90: 1050, sd: 120 },
  27: { p10: 840, p50: 1005, p90: 1200, sd: 140 },
  28: { p10: 950, p50: 1140, p90: 1360, sd: 160 },
  29: { p10: 1070, p50: 1290, p90: 1540, sd: 180 },
};

export function getWeightPercentile(ga: number, bw: number): WeightPercentileInfo {
  const ref = FENTON_GROWTH_REFERENCE[ga] || FENTON_GROWTH_REFERENCE[24];
  const zScore = (bw - ref.p50) / ref.sd;
  
  // Approximate standard normal CDF
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp((-zScore * zScore) / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (zScore > 0) prob = 1 - prob;
  const percentile = Math.min(99, Math.max(1, Math.round(prob * 100)));

  let category: 'SGA' | 'AGA' | 'LGA' = 'AGA';
  if (bw < ref.p10) category = 'SGA';
  else if (bw > ref.p90) category = 'LGA';

  return {
    percentile,
    category,
    medianForGA: ref.p50,
    p10: ref.p10,
    p90: ref.p90
  };
}

/**
 * Calculates Postnatal Prediction of Mortality and Major Morbidities
 * Imported illustrative heuristic; not the official CNN NOPS model.
 * for infants 22 0/7 to 29 6/7 weeks GA, BW 250 - 1750g
 */
export function calculateCNNPrediction(input: CNNPredictionInput): CNNPredictionResult {
  const { dayOfLife, gestationalAge, birthWeight, sex, respiratorySupport } = input;
  const ga = Math.min(29, Math.max(22, gestationalAge));
  const bw = Math.min(1750, Math.max(250, birthWeight));
  const weightInfo = getWeightPercentile(ga, bw);

  // Baseline birth mortality rate for GA (Canadian Neonatal Network active resuscitation benchmark)
  const baselineMortalityMap: Record<number, number> = {
    22: 0.75, // 25% survival
    23: 0.55, // 45% survival
    24: 0.31, // 69% survival
    25: 0.20, // 80% survival
    26: 0.10, // 90% survival
    27: 0.05, // 95% survival
    28: 0.03, // 97% survival
    29: 0.02  // 98% survival
  };

  const birthMortality = baselineMortalityMap[ga] ?? 0.20;
  const baselineBirthSurvival = Math.round((1 - birthMortality) * 100);

  // Surviving to Day 7, 14, 28 significantly filters out early mortality.
  // In CNN cohort, ~65-75% of preterm deaths occur in the first week, ~85% by day 14.
  // Residual conditional mortality odds multipliers:
  const dayMortalityModifier: Record<PostnatalDay, number> = {
    7: 0.42,  // Surviving day 7 removes ~58% of mortality risk
    14: 0.26, // Surviving day 14 removes ~74% of mortality risk
    28: 0.14  // Surviving day 28 removes ~86% of mortality risk
  };

  // Sex adjustment: Males have ~1.25x higher odds of mortality in CNN data
  const sexMortalityOdds = sex === 'male' ? 1.15 : 0.88;

  // Birth weight adjustment relative to median for GA
  // Each 100g below median increases mortality odds by ~18%; each 100g above decreases it
  const weightDiffHundredGrams = (weightInfo.medianForGA - bw) / 100;
  const weightMortalityOdds = Math.pow(1.18, weightDiffHundredGrams);

  // Respiratory support modifier on mortality
  const respMortalityOddsMap: Record<RespiratorySupportType, number> = {
    ventilator: 1.35,
    cpap: 0.85,
    cannula: 0.55,
    room_air: 0.40
  };
  const respMortalityOdds = respMortalityOddsMap[respiratorySupport];

  // Calculate conditional mortality for each landmark day
  const calcConditionalMortality = (day: PostnatalDay): number => {
    const baseOdds = (birthMortality / (1 - birthMortality));
    const conditionalOdds = baseOdds * dayMortalityModifier[day] * sexMortalityOdds * weightMortalityOdds * respMortalityOdds;
    const prob = conditionalOdds / (1 + conditionalOdds);
    return Math.min(0.85, Math.max(0.01, prob));
  };

  const d7Mort = calcConditionalMortality(7);
  const d14Mort = calcConditionalMortality(14);
  const d28Mort = calcConditionalMortality(28);

  const day7Survival = Math.round((1 - d7Mort) * 100);
  const day14Survival = Math.round((1 - d14Mort) * 100);
  const day28Survival = Math.round((1 - d28Mort) * 100);

  const activeMortality = calcConditionalMortality(dayOfLife);
  const mortalityPriorToDischarge = Number((activeMortality * 100).toFixed(1));
  const survivalToDischarge = Number((100 - mortalityPriorToDischarge).toFixed(1));

  // --- Bronchopulmonary Dysplasia (BPD) Prediction ---
  // Defined by CNN as oxygen or respiratory support at 36w PMA or Level 3 discharge
  // Base BPD rates by GA:
  const baseBPDMap: Record<number, number> = {
    22: 0.85,
    23: 0.78,
    24: 0.68,
    25: 0.54,
    26: 0.40,
    27: 0.28,
    28: 0.18,
    29: 0.11
  };
  const baseBPD = baseBPDMap[ga] ?? 0.40;

  // Respiratory support is a major predictor of BPD at Day 7, 14, 28
  const respBPDMultiplier: Record<RespiratorySupportType, number> = {
    ventilator: 1.55,
    cpap: 1.05,
    cannula: 0.65,
    room_air: 0.30
  };

  // Male sex is associated with higher BPD
  const sexBPDMultiplier = sex === 'male' ? 1.12 : 0.90;
  // Weight deficit increases BPD
  const weightBPDMultiplier = Math.pow(1.12, weightDiffHundredGrams);

  let bpdProb = baseBPD * respBPDMultiplier[respiratorySupport] * sexBPDMultiplier * weightBPDMultiplier;
  bpdProb = Math.min(0.95, Math.max(0.05, bpdProb));
  
  // Composite: Death or BPD
  const deathOrBPD = Number(Math.min(98, Math.max(mortalityPriorToDischarge, (mortalityPriorToDischarge + (100 - mortalityPriorToDischarge) * bpdProb))).toFixed(1));

  // Moderate to severe BPD (Invasive or non-invasive positive pressure at 36 weeks PMA)
  const modSevereBPDProb = bpdProb * (respiratorySupport === 'ventilator' ? 0.75 : 0.55);
  const deathOrModSevereBPD = Number(Math.min(96, Math.max(mortalityPriorToDischarge, (mortalityPriorToDischarge + (100 - mortalityPriorToDischarge) * modSevereBPDProb))).toFixed(1));

  // --- Severe ROP (Stage >=3 or laser/VEGF) ---
  const baseROPMap: Record<number, number> = {
    22: 0.32,
    23: 0.26,
    24: 0.20,
    25: 0.14,
    26: 0.08,
    27: 0.04,
    28: 0.02,
    29: 0.01
  };
  let ropProb = (baseROPMap[ga] ?? 0.10) * Math.pow(1.15, weightDiffHundredGrams);
  if (respiratorySupport === 'ventilator') ropProb *= 1.25;
  const severeROP = Number((Math.min(0.45, Math.max(0.01, ropProb)) * 100).toFixed(1));

  // --- Periventricular Leukomalacia (PVL) ---
  // PVL incidence in CNN cohort is roughly 3-6%
  const basePVL = (0.055 - (ga - 22) * 0.004) * (weightInfo.category === 'SGA' ? 1.3 : 1.0);
  const pvl = Number((Math.min(0.10, Math.max(0.015, basePVL)) * 100).toFixed(1));

  // --- Late Necrotizing Enterocolitis (Stage 2/3 after prediction day) ---
  // In infants surviving to Day 7/14/28, NEC risk remaining:
  const dayNECMultiplier: Record<PostnatalDay, number> = {
    7: 0.85,
    14: 0.60,
    28: 0.30
  };
  const baseNECMap: Record<number, number> = {
    22: 0.09,
    23: 0.08,
    24: 0.07,
    25: 0.06,
    26: 0.045,
    27: 0.035,
    28: 0.025,
    29: 0.018
  };
  let necProb = (baseNECMap[ga] ?? 0.05) * dayNECMultiplier[dayOfLife] * (weightInfo.category === 'SGA' ? 1.4 : 1.0);
  const lateNEC = Number((Math.min(0.15, Math.max(0.01, necProb)) * 100).toFixed(1));

  // --- Composite: Mortality or Major Neonatal Morbidity ---
  // Major morbidity: PVL, Severe ROP, or NEC
  const anyMajorMorbidityProb = 1 - (1 - ropProb) * (1 - basePVL) * (1 - necProb);
  const mortOrMajorMorbidityProb = (activeMortality + (1 - activeMortality) * anyMajorMorbidityProb);
  const mortalityOrMajorMorbidity = Number(Math.min(99, Math.max(mortalityPriorToDischarge, mortOrMajorMorbidityProb * 100)).toFixed(1));
  const survivalWithoutMajorMorbidity = Number((100 - mortalityOrMajorMorbidity).toFixed(1));

  // Clinical interpretation text
  const sexStr = sex === 'male' ? 'male' : 'female';
  const weightStr = `${bw}g (${weightInfo.category}, ~${weightInfo.percentile}th percentile)`;
  const respLabels: Record<RespiratorySupportType, string> = {
    ventilator: 'invasive mechanical ventilation',
    cpap: 'non-invasive CPAP/NIPPV',
    cannula: 'low-flow nasal cannula',
    room_air: 'room air unassisted'
  };

  const interpretation = `Educational illustration from the supplied NeoConsult app for a ${ga}-week ${sexStr} infant at Day ${dayOfLife}, ${weightStr}, receiving ${respLabels[respiratorySupport]}. The imported heuristic produces survival ${survivalToDischarge}% and death-or-BPD ${deathOrBPD}%. These outputs are not validated CNN NOPS predictions. Use the official CNN calculator for patient-specific estimates.`;

  return {
    survivalToDischarge,
    mortalityPriorToDischarge,
    mortalityOrMajorMorbidity,
    survivalWithoutMajorMorbidity,
    deathOrBPD,
    deathOrModSevereBPD,
    severeROP,
    pvl,
    lateNEC,
    baselineBirthSurvival,
    day7Survival,
    day14Survival,
    day28Survival,
    weightInfo,
    clinicalInterpretation: interpretation
  };
}

/**
 * Format a comprehensive clinical consultation note for EMR export
 */
export function formatCNNPostnatalNote(input: CNNPredictionInput, result: CNNPredictionResult): string {
  const { dayOfLife, gestationalAge, birthWeight, sex, respiratorySupport } = input;
  const respLabels: Record<RespiratorySupportType, string> = {
    ventilator: 'Invasive Mechanical Ventilation (ET / HFOV)',
    cpap: 'Non-Invasive Positive Pressure (CPAP / NIPPV / High Flow)',
    cannula: 'Low-Flow Nasal Cannula Oxygen',
    room_air: 'Room Air (Unassisted)'
  };

  return `**NEONATAL POSTNATAL OUTCOMES - EDUCATIONAL DRAFT**
**Source:** Heuristic model copied from supplied NeoConsult app; not the official CNN NOPS model.
**Web Reference:** https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx
**Validation:** Not independently validated; outputs are educational illustrations only.

--- CLINICAL PROFILE AT ASSESSMENT ---
- **Postnatal Age at Assessment:** Day ${dayOfLife} of life
- **Gestational Age at Birth:** ${gestationalAge} completed weeks
- **Birth Weight:** ${birthWeight} grams (${result.weightInfo.category}, ${result.weightInfo.percentile}th percentile; median for GA: ${result.weightInfo.medianForGA}g)
- **Infant Sex:** ${sex.toUpperCase()}
- **Current Respiratory Support:** ${respLabels[respiratorySupport]}

--- ESTIMATED OUTCOME PROBABILITIES ---
1. **Survival to NICU Discharge:** ${result.survivalToDischarge}% (Mortality prior to discharge: ${result.mortalityPriorToDischarge}%)
   - Trajectory Progression: Birth Baseline: ${result.baselineBirthSurvival}% | Day 7: ${result.day7Survival}% | Day 14: ${result.day14Survival}% | Day 28: ${result.day28Survival}%
2. **Survival Without Major Neonatal Morbidity:** ${result.survivalWithoutMajorMorbidity}%
3. **Mortality or Major Morbidity (PVL, severe ROP, or NEC):** ${result.mortalityOrMajorMorbidity}%
4. **Death or Bronchopulmonary Dysplasia (BPD at 36w PMA):** ${result.deathOrBPD}%
5. **Death or Moderate-to-Severe BPD:** ${result.deathOrModSevereBPD}%
6. **Component Morbidity Risks:**
   - Severe Retinopathy of Prematurity (Stage >= 3 or treated): ${result.severeROP}%
   - Periventricular Leukomalacia (PVL): ${result.pvl}%
   - Late-Onset Necrotizing Enterocolitis (post-Day ${dayOfLife}): ${result.lateNEC}%

--- CLINICAL INTERPRETATION & PARENT COUNSELING ---
${result.clinicalInterpretation}

**PLAN & RECOMMENDATIONS:**
- Discuss updated conditional survival and morbidity benchmarks with parents.
- Target pulmonary protective strategies to mitigate BPD progression.
- Continue serial cranial ultrasound surveillance for white matter injury.
- Schedule ophthalmology ROP screening as per standard protocol (31-32 weeks PMA or 4 weeks postnatal).
- Maximize maternal breast milk enteral nutrition to safeguard against NEC and BPD.`;
}
