/**
 * @vitest-environment jsdom
 */
import {
  initIntlTelInput,
  teardown,
  isDropdownOpen,
  selectCountryAsync,
  clickSelectedCountryAsync,
} from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("dropdownAlwaysOpen option", () => {
  let iti, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container } = initIntlTelInput({ options: { dropdownAlwaysOpen: true } }));
  });

  afterEach(() => teardown(iti));

  test("dropdown is open on init", () => {
    expect(isDropdownOpen(container)).toBe(true);
  });

  test("selecting a country does not close the dropdown", async () => {
    await selectCountryAsync(container, "gb", user);
    expect(isDropdownOpen(container)).toBe(true);
  });

  test("clicking selected country does not close the dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(true);
  });
});
