/**
 * @vitest-environment jsdom
 */
import {
  initIntlTelInput,
  teardown,
  clickSelectedCountryAsync,
  getCountryListElement,
  selectCountryAsync,
} from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

const getFullscreenPopup = (root) => root.querySelector(".iti--fullscreen-popup");

describe("fullscreenParent option", () => {
  describe("fullscreenParent=null (default)", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { countrySelectorMode: "FULLSCREEN" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("injects the popup into document.body on open", async () => {
      await clickSelectedCountryAsync(container, user);
      expect(getFullscreenPopup(document).parentElement).toBe(document.body);
    });
  });

  describe("fullscreenParent=custom element", () => {
    let iti, container, user, modal;

    beforeEach(() => {
      user = userEvent.setup();
      //* e.g. a modal <dialog>, where a body-mounted popup would be inert and hidden behind the dialog (issue #2199).
      modal = document.createElement("dialog");
      document.body.appendChild(modal);
      const options = { countrySelectorMode: "FULLSCREEN", fullscreenParent: modal };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => {
      teardown(iti);
      modal.remove();
    });

    test("injects the popup into the custom element on open", async () => {
      expect(getFullscreenPopup(document)).toBeFalsy();
      await clickSelectedCountryAsync(container, user);
      expect(getFullscreenPopup(document).parentElement).toBe(modal);
      expect(getCountryListElement(modal)).toBeTruthy();
    });

    test("removes the popup on select", async () => {
      await clickSelectedCountryAsync(container, user);
      await selectCountryAsync(modal, "gb", user);
      expect(getFullscreenPopup(document)).toBeFalsy();
      expect(iti.getSelectedCountry().iso2).toBe("gb");
    });
  });

  //* The two parent options are deliberately independent: each only applies to its own mode.
  describe("independence from dropdownParent", () => {
    let iti, container, user, parent;

    beforeEach(() => {
      user = userEvent.setup();
      parent = document.createElement("div");
      document.body.appendChild(parent);
    });

    afterEach(() => {
      teardown(iti);
      parent.remove();
    });

    test("fullscreenParent is ignored in DROPDOWN mode, so the dropdown stays inline", async () => {
      const options = { countrySelectorMode: "DROPDOWN", fullscreenParent: parent };
      ({ iti, container } = initIntlTelInput({ options }));
      await clickSelectedCountryAsync(container, user);
      expect(getCountryListElement(container)).toBeTruthy();
      expect(getCountryListElement(parent)).toBeFalsy();
      expect(document.querySelector(".iti--detached-country-selector")).toBeFalsy();
    });

    test("dropdownParent is ignored in FULLSCREEN mode, so the popup stays in document.body", async () => {
      const options = { countrySelectorMode: "FULLSCREEN", dropdownParent: parent };
      ({ iti, container } = initIntlTelInput({ options }));
      await clickSelectedCountryAsync(container, user);
      expect(getFullscreenPopup(document).parentElement).toBe(document.body);
      expect(getCountryListElement(parent)).toBeFalsy();
    });
  });

  describe("fullscreenParent=invalid value", () => {
    let iti, container, user, warnSpy;

    beforeEach(() => {
      user = userEvent.setup();
      warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const options = { countrySelectorMode: "FULLSCREEN", fullscreenParent: "#modal" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => {
      teardown(iti);
      warnSpy.mockRestore();
    });

    test("warns and falls back to document.body", async () => {
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Option 'fullscreenParent' must be an HTMLElement or null"),
      );
      await clickSelectedCountryAsync(container, user);
      expect(getFullscreenPopup(document).parentElement).toBe(document.body);
    });
  });
});
