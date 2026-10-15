/**
 * Runtime interface translation for HUS Diagnostic (English, French, Spanish, Portuguese).
 *
 * The app's React components are untouched: this module translates the rendered
 * DOM and re-translates whatever React renders later (MutationObserver). The
 * original English is kept per text node, so switching back to EN restores it
 * exactly. Journal citations stay in English on purpose.
 *
 * Figure captions stay in English: they are reproduced verbatim from the
 * consensus paper, as are the journal citations.
 *
 * Clinical abbreviations follow local usage:
 *   FR  HMG-HIV, IHPV, LSB, IV, LCA
 *   ES  HMG-HIV, IHPV, LSB, IV, ACA
 *   PT  HMG-HIV, IHPV, LSB, IV, LCA
 */

type Lang = 'en' | 'fr' | 'es' | 'pt';

const SUPPORTED: Lang[] = ['en', 'fr', 'es', 'pt'];
const STORAGE_KEY = 'hus-language';

const dictionaries: Record<Exclude<Lang, 'en'>, Record<string, string>> = {
  fr: {
    // Shell and home
    'Neonatal cranial ultrasound — reporting aid':
      'Échographie transfontanellaire néonatale : aide au compte rendu',
    'Make the diagnosis': 'Poser le diagnostic',
    'Definitions': 'Définitions',
    'Appendix': 'Annexe',
    'References': 'Références',
    'About': 'À propos',
    'About Us': 'À propos de nous',
    'Back': 'Retour',
    'Home': 'Accueil',
    'Reporting/education aid — not a diagnostic interpretation. A Sarnat-NNCC program tool.':
      'Aide au compte rendu et à la formation, et non une interprétation diagnostique. Outil du programme Sarnat-NNCC.',
    'A Sarnat-NNCC program tool.': 'Outil du programme Sarnat-NNCC.',
    // Disclaimer
    'Disclaimer': 'Avis de non-responsabilité',
    'I understand — continue': 'J’ai compris, continuer',
    'This application is based on a consensus viewpoint guideline developed by a taskforce of neonatologists and radiologists across Canada. The aim of the decision-making tool is to help with interpretation and reporting of consultative diagnostic ultrasound exams of the neonatal brain. However, it must be understood that it is in no way intended to replace the consultative diagnostic ultrasound report which details normal and disordered anatomy and provides guidance for clinical decision making and family counselling. The decision tree and brain injury scoring sheets are created to assist with the identification and recording of select imaging features in a uniform manner for benchmarking, auditing and quality improvement purposes; they do not, in any way, constitute a diagnostic interpretation on their own. The authors and their institutions are not responsible for any decision making based on findings from this application. When in doubt, please review with your staff Neonatologist with expertise in Neonatal Neurology, Radiologist or Neuroradiologist.':
      'Cette application repose sur des lignes directrices consensuelles élaborées par un groupe de travail de néonatologistes et de radiologistes de partout au Canada. L’outil d’aide à la décision vise à faciliter l’interprétation et le compte rendu des échographies diagnostiques du cerveau du nouveau-né. Il ne remplace toutefois d’aucune façon le compte rendu échographique diagnostique, qui décrit l’anatomie normale et pathologique et oriente la décision clinique ainsi que le counseling familial. L’arbre décisionnel et les grilles de cotation des lésions cérébrales servent à repérer et à consigner certaines caractéristiques d’imagerie de façon uniforme à des fins d’étalonnage, d’audit et d’amélioration de la qualité; ils ne constituent en aucun cas une interprétation diagnostique. Les auteurs et leurs établissements ne sont pas responsables des décisions prises à partir des résultats de cette application. En cas de doute, en discuter avec le néonatologiste de garde ayant une expertise en neurologie néonatale, le radiologiste ou le neuroradiologiste.',
    // Wizard
    'Result': 'Résultat',
    'Report': 'Compte rendu',
    'Example': 'Exemple',
    'Examples': 'Exemples',
    'Yes': 'Oui',
    'No': 'Non',
    'Yes:': 'Oui :',
    'No:': 'Non :',
    'Start over': 'Recommencer',
    'Enlarge image': 'Agrandir l’image',
    'Enlarged example': 'Exemple agrandi',
    'Figure': 'Figure',
    'This is a structured reporting aid reflecting the answers entered. It does not constitute a diagnostic interpretation. Verify against the source images and your unit’s protocol.':
      'Il s’agit d’une aide au compte rendu structurée qui reflète les réponses saisies. Elle ne constitue pas une interprétation diagnostique. Vérifier avec les images sources et le protocole de votre unité.',
    // Decision tree questions and notes
    'Is there hemorrhage within the germinal matrix AND/OR within the lateral ventricle?':
      'Y a-t-il une hémorragie dans la matrice germinative ET/OU dans le ventricule latéral?',
    'Report positive for GMH-IVH': 'Compte rendu positif pour une HMG-HIV',
    'Report negative for GMH-IVH': 'Compte rendu négatif pour une HMG-HIV',
    'Is the hemorrhage confined to the germinal matrix region?':
      'L’hémorragie est-elle limitée à la région de la matrice germinative?',
    'Either common or uncommon in location + no blood in the lateral ventricle = Grade I GMH-IVH':
      'Localisation typique ou atypique + absence de sang dans le ventricule latéral = HMG-HIV de grade I',
    'Blood is detected in the lateral ventricle or on the choroid plexus = Grade II or III GMH-IVH':
      'Présence de sang dans le ventricule latéral ou sur le plexus choroïde = HMG-HIV de grade II ou III',
    'Is the IVH distending the ipsilateral lateral ventricle AND anterior horn width (AHW) > 6 mm?':
      'L’HIV distend-elle le ventricule latéral ipsilatéral ET la largeur de la corne antérieure (LCA) est-elle > 6 mm?',
    'Grade III GMH-IVH': 'HMG-HIV de grade III',
    'Grade II GMH-IVH': 'HMG-HIV de grade II',
    'Grade I GMH-IVH': 'HMG-HIV de grade I',
    'Is there focal echogenicity in the periventricular white matter adjacent (i.e., ipsilateral) to the side of GMH-IVH?':
      'Y a-t-il une échogénicité focale de la substance blanche périventriculaire adjacente (c.-à-d. ipsilatérale) au côté de l’HMG-HIV?',
    'Is there Grade I, II, or III GMH-IVH present?':
      'Y a-t-il une HMG-HIV de grade I, II ou III?',
    // Results
    'GMH-IVH is present, report as periventricular hemorrhagic infarction (PVHI).':
      'HMG-HIV présente : décrire un infarctus hémorragique périventriculaire (IHPV).',
    'GMH-IVH is NOT present, report as significant ischemic injury.':
      'Aucune HMG-HIV : décrire une lésion ischémique importante.',
    'Normal or negative scan': 'Examen normal ou négatif',
    'Please try again': 'Veuillez recommencer',
    // Definitions
    'Periventricular Hemorrhagic Infarction (PVHI)': 'Infarctus hémorragique périventriculaire (IHPV)',
    'Ischemic White Matter Injury (WMI)': 'Lésion ischémique de la substance blanche (LSB)',
    'Porencephalic Cyst': 'Kyste porencéphalique',
    'Grade 4 White Matter Injury (WMI)': 'Lésion de la substance blanche (LSB) de grade 4',
    'Measurements': 'Mesures',
    'Germinal matrix hemorrhage': 'Hémorragie de la matrice germinative',
    'No IVH': 'Aucune HIV',
    'No hydrocephalus': 'Aucune hydrocéphalie',
    'No white matter injury (WMI)': 'Aucune lésion de la substance blanche (LSB)',
    'Intraventricular hemorrhage present': 'Hémorragie intraventriculaire présente',
    'Anterior Horn Width (AHW) < 6 mm': 'Largeur de la corne antérieure (LCA) < 6 mm',
    'No ventricular distension': 'Aucune distension ventriculaire',
    'Intraventricular hemorrhage distending the lateral ventricle':
      'Hémorragie intraventriculaire distendant le ventricule latéral',
    'Anterior Horn Width (AHW) > 6 mm': 'Largeur de la corne antérieure (LCA) > 6 mm',
    'GMH-IVH is present': 'HMG-HIV présente',
    'Echodensity in periventricular white matter':
      'Échodensité de la substance blanche périventriculaire',
    'Usually unilateral, asymmetric': 'Habituellement unilatérale et asymétrique',
    'Evolves into porencephalic cyst': 'Évolue vers un kyste porencéphalique',
    'Hydrocephalus is often present': 'Une hydrocéphalie est souvent présente',
    'Appears brighter than choroid plexus': 'Apparaît plus échogène que le plexus choroïde',
    'Evolves into cystic lesion(s)': 'Évolue vers une ou des lésions kystiques',
    'Usually bilateral, symmetric': 'Habituellement bilatérale et symétrique',
    'No GMH-IVH': 'Aucune HMG-HIV',
    'Usually no hydrocephalus': 'Habituellement sans hydrocéphalie',
    'Evolves from PVHI': 'Évolue à partir d’un IHPV',
    'Usually communicates with lateral ventricle (but not always)':
      'Communique habituellement avec le ventricule latéral (mais pas toujours)',
    'Causes passive ventriculomegaly from tissue volume loss':
      'Entraîne une ventriculomégalie passive par perte de volume tissulaire',
    'Extensive frontoparietal cystic lesions in deep and/or subcortical white matter':
      'Lésions kystiques frontopariétales étendues de la substance blanche profonde ou sous-corticale',
    'Evolve from areas of white matter echodensity':
      'Évoluent à partir de zones d’échodensité de la substance blanche',
    'Ventricular Index (VI): distance between interhemispheric falx and lateral wall of the anterior horn':
      'Indice ventriculaire (IV) : distance entre la faux interhémisphérique et la paroi latérale de la corne antérieure',
    'Anterior Horn Width (AHW): maximal diagonal width of the anterior horn at its widest point':
      'Largeur de la corne antérieure (LCA) : largeur diagonale maximale de la corne antérieure à son point le plus large',
    'Perform VI and AHW using the coronal plane at the level of the foramen of Monro':
      'Mesurer l’IV et la LCA sur le plan coronal, au niveau du trou de Monro',
    // Appendix
    'Reference figures from Mohammad K, et al. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Tap any figure to enlarge.':
      'Figures de référence tirées de Mohammad K, et coll. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Toucher une figure pour l’agrandir. Les légendes des figures restent en anglais, telles que publiées.',
    'Hyperechogenic ependyma (indirect sign of IVH)':
      'Épendyme hyperéchogène (signe indirect d’HIV)',
    'Left-sided grade III GMH-IVH': 'HMG-HIV de grade III à gauche',
    'Grade III GMH-IVH + PVHI': 'HMG-HIV de grade III + IHPV',
    'Limited cerebellar hemorrhage': 'Hémorragie cérébelleuse limitée',
    'Spectrum of ischemic white matter injury (WMI)':
      'Spectre des lésions ischémiques de la substance blanche (LSB)',
    'Measuring VI and AHW — clear ventricular borders':
      'Mesure de l’IV et de la LCA : contours ventriculaires nets',
    'Measuring VI and AHW — obscured ventricular borders':
      'Mesure de l’IV et de la LCA : contours ventriculaires mal définis',
    'Post-hemorrhagic ventricular dilatation (PHVD)':
      'Dilatation ventriculaire post-hémorragique (DVPH)',
    'PVHI evolving into unilateral cystic lesions':
      'IHPV évoluant vers des lésions kystiques unilatérales',
    'Other forms of acute injury': 'Autres formes de lésions aiguës',
    'Serial cUS showing evolution of acute brain injury':
      'Échographies transfontanellaires sériées montrant l’évolution d’une lésion cérébrale aiguë',
    'Screening & classification algorithms': 'Algorithmes de dépistage et de classification',
    // About
    'To learn more about the Neonatal Neuro-Critical Care (NNCC) program:':
      'Pour en savoir plus sur le programme de soins neurocritiques néonatals (NNCC) :',
    'Visit our educational modules webpage': 'Consulter notre page de modules éducatifs',
    'Visit our Vimeo NNCC channel': 'Consulter notre chaîne Vimeo NNCC',
    'Email Dr. Khorshid Mohammad': 'Écrire au Dr Khorshid Mohammad',
  },
  es: {
    'Neonatal cranial ultrasound — reporting aid':
      'Ecografía craneal neonatal: ayuda para el informe',
    'Make the diagnosis': 'Hacer el diagnóstico',
    'Definitions': 'Definiciones',
    'Appendix': 'Anexo',
    'References': 'Referencias',
    'About': 'Acerca de',
    'About Us': 'Quiénes somos',
    'Back': 'Atrás',
    'Home': 'Inicio',
    'Reporting/education aid — not a diagnostic interpretation. A Sarnat-NNCC program tool.':
      'Ayuda para el informe y la formación, no es una interpretación diagnóstica. Herramienta del programa Sarnat-NNCC.',
    'A Sarnat-NNCC program tool.': 'Herramienta del programa Sarnat-NNCC.',
    'Disclaimer': 'Aviso legal',
    'I understand — continue': 'Entiendo, continuar',
    'This application is based on a consensus viewpoint guideline developed by a taskforce of neonatologists and radiologists across Canada. The aim of the decision-making tool is to help with interpretation and reporting of consultative diagnostic ultrasound exams of the neonatal brain. However, it must be understood that it is in no way intended to replace the consultative diagnostic ultrasound report which details normal and disordered anatomy and provides guidance for clinical decision making and family counselling. The decision tree and brain injury scoring sheets are created to assist with the identification and recording of select imaging features in a uniform manner for benchmarking, auditing and quality improvement purposes; they do not, in any way, constitute a diagnostic interpretation on their own. The authors and their institutions are not responsible for any decision making based on findings from this application. When in doubt, please review with your staff Neonatologist with expertise in Neonatal Neurology, Radiologist or Neuroradiologist.':
      'Esta aplicación se basa en una guía de consenso elaborada por un grupo de trabajo de neonatólogos y radiólogos de todo Canadá. La herramienta de apoyo a la decisión busca facilitar la interpretación y el informe de las ecografías diagnósticas del cerebro neonatal. Sin embargo, de ninguna manera pretende sustituir el informe ecográfico diagnóstico, que describe la anatomía normal y alterada y orienta la decisión clínica y el asesoramiento a la familia. El árbol de decisión y las hojas de puntuación de lesión cerebral se crearon para identificar y registrar determinados hallazgos de imagen de forma uniforme con fines de comparación, auditoría y mejora de la calidad; por sí solos no constituyen una interpretación diagnóstica. Los autores y sus instituciones no se responsabilizan de ninguna decisión tomada a partir de los resultados de esta aplicación. En caso de duda, consulte con el neonatólogo con experiencia en neurología neonatal, el radiólogo o el neurorradiólogo.',
    'Result': 'Resultado',
    'Report': 'Informe',
    'Example': 'Ejemplo',
    'Examples': 'Ejemplos',
    'Yes': 'Sí',
    'No': 'No',
    'Yes:': 'Sí:',
    'No:': 'No:',
    'Start over': 'Empezar de nuevo',
    'Enlarge image': 'Ampliar la imagen',
    'Enlarged example': 'Ejemplo ampliado',
    'Figure': 'Figura',
    'This is a structured reporting aid reflecting the answers entered. It does not constitute a diagnostic interpretation. Verify against the source images and your unit’s protocol.':
      'Esta es una ayuda estructurada para el informe que refleja las respuestas introducidas. No constituye una interpretación diagnóstica. Verifique con las imágenes originales y el protocolo de su unidad.',
    'Is there hemorrhage within the germinal matrix AND/OR within the lateral ventricle?':
      '¿Hay hemorragia en la matriz germinal Y/O en el ventrículo lateral?',
    'Report positive for GMH-IVH': 'Informe positivo para HMG-HIV',
    'Report negative for GMH-IVH': 'Informe negativo para HMG-HIV',
    'Is the hemorrhage confined to the germinal matrix region?':
      '¿La hemorragia se limita a la región de la matriz germinal?',
    'Either common or uncommon in location + no blood in the lateral ventricle = Grade I GMH-IVH':
      'Localización típica o atípica + sin sangre en el ventrículo lateral = HMG-HIV de grado I',
    'Blood is detected in the lateral ventricle or on the choroid plexus = Grade II or III GMH-IVH':
      'Se detecta sangre en el ventrículo lateral o en el plexo coroideo = HMG-HIV de grado II o III',
    'Is the IVH distending the ipsilateral lateral ventricle AND anterior horn width (AHW) > 6 mm?':
      '¿La HIV distiende el ventrículo lateral ipsilateral Y la anchura del cuerno anterior (ACA) es > 6 mm?',
    'Grade III GMH-IVH': 'HMG-HIV de grado III',
    'Grade II GMH-IVH': 'HMG-HIV de grado II',
    'Grade I GMH-IVH': 'HMG-HIV de grado I',
    'Is there focal echogenicity in the periventricular white matter adjacent (i.e., ipsilateral) to the side of GMH-IVH?':
      '¿Hay ecogenicidad focal en la sustancia blanca periventricular adyacente (es decir, ipsilateral) al lado de la HMG-HIV?',
    'Is there Grade I, II, or III GMH-IVH present?':
      '¿Hay HMG-HIV de grado I, II o III?',
    'GMH-IVH is present, report as periventricular hemorrhagic infarction (PVHI).':
      'Hay HMG-HIV: informe como infarto hemorrágico periventricular (IHPV).',
    'GMH-IVH is NOT present, report as significant ischemic injury.':
      'No hay HMG-HIV: informe como lesión isquémica significativa.',
    'Normal or negative scan': 'Estudio normal o negativo',
    'Please try again': 'Inténtelo de nuevo',
    'Periventricular Hemorrhagic Infarction (PVHI)': 'Infarto hemorrágico periventricular (IHPV)',
    'Ischemic White Matter Injury (WMI)': 'Lesión isquémica de la sustancia blanca (LSB)',
    'Porencephalic Cyst': 'Quiste porencefálico',
    'Grade 4 White Matter Injury (WMI)': 'Lesión de la sustancia blanca (LSB) de grado 4',
    'Measurements': 'Mediciones',
    'Germinal matrix hemorrhage': 'Hemorragia de la matriz germinal',
    'No IVH': 'Sin HIV',
    'No hydrocephalus': 'Sin hidrocefalia',
    'No white matter injury (WMI)': 'Sin lesión de la sustancia blanca (LSB)',
    'Intraventricular hemorrhage present': 'Hemorragia intraventricular presente',
    'Anterior Horn Width (AHW) < 6 mm': 'Anchura del cuerno anterior (ACA) < 6 mm',
    'No ventricular distension': 'Sin distensión ventricular',
    'Intraventricular hemorrhage distending the lateral ventricle':
      'Hemorragia intraventricular que distiende el ventrículo lateral',
    'Anterior Horn Width (AHW) > 6 mm': 'Anchura del cuerno anterior (ACA) > 6 mm',
    'GMH-IVH is present': 'Hay HMG-HIV',
    'Echodensity in periventricular white matter':
      'Ecodensidad en la sustancia blanca periventricular',
    'Usually unilateral, asymmetric': 'Habitualmente unilateral y asimétrica',
    'Evolves into porencephalic cyst': 'Evoluciona a quiste porencefálico',
    'Hydrocephalus is often present': 'Con frecuencia hay hidrocefalia',
    'Appears brighter than choroid plexus': 'Se ve más ecogénica que el plexo coroideo',
    'Evolves into cystic lesion(s)': 'Evoluciona a una o varias lesiones quísticas',
    'Usually bilateral, symmetric': 'Habitualmente bilateral y simétrica',
    'No GMH-IVH': 'Sin HMG-HIV',
    'Usually no hydrocephalus': 'Habitualmente sin hidrocefalia',
    'Evolves from PVHI': 'Evoluciona a partir de un IHPV',
    'Usually communicates with lateral ventricle (but not always)':
      'Suele comunicarse con el ventrículo lateral (aunque no siempre)',
    'Causes passive ventriculomegaly from tissue volume loss':
      'Produce ventriculomegalia pasiva por pérdida de volumen tisular',
    'Extensive frontoparietal cystic lesions in deep and/or subcortical white matter':
      'Lesiones quísticas frontoparietales extensas en la sustancia blanca profunda o subcortical',
    'Evolve from areas of white matter echodensity':
      'Evolucionan a partir de zonas de ecodensidad de la sustancia blanca',
    'Ventricular Index (VI): distance between interhemispheric falx and lateral wall of the anterior horn':
      'Índice ventricular (IV): distancia entre la hoz interhemisférica y la pared lateral del cuerno anterior',
    'Anterior Horn Width (AHW): maximal diagonal width of the anterior horn at its widest point':
      'Anchura del cuerno anterior (ACA): anchura diagonal máxima del cuerno anterior en su punto más ancho',
    'Perform VI and AHW using the coronal plane at the level of the foramen of Monro':
      'Medir el IV y la ACA en el plano coronal, a la altura del agujero de Monro',
    'Reference figures from Mohammad K, et al. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Tap any figure to enlarge.':
      'Figuras de referencia de Mohammad K, et al. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Toque una figura para ampliarla. Los pies de figura se mantienen en inglés, tal como se publicaron.',
    'Hyperechogenic ependyma (indirect sign of IVH)':
      'Epéndimo hiperecogénico (signo indirecto de HIV)',
    'Left-sided grade III GMH-IVH': 'HMG-HIV de grado III izquierda',
    'Grade III GMH-IVH + PVHI': 'HMG-HIV de grado III + IHPV',
    'Limited cerebellar hemorrhage': 'Hemorragia cerebelosa limitada',
    'Spectrum of ischemic white matter injury (WMI)':
      'Espectro de la lesión isquémica de la sustancia blanca (LSB)',
    'Measuring VI and AHW — clear ventricular borders':
      'Medición del IV y la ACA: bordes ventriculares nítidos',
    'Measuring VI and AHW — obscured ventricular borders':
      'Medición del IV y la ACA: bordes ventriculares poco definidos',
    'Post-hemorrhagic ventricular dilatation (PHVD)':
      'Dilatación ventricular poshemorrágica (DVPH)',
    'PVHI evolving into unilateral cystic lesions':
      'IHPV que evoluciona a lesiones quísticas unilaterales',
    'Other forms of acute injury': 'Otras formas de lesión aguda',
    'Serial cUS showing evolution of acute brain injury':
      'Ecografías craneales seriadas que muestran la evolución de una lesión cerebral aguda',
    'Screening & classification algorithms': 'Algoritmos de cribado y clasificación',
    'To learn more about the Neonatal Neuro-Critical Care (NNCC) program:':
      'Para conocer más sobre el programa de Cuidados Neurocríticos Neonatales (NNCC):',
    'Visit our educational modules webpage': 'Visite nuestra página de módulos educativos',
    'Visit our Vimeo NNCC channel': 'Visite nuestro canal NNCC en Vimeo',
    'Email Dr. Khorshid Mohammad': 'Escribir al Dr. Khorshid Mohammad',
  },
  pt: {
    'Neonatal cranial ultrasound — reporting aid':
      'Ultrassonografia craniana neonatal: apoio ao laudo',
    'Make the diagnosis': 'Fazer o diagnóstico',
    'Definitions': 'Definições',
    'Appendix': 'Apêndice',
    'References': 'Referências',
    'About': 'Sobre',
    'About Us': 'Sobre nós',
    'Back': 'Voltar',
    'Home': 'Início',
    'Reporting/education aid — not a diagnostic interpretation. A Sarnat-NNCC program tool.':
      'Apoio ao laudo e à educação, não é uma interpretação diagnóstica. Ferramenta do programa Sarnat-NNCC.',
    'A Sarnat-NNCC program tool.': 'Ferramenta do programa Sarnat-NNCC.',
    'Disclaimer': 'Aviso',
    'I understand — continue': 'Entendi, continuar',
    'This application is based on a consensus viewpoint guideline developed by a taskforce of neonatologists and radiologists across Canada. The aim of the decision-making tool is to help with interpretation and reporting of consultative diagnostic ultrasound exams of the neonatal brain. However, it must be understood that it is in no way intended to replace the consultative diagnostic ultrasound report which details normal and disordered anatomy and provides guidance for clinical decision making and family counselling. The decision tree and brain injury scoring sheets are created to assist with the identification and recording of select imaging features in a uniform manner for benchmarking, auditing and quality improvement purposes; they do not, in any way, constitute a diagnostic interpretation on their own. The authors and their institutions are not responsible for any decision making based on findings from this application. When in doubt, please review with your staff Neonatologist with expertise in Neonatal Neurology, Radiologist or Neuroradiologist.':
      'Este aplicativo baseia-se em uma diretriz de consenso elaborada por um grupo de trabalho de neonatologistas e radiologistas de todo o Canadá. A ferramenta de apoio à decisão visa facilitar a interpretação e o laudo das ultrassonografias diagnósticas do cérebro neonatal. No entanto, ela não substitui de forma alguma o laudo ultrassonográfico diagnóstico, que descreve a anatomia normal e alterada e orienta a decisão clínica e o aconselhamento da família. A árvore de decisão e as planilhas de pontuação de lesão cerebral foram criadas para identificar e registrar determinados achados de imagem de maneira uniforme para fins de comparação, auditoria e melhoria da qualidade; por si só, não constituem uma interpretação diagnóstica. Os autores e suas instituições não se responsabilizam por decisões tomadas com base nos resultados deste aplicativo. Em caso de dúvida, discuta com o neonatologista com experiência em neurologia neonatal, o radiologista ou o neurorradiologista.',
    'Result': 'Resultado',
    'Report': 'Laudo',
    'Example': 'Exemplo',
    'Examples': 'Exemplos',
    'Yes': 'Sim',
    'No': 'Não',
    'Yes:': 'Sim:',
    'No:': 'Não:',
    'Start over': 'Recomeçar',
    'Enlarge image': 'Ampliar a imagem',
    'Enlarged example': 'Exemplo ampliado',
    'Figure': 'Figura',
    'This is a structured reporting aid reflecting the answers entered. It does not constitute a diagnostic interpretation. Verify against the source images and your unit’s protocol.':
      'Este é um apoio estruturado ao laudo que reflete as respostas informadas. Não constitui uma interpretação diagnóstica. Confira com as imagens originais e o protocolo da sua unidade.',
    'Is there hemorrhage within the germinal matrix AND/OR within the lateral ventricle?':
      'Há hemorragia na matriz germinativa E/OU no ventrículo lateral?',
    'Report positive for GMH-IVH': 'Laudo positivo para HMG-HIV',
    'Report negative for GMH-IVH': 'Laudo negativo para HMG-HIV',
    'Is the hemorrhage confined to the germinal matrix region?':
      'A hemorragia está limitada à região da matriz germinativa?',
    'Either common or uncommon in location + no blood in the lateral ventricle = Grade I GMH-IVH':
      'Localização típica ou atípica + ausência de sangue no ventrículo lateral = HMG-HIV de grau I',
    'Blood is detected in the lateral ventricle or on the choroid plexus = Grade II or III GMH-IVH':
      'Sangue detectado no ventrículo lateral ou no plexo coroide = HMG-HIV de grau II ou III',
    'Is the IVH distending the ipsilateral lateral ventricle AND anterior horn width (AHW) > 6 mm?':
      'A HIV está distendendo o ventrículo lateral ipsilateral E a largura do corno anterior (LCA) é > 6 mm?',
    'Grade III GMH-IVH': 'HMG-HIV de grau III',
    'Grade II GMH-IVH': 'HMG-HIV de grau II',
    'Grade I GMH-IVH': 'HMG-HIV de grau I',
    'Is there focal echogenicity in the periventricular white matter adjacent (i.e., ipsilateral) to the side of GMH-IVH?':
      'Há ecogenicidade focal na substância branca periventricular adjacente (ou seja, ipsilateral) ao lado da HMG-HIV?',
    'Is there Grade I, II, or III GMH-IVH present?':
      'Há HMG-HIV de grau I, II ou III?',
    'GMH-IVH is present, report as periventricular hemorrhagic infarction (PVHI).':
      'Há HMG-HIV: relatar como infarto hemorrágico periventricular (IHPV).',
    'GMH-IVH is NOT present, report as significant ischemic injury.':
      'Não há HMG-HIV: relatar como lesão isquêmica significativa.',
    'Normal or negative scan': 'Exame normal ou negativo',
    'Please try again': 'Tente novamente',
    'Periventricular Hemorrhagic Infarction (PVHI)': 'Infarto hemorrágico periventricular (IHPV)',
    'Ischemic White Matter Injury (WMI)': 'Lesão isquêmica da substância branca (LSB)',
    'Porencephalic Cyst': 'Cisto porencefálico',
    'Grade 4 White Matter Injury (WMI)': 'Lesão da substância branca (LSB) de grau 4',
    'Measurements': 'Medidas',
    'Germinal matrix hemorrhage': 'Hemorragia da matriz germinativa',
    'No IVH': 'Sem HIV',
    'No hydrocephalus': 'Sem hidrocefalia',
    'No white matter injury (WMI)': 'Sem lesão da substância branca (LSB)',
    'Intraventricular hemorrhage present': 'Hemorragia intraventricular presente',
    'Anterior Horn Width (AHW) < 6 mm': 'Largura do corno anterior (LCA) < 6 mm',
    'No ventricular distension': 'Sem distensão ventricular',
    'Intraventricular hemorrhage distending the lateral ventricle':
      'Hemorragia intraventricular distendendo o ventrículo lateral',
    'Anterior Horn Width (AHW) > 6 mm': 'Largura do corno anterior (LCA) > 6 mm',
    'GMH-IVH is present': 'Há HMG-HIV',
    'Echodensity in periventricular white matter':
      'Ecodensidade na substância branca periventricular',
    'Usually unilateral, asymmetric': 'Geralmente unilateral e assimétrica',
    'Evolves into porencephalic cyst': 'Evolui para cisto porencefálico',
    'Hydrocephalus is often present': 'Frequentemente há hidrocefalia',
    'Appears brighter than choroid plexus': 'Mostra-se mais ecogênica que o plexo coroide',
    'Evolves into cystic lesion(s)': 'Evolui para uma ou mais lesões císticas',
    'Usually bilateral, symmetric': 'Geralmente bilateral e simétrica',
    'No GMH-IVH': 'Sem HMG-HIV',
    'Usually no hydrocephalus': 'Geralmente sem hidrocefalia',
    'Evolves from PVHI': 'Evolui a partir de um IHPV',
    'Usually communicates with lateral ventricle (but not always)':
      'Costuma se comunicar com o ventrículo lateral (nem sempre)',
    'Causes passive ventriculomegaly from tissue volume loss':
      'Causa ventriculomegalia passiva por perda de volume tecidual',
    'Extensive frontoparietal cystic lesions in deep and/or subcortical white matter':
      'Lesões císticas frontoparietais extensas na substância branca profunda ou subcortical',
    'Evolve from areas of white matter echodensity':
      'Evoluem a partir de áreas de ecodensidade da substância branca',
    'Ventricular Index (VI): distance between interhemispheric falx and lateral wall of the anterior horn':
      'Índice ventricular (IV): distância entre a foice inter-hemisférica e a parede lateral do corno anterior',
    'Anterior Horn Width (AHW): maximal diagonal width of the anterior horn at its widest point':
      'Largura do corno anterior (LCA): maior largura diagonal do corno anterior no seu ponto mais largo',
    'Perform VI and AHW using the coronal plane at the level of the foramen of Monro':
      'Medir o IV e a LCA no plano coronal, ao nível do forame de Monro',
    'Reference figures from Mohammad K, et al. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Tap any figure to enlarge.':
      'Figuras de referência de Mohammad K, et al. Consensus Approach for Standardizing the Screening and Classification of Preterm Brain Injury Diagnosed With Cranial Ultrasound: A Canadian Perspective. Front Pediatr. 2021;9:618236. Toque em uma figura para ampliá-la. As legendas das figuras permanecem em inglês, como publicadas.',
    'Hyperechogenic ependyma (indirect sign of IVH)':
      'Epêndima hiperecogênico (sinal indireto de HIV)',
    'Left-sided grade III GMH-IVH': 'HMG-HIV de grau III à esquerda',
    'Grade III GMH-IVH + PVHI': 'HMG-HIV de grau III + IHPV',
    'Limited cerebellar hemorrhage': 'Hemorragia cerebelar limitada',
    'Spectrum of ischemic white matter injury (WMI)':
      'Espectro da lesão isquêmica da substância branca (LSB)',
    'Measuring VI and AHW — clear ventricular borders':
      'Medida do IV e da LCA: bordas ventriculares nítidas',
    'Measuring VI and AHW — obscured ventricular borders':
      'Medida do IV e da LCA: bordas ventriculares pouco definidas',
    'Post-hemorrhagic ventricular dilatation (PHVD)':
      'Dilatação ventricular pós-hemorrágica (DVPH)',
    'PVHI evolving into unilateral cystic lesions':
      'IHPV evoluindo para lesões císticas unilaterais',
    'Other forms of acute injury': 'Outras formas de lesão aguda',
    'Serial cUS showing evolution of acute brain injury':
      'Ultrassonografias cranianas seriadas mostrando a evolução de uma lesão cerebral aguda',
    'Screening & classification algorithms': 'Algoritmos de rastreamento e classificação',
    'To learn more about the Neonatal Neuro-Critical Care (NNCC) program:':
      'Para saber mais sobre o programa de Cuidados Neurocríticos Neonatais (NNCC):',
    'Visit our educational modules webpage': 'Acesse nossa página de módulos educacionais',
    'Visit our Vimeo NNCC channel': 'Acesse nosso canal NNCC no Vimeo',
    'Email Dr. Khorshid Mohammad': 'Escrever para o Dr. Khorshid Mohammad',
  },
};

