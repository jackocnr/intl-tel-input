/**
 * @vitest-environment node
 */

import {
  getMatchedCountries,
  findFirstCountryStartingWith,
  buildSearchTokens,
} from "../../../packages/core/src/js/core/countrySearch.ts";

// helper to make a Country-like object
const makeCountry = (overrides) => ({
  iso2: "aa",
  dialCode: "1",
  priority: 0,
  areaCodes: null,
  nationalPrefix: null,
  name: "",
  ...overrides,
});

const countries = [
  makeCountry({ iso2: "gb", dialCode: "44", priority: 0, name: "United Kingdom" }),
  makeCountry({ iso2: "gg", dialCode: "44", priority: 1, name: "Guernsey" }),
  makeCountry({ iso2: "us", dialCode: "1", priority: 0, name: "United States" }),
  makeCountry({ iso2: "ua", dialCode: "380", priority: 0, name: "Ukraine" }),
  makeCountry({ iso2: "pm", dialCode: "508", priority: 0, name: "St. Pierre & Miquelon" }),
  makeCountry({ iso2: "lc", dialCode: "1", priority: 4, name: "St. Lucia" }),
  makeCountry({ iso2: "sh", dialCode: "290", priority: 0, name: "St. Helena" }),
  makeCountry({ iso2: "sc", dialCode: "248", priority: 0, name: "Seychelles" }),
  makeCountry({ iso2: "bl", dialCode: "590", priority: 1, name: "St. Barthélemy" }),
];

const tokens = buildSearchTokens(countries);

describe("countrySearch buildSearchTokens", () => {
  test("computes normalisedName, initials and dialCodePlus per country", () => {
    const t = tokens.get("gb");
    expect(t.normalisedName).toBe("united kingdom");
    expect(t.initials).toBe("uk");
    expect(t.dialCodePlus).toBe("+44");
  });

  test("strips punctuation and separators from name (periods, &, hyphens, apostrophes)", () => {
    expect(tokens.get("pm").normalisedName).toBe("st pierre miquelon");
    const hyphenated = buildSearchTokens([
      makeCountry({ iso2: "pm", dialCode: "508", name: "Saint-Pierre-et-Miquelon" }),
      makeCountry({ iso2: "sh", dialCode: "290", name: "Sant'Elena" }),
    ]);
    expect(hyphenated.get("pm").normalisedName).toBe("saint pierre et miquelon");
    expect(hyphenated.get("sh").normalisedName).toBe("sant elena");
  });
});

describe("countrySearch getMatchedCountries", () => {
  test("iso2 exact match wins over others", () => {
    const result = getMatchedCountries(countries, tokens, "gb");
    expect(result[0].iso2).toBe("gb");
  });

  test("name starts-with beats name contains", () => {
    const result = getMatchedCountries(countries, tokens, "united k");
    expect(result[0].iso2).toBe("gb");
    expect(result.find(c => c.iso2 === "us")).toBeUndefined();
  });

  test("dial code exact (+ or bare) bucket ordering respected", () => {
    const resultBare = getMatchedCountries(countries, tokens, "44");
    expect(resultBare[0].iso2).toBe("gb");
    expect(resultBare[1].iso2).toBe("gg");

    const resultPlus = getMatchedCountries(countries, tokens, "+44");
    expect(resultPlus[0].iso2).toBe("gb");
    expect(resultPlus[1].iso2).toBe("gg");
  });

  test("dial code contains bucket after exact dial code", () => {
    const result = getMatchedCountries(countries, tokens, "+3");
    const uaIndex = result.findIndex(c => c.iso2 === "ua");
    expect(uaIndex).toBeGreaterThanOrEqual(0);
  });

  test("initials bucket last (presence)", () => {
    const result = getMatchedCountries(countries, tokens, "uk"); // initials match for GB
    expect(result.some(c => c.iso2 === "gb")).toBe(true);
  });

  test("punctuation in stored name doesn't block matching (St. Pierre via 'St Pierre')", () => {
    const result = getMatchedCountries(countries, tokens, "St Pierre");
    expect(result[0].iso2).toBe("pm"); // top hit via nameStartsWith
  });

  test("punctuation in query doesn't block matching (St. Pierre via 'St. Pierre')", () => {
    const result = getMatchedCountries(countries, tokens, "St. Pierre");
    expect(result[0].iso2).toBe("pm");
  });

  test("hyphen-separated stored name matches space-separated query", () => {
    const frToks = buildSearchTokens([
      makeCountry({ iso2: "pm", dialCode: "508", name: "Saint-Pierre-et-Miquelon" }),
    ]);
    const result = getMatchedCountries(
      [makeCountry({ iso2: "pm", dialCode: "508", name: "Saint-Pierre-et-Miquelon" })],
      frToks,
      "Saint Pierre",
    );
    expect(result[0].iso2).toBe("pm");
  });

  test("per-word fallback finds 'Saint Pierre' in 'St. Pierre & Miquelon' via 'pierre'", () => {
    const result = getMatchedCountries(countries, tokens, "Saint Pierre");
    expect(result.map(c => c.iso2)).toContain("pm");
    // shouldn't surface unrelated saint countries that have neither "saint" nor "pierre" in the normalised name
    expect(result.map(c => c.iso2)).not.toContain("gb");
  });

  test("per-word fallback gated off when a higher bucket matches", () => {
    // "United Kingdom" hits nameStartsWith for GB; fallback must NOT add US/UAE-style noise
    const result = getMatchedCountries(countries, tokens, "United Kingdom");
    expect(result).toHaveLength(1);
    expect(result[0].iso2).toBe("gb");
  });

  test("per-word fallback only fires for multi-word queries", () => {
    // single word "saint" — name buckets fail (no country contains 'saint'), but fallback shouldn't
    // surface random matches; it requires 2+ words.
    const result = getMatchedCountries(countries, tokens, "saint");
    expect(result).toEqual([]);
  });

  test("non-letter-only query (e.g. '+44') still matches dial code, not all countries", () => {
    const result = getMatchedCountries(countries, tokens, "+44");
    expect(result.map(c => c.iso2)).toEqual(["gb", "gg"]);
  });

  test("per-word fallback only matches at start of words, not mid-word", () => {
    // "saint hel": "hel" is a prefix of "helena" (St. Helena), but mid-word in "seychelles" / "barthelemy".
    // Only St. Helena should match.
    const result = getMatchedCountries(countries, tokens, "saint hel");
    expect(result.map(c => c.iso2)).toEqual(["sh"]);
  });
});

describe("countrySearch findFirstCountryStartingWith", () => {
  test("finds first alphabetical match by original order", () => {
    const result = findFirstCountryStartingWith(countries, tokens, "uni");
    expect(result?.iso2).toBe("gb");
  });

  test("returns null when no match", () => {
    const result = findFirstCountryStartingWith(countries, tokens, "zzz");
    expect(result).toBeNull();
  });
});
