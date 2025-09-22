/**
 * This script loads the existing country data from data.ts,
 * then parses libphonenumber's PhoneNumberMetadata.xml to look for any updates.
 *
 * I decided to keep the hand-made data.ts data instead of just having it all auto-generated from the LPN metadata because LPN only stores the precise ranges that are known to be in use, whereas (1) we know that there are other ranges that have been assigned to a territory and so would make more sense belonging to that one rather than the main country, and (2) because of the high level of precision, the resulting output is massive from LPN e.g. outputting 20x 6-digit numbers for IM (isle of man), when it is clearly documented on the wiki page that they have been assigned the 5 short strings that I have included in data.ts
 */


/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const REPO_ROOT = path.resolve(__dirname, "..", "");
const XML_PATH = path.resolve(
  REPO_ROOT,
  "third_party/libphonenumber/resources/PhoneNumberMetadata.xml",
);
const OUT_TS = path.resolve(REPO_ROOT, "tmp/generated-rawCountryData.ts");
const CURATED_DATA_TS_PATH = path.resolve(REPO_ROOT, "src/js/intl-tel-input/data.ts");

// Extract a compact leading digits prefix representative for a region.
// Strategy:
// - Prefer a short literal digit prefix found in the first national number pattern for fixed-line or mobile
// - Fallback to a header-level leadingDigits string when present, trimming to a short digit-only prefix
// (legacy single-prefix extractor removed in favor of extractLeadingPrefixes)

