/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, intlTelInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");
const numberFormat = intlTelInput.utils.numberFormat;

describe("getNumber method", () => {
  describe("initial value US number", () => {
    let iti;

    beforeEach(() => {
      ({ iti } = initPlugin({ inputValue: "+17024181234" }));
    });

    afterEach(() => teardown(iti));

    test("default getNumber returns E.164", () => {
      expect(iti.getNumber()).toEqual("+17024181234");
    });

    test("INTERNATIONAL format", async () => {
      expect(iti.getNumber(numberFormat.INTERNATIONAL)).toEqual("+1 702-418-1234");
    });

    test("NATIONAL format", async () => {
      expect(iti.getNumber(numberFormat.NATIONAL)).toEqual("(702) 418-1234");
    });
  });

  describe("typing numbers", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin());
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("American Samoa national -> full intl", async () => {
      iti.setCountry("as");
      await user.type(input, "6847331234");
      expect(iti.getNumber()).toEqual("+16847331234");
    });

    test("Anguilla intl formatted -> clean E.164", async () => {
      await user.type(input, "+1 264-235-1234");
      expect(iti.getNumber()).toEqual("+12642351234");
    });
  });
});
