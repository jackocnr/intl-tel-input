/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { fireEvent } = require("@testing-library/dom");
const {
  initPlugin,
  teardown,
  checkFlagSelected,
  getPasteEventObject,
} = require("../helpers/helpers");

// "Eastern" numerals that are still used for phone numbers in some countries:
// - Arabic-Indic
// - Persian

// Western:      0 1 2 3 4 5 6 7 8 9
// Arabic-Indic: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
// Persian:      ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

// NOTE: These numerals are written right-to-left in isolation, but when used in phone numbers they are treated as left-to-right, just like Western digits.

// Use cases:
// - Initialising plugin with eastern numerals should format the number and set the flag correctly
// - setNumber with eastern numerals should format the number and set the flag correctly
// - Typing a different international dial code in eastern numerals should update the selected flag
// - formatOnDisplay and formatAsYouType should work with eastern numerals
// - strictMode should allow typing/pasting eastern numerals
// - getNumber should work with eastern numerals, preserving the numeral set in the output
// - isValidNumber and isValidNumberPrecise should work with eastern numerals

describe("Eastern numerals support", () => {
  let iti, user, input, container;

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, input, container } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
  });

  describe("Arabic-Indic digits", () => {
    test("typing an intl number updates the selected flag and formats the number as you type", async () => {
      // "+447947123456" with Arabic-Indic digits
      await user.type(input, "+٤٤٧٩٤٧١٢٣٤٥٦");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // formats to "+44 7947 123456" in original numerals
      expect(input.value).toBe("+٤٤ ٧٩٤٧ ١٢٣٤٥٦");
    });
  });

  describe("Persian digits", () => {
    test("typing an intl number updates the selected flag and formats the number as you type", async () => {
      // "+447947123456" with Persian digits
      await user.type(input, "+۴۴۷۹۴۷۱۲۳۴۵۶");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // formats to "+44 7947 123456" in original numerals
      expect(input.value).toBe("+۴۴ ۷۹۴۷ ۱۲۳۴۵۶");
    });

    test("setNumber formats and sets flag", () => {
      // "+447947123456" with Persian digits
      iti.setNumber("+۴۴۷۹۴۷۱۲۳۴۵۶");
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // formats to "+44 7947 123456" in original numerals
      expect(input.value).toBe("+۴۴ ۷۹۴۷ ۱۲۳۴۵۶");
    });
  });
});

describe("Eastern numerals support: initial value in Arabic-Indic numerals", () => {
  let iti, input, container;

  beforeEach(() => {
    ({ iti, input, container } = initPlugin({
      inputValue: "+١٧٠٢١٢٣٤٥٦٧", // "+17021234567" in Arabic-Indic digits
    }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("initialising with eastern numerals formats and sets flag", () => {
    expect(checkFlagSelected(container, "us")).toBe(true);
    // formatted output should be displayed preserving Arabic-Indic digits
    // "+17021234567" formats to "(702) 123-4567" (NOTE that the hyphenated block is displayed back to front here due to LTR/RTL mixing)
    expect(input.value).toBe("(٧٠٢) ١٢٣-٤٥٦٧");
  });
});

describe("Eastern numerals in strictMode", () => {
  let iti, user, input;

  beforeEach(() => {
    user = userEvent.setup();
    const options = { initialCountry: "us", strictMode: true };
    ({ iti, input } = initPlugin({ options }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("typing US national number with Arabic-Indic digits is allowed and formats", async () => {
    // "7021234567" in Arabic-Indic
    await user.type(input, "٧٠٢١٢٣٤٥٦٧");
    // Display should preserve Eastern Arabic numerals while formatting: (702) 123-4567
    expect(input.value).toBe("(٧٠٢) ١٢٣-٤٥٦٧");
  });

  test("pasting intl number with Arabic-Indic digits is normalized and formatted", async () => {
    await user.click(input);
    const pastedContent = "+١٩٨٧١٢٣١٢٣٤"; // "+19871231234"
    const eventObject = getPasteEventObject(pastedContent);
    fireEvent.paste(input, eventObject);
    // Display should preserve Eastern Arabic numerals while formatting: +1 987-123-1234
    expect(input.value).toBe("+١ ٩٨٧-١٢٣-١٢٣٤");
  });

  test("getNumber returns E.164 formatted number in original numerals", async () => {
    await user.type(input, "+۴۴۷۹۴۷۱۲۳۴۵۶"); // "+447947123456" in Persian digits
    expect(iti.getNumber()).toBe("+۴۴۷۹۴۷۱۲۳۴۵۶");
  });

  test("validation works with eastern numerals", async () => {
    await user.clear(input);
    // valid US mobile example in Arabic-Indic: +1 702-555-0123
    await user.type(input, "+١ ٧٠٢٥٥٥٠١٢٣");
    expect(iti.isValidNumber()).toBe(true);
    expect(iti.isValidNumberPrecise()).toBe(true);
  });
});
