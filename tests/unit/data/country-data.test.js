/**
 * @vitest-environment node
 */

import {
  processAllCountries,
  generateCountryNames,
  processDialCodes,
  sortCountries,
} from "../../../packages/core/src/js/data/country-data.ts";
import allCountries from "../../../packages/core/src/js/data.ts";

describe("data/country-data processAllCountries", () => {
  test("onlyCountries filters list", () => {
    const out = processAllCountries({ onlyCountries: ["us"], excludeCountries: [], uiTranslations: {} });
    expect(out.every(c => c.iso2 === "us")).toBe(true);
  });

  test("excludeCountries removes those entries", () => {
    const out = processAllCountries({ onlyCountries: [], excludeCountries: ["us"], uiTranslations: {} });
    expect(out.find(c => c.iso2 === "us")).toBeUndefined();
  });

  test("no filters returns allCountries ref", () => {
    const out = processAllCountries({ onlyCountries: [], excludeCountries: [], uiTranslations: {} });
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

  test("uiTranslations.countryNames takes precedence over DisplayNames", () => {
    const sample = [{ ...allCountries.find(c => c.iso2 === "de") }];
    // countryNameLocale is English (would give "Germany"), but the active
    // locale bundles its own translated names — those must win. This is the
    // fallback for browsers whose Intl.DisplayNames lacks region data.
    generateCountryNames(sample, {
      countryNameLocale: "en",
      countryNameOverrides: {},
      uiTranslations: { countryNames: { de: "Njemačka" } },
    });
    expect(sample[0].name).toBe("Njemačka");
  });

  test("countryNameOverrides beats uiTranslations.countryNames", () => {
    const sample = [{ ...allCountries.find(c => c.iso2 === "de") }];
    generateCountryNames(sample, {
      countryNameLocale: "en",
      countryNameOverrides: { de: "MY OVERRIDE" },
      uiTranslations: { countryNames: { de: "Njemačka" } },
    });
    expect(sample[0].name).toBe("MY OVERRIDE");
  });
});

describe("data/country-data bundled fallback locales", () => {
  // Locales whose region display names are missing from some browsers'
  // Intl.DisplayNames data (e.g. Chrome desktop), so we bundle translated
  // country names with them. See scripts/generate-country-names.js.
  const FALLBACK_LOCALES = ["bs", "hy", "is", "mk", "sq", "uz"];

  test.each(FALLBACK_LOCALES)("locale %s bundles countryNames for every country", async (locale) => {
    const mod = await import(`../../../packages/core/src/js/locale/${locale}.ts`);
    const { countryNames } = mod.default;
    expect(countryNames).toBeTruthy();
    for (const c of allCountries) {
      expect(typeof countryNames[c.iso2]).toBe("string");
      expect(countryNames[c.iso2].length).toBeGreaterThan(0);
    }
  });

  test("bundled names are actually applied end-to-end via the locale module", async () => {
    const bs = (await import("../../../packages/core/src/js/locale/bs.ts")).default;
    const sample = [{ ...allCountries.find(c => c.iso2 === "de") }];
    // Even with the default English countryNameLocale, importing the Bosnian
    // locale yields Bosnian country names.
    generateCountryNames(sample, {
      countryNameLocale: "en",
      countryNameOverrides: {},
      uiTranslations: bs,
    });
    expect(sample[0].name).toBe("Njemačka");
  });
});
