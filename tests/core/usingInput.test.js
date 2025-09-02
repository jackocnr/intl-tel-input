/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  checkFlagSelected,
  openDropdownSelectCountryAsync,
} = require("../helpers/helpers");

describe("using input", () => {
  let iti, user, input, container;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, input, container } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
  });

  describe("typing a number with an intl dial code", () => {
    beforeEach(async () => {
      await user.type(input, "+44 1234567");
    });

    test("updates the selected flag", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    //* This was a bug.
    test("clearing the input again does not change the selected flag", async () => {
      await user.clear(input);
      await user.type(input, " ");
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });
  });

  describe("typing a dial code containing a space", () => {
    beforeEach(async () => {
      await user.type(input, "+4 4 98765432");
    });

    test("still updates the flag correctly", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    test("then changing the flag updates and re-formats the number correctly", async () => {
      await openDropdownSelectCountryAsync(container, "zw", user);
      expect(input.value).toBe("09 876 5432");
    });
  });

  describe("typing a dial code containing a dot", () => {
    beforeEach(async () => {
      await user.type(input, "+4.4 98765432");
    });

    test("still updates the flag correctly", () => {
      expect(checkFlagSelected(container, "gb")).toBe(true);
    });

    test("then changing the flag updates and re-formats the whole number correctly", async () => {
      await openDropdownSelectCountryAsync(container, "zw", user);
      expect(input.value).toBe("09 876 5432");
    });
  });

  describe("typing the bangladeshi intl dial code", () => {
    beforeEach(async () => {
      await user.type(input, "+880");
    });

    test("selects the bangladesh flag", () => {
      expect(checkFlagSelected(container, "bd")).toBe(true);
    });

    // this was a bug: https://github.com/jackocnr/intl-tel-input/issues/533
    describe("adding a 1 at the beginning", () => {
      beforeEach(async () => {
        await user.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}1");
      });

      test("changes to US flag", () => {
        expect(input.value).toBe("+1 880");
        expect(checkFlagSelected(container, "us")).toBe(true);
      });
    });
  });

  describe("selecting Canada and then typing a regionless NANP number", () => {
    beforeEach(async () => {
      await openDropdownSelectCountryAsync(container, "ca", user);
      await user.type(input, "8005551212");
    });

    test("leaves canada selected", () => {
      expect(checkFlagSelected(container, "ca")).toBe(true);
    });
  });
});