/** Step headers and the "Enlarge figure N" labels carry a number. */
const patterns: Record<Exclude<Lang, 'en'>, Array<[RegExp, (m: RegExpMatchArray) => string]>> = {
  fr: [
    [/^Step (\d+[a-z]?)$/, (m) => `Étape ${m[1]}`],
    [/^Figure (\d+)$/, (m) => `Figure ${m[1]}`],
    [/^Enlarge figure (\d+)$/, (m) => `Agrandir la figure ${m[1]}`],
  ],
  es: [
    [/^Step (\d+[a-z]?)$/, (m) => `Paso ${m[1]}`],
    [/^Figure (\d+)$/, (m) => `Figura ${m[1]}`],
    [/^Enlarge figure (\d+)$/, (m) => `Ampliar la figura ${m[1]}`],
  ],
  pt: [
    [/^Step (\d+[a-z]?)$/, (m) => `Etapa ${m[1]}`],
    [/^Figure (\d+)$/, (m) => `Figura ${m[1]}`],
    [/^Enlarge figure (\d+)$/, (m) => `Ampliar a figura ${m[1]}`],
  ],
};

/** French, Spanish and Portuguese write decimals with a comma. */
function dec(value: string): string {
  return value.replace('.', ',');
}

/**
 * A few sentences are split across elements ("A <b>Sarnat-NNCC</b> program tool").
 * These rules fire only inside the element that owns the whole sentence.
 */
