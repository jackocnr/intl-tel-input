/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getSelectedDialCodeText,
  typePlaceholderNumberAsync,
  checkFlagSelected,
} = require("../helpers/helpers");


//* We test with UK because the ntl number is different to the intl number (aside from the dial code).
describe("separateDialCode option", () => {
  describe("initialCountry=GB", () => {
    let input, iti, container;

    beforeEach(() => {
      const options = {
        initialCountry: "gb",
        separateDialCode: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("displays the dial code next to the input", async () => {
      expect(getSelectedDialCodeText(container)).toBe("+44");
    });

    test("formats the placeholder correctly", async () => {
      expect(input.placeholder).toBe("7400 123456");
    });

    describe("calling setNumber to a valid intl number", () => {
      const fullNumber = "+447400123456";

      beforeEach(() => {
        iti.setNumber(fullNumber);
      });

      test("formats the number correctly", async () => {
        expect(input.value).toBe("7400 123456");
      });

      test("calling getNumber returns the full intl number", async () => {
        expect(iti.getNumber()).toBe(fullNumber);
      });
    });
  });

  //* We test with Canada because we had some bugs with area codes.
  describe("initialCountry=CA", () => {
    let input, iti;

    beforeEach(() => {
      const options = {
        initialCountry: "ca",
        separateDialCode: true,
      };
      ({ input, iti } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("sets the placeholder correctly", async () => {
      expect(input.placeholder).toBe("506-234-5678");
    });

    test("calling setNumber will set the number correctly", async () => {
      iti.setNumber("+15194971234");
      expect(input.value).toBe("519-497-1234");
    });
  });

  //* We test with America Samoa because we had a bug.
  describe("initialCountry=AS", () => {
    let input, iti;

    beforeEach(() => {
      const options = {
        initialCountry: "as",
        separateDialCode: true,
      };
      ({ input, iti } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("sets the placeholder correctly", () => {
      expect(input.placeholder).toBe("684-733-1234");
    });

    test("calling setNumber will set the number correctly", () => {
      iti.setNumber("+16847331234");
      expect(input.value).toBe("684-733-1234");
    });
  });

  //* We test with Russia because we had a bug.
  describe("initialCountry=RU", () => {
    let input, iti;

    beforeEach(() => {
      const options = {
        initialCountry: "ru",
        separateDialCode: true,
      };
      ({ input, iti } = initPlugin({ options, inputValue: "(922) 555-1234" }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("formats the number correctly", () => {
      //* Used to be '8 (922) 555-12-34'.
      expect(input.value).toBe("922 555-12-34");
    });
  });

  //* We test with Aland Islands because we had a bug.
  describe("initialCountry=AX", () => {
    let input, iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        initialCountry: "ax",
        separateDialCode: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("when you type the placeholder number it maintains the country selection", async () => {
      await typePlaceholderNumberAsync(user, input);
      // it previously changed to Finland!
      expect(checkFlagSelected(container, "ax")).toBe(true);
    });
  });

  //* We test with Kazakhstan because we had a bug.
  describe("initialCountry=KZ", () => {
    let input, iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        initialCountry: "kz",
        separateDialCode: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("typing/deleting different area codes should update the selected country", async () => {
      // typing area code starting with 1 changes to Russia
      await user.type(input, "1");
      expect(checkFlagSelected(container, "ru")).toBe(true);

      // deleting area code keeps Russia selected
      await user.type(input, "{backspace}");
      expect(checkFlagSelected(container, "ru")).toBe(true);

      // typing area code starting with 7 changes to Kazakhstan
      await user.type(input, "7");
      expect(checkFlagSelected(container, "kz")).toBe(true);

      // deleting area code keeps Kazakhstan selected
      await user.type(input, "{backspace}");
      expect(checkFlagSelected(container, "kz")).toBe(true);
    });
  });
});
