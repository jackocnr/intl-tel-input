/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, checkFlagSelected, getSelectedCountryButton } from "../helpers/helpers";

describe("setCountry method", () => {
  describe("vanilla init", () => {
    let iti, input, container;

    beforeEach(() => {
      ({ iti, input, container } = initIntlTelInput());
    });

    afterEach(() => teardown(iti));

    test("updates flag", () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      iti.setCountry("gb");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    // we used to do this
    test("does not insert dial code", () => {
      iti.setCountry("gb");
      expect(input.value).toEqual("");
    });

    test("throws for unknown iso2 code", () => {
      expect(() => iti.setCountry("zz")).toThrow(/Invalid iso2 code: 'zz'/);
    });

    test("throws for non-string iso2", () => {
      expect(() => iti.setCountry(123)).toThrow();
    });

    test("accepts uppercase iso2 codes (case-insensitive)", () => {
      iti.setCountry("GB");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("separateDialCode disabled", () => {
    let iti, container;
    const options = { showFlags: true, separateDialCode: false };

    beforeEach(() => {
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("flag title", () => {
      iti.setCountry("gb");
      const btn = getSelectedCountryButton(container);
      expect(btn.getAttribute("title")).toEqual("United Kingdom");
    });
  });

  describe("separateDialCode enabled", () => {
    let iti, container;
    const options = { showFlags: true, separateDialCode: true };

    beforeEach(() => {
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("flag title", () => {
      iti.setCountry("gb");
      const btn = getSelectedCountryButton(container);
      expect(btn.getAttribute("title")).toEqual("United Kingdom");
    });
  });
});
