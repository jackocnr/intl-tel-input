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

    // jsdom has no visualViewport (or layout), so fake the viewport and the popup's height to simulate the virtual keyboard
    describe("with a virtual keyboard (visualViewport)", () => {
      const KEYBOARD_VAR = "--iti-virtual-keyboard-height";
      let fakeViewport;
      const getPopup = () => document.querySelector(".iti--fullscreen-popup");
      const getKeyboardHeight = (popup) => popup.style.getPropertyValue(KEYBOARD_VAR);

      beforeEach(() => {
        fakeViewport = Object.assign(new EventTarget(), {
          height: window.innerHeight,
        });
        window.visualViewport = fakeViewport;
        // the popup is fullscreen (top:0, bottom:0), so its height is the window height
        vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function () {
          return this.classList.contains("iti--fullscreen-popup") ? window.innerHeight : 0;
        });
      });

      afterEach(() => {
        delete window.visualViewport;
        vi.restoreAllMocks();
      });

      test("passes the keyboard height to the CSS on open when the keyboard is already open (issue #2200)", async () => {
        fakeViewport.height = window.innerHeight - 300;
        await clickSelectedCountryAsync(container, user);
        expect(getKeyboardHeight(getPopup())).toEqual("300px");
      });

      test("updates the keyboard height when the keyboard opens after the popup", async () => {
        await clickSelectedCountryAsync(container, user);
        expect(getKeyboardHeight(getPopup())).toEqual("0px");
        fakeViewport.height = window.innerHeight - 300;
        fakeViewport.dispatchEvent(new Event("resize"));
        expect(getKeyboardHeight(getPopup())).toEqual("300px");
      });

      test("never sets a height on the popup itself, so the dark backdrop stays fullscreen behind the keyboard", async () => {
        fakeViewport.height = window.innerHeight - 300;
        await clickSelectedCountryAsync(container, user);
        expect(getPopup().style.height).toEqual("");
        expect(getPopup().style.bottom).toEqual("");
      });

      test("clears the keyboard height on close", async () => {
        fakeViewport.height = window.innerHeight - 300;
        await clickSelectedCountryAsync(container, user);
        const popup = getPopup();
        await user.keyboard("{Escape}");
        expect(getKeyboardHeight(popup)).toEqual("");
      });
    });
  });
});
