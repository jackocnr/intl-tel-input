/**
 * @jest-environment jsdom
 */
const {
  initPlugin,
  teardown,
  getCountryListLength,
  checkFlagSelected,
  getCountriesInList,
} = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("onlyCountries option", () => {
  describe("restrict to japan, china and korea", () => {
    let iti, container;
    const only = ["jp", "cn", "kr"];

    beforeEach(() => {
      const options = { onlyCountries: only };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("list length equals onlyCountries length", () => {
      const len = getCountryListLength(container);
      expect(len).toEqual(only.length);
    });
  });

  describe("restrict to Afghanistan, Kazakhstan and Russia", () => {
    let iti, container, input, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { onlyCountries: ["af", "kz", "ru"] };
      ({ iti, input, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing +7 selects RU over KZ", async () => {
      await user.type(input, "+7");
      expect(checkFlagSelected(container, "ru")).toBe(true);
    });
  });

  describe("two instances different onlyCountries", () => {
    let iti, container, iti2, container2;

    beforeEach(() => {
      const options1 = { onlyCountries: ["jp"] };
      const options2 = { onlyCountries: ["kr"] };
      ({ iti, container } = initPlugin({ options: options1 }));
      ({ iti: iti2, container: container2 } = initPlugin({ options: options2 }));
    });

    afterEach(() => {
      teardown(iti);
      teardown(iti2);
    });

    test("each list has one country", () => {
      const countries1 = getCountriesInList(container);
      const countries2 = getCountriesInList(container2);
      expect(countries1.length).toEqual(1);
      expect(countries1).toEqual(["jp"]);
      expect(countries2.length).toEqual(1);
      expect(countries2).toEqual(["kr"]);
    });
  });
});
