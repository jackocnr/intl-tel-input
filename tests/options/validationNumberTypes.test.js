/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

// validationNumberTypes: restrict validation to MOBILE by default; when expanded, landlines pass.
describe("validationNumberTypes option", () => {
  describe("default MOBILE only", () => {
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

    test("GB landline invalid", async () => {
      await user.type(input, "+441512345678"); // Liverpool landline (should be FIXED_LINE)
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });

  describe("allow MOBILE + FIXED_LINE", () => {
    let iti, input, user;

    beforeEach(() => {
      const options = {
        initialCountry: "gb",
        validationNumberTypes: ["MOBILE", "FIXED_LINE"],
      };
      ({ iti, input } = initPlugin({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("GB mobile valid", async () => {
      await user.type(input, "+447400123456");
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("GB landline valid", async () => {
      await user.type(input, "+441512345678"); // Liverpool landline (should be FIXED_LINE)
      expect(iti.isValidNumberPrecise()).toBe(true);
    });
  });
});
