/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("regionless (non-geographic) dial codes", () => {
  const regionlessNumber = "+80012345678";

  describe("formatting with nationalMode=true + formatOnDisplay=true", () => {
    let iti, input;

    beforeEach(() => {
      const options = { nationalMode: true, formatOnDisplay: true };
      ({ iti, input } = initIntlTelInput({ inputValue: regionlessNumber, options }));
    });

    afterEach(() => teardown(iti));

    test("regionless numbers are formatted as international", () => {
      // should remain international (start with +800)
      expect(input.value).toMatch(/^\+800/);
    });
  });

  describe("validation, with allowedNumberTypes=[TOLL_FREE]", () => {
    let iti, input, user;

    beforeEach(() => {
      const options = { allowedNumberTypes: ["TOLL_FREE"], separateDialCode: false };
      ({ iti, input } = initIntlTelInput({ options }));
      user = userEvent.setup();
    });

    afterEach(() => {
      teardown(iti);
    });

    test("isValidNumber returns true for regionless number", async () => {
      await user.type(input, regionlessNumber);
      expect(iti.isValidNumber()).toBe(true);
    });

    test("isValidNumberPrecise returns true for regionless number", async () => {
      await user.type(input, regionlessNumber);
      expect(iti.isValidNumberPrecise()).toBe(true);
    });
  });
});
