// Removes everything in dist/js/ EXCEPT utils.js (the closure-compiler output).
// Used by build:jsfast and watch.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'packages/core/dist/js';
if (!fs.existsSync(dir)) process.exit(0);

for (const entry of fs.readdirSync(dir)) {
  if (entry === 'utils.js') continue;
  fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
}
