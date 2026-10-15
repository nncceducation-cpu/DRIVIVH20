# DRIVE IVH 2.0

Public app: https://nncceducation-cpu.github.io/DRIVIVH20/

Copy of the supplied Google AI Studio export, migrated to a standalone Vite project.

## Run

Use Node.js 22 or newer. Run `npm ci`, `npm run build`, then `npm run preview`.
The build includes the main pathway and both copied web apps. Use preview to test all tabs; the root development server alone does not build the embedded apps.

## Diagnosis and PHVD

These tabs load local copies in separate frames to preserve the published apps' styles, calculations, references, disclaimers, and storage behavior. Each tab also offers a standalone view. No remote app embedding is required.

- Diagnosis: https://github.com/nncceducation-cpu/HUSDiagnostic at f2603774253927eff9e1f3d5778606e4e3bbf23c
- PHVD: https://github.com/nncceducation-cpu/PHVD at d3f767e942308341a445ebb6519469ea51ff1108

The `apps/` folders contain web sources and assets; native store projects and signing tools are excluded. Native-only camera and photo features retain the published app's web limitations. Future upstream changes require an explicit source update.

Original simplified classification and PHVD components remain as unused archive source; the navigation uses the copied published apps. The original Gemini-dependent components are not loaded by the migrated tabs. No API keys, local environment file, or AI Studio prompt history are included.

The main pathway retains its original external Tailwind CDN and reference image URLs. This is not a completely offline app. `dist/` can be served by any static host, including under a repository subpath. GitHub Actions builds, checks, and publishes the app to GitHub Pages after each push to main.

## Antenatal Consult

The Antenatal Consult tab contains the Prematurity features copied from the supplied `neoconsult_-antenatal-tool.zip`: quick-reference table, survival factors, intensive/comfort care comparison, evidence links, structured counseling summary, searchable parent FAQs with selection, gestation-based outcome views (22-28 weeks), imported postnatal educational estimates (Day 7/14/28), and an editable/copyable/resettable consultation draft.

Within Survival and Outcomes, Antenatal Prediction is labeled **CNN Survival and Outcome** and is beside **VON Survival and Outcome**. The official **CNN Calculator** is also available there. CNN and VON remain directly accessible from the first two main tabs.

The imported postnatal calculator uses heuristic coefficients different from the official CNN NOPS input set. Its numbers are preserved as educational illustrations, with the unsubstantiated validation claims removed from the UI and exported drafts. The imported antenatal figures retain their supplied values; cohort attribution has not been independently verified. The official CNN portal remains linked for NOPS predictions.

GitHub Pages cannot run the original Express/Gemini server. Draft preparation therefore runs locally, retains missing `***` fields, and appends entered context without inventing medication history or a care decision. The counseling care goal defaults to pending. Export buttons prepare editable drafts and do not send anything to an external medical record. No clinical context is sent to an AI endpoint, and no key is bundled. External CNN, VON and evidence portals retain their own availability and sign-in requirements.

The antenatal app builds with the root Vite installation and uses the already pinned Diagnosis app's Tailwind/PostCSS dependencies. It needs no additional server or package installation.
