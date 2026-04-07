// Removes everything in build/js/ EXCEPT utils.js (the closure-compiler output).
// Mirrors the grunt clean:buildJsKeepUtils target — used by build:jsfast and watch.
import fs from 'node:fs';
import path from 'node:path';

const dir = 'build/js';
if (!fs.existsSync(dir)) process.exit(0);

for (const entry of fs.readdirSync(dir)) {
  if (entry === 'utils.js') continue;
  fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
}
