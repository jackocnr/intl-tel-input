/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, getCountrySelectorElement } from "../helpers/helpers";

// matchDropdownWidth: when true, dropdown should not have flexible width class; when false it should.
describe("matchDropdownWidth option", () => {
  describe("default true", () => {
    let iti, container;

    beforeEach(() => {
      ({ iti, container } = initIntlTelInput());
    });

    afterEach(() => teardown(iti));

    test("no flexible width class", async () => {
      const dropdown = getCountrySelectorElement(container);
      expect(dropdown.classList).not.toContain("iti--flexible-dropdown-width");
    });
  });

  describe("explicit false", () => {
    let iti, container;

    beforeEach(() => {
      const options = { matchDropdownWidth: false };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds flexible width class", async () => {
      const dropdown = getCountrySelectorElement(container);
      expect(dropdown.classList).toContain("iti--flexible-dropdown-width");
    });
  });
});
