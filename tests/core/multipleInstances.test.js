/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getCountryListLength,
  checkFlagSelected,
  openDropdownSelectCountryAsync,
  clickSelectedCountryAsync,
  isDropdownOpen,
} = require("../helpers/helpers");

describe("multiple instances", () => {
  let user, iti1, iti2, input1, container1, container2;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti: iti1, input: input1, container: container1 } = initPlugin({
      options: { onlyCountries: ["af", "cn"] },
    }));
    ({ iti: iti2, container: container2 } = initPlugin({
      options: { onlyCountries: ["al", "cn", "kr", "ru"] },
    }));
  });

  afterEach(() => {
    teardown(iti1);
    teardown(iti2);
  });

  test("instances have different country lists", () => {
    expect(getCountryListLength(container1)).toEqual(2);
    expect(getCountryListLength(container2)).toEqual(4);
  });

  test("selecting a country in the first instance dropdown only updates the selected country for that instance", async () => {
    await openDropdownSelectCountryAsync(container1, "cn", user);

    expect(checkFlagSelected(container1, "cn")).toBe(true);
    expect(checkFlagSelected(container2, "")).toBe(true);
  });

  test("typing an intl number in the first instance input only updates the selected country for that instance", async () => {
    await user.type(input1, "+86123456");

    expect(checkFlagSelected(container1, "cn")).toBe(true);
    expect(checkFlagSelected(container2, "")).toBe(true);
  });

  describe("clicking open dropdown on the first instance", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container1, user);
    });

    test("only opens the dropdown on that instance", () => {
      expect(isDropdownOpen(container1)).toBe(true);
      expect(isDropdownOpen(container2)).toBe(false);
    });

    test("then clicking open dropdown on the second instance will close the first and open the second", async () => {
      await clickSelectedCountryAsync(container2, user);

      expect(isDropdownOpen(container1)).toBe(false);
      expect(isDropdownOpen(container2)).toBe(true);
    });
  });
});
