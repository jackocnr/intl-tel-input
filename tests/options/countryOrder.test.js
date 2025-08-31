/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, getCountriesInList } = require("../helpers/helpers");

// countryOrder: ensure specified order is applied before default name sort.
describe("countryOrder option", () => {
  let iti, container;

  beforeEach(() => {
    const options = { onlyCountries: ["us", "gb", "ca", "fr"], countryOrder: ["fr", "ca"] };
    ({ iti, container } = initPlugin({ options }));
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
