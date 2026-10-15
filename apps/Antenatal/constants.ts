import { ConsultCategory } from './types';

export const CONSULT_DATA: ConsultCategory[] = [
  {
    id: 'prematurity',
    title: 'Prematurity',
    icon: 'Baby',
    color: 'bg-blue-600',
    referenceData: {
      headers: ['Gestation', 'Survival (In Canada)', 'Mod-Severe NDD', 'Management Pathway'],
      rows: [
        {
          'Gestation': '22 Weeks',
          'Survival (In Canada)': '25% (Range 19-31%)',
          'Mod-Severe NDD': '42% (Intl Data)',
          'Management Pathway': 'Decision-making tree required. Resus NOT offered at Level 2. Palliative Care or Transfer to Level 3 (FMC).'
        },
        {
          'Gestation': '23 Weeks',
          'Survival (In Canada)': '45% (Range 42-48%)',
          'Mod-Severe NDD': '40% (Sig Disability)',
          'Management Pathway': 'Grey Zone: Shared decision making. Immediate resus vs Palliative. Consult < working day.'
        },
        {
          'Gestation': '24 Weeks',
          'Survival (In Canada)': '69% (Range 67-71%)',
          'Mod-Severe NDD': '20% (Sig Disability)',
          'Management Pathway': 'Active management standard. Team attendance at delivery. Thermal care, CPAP/Intubation.'
        },
        {
          'Gestation': '25 Weeks',
          'Survival (In Canada)': '80% (Range 78-82%)',
          'Mod-Severe NDD': '20% (Sig Disability)',
          'Management Pathway': 'Active resus standard. Discussion on survival, acute/chronic complications, and LOS.'
        },
        {
          'Gestation': '26-28 Weeks',
          'Survival (In Canada)': '90-97%',
          'Mod-Severe NDD': '14-20%',
          'Management Pathway': 'Full resuscitation is routine. Meet and greet with parents. Discuss survival and NICU presence.'
        }
      ]
    },
    counsellingFactors: {
      worsen: [
        'Lower birth weight',
        'Early in week of gestation',
        'No maternal steroids',
        'Male sex',
        'Multiples (Twins/Triplets)'
      ],
      improve: [
        'Higher birth weight',
        'Late in week of gestation',
        'Maternal steroids (given >24h)',
        'Female sex',
        'Singleton pregnancy'
      ]
    },
    careComparison: [
      { feature: 'Survival', intensive: 'Possible', palliative: 'No' },
      { feature: 'Long-term Disability', intensive: 'Variable', palliative: 'N/A' },
      { feature: 'Quality of Life Impact', intensive: 'Yes (Child and Family)', palliative: 'Yes (Family)' },
      { feature: 'Painful Procedures', intensive: 'Yes', palliative: 'No' },
      { feature: 'Duration of NICU care', intensive: 'Months', palliative: 'Minutes to Hours' }
    ],
    templateName: '.neoantenatalprematurity',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - PREMATURITY**

**Reason for Consult:** Threatened preterm delivery at *** weeks gestation.
**Maternal History:** G*** P***.
**Pregnancy Complications:** *** (e.g., PPROM, PTL, Preeclampsia, IUGR, Chorioamnionitis).
**Medications:** Antenatal Steroids: *** (Complete/Incomplete/None). Magnesium Sulfate: ***. Antibiotics: ***.

**COUNSELING PROVIDED:**
I met with the patient (and partner/support ***) to discuss the implications of delivery at *** weeks.

**1. Survival and Prognosis:**
- Discussed current survival statistics for *** weeks gestation in Canada (approx ***%).
- Discussed Calgary-specific data for peri-viability (if 22-23 weeks).
- Long-term neurodevelopmental risks discussed (Significant Disability approx ***%). Definitions of disability provided including motor, cognitive, and sensory.

**2. Decision Making:**
- Option for intensive care vs. palliative comfort care discussed.
- Family expresses desire for ***.
- Factors affecting survival discussed: *** (Birth weight, steroids, etc).

**3. Immediate Delivery Room Management:**
- Team attendance: Neonatal team will attend delivery.
- Intensive Care: Thermal care (plastic bag), lung protection (CPAP/Intubation), surfactant.
- Palliative Care: Comfort measures, skin-to-skin, warm blankets, keepsakes.

**4. NICU Course Expectations:**
- Anticipated duration: Months in the NICU.
- Respiratory: Risk of BPD/CLD.
- Neurologic: Risk of IVH/PVL.
- Length of Stay: Anticipated discharge around original due date.

**PLAN:**
- Neonatology to attend delivery.
- Resuscitation plan: *** (Full resuscitation / Comfort Care).
- Secondary consult requested? ***.
- Family questions answered regarding ***.`
  },
  {
    id: 'neurology',
    title: 'Neurology (CNS)',
    icon: 'Brain',
    color: 'bg-purple-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Findings', 'Prognosis', 'Management'],
      rows: [
        {
          'Diagnosis': 'Ventriculomegaly',
          'Key Findings': 'Atrium ≥10mm. Mild: 10-12, Mod: 12-15, Severe: >15.',
          'Prognosis': 'Isolated mild/mod: >80-90% normal. Severe/Assoc: Poor.',
          'Management': 'Amnio (Infection/Karyotype). Fetal MRI. Postnatal US & MRI.'
        },
        {
          'Diagnosis': 'Spina Bifida',
          'Key Findings': '"Lemon" sign, "Banana" sign. Visible defect.',
          'Prognosis': 'Variable. High lumbar=wheelchair. Hydrocephalus risk ~90%.',
          'Management': 'Tertiary delivery (C-sec). Cover defect. Surgery <72h. Latex precautions.'
        }
      ]
    },
    templateName: '.neoantenatalneuro',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - CNS ANOMALY**

**Reason for Consult:** Antenatal finding of ***.
**Imaging Findings:** Ultrasound/MRI shows ***.

**COUNSELING PROVIDED:**
**1. Diagnosis & Prognosis:**
- Range of outcomes from normal to severe disability discussed.
- Potential need for VP shunt (approx risk ***%).

**2. Postnatal Management:**
- Delivery: Tertiary center required. 
- Mode of delivery: ***.
- Immediate Care: Physical exam, OFC, protect lesion (if NTD).
- Investigations: Postnatal US/MRI.

**PLAN:**
- Delivery at ***.
- Neurosurgery involvement.`
  },
  {
    id: 'cardiology',
    title: 'Cardiology',
    icon: 'Heart',
    color: 'bg-red-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Findings', 'Prognosis', 'Management'],
      rows: [
        {
          'Diagnosis': 'TGA',
          'Key Findings': 'Parallel great arteries. VSD often assoc.',
          'Prognosis': '>95% survival with Switch Op.',
          'Management': 'Duct Dependent (PGE1). May need emergent septostomy.'
        },
        {
          'Diagnosis': 'HLHS',
          'Key Findings': 'Small/absent LV, Mitral/Aortic atresia.',
          'Prognosis': 'No surgery: Lethal. Staged Surgery: ~70-80% 5yr.',
          'Management': 'Duct Dependent (PGE1). Avoid high O2. Comfort care option.'
        }
      ]
    },
    templateName: '.neoantenatalcardiac',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - CONGENITAL HEART DISEASE**

