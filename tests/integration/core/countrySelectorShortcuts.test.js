/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  initIntlTelInput,
  teardown,
  getSelectedCountryButton,
  isCountrySelectorOpen,
  clickSelectedCountryAsync,
  checkFlagSelected,
  getHighlightedItemCode,
} from "../helpers/helpers";

describe("country selector shortcuts", () => {
  let iti, input, user, container;
  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initIntlTelInput());
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
      expect(isCountrySelectorOpen(container)).toBe(false);
    });

    test("pressing UP opens the dropdown", async () => {
      await user.keyboard("{ArrowUp}");
      expect(isCountrySelectorOpen(container)).toBe(true);
    });

    test("pressing DOWN opens the dropdown", async () => {
      await user.keyboard("{ArrowDown}");
      expect(isCountrySelectorOpen(container)).toBe(true);
    });

    test("pressing SPACE opens the dropdown", async () => {
      await user.keyboard(" ");
      expect(isCountrySelectorOpen(container)).toBe(true);
    });

    test("pressing ENTER opens the dropdown", async () => {
      await user.keyboard("{Enter}");
      expect(isCountrySelectorOpen(container)).toBe(true);
    });
  });

  describe("clicking the selected country", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container, user);
    });

    test("shows the dropdown and highlights the first country in the list", () => {
      expect(isCountrySelectorOpen(container)).toBe(true);
      expect(getHighlightedItemCode(container)).toEqual("af");
    });

    test("pressing ESCAPE closes the dropdown", async () => {
      await user.keyboard("{Escape}");
      expect(isCountrySelectorOpen(container)).toBe(false);
    });

    test("pressing TAB closes the dropdown and focuses the input", async () => {
      await user.keyboard("{Tab}");
      expect(isCountrySelectorOpen(container)).toBe(false);
      expect(input).toHaveFocus();
    });

    test("pressing ENTER closes the dropdown and updates the selected country", async () => {
      await user.keyboard("{Enter}");
      expect(isCountrySelectorOpen(container)).toBe(false);
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
        expect(isCountrySelectorOpen(container)).toBe(false);
        expect(checkFlagSelected(container, "ax")).toBe(true);
      });
    });
  });
});
