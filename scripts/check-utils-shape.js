// Validates that the hand-written ItiUtils type in src/js/types/public-api.ts
// matches the runtime shape of dist/js/utils.js. The runtime file is compiled
// by Google Closure Compiler (not TypeScript), so no .d.ts is auto-generated
// and the type can drift silently. This script catches that by:
//   1. Parsing the ItiUtils block from public-api.ts for expected members.
//   2. Importing the built utils.js and introspecting the default export.
//   3. Failing loudly on any asymmetry (missing from runtime OR missing from
//      the type).
//
// Wired into `build:utils` so the check runs whenever utils.js is rebuilt.

/* eslint-disable no-console */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UTILS_JS = resolve(REPO_ROOT, "dist/js/utils.js");
const PUBLIC_API = resolve(REPO_ROOT, "src/js/types/public-api.ts");

if (!existsSync(UTILS_JS)) {
  console.error(`${UTILS_JS} not found — run build:utils first.`);
  process.exit(1);
}

// Extract the ItiUtils block, tracking brace depth so we grab only the
// top-level body (not any nested object literals).
function extractItiUtilsBody(source) {
  const start = source.indexOf("export type ItiUtils = {");
  if (start < 0) throw new Error("Couldn't find `export type ItiUtils = {` in public-api.ts");
  let depth = 0;
  let bodyStart = -1;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{") {
      depth++;
      if (depth === 1) bodyStart = i + 1;
    } else if (ch === "}") {
      depth--;
      if (depth === 0) return source.slice(bodyStart, i);
    }
  }
  throw new Error("Unterminated ItiUtils block");
}

// Walk the body line-by-line, tracking depth, collecting members at depth 0.
// Depth 0 means "directly inside ItiUtils" (not inside a nested object).
function parseTopLevelMembers(body) {
  const members = []; // { name, kind: "function" | "object", nested?: string[] }
  let depth = 0;
  let currentObjectMember = null; // the depth-0 name whose nested { we're inside
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) continue;

    if (depth === 0) {
      // function member:  "name(... ): ReturnType;"  (signature may span multiple lines; detect by trailing "(" or "(...")
      const fnMatch = trimmed.match(/^(\w+)\s*\(/);
      if (fnMatch) {
        members.push({ name: fnMatch[1], kind: "function" });
        // don't adjust depth — function signature parens don't count for brace depth
        continue;
      }
      // object member:  "name: {"
      const objMatch = trimmed.match(/^(\w+)\s*:\s*\{/);
      if (objMatch) {
        currentObjectMember = { name: objMatch[1], kind: "object", nested: [] };
        members.push(currentObjectMember);
        depth++;
        continue;
      }
    } else if (currentObjectMember) {
      // Inside an object member: collect its inner keys at depth 1.
      if (depth === 1) {
        const innerMatch = trimmed.match(/^(\w+)\s*:/);
        if (innerMatch) currentObjectMember.nested.push(innerMatch[1]);
      }
    }

    // Adjust brace depth using the whole line.
    for (const ch of line) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) currentObjectMember = null;
      }
    }
  }
  return members;
}

const source = readFileSync(PUBLIC_API, "utf8");
const expected = parseTopLevelMembers(extractItiUtilsBody(source));
const expectedNames = new Set(expected.map((m) => m.name));

const utils = (await import(pathToFileURL(UTILS_JS).href)).default;
if (!utils || typeof utils !== "object") {
  console.error("dist/js/utils.js default export is not an object.");
  process.exit(1);
}

const errors = [];

// 1. Every declared member must exist at runtime with the right kind.
for (const { name, kind, nested } of expected) {
  const runtime = utils[name];
  if (runtime === undefined) {
    errors.push(`missing at runtime: utils.${name}`);
    continue;
  }
  const actualKind = typeof runtime === "function" ? "function" : typeof runtime === "object" ? "object" : typeof runtime;
  if (actualKind !== kind) {
    errors.push(`utils.${name} expected to be a ${kind}, runtime has ${actualKind}`);
    continue;
  }
  if (kind === "object" && nested) {
    for (const inner of nested) {
      if (!(inner in runtime)) errors.push(`missing at runtime: utils.${name}.${inner}`);
    }
  }
}

// 2. Runtime must not carry members the type doesn't declare (catches drift the other way).
for (const key of Object.keys(utils)) {
  if (!expectedNames.has(key)) errors.push(`runtime has utils.${key} but ItiUtils does not declare it`);
}

if (errors.length) {
  console.error(`utils.js / ItiUtils drift detected:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`utils.js matches ItiUtils (${expected.length} top-level members).`);
