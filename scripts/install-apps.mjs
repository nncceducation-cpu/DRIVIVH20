import { execFileSync } from 'node:child_process';
for (const app of ['HUSDiagnostic', 'PHVD']) {
  execFileSync(process.execPath, [process.env.npm_execpath, 'ci', '--prefix', `apps/${app}`, '--no-audit', '--no-fund'], { stdio: 'inherit' });
}
