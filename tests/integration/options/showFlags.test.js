/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, checkFlagSelected } from "../helpers/helpers";

describe("showFlags option", () => {
  describe("default true, with input value set to valid GB number", () => {
    let iti, container;

    beforeEach(() => {
      ({ iti, container } = initIntlTelInput({ inputValue: "+447947123123" }));
    });

    afterEach(() => teardown(iti));

    test("has flag element", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("disabled, with input value set to valid GB number", () => {
    let iti, container;

    beforeEach(() => {
      const options = { showFlags: false, allowDropdown: true };
      ({ iti, container } = initIntlTelInput({ options, inputValue: "+447947123123" }));
    });
    afterEach(() => teardown(iti));

    test("renders globe placeholder instead of specific flag", () => {
      expect(checkFlagSelected(container, "")).toBe(true);
    });
  });
});
