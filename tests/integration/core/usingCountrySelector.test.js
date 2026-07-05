/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  initIntlTelInput,
  teardown,
  clickSelectedCountryAsync,
  isCountrySelectorOpen,
  getSelectedCountryButton,
  getHighlightedItemCode,
  selectCountryAsync,
  checkFlagSelected,
  injectInput,
  getCountrySelectorElement,
} from "../helpers/helpers";

describe("using country selector", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initIntlTelInput());
  });

  afterEach(() => {
    teardown(iti);
  });

  test("allows focusing the selected country using the keyboard", async () => {
    await user.keyboard("{Tab}");
    const selectedCountry = getSelectedCountryButton(container);
    expect(selectedCountry).toHaveFocus();
  });

  describe("clicking the selected flag to open the country selector", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container, user);
    });

    test("opens the dropdown with the top item highlighted", () => {
      expect(isCountrySelectorOpen(container)).toBe(true);
      const highlightedItemCode = getHighlightedItemCode(container);
      expect(highlightedItemCode).toBe("af");
    });

    test("clicking it again closes the dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isCountrySelectorOpen(container)).toBe(false);
    });

    test("clicking off closes the dropdown", async () => {
      await user.click(document.body);
      expect(isCountrySelectorOpen(container)).toBe(false);
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
    const dropdownContent = getCountrySelectorElement(container);
    expect(dropdownContent.getAttribute("dir")).toBe(null);
    const firstDialCode = dropdownContent.querySelector(".iti__dial-code");
    expect(firstDialCode.getAttribute("dir")).toBe(null);
  });
});

describe("with RTL context", () => {
  let iti, container;

  beforeEach(() => {
    document.body.setAttribute("dir", "rtl");
    ({ iti, container } = initIntlTelInput());
  });

  afterEach(() => {
    teardown(iti);
    document.body.removeAttribute("dir");
  });

  test("does not add dir attributes (RTL is handled via CSS logical properties)", () => {
    // RTL is handled entirely in CSS via logical properties (inset-inline-*, padding-inline-*,
    // margin-inline-*) plus unicode-bidi isolation on the dial codes — no dir attributes are set.
    expect(container.getAttribute("dir")).toBe(null);
    const dropdownContent = getCountrySelectorElement(container);
    expect(dropdownContent.getAttribute("dir")).toBe(null);
    const firstDialCode = dropdownContent.querySelector(".iti__dial-code");
    expect(firstDialCode.getAttribute("dir")).toBe(null);
  });
});

describe("using country selector: disabled input", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput({ disabled: true });
    ({ iti, container } = initIntlTelInput({ input }));
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
    expect(isCountrySelectorOpen(container)).toBe(false);
  });
});