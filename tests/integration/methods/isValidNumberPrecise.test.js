/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, openDropdownSelectCountryAsync, intlTelInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("isValidNumberPrecise", () => {
  describe("vanilla", () => {
    let iti, input, user, utilsBackup;

    beforeEach(() => {
      ({ iti, input } = initPlugin());
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

    test("utils missing -> null", async () => {
      intlTelInput.utils = null;
      await user.type(input, "+44 7733 123456");
      expect(iti.isValidNumberPrecise()).toBeNull();
    });
  });

  describe("nationalMode true", () => {
    let iti, input, user, container;
    const options = { nationalMode: true };

    beforeEach(() => {
      ({ iti, input, container } = initPlugin({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("no country selected", async () => {
      await user.type(input, "07733 123456");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("wrong country selected", async () => {
      await openDropdownSelectCountryAsync(container, "us", user, input);
      await user.type(input, "07733 123456"); // gb number
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("correct country selected, valid number", async () => {
      await openDropdownSelectCountryAsync(container, "gb", user, input);
      await user.type(input, "07733 123456");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("correct country selected, number too short", async () => {
      await openDropdownSelectCountryAsync(container, "gb", user, input);
      await user.type(input, "07733 123");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });
});
