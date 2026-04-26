/**
 * @vitest-environment node
 */

import { Numerals } from "../../../src/js/core/numerals.ts";

// Unicode reference:
//   Arabic-Indic: U+0660 (٠) – U+0669 (٩)
//   Persian:      U+06F0 (۰) – U+06F9 (۹)
const ARABIC_INDIC_01234 = "\u0660\u0661\u0662\u0663\u0664";
const ARABIC_INDIC_56789 = "\u0665\u0666\u0667\u0668\u0669";
const PERSIAN_01234 = "\u06F0\u06F1\u06F2\u06F3\u06F4";
const PERSIAN_56789 = "\u06F5\u06F6\u06F7\u06F8\u06F9";

// ── constructor ────────────────────────────────────────────────
describe("Numerals constructor", () => {
  test("detects ASCII from initial value", () => {
    const n = new Numerals("12345");
    expect(n.isAscii()).toBe(true);
  });

  test("detects Arabic-Indic from initial value", () => {
    const n = new Numerals(ARABIC_INDIC_01234);
    expect(n.isAscii()).toBe(false);
  });

  test("detects Persian from initial value", () => {
    const n = new Numerals(PERSIAN_01234);
    expect(n.isAscii()).toBe(false);
  });

  test("treats empty initial value as unknown (isAscii true)", () => {
    const n = new Numerals("");
    expect(n.isAscii()).toBe(true);
  });
});

// ── isAscii ────────────────────────────────────────────────────
describe("Numerals.isAscii", () => {
  test("returns true when numeral set is not yet determined", () => {
    const n = new Numerals("");
    expect(n.isAscii()).toBe(true);
  });

  test("returns true after normalising ASCII digits", () => {
    const n = new Numerals("");
    n.normalise("555");
    expect(n.isAscii()).toBe(true);
  });

  test("returns false after normalising Arabic-Indic digits", () => {
    const n = new Numerals("");
    n.normalise(ARABIC_INDIC_01234);
    expect(n.isAscii()).toBe(false);
  });

  test("returns false after normalising Persian digits", () => {
    const n = new Numerals("");
    n.normalise(PERSIAN_01234);
    expect(n.isAscii()).toBe(false);
  });
});

// ── normalise ──────────────────────────────────────────────────
describe("Numerals.normalise", () => {
  test("returns empty string for falsy input", () => {
    const n = new Numerals("");
    expect(n.normalise("")).toBe("");
    expect(n.normalise(undefined)).toBe("");
    expect(n.normalise(null)).toBe("");
  });

  test("passes ASCII digits through unchanged", () => {
    const n = new Numerals("");
    expect(n.normalise("0123456789")).toBe("0123456789");
  });

  test("converts Arabic-Indic digits to ASCII", () => {
    const n = new Numerals("");
    expect(n.normalise(ARABIC_INDIC_01234)).toBe("01234");
    expect(n.normalise(ARABIC_INDIC_56789)).toBe("56789");
  });

  test("converts Persian digits to ASCII", () => {
    const n = new Numerals("");
    expect(n.normalise(PERSIAN_01234)).toBe("01234");
    expect(n.normalise(PERSIAN_56789)).toBe("56789");
  });

  test("preserves non-digit characters in Arabic-Indic input", () => {
    const n = new Numerals("");
    expect(n.normalise(`+${ARABIC_INDIC_01234}-${ARABIC_INDIC_56789}`)).toBe(
      "+01234-56789",
    );
  });

  test("preserves non-digit characters in Persian input", () => {
    const n = new Numerals("");
    expect(n.normalise(`+${PERSIAN_01234} ${PERSIAN_56789}`)).toBe(
      "+01234 56789",
    );
  });

  test("updates numeral set detection on each call", () => {
    const n = new Numerals("");
    n.normalise("123");
    expect(n.isAscii()).toBe(true);
    n.normalise(ARABIC_INDIC_01234);
    expect(n.isAscii()).toBe(false);
  });
});

