/**
 * @vitest-environment node
 */

import { getNumeric, normaliseString } from "../../../packages/core/src/js/helpers/string.ts";

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

  test("getNumeric returns empty string for no digits", () => {
    expect(getNumeric("abc-def")).toBe("");
    expect(getNumeric("")).toBe("");
  });

  test("getNumeric excludes eastern / arabic-indic numerals (ASCII-only)", () => {
    // \D excludes non-ASCII digits, so these should yield empty strings
    expect(getNumeric("٠١٢٣٤")).toBe(""); // Arabic-Indic
    expect(getNumeric("۰۱۲۳۴")).toBe(""); // Extended Arabic-Indic (Persian)
    expect(getNumeric("०१२३४")).toBe(""); // Devanagari
  });

  test("getNumeric preserves digits mixed with unicode text", () => {
    expect(getNumeric("Réunion 123")).toBe("123");
  });

  test("normaliseString handles mixed case unicode", () => {
    expect(normaliseString("ÉLÉPHANT")).toBe("elephant");
  });

  test("normaliseString strips combining marks from decomposed input", () => {
    // "e" + combining acute accent (U+0301)
    expect(normaliseString("e\u0301")).toBe("e");
  });

  test("normaliseString leaves non-latin scripts but lowercases them", () => {
    expect(normaliseString("БЪЛГАРИЯ")).toBe("българия");
    expect(normaliseString("日本")).toBe("日本");
  });

  test("normaliseString strips various diacritic classes", () => {
    expect(normaliseString("Ça va")).toBe("ca va"); // cedilla
    expect(normaliseString("naïve")).toBe("naive"); // diaeresis
    expect(normaliseString("Ñoño")).toBe("nono"); // tilde
  });
});
