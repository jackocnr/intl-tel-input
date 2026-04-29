/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  initIntlTelInput,
  teardown,
  clickSelectedCountryAsync,
  isDropdownOpen,
} from "../helpers/helpers";

describe("setReadonly method", () => {
  let iti, user, container, input;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, container, input } = initIntlTelInput());
    iti.setReadonly(true);
  });

  afterEach(() => teardown(iti));

  test("makes the input readonly", () => {
    expect(input.readOnly).toBe(true);
  });

  test("disables clicking selected country to open dropdown", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(isDropdownOpen(container)).toBe(false);
  });

  describe("then calling setReadonly(false)", () => {
    beforeEach(() => {
      iti.setReadonly(false);
    });

    test("removes readonly from the input", () => {
      expect(input.readOnly).toBe(false);
    });

    test("re-enables clicking selected country to open dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isDropdownOpen(container)).toBe(true);
    });
  });
});
