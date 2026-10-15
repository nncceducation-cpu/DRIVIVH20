// All text below is reproduced verbatim from the original HUS Diagnostic app bundle.
// Clinical logic and wording must be verified by the author before clinical use.

export const DISCLAIMER = `This application is based on a consensus viewpoint guideline developed by a taskforce of neonatologists and radiologists across Canada. The aim of the decision-making tool is to help with interpretation and reporting of consultative diagnostic ultrasound exams of the neonatal brain. However, it must be understood that it is in no way intended to replace the consultative diagnostic ultrasound report which details normal and disordered anatomy and provides guidance for clinical decision making and family counselling. The decision tree and brain injury scoring sheets are created to assist with the identification and recording of select imaging features in a uniform manner for benchmarking, auditing and quality improvement purposes; they do not, in any way, constitute a diagnostic interpretation on their own. The authors and their institutions are not responsible for any decision making based on findings from this application. When in doubt, please review with your staff Neonatologist with expertise in Neonatal Neurology, Radiologist or Neuroradiologist.`;

export const ABOUT_LINKS = [
  { label: 'Visit our educational modules webpage', url: 'https://nncceducation.thinkific.com' },
  { label: 'Visit our Vimeo NNCC channel', url: 'https://vimeo.com/showcase/7178163' },
  { label: 'Email Dr. Khorshid Mohammad', url: 'mailto:khorshid.mohammad@ahs.ca' },
];

export interface Reference {
  citation: string;
  url: string;
}

// Primary source. The decision tree, classification, and all example figures in
// this app are based on this consensus paper.
export const REFERENCES: Reference[] = [
  {
    citation:
      'Mohammad K, Scott JN, Leijser LM, Zein H, Afifi J, Piedboeuf B, de Vries LS, van Wezel-Meijler G, Lee SK, Shah PS. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236.',
    url: 'https://doi.org/10.3389/fped.2021.618236',
  },
  {
    citation:
      'Guillot M, Chau V, Lemyre B. Routine imaging of the preterm neonatal brain. Canadian Paediatric Society position statement.',
    url: 'https://www.cps.ca/en/documents/position/routine-imaging-of-preterm-neonatal-brain',
  },
  {
    citation:
      'Papile LA, Burstein J, Burstein R, Koffler H. Incidence and evolution of subependymal and intraventricular hemorrhage: a study of infants with birth weights less than 1,500 gm. J Pediatr. 1978;92(4):529-534.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/305471/',
  },
];

export const DEFINITIONS: { title: string; bullets: string[] }[] = [
  { title: 'Grade I GMH-IVH', bullets: ['Germinal matrix hemorrhage', 'No IVH', 'No hydrocephalus', 'No white matter injury (WMI)'] },
  { title: 'Grade II GMH-IVH', bullets: ['Intraventricular hemorrhage present', 'Anterior Horn Width (AHW) < 6 mm', 'No ventricular distension'] },
  { title: 'Grade III GMH-IVH', bullets: ['Intraventricular hemorrhage distending the lateral ventricle', 'Anterior Horn Width (AHW) > 6 mm'] },
  { title: 'Periventricular Hemorrhagic Infarction (PVHI)', bullets: ['GMH-IVH is present', 'Echodensity in periventricular white matter', 'Usually unilateral, asymmetric', 'Evolves into porencephalic cyst', 'Hydrocephalus is often present'] },
  { title: 'Ischemic White Matter Injury (WMI)', bullets: ['Appears brighter than choroid plexus', 'Evolves into cystic lesion(s)', 'Usually bilateral, symmetric', 'No GMH-IVH', 'Usually no hydrocephalus'] },
  { title: 'Porencephalic Cyst', bullets: ['Evolves from PVHI', 'Usually communicates with lateral ventricle (but not always)', 'Causes passive ventriculomegaly from tissue volume loss'] },
  { title: 'Grade 4 White Matter Injury (WMI)', bullets: ['Extensive frontoparietal cystic lesions in deep and/or subcortical white matter', 'Evolve from areas of white matter echodensity'] },
  { title: 'Measurements', bullets: ['Ventricular Index (VI): distance between interhemispheric falx and lateral wall of the anterior horn', 'Anterior Horn Width (AHW): maximal diagonal width of the anterior horn at its widest point', 'Perform VI and AHW using the coronal plane at the level of the foramen of Monro'] },
];
