/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");
const intlTelInputWithUtils = require("intlTelInputWithUtils.js");
const validationError = intlTelInputWithUtils.utils.validationError;

let iti, input, user;

describe("getValidationError method", () => {
  beforeEach(() => {
    ({ iti, input } = initPlugin());
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("too short", async () => {
    await user.type(input, "+4477");
    expect(iti.getValidationError()).toEqual(validationError.TOO_SHORT);
  });

  test("too long", async () => {
    await user.type(input, "+447733123456789");
    expect(iti.getValidationError()).toEqual(validationError.TOO_LONG);
  });

  test("invalid country code", async () => {
    await user.type(input, "+969");
    expect(iti.getValidationError()).toEqual(validationError.INVALID_COUNTRY_CODE);
  });
});
