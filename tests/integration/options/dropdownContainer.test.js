/**
 * @vitest-environment jsdom
 */
import {
  initIntlTelInput,
  teardown,
  clickSelectedCountryAsync,
  getCountryListElement,
  isDropdownOpen,
  selectCountryAsync,
} from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("dropdownContainer option", () => {
  describe("dropdownContainer=null", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { dropdownContainer: null };
      ({ iti, container } = initIntlTelInput({ options }));
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
      ({ iti, container } = initIntlTelInput({ options }));
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

  describe("dropdownContainer=custom element", () => {
    let iti, container, user, customContainer;

    beforeEach(() => {
      user = userEvent.setup();
      customContainer = document.createElement("div");
      customContainer.id = "custom-dd-container";
      document.body.appendChild(customContainer);
      ({ iti, container } = initIntlTelInput({ options: { dropdownContainer: customContainer } }));
    });

    afterEach(() => {
      teardown(iti);
      customContainer.remove();
    });

    test("injects dropdown into the custom container on open", async () => {
      expect(getCountryListElement(customContainer)).toBeFalsy();
      await clickSelectedCountryAsync(container, user);
      expect(getCountryListElement(customContainer)).toBeTruthy();
    });

    test("still injects into document even when container detached from DOM", async () => {
      customContainer.remove(); // detach before opening
      await clickSelectedCountryAsync(container, user);
      // dropdown goes into the (now-detached) container; should not throw
      expect(getCountryListElement(customContainer)).toBeTruthy();
    });
  });
});
