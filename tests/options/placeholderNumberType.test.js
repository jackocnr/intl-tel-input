/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");

describe("placeholderNumberType option", () => {
  describe("default (MOBILE)", () => {
    let iti, input;

    beforeEach(() => {
      const options = { nationalMode: true, initialCountry: "gb" };
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("mobile placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("07400 123456");
    });
  });

  describe("fixed line", () => {
    let iti, input;

    beforeEach(() => {
      const options = { nationalMode: true, initialCountry: "gb", placeholderNumberType: "FIXED_LINE" };
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("fixed line placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("0121 234 5678");
    });
  });
});