const contextRules: Array<{ text: string; within: string; value: Record<Exclude<Lang, 'en'>, string> }> = [
];

const originals = new WeakMap<Node, string>();
const attrOriginals = new WeakMap<Element, Record<string, string>>();
const TRANSLATED_ATTRS = ['placeholder', 'aria-label', 'title'];
let language: Lang = 'en';
const originalTitle = document.title;

function lookup(text: string): string | null {
  if (language === 'en') return null;
  const dict = dictionaries[language];
  if (Object.prototype.hasOwnProperty.call(dict, text)) return dict[text];
  for (const [pattern, build] of patterns[language]) {
    const match = text.match(pattern);
    if (match) return build(match);
  }
  return null;
}

function translate(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const translated = lookup(trimmed);
  return translated === null ? text : text.replace(trimmed, translated);
}

function translateTree(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) {
    applyToTextNode(root as Text);
    return;
  }
  if (!(root instanceof Element) && root.nodeType !== Node.DOCUMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach(applyToTextNode);

  const elements: Element[] = root instanceof Element ? [root, ...root.querySelectorAll('*')] : [];
  elements.forEach((element) => {
    TRANSLATED_ATTRS.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const store = attrOriginals.get(element) || {};
      if (!(attribute in store)) {
        store[attribute] = element.getAttribute(attribute) as string;
        attrOriginals.set(element, store);
      }
      const original = store[attribute];
      const next = language === 'en' ? original : translate(original);
      if (element.getAttribute(attribute) !== next) element.setAttribute(attribute, next);
    });
  });
}

function applyToTextNode(node: Text): void {
  const parent = node.parentElement;
  if (parent && parent.closest('script, style, [data-i18n-switcher]')) return;
  if (!originals.has(node)) originals.set(node, node.nodeValue || '');
  const original = originals.get(node) as string;
  let next = language === 'en' ? original : translate(original);
  if (language !== 'en') {
    const trimmed = original.trim();
    const rule = contextRules.find(
      (r) => r.text === trimmed && parent !== null && (parent.textContent || '').includes(r.within),
    );
    if (rule) next = original.replace(trimmed, rule.value[language as Exclude<Lang, 'en'>]);
  }
  if (node.nodeValue !== next) node.nodeValue = next;
}

function storedLanguage(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved && SUPPORTED.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

function deviceLanguage(): Lang {
  const preferred = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en'];
  for (const tag of preferred) {
    const code = String(tag).slice(0, 2).toLowerCase() as Lang;
    if (SUPPORTED.includes(code)) return code;
  }
  return 'en';
}

function buildSwitcher(): void {
  const nav = document.createElement('nav');
  nav.setAttribute('data-i18n-switcher', '');
  nav.setAttribute('aria-label', 'Language');
  nav.style.cssText = [
    'position:fixed',
    'bottom:calc(env(safe-area-inset-bottom, 0px) + 12px)',
    'right:calc(env(safe-area-inset-right, 0px) + 12px)',
    'z-index:2147483000',
    'display:flex',
    'gap:4px',
    'padding:3px',
    'border-radius:999px',
    'background:rgba(15,23,42,0.88)',
    'box-shadow:0 2px 10px rgba(15,23,42,0.25)',
  ].join(';');

  SUPPORTED.forEach((code) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = code.toUpperCase();
    button.dataset.language = code;
    button.style.cssText = [
      'min-width:34px',
      'height:30px',
      'border:0',
      'border-radius:999px',
      'background:transparent',
      'color:#fff',
      'font:700 11px system-ui, sans-serif',
      'letter-spacing:0.03em',
      'cursor:pointer',
    ].join(';');
    button.addEventListener('click', () => setLanguage(code));
    nav.appendChild(button);
  });

  document.body.appendChild(nav);
}

