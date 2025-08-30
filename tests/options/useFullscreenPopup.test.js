/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, clickSelectedCountryAsync, getCountryListElement } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("useFullscreenPopup option", () => {
  describe("enabled", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { useFullscreenPopup: true };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("shows fullscreen container and country list on click selected country", async () => {
      const root = container.ownerDocument;
      expect(getCountryListElement(root)).toBeFalsy();
      await clickSelectedCountryAsync(container, user);
      expect(getCountryListElement(root)).toBeTruthy();
      expect(root.querySelector(".iti--fullscreen-popup")).toBeTruthy();
    });
  });

  describe("disabled", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { useFullscreenPopup: false };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("uses inline dropdown", async () => {
      const root = container.ownerDocument;
      expect(getCountryListElement(container)).toBeTruthy();
      await clickSelectedCountryAsync(container, user);
      expect(root.querySelector(".iti--fullscreen-popup")).toBeFalsy();
    });
  });
});
