/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, clickSelectedCountryAsync } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

let iti, container, user;

describe("containerClass option", () => {
  describe("basic", () => {
    beforeEach(() => {
      const options = { containerClass: "cpc" };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds class", () => {
      expect(container.classList).toContain("cpc");
    });
  });

  describe("with fullscreen popup", () => {
    beforeEach(() => {
      user = userEvent.setup();
      const options = { containerClass: "cpc", useFullscreenPopup: true };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds class to popup container", async () => {
      await clickSelectedCountryAsync(container, user);
      const root = container.ownerDocument; // access the root document without using a global
      expect(root.querySelector(".iti--container").classList).toContain("cpc");
    });
  });
});
