/**
 * @jest-environment jsdom
 */
const {
  initPlugin,
  teardown,
  getCountryListElement,
  checkFlagSelected,
  getArrowElement,
  clickSelectedCountryAsync,
  isDropdownOpen,
  getDropdownElement,
  getSelectedCountryButton,
} = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("allowDropdown option", () => {
  describe("allowDropdown=false", () => {
    let iti, container, input, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { allowDropdown: false };
      ({ iti, container, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("hides arrow", async () => {
      expect(getArrowElement(container)).toBeFalsy();
    });

    test("hides country list", async () => {
      expect(getCountryListElement(container)).toBeFalsy();
    });

    test("does not add role=combobox", async () => {
      expect(getSelectedCountryButton(container).getAttribute("role")).toBeNull();
    });

    test("clicking selected flag does not show dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(getDropdownElement(container)).toBeFalsy();
    });

    test("still updates flag when typing", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("allowDropdown=true", () => {
    let iti, container, input, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { allowDropdown: true };
      ({ iti, container, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("shows arrow", async () => {
      expect(getArrowElement(container)).toBeTruthy();
    });

    test("shows country list", async () => {
      expect(getCountryListElement(container)).toBeTruthy();
    });

    test("adds aria-haspopup=dialog", async () => {
      expect(getSelectedCountryButton(container).getAttribute("aria-haspopup")).toBe("dialog");
    });

    test("updates flag when typing", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    test("clicking selected flag shows dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isDropdownOpen(container)).toBeTruthy();
    });
  });
});
