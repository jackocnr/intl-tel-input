/**
 * @vitest-environment jsdom
 */

import { initPlugin, teardown, intlTelInput } from "../helpers/helpers";
const numberType = intlTelInput.utils.numberType;

describe("getNumberType method", () => {
  let iti;

  beforeEach(() => {
    ({ iti } = initPlugin());
  });

  afterEach(() => {
    teardown(iti);
  });

  test("returns the right type for a UK mobile number", async () => {
    iti.setNumber("+447733123456");
    expect(iti.getNumberType()).toEqual(numberType.MOBILE);
  });

  test("returns the right type for a UK landline number", async () => {
    iti.setNumber("+441531123456");
    expect(iti.getNumberType()).toEqual(numberType.FIXED_LINE);
  });

  test("returns the right type for a UK toll-free number", async () => {
    iti.setNumber("+448000123456");
    expect(iti.getNumberType()).toEqual(numberType.TOLL_FREE);
  });

  test("returns -99 for an invalid number", async () => {
    iti.setNumber("+441");
    expect(iti.getNumberType()).toEqual(-99);
  });

  test("returns -99 for empty input", async () => {
    expect(iti.getNumberType()).toEqual(-99);
  });

  test("ignores extension when determining type", async () => {
    iti.setNumber("+447733123456 ext. 99");
    expect(iti.getNumberType()).toEqual(numberType.MOBILE);
  });
});
