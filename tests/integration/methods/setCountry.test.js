/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, checkFlagSelected, getSelectedCountryButton } = require("../helpers/helpers");

describe("setCountry method", () => {
  describe("vanilla init", () => {
    let iti, input, container;

    beforeEach(() => {
      ({ iti, input, container } = initPlugin());
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
  });

  describe("separateDialCode disabled", () => {
    let iti, container;
    const options = { showFlags: true, separateDialCode: false };

    beforeEach(() => {
      ({ iti, container } = initPlugin({ options }));
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
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("flag title", () => {
      iti.setCountry("gb");
      const btn = getSelectedCountryButton(container);
      expect(btn.getAttribute("title")).toEqual("United Kingdom");
    });
  });
});
