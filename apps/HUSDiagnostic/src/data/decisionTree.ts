// Decision tree reproduced verbatim from the original app's StepResult logic.
// Keys are step ids; answers are 'YES' | 'NO'. VERIFY against source before clinical use.

export type Answer = 'YES' | 'NO';
export type StepId = '1' | '2' | '3' | '4' | '4a';

export interface StepDef {
  id: StepId;
  question: string;
  // where to go for each answer; 'RESULT' ends the wizard
  yes: StepId | 'RESULT';
  no: StepId | 'RESULT';
  yesNote?: string;
  noNote?: string;
}

export const STEPS: Record<StepId, StepDef> = {
  '1': {
    id: '1',
    question: 'Is there hemorrhage within the germinal matrix AND/OR within the lateral ventricle?',
    yes: '2', no: '4',
    yesNote: 'Report positive for GMH-IVH',
    noNote: 'Report negative for GMH-IVH',
  },
  '2': {
    id: '2',
    question: 'Is the hemorrhage confined to the germinal matrix region?',
    yes: '4', no: '3',
    yesNote: 'Either common or uncommon in location + no blood in the lateral ventricle = Grade I GMH-IVH',
    noNote: 'Blood is detected in the lateral ventricle or on the choroid plexus = Grade II or III GMH-IVH',
  },
  '3': {
    id: '3',
    question: 'Is the IVH distending the ipsilateral lateral ventricle AND anterior horn width (AHW) > 6 mm?',
    yes: '4', no: '4',
    yesNote: 'Grade III GMH-IVH',
    noNote: 'Grade II GMH-IVH',
  },
  '4': {
    id: '4',
    question: 'Is there focal echogenicity in the periventricular white matter adjacent (i.e., ipsilateral) to the side of GMH-IVH?',
    yes: '4a', no: 'RESULT',
  },
  '4a': {
    id: '4a',
    question: 'Is there Grade I, II, or III GMH-IVH present?',
    yes: 'RESULT', no: 'RESULT',
  },
};

export type Answers = Partial<Record<StepId, Answer>>;

// Final result mapping, reproduced verbatim from StepResult.renderResult.
export function computeResult(a: Answers): { title: string; images?: string[] } {
  const eq = (o: Answers) =>
    (Object.keys(o) as StepId[]).every((k) => a[k] === o[k]) &&
    (Object.keys(a) as StepId[]).every((k) => o[k] === undefined || a[k] === o[k]);

  // [1]==YES && [4]==YES (any 4a) -> PVHI
  if (a['1'] === 'YES' && a['4'] === 'YES')
    return { title: 'GMH-IVH is present, report as periventricular hemorrhagic infarction (PVHI).', images: ['fig5'] };
  // {1:NO, 4:YES} -> significant ischemic injury
  if (a['1'] === 'NO' && a['4'] === 'YES')
    return { title: 'GMH-IVH is NOT present, report as significant ischemic injury.', images: ['fig7'] };
  // {1:NO, 4:NO} -> normal
  if (a['1'] === 'NO' && a['4'] === 'NO')
    return { title: 'Normal or negative scan' };
  // {1:YES, 2:NO, 3:NO, 4:NO} -> Grade II
  if (eq({ '1': 'YES', '2': 'NO', '3': 'NO', '4': 'NO' }))
    return { title: 'Grade II GMH-IVH', images: ['fig3'] };
  // {1:YES, 2:NO, 3:YES, 4:NO} -> Grade III
  if (eq({ '1': 'YES', '2': 'NO', '3': 'YES', '4': 'NO' }))
    return { title: 'Grade III GMH-IVH', images: ['fig4'] };
  // {1:YES, 2:YES, 4:NO} -> Grade I
  if (a['1'] === 'YES' && a['2'] === 'YES' && a['4'] === 'NO')
    return { title: 'Either common or uncommon in location + no blood in the lateral ventricle = Grade I GMH-IVH', images: ['fig2'] };
  return { title: 'Please try again' };
}
