/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, checkFlagSelected } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("nationalMode option", () => {
  describe("nationalMode=true, empty input", () => {
    let iti, input, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { nationalMode: true };
      ({ iti, input, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing intl dial code still updates selected country", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("nationalMode=true initialCountry=gb", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { nationalMode: true, initialCountry: "gb" };
      ({ iti, input, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing Jersey area code updates flag", async () => {
      await user.type(input, "01534");
      expect(checkFlagSelected(container, "je")).toBe(true);
    });
  });

  describe("nationalMode=false initialCountry=us", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { nationalMode: false, initialCountry: "us" };
      ({ iti, input, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing US intl dial code keeps US selected and then typing CA area code updates flag", async () => {
      expect(checkFlagSelected(container, "us")).toBe(true);
      await user.type(input, "+1");
      expect(checkFlagSelected(container, "us")).toBe(true);
      await user.type(input, "204");
      expect(checkFlagSelected(container, "ca")).toBe(true);
    });
  });

  describe("nationalMode=false initialCountry=ax", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { nationalMode: false, initialCountry: "ax" };
      ({ iti, input, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    // it previously changed to finland! (typing +3 gave globe icon, then 58 gave primary country for that dial code which is Finland)
    test("typing intl dial code retains selected country", async () => {
      await user.type(input, "+358");
      expect(checkFlagSelected(container, "ax")).toBe(true);
    });
  });
});
