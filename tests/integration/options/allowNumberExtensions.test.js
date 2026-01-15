/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("allowNumberExtensions option", () => {
  const base = "+17024181234";
  const ext = "98765";
  const withExt = `${base} ext. ${ext}`;

  describe("allowNumberExtensions=false", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options: { allowNumberExtensions: false } }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("valid number with extension fails validation", async () => {
      await user.type(input, withExt);
      expect(iti.isValidNumber()).toBe(false);
      expect(iti.isValidNumberPrecise()).toBe(false);
    });
  });

  describe("allowNumberExtensions=true", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options: { allowNumberExtensions: true } }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("valid number with extension passes validation", async () => {
      await user.type(input, withExt);
      expect(iti.isValidNumber()).toBe(true);
      expect(iti.isValidNumberPrecise()).toBe(true);
    });
  });
});
