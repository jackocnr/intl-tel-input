// Swaps iti.isValidNumber() -> iti.isValidNumberPrecise() in the precise example.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

const file = "build/examples/js/validation_precise.js";
const original = fs.readFileSync(file, "utf8");
const updated = original.replace(/\biti\.isValidNumber\(\)/g, "iti.isValidNumberPrecise()");

if (original === updated) {
  console.warn(`replace-validation-precise: no replacements in ${file}`);
} else {
  fs.writeFileSync(file, updated);
  console.log(`replace-validation-precise: updated ${file}`);
}
