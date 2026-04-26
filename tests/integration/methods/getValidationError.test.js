/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("getValidationError method", () => {
  let iti, input, user;

  beforeEach(() => {
    ({ iti, input } = initPlugin({ options: { separateDialCode: false, strictMode: false } }));
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("too short", async () => {
    await user.type(input, "+4477");
    expect(iti.getValidationError()).toEqual("TOO_SHORT");
  });

  test("too long", async () => {
    await user.type(input, "+447733123456789");
    expect(iti.getValidationError()).toEqual("TOO_LONG");
  });

  test("invalid dial code", async () => {
    await user.type(input, "+969");
    expect(iti.getValidationError()).toEqual("INVALID_COUNTRY_CODE");
  });

  test("valid number returns IS_POSSIBLE", async () => {
    await user.type(input, "+447733123456");
    expect(iti.getValidationError()).toEqual("IS_POSSIBLE");
  });

  test("empty input returns INVALID_COUNTRY_CODE", () => {
    expect(iti.getValidationError()).toEqual("INVALID_COUNTRY_CODE");
  });

  test("ignores extension when validating", async () => {
    await user.type(input, "+447733123456 ext. 99");
    expect(iti.getValidationError()).toEqual("IS_POSSIBLE");
  });
});
