/**
 * @vitest-environment node
 */

import {
  processAllCountries,
  generateCountryNames,
  processDialCodes,
  sortCountries,
} from "../../../src/js/data/country-data.ts";
import allCountries from "../../../src/js/data.ts";

describe("data/country-data processAllCountries", () => {
  test("onlyCountries filters list", () => {
    const out = processAllCountries({ onlyCountries: ["us"], excludeCountries: [], i18n: {} });
    expect(out.every(c => c.iso2 === "us")).toBe(true);
  });

  test("excludeCountries removes those entries", () => {
    const out = processAllCountries({ onlyCountries: [], excludeCountries: ["us"], i18n: {} });
    expect(out.find(c => c.iso2 === "us")).toBeUndefined();
  });

  test("no filters returns allCountries ref", () => {
    const out = processAllCountries({ onlyCountries: [], excludeCountries: [], i18n: {} });
    expect(out.length).toBe(allCountries.length);
  });
});

describe("data integrity", () => {
  test("every country has iso2 (2 lowercase letters) and a dialCode", () => {
    for (const c of allCountries) {
      expect(c.iso2).toMatch(/^[a-z]{2}$/);
      expect(typeof c.dialCode).toBe("string");
      expect(c.dialCode.length).toBeGreaterThan(0);
      expect(c.dialCode).toMatch(/^\d+$/);
    }
  });

  test("iso2 codes are unique across all countries", () => {
    const seen = new Set();
    for (const c of allCountries) {
      expect(seen.has(c.iso2)).toBe(false);
      seen.add(c.iso2);
    }
  });

  test("raw data has name field (populated at runtime by generateCountryNames)", () => {
    for (const c of allCountries) {
      expect(typeof c.name).toBe("string");
    }
  });
});

describe("data/country-data processDialCodes", () => {
  test("creates dial code map and length", () => {
    const sample = allCountries.slice(0, 5);
    const { dialCodes, dialCodeMaxLength, dialCodeToIso2Map } = processDialCodes(sample, { onlyCountries: [], excludeCountries: [] });
    expect(dialCodes.size).toBeGreaterThan(0);
    expect(dialCodeMaxLength).toBeGreaterThan(0);
    expect(Object.keys(dialCodeToIso2Map).length).toBeGreaterThan(0);
  });
});

describe("data/country-data sortCountries", () => {
  test("countryOrder enforces ordering", () => {
    const sample = allCountries.slice(0, 3).map(c => ({ ...c }));
    const order = sample.map(c => c.iso2).reverse();
    sortCountries(sample, { countryOrder: order });
    expect(sample.map(c => c.iso2)).toEqual(order);
  });
});

describe("data/country-data generateCountryNames", () => {
  test("uses Intl.DisplayNames with countryNameLocale", () => {
    // Pull out US for this test.
    const sample = [{ ...allCountries.find(c => c.iso2 === "us") }];
    generateCountryNames(sample, { countryNameLocale: "fr", countryNameOverrides: {} });
    // In French, US is "États-Unis".
    expect(sample[0].name).toBe("États-Unis");
  });

  test("countryNameOverrides overrides DisplayNames", () => {
    // Pull out France for this test.
    const sample = [{ ...allCountries.find(c => c.iso2 === "fr") }];
    // In English, France is "France", but we will override it.
    generateCountryNames(sample, {
      countryNameLocale: "en",
      countryNameOverrides: { fr: "République Française" },
    });
    expect(sample[0].name).toBe("République Française");
  });
});
