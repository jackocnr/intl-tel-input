// Generates the published .d.ts files for the public exports.
//
// We use dts-bundle-generator (rather than plain `tsc --declaration`) because
// tsc emits one .d.ts per source file, mirroring the entire src/js tree and
// leaking internal module structure to consumers. dts-bundle-generator inlines
// every internal type into a single self-contained .d.ts per entry point, so
// the package only ships the public API surface.
//
// We call its programmatic API (instead of the CLI) so all three entry points
// share one TS compilation pass — measurably faster than spawning the CLI
// three times, each of which would re-bootstrap tsc from scratch.
import { writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { generateDtsBundle } from "dts-bundle-generator";

const entries = [
  {
    input: "packages/core/src/js/intlTelInput.ts",
    output: "packages/core/dist/js/intlTelInput.d.ts",
  },
  {
    input: "packages/core/src/js/data.ts",
    output: "packages/core/dist/js/data.d.ts",
  },
  {
    input: "packages/core/src/js/i18n/index.ts",
    output: "packages/core/dist/js/i18n.d.ts",
  },
];

const results = generateDtsBundle(
  entries.map(({ input }) => ({ filePath: input, noBanner: true })),
  { preferredConfigPath: "tsconfig.json" },
);

results.forEach((dts, i) => {
  mkdirSync(dirname(entries[i].output), { recursive: true });
  writeFileSync(entries[i].output, dts);
  console.log(`Wrote ${entries[i].output}`);
});

// utils.js is compiled by Google Closure Compiler (not TypeScript), so its
// hand-written .d.ts just needs to be copied into dist alongside the others.
copyFileSync("packages/core/src/js/types/utils.d.ts", "packages/core/dist/js/utils.d.ts");
console.log("Wrote packages/core/dist/js/utils.d.ts");
