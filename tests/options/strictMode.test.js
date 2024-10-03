/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { initPlugin, teardown, stripFormattingChars, selectCountryAndTypePlaceholderNumberAsync } = require("../helpers/helpers");
const allCountries = require("../../build/js/data");
const countryCodes = allCountries.map((country) => country.iso2);

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
  
  test.each(countryCodes)("can type ntl placeholder number: %s", async (iso2) => {
    const placeholderNumberClean = await selectCountryAndTypePlaceholderNumberAsync(container, iso2, user, input);
    // sometimes AYT formatting is slightly different, so strip formatting chars
    expect(stripFormattingChars(input.value)).toBe(placeholderNumberClean);
  });
});

// COMMENT THESE FOR NOW AS THEY ARE CRASHING TRAVIS CI
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
