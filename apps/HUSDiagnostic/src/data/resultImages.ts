// Example ultrasound figures shown for each final diagnosis.
// Images and captions reproduced from: Mohammad K, Scott JN, Leijser LM, et al.
// Consensus Approach for Standardizing the Screening and Classification of Preterm
// Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective.
// Front Pediatr. 2021;9:618236. doi:10.3389/fped.2021.618236

export interface ResultImage {
  src: string;
  caption: string;
}

export const RESULT_IMAGES: Record<string, ResultImage> = {
  // Grade I GMH-IVH -> Figure 2
  fig2: {
    src: './figures/fig2.jpeg',
    caption:
      'Figure 2. Grade I GMH-IVH. (A–C) Ultrasound scan in a preterm infant (GA 26 weeks) with the common pattern of grade I GMH-IVH. (A) Coronal scan at the level of the frontal horns of the lateral ventricles. (B) Parasagittal scan through the right lateral ventricle; the echogenic clot (arrow) at the right caudothalamic notch is typical of grade I GMH-IVH. There is no IVH or ventricular dilatation. (C) Follow-up coronal scan 12 weeks later shows complete resolution of the GMH. (D–F) A different preterm infant (GA 27 weeks) with a less common location of grade I GMH-IVH. (D) Coronal scan at the level of the frontal horns. (E) Parasagittal scan through the left lateral ventricle; the clot (arrows) is centered posterior to the left caudothalamic notch but is still grade I as there is no blood within the ventricles. The echolucent portion represents cystic degeneration (liquefaction) of an older GMH-IVH. (F) Follow-up parasagittal scan 9 weeks later shows further cystic degeneration and smaller clot size.',
  },
  // Grade II GMH-IVH -> Figure 3
  fig3: {
    src: './figures/fig3.jpeg',
    caption:
      'Figure 3. Grade II GMH-IVH. (A–C) Ultrasound scan in a preterm infant (GA 26 weeks) with the common pattern of grade II GMH-IVH. (A) Coronal scan at the level of the frontal horns shows echogenic clot involving the caudate nucleus (arrow); no ventricular dilatation. (B) Coronal scan at the level of the trigone shows a small volume of intraventricular clot layering dependently (arrowhead). (C) Parasagittal scan through the right lateral ventricle shows the clot at the caudothalamic notch (arrow) and intraventricular hemorrhage in the occipital horn separate to choroid plexus (arrowhead). (D–F) A different preterm infant (GA 27 weeks) with a delayed pattern of grade II GMH-IVH. (D) Coronal scan initially normal 2 days after birth. (E) Follow-up coronal scan 6 days after birth shows echogenic clot in the left lateral ventricle (arrowhead); AHW < 6 mm. (F) Additional coronal view shows further echogenic intraventricular clot (arrowhead). The cUS scan showing the greatest severity in the first week should be used for classification.',
  },
  // Grade III GMH-IVH -> Figure 4
  fig4: {
    src: './figures/fig4.jpeg',
    caption:
      'Figure 4. Left-sided grade III GMH-IVH. Ultrasound scan in a preterm infant (GA 25 weeks) showing bilateral IVH. (A) Coronal scan 2 days after birth shows a large left GMH-IVH (arrow) with intraventricular blood acutely distending its lateral ventricle (AHW = 7 mm). A small amount of blood in the right lateral ventricle (arrowhead) likely represents spill-over from the left. (B) Parasagittal view shows the left grade III GMH-IVH filling >50% of the distended lateral ventricle. (C) Coronal T2-weighted MR image 3 months after birth shows subtle hypointense staining at the left caudothalamic notch from hemosiderin/ferritin (arrowhead); widened subarachnoid spaces and persistent ventriculomegaly reflect tissue volume loss.',
  },
  // PVHI -> Figure 5
  fig5: {
    src: './figures/fig5.jpeg',
    caption:
      'Figure 5. Grade III GMH-IVH + PVHI. Ultrasound scan in a preterm infant (GA 24 weeks) with bilateral GMH-IVH and left-sided PVHI. (A) Coronal scan 2 days after birth showing a left-sided grade III GMH-IVH (arrowhead, AHW = 7 mm) and large echodensity in the left frontoparietal white matter (arrow); smaller right-sided grade II GMH-IVH (arrowhead). (B) Left parasagittal scan showing the periventricular echodensity (arrows) extending from posterior frontal to parietal white matter. (C) Follow-up coronal scan 2 weeks after birth shows the PVHI developing central echolucency (early cystic degeneration). (D) At 7 weeks, further cystic degeneration with echogenic clot debris and dilated lateral ventricles. (E,F) At 12 weeks, a large porencephalic cyst communicating with the lateral ventricle; the persisting ventriculomegaly is now partially passive (ex-vacuo).',
  },
  // Significant ischemic injury (WMI) -> Figure 7
  fig7: {
    src: './figures/fig7.jpeg',
    caption:
      'Figure 7. Spectrum of ischemic white matter injury (WMI). (A–C) Grade 1 WMI (GA 26 weeks): inhomogeneous moderately increased echogenicity (flaring/PVE) of the parietal periventricular white matter (arrows), no IVH, with full resolution 5 weeks later. (D–F) Grade 2 WMI (GA 27 weeks): asymmetric flaring in the left parietal white matter (arrow) evolving into small localized cystic lesions in both hemispheres. (G–I) Grade 3 WMI (GA 30 weeks): limited patchy echodensity evolving into extensive cystic lesions from frontal to posterior white matter. (J–L) Grade 4 WMI (GA 25 weeks): significant WMI with extensive cystic change. When brighter than choroid plexus and in the absence of IVH, these findings are consistent with significant ischemic white matter injury.',
  },
};
