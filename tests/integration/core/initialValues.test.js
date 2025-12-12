/**
 * @jest-environment jsdom
 */

const {
  initPlugin,
  teardown,
  checkFlagSelected,
} = require("../helpers/helpers");

describe("initial values", () => {
  let iti, input, container;

  afterEach(() => {
    teardown(iti);
  });

  describe("init plugin on empty input", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "",
      }));
    });

    test("leaves the input empty", () => {
      expect(input.value).toEqual("");
    });

    test("leaves the selected country empty", () => {
      expect(checkFlagSelected(container, "")).toBe(true);
    });
  });

  describe("init plugin on input containing valid intl UK number", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "+44 7947 123 456",
      }));
    });

    test("formats the number", () => {
      expect(input.value).toEqual("07947 123456");
    });

    test("updates the selected country", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("init plugin on input containing valid intl regionless NANP number", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "+1 800 123 1234",
      }));
    });

    test("formats the number", () => {
      expect(input.value).toEqual("(800) 123-1234");
    });

    test("updates the selected country", () => {
      expect(checkFlagSelected(container, "us")).toBe(true);
    });
  });

  describe("init plugin on input containing valid intl Cook Island number", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "+682 21 234",
      }));
    });

    test("formats the number", () => {
      expect(input.value).toEqual("21 234");
    });

    //* Issue 520.
    test("updates the selected country", () => {
      expect(checkFlagSelected(container, "ck")).toBe(true);
    });
  });

  describe("init plugin on input containing valid national UK number", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "07947123123",
      }));
    });

    test("does not format the number", () => {
      expect(input.value).toEqual("07947123123");
    });

    test("leaves the selected country empty", () => {
      expect(checkFlagSelected(container, "")).toBe(true);
    });
  });

  describe("init plugin on input containing valid national UK number, and initialCountry=GB", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "07947123123",
        options: { initialCountry: "gb" },
      }));
    });

    test("formats the number", () => {
      expect(input.value).toEqual("07947 123123");
    });

    test("updates the selected country", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("init plugin on input containing valid intl FI number shared with AX", () => {
    beforeEach(() => {
      ({ iti, input, container } = initPlugin({
        inputValue: "+358457234567",
      }));
    });

    // Issue 2111: initialising with a number range shared between FI and AX was selecting AX, but should select FI as it has the higher priority
    test("updates the selected country", () => {
      expect(checkFlagSelected(container, "fi")).toBe(true);
    });
  });
});
