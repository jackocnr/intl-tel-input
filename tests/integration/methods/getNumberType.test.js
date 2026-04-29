/**
 * @vitest-environment jsdom
 */

import { initIntlTelInput, teardown } from "../helpers/helpers";

describe("getNumberType method", () => {
  let iti;

  beforeEach(() => {
    ({ iti } = initIntlTelInput());
  });

  afterEach(() => {
    teardown(iti);
  });

  test("returns the right type for a UK mobile number", async () => {
    iti.setNumber("+447733123456");
    expect(iti.getNumberType()).toEqual("MOBILE");
  });

  test("returns the right type for a UK landline number", async () => {
    iti.setNumber("+441531123456");
    expect(iti.getNumberType()).toEqual("FIXED_LINE");
  });

  test("returns the right type for a UK toll-free number", async () => {
    iti.setNumber("+448000123456");
    expect(iti.getNumberType()).toEqual("TOLL_FREE");
  });

  test("returns null for an invalid number", async () => {
    iti.setNumber("+441");
    expect(iti.getNumberType()).toBeNull();
  });

  test("returns null for empty input", async () => {
    expect(iti.getNumberType()).toBeNull();
  });

  test("ignores extension when determining type", async () => {
    iti.setNumber("+447733123456 ext. 99");
    expect(iti.getNumberType()).toEqual("MOBILE");
  });
});
