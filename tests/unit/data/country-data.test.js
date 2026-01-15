/**
 * @jest-environment node
 */

const {
  processAllCountries,
  generateCountryNames,
  processDialCodes,
  sortCountries,
  cacheSearchTokens,
} = require("../../../src/js/modules/data/country-data.ts");
const allCountries = require("../../../src/js/intl-tel-input/data.ts").default;

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

describe("data/country-data processDialCodes", () => {
  test("creates dial code map and length", () => {
    const sample = allCountries.slice(0, 5);
    const { dialCodes, dialCodeMaxLen, dialCodeToIso2Map } = processDialCodes(sample, { onlyCountries: [], excludeCountries: [] });
    expect(dialCodes.size).toBeGreaterThan(0);
    expect(dialCodeMaxLen).toBeGreaterThan(0);
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

describe("data/country-data cacheSearchTokens", () => {
  test("adds normalisedName, initials and dialCodePlus", () => {
    const sample = allCountries.slice(0, 1).map(c => ({ ...c }));
    cacheSearchTokens(sample);
    const c = sample[0];
    expect(c.normalisedName).toBeDefined();
    expect(c.initials).toBeDefined();
    expect(c.dialCodePlus).toBe(`+${c.dialCode}`);
  });
});

describe("data/country-data generateCountryNames", () => {
  test("uses Intl.DisplayNames with countryNameLocale", () => {
    // Pull out US for this test.
    const sample = [{ ...allCountries.find(c => c.iso2 === "us") }];
    generateCountryNames(sample, { countryNameLocale: "fr", i18n: {} });
    // In French, US is "États-Unis".
    expect(sample[0].name).toBe("États-Unis");
  });

  test("i18n country name overrides DisplayNames", () => {
    // Pull out France for this test.
    const sample = [{ ...allCountries.find(c => c.iso2 === "fr") }];
    // In English, France is "France", but we will override it.
    generateCountryNames(sample, {
      countryNameLocale: "en",
      i18n: { fr: "République Française" },
    });
    expect(sample[0].name).toBe("République Française");
  });
});
