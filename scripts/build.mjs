import { build } from 'vite';
import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
await build();
for (const app of ['HUSDiagnostic', 'PHVD']) {
  const appRoot = path.join(root, 'apps', app);
  process.chdir(appRoot);
  await build({ root: appRoot, configFile: path.join(appRoot, 'vite.config.ts') });
  process.chdir(root);
  const destination = path.join(root, 'dist', 'apps', app);
  await mkdir(destination, { recursive: true });
  await cp(path.join(appRoot, 'dist'), destination, { recursive: true });
}

