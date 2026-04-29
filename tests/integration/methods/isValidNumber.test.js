/**
 * @vitest-environment jsdom
 */

import { initIntlTelInput, teardown, intlTelInput } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("isValidNumber method", () => {
  let iti, input, user, utilsBackup;

  beforeEach(() => {
    ({ iti, input } = initIntlTelInput({ options: { separateDialCode: false, strictMode: false } }));
    user = userEvent.setup();
    utilsBackup = intlTelInput.utils;
  });

  afterEach(() => {
    teardown(iti);
    // replace intlTelInput.utils after setting it to null in one of the tests
    intlTelInput.utils = utilsBackup;
  });

  test("returns true for: valid intl number", async () => {
    await user.type(input, "+44 7733 123456");
    expect(iti.isValidNumber()).toBe(true);
  });

  test("returns true for: possible but invalid (bad dial code) intl number", async () => {
    await user.type(input, "+44 9999 123456");
    expect(iti.isValidNumber()).toBe(true);
  });

  test("returns false for: invalid (too short) intl number", async () => {
    await user.type(input, "+44 7733 1234");
    expect(iti.isValidNumber()).toBe(false);
  });

  test("returns false for: invalid (too long) intl number", async () => {
    await user.type(input, "+44 7733 1234567");
    expect(iti.isValidNumber()).toBe(false);
  });

  test("throws when utils script is not available", async () => {
    // simulate utils unavailable AFTER init
    intlTelInput.utils = null;
    await user.type(input, "+44 7733 123456");
    expect(() => iti.isValidNumber()).toThrow();
  });
});

describe("isValidNumber method - NANP Barbados", () => {
  let iti, input, user;
  const options = { initialCountry: "bb" };

  beforeEach(() => {
    ({ iti, input } = initIntlTelInput({ options }));
    user = userEvent.setup();
  });

  afterEach(() => {
    teardown(iti);
  });

  test("returns false for: NANP partial number that libphonenumber could auto-complete with area code", async () => {
    // Barbados (bb) has area code 246 and expects 10-digit national numbers.
    // Typing "2462501" (7 digits) should be invalid - it must not be auto-completed
    // by libphonenumber prepending area code "246" to yield "2462462501" (10 digits).
    await user.type(input, "2462501");
    expect(iti.isValidNumber()).toBe(false);
  });

  test("returns true for: full NANP Barbados number", async () => {
    await user.type(input, "2462501234");
    expect(iti.isValidNumber()).toBe(true);
  });
});



// // LONG RUNNING TESTS - RUN MANUALLY FROM TIME TO TIME

// // NOTE: none of these are NANP countries
// const countriesAllowingOneLessDigit = ["af", "ax", "al", "dz", "ar", "am", "at", "az", "by", "be", "bt", "ba", "bw", "br", "bg", "kh", "cn", "cd", "hr", "cw", "ec", "er", "ee", "et", "fi", "fr", "gf", "ga", "de", "gp", "gn", "hu", "ir", "it", "jo", "kz", "ke", "ki", "xk", "kg", "la", "lb", "lr", "ly", "li", "lt", "mg", "mw", "mq", "mu", "yt", "md", "mc", "me", "ma", "mz", "mm", "na", "nz", "ng", "nu", "kp", "mk", "ps", "pa", "pg", "py", "pe", "pl", "re", "ro", "ru", "rw", "sa", "rs", "sl", "sk", "sb", "so", "za", "kr", "ss", "lk", "bl", "sh", "mf", "pm", "sd", "sr", "se", "ch", "sy", "tw", "tz", "th", "tl", "to", "tr", "tm", "tv", "ug", "ua", "ae", "vu", "va", "ve", "eh", "ye", "zm"];

// const countriesAllowingMultipleLessDigits = ["ax", "dz", "ar", "at", "by", "be", "bg", "cd", "ec", "fi", "hu", "jo", "ke", "ki", "lr", "li", "mw", "mc", "na", "nu", "ps", "py", "pl", "ro", "rw", "sk", "sb", "so", "za", "se", "sy", "th", "to", "vu", "ye"];

// const {
//   stripFormattingChars,
//   openDropdownSelectCountryAsync,
// } = require("../helpers/helpers");
// const allCountries = intlTelInput.getCountryData();
// const iso2Codes = allCountries.map((country) => country.iso2).filter((iso2) => !countriesAllowingMultipleLessDigits.includes(iso2));

// describe("isValidNumber: each digit of placeholder number", () => {
//   let input, iti, user, container;

//   beforeEach(() => {
//     user = userEvent.setup();
//     const options = {
//       placeholderNumberType: "MOBILE",
//       allowedNumberTypes: ["MOBILE"],
//     };
//     ({ input, iti, container } = initIntlTelInput({ options }));
//   });

//   afterEach(() => {
//     teardown(iti);
//   });

//   test.each(iso2Codes)("returns false until full placeholder number is typed: %s", async (iso2) => {
//     await openDropdownSelectCountryAsync(container, iso2, user);
//     const placeholder = input.getAttribute("placeholder");
//     const digits = stripFormattingChars(placeholder);
//     // type each digit one at a time, checking isValidNumber after each
//     for (let i = 0; i < digits.length - 1; i++) {
//       await user.type(input, digits[i]);

//       if (countriesAllowingOneLessDigit.includes(iso2) && i === digits.length - 2) {
//         // for these countries, the penultimate digit is allowed to be missing, so it should be valid at this point
//         expect(iti.isValidNumber()).toBe(true);
//       } else {
//         // for all other countries, it should still be invalid
//         // include the input value in the assertion message for easier debugging if it fails
//         expect(`${input.value}: ${iti.isValidNumber()}`).toBe(`${input.value}: false`);
//       }
//     }
//     // type the final digit - now it should be valid
//     await user.type(input, digits[digits.length - 1]);
//     expect(iti.isValidNumber()).toBe(true);
//   });
// });

