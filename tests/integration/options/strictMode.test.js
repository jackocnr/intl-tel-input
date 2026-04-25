/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import {
  initPlugin,
  teardown,
  stripFormattingChars,
  selectCountryAndTypePlaceholderNumberAsync,
  checkFlagSelected,
  getPasteEventObject,
} from "../helpers/helpers";


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
        separateDialCode: false,
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

    test("strict:reject fires with source=key, reason=invalid when typing an invalid character", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.type(input, "a");
      expect(events).toEqual([{ source: "key", rejectedInput: "a", reason: "invalid" }]);
    });

    test("strict:reject fires with source=key, reason=max-length when typing past the max length", async () => {
      const events = [];
      await user.type(input, "7021234567");
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.type(input, "8");
      expect(events).toEqual([{ source: "key", rejectedInput: "8", reason: "max-length" }]);
    });

    test("strict:reject fires with source=paste, reason=invalid when pasted content has non-digit chars stripped", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);
      const pastedContent = "a9871234567";
      fireEvent.paste(input, getPasteEventObject(pastedContent));
      expect(events).toEqual([{ source: "paste", rejectedInput: pastedContent, reason: "invalid" }]);
    });

    test("strict:reject fires with source=paste, reason=max-length when pasted content is trimmed at end", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);
      const pastedContent = "2345678901234567999999";
      fireEvent.paste(input, getPasteEventObject(pastedContent));
      expect(events).toEqual([{ source: "paste", rejectedInput: pastedContent, reason: "max-length" }]);
    });

    test("strict:reject does not fire when pasted content is fully accepted", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);
      fireEvent.paste(input, getPasteEventObject("2345678901"));
      expect(events).toEqual([]);
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

  describe("strictRejectAnimation=true", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        initialCountry: "us",
        strictMode: true,
        strictRejectAnimation: true,
      };
      ({ input, iti, container } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("adds iti__strict-reject-animation class to wrapper when an invalid key is rejected", async () => {
      await user.type(input, "a");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("adds iti__strict-reject-animation class to wrapper when a key is rejected for exceeding max length", async () => {
      await user.type(input, "7021234567");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(false);
      await user.type(input, "8");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("does NOT add iti__strict-reject-animation class when paste is only partially stripped", async () => {
      await user.click(input);
      // This paste is partially sanitised (letters stripped) but still accepted.
      fireEvent.paste(input, getPasteEventObject("a9871234567"));
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(false);
    });

    test("adds iti__strict-reject-animation class when every pasted character is stripped", async () => {
      await user.click(input);
      fireEvent.paste(input, getPasteEventObject("abc"));
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("adds iti__strict-reject-animation class when a paste is fully rejected (max-length in middle)", async () => {
      await user.type(input, "7021234567");
      // caret now at end; move it into the middle
      input.setSelectionRange(5, 5);
      fireEvent.paste(input, getPasteEventObject("99999999"));
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("no iti__strict-reject-animation class when option is explicitly disabled", async () => {
      teardown(iti);
      ({ input, iti, container } = initPlugin({ options: { initialCountry: "us", strictMode: true, strictRejectAnimation: false } }));
      await user.type(input, "a");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(false);
    });
  });
});






// // LONG RUNNING TESTS - RUN MANUALLY FROM TIME TO TIME
// // NOTE: these take so long they crash travis. BUT they run ok locally, they just take about 60 seconds.

// const { intlTelInput } = require("../helpers/helpers");
// const allCountries = intlTelInput.getCountryData();
// const iso2Codes = allCountries.map((country) => country.iso2);
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
//       placeholderNumberType: "MOBILE",
//       allowedNumberTypes: ["MOBILE"],
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(iso2Codes)("can type ntl placeholder number and no more: %s", async (iso2) => {
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
//       allowedNumberTypes: ["MOBILE"],
//       placeholderNumberType: "MOBILE",
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(iso2Codes)("can type intl placeholder number: %s", async (iso2) => {
//     const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     expect(checkFlagSelected(container, iso2)).toBe(true);
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });



// // SEPARATE DIAL CODE ENABLED
// describe("strictMode, with separateDialCode=true", () => {
//   let input, iti, user, container;

//   beforeEach(() => {
//     user = userEvent.setup();
//     const options = {
//       strictMode: true,
//       separateDialCode: true,
//       placeholderNumberType: "MOBILE",
//       allowedNumberTypes: ["MOBILE"],
//     };
//     ({ input, iti, container } = initPlugin({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(iso2Codes)("can type separateDialCode placeholder number: %s", async (iso2) => {
//     const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     expect(checkFlagSelected(container, iso2)).toBe(true);
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });
