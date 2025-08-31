/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, getDropdownElement } = require("../helpers/helpers");

// fixDropdownWidth: when true, dropdown should not have flexible width class; when false it should.
describe("fixDropdownWidth option", () => {
  describe("default true", () => {
    let iti, container;

    beforeEach(() => {
      ({ iti, container } = initPlugin());
    });

    afterEach(() => teardown(iti));

    test("no flexible width class", async () => {
      const dropdown = getDropdownElement(container);
      expect(dropdown.classList).not.toContain("iti--flexible-dropdown-width");
    });
  });

  describe("explicit false", () => {
    let iti, container;

    beforeEach(() => {
      const options = { fixDropdownWidth: false };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds flexible width class", async () => {
      const dropdown = getDropdownElement(container);
      expect(dropdown.classList).toContain("iti--flexible-dropdown-width");
    });
  });
});
