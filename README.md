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
