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
  getDropdownElement,
} = require("../helpers/helpers");

describe("using dropdown", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
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

  // these tests should be the opposite of the RTL ones below
  test("does not add dir attributes by default", () => {
    expect(container.getAttribute("dir")).toBe(null);
    const dropdownContent = getDropdownElement(container);
    expect(dropdownContent.getAttribute("dir")).toBe(null);
    const firstDialCode = dropdownContent.querySelector(".iti__dial-code");
    expect(firstDialCode.getAttribute("dir")).toBe(null);
  });
});

describe("with RTL context", () => {
  let iti, container;

  beforeEach(() => {
    document.body.setAttribute("dir", "rtl");
    ({ iti, container } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
    document.body.removeAttribute("dir");
  });

  test("does add dir attributes by default", () => {
    // we add dir=LTR to the container, dir=RTL to the dropdown, and dir=LTR on the dial codes in the country list
    expect(container.getAttribute("dir")).toBe("ltr");
    const dropdownContent = getDropdownElement(container);
    expect(dropdownContent.getAttribute("dir")).toBe("rtl");
    const firstDialCode = dropdownContent.querySelector(".iti__dial-code");
    expect(firstDialCode.getAttribute("dir")).toBe("ltr");
  });
});

describe("using dropdown: disabled input", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput({ disabled: true });
    ({ iti, container } = initPlugin({ input }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("prevents the user from opening the dropdown using the keyboard", async () => {
    await user.keyboard("{Tab}");
    const selectedCountry = getSelectedCountryButton(container);
    expect(selectedCountry).not.toHaveFocus();
  });

  test("clicking the selected flag does not open the dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(false);
  });
});