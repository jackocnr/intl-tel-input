/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { fireEvent } = require("@testing-library/dom");
const {
  initPlugin,
  teardown,
  stripFormattingChars,
  selectCountryAndTypePlaceholderNumberAsync,
  checkFlagSelected,
  getPasteEventObject,
} = require("../helpers/helpers");


// NATIONAL MODE ENABLED
describe("strictMode option", () => {
  describe("nationalMode=true", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        initialCountry: "us",
        strictMode: true,
        nationalMode: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("ignore irrelevant chars", async () => {
      await user.type(input, "+1a9./-:$@&*b8c7d+");
      expect(input.value).toBe("+1 987");
    });

    // PREV BUG
    test("allows typing digit in middle of incomplete ntl number", async () => {
      await user.type(input, "702123567");
      expect(input.value).toBe("(702) 123-567");
      // put cursor before the 5 and type a 4 - should be allowed
      input.setSelectionRange(10, 10);
      await user.type(input, "4", {
        initialSelectionStart: 10,
        initialSelectionEnd: 10,
      });
      expect(input.value).toBe("(702) 123-4567");
    });

    test("prevents typing digit in middle of complete ntl number", async () => {
      await user.type(input, "7021234567");
      expect(input.value).toBe("(702) 123-4567");
      // put cursor before the 4 and type a 1 - should NOT be allowed
      input.setSelectionRange(10, 10);
      await user.type(input, "1", {
        initialSelectionStart: 10,
        initialSelectionEnd: 10,
      });
      expect(input.value).toBe("(702) 123-4567");
    });

    // PREV BUG: https://github.com/jackocnr/intl-tel-input/issues/1777
    test("user can add dial code to national number", async () => {
      await user.type(input, "79554053");
      expect(input.value).toBe("(795) 540-53");
      // put cursor at the beginning and type dial code - should be allowed
      input.setSelectionRange(0, 0);
      await user.type(input, "+591", {
        initialSelectionStart: 0,
        initialSelectionEnd: 0,
      });
      expect(input.value).toBe("+591 79554053");
    });

    // PREV BUG
    test("type full ntl number, select all, can type 0 to replace the number with just a 0", async () => {
      await user.type(input, "7021234567");
      input.setSelectionRange(0, input.value.length);
      await user.type(input, "0", {
        initialSelectionStart: 0,
        initialSelectionEnd: input.value.length,
      });
      expect(input.value).toBe("0");
    });

    test("type full ntl number, can still insert + at beginning", async () => {
      await user.type(input, "7021234567");
      // put cursor at beginning and type +
      input.setSelectionRange(0, 0);
      await user.type(input, "+", {
        initialSelectionStart: 0,
        initialSelectionEnd: 0,
      });
      expect(input.value).toBe("+7021234567");
      // changes flag to RU
      expect(checkFlagSelected(container, "ru")).toBe(true);
    });

    test("type full US ntl number, can still insert digit in area code if it changes country", async () => {
      await user.type(input, "4151234567");
      expect(input.value).toBe("(415) 123-4567");
      // put cursor at pos 3 and type a 6 to change to canadian area code 416, which should change flag to canada
      input.setSelectionRange(3, 3);
      await user.type(input, "6", {
        initialSelectionStart: 3,
        initialSelectionEnd: 3,
      });
      expect(input.value).toBe("41651234567"); // guess it should remove all formatting as now invalid canadian number?
      expect(checkFlagSelected(container, "ca")).toBe(true);
      // remove digit again to return to US number and format
      await user.type(input, "{backspace}", {
        initialSelectionStart: 3,
        initialSelectionEnd: 3,
      });
      expect(checkFlagSelected(container, "us")).toBe(true);
      expect(input.value).toBe("(415) 123-4567");
    });

    test("type full US ntl number, cannot insert digit in middle of number", async () => {
      await user.type(input, "4151234567");
      expect(input.value).toBe("(415) 123-4567");
      // put cursor at pos 4 and type a 6
      input.setSelectionRange(4, 4);
      await user.type(input, "6", {
        initialSelectionStart: 4,
        initialSelectionEnd: 4,
      });
      // it should ignore the 6
      expect(input.value).toBe("(415) 123-4567");
    });

    test("type full intl number, can still change dial code if it changes country", async () => {
      await user.type(input, "+17021234567");
      // put cursor at pos 1 and type 4 to change to Swiss dial code
      input.setSelectionRange(1, 1);
      await user.type(input, "4", {
        initialSelectionStart: 1,
        initialSelectionEnd: 1,
      });
      expect(input.value).toBe("+417021234567"); // or should it re-format to swiss formatting???
    });

    test("can type US ntl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "us", user, input);
      expect(checkFlagSelected(container, "us")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    // this was a bug - the number was never capped
    test("can type Canada ntl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "ca", user, input);
      expect(checkFlagSelected(container, "ca")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("can type UK ntl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "gb", user, input);
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    // PREV BUG
    test("can type Russian ntl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "ru", user, input);
      expect(checkFlagSelected(container, "ru")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("paste strips invalid chars, caps length, and formats", async () => {
      await user.click(input);
      const pastedContent = "+1a9./-:$@&*b8c7d+123123456";
      const eventObject = getPasteEventObject(pastedContent);
      // NOTE: could not get this working with user.paste
      fireEvent.paste(input, eventObject);
      expect(input.value).toBe("+1 987-123-1234");
    });

    // PREV BUG
    test("pasting a very long number still works", async () => {
      await user.click(input);
      const pastedContent = "2345678901234567999999";
      const eventObject = getPasteEventObject(pastedContent);
      // NOTE: could not get this working with user.paste
      fireEvent.paste(input, eventObject);
      expect(input.value).toBe("(234) 567-8901");
    });
  });

  // NATIONAL MODE DISABLED
  describe("nationalMode=false", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        strictMode: true,
        nationalMode: false,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("can type US intl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "us", user, input);
      expect(checkFlagSelected(container, "us")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("can type UK intl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "gb", user, input);
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("can type Russian intl placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "ru", user, input);
      expect(checkFlagSelected(container, "ru")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });
  });

  // SEPARATE DIAL CODE ENABLED
  describe("separateDialCode=true", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        strictMode: true,
        separateDialCode: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("can type US placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "us", user, input);
      expect(checkFlagSelected(container, "us")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("can type UK placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "gb", user, input);
      expect(checkFlagSelected(container, "gb")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });

    test("can type Russian placeholder number and no more", async () => {
      const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "ru", user, input);
      expect(checkFlagSelected(container, "ru")).toBe(true);
      // try typing extra digit, which should be ignored
      await user.type(input, "1");
      // sometimes AYT formatting is slightly different, so strip formatting chars
      expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
    });
  });
});






// // LONG RUNNING TESTS - RUN MANUALLY FROM TIME TO TIME
// // NOTE: these take so long they crash travis. BUT you can run one block at a time locally.

// const allCountries = require("../../build/js/data");
// const countryCodes = allCountries.map((country) => country.iso2);
// const countriesAllowingExtraDigit = ["ax", "at", "by", "ba", "bg", "kh", "bq", "cd", "fi", "ga", "id", "ie", "lu", "my", "mm", "nz", "rs", "so", "tk", "tv", "vn", "zw"];
// const countriesAllowingMultipleExtraDigits = ["at", "id", "mm", "tk"];

// // NATIONAL MODE ENABLED
// describe("strictMode, with nationalMode=true", () => {
//   let input, iti, user, container;

//   beforeEach(() => {
//     user = userEvent.setup();
//     const options = {
//       strictMode: true,
//       nationalMode: true,
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(countryCodes)("can type ntl placeholder number and no more: %s", async (iso2) => {
//     let placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     expect(checkFlagSelected(container, iso2)).toBe(true);
//     // try typing an extra digit, which should be ignored (in most cases - see below)
//     await user.type(input, "1");

//     // some countries allow an extra digit
//     if (countriesAllowingExtraDigit.includes(iso2)) {
//       placeholderNumberClean += "1";
//       // try typing a second extra digit, which should be ignored (in most cases - see below)
//       await user.type(input, "1");

//       // some countries allow several extra digits which would be annoying to test, so give up here
//       if (countriesAllowingMultipleExtraDigits.includes(iso2)) {
//         placeholderNumberClean += "1";
//       }
//     }

//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });



// // NATIONAL MODE DISABLED
// describe("strictMode, with nationalMode=false", () => {
//   let input, iti, user, container;

//   beforeEach(() => {
//     user = userEvent.setup();
//     const options = {
//       strictMode: true,
//       nationalMode: false,
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(countryCodes)("can type intl placeholder number: %s", async (iso2) => {
//     const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     expect(checkFlagSelected(container, iso2)).toBe(true);
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });



// SEPARATE DIAL CODE ENABLED
// describe("strictMode, with separateDialCode=true", () => {
//   let input, iti, user, container;

//   beforeEach(() => {
//     user = userEvent.setup();
//     const options = {
//       strictMode: true,
//       separateDialCode: true,
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(countryCodes)("can type separateDialCode placeholder number: %s", async (iso2) => {
//     const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     expect(checkFlagSelected(container, iso2)).toBe(true);
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });
