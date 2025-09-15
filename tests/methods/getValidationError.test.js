/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, intlTelInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");
const validationError = intlTelInput.utils.validationError;

describe("getValidationError method", () => {
  let iti, input, user;

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