**Reason for Consult:** Fetal diagnosis of ***.

**COUNSELING PROVIDED:**
**1. Pathophysiology:** Explained duct-dependency and neonatal transition.
**2. Management Plan:**
- Delivery at Tertiary center.
- PGE1 infusion indicated? ***.
- Likely surgical course: ***.

**PLAN:**
- Cardiology to consult postnatal.`
  },
  {
    id: 'pulmonology',
    title: 'Pulmonology',
    icon: 'Wind',
    color: 'bg-teal-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Findings', 'Prognosis', 'Management'],
      rows: [
        {
          'Diagnosis': 'CDH',
          'Key Findings': 'Bowel in chest. LHR predicts severity.',
          'Prognosis': 'Mortality 30-50% (Dep. on HTN/Hypoplasia).',
          'Management': 'No Bag-mask. Intubate immediately. Large OG. Gentle vent.'
        }
      ]
    },
    templateName: '.neoantenatalresp',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - THORACIC ANOMALY**

**Reason for Consult:** Antenatal diagnosis of ***.

**COUNSELING PROVIDED:**
- CDH Specific: Immediate intubation, avoid bag-mask.
- Gentle ventilation strategies.
- Long term survival: Approx ***%.

**PLAN:**
- ECMO assessment if needed.
- Pediatric Surgery consult.`
  },
  {
    id: 'gastroenterology',
    title: 'GI & Abdominal',
    icon: 'Stethoscope',
    color: 'bg-orange-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Findings', 'Prognosis', 'Management'],
      rows: [
        {
          'Diagnosis': 'Gastroschisis',
          'Key Findings': 'Right of umbilicus. No membrane.',
          'Prognosis': 'Survival >90%. Risk of atresia.',
          'Management': 'Cover bowel (Silo/Wrap). Right side down. Fluids.'
        }
      ]
    },
    templateName: '.neoantenatalgi',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - ABDOMINAL WALL DEFECT**

