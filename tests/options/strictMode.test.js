/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { initPlugin, teardown, stripFormattingChars, selectCountryAndTypePlaceholderNumberAsync } = require("../helpers/helpers");

let input, iti, user, container;

describe("strictMode", () => {
  beforeEach(() => {
    user = userEvent.setup();
    const options = {
      initialCountry: "us",
      strictMode: true,
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
  
  test("ignore chars after max length", async () => {
    await user.type(input, "70212345678");
    expect(input.value).toBe("(702) 123-4567");
  });
  
  test("can type Russian ntl placeholder number", async () => {
    const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, "ru", user, input);
    // sometimes AYT formatting is slightly different, so strip formatting chars
    expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
  });
});



// LONG RUNNING TESTS - RUN MANUALLY FROM TIME TO TIME
// NOTE: these take so long they crash travis

// const allCountries = require("../../build/js/data");
// const countryCodes = allCountries.map((country) => country.iso2);

// // NATIONAL MODE ENABLED
// describe("strictMode, with nationalMode=true", () => {
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
  
//   test.each(countryCodes)("can type intl placeholder number: %s", async (iso2) => {
//     const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });

// // NATIONAL MODE DISABLED
// describe("strictMode, with nationalMode=false", () => {
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
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });

// // SEPARATE DIAL CODE ENABLED
// describe("strictMode, with separateDialCode=true", () => {
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
//     // sometimes AYT formatting is slightly different, so strip formatting chars
//     expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
//   });
// });
