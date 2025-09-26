/**
 * @jest-environment jsdom
 */

const {
  initPlugin,
  teardown,
  getCountryContainer,
  getCountryListElement,
} = require("../helpers/helpers");

describe("destroy method", () => {
  describe("vanilla init", () => {
    let iti, input;

    beforeEach(() => {
      ({ iti, input } = initPlugin());
    });

    afterEach(() => teardown(iti));

    test("adds markup on init", () => {
      // dont use the usual "container" here, instead use inputParent, to match the test below
      const inputParent = input.parentElement;
      expect(inputParent.classList.contains("iti")).toBe(true);
      expect(getCountryContainer(inputParent)).toBeTruthy();
      expect(getCountryListElement(inputParent)).toBeTruthy();
    });

    test("destroy removes markup", () => {
      iti.destroy();
      // wrapper removed at this point so parent probably is body element
      const inputParent = input.parentElement;
      expect(inputParent.classList.contains("iti")).toBe(false);
      expect(getCountryContainer(inputParent)).toBeFalsy();
      expect(getCountryListElement(inputParent)).toBeFalsy();
    });
  });
});
