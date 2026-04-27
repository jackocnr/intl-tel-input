// Swaps iti.isValidNumber() -> iti.isValidNumberPrecise() in the precise example.
// Runs on the templated tmp/ source before esbuild bundles it, so the substitution
// survives minification (which would otherwise rename the `iti` identifier).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

const file = "tmp/examples/vanilla-javascript/validation-precise/page.ts";
const original = fs.readFileSync(file, "utf8");
const updated = original.replace(/\biti\.isValidNumber\(\)/g, "iti.isValidNumberPrecise()");

if (original === updated) {
  console.warn(`replace-validation-precise: no replacements in ${file}`);
} else {
  fs.writeFileSync(file, updated);
  console.log(`replace-validation-precise: updated ${file}`);
}
