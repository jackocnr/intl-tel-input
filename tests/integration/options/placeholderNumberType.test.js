/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown } from "../helpers/helpers";

describe("placeholderNumberType option", () => {
  describe("default (MOBILE)", () => {
    let iti, input;

    beforeEach(() => {
      const options = { initialCountry: "gb" };
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("mobile placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("7400 123456");
    });
  });

  describe("fixed line", () => {
    let iti, input;

    beforeEach(() => {
      const options = { initialCountry: "gb", placeholderNumberType: "FIXED_LINE" };
      ({ iti, input } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("fixed line placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("121 234 5678");
    });
  });
});
