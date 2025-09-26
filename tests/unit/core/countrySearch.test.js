/**
 * @jest-environment node
 */

const { getMatchedCountries, findFirstCountryStartingWith } = require("../../../src/js/modules/core/countrySearch.ts");

// helper to make a Country-like object
const makeCountry = (overrides) => ({
  iso2: "aa",
  dialCode: "1",
  priority: 0,
  areaCodes: null,
  nationalPrefix: null,
  name: "",
  nodeById: {},
  ...overrides,
});

const countries = [
  makeCountry({
    iso2: "gb",
    dialCode: "44",
    priority: 0,
    name: "United Kingdom",
    normalisedName: "united kingdom",
    dialCodePlus: "+44",
    initials: "uk",
  }),
  makeCountry({
    iso2: "gg",
    dialCode: "44",
    priority: 1,
    name: "Guernsey",
    normalisedName: "guernsey",
    dialCodePlus: "+44",
    initials: "g",
  }),
  makeCountry({
    iso2: "us",
    dialCode: "1",
    priority: 0,
    name: "United States",
    normalisedName: "united states",
    dialCodePlus: "+1",
    initials: "us",
  }),
  makeCountry({
    iso2: "ua",
    dialCode: "380",
    priority: 0,
    name: "Ukraine",
    normalisedName: "ukraine",
    dialCodePlus: "+380",
    initials: "u",
  }),
];

describe("countrySearch getMatchedCountries", () => {
  test("ISO2 exact match wins over others", () => {
    const result = getMatchedCountries(countries, "gb");
    expect(result[0].iso2).toBe("gb");
  });

  test("name starts-with beats name contains", () => {
    const result = getMatchedCountries(countries, "united k");
    expect(result[0].iso2).toBe("gb");
    expect(result.find(c => c.iso2 === "us")).toBeUndefined();
  });

  test("dial code exact (+ or bare) bucket ordering respected", () => {
    const resultBare = getMatchedCountries(countries, "44");
    expect(resultBare[0].iso2).toBe("gb");
    expect(resultBare[1].iso2).toBe("gg");

    const resultPlus = getMatchedCountries(countries, "+44");
    expect(resultPlus[0].iso2).toBe("gb");
    expect(resultPlus[1].iso2).toBe("gg");
  });

  test("dial code contains bucket after exact dial code", () => {
    const result = getMatchedCountries(countries, "+3");
    const uaIndex = result.findIndex(c => c.iso2 === "ua");
    expect(uaIndex).toBeGreaterThanOrEqual(0);
  });

  test("initials bucket last (presence)", () => {
    const result = getMatchedCountries(countries, "uk"); // initials match for GB
    expect(result.some(c => c.iso2 === "gb")).toBe(true);
  });
});

describe("countrySearch findFirstCountryStartingWith", () => {
  test("finds first alphabetical match by original order", () => {
    const result = findFirstCountryStartingWith(countries, "uni");
    expect(result?.iso2).toBe("gb");
  });

  test("returns null when no match", () => {
    const result = findFirstCountryStartingWith(countries, "zzz");
    expect(result).toBeNull();
  });
});
