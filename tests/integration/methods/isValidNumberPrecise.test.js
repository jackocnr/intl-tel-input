/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, openAndSelectCountryAsync, intlTelInput } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("isValidNumberPrecise", () => {
  describe("vanilla", () => {
    let iti, input, user, utilsBackup;

    beforeEach(() => {
      ({ iti, input } = initIntlTelInput({ options: { separateDialCode: false, strictMode: false } }));
      user = userEvent.setup();
      utilsBackup = intlTelInput.utils;
    });

    afterEach(() => {
      teardown(iti);
      // restore intlTelInput.utils after setting it to null in one of the tests
      intlTelInput.utils = utilsBackup;
    });

    test("valid intl number", async () => {
      await user.type(input, "+44 7733 123456");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("too short", async () => {
      await user.type(input, "+44 7733 123");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("bad dial code", async () => {
      await user.type(input, "+44 9999 123456");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("utils missing -> throws", async () => {
      intlTelInput.utils = null;
      await user.type(input, "+44 7733 123456");
      expect(() => iti.isValidNumberPrecise()).toThrow();
    });
  });

  describe("numberDisplayFormat=NATIONAL", () => {
    let iti, input, user, container;
    const options = { numberDisplayFormat: "NATIONAL" };

    beforeEach(() => {
      ({ iti, input, container } = initIntlTelInput({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("no country selected", async () => {
      await user.type(input, "07733 123456");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("wrong country selected", async () => {
      await openAndSelectCountryAsync(container, "us", user, input);
      await user.type(input, "07733 123456"); // gb number
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("correct country selected, valid number", async () => {
      await openAndSelectCountryAsync(container, "gb", user, input);
      await user.type(input, "07733 123456");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("correct country selected, number too short", async () => {
      await openAndSelectCountryAsync(container, "gb", user, input);
      await user.type(input, "07733 123");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });
});
