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

let iti, user, container, input;

describe("using setDisabled method", () => {
  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initPlugin());
    iti.setDisabled(true);
  });

  afterEach(() => {
    teardown(iti);
  });

  test("disables the input field when setDisabled(true)", async () => {
    expect(input.disabled).toBe(true);
  });

  test("disables dropdown to open when setDisabled(true)", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(false);
  });

  test("enables the input field when setDisabled(true) to setDisabled(false)", async () => {
    iti.setDisabled(false);
    expect(input.disabled).toBe(false);
  });

  test("enables dropdown to open when setDisabled(true) to setDisabled(false)", async () => {
    iti.setDisabled(false);
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(true);
  });

  describe("dropdown shortcuts when using setDisabled method", () => {
    beforeEach(async () => {
      iti.setDisabled(true);
    });
  
    test("disables focusing the selected country when setDisabled(true)", async () => {
        await user.keyboard("{Tab}");
        const selectedCountry = getSelectedCountryButton(container);
        expect(selectedCountry).not.toHaveFocus();
    });

    test("enables focusing the selected country when setDisabled(true) to setDisabled(false)", async () => {
        iti.setDisabled(false); 
        await user.keyboard("{Tab}");
        const selectedCountry = getSelectedCountryButton(container);
        expect(selectedCountry).toHaveFocus();
    });
  });
});