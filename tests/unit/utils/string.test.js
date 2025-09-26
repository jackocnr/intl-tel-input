/**
 * @jest-environment node
 */

const { getNumeric, normaliseString } = require("../../../src/js/modules/utils/string.ts");

describe("utils/string", () => {
  test("getNumeric extracts digits only", () => {
    expect(getNumeric("+1 (234) 56-78 ext.90")).toBe("1234567890");
  });

  test("normaliseString lowercases and strips diacritics", () => {
    expect(normaliseString("Réunion")) .toBe("reunion");
    expect(normaliseString("Åland Islands")).toBe("aland islands");
  });

  test("normaliseString handles empty/undefined input", () => {
    expect(normaliseString()).toBe("");
  });
});
