/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, clickSelectedCountryAsync } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("containerClass option", () => {
  describe("basic", () => {
    let iti, container;

    beforeEach(() => {
      const options = { containerClass: "cpc" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds class", () => {
      expect(container.classList).toContain("cpc");
    });
  });

  describe("with fullscreen popup", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { containerClass: "cpc", useFullscreenPopup: true };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds class to popup container", async () => {
      await clickSelectedCountryAsync(container, user);
      const root = container.ownerDocument; // access the root document without using a global
      expect(root.querySelector(".iti--container").classList).toContain("cpc");
    });
  });
});
