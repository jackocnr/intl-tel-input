/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import {
  initIntlTelInput,
  intlTelInput,
  teardown,
  stripFormattingChars,
  selectCountryAndTypePlaceholderNumberAsync,
  checkFlagSelected,
  isCountrySelectorOpen,
  pasteIntoInput,
} from "../helpers/helpers";


// NATIONAL MODE ENABLED
describe("strictMode option", () => {
  describe("numberDisplayFormat=NATIONAL", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        initialCountry: "us",
        strictMode: true,
        numberDisplayFormat: "NATIONAL",
        separateDialCode: false,
      };
      ({ input, iti, container } = initIntlTelInput({ options }));
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
      const pasteAllowed = pasteIntoInput(input, pastedContent);
      expect(pasteAllowed).toBe(true);
      expect(input.value).toBe("+1 987-123-1234");
    });

    test("does not prevent the paste event in strictMode", async () => {
      await user.click(input);
      expect(pasteIntoInput(input, "2345678901")).toBe(true);
    });

    test("does not clear long content if a paste input event has no paste snapshot", () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      const inputValue = "234567890123456789012345678901";
      input.value = inputValue;
      input.setSelectionRange(inputValue.length, inputValue.length);
      fireEvent.input(input, {
        inputType: "insertFromPaste",
        data: inputValue,
      });
      expect(events).toEqual([]);
      expect(input.value).toBe(inputValue);
    });

    // PREV BUG
    test("pasting a very long number still works", async () => {
      await user.click(input);
      const pastedContent = "2345678901234567999999";
      const pasteAllowed = pasteIntoInput(input, pastedContent);
      expect(pasteAllowed).toBe(true);
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
      expect(pasteIntoInput(input, pastedContent)).toBe(true);
      expect(events).toEqual([{ source: "paste", rejectedInput: pastedContent, reason: "invalid" }]);
    });

    test("strict:reject fires with source=paste, reason=max-length when pasted content is trimmed at end", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);
      const pastedContent = "2345678901234567999999";
      expect(pasteIntoInput(input, pastedContent)).toBe(true);
      expect(events).toEqual([{ source: "paste", rejectedInput: pastedContent, reason: "max-length" }]);
    });

    test("strict:reject does not fire when pasted content is fully accepted", async () => {
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);
      expect(pasteIntoInput(input, "2345678901")).toBe(true);
      expect(events).toEqual([]);
    });
  });

  // NATIONAL MODE DISABLED
  describe("numberDisplayFormat=INTERNATIONAL", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        strictMode: true,
        numberDisplayFormat: "INTERNATIONAL",
      };
      ({ input, iti, container } = initIntlTelInput({ options }));
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
      ({ input, iti, container } = initIntlTelInput({ options }));
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

  // NO SELECTED COUNTRY (empty/globe state): there is no country-specific max length, so we fall
  // back to the E.164 ceiling of 15 digits, which no valid number can exceed.
  describe("no selected country", () => {
    let input, iti, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        strictMode: true,
        separateDialCode: false,
      };
      ({ input, iti } = initIntlTelInput({ options }));
    });

    afterEach(() => {
      teardown(iti);
    });

    // PREV BUG: typing a dial code without the plus left the input with no max length at all
    test("caps typed digits at 15 when country code typed without plus", async () => {
      await user.type(input, "3805555555555555555555");
      expect(input.value).toBe("380555555555555");
    });

    // PREV BUG: an unrecognised dial code deselects the country, removing the max length
    test("caps typed digits at 15 after an unrecognised dial code deselects the country", async () => {
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, separateDialCode: false, initialCountry: "us" },
      }));
      await user.type(input, "+9995555555555555555555");
      expect(input.value).toBe("+999555555555555");
    });

    test("strict:reject fires with source=key, reason=max-length at the 15 digit ceiling", async () => {
      const events = [];
      await user.type(input, "380555555555555");
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.type(input, "8");
      expect(events).toEqual([{ source: "key", rejectedInput: "8", reason: "max-length" }]);
    });

    test("still applies the country max once a country is resolved from a typed plus", async () => {
      await user.type(input, "+3805555555555555555555");
      expect(stripFormattingChars(input.value)).toBe("+380555555555");
    });

    test("trims pasted digits to 15", async () => {
      await user.click(input);
      const pastedContent = "3805555555555555555555";
      expect(pasteIntoInput(input, pastedContent)).toBe(true);
      expect(input.value).toBe("380555555555555");
    });
  });

  // PREV BUG: getCoreNumber dropped leading zeros (it returned "0" for "+380000000000"), so a run of zeros
  // never reached the country max and only the E.164 ceiling of 15 digits applied. It now keeps leading
  // zeros, so the country max applies to zeros like any other digit. UA numbers have a national prefix
  // of 0 and 9 core digits, so 10 typed zeros are accepted (prefix + 9 core) and the 11th is rejected.
  describe("input of leading zeros", () => {
    let input, iti, user;

    afterEach(() => {
      teardown(iti);
    });

    test("caps typed zeros at the country max", async () => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, separateDialCode: false, initialCountry: "ua" },
      }));
      await user.type(input, "+38000000000000000000");
      expect(stripFormattingChars(input.value)).toBe("+3800000000000");
    });

    test("caps typed zeros followed by other digits at the country max", async () => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, separateDialCode: false, initialCountry: "ua" },
      }));
      await user.type(input, "+3800000000001234567890");
      expect(stripFormattingChars(input.value)).toBe("+3800000000001");
    });

    test("applies the country max to zeros with separateDialCode", async () => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, initialCountry: "ua" },
      }));
      await user.type(input, "00000000000000000000");
      expect(stripFormattingChars(input.value)).toBe("0000000000");
    });

    test("trims pasted zeros to the country max", async () => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, separateDialCode: false, initialCountry: "ua" },
      }));
      await user.click(input);
      expect(pasteIntoInput(input, "+38000000000000000000")).toBe(true);
      expect(stripFormattingChars(input.value)).toBe("+3800000000000");
    });

    // the national prefix is legitimately stripped from the core number, so make sure normal national
    // format entry still works
    test("still allows a national number with its national prefix", async () => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({
        options: { strictMode: true, separateDialCode: false, initialCountry: "gb" },
      }));
      await user.type(input, "07901234567890");
      expect(stripFormattingChars(input.value)).toBe("07901234567");
    });
  });

  describe("Android paste handling", () => {
    let input, iti, user, container;

    beforeEach(() => {
      user = userEvent.setup();
      vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(
        "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36",
      );
    });

    afterEach(() => {
      teardown(iti);
    });

    test("handles pasted plus as paste instead of opening country search", async () => {
      ({ input, iti, container } = initIntlTelInput({
        options: {
          strictMode: true,
          separateDialCode: true,
          initialCountry: "us",
        },
      }));
      await user.click(input);

      expect(pasteIntoInput(input, "+")).toBe(true);
      expect(isCountrySelectorOpen(container)).toBe(false);
      expect(input.value).toBe("+");
    });

    test("handles pasted invalid chars as paste instead of Android typed input", async () => {
      ({ input, iti } = initIntlTelInput({
        options: {
          strictMode: true,
          initialCountry: "us",
        },
      }));
      const events = [];
      input.addEventListener("strict:reject", (e) => events.push(e.detail));
      await user.click(input);

      expect(pasteIntoInput(input, " ")).toBe(true);
      expect(events).toEqual([{ source: "paste", rejectedInput: " ", reason: "invalid" }]);
      expect(input.value).toBe("");
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
      ({ input, iti, container } = initIntlTelInput({ options }));
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
      pasteIntoInput(input, "a9871234567");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(false);
    });

    test("adds iti__strict-reject-animation class when every pasted character is stripped", async () => {
      await user.click(input);
      pasteIntoInput(input, "abc");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("adds iti__strict-reject-animation class when a paste is fully rejected (max-length in middle)", async () => {
      await user.type(input, "7021234567");
      // caret now at end; move it into the middle
      input.setSelectionRange(5, 5);
      pasteIntoInput(input, "99999999");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(true);
    });

    test("no iti__strict-reject-animation class when option is explicitly disabled", async () => {
      teardown(iti);
      ({ input, iti, container } = initIntlTelInput({ options: { initialCountry: "us", strictMode: true, strictRejectAnimation: false } }));
      await user.type(input, "a");
      expect(container.classList.contains("iti__strict-reject-animation")).toBe(false);
    });
  });

  // PREV BUG: https://github.com/jackocnr/intl-tel-input/issues/2213
  // Gambia allows 7 or 9 digit numbers (but not 8), so the max length can't be found by appending digits to the 7-digit example number
  describe("country with non-contiguous valid lengths (Gambia)", () => {
    let input, iti, user;

    beforeEach(() => {
      user = userEvent.setup();
    });

    afterEach(() => {
      teardown(iti);
    });

    test("allows typing a 9 digit number, but not a 10th digit", async () => {
      ({ input, iti } = initIntlTelInput({ options: { initialCountry: "gm", strictMode: true } }));
      await user.type(input, "877546513");
      expect(iti.getNumber()).toBe("+220877546513");
      expect(iti.isValidNumber()).toBe(true);
      await user.type(input, "1");
      expect(iti.getNumber()).toBe("+220877546513");
    });

    test("still allows typing a 7 digit number", async () => {
      ({ input, iti } = initIntlTelInput({ options: { initialCountry: "gm", strictMode: true } }));
      await user.type(input, "3012345");
      expect(iti.getNumber()).toBe("+2203012345");
      expect(iti.isValidNumber()).toBe(true);
    });

    test("respects allowedNumberTypes when calculating the max length", async () => {
      ({ input, iti } = initIntlTelInput({ options: { initialCountry: "gm", strictMode: true, allowedNumberTypes: ["MOBILE"] } }));
      await user.type(input, "877546513");
      expect(iti.getNumber()).toBe("+220877546513");
      expect(iti.isValidNumber()).toBe(true);
    });

    test("allows pasting a 9 digit number", async () => {
      ({ input, iti } = initIntlTelInput({ options: { initialCountry: "gm", strictMode: true } }));
      pasteIntoInput(input, "877546513");
      expect(iti.getNumber()).toBe("+220877546513");
    });
  });

  // PREV BUG: in countries where a leading zero is part of the number itself (not a national prefix),
  // e.g. Benin, Côte d'Ivoire, Italy, getCoreNumber dropped the zero, so a complete number measured one
  // digit short of the max and strictMode let one extra digit through
  describe("country whose numbers start with a leading zero (Benin)", () => {
    let input, iti, user;

    beforeEach(() => {
      user = userEvent.setup();
      ({ input, iti } = initIntlTelInput({ options: { initialCountry: "bj", strictMode: true } }));
    });

    afterEach(() => {
      teardown(iti);
    });

    test("getCoreNumber keeps a leading zero that is part of the number, but still strips a national prefix", () => {
      expect(intlTelInput.utils.getCoreNumber("+2290195123456", "bj")).toBe("0195123456");
      expect(intlTelInput.utils.getCoreNumber("0612345678", "it")).toBe("0612345678");
      expect(intlTelInput.utils.getCoreNumber("07400123456", "gb")).toBe("7400123456");
    });

    test("allows typing the complete number, but not an extra digit", async () => {
      await user.type(input, "0195123456");
      expect(iti.getNumber()).toBe("+2290195123456");
      expect(iti.isValidNumber()).toBe(true);
      await user.type(input, "1");
      expect(iti.getNumber()).toBe("+2290195123456");
    });

    test("trims a pasted number with an extra digit", async () => {
      pasteIntoInput(input, "01951234561");
      expect(iti.getNumber()).toBe("+2290195123456");
    });
  });

  // The max length is found by probing a run of 9s (see #updateMaxCoreNumberLength). That relies on libphonenumber's parser leaving the 9s intact for every country, which is a property of its metadata, so guard it: probing with other digits must agree, and the result must be the longest length that validation accepts.
  describe("max length probe assumption holds for every country", () => {
    const probe = (dialCode, iso2, digit) => {
      let number = `+${dialCode}${digit.repeat(15)}`;
      while (number.length > dialCode.length + 1 && !intlTelInput.utils.isValidNumber(number, iso2)) {
        number = number.slice(0, -1);
      }
      return intlTelInput.utils.getCoreNumber(number, iso2).length;
    };

    test.each(intlTelInput.getAllCountries().map((c) => [c.iso2, c.dialCode]))("%s", (iso2, dialCode) => {
      const max = probe(dialCode, iso2, "9");
      expect(max).toBeGreaterThan(0);
      expect(probe(dialCode, iso2, "5")).toBe(max);
      expect(probe(dialCode, iso2, "2")).toBe(max);
      // a 9s number one digit longer than the max must be rejected, so the loop really did stop at the longest valid length (unless we hit the E.164 ceiling, which caps the probe before libphonenumber does e.g. ID and JP have 17 digit possible lengths)
      if (max < 15) {
        expect(intlTelInput.utils.isValidNumber(`+${dialCode}${"9".repeat(max + 1)}`, iso2)).toBe(false);
      }
    });
  });
});






// // LONG RUNNING TESTS - RUN MANUALLY FROM TIME TO TIME
// // NOTE: these take so long they crash travis. BUT they run ok locally, they just take about 60 seconds.

// const { intlTelInput } = require("../helpers/helpers");
// const allCountries = intlTelInput.getAllCountries();
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
//     ({ input, iti, container } = initIntlTelInput({ options }));
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
//     ({ input, iti, container } = initIntlTelInput({ options }));
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
//     ({ input, iti, container } = initIntlTelInput({ options }));
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
