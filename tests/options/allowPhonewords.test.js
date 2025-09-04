/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");


describe("allowPhonewords option", () => {
  describe("allowPhonewords=false", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options: { allowPhonewords: false } }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("even a valid phoneword number fails (FLOWERS -> 3569377)", async () => {
      await user.type(input, "+1 702 FLOWERS");
      expect(iti.isValidNumber()).toBe(false);
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });

  describe("allowPhonewords=true", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options: { allowPhonewords: true } }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("valid phoneword number passes (FLOWERS -> 3569377)", async () => {
      await user.type(input, "+1 702 FLOWERS");
      expect(iti.isValidNumber()).toBe(true);
      expect(iti.isValidNumberPrecise()).toBe(true);
    });

    test("invalid phoneword fails (WRONGWORD)", async () => {
      await user.type(input, "+1 702 WRONGWORD");
      expect(iti.isValidNumber()).toBe(false);
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });
});
