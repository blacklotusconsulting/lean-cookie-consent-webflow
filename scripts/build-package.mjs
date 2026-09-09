import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const zipPath = join(dist, 'lean-cookie-consent-webflow-0.1.0.zip');

mkdirSync(dist, { recursive: true });
rmSync(zipPath, { force: true });

execFileSync('zip', [
  '-qr',
  zipPath,
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
  'snippets',
  'examples',
  'scripts',
  'package.json'
], { cwd: root, stdio: 'inherit' });

console.log(zipPath);
