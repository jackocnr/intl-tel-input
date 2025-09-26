/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, checkFlagSelected, intlTelInput } = require("../helpers/helpers");

describe("setNumber method", () => {
  describe("no utils", () => {
    let iti, input, container, utilsBackup;

    beforeEach(() => {
      ({ iti, input, container } = initPlugin());
      utilsBackup = intlTelInput.utils;
      intlTelInput.utils = null;
    });

    afterEach(() => {
      teardown(iti);
      // replace intlTelInput.utils after setting it to null in one of the tests
      intlTelInput.utils = utilsBackup;
    });

    test("sets raw value", () => {
      iti.setNumber("+447733123456");
      expect(input.value).toEqual("+447733123456");
    });

    test("updates flag", () => {
      iti.setNumber("+447733123456");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("with utils, nationalMode true", () => {
    let iti, input;
    const options = { nationalMode: true };

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("formats to national", () => {
      iti.setNumber("+447733123456");
      expect(input.value).toEqual("07733 123456");
    });
  });

  describe("with utils, nationalMode false", () => {
    let iti, input;
    const options = { nationalMode: false };

    beforeEach(() => {
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("formats to intl", () => {
      iti.setNumber("+447733123456");
      expect(input.value).toEqual("+44 7733 123456");
    });
  });
});
