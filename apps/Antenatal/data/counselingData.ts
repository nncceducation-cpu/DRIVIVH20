export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  evidenceRef: string;
  category: string;
}

export interface StructuredConsultSummary {
  categoryId: string;
  diagnosticSummary: string;
  deliveryRoomPlan: string;
  nicuExpectations: string;
  longTermPrognosis: string;
  communicationKeyPoints: string[];
  faqs: FAQItem[];
}

export const PARENT_COUNSELING_DATABASE: Record<string, StructuredConsultSummary> = {
  prematurity: {
    categoryId: 'prematurity',
    diagnosticSummary: 'Antenatal neonatology consultation for threatened extremely preterm delivery at borderline viability (22-28 weeks gestation). Diagnostic certainty based on obstetric ultrasound dating and clinical presentation (PPROM, PTL, or maternal indications).',
    deliveryRoomPlan: 'Neonatal resuscitation team present at delivery. Thermal protection using polyethylene wrap and radiant warmer. Respiratory support with immediate CPAP or intubation and surfactant administration. If comfort care elected: immediate warm blankets, skin-to-skin contact, and memory making.',
    nicuExpectations: 'Prolonged NICU stay (average discharge near original estimated due date). Multi-system support: mechanical ventilation/CPAP for respiratory distress, central lines (UVC/UAC), total parenteral nutrition (TPN) transitioning to expressed breast milk, cranial ultrasound surveillance.',
    longTermPrognosis: 'Survival increases significantly with each completed week (22w ~25%, 23w ~45%, 24w ~69%, 25w ~80%, 26-28w 90-97%). Long-term neurodevelopmental disability risk decreases from ~40-42% at 22-23w to ~20% at 24-25w and <5-10% at 28+ weeks.',
    communicationKeyPoints: [
      'Empathetic, non-directive discussion on options for active resuscitation vs. palliative comfort care at peri-viable gestations.',
      'Clear explanation of survival probabilities vs. risk of long-term neurodevelopmental disability.',
      'Highlighting factors that improve outcomes (complete course of maternal betamethasone, higher birth weight, female sex).',
      'Encouraging early maternal breast milk expression to protect against Necrotizing Enterocolitis (NEC).',
      'Introduction to social work, NICU tour, and parent support networks.'
    ],
    faqs: [
      {
        id: 'prem_survival',
        category: 'prematurity',
        question: 'Will my baby survive if born at this gestational age?',
        answer: 'Survival depends strongly on gestational age, birth weight, and whether antenatal steroids were given. In Canadian and benchmark centers: at 22 weeks survival is ~25%; 23 weeks is ~45%; 24 weeks is ~69%; 25 weeks is ~80%; and 26-28 weeks is 90-97%. Receiving two doses of maternal steroids (>24 hours before birth) significantly improves lung maturity and survival.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 3-10); Canadian Neonatal Network'
      },
      {
        id: 'prem_disability',
        category: 'prematurity',
        question: 'Will my baby have long-term brain damage or special needs?',
        answer: 'Surviving extremely premature infants are at risk for neurodevelopmental disabilities including cerebral palsy, cognitive delay, learning difficulties, or visual/hearing impairment. The risk of moderate-to-severe disability is ~40-42% at 22-23 weeks, ~20% at 24-25 weeks, and drops to under 5-10% at 28-32 weeks. Routine cranial ultrasounds in the NICU screen for intraventricular hemorrhage (IVH) and white matter injury.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 10)'
      },
      {
        id: 'prem_delivery',
        category: 'prematurity',
        question: 'What will happen to my baby immediately after delivery?',
        answer: 'A specialized neonatal team will be present in the delivery room. For active care, the baby is placed in a warm plastic wrap to prevent heat loss, a gentle breathing mask (CPAP) or breathing tube is placed, and medications like surfactant are given before transfer to the NICU incubator. If you choose comfort care, the baby is dried, placed in warm blankets directly on your chest for skin-to-skin bonding, and kept peaceful.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 1 & 3)'
      },
      {
        id: 'prem_holding',
        category: 'prematurity',
        question: 'Will I be able to see, hold, or touch my baby?',
        answer: 'If the baby is undergoing active resuscitation, you and your partner will see and touch your baby briefly in the birth room before immediate transfer to the NICU. Once stabilized in the incubator, parents are encouraged to touch, talk to, and participate in "kangaroo care" (skin-to-skin holding) as soon as the baby is medical stable.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 1)'
      },
      {
        id: 'prem_breastfeeding',
        category: 'prematurity',
        question: 'Can I breastfeed or provide milk for my premature baby?',
        answer: 'Premature babies cannot coordinate sucking and swallowing until around 34 weeks, so milk is given through a tiny tube into the stomach. However, your expressed breast milk is the most powerful medicine for your baby—it dramatically reduces the risk of serious gut infections like Necrotizing Enterocolitis (NEC). Lactation consultants will help you start pumping within hours of delivery.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 4 & 5)'
      },
      {
        id: 'prem_length_stay',
        category: 'prematurity',
        question: 'How long will my baby need to stay in the hospital?',
        answer: 'As a general rule, extremely premature babies remain in the hospital until around their original estimated due date. Average hospital stays range from 120-144 days for babies born at 23-24 weeks, to 80-100 days for 25-26 weeks, and 40-60 days for 27-28 weeks.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 10, Figure 10.2)'
      },
      {
        id: 'prem_postnatal_survival',
        category: 'prematurity',
        question: 'Does my baby\'s chance of survival improve as days go by in the NICU?',
        answer: 'Yes, significantly. Survival odds improve continuously as the baby reaches milestones (conditional survival). In the Canadian Neonatal Network (CNN) NOPS model, an infant born at 24 weeks has ~69% survival at birth, but once surviving the critical first week (Day 7), conditional survival to discharge rises to ~84-86%, by Day 14 to ~90%, and by Day 28 surpasses 94-96%. Early acute mortality risks diminish, allowing the team to concentrate on lung protection, nutrition, and neurodevelopment.',
        evidenceRef: 'Canadian Neonatal Network (CNN) NOPS Cohort (2010–2023, n=26,719); https://www.canadianneonatalnetwork.org/CAL/Calculator.aspx'
      }
    ]
  },
  neurology: {
    categoryId: 'neurology',
    diagnosticSummary: 'Antenatal consultation for central nervous system anomaly (Ventriculomegaly, Neural Tube Defect / Spina Bifida, Dandy-Walker, or Agenesis of Corpus Callosum). Diagnosis established by detailed 2D/3D fetal ultrasound and fetal MRI.',
    deliveryRoomPlan: 'Delivery planned at a tertiary perinatal facility with pediatric neurosurgery services. For Spina Bifida: elective C-section recommended if hydrocephalus or breech, sterile saline wrap over spinal placode, prone position nursing, latex-free environment.',
    nicuExpectations: 'Physical exam and serial head circumference (OFC) monitoring. Cranial ultrasound and postnatal brain/spine MRI. Neurosurgical evaluation for spinal defect closure within 24-72 hours and VP shunt placement if hydrocephalus develops (~90% risk in myelomeningocele).',
    longTermPrognosis: 'Ventriculomegaly: Isolated mild (10-12mm) carries >90% normal developmental outcome; severe (>15mm) has higher risk of cognitive delay. Spina Bifida: Motor function correlates with lesion level (low lumbar L4-S1 walk independently with orthoses; thoracic require wheelchair).',
    communicationKeyPoints: [
      'Explaining the role of postnatal confirmation with MRI and ultrasound.',
      'Discussing the likelihood of hydrocephalus and VP shunt placement.',
      'Setting realistic expectations regarding mobility, bowel/bladder management (neurogenic bladder), and cognitive outlook based on lesion level.',
      'Highlighting multidisciplinary team care (Neurosurgery, Urology, Orthopedics, Physiotherapy).'
    ],
    faqs: [
      {
        id: 'neuro_shunt',
        category: 'neurology',
        question: 'Will my baby need brain surgery or a shunt?',
        answer: 'If fluid builds up in the brain (hydrocephalus), a small silicone tube called a Ventriculoperitoneal (VP) Shunt is inserted by a neurosurgeon to drain excess fluid safely into the abdomen. Hydrocephalus occurs in ~90% of babies with myelomeningocele (spina bifida) and in severe ventriculomegaly.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 48 & 49)'
      },
      {
        id: 'neuro_walking',
        category: 'neurology',
        question: 'For Spina Bifida, will my baby be able to walk?',
        answer: 'Ability to walk depends primarily on the spinal level of the defect. Children with low lumbar (L4-L5) or sacral lesions have strong hip and knee muscles and usually walk independently with leg braces. Children with high lumbar or thoracic lesions have lower limb paralysis and use a wheelchair for primary mobility.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 49, p. 263-264)'
      },
      {
        id: 'neuro_intellect',
        category: 'neurology',
        question: 'Will my child have normal intelligence?',
        answer: 'For isolated mild-to-moderate ventriculomegaly or isolated agenesis of the corpus callosum, over 80-90% of children have normal intelligence. Almost all children with spina bifida without hydrocephalus have normal intelligence, though some with shunted hydrocephalus may experience executive function or learning challenges.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 47 & 48)'
      }
    ]
  },
  cardiology: {
    categoryId: 'cardiology',
    diagnosticSummary: 'Antenatal consultation for Congenital Heart Disease (Transposition of Great Arteries, Hypoplastic Left Heart Syndrome, Tetralogy of Fallot, or Coarctation). Confirmed by fetal echocardiography.',
    deliveryRoomPlan: 'Delivery strictly at a tertiary cardiac center (39-40 weeks preferred for TGA). Immediate pediatric cardiology team attendance. For duct-dependent lesions (TGA, HLHS, Coarctation): urgent IV Prostaglandin E1 (PGE1) infusion via umbilical vein to maintain ductal patency.',
    nicuExpectations: 'Echocardiogram within 1-2 hours of birth. Oxygen management (avoiding hyperoxia in HLHS). For TGA: potential emergent Balloon Atrial Septostomy (Rashkind procedure) if cyanosis persists. Preparation for definitive cardiac surgery (Arterial Switch for TGA in week 1-2; Norwood Stage 1 for HLHS).',
    longTermPrognosis: 'TGA: Excellent >95% long-term survival following Arterial Switch Operation. HLHS: Requires 3-stage surgical palliation (Norwood, Glenn, Fontan) with 80-85% survival to school age, leading toward eventual heart transplantation.',
    communicationKeyPoints: [
      'Explaining duct-dependency and why PGE1 medication is vital right after birth.',
      'Reassuring parents about high success rates for conditions like TGA (>95% surgical survival).',
      'Discussing cardiac surgical timeline and intensive care recovery.',
      'Providing option for palliative comfort care in severe complex lesions (like un-operable HLHS).'
    ],
    faqs: [
      {
        id: 'card_pge',
        category: 'cardiology',
        question: 'What does a "duct-dependent" heart condition mean?',
        answer: 'Before birth, a temporary blood vessel called the ductus arteriosus connects the main arteries. In duct-dependent heart defects (like TGA or HLHS), this connection is essential for oxygenated blood to reach the body or lungs. Starting a continuous IV medication called Prostaglandin E1 (PGE1) immediately after birth keeps this vessel open until surgery can be performed.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 32, 34 & 35)'
      },
      {
        id: 'card_tga_surgery',
        category: 'cardiology',
        question: 'What is the surgical plan for Transposition of the Great Arteries (TGA)?',
        answer: 'TGA is corrected with an "Arterial Switch Operation" performed within the first 1 to 2 weeks of life. The surgeon switches the aorta and pulmonary artery back to their normal positions and reattaches the delicate coronary arteries. Survival for this operation is greater than 95%, and most children go on to lead active, normal lives.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 34, p. 189)'
      },
      {
        id: 'card_hlhs_options',
        category: 'cardiology',
        question: 'What options exist for Hypoplastic Left Heart Syndrome (HLHS)?',
        answer: 'Parents face two paths: 1) Staged Surgical Palliation consisting of three major heart surgeries (Norwood procedure in week 1, Glenn at 4-6 months, Fontan at 18m-3y) aimed at creating a stable circulation until heart transplantation; or 2) Palliative Comfort Care, where the baby is kept peaceful and comfortable in your arms without invasive surgery.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 35, p. 193-194)'
      }
    ]
  },
  pulmonology: {
    categoryId: 'pulmonology',
    diagnosticSummary: 'Antenatal consultation for thoracic anomaly (Congenital Diaphragmatic Hernia [CDH] or Congenital Cystic Adenomatoid Malformation [CCAM/CPAM]). Diagnosed via fetal ultrasound and fetal MRI.',
    deliveryRoomPlan: 'CDH Delivery: Delivery at tertiary surgical facility. CRITICAL PROTOCOL: Immediate intubation at birth without bag-mask ventilation (to prevent gas filling herniated bowel in chest). Large-bore gastric tube (Replogle) placed to decompress stomach. Gentle ventilation strategies.',
    nicuExpectations: 'High-frequency oscillatory ventilation (HFOV), arterial line, echocardiogram for pulmonary hypertension. Inhaled Nitric Oxide (iNO) or ECMO evaluation if refractory hypoxia occurs. Surgery is delayed until cardiorespiratory stability is achieved (days to weeks).',
    longTermPrognosis: 'CDH: Overall survival 50-70% depending on liver herniation and Lung-to-Head Ratio (LHR). Long-term risks include chronic lung disease, pulmonary hypertension, gastroesophageal reflux (~50%), and scoliosis. CCAM: >95% survival, surgical resection at 6-12 months.',
    communicationKeyPoints: [
      'Emphasizing why bag-mask ventilation is strictly avoided at birth in CDH.',
      'Explaining that diaphragmatic repair surgery does not fix underdeveloped lungs—time and lung growth do.',
      'Discussing pulmonary hypertension and advanced life support options (ECMO).',
      'Reassuring about excellent prognosis for CCAM/CPAM.'
    ],
    faqs: [
      {
        id: 'pulm_cdh_resus',
        category: 'pulmonology',
        question: 'Why can\'t my baby be ventilated with a mask at birth if they have CDH?',
        answer: 'In CDH, abdominal organs (stomach and bowel) sit inside the chest cavity next to the lungs. Using a bag-and-mask introduces air into the stomach and bowel, causing them to balloon up and further crush the delicate lungs. Therefore, the medical team immediately places a breathing tube (intubation) and a stomach tube to keep the bowel flat.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 30, p. 168)'
      },
      {
        id: 'pulm_cdh_surgery',
        category: 'pulmonology',
        question: 'When will the diaphragmatic hernia surgery happen?',
        answer: 'Surgery is NOT an emergency on Day 1. Repair of the diaphragm is intentionally delayed until your baby\'s lungs and blood pressure become stable—which usually takes several days to a week. Surgery simply puts the organs back into the abdomen, but time and gentle ventilation are what allow the lungs to grow.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 30, p. 169)'
      }
    ]
  },
  gastroenterology: {
    categoryId: 'gastroenterology',
    diagnosticSummary: 'Antenatal consultation for anterior abdominal wall defect (Gastroschisis or Omphalocele) or intestinal atresia. Diagnosed by fetal ultrasound.',
    deliveryRoomPlan: 'Delivery at tertiary surgical center. Gastroschisis: inspect bowel for twisting, cover lower body in clear polyethylene wrap or place in silo, position baby right-side down, place NG tube on free drainage, start IV fluids and antibiotics.',
    nicuExpectations: 'Pediatric surgery consultation. Gastroschisis: Primary closure in NICU/OR or staged reduction via silo over 3-7 days. Prolonged bowel ileus requiring total parenteral nutrition (TPN) via central line for 4-5 weeks until bowel function recovers.',
    longTermPrognosis: 'Gastroschisis: Overall survival >90-95%. Risk of intestinal atresia (~10-15%) or short gut syndrome. Omphalocele: Survival 75-95% for isolated defects; outcome strongly influenced by associated cardiac or chromosomal anomalies (up to 70%).',
    communicationKeyPoints: [
      'Explaining the appearance of exposed bowel and wrap/silo protection at birth.',
      'Preparing parents for 4-5 weeks of IV nutrition (TPN) before full breast feeds start.',
      'Distinguishing Gastroschisis (low chromosome risk) from Omphalocele (high chromosome/cardiac risk).'
    ],
    faqs: [
      {
        id: 'gi_wrap',
        category: 'gastroenterology',
        question: 'How is the exposed bowel protected at birth in Gastroschisis?',
        answer: 'At delivery, the surgeon or neonatal team inspects the exposed bowel to ensure it isn\'t twisted. The lower body and bowel are wrapped in sterile clear polyethylene plastic wrap ("cling wrap") or placed in a protective clear silo bag. This keeps the bowel clean, prevents fluid and heat loss, and protects the circulation.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 38, p. 210-211)'
      },
      {
        id: 'gi_tpn',
        category: 'gastroenterology',
        question: 'When will my baby be able to eat breast milk?',
        answer: 'Because the bowel has been exposed to amniotic fluid, it becomes swollen and takes 3 to 5 weeks to wake up and move food (postoperative ileus). During this time, your baby receives complete nutrition (TPN) through a central IV line. Once bowel sounds return, small tube feeds of expressed breast milk are started and gradually increased.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 38, p. 213)'
      }
    ]
  },
  nephrology: {
    categoryId: 'nephrology',
    diagnosticSummary: 'Antenatal consultation for renal tract malformation (Posterior Urethral Valves [PUV], Renal Agenesis, Multicystic Dysplastic Kidney, or Dilated Renal Pelvis). Evaluated via serial fetal ultrasounds.',
    deliveryRoomPlan: 'Delivery at tertiary perinatal center with pediatric nephrology/urology support. Immediate physical exam, blood pressure, urine passage monitoring. For PUV: immediate placement of feeding tube/catheter into bladder to relieve urinary obstruction.',
    nicuExpectations: 'Renal ultrasound at 24-48 hours. Serial serum creatinine and electrolytes at 72h. Micturating Cystourethrogram (MCU) for PUV followed by cystoscopic valve ablation.',
    longTermPrognosis: 'Dilated renal pelvis / mild pyelectasis: 75% resolve spontaneously; <5% require surgery. PUV: Risk of chronic kidney disease (~30-50%) and pulmonary hypoplasia if severe early oligohydramnios present.',
    communicationKeyPoints: [
      'Explaining the link between amniotic fluid volume and fetal lung development.',
      'Reassuring parents that mild kidney swelling frequently resolves on its own.',
      'Outlining the plan for bladder catheterization and postnatal imaging.'
    ],
    faqs: [
      {
        id: 'ren_oligo',
        category: 'nephrology',
        question: 'Why is amniotic fluid volume so important for kidney problems?',
        answer: 'After 15 weeks of pregnancy, amniotic fluid is mostly composed of fetal urine. If the kidneys or urinary tract are blocked (like in Posterior Urethral Valves), fluid levels drop (oligohydramnios). Amniotic fluid is required for the baby\'s lungs to expand and grow, so monitoring fluid levels helps predict lung health at birth.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 11 & 43)'
      }
    ]
  },
  infectious: {
    categoryId: 'infectious',
    diagnosticSummary: 'Antenatal consultation for maternal intrauterine infection (Cytomegalovirus [CMV], Toxoplasmosis, HSV, or Varicella). Diagnostic workup includes maternal serology and amniotic fluid PCR.',
    deliveryRoomPlan: 'Delivery in regional/tertiary facility. Standard newborn resuscitation. Diagnostic swabs (saliva/urine PCR for CMV within 21 days; blood/CSF for HSV or Toxoplasma).',
    nicuExpectations: 'Full blood count (checking for thrombocytopenia), liver function tests, head ultrasound and CT/MRI for intracranial calcification, audiology (hearing screen) and ophthalmology review. Oral Valganciclovir for symptomatic CMV.',
    longTermPrognosis: 'Congenital CMV: 90% infected infants are asymptomatic at birth. Symptomatic infants have risk of sensorineural hearing loss (cannot be excluded by normal newborn hearing screen) and developmental delay; antiviral treatment reduces hearing loss progression.',
    communicationKeyPoints: [
      'Explaining that 90% of babies with congenital CMV show no signs at birth.',
      'Emphasizing long-term annual hearing tests up to age 5.',
      'Reassuring that breastfeeding is safe for CMV and Toxoplasmosis.'
    ],
    faqs: [
      {
        id: 'inf_cmv_hearing',
        category: 'infectious',
        question: 'Can a normal newborn hearing test rule out hearing loss from CMV?',
        answer: 'No. Hearing loss caused by congenital CMV is progressive and can develop later in childhood (up to 5 years of age). Even if the birth hearing screen is normal, children with congenital CMV require formal audiology assessments at birth, 6 months, and annually until age 5.',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 16, p. 88)'
      }
    ]
  },
  misc: {
    categoryId: 'misc',
    diagnosticSummary: 'Antenatal consultation for Intrauterine Growth Restriction (IUGR) or General Fetal Growth Concern. Monitored with serial ultrasound growth biometry and Doppler velocimetry (Umbilical Artery, MCA, Ductus Venosus).',
    deliveryRoomPlan: 'Delivery at Level 2/3 facility depending on GA and estimated fetal weight (<1500g requires Level 3 NICU). Thermal care, immediate blood glucose check, early enteral feeding.',
    nicuExpectations: 'Monitoring for neonatal hypoglycemia (blood glucose checks at 1h, 2h, 4h), polycythemia, hypocalcemia, and feed intolerance. Early initiation of expressed breast milk.',
    longTermPrognosis: 'IUGR: Most infants achieve catch-up growth in Year 1. Risk of catch-up over-nutrition leading to long-term metabolic syndrome ("thrifty phenotype"). Normal neurodevelopment in >85-90% unless extreme prematurity or absent/reversed end-diastolic flow coexists.',
    communicationKeyPoints: [
      'Explaining Doppler surveillance and how it guides optimal delivery timing.',
      'Discussing prevention and management of low blood sugar (hypoglycemia).',
      'Reassuring about catch-up growth expectations.'
    ],
    faqs: [
      {
        id: 'iugr_glucose',
        category: 'misc',
        question: 'Why does my growth-restricted baby need blood sugar checks?',
        answer: 'Small-for-gestational-age babies have smaller glycogen stores in their liver and burn energy quickly after birth. Checking blood glucose levels at 1, 2, and 4 hours of life ensures their brain gets plenty of sugar. Early feeding with breast milk or IV dextrose prevents low blood sugar (hypoglycemia).',
        evidenceRef: 'Davies et al., Antenatal Consults (Chapter 25 & 14)'
      }
    ]
  }
};