function sortDigitStringsNumeric(arr) {
  // Lexicographic digit-by-digit ordering (e.g., 74576 < 7524)
  return arr.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

// Shared simple prefix parser used for XML mode
function splitTopLevelAlts(inner) {
    const parts = [];
    let cur = "";
    let depth = 0;
    for (let i = 0; i < inner.length; i++) {
      const ch = inner[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth = Math.max(0, depth - 1);
      if (ch === "|" && depth === 0) { parts.push(cur); cur = ""; continue; }
      cur += ch;
    }
    parts.push(cur);
    return parts;
}

function expandCharClass(cls) {
    const res = new Set();
    for (let i = 0; i < cls.length; i++) {
      const c = cls[i];
      if (/\d/.test(c)) {
        if (i + 2 < cls.length && cls[i + 1] === "-" && /\d/.test(cls[i + 2])) {
          const start = Number(c), end = Number(cls[i + 2]);
          for (let d = start; d <= end; d++) res.add(String(d));
          i += 2;
        } else {
          res.add(c);
        }
      }
    }
    return Array.from(res);
}

function expandSimple(prefixPart) {
    if (/^\d{2,6}$/.test(prefixPart)) return [prefixPart];
    const m = prefixPart.match(/^(\d*)\[([0-9-]+)\](\d*)$/);
    if (m) {
      const lead = m[1] || "";
      const cls = m[2];
      const tail = m[3] || "";
      return expandCharClass(cls).map((d) => lead + d + tail).filter((s) => /^\d{2,6}$/.test(s));
    }
    return [];
}

function simplePrefixesFromPattern(pat) {
    // Normalize: collapse all whitespace to simplify parsing of multi-line XML patterns
    pat = String(pat).replace(/\s+/g, "");
    // Handle a leading literal digit sequence followed by a non-capturing group, e.g., '7(?:781|839)\\d|911[17])\\d{5}'
    let mLeadGroup = pat.match(/^(\d{1,3})\(\?:/);
    if (mLeadGroup) {
      const lead = mLeadGroup[1];
      // Extract the first non-capturing group's inner content after the leading digits
      let i = lead.length + 3; // position after '<lead>(?:'
      let depth = 1;
      let inner = "";
      while (i < pat.length) {
        const ch = pat[i];
        if (ch === "\\") { i += 2; continue; }
        if (ch === "(") depth++;
        else if (ch === ")") { depth--; if (depth === 0) { i++; break; } }
        inner += ch; i++;
      }
      const alts = splitTopLevelAlts(inner);
      const set = new Set();
      for (const a of alts) {
        const arr = simplePrefixesFromPattern(a);
        for (const v of arr) set.add(lead + v);
      }
      return Array.from(set).filter((s) => /^\d{2,6}$/.test(s));
    }
    // If the pattern starts with a top-level non-capturing group, extract its inner content
    if (pat.startsWith("(?:")) {
      let i = 3; // after (?:
      let depth = 1;
      let inner = "";
      while (i < pat.length) {
        const ch = pat[i];
        if (ch === "\\") { // skip escaped char
          i += 2;
          continue;
        }
        if (ch === "(") depth++;
        else if (ch === ")") {
          depth--;
          if (depth === 0) { i++; break; }
        }
        inner += ch;
        i++;
      }
      // Now 'inner' holds the content of the outer non-capturing group; ignore any suffix like \d{n}
      const alts = splitTopLevelAlts(inner);
      if (alts.length > 1) {
        const set = new Set();
        for (const a of alts) {
          const arr = simplePrefixesFromPattern(a);
          for (const v of arr) set.add(v);
        }
        return Array.from(set);
      }
      // Single alternative inside, recurse into it directly
      return simplePrefixesFromPattern(inner);
    }
    // Handle top-level alternations like "658|876" or "8001|8[024]9"
    const top = splitTopLevelAlts(pat);
    if (top.length > 1) {
      const set = new Set();
      for (const part of top) {
        const arr = simplePrefixesFromPattern(part);
        for (const v of arr) set.add(v);
      }
      return Array.from(set);
    }
    // Handle bare character class at start, e.g., "[347]" or "[3-7]24"
    let m = pat.match(/^\[([0-9-]+)\](\d*)$/);
    if (m) {
      const cls = m[1];
      const tail = m[2] || "";
      return expandCharClass(cls).map((d) => d + tail).filter((s) => /^\d{1,6}$/.test(s));
    }
    m = pat.match(/^(\d+)\[([0-9-]+)\](\d*)/);
    if (m) {
      const lead = m[1];
      const cls = m[2];
      const tail = m[3] || "";
      return expandCharClass(cls).map((d) => lead + d + tail).filter((s) => /^\d{2,6}$/.test(s));
    }
  m = pat.match(/^(\d{1,6})/);
    if (m) return [m[1]];
    return [];
}

// Collapse exhaustive ranges (prefix-aware): if for a parent prefix p we see all 10 next digits
// across any longer codes (e.g., p0*, p1*, ..., p9*), then replace all those children with p.
function collapseExhaustiveRanges(codes) {
  if (!Array.isArray(codes) || !codes.length) return codes || [];
  const set = new Set(codes);
  let changed = true;
  while (changed) {
    changed = false;
    // Build parent -> set(nextDigits)
    const parents = new Map();
    for (const s of set) {
      if (typeof s !== "string" || s.length < 2) continue;
      for (let k = 1; k < s.length; k++) {
        const parent = s.slice(0, k);
        const next = s[k];
        if (!/\d/.test(next)) continue;
        let bag = parents.get(parent);
        if (!bag) { bag = new Set(); parents.set(parent, bag); }
        bag.add(next);
      }
    }
    // For any parent with all 10 digits seen, collapse all children starting with parent+digit
    for (const [parent, bag] of parents) {
      if (bag.size === 10) {
        let mutated = false;
        const toDelete = [];
        for (const s of set) {
          if (s.length > parent.length && s.startsWith(parent)) {
            toDelete.push(s);
          }
        }
        for (const s of toDelete) { set.delete(s); mutated = true; }
        if (!set.has(parent)) { set.add(parent); mutated = true; }
        if (mutated) changed = true;
      }
    }
  }
  return sortDigitStringsNumeric(Array.from(set));
}

// Attempt to extract 3-digit NANP NPAs from a complex pattern like CA's,
// which uses structure: (?: 2(?:..|..|..) | 3(?:..|..) | ... )[2-9]\d{6}
function extractNanpNpasFromPattern(pat) {
  if (typeof pat !== "string" || !pat) return [];
  const s = pat.replace(/\s+/g, "");
  // Find the top-level non-capturing group at the start, if present
  let inner = s;
  if (s.startsWith("(?:")) {
    let i = 3, depth = 1; inner = "";
    while (i < s.length) {
      const ch = s[i];
      if (ch === "\\") { i += 2; continue; }
      if (ch === "(") depth++;
      else if (ch === ")") { depth--; if (depth === 0) { i++; break; } }
      inner += ch; i++;
    }
  }
  const alts = splitTopLevelAlts(inner);
  const out = new Set();
  for (const a of alts) {
    // Expect a like: 2(?:04|[23]6|...)
    const m = a.match(/^([2-9])\(\?:(.+)\)$/);
    if (!m) continue;
    const d = m[1];
    const rest = m[2];
    const parts = splitTopLevelAlts(rest);
    for (const p of parts) {
      // Expand simple pieces like 04, [23]6, 5[07], 63
      const expansions = expandSimple(d + p);
      for (const e of expansions) { if (/^\d{3}$/.test(e)) out.add(e); }
      // Also handle pure two-digit literals (e.g., '63') after the 1st digit
      if (/^\d{2}$/.test(p)) out.add(d + p);
    }
  }
  return sortDigitStringsNumeric(Array.from(out));
}

function deriveNanpNpasFromPatterns(fixedList, mobileList) {
  const set = new Set();
  const addFrom = (list) => {
    if (!Array.isArray(list)) return;
    for (const pat of list) {
      // 1) General extraction using simplePrefixesFromPattern
      const simple = simplePrefixesFromPattern(pat);
      for (const s of simple) {
        if (/^[2-9]\d{2}$/.test(s)) set.add(s);
        else if (/^[2-9]\d{3,6}$/.test(s)) set.add(s.slice(0, 3));
      }
      // 2) CA-style nested non-capturing groups as a supplement
      const caLike = extractNanpNpasFromPattern(pat);
      for (const v of caLike) set.add(v);
      if (set.size > 400) break; // safety guardrail
    }
  };
  addFrom(fixedList);
  addFrom(mobileList);
  return sortDigitStringsNumeric(Array.from(set));
}

// XML-mode generic extractor: only use territory.leadingDigits + fixedLine/mobile patterns
// Apply safe expansions and filter out obvious service/example-like prefixes
function extractGenericPrefixesXml(src) {
  const out = new Set();

  function isDisallowedPrefix(s) {
    // Leading zero prefixes are often trunk/formatting hints
    if (/^0/.test(s)) return true;
    // Non-geo/service families and known service groups
    if (/^(?:800|80\d|900|90\d|13|1300|1800|190\d)\d*$/.test(s)) return true;
    // Example-like tails
    if (/(?:0123|1234)$/.test(s)) return true;
    // Common synthetic sequences sometimes found in examples
    if (/701234$/.test(s)) return true;
    return false;
  }

  function addFrom(list) {
    if (!Array.isArray(list)) return;
    for (const p of list) {
      if (typeof p !== "string" || !p) continue;
      const arr = simplePrefixesFromPattern(p);
      for (const s of arr) out.add(s);
      if (out.size > 40) break;
    }
  }

  // Use only fixedLine and mobile patterns (ignore leadingDigits entirely)
  addFrom(src.fixed);
  addFrom(src.mobile);

  // Perform prefix-aware collapse before filtering so that short parents (e.g., '4') can be retained
  const rawList = sortDigitStringsNumeric(Array.from(out));
  const collapsed = collapseExhaustiveRanges(rawList);
  const rawSet = new Set(rawList);

  // Filter out obvious service/example-like prefixes
  const filtered = Array.from(collapsed).filter((s) => {
    if (isDisallowedPrefix(s)) return false;
    // Drop 709x branch (special allocations seen in 262/590 groups) to match curated area codes
    if (src && (src.dial === "262" || src.dial === "590") && /^709/.test(s)) return false;
    // Do not treat the full dial code itself as an area-code discriminator,
    // except for Kazakhstan (kz) which legitimately needs '7' to disambiguate from RU.
    if (src && s === src.dial && src.iso2 !== "kz") return false;
    // Enforce minimum length with exceptions:
    //  - allow 1-digit for dial 599 (BQ group)
    //  - allow 1-digit for KZ (iso2 === 'kz')
    const minLen = (src && (src.dial === "599" || src.iso2 === "kz")) ? 1 : 3;
    // If this value is a collapsed parent (i.e., not present in raw expansions), allow even if short
    const isCollapsedParent = !rawSet.has(s);
    if (s.length < minLen && !isCollapsedParent) return false;
    return true;
  });

  return sortDigitStringsNumeric(filtered);
}

// XML-only: extend a base prefix to at least minLen using only safe expansions from XML patterns
function extendPrefixXml(iso2, base, minLen, xmlSources) {
  const src = xmlSources[iso2];
  if (!src || !base) return base;
  const candidates = new Set();
  // Reuse filtering from extractor
  function isDisallowedPrefix(s) {
    if (/^0/.test(s)) return true;
    if (/^(?:800|80\d|900|90\d|13|1300|1800|190\d)\d*$/.test(s)) return true;
    if (/(?:0123|1234)$/.test(s)) return true;
    if (/701234$/.test(s)) return true;
    return false;
  }
  const collect = (list) => {
    if (!Array.isArray(list)) return;
    for (const pat of list) {
      if (typeof pat !== "string") continue;
      const arr = simplePrefixesFromPattern(pat);
      for (const p of arr) {
        if (p.startsWith(base) && p.length >= minLen && !isDisallowedPrefix(p)) candidates.add(p);
      }
    }
  };
  collect(src.fixed);
  collect(src.mobile);
  if (!candidates.size) return base;
  // choose the shortest candidate
  return Array.from(candidates).sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0))[0];
}



// No iso2-codes.json; we derive the allowlist from curated data.ts

function main() {
  let countryToMetadata;
  const dialCodeToRegions = {};
  const xmlNationalPrefixByIso2 = {};
  // Regions where we intentionally do NOT derive areaCodes as there is no way to distinguish numbers from main region
  const AREA_CODES_EXCLUDE = new Set(["bl", "mf", "cc", "cx"]);

  // For XML mode, we also keep a structured source set per region
  const xmlSourcesByIso2 = {};
  console.log("Loading libphonenumber XML from:", XML_PATH);
  // Lazy-require to keep default path lightweight
  let XMLParser;
  try {
    ({ XMLParser } = require("fast-xml-parser"));
  } catch {
    throw new Error(
      "fast-xml-parser is required. Install with: npm i -D fast-xml-parser",
    );
  }
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
  const xmlRaw = fs.readFileSync(XML_PATH, "utf8");
  const xmlDoc = parser.parse(xmlRaw);
  const territoriesRoot = xmlDoc && xmlDoc.phoneNumberMetadata && xmlDoc.phoneNumberMetadata.territories;
  if (!territoriesRoot) throw new Error("Invalid PhoneNumberMetadata.xml structure: missing territories");
  let territories = territoriesRoot.territory || [];
  if (!Array.isArray(territories)) territories = [territories];

  // Build minimal structures compatible with the rest of the pipeline
  // countryToMetadataXml: REG -> array of arrays of strings (patterns) so extendPrefix can scan
  const countryToMetadataXml = {};

  territories.forEach((t) => {
    const reg = (t.id || "").toString();
    const iso2 = reg.toLowerCase();
    if (!reg) return;
    const dial = (t.countryCode || "").toString();
    if (!dial) return;
    const natPref = t.nationalPrefix ? String(t.nationalPrefix) : null;
    if (natPref) xmlNationalPrefixByIso2[iso2] = natPref;

    // Collect safe patterns from territory-level leadingDigits, fixedLine, mobile
    const patterns = [];
    const leading = [];
    const fixedPats = [];
    const mobilePats = [];
    // Some schemas put territory-level leadingDigits as child elements or arrays
    const ld = t.leadingDigits;
    if (typeof ld === "string") { patterns.push(ld); leading.push(ld); }
    else if (Array.isArray(ld)) ld.forEach((s) => { if (typeof s === "string") { patterns.push(s); leading.push(s); } });

    const fixed = t.fixedLine && t.fixedLine.nationalNumberPattern;
    if (typeof fixed === "string") { patterns.push(fixed); fixedPats.push(fixed); }
    const mobile = t.mobile && t.mobile.nationalNumberPattern;
    if (typeof mobile === "string") { patterns.push(mobile); mobilePats.push(mobile); }

    // Build dialCodeToRegions honoring mainCountryForCode where available
    if (!dialCodeToRegions[dial]) dialCodeToRegions[dial] = [];
    const isMain = String(t.mainCountryForCode || "") === "true";
    if (isMain) {
      // Ensure main region is first
      dialCodeToRegions[dial].unshift(iso2);
    } else {
      dialCodeToRegions[dial].push(iso2);
    }

    // Provide a scanning surface for extendPrefix: one inner array with collected patterns
    countryToMetadataXml[reg] = [patterns];
    xmlSourcesByIso2[iso2] = { iso2, leading, fixed: fixedPats, mobile: mobilePats, dial, main: isMain };
  });

  countryToMetadata = countryToMetadataXml;

  // Load curated area codes from src/js/intl-tel-input/data.ts and seed from those first.
  // We only add newly-derived codes if they are not already covered by curated ones.
  // Also capture curated priority per iso2 to preserve priority values in generated output (we don't compute priorities ourselves).
  const curatedPriorityByIso2 = new Map();
  const curatedIso2Set = new Set();
  function loadCuratedAreaCodes() {
    const map = new Map();
    if (!fs.existsSync(CURATED_DATA_TS_PATH)) return map;
    try {
      const ts = fs.readFileSync(CURATED_DATA_TS_PATH, "utf8");
      const anchor = ts.indexOf("export const rawCountryData");
      if (anchor === -1) return map;
      // Find first '[' after anchor and then parse matching brackets until the corresponding ']'
      let i = ts.indexOf("[", anchor);
      if (i === -1) return map;
      let depth = 0;
      let start = i;
      for (; i < ts.length; i++) {
        const ch = ts[i];
        if (ch === "[") depth++;
        else if (ch === "]") { depth--; if (depth === 0) { i++; break; } }
      }
      if (depth !== 0) return map;
      const arrSrc = ts.slice(start, i);
      // Evaluate the array literal. Comments are allowed in JS arrays, so this should work.
      // Wrap in parentheses to make it a valid expression.
      // eslint-disable-next-line no-new-func
      const curated = Function("return (" + arrSrc + ")")();
      if (Array.isArray(curated)) {
        for (const row of curated) {
          if (!Array.isArray(row) || row.length < 2) continue;
          const iso2 = row[0];
          const priority = row[2];
          const area = row[3];
          if (typeof iso2 === "string") curatedIso2Set.add(iso2.toLowerCase());
          if (typeof iso2 === "string" && Array.isArray(area) && area.length) {
            map.set(iso2.toLowerCase(), area.slice());
          }
          if (typeof iso2 === "string" && (typeof priority === "number" || typeof priority === "string")) {
            const p = Number(priority);
            if (!Number.isNaN(p)) curatedPriorityByIso2.set(iso2.toLowerCase(), p);
          }
        }
      }
    } catch (e) {
      console.warn("Warning: failed to parse curated data.ts for area codes:", e && e.message ? e.message : e);
    }
    return map;
  }
  const curatedAreaCodesByIso2 = loadCuratedAreaCodes();
  // Build allowlist from curated data.ts iso2s
  console.log("Building iso2 allowlist from curated data.ts");
  const allowIso2 = curatedIso2Set;

  const tuples = [];

  // Precompute candidate leading prefixes per region
  const candidatePrefixesByIso2 = {};
  const collapsedParentsByIso2 = {};
  // NANP behavior: derive 3-digit NPAs from fixed/mobile patterns
  Object.keys(countryToMetadata).forEach((REG) => {
    const iso2 = REG.toLowerCase();
    if (!allowIso2.has(iso2)) return;
    // find dial code for region
    let dial = null;
    // In XML mode we already built dialCodeToRegions, so find the dial by reverse lookup
    for (const [dc, regs] of Object.entries(dialCodeToRegions)) {
      if (regs.includes(iso2)) { dial = dc; break; }
    }
    if (!dial) return;
  const siblings = dialCodeToRegions[dial] || [];
  if (siblings.length <= 1) return; // unique dial code -> no areaCodes
  // Use explicit main flag from XML to decide skipping area code derivation
  const srcForRegion = xmlSourcesByIso2[iso2];
  if (srcForRegion && srcForRegion.main) return; // main region -> skip areaCodes
    // Skip area-code derivation for excluded regions
    if (AREA_CODES_EXCLUDE.has(iso2)) return;
    let cands = [];
    if (dial === "1") {
      // NANP: for non-main regions, extract 3-digit NPAs from fixed/mobile patterns
      const src = srcForRegion;
      if (src) {
        let npas = deriveNanpNpasFromPatterns(src.fixed, src.mobile);
        // Fallback: take a 3-digit slice from the first simple prefix if needed
        if (!npas.length) {
          const simple = [];
          (src.fixed || []).forEach((p) => simple.push(...simplePrefixesFromPattern(p)));
          (src.mobile || []).forEach((p) => simple.push(...simplePrefixesFromPattern(p)));
          const first = simple.find((s) => /^[2-9]\d{2,6}$/.test(s));
          if (first) npas = [first.slice(0, 3)];
        }
        if (npas.length) cands = npas;
      }
    } else {
      // XML mode: use filtered IM-style extraction from leading/fixed/mobile only
      const src = srcForRegion;
      if (src) cands = extractGenericPrefixesXml(src);
    }
    if (cands && cands.length) {
      const uniq = Array.from(new Set(cands));
      const collapsed = collapseExhaustiveRanges(uniq);
      candidatePrefixesByIso2[iso2] = collapsed;
      // Build raw expansion set from fixed/mobile patterns to detect which entries are collapsed parents
      const rawSet = new Set();
      const src = srcForRegion;
      if (src) {
        const collect = (list) => {
          if (!Array.isArray(list)) return;
          for (const p of list) {
            if (typeof p !== "string" || !p) continue;
            for (const s of simplePrefixesFromPattern(p)) rawSet.add(s);
          }
        };
        collect(src.fixed);
        collect(src.mobile);
      }
      const parents = new Set(collapsed.filter((s) => !rawSet.has(s)));
      if (parents.size) collapsedParentsByIso2[iso2] = parents;
    }
  });

  // For each dial code group, shrink prefixes to minimal unique values among non-main regions
  // Allow per-dial-code minimum lengths to ensure meaningful disambiguation (e.g., 44 → 4 digits)
  // const minUniqueLenByDial = {
  //   1: 3,
  //   7: 1,
  //   44: 4,
  //   262: 3,
  //   212: 4,
  //   599: 1,
  // };
  const uniquePrefixByIso2 = {};
  Object.keys(dialCodeToRegions).forEach((dial) => {
    const regions = dialCodeToRegions[dial];
    if (!regions || regions.length <= 1) return;
    const rest = regions.slice(1);
    const entries = rest
      .map((r) => ({ iso2: r, full: candidatePrefixesByIso2[r] }))
      .filter((e) => Array.isArray(e.full) && e.full.length);
    if (!entries.length) return;
    // determine minimal unique truncation length between 2 and full length
    const allLens = entries.flatMap((e) => e.full.map((s) => s.length));
    const maxLen = Math.min(6, Math.max(...allLens));
    // const minLenDefault = 2;
    const minLen = 1;//Math.max(minLenDefault, Number(minUniqueLenByDial[dial]) || minLenDefault);
    // Choose the longest possible unique length first (descending), then collapse if possible
    for (let len = maxLen; len >= minLen; len--) {
      const seen = new Map();
      let collision = false;
      // Expand all candidates per region, extending to len when needed
      const expanded = entries.map((e) => {
        const arr = [];
        for (const full of e.full) {
          let val = full;
          const parents = collapsedParentsByIso2[e.iso2];
          const isCollapsed = parents && parents.has(full);
          if (val.length < len && !isCollapsed) {
            val = extendPrefixXml(e.iso2, val, len, xmlSourcesByIso2);
          }
          arr.push(val.slice(0, Math.min(len, val.length)));
        }
        return { iso2: e.iso2, arr: Array.from(new Set(arr)) };
      });
      // Check collisions across all regions
      for (const e of expanded) {
        for (const k of e.arr) {
          if (seen.has(k)) { collision = true; break; }
          seen.set(k, e.iso2);
        }
        if (collision) break;
      }
      if (!collision) {
        // Try to collapse ranges per region without breaking uniqueness
        const collapsedPerIso2 = new Map();
        let collapseCollision = false;
        const seenCollapsed = new Map();
        for (const e of expanded) {
          const collapsedArr = collapseExhaustiveRanges(e.arr);
          collapsedPerIso2.set(e.iso2, collapsedArr);
        }
        // Validate uniqueness after collapse
        for (const e of expanded) {
          const arrToUse = collapsedPerIso2.get(e.iso2) || e.arr;
          for (const k of arrToUse) {
            if (seenCollapsed.has(k)) { collapseCollision = true; break; }
            seenCollapsed.set(k, e.iso2);
          }
          if (collapseCollision) break;
        }
        if (!collapseCollision) {
          for (const e of expanded) uniquePrefixByIso2[e.iso2] = collapsedPerIso2.get(e.iso2) || e.arr;
        } else {
          for (const e of expanded) uniquePrefixByIso2[e.iso2] = e.arr;
        }
        return;
      }
    }
    // If we reach here, use full prefixes
    for (const e of entries) uniquePrefixByIso2[e.iso2] = e.full;
  });

  function getNationalPrefix(iso2) {
    const np = xmlNationalPrefixByIso2[iso2];
    return typeof np === "string" && np.length ? np : null;
  }

  const dialCodes = Object.keys(dialCodeToRegions);
  console.log("Found", dialCodes.length, "country calling codes");
  dialCodes
    .sort((a, b) => Number(a) - Number(b))
    .forEach((dialCode) => {
  const regions = dialCodeToRegions[dialCode];
      regions.forEach((iso2) => {
        if (!allowIso2.has(iso2)) return;
        // Priority is ignored; always 0
        // Compute area codes starting from curated data.ts, then add uncovered generated codes
        let areaCodes = null;
        const baseline = curatedAreaCodesByIso2.get(iso2) || null;
        const area = uniquePrefixByIso2[iso2];
        const generated = Array.isArray(area) && area.length ? area.slice() : [];
        const usedCurated = Array.isArray(baseline) && baseline.length > 0;
        if (usedCurated) {
          const base = baseline.slice();
          // Determine which generated codes are not already covered by baseline
          const isCoveredByBaseline = (code) => base.some((b) => typeof b === "string" && code.startsWith(b));
          const isBroaderThanBaseline = (code) => base.some((b) => typeof b === "string" && b.startsWith(code));
          for (const g of generated) {
            if (!isCoveredByBaseline(g) && !isBroaderThanBaseline(g)) base.push(g);
          }
          areaCodes = base;
        } else {
          areaCodes = generated.length ? generated : null;
        }
        // Sort generated area codes numerically for deterministic, readable output
        if (Array.isArray(areaCodes)) {
          areaCodes = sortDigitStringsNumeric(areaCodes);
        }
        // Generic collapse: avoid collapsing when using curated baseline to preserve existing sets
        if (Array.isArray(areaCodes)) {
          const usedCurated = Array.isArray(baseline) && baseline.length > 0;
          if (!usedCurated) areaCodes = collapseExhaustiveRanges(areaCodes);
        }
        const nationalPrefix = getNationalPrefix(iso2);
        const curatedPriority = curatedPriorityByIso2.get(iso2) || 0;
        const tuple = [iso2, dialCode, curatedPriority, null, null];
        if (areaCodes) tuple[3] = areaCodes;
        if (nationalPrefix) tuple[4] = nationalPrefix;
        tuples.push(tuple);
      });
    });

  tuples.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const ts = `export const rawCountryData = ${JSON.stringify(tuples, null, 2)} as const;\n`;
  fs.mkdirSync(path.dirname(OUT_TS), { recursive: true });
  fs.writeFileSync(OUT_TS, ts, "utf8");
  console.log(`Wrote ${tuples.length} entries as TS to ${path.relative(process.cwd(), OUT_TS)}`);

  // Always run diff against curated data.ts after generation
  function loadArray(tsPath, isDataTs = false) {
    let s = fs.readFileSync(tsPath, "utf8");
    if (isDataTs) {
      // strip line comments
      s = s.replace(/\/\/.*$/mg, "");
      // drop trailing TS type exports if present
      s = s.replace(/export type[\s\S]*/, "");
    }
    // normalize export for eval
    s = s.replace(/export const rawCountryData\s*=\s*/, "var rawCountryData = ");
    s = s.replace(/\] as const;?\s*$/, "];\n");
    const ctx = {};
    vm.createContext(ctx);
    vm.runInContext(s, ctx, { filename: tsPath });
    return ctx.rawCountryData;
  }

  function toMap(arr) {
    const m = new Map();
    for (const t of arr) {
      const [iso2, dialCode, priority = 0, areaCodes = null, nationalPrefix = null] = t;
      m.set(iso2, { iso2, dialCode, priority, areaCodes: areaCodes ?? null, nationalPrefix: nationalPrefix ?? null });
    }
    return m;
  }

  function eqArr(a, b) {
    if (a === b) return true;
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function summarizeArrayChange(name, oldArr, newArr) {
    const oa = Array.isArray(oldArr) ? oldArr : [];
    const na = Array.isArray(newArr) ? newArr : [];
    const oSet = new Set(oa);
    const nSet = new Set(na);
    const added = na.filter((x) => !oSet.has(x));
    const removed = oa.filter((x) => !nSet.has(x));
    const header = `${name}: ${oldArr ? oa.length : "null"} items -> ${newArr ? na.length : "null"} items`;
    const limit = 12;
    const fmt = (arr) => {
      if (!arr.length) return "[]";
      if (arr.length <= limit) return `[${arr.map((s)=>JSON.stringify(s)).join(",")}]`;
      const head = arr.slice(0, limit - 2).map((s)=>JSON.stringify(s)).join(",");
      const tail = arr.slice(-2).map((s)=>JSON.stringify(s)).join(",");
      const more = arr.length - (limit);
      return `[${head},…${more} more… ,${tail}]`;
    };
    if (added.length === 0 && removed.length === 0 && Array.isArray(oldArr) && Array.isArray(newArr)) {
      // Order-only change
      return `${name}: reordered (${oa.length} items)`;
    }
    // For small diffs, show full arrays for readability
    if ((oa.length + na.length) <= 40 && (added.length + removed.length) <= 20) {
      return `${name}: ${JSON.stringify(oldArr)} -> ${JSON.stringify(newArr)}`;
    }
    const parts = [];
    if (added.length) parts.push(`New item(s): ${fmt(added)}`);
    if (removed.length) parts.push(`Removed item(s): ${fmt(removed)}`);
    return `${header}${parts.length ? ", " + parts.join(", ") : ""}`;
  }

  function runDiff() {
    const GEN_PATH = OUT_TS;
    const ORIG_PATH = CURATED_DATA_TS_PATH;
    if (!fs.existsSync(GEN_PATH)) {
      console.error("Missing generated file:", GEN_PATH);
      return;
    }
    if (!fs.existsSync(ORIG_PATH)) {
      console.error("Missing original file:", ORIG_PATH);
      return;
    }
    const gen = loadArray(GEN_PATH, false);
    const orig = loadArray(ORIG_PATH, true);
    const g = toMap(gen);
    const o = toMap(orig);
    const allIso2 = [...new Set([...g.keys(), ...o.keys()])].sort();
    const lines = [];
    let added = 0, removed = 0, changed = 0;
    for (const iso of allIso2) {
      const G = g.get(iso);
      const O = o.get(iso);
      if (!G) {
        removed++;
        lines.push(`- ${iso}: dial=${O.dialCode}, priority=${O.priority}, areaCodes=${JSON.stringify(O.areaCodes)}, nationalPrefix=${JSON.stringify(O.nationalPrefix)}`);
        continue;
      }
      if (!O) {
        added++;
        lines.push(`+ ${iso}: dial=${G.dialCode}, priority=${G.priority}, areaCodes=${JSON.stringify(G.areaCodes)}, nationalPrefix=${JSON.stringify(G.nationalPrefix)}`);
        continue;
      }
      const parts = [];
      if (G.dialCode !== O.dialCode) parts.push(`dial: ${O.dialCode} -> ${G.dialCode}`);
      if ((G.priority || 0) !== (O.priority || 0)) parts.push(`priority: ${O.priority || 0} -> ${G.priority || 0}`);
  if (!eqArr(G.areaCodes, O.areaCodes)) parts.push(summarizeArrayChange("areaCodes", O.areaCodes, G.areaCodes));
      if ((G.nationalPrefix || null) !== (O.nationalPrefix || null)) parts.push(`nationalPrefix: ${JSON.stringify(O.nationalPrefix || null)} -> ${JSON.stringify(G.nationalPrefix || null)}`);
      if (parts.length) {
        changed++;
        lines.push(`~ ${iso}: ${parts.join(", ")}`);
      }
    }
    const out = [`# Summary: +${added} added, ~${changed} changed, -${removed} removed`, ...(lines.length ? lines : [])].join("\n");
    console.log(out);
    // Write to tmp file
    const outDir = path.resolve(REPO_ROOT, "tmp");
    try { fs.mkdirSync(outDir, { recursive: true }); } catch { /* ignore */ }
    fs.writeFileSync(path.join(outDir, "rawCountryData.diff.txt"), out + "\n", "utf8");
    if (added || removed || changed) {
      // Exit with non-zero to signal differences (suitable for CI failure)
      process.exit(1);
    }
  }

  runDiff();

  // iso2 list is sourced from iso2-codes.js; we never write it from this script
}

try {
  main();
} catch (e) {
  console.error("Generation failed:", e && e.stack ? e.stack : e);
  process.exit(1);
}