**Reason for Consult:** ***.

**COUNSELING PROVIDED:**
- Immediate Management: Bowel protection, fluids.
- Surgical Plan: Primary vs Staged reduction.
- Feeding: Prolonged NPO likely, TPN required.

**PLAN:**
- Pediatric Surgery aware.`
  },
  {
    id: 'nephrology',
    title: 'Nephrology',
    icon: 'Droplets',
    color: 'bg-yellow-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Findings', 'Prognosis', 'Management'],
      rows: [
        {
          'Diagnosis': 'PUV',
          'Key Findings': 'Male. "Keyhole" bladder. Oligo.',
          'Prognosis': 'Risk of renal failure & pulm hypoplasia.',
          'Management': 'Urgent cath. Check lytes. Urology consult.'
        }
      ]
    },
    templateName: '.neoantenatalrenal',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - RENAL ANOMALY**

**Reason for Consult:** ***.

**COUNSELING PROVIDED:**
- Respiratory Risks: Oligohydramnios and lung development.
- Renal Function: Long term CKD risk.

**PLAN:**
- Urology / Nephrology consult.`
  },
  {
    id: 'infectious',
    title: 'Infectious Disease',
    icon: 'Bug',
    color: 'bg-green-700',
    referenceData: {
      headers: ['Infection', 'Transmission Risk', 'Effects', 'Management'],
      rows: [
        {
          'Infection': 'CMV',
          'Transmission Risk': 'Primary: 30-40%.',
          'Effects': 'IUGR, Microcephaly, Hearing loss.',
          'Management': 'PCR saliva <21d. Valganciclovir if symp.'
        }
      ]
    },
    templateName: '.neoantenatalid',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT - INFECTIOUS DISEASE**

**Reason for Consult:** Maternal infection with ***.

**COUNSELING PROVIDED:**
- Transmission Risk: Approx ***%.
- Potential Sequelae: Asymptomatic vs. Severe neuro delay.

**PLAN:**
- ID consult postnatal.`
  },
  {
    id: 'misc',
    title: 'General/Growth',
    icon: 'Scale',
    color: 'bg-gray-600',
    referenceData: {
      headers: ['Diagnosis', 'Key Issues', 'Management'],
      rows: [
        {
          'Diagnosis': 'IUGR',
          'Key Issues': 'Hypoglycemia, NEC risk.',
          'Management': 'Monitor sugar. Early feeds. Doppler eval.'
        }
      ]
    },
    templateName: '.neoantenatalgeneral',
    templateContent: `**ANTENATAL NEONATOLOGY CONSULT**

**Diagnosis:** ***.

**COUNSELING PROVIDED:**
- Stability of growth/dopplers.
- Risk of metabolic/hematologic complications.

**PLAN:**
- Glucose monitoring postnatal.`
  },
  {
    id: 'language_line',
    title: 'Virtual Language Line',
    icon: 'Globe',
    color: 'bg-indigo-600',
    externalUrl: 'https://chatgpt.com/g/g-69081e2d3a848191a2eb12f434c8f13c-neolingo',
    referenceData: { headers: [], rows: [] },
    templateName: '',
    templateContent: ''
  }
];