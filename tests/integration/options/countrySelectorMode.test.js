/**
 * @vitest-environment jsdom
 */
import {
  initIntlTelInput,
  teardown,
  getCountryListElement,
  checkFlagSelected,
  getArrowElement,
  clickSelectedCountryAsync,
  isCountrySelectorOpen,
  getCountrySelectorElement,
  getSelectedCountryButton,
} from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("countrySelectorMode option", () => {
  describe("countrySelectorMode='OFF'", () => {
    let iti, container, input, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { countrySelectorMode: "OFF", separateDialCode: false };
      ({ iti, container, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("hides arrow", async () => {
      expect(getArrowElement(container)).toBeFalsy();
    });

    test("hides country list", async () => {
      expect(getCountryListElement(container)).toBeFalsy();
    });

    test("does not add role=combobox", async () => {
      expect(getSelectedCountryButton(container).getAttribute("role")).toBeNull();
    });

    test("clicking selected flag does not show dropdown", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(getCountrySelectorElement(container)).toBeFalsy();
    });

    test("still updates flag when typing", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("countrySelectorMode='DROPDOWN'", () => {
    let iti, container, input, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { countrySelectorMode: "DROPDOWN", separateDialCode: false };
      ({ iti, container, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("shows arrow", async () => {
      expect(getArrowElement(container)).toBeTruthy();
    });

    test("shows country list", async () => {
      expect(getCountryListElement(container)).toBeTruthy();
    });

    test("adds aria-haspopup=dialog", async () => {
      expect(getSelectedCountryButton(container).getAttribute("aria-haspopup")).toBe("dialog");
    });

    test("updates flag when typing", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    test("clicking selected flag shows dropdown inline", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(isCountrySelectorOpen(container)).toBeTruthy();
      const root = container.ownerDocument;
      expect(root.querySelector(".iti--fullscreen-popup")).toBeFalsy();
    });
  });

  describe("countrySelectorMode='FULLSCREEN'", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { countrySelectorMode: "FULLSCREEN" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("attaches the country list to document.body on open", async () => {
      const root = container.ownerDocument;
      expect(getCountryListElement(root)).toBeFalsy();
      await clickSelectedCountryAsync(container, user);
      expect(getCountryListElement(root)).toBeTruthy();
      expect(root.querySelector(".iti--fullscreen-popup")).toBeTruthy();
    });
  });
});
