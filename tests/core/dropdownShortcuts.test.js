/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getSelectedCountryButton,
  getDropdownDiv,
  clickSelectedCountry,
  checkFlagSelected,
  getHighlightedItemCode,
} = require("../helpers/helpers");

let iti, input, user, container;

describe("dropdown shortcuts", () => {
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

    test("dropdown is not already open", async () => {
      expect(getDropdownDiv(container)).toHaveClass("iti__hide");
    });

    test("pressing UP opens the dropdown", async () => {
      await user.keyboard("{ArrowUp}");
      expect(getDropdownDiv(container)).not.toHaveClass("iti__hide");
    });

    test("pressing DOWN opens the dropdown", async () => {
      await user.keyboard("{ArrowDown}");
      expect(getDropdownDiv(container)).not.toHaveClass("iti__hide");
    });

    test("pressing SPACE opens the dropdown", async () => {
      await user.keyboard(" ");
      expect(getDropdownDiv(container)).not.toHaveClass("iti__hide");
    });

    test("pressing ENTER opens the dropdown", async () => {
      await user.keyboard("{Enter}");
      expect(getDropdownDiv(container)).not.toHaveClass("iti__hide");
    });
  });

  describe("clicking the selected country", () => {
    beforeEach(async () => {
      await clickSelectedCountry(container, user);
    });

    test("shows the dropdown and highlights the first country in the list", async () => {
      expect(getDropdownDiv(container)).not.toHaveClass("iti__hide");
      expect(getHighlightedItemCode(container)).toEqual("af");
    });

    test("pressing ESCAPE closes the dropdown", async () => {
      await user.keyboard("{Escape}");
      expect(getDropdownDiv(container)).toHaveClass("iti__hide");
    });

    test("pressing TAB closes the dropdown and focuses the input", async () => {
      await user.keyboard("{Tab}");
      expect(getDropdownDiv(container)).toHaveClass("iti__hide");
      expect(input).toHaveFocus();
    });

    test("pressing ENTER closes the dropdown and updates the selected country", async () => {
      await user.keyboard("{Enter}");
      expect(getDropdownDiv(container)).toHaveClass("iti__hide");
      expect(checkFlagSelected(container, "af")).toBeTruthy();
    });

    test("pressing UP highlights the country at the very end of the list", async () => {
      await user.keyboard("{ArrowUp}");
      expect(getHighlightedItemCode(container)).toEqual("ax");
    });

    describe("pressing DOWN", () => {
      beforeEach(async () => {
        await user.keyboard("{ArrowDown}");
      });

      test("highlights the next country in the list", async () => {
        expect(getHighlightedItemCode(container)).toEqual("al");
      });

      test("pressing ENTER closes the dropdown and updates the selected country", async () => {
        await user.keyboard("{Enter}");
        expect(getDropdownDiv(container)).toHaveClass("iti__hide");
        expect(checkFlagSelected(container, "al")).toBeTruthy();
      });
    });
  });
});