// ── denormalise ────────────────────────────────────────────────
describe("Numerals.denormalise", () => {
  test("returns ASCII digits as-is when numeral set is unknown", () => {
    const n = new Numerals("");
    expect(n.denormalise("01234")).toBe("01234");
  });

  test("returns ASCII digits as-is when numeral set is ASCII", () => {
    const n = new Numerals("123");
    expect(n.denormalise("56789")).toBe("56789");
  });

  test("converts ASCII to Arabic-Indic when set is Arabic-Indic", () => {
    const n = new Numerals(ARABIC_INDIC_01234);
    expect(n.denormalise("01234")).toBe(ARABIC_INDIC_01234);
    expect(n.denormalise("56789")).toBe(ARABIC_INDIC_56789);
  });

  test("converts ASCII to Persian when set is Persian", () => {
    const n = new Numerals(PERSIAN_01234);
    expect(n.denormalise("01234")).toBe(PERSIAN_01234);
    expect(n.denormalise("56789")).toBe(PERSIAN_56789);
  });

  test("preserves non-digit characters", () => {
    const n = new Numerals(ARABIC_INDIC_01234);
    expect(n.denormalise("+01234-56789")).toBe(
      `+${ARABIC_INDIC_01234}-${ARABIC_INDIC_56789}`,
    );
  });
});

// ── Numerals.toAscii (static, stateless) ───────────────────────
describe("Numerals.toAscii", () => {
  test("returns empty string for falsy input", () => {
    expect(Numerals.toAscii("")).toBe("");
    expect(Numerals.toAscii(undefined)).toBe("");
    expect(Numerals.toAscii(null)).toBe("");
  });

  test("passes ASCII through unchanged", () => {
    expect(Numerals.toAscii("+1 (234) 56-78")).toBe("+1 (234) 56-78");
  });

  test("converts Arabic-Indic digits to ASCII", () => {
    expect(Numerals.toAscii(`+${ARABIC_INDIC_01234}${ARABIC_INDIC_56789}`)).toBe(
      "+0123456789",
    );
  });

  test("converts Persian digits to ASCII", () => {
    expect(Numerals.toAscii(`+${PERSIAN_01234}${PERSIAN_56789}`)).toBe(
      "+0123456789",
    );
  });

  test("does not affect any instance's tracked numeral set", () => {
    const n = new Numerals(ARABIC_INDIC_01234);
    expect(n.isAscii()).toBe(false);
    Numerals.toAscii(PERSIAN_01234);
    // Instance state untouched by static call.
    expect(n.isAscii()).toBe(false);
  });
});

// ── round-trip normalise → denormalise ─────────────────────────
describe("Numerals round-trip", () => {
  test("Arabic-Indic survives normalise then denormalise", () => {
    const n = new Numerals("");
    const original = ARABIC_INDIC_01234 + ARABIC_INDIC_56789;
    const normalised = n.normalise(original);
    expect(normalised).toBe("0123456789");
    const restored = n.denormalise(normalised);
    expect(restored).toBe(original);
  });

  test("Persian survives normalise then denormalise", () => {
    const n = new Numerals("");
    const original = PERSIAN_01234 + PERSIAN_56789;
    const normalised = n.normalise(original);
    expect(normalised).toBe("0123456789");
    const restored = n.denormalise(normalised);
    expect(restored).toBe(original);
  });

  test("ASCII survives normalise then denormalise", () => {
    const n = new Numerals("");
    const normalised = n.normalise("0123456789");
    expect(n.denormalise(normalised)).toBe("0123456789");
  });

  test("phone number with formatting round-trips correctly", () => {
    const n = new Numerals("");
    // Simulate an Arabic-Indic phone number: +٩٦٦ ٥١٢ ٣٤٥ ٦٧٨
    const arabicPhone = `+\u0669\u0666\u0666 \u0665\u0661\u0662 \u0663\u0664\u0665 \u0666\u0667\u0668`;
    const normalised = n.normalise(arabicPhone);
    expect(normalised).toBe("+966 512 345 678");
    expect(n.denormalise(normalised)).toBe(arabicPhone);
  });
});
