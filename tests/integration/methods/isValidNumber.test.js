/**
 * @jest-environment jsdom
 */

const { initPlugin, teardown, intlTelInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("isValidNumber method", () => {
  let iti, input, user, utilsBackup;

  beforeEach(() => {
    ({ iti, input } = initPlugin());
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

  test("returns null when utils script is not available", async () => {
    // simulate utils unavailable AFTER init
    intlTelInput.utils = null;
    await user.type(input, "+44 7733 123456");
    expect(iti.isValidNumber()).toBeNull();
  });
});