function paintSwitcher(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-i18n-switcher] button').forEach((button) => {
    const active = button.dataset.language === language;
    button.style.background = active ? '#fff' : 'transparent';
    button.style.color = active ? '#0f172a' : '#fff';
    button.setAttribute('aria-pressed', String(active));
  });
}

export function setLanguage(next: Lang, remember = true): void {
  language = SUPPORTED.includes(next) ? next : 'en';
  if (remember) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* private mode: the choice simply is not remembered */
    }
  }
  document.documentElement.lang = language;
  document.title = language === 'en' ? originalTitle : translate(originalTitle);
  paintSwitcher();
  translateTree(document.body);
}

export function currentLanguage(): Lang {
  return language;
}

const NATIVE_NAMES: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
};

// A faint mark of the app's own visual language, so the first screen reads as
// this app rather than an anonymous panel.
const WATERMARK =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="none" stroke="#ffffff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"><path d="M240 64 L98 372 Q240 446 382 372 Z"/><path d="M240 64 L240 176" opacity="0.5"/><path d="M226 182C204 202 190 238 194 274C212 264 228 234 232 198Z" fill="#ffffff" stroke="none" opacity="0.9"/><path d="M254 182C276 202 290 238 286 274C268 264 252 234 248 198Z" fill="#ffffff" stroke="none" opacity="0.9"/><g opacity="0.6" stroke-width="6"><path d="M290 172 L304 165"/><path d="M311 218 L326 211"/><path d="M332 264 L347 258"/><path d="M354 310 L368 304"/></g></svg>';

// Shown once, before the disclaimer, when no language has been chosen yet.
// The panel carries data-i18n-switcher so the engine leaves its native names alone.
function showLanguageChooser(): void {
  const nav = document.querySelector<HTMLElement>('[data-i18n-switcher]');
  if (nav) nav.style.display = 'none';

  const overlay = document.createElement('div');
  overlay.setAttribute('data-i18n-switcher', '');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Language');
  overlay.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:2147483600',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'padding:24px',
    'padding-top:calc(env(safe-area-inset-top, 0px) + 24px)',
    'padding-bottom:calc(env(safe-area-inset-bottom, 0px) + 24px)',
    'overflow:hidden',
    'background:linear-gradient(165deg, #075985 0%, #0c4a6e 60%, #082f49 100%)',
    'font:400 15px system-ui, -apple-system, Segoe UI, sans-serif',
  ].join(';');

  const mark = document.createElement('div');
  mark.setAttribute('aria-hidden', 'true');
  mark.style.cssText = [
    'position:absolute',
    'left:0',
    'right:0',
    'top:0',
    'height:44%',
    'pointer-events:none',
    'background-repeat:no-repeat',
    'background-position:center bottom',
    'background-size:contain',
    'opacity:0.24',
    'background-image:url("data:image/svg+xml,' + encodeURIComponent(WATERMARK) + '")',
  ].join(';');
  overlay.appendChild(mark);

  const card = document.createElement('div');
  card.style.cssText = [
    'position:relative',
    'margin-top:14vh',
    'width:100%',
    'max-width:320px',
    'display:flex',
    'flex-direction:column',
    'gap:10px',
  ].join(';');

  const heading = document.createElement('p');
  heading.textContent = 'Language';
  heading.style.cssText = [
    'margin:0 0 2px',
    'color:#e0f2fe',
    'font:600 13px system-ui, -apple-system, Segoe UI, sans-serif',
    'letter-spacing:0.08em',
    'text-transform:uppercase',
    'text-align:center',
  ].join(';');
  card.appendChild(heading);

  const subheading = document.createElement('p');
  subheading.textContent = 'Choisissez votre langue / Elija su idioma / Escolha o seu idioma';
  subheading.style.cssText = [
    'margin:0 0 10px',
    'color:#bae6fd',
    'font:400 12px system-ui, -apple-system, Segoe UI, sans-serif',
    'line-height:1.5',
    'text-align:center',
  ].join(';');
  card.appendChild(subheading);

  SUPPORTED.forEach((code) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = NATIVE_NAMES[code];
    button.style.cssText = [
      'width:100%',
      'min-height:52px',
      'border:0',
      'border-radius:14px',
      'background:#ffffff',
      'color:#075985',
      'font:600 16px system-ui, -apple-system, Segoe UI, sans-serif',
      'box-shadow:0 6px 18px rgba(2,6,23,0.28)',
      'cursor:pointer',
    ].join(';');
    button.addEventListener('click', () => {
      setLanguage(code);
      overlay.remove();
      document.documentElement.style.overflow = previousOverflow;
      if (nav) nav.style.display = '';
    });
    card.appendChild(button);
  });

  overlay.appendChild(card);
  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  document.body.appendChild(overlay);
}

function start(): void {
  buildSwitcher();

  new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE || node instanceof Element) translateTree(node);
      });
      if (record.type === 'characterData' && record.target.nodeType === Node.TEXT_NODE) {
        const node = record.target as Text;
        const value = node.nodeValue || '';
        if (originals.get(node) !== value && lookup(value.trim()) !== null) {
          originals.set(node, value);
          applyToTextNode(node);
        }
      }
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  // alert() text never reaches the DOM, so translate it at the call site.
  const nativeAlert = window.alert.bind(window);
  window.alert = (message?: unknown) => nativeAlert(translate(String(message ?? '')));

  const saved = storedLanguage();
  if (saved) {
    setLanguage(saved);
    return;
  }
  // No choice on record: pre-select the device language, then let the clinician
  // confirm it before the disclaimer is shown.
  setLanguage(deviceLanguage(), false);
  showLanguageChooser();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
