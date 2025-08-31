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
} = require("../helpers/helpers");

describe("setDisabled method", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initPlugin());
    iti.setDisabled(true);
  });

  afterEach(() => {
    teardown(iti);
  });

  test("disables the input", async () => {
    expect(input.disabled).toBe(true);
  });

  test("disables clicking selected country to open dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(false);
  });

  test("disables focusing the selected country", async () => {
    await user.keyboard("{Tab}");
    const selectedCountryButton = getSelectedCountryButton(container);
    expect(selectedCountryButton).not.toHaveFocus();
  });

  describe("then calling setDisabled(false)", () => {
    beforeEach(() => {
      iti.setDisabled(false);
    });

    test("re-enables the input field", async () => {
      expect(input.disabled).toBe(false);
    });

    test("re-enables clicking selected flag to open dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isDropdownOpen(container)).toBe(true);
    });

    test("re-enables focusing the selected country", async () => {
      await user.keyboard("{Tab}");
      const selectedCountryButton = getSelectedCountryButton(container);
      expect(selectedCountryButton).toHaveFocus();
    });
  });
});