/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, getCountriesInList } from "../helpers/helpers";

// countryOrder: ensure specified order is applied before default name sort.
describe("countryOrder option", () => {
  let iti, container;

  beforeEach(() => {
    const options = { onlyCountries: ["us", "gb", "ca", "fr"], countryOrder: ["fr", "ca"] };
    ({ iti, container } = initIntlTelInput({ options }));
  });

  afterEach(() => teardown(iti));

  test("puts ordered countries first and preserves relative order", () => {
    const list = getCountriesInList(container);
    expect(list.length).toBe(4);
    // first two should be fr then ca per countryOrder, rest keep default alpha (gb, us or us, gb depending on locale)
    expect(list[0]).toBe("fr");
    expect(list[1]).toBe("ca");
    expect(list[2]).toBe("gb");
    expect(list[3]).toBe("us");
  });
});

describe("countryOrder + excludeCountries", () => {
  let iti, container;

  beforeEach(() => {
    const options = { excludeCountries: ["fr"], countryOrder: ["us", "fr", "gb"] };
    ({ iti, container } = initIntlTelInput({ options }));
  });

  afterEach(() => teardown(iti));

  test("excluded country is not in list, even if in countryOrder", () => {
    const list = getCountriesInList(container);
    expect(list).not.toContain("fr");
    expect(list[0]).toBe("us");
    expect(list[1]).toBe("gb");
  });
});

describe("countryOrder with non-existent code", () => {
  let iti, container;

  beforeEach(() => {
    const options = { onlyCountries: ["us", "gb"], countryOrder: ["zz", "gb", "us"] };
    ({ iti, container } = initIntlTelInput({ options }));
  });

  afterEach(() => teardown(iti));

  test("unknown codes in countryOrder are ignored", () => {
    const list = getCountriesInList(container);
    expect(list.length).toBe(2);
    expect(list[0]).toBe("gb");
    expect(list[1]).toBe("us");
  });
});
