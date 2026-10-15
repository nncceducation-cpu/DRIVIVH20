// Figure atlas — all figures from the source consensus paper, shown in the Appendix.
// Mohammad K, Scott JN, Leijser LM, et al. Consensus Approach for Standardizing the
// Screening and Classification of Preterm Brain Injury Diagnosed With Cranial
// Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236.

export interface AtlasFigure {
  n: number;
  title: string;
  src: string;
  caption: string;
}

export const ATLAS: AtlasFigure[] = [
  {
    n: 1,
    title: 'Hyperechogenic ependyma (indirect sign of IVH)',
    src: './figures/fig1.jpeg',
    caption:
      'Figure 1. Hyperechogenic ependyma as an indirect sign of IVH. Ultrasound and MRI in a preterm infant (GA 24 weeks 3 days). (A) Coronal scan at the level of the frontal horns shows no evidence of GMH, IVH, or ventricular enlargement. (B) Coronal scan at the trigone shows a small volume of echogenic clot within the posterior body of both ventricles (arrows), not recognized at original reporting. (C) Parasagittal scan through the left lateral ventricle also shows the small-volume IVH (arrowhead). (D) Follow-up coronal scan 14 days after birth still does not show clear germinal matrix clot. (E) Coronal scan at the trigone shows new hyperechogenic ependyma involving both lateral ventricles (arrowheads) with more extensive IVH; the hyperechoic ependyma facilitated a retrospective diagnosis of grade II GMH-IVH. (F) Axial T2* gradient-echo MR image 3 months after birth shows increased susceptibility outlining the occipital horns (arrows) from hemosiderin/ferritin, confirming earlier IVH.',
  },
  {
    n: 2,
    title: 'Grade I GMH-IVH',
    src: './figures/fig2.jpeg',
    caption:
      'Figure 2. Grade I GMH-IVH. (A–C) Preterm infant (GA 26 weeks) with the common pattern: echogenic clot (arrow) at the right caudothalamic notch, no IVH or ventricular dilatation, with complete resolution 12 weeks later. (D–F) A different infant (GA 27 weeks) with a less common location: clot centered posterior to the left caudothalamic notch, still grade I as there is no blood within the ventricles; the echolucent portion represents cystic degeneration (liquefaction) of an older GMH-IVH.',
  },
  {
    n: 3,
    title: 'Grade II GMH-IVH',
    src: './figures/fig3.jpeg',
    caption:
      'Figure 3. Grade II GMH-IVH. (A–C) Preterm infant (GA 26 weeks), common pattern: echogenic clot involving the caudate nucleus (arrow) with a small volume of intraventricular clot layering dependently (arrowhead) and IVH in the occipital horn separate to choroid plexus. (D–F) A different infant (GA 27 weeks), delayed pattern: initially normal at 2 days, with echogenic intraventricular clot appearing by 6 days (AHW < 6 mm). The cUS showing greatest severity in the first week should be used for classification.',
  },
  {
    n: 4,
    title: 'Left-sided grade III GMH-IVH',
    src: './figures/fig4.jpeg',
    caption:
      'Figure 4. Left-sided grade III GMH-IVH. Preterm infant (GA 25 weeks) with bilateral IVH. (A) Large left GMH-IVH (arrow) with intraventricular blood distending its lateral ventricle (AHW = 7 mm); a small amount of blood on the right (arrowhead) likely represents spill-over from the left. (B) Left grade III GMH-IVH fills >50% of the distended lateral ventricle. (C) Coronal T2-weighted MR image 3 months later shows subtle hypointense staining at the left caudothalamic notch from hemosiderin/ferritin (arrowhead); ventriculomegaly reflects tissue volume loss.',
  },
  {
    n: 5,
    title: 'Grade III GMH-IVH + PVHI',
    src: './figures/fig5.jpeg',
    caption:
      'Figure 5. Grade III GMH-IVH + PVHI. Preterm infant (GA 24 weeks) with bilateral GMH-IVH and left-sided PVHI. (A) Left grade III GMH-IVH (AHW = 7 mm) and large echodensity in the left frontoparietal white matter (arrow); smaller right grade II. (B) Periventricular echodensity extending from posterior frontal to parietal white matter. (C–D) Progressive central echolucency and cystic degeneration. (E,F) At 12 weeks, a large porencephalic cyst communicating with the lateral ventricle; ventriculomegaly is now partially passive (ex-vacuo).',
  },
  {
    n: 6,
    title: 'Limited cerebellar hemorrhage',
    src: './figures/fig6.jpeg',
    caption:
      'Figure 6. Limited cerebellar hemorrhage (CBH). Preterm infant (GA 29 weeks) with a limited CBH (>4 mm but <1/3 of the cerebellar hemisphere). (A) Coronal scan through the right mastoid fontanel at 5 days shows a rounded echogenic lesion in the left cerebellar hemisphere (arrow). (B) At 2 weeks the hemorrhage is becoming echolucent (early cystic degeneration). (C) Coronal T2-weighted MRI at 6 weeks shows a smaller cystic cavity with central T2 hyperintensity and thin hypointense rim (arrow); surrounding edema has resolved with local atrophy.',
  },
  {
    n: 7,
    title: 'Spectrum of ischemic white matter injury (WMI)',
    src: './figures/fig7.jpeg',
    caption:
      'Figure 7. Spectrum of ischemic white matter injury (WMI). (A–C) Grade 1 WMI (GA 26 weeks): transient flaring/PVE of the parietal white matter (arrows), no IVH, full resolution by 5 weeks. (D–F) Grade 2 WMI (GA 27 weeks): asymmetric flaring evolving into small localized cystic lesions. (G–I) Grade 3 WMI (GA 30 weeks): patchy echodensity evolving into extensive cystic lesions. (J–L) Grade 4 WMI (GA 25 weeks): significant WMI with extensive cystic change. When brighter than choroid plexus and without IVH, findings are consistent with significant ischemic WMI.',
  },
  {
    n: 8,
    title: 'Measuring VI and AHW — clear ventricular borders',
    src: './figures/fig8.jpeg',
    caption:
      'Figure 8. Measuring VI (A–C) and AHW (D–F) with clear ventricular borders. Coronal scans at the level of the frontal horns. The frontal horns are measured at the level of the choroid plexus in the third ventricle (level of the foramen of Monro). (A,D) Normal cUS; the lateral ventricular margin is identified by its thin echogenic ependymal stripe (arrowheads). (B,E) Normal cUS; margins are easily identified when ventricles are mildly distended with CSF. (C,F) Post-hemorrhagic ventricular dilatation in late stage; note the distended temporal horns (arrowheads).',
  },
  {
    n: 9,
    title: 'Measuring VI and AHW — obscured ventricular borders',
    src: './figures/fig9.jpeg',
    caption:
      'Figure 9. Measuring VI (A–C) and AHW (D–F) with obscured ventricular borders. It can be challenging to measure ventricular size when the ependymal margin is obscured by echogenic clot (B,E) or interrupted by porencephalic cyst (C,F). (A,D) Grade I GMH-IVH; the AHW should extend partially across the germinal matrix clot to the imaginary continuation of the lower ventricular wall. (B,E) Grade III GMH-IVH with frontal PVHI; the AHW extends across the echogenic clot but excludes the intraparenchymal portion. (C,F) Porencephalic cyst; a ghost outline of the ventricle (arrowheads) aids measurement.',
  },
  {
    n: 10,
    title: 'Post-hemorrhagic ventricular dilatation (PHVD)',
    src: './figures/fig10.jpeg',
    caption:
      'Figure 10. Post-hemorrhagic ventricular dilatation. Preterm infant (GA 30 weeks) with bilateral GMH-IVH. (A) Bilateral hemorrhages at 3 days, no PVHI. (B) At 8 days both lateral ventricles begin to dilate with dilatation of the third ventricle (arrowhead). (C) At 2 weeks, ballooning of the lateral ventricles with bilateral AHW > 6 mm and echogenic ependyma. (D) Coronal T2-weighted MR at 3 weeks shows persistent PHVD and hemosiderin staining at the left caudothalamic notch (arrowhead), no PVHI. (E) At 4 weeks, unchanged dilated ventricular bodies and temporal horns. (F) At 10 weeks, stabilization with some decrease in caliber; the third ventricle is no longer dilated.',
  },
  {
    n: 11,
    title: 'PVHI evolving into unilateral cystic lesions',
    src: './figures/fig11.jpeg',
    caption:
      'Figure 11. PVHI evolving into multiple, unilateral cystic lesions separate from the lateral ventricle (GA 25 weeks). (A) Right-sided GMH-IVH and large echodensity in the periventricular white matter adjacent to, but not communicating with, the lateral ventricle (arrow). (B,C) At 11 weeks, cystic lesions in the parietal white matter that do not communicate with the lateral ventricle (arrow). Such PVHI often evolves into multiple smaller cysts rather than one large porencephalic cyst, and could be mistaken for grade 2 ischemic WMI; review of the baseline cUS clarifies it as variant cystic evolution of PVHI.',
  },
  {
    n: 12,
    title: 'Other forms of acute injury',
    src: './figures/fig12.jpeg',
    caption:
      'Figure 12. Other forms of acute injury. (A,B) Preterm infant (GA 27 weeks) with bilateral middle cerebral artery (MCA) territory infarction: extensive cystic injury in the right frontoparietal region (arrows), more lateral than common periventricular WMI; MR shows large right and smaller left MCA cortical infarcts (arrowheads), suggesting a proximal embolic source. (C,D) Perforator stroke in a preterm infant (GA 34 weeks): focal echodensity in the medial right capsuloganglionic region (arrow), consistent with lenticulostriate territory infarction, with cystic evolution on MR at 2 weeks.',
  },
  {
    n: 13,
    title: 'Serial cUS showing evolution of acute brain injury',
    src: './figures/fig13.jpeg',
    caption:
      'Figure 13. Early and follow-up serial cUS showing evolution of an acute brain injury (GA 24 weeks) with bilateral IVH. (A) Large acute right-sided GMH-IVH with PVHI and smaller left GMH-IVH. (B) At 2.5 weeks, IVH evolution with organizing clot and development of PHVD; enlarged third ventricle, dilated temporal horns, hyperechogenic ependyma. (C) At term-equivalent age, end-stage pattern with mature right periventricular porencephalic cyst and diffuse cerebral atrophy; PHVD improved with residual chronic ventriculomegaly.',
  },
  {
    n: 14,
    title: 'Screening & classification algorithms',
    src: './figures/fig14.jpeg',
    caption:
      "Figure 14. (A) Algorithm for routine cranial ultrasound screening for infants born at or ≤ 31 weeks' gestation. (B) Algorithm for the cUS scenario of abnormal cUS findings.",
  },
];
