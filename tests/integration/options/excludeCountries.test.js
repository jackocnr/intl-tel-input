/**
 * @vitest-environment jsdom
 */
import { userEvent } from "@testing-library/user-event";
import { initIntlTelInput, teardown, getCountriesInList, totalCountries, checkFlagSelected } from "../helpers/helpers";

describe("excludeCountries option", () => {
  describe("none excluded", () => {
    let iti, container, user, input;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { excludeCountries: [], separateDialCode: false };
      ({ iti, container, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("has all countries, inc US and CA", () => {
      const countriesInList = getCountriesInList(container);
      expect(countriesInList.length).toBe(totalCountries);
      expect(countriesInList.includes("us")).toBe(true);
      expect(countriesInList.includes("ca")).toBe(true);
    });

    test("typing us dial code selects US", async () => {
      await user.type(input, "+1");
      expect(checkFlagSelected(container, "us")).toBe(true);
    });
  });

  describe("exclude us + ca", () => {
    let iti, container, user, input;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { excludeCountries: ["us", "ca"], separateDialCode: false };
      ({ iti, container, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("list excludes those countries", () => {
      const countriesInList = getCountriesInList(container);
      expect(countriesInList.length).toBe(totalCountries - 2);
      expect(countriesInList.includes("us")).toBe(false);
      expect(countriesInList.includes("ca")).toBe(false);
    });

    test("typing us dial code selects Dominican Republic", async () => {
      await user.type(input, "+1");
      expect(checkFlagSelected(container, "do")).toBe(true);
    });
  });
});
