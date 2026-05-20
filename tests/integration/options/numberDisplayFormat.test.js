/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, checkFlagSelected } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("numberDisplayFormat option", () => {
  describe("numberDisplayFormat=NATIONAL, empty input", () => {
    let iti, input, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { numberDisplayFormat: "NATIONAL", separateDialCode: false };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing intl dial code still updates selected country", async () => {
      expect(checkFlagSelected(container, "")).toBe(true);
      await user.type(input, "+44");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("numberDisplayFormat=NATIONAL initialCountry=gb", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { numberDisplayFormat: "NATIONAL", initialCountry: "gb", separateDialCode: false };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing Jersey area code updates flag", async () => {
      await user.type(input, "01534");
      expect(checkFlagSelected(container, "je")).toBe(true);
    });
  });

  describe("numberDisplayFormat=INTERNATIONAL initialCountry=us", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { numberDisplayFormat: "INTERNATIONAL", initialCountry: "us", separateDialCode: false };
      ({ iti, input, container } = initIntlTelInput({ options }));
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

  describe("numberDisplayFormat=INTERNATIONAL initialCountry=ax", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { numberDisplayFormat: "INTERNATIONAL", initialCountry: "ax", separateDialCode: false };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    // it previously changed to finland! (typing +3 gave globe icon, then 58 gave primary country for that dial code which is Finland)
    test("typing intl dial code retains selected country", async () => {
      await user.type(input, "+358");
      expect(checkFlagSelected(container, "ax")).toBe(true);
    });
  });

  describe("numberDisplayFormat=INTERNATIONAL initialCountry=gb", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { numberDisplayFormat: "INTERNATIONAL", initialCountry: "gb", separateDialCode: false };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("typing +44 maintains GB flag selection", async () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "+");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "4");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "4");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "{backspace}");
      // input now contains +4
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "{backspace}");
      // input now contains +
      expect(checkFlagSelected(container, "gb")).toBe(true);
      await user.type(input, "{backspace}");
      // input now empty
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    // Prev bug: Typing +882 used to show Bangladesh flag (+880) instead of globe icon
    test("typing invalid intl dial code should show globe icon", async () => {
      await user.type(input, "+882");
      expect(checkFlagSelected(container, "")).toBe(true);
    });
  });

  // Format-on-display behaviour: the input gets formatted on init and on setNumber.

  describe("numberDisplayFormat=E164, separateDialCode=false, valid US intl initial value", () => {
    let iti, input;

    beforeEach(() => {
      const options = { numberDisplayFormat: "E164", separateDialCode: false };
      ({ iti, input } = initIntlTelInput({ inputValue: "+17024181234", options }));
    });

    afterEach(() => teardown(iti));

    test("displays as unformatted E.164, inc with setNumber", () => {
      expect(input.value).toEqual("+17024181234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("+14154181234");
    });
  });

  describe("numberDisplayFormat=NATIONAL, separateDialCode=false, valid US intl initial value", () => {
    let iti, input;

    beforeEach(() => {
      const options = { numberDisplayFormat: "NATIONAL", separateDialCode: false };
      ({ iti, input } = initIntlTelInput({ inputValue: "+17024181234", options }));
    });

    afterEach(() => teardown(iti));

    test("formats to national, inc with setNumber", () => {
      expect(input.value).toEqual("(702) 418-1234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("(415) 418-1234");
    });
  });

  describe("numberDisplayFormat=INTERNATIONAL (default), separateDialCode=true, valid US intl initial value", () => {
    let iti, input;

    beforeEach(() => {
      const options = { numberDisplayFormat: "INTERNATIONAL" };
      ({ iti, input } = initIntlTelInput({ inputValue: "+17024181234", options }));
    });

    afterEach(() => teardown(iti));

    test("strips the dial code (since separateDialCode shows it next to the flag), inc with setNumber", () => {
      expect(input.value).toEqual("702-418-1234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("415-418-1234");
    });
  });
});
