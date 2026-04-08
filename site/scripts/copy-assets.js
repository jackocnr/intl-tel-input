// Copies four trees into site/build/.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

const targets = [
  // Mirror of the published intl-tel-input package, served at /intl-tel-input/
  { from: "../build", to: "build/intl-tel-input" },
  // Static site assets (favicon, robots.txt, etc.)
  { from: "static", to: "build" },
  // Demo example CSS, copied verbatim
  { from: "src/examples/css", to: "build/examples/css" },
];

for (const { from, to } of targets) {
  if (!fs.existsSync(from)) {
    console.warn(`copy-assets: source missing, skipping: ${from}`);
    continue;
  }
  fs.mkdirSync(to, { recursive: true });
  fs.cpSync(from, to, {
    recursive: true,
    dereference: false,
    filter: (src) => !path.basename(src).startsWith(".DS_Store"),
  });
  console.log(`copy-assets: ${from} -> ${to}`);
}
