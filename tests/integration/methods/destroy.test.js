/**
 * @vitest-environment jsdom
 */

import {
  initIntlTelInput,
  teardown,
  getCountryContainer,
  getCountryListElement,
  intlTelInput,
} from "../helpers/helpers";

describe("destroy method", () => {
  describe("vanilla init", () => {
    let iti, input;

    beforeEach(() => {
      ({ iti, input } = initIntlTelInput());
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

    test("destroy removes the instance from the global registry", () => {
      const id = iti.id;
      expect(intlTelInput.instances.get(String(id))).toBe(iti);
      iti.destroy();
      expect(intlTelInput.instances.get(String(id))).toBeUndefined();
    });

    test("destroy is idempotent", () => {
      iti.destroy();
      expect(() => iti.destroy()).not.toThrow();
    });

    test("public methods are safe to call after destroy", () => {
      iti.destroy();
      expect(iti.isActive()).toBe(false);
      expect(iti.getNumber()).toEqual("");
      expect(iti.getExtension()).toEqual("");
      expect(() => iti.setReadonly(true)).not.toThrow();
      expect(() => iti.setDisabled(true)).not.toThrow();
    });
  });
});
