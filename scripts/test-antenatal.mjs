import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const importTS = async file => {
 const source = readFileSync(new URL(file, import.meta.url), 'utf8');
 const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
};
const { generateEnhancedConsult } = await importTS('../apps/Antenatal/services/geminiService.ts');
const template = 'GA: ***; steroids: ***; resuscitation: ***';
assert.equal(await generateEnhancedConsult(template, ''), template);
const draft=await generateEnhancedConsult(template, '24 weeks, PPROM');
assert.ok(draft.startsWith(template));
assert.ok(draft.includes('24 weeks, PPROM'));
assert.ok(!draft.includes('Complete (2 doses given)'));
assert.ok(!draft.includes('full active resuscitation'));
const structured = '**ANTENATAL CONSULTATION DRAFT**\nCare goal: pending';
assert.equal(await generateEnhancedConsult(template,structured),structured);
const { RISK_DATA } = await importTS('../apps/Antenatal/riskData.ts');
assert.deepEqual(Object.keys(RISK_DATA.prematurity.profiles),['22','23','24','25','26','27','28']);
assert.deepEqual(Object.values(RISK_DATA.prematurity.profiles).map(p=>p.stats[0].value),[25,45,69,80,90,95,97]);
const { calculateCNNPrediction, formatCNNPostnatalNote } = await importTS('../apps/Antenatal/utils/cnnCalculatorModel.ts');
let cases=0;
for(const dayOfLife of [7,14,28]) for(let gestationalAge=22;gestationalAge<=29;gestationalAge++) for(const birthWeight of [250,675,1750]) for(const sex of ['male','female']) for(const respiratorySupport of ['ventilator','cpap','cannula','room_air']) {
 const input={dayOfLife,gestationalAge,birthWeight,sex,respiratorySupport};
 const result=calculateCNNPrediction(input);
 for(const key of ['survivalToDischarge','mortalityPriorToDischarge','mortalityOrMajorMorbidity','survivalWithoutMajorMorbidity','deathOrBPD','deathOrModSevereBPD','severeROP','pvl','lateNEC']) assert.ok(Number.isFinite(result[key]) && result[key]>=0 && result[key]<=100,key);
 assert.equal(result.survivalToDischarge+result.mortalityPriorToDischarge,100);
 assert.equal(result.survivalWithoutMajorMorbidity+result.mortalityOrMajorMorbidity,100);
 const note=formatCNNPostnatalNote(input,result);
 assert.ok(note.includes('not the official CNN NOPS model'));
 assert.ok(!note.includes('**Source:** Canadian Neonatal Network'));
 cases++;
}
console.log(`Antenatal reference and draft checks passed; ${cases} illustrative model cases checked. These are software checks, not clinical validation.`);
