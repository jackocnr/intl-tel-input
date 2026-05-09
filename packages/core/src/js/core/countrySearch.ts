// * Country search & ranking logic extracted from intlTelInput.ts
// * Maintains original comments/order. Pure functions for reuse & testability.

import type { Country, Iso2 } from "../data.js";
import { normaliseString } from "../helpers/string.js";

export interface SearchTokens {
  normalisedName: string;
  words: string[];
  initials: string;
  dialCodePlus: string;
}

export type SearchTokensMap = Map<Iso2, SearchTokens>;

//* Strip all non-letter chars (any script via \p{L}) so separators like "-", ".", "'", "&" all collapse to a single space.
//* Lets queries like "St Pierre" match "St. Pierre & Miquelon", "Sant Elena" match "Sant'Elena", etc., regardless of locale.
const normaliseName = (s: string): string =>
  normaliseString(s).replace(/[^\p{L}]+/gu, " ").trim();

//* Precompute country search tokens (normalised name, initials, +dialCode) to speed up filtering.
export const buildSearchTokens = (countries: Country[]): SearchTokensMap => {
  const tokens: SearchTokensMap = new Map();
  for (const c of countries) {
    const normalisedName = normaliseName(c.name);
    const words = normalisedName.split(" ").filter(Boolean);
    const initials = words.map((w) => w[0] || "").join("");
    tokens.set(c.iso2, {
      normalisedName,
      words,
      initials,
      dialCodePlus: `+${c.dialCode}`,
    });
  }
  return tokens;
};

/**
 * Country search: Given raw query, return ordered list of countries by priority buckets.
 * Buckets (in order):
 *  1. exact iso2 matches
 *  2. name starts with
 *  3. name contains
 *  4. dial code exact match (bare or with plus)
 *  5. dial code contains (with plus form)
 *  6. initials match
 *  7. word fallback: any query word is a prefix of some word in the name (only when query has 2+ words AND no name bucket hit)
 * Each bucket preserves country.priority ordering.
 */
export const getMatchedCountries = (
  countries: Country[],
  searchTokens: SearchTokensMap,
  query: string,
): Country[] => {
  //* lowerQuery preserves digits/+ for iso2/dial-code/initials checks; nameQuery strips non-letters for name matching.
  const lowerQuery = normaliseString(query);
  const nameQuery = normaliseName(query);
  //* Skip name buckets if the user typed only non-letters (e.g. "+44") — otherwise empty nameQuery would match everything.
  const skipNameBuckets = lowerQuery !== "" && nameQuery === "";

  // search result groups, in order of priority
  // first, exact iso2 matches, then name starts with, then name contains, dial code match etc.
  const iso2Matches: Country[] = [];
  const nameStartsWith: Country[] = [];
  const nameContains: Country[] = [];
  const dialCodeMatches: Country[] = [];
  const dialCodeContains: Country[] = [];
  const initialsMatches: Country[] = [];
  const wordMatches: Country[] = [];

  for (const c of countries) {
    const t = searchTokens.get(c.iso2)!;
    if (c.iso2 === lowerQuery) {
      iso2Matches.push(c);
    } else if (!skipNameBuckets && t.normalisedName.startsWith(nameQuery)) {
      nameStartsWith.push(c);
    } else if (!skipNameBuckets && t.normalisedName.includes(nameQuery)) {
      nameContains.push(c);
    } else if (
      lowerQuery === c.dialCode ||
      lowerQuery === t.dialCodePlus
    ) {
      dialCodeMatches.push(c);
    } else if (t.dialCodePlus.includes(lowerQuery)) {
      dialCodeContains.push(c);
    } else if (t.initials.includes(lowerQuery)) {
      initialsMatches.push(c);
    }
  }

  //* Per-word fallback for multi-word queries that hit no name bucket. A country qualifies when at least one
  //* query word is the *prefix of* some word in its name (not a mid-word substring) — so "Saint Hel" finds
  //* "St. Helena" via "helena", but does not surface "Seychelles" / "St. Barthélemy" where "hel" sits mid-word.
  const queryWords = nameQuery.split(" ").filter(Boolean);
  if (
    queryWords.length > 1 &&
    iso2Matches.length === 0 &&
    nameStartsWith.length === 0 &&
    nameContains.length === 0
  ) {
    const claimed = new Set<Iso2>([
      ...dialCodeMatches.map((c) => c.iso2),
      ...dialCodeContains.map((c) => c.iso2),
      ...initialsMatches.map((c) => c.iso2),
    ]);
    for (const c of countries) {
      if (claimed.has(c.iso2)) {
        continue;
      }
      const t = searchTokens.get(c.iso2)!;
      if (queryWords.some((qw) => t.words.some((sw) => sw.startsWith(qw)))) {
        wordMatches.push(c);
      }
    }
  }

  // Combine result groups in correct order (and respect country priority order within each group e.g. if search +44, then UK appears first above Guernsey etc)
  const sortByPriority = (a: Country, b: Country) => a.priority - b.priority;

  return [
    ...iso2Matches,
    ...nameStartsWith,
    ...nameContains,
    // priority sort is only relevant when showing multiple countries with the same dial code (that's what the priority field is used to distinguish between)
    ...dialCodeMatches.sort(sortByPriority),
    ...dialCodeContains.sort(sortByPriority),
    ...initialsMatches,
    ...wordMatches,
  ];
};

/**
 * Hidden search (when countrySearch disabled): find first country whose name starts with query (case-insensitive).
 */
export const findFirstCountryStartingWith = (
  countries: Country[],
  searchTokens: SearchTokensMap,
  query: string,
): Country | null => {
  const nameQuery = normaliseName(query);
  for (const c of countries) {
    const { normalisedName } = searchTokens.get(c.iso2)!;
    if (normalisedName.startsWith(nameQuery)) {
      return c;
    }
  }
  return null;
};
