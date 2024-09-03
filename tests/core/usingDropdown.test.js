/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  clickSelectedCountryAsync,
  isDropdownOpen,
  getSelectedCountryButton,
  getHighlightedItemCode,
  selectCountryAsync,
  checkFlagSelected,
  injectInput,
} = require("../helpers/helpers");

let iti, user, container, input;

describe("using dropdown", () => {
  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initPlugin());
  });
      
  afterEach(() => {
    teardown(iti);
  });

  test("shows selected flag on left by default", () => {
    const countryContainer = container.querySelector(".iti__country-container");
    expect(countryContainer.style.left).toEqual("0px");
    expect(countryContainer.style.right).toEqual("");
  });

  describe("with rtl context", () => {
    let originalDir;

    beforeEach(() => {
      originalDir = container.ownerDocument.documentElement.dir;
      container.ownerDocument.documentElement.dir = "rtl";
      ({ iti, container, input } = initPlugin());
    });
        
    afterEach(() => {
      teardown(iti);
      container.ownerDocument.documentElement.dir = originalDir;
    });

    test("shows selected flag on right", () => {
      const countryContainer = container.querySelector(".iti__country-container");
      expect(countryContainer.style.left).toEqual("");
      expect(countryContainer.style.right).toEqual("0px");
    });
  });
  
  test("clicking the selected flag opens the dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(true);
  });
  
  test("allows focusing the selected country using the keyboard", async () => {
    await user.keyboard("{Tab}");
    const selectedCountry = getSelectedCountryButton(container);
    expect(selectedCountry).toHaveFocus();
  });

  describe("clicking the selected flag to open the dropdown", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container, user);
    });

    test("opens the dropdown with the top item highlighted", () => {
      expect(isDropdownOpen(container)).toBe(true);
      const highlightedItemCode = getHighlightedItemCode(container);
      expect(highlightedItemCode).toBe("af");
    });

    test("clicking it again closes the dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isDropdownOpen(container)).toBe(false);
    });

    test("clicking off closes the dropdown", async () => {
      await user.click(document.body);
      expect(isDropdownOpen(container)).toBe(false);
    });

    describe("selecting a new country item", () => {
      beforeEach(async () => {
        await selectCountryAsync(container, "ca", user);
      });

      test("updates the selected flag", () => {
        expect(checkFlagSelected(container, "ca")).toBe(true);
      });

      //* This was a bug.
      test("typing a space in the input doesn't reset to the default country for that dial code", async () => {
        expect(input).toHaveFocus();
        await user.keyboard(" ");
        expect(checkFlagSelected(container, "ca")).toBe(true);
      });
    });
  });
});

describe("using dropdown: disabled input", () => {
  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput({ disabled: true });
    ({ iti, container } = initPlugin({ input }));
  });
      
  afterEach(() => {
    teardown(iti);
  });

  it("prevents the user from opening the dropdown using the keyboard", async () => {
    await user.keyboard("{Tab}");
    const selectedCountry = getSelectedCountryButton(container);
    expect(selectedCountry).not.toHaveFocus();
  });

  it("clicking the selected flag does not open the dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(false);
  });
});