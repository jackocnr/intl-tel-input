/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("allowedNumberTypes option", () => {
  describe("default MOBILE/FIXED_LINE only", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options: { initialCountry: "gb" } }));
      user = userEvent.setup();
    });
    afterEach(() => teardown(iti));

    test("GB mobile valid", async () => {
      await user.type(input, "+447400123456");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("GB landline valid", async () => {
      await user.type(input, "+441512345678");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("GB premium rate number invalid", async () => {
      await user.type(input, "+448701234567");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });

  describe("allow PREMIUM_RATE only", () => {
    let iti, input, user;

    beforeEach(() => {
      const options = {
        initialCountry: "gb",
        allowedNumberTypes: ["PREMIUM_RATE"],
      };
      ({ iti, input } = initPlugin({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("GB mobile invalid", async () => {
      await user.type(input, "+447400123456");
      expect(iti.isValidNumberPrecise()).toBe(false);
    });

    test("GB premium rate number valid", async () => {
      await user.type(input, "+448701234567");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });
  });
});
