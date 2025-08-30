/**
 * @jest-environment jsdom
 */

const { initPlugin, teardown } = require("../helpers/helpers");
const intlTelInputWithUtils = require("intlTelInputWithUtils.js");
const numberType = intlTelInputWithUtils.utils.numberType;

let iti;

describe("getNumberType method", () => {
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
});
