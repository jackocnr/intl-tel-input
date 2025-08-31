/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getSelectedCountryButton,
  isDropdownOpen,
  clickSelectedCountryAsync,
  checkFlagSelected,
  getHighlightedItemCode,
} = require("../helpers/helpers");

describe("dropdown shortcuts", () => {
  let iti, input, user, container;
  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
  });

  describe("focusing the selected country", () => {
    beforeEach(async () => {
      const selectedCountry = await getSelectedCountryButton(container);
      selectedCountry.focus();
    });

    test("dropdown is not already open", () => {
      expect(isDropdownOpen(container)).toBe(false);
    });

    test("pressing UP opens the dropdown", async () => {
      await user.keyboard("{ArrowUp}");
      expect(isDropdownOpen(container)).toBe(true);
    });

    test("pressing DOWN opens the dropdown", async () => {
      await user.keyboard("{ArrowDown}");
      expect(isDropdownOpen(container)).toBe(true);
    });

    test("pressing SPACE opens the dropdown", async () => {
      await user.keyboard(" ");
      expect(isDropdownOpen(container)).toBe(true);
    });

    test("pressing ENTER opens the dropdown", async () => {
      await user.keyboard("{Enter}");
      expect(isDropdownOpen(container)).toBe(true);
    });
  });

  describe("clicking the selected country", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container, user);
    });

    test("shows the dropdown and highlights the first country in the list", () => {
      expect(isDropdownOpen(container)).toBe(true);
      expect(getHighlightedItemCode(container)).toEqual("af");
    });

    test("pressing ESCAPE closes the dropdown", async () => {
      await user.keyboard("{Escape}");
      expect(isDropdownOpen(container)).toBe(false);
    });

    test("pressing TAB closes the dropdown and focuses the input", async () => {
      await user.keyboard("{Tab}");
      expect(isDropdownOpen(container)).toBe(false);
      expect(input).toHaveFocus();
    });

    test("pressing ENTER closes the dropdown and updates the selected country", async () => {
      await user.keyboard("{Enter}");
      expect(isDropdownOpen(container)).toBe(false);
      expect(checkFlagSelected(container, "af")).toBe(true);
    });

    test("pressing UP highlights the country at the very end of the list", async () => {
      await user.keyboard("{ArrowUp}");
      expect(getHighlightedItemCode(container)).toEqual("zw");
    });

    describe("pressing DOWN", () => {
      beforeEach(async () => {
        await user.keyboard("{ArrowDown}");
      });

      test("highlights the next country in the list", () => {
        expect(getHighlightedItemCode(container)).toEqual("ax");
      });

      test("pressing ENTER closes the dropdown and updates the selected country", async () => {
        await user.keyboard("{Enter}");
        expect(isDropdownOpen(container)).toBe(false);
        expect(checkFlagSelected(container, "ax")).toBe(true);
      });
    });
  });
});
