/**
 * @jest-environment jsdom
 */
const {
  initPlugin,
  teardown,
  clickSelectedCountryAsync,
  getCountryListElement,
  isDropdownOpen,
  selectCountryAsync,
} = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("dropdownContainer option", () => {
  describe("dropdownContainer=null", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { dropdownContainer: null };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("places list inline, next to input", () => {
      expect(getCountryListElement(container)).toBeTruthy();
    });

    describe("clicking selected flag", () => {
      beforeEach(async () => {
        await clickSelectedCountryAsync(container, user);
      });

      test("opens dropdown", async () => {
        expect(isDropdownOpen(container)).toBeTruthy();
      });

      test("selecting a country closes dropdown", async () => {
        await selectCountryAsync(container, "gb", user);
        expect(isDropdownOpen(container)).toBeFalsy();
      });
    });
  });

  describe("dropdownContainer=document.body", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { dropdownContainer: document.body };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("injects on open and removes on select", async () => {
      const root = container.ownerDocument; // access the root document without using a global
      expect(getCountryListElement(root)).toBeFalsy();
      await clickSelectedCountryAsync(container, user);
      expect(getCountryListElement(root)).toBeTruthy(); // it's in the document
      expect(getCountryListElement(container)).toBeFalsy(); // but it's not next to the input
      await selectCountryAsync(container, "gb", user);
      expect(getCountryListElement(root)).toBeFalsy();
    });
  });
});
