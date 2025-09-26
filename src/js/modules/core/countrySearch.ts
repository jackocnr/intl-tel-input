// * Country search & ranking logic extracted from intl-tel-input.ts
// * Maintains original comments/order. Pure functions for reuse & testability.

import type { Country } from "../../intl-tel-input/data";
import { normaliseString } from "../utils/string";

/**
 * Country search: Given raw query, return ordered list of countries by priority buckets.
 * Buckets (in order):
 *  1. exact ISO2 matches
 *  2. name starts with
 *  3. name contains
 *  4. dial code exact match (bare or with plus)
 *  5. dial code contains (with plus form)
 *  6. initials match
 * Each bucket preserves country.priority ordering.
 */
export const getMatchedCountries = (
  countries: Country[],
  query: string,
): Country[] => {
  const normalisedQuery = normaliseString(query);
  // search result groups, in order of priority
  // first, exact ISO2 matches, then name starts with, then name contains, dial code match etc.
  const iso2Matches: Country[] = [];
  const nameStartWith: Country[] = [];
  const nameContains: Country[] = [];
  const dialCodeMatches: Country[] = [];
  const dialCodeContains: Country[] = [];
  const initialsMatches: Country[] = [];

  for (const c of countries) {
    if (c.iso2 === normalisedQuery) {
      iso2Matches.push(c);
    } else if (c.normalisedName.startsWith(normalisedQuery)) {
      nameStartWith.push(c);
    } else if (c.normalisedName.includes(normalisedQuery)) {
      nameContains.push(c);
    } else if (
      normalisedQuery === c.dialCode ||
      normalisedQuery === c.dialCodePlus
    ) {
      dialCodeMatches.push(c);
    } else if (c.dialCodePlus.includes(normalisedQuery)) {
      dialCodeContains.push(c);
    } else if (c.initials.includes(normalisedQuery)) {
      initialsMatches.push(c);
    }
  }

  // Combine result groups in correct order (and respect country priority order within each group e.g. if search +44, then UK appears first above Guernsey etc)
  const sortByPriority = (a: Country, b: Country) => a.priority - b.priority;
  return [
    ...iso2Matches.sort(sortByPriority),
    ...nameStartWith.sort(sortByPriority),
    ...nameContains.sort(sortByPriority),
    ...dialCodeMatches.sort(sortByPriority),
    ...dialCodeContains.sort(sortByPriority),
    ...initialsMatches.sort(sortByPriority),
  ];
};

/**
 * Hidden search (when countrySearch disabled): find first whose name starts with query (case-insensitive).
 */
export const findFirstCountryStartingWith = (
  countries: Country[],
  query: string,
): Country | null => {
  const lowerQuery = query.toLowerCase();
  for (const c of countries) {
    const lowerName = c.name.toLowerCase();
    if (lowerName.startsWith(lowerQuery)) {
      return c;
    }
  }
  return null;
};
