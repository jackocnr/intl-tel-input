/**
 * @vitest-environment node
 */

import { stripSeparateDialCode, formatNumberAsYouType } from "../../../packages/core/src/js/format/formatting.ts";

describe("format/formatting stripSeparateDialCode", () => {
  const selected = { dialCode: "44" };

  test("removes dial code when separateDialCode and present", () => {
    const out = stripSeparateDialCode("+44 1234", "+44", true, selected);
    expect(out).toBe("1234");
  });

  test("returns full number when separateDialCode false", () => {
    const out = stripSeparateDialCode("+44 1234", "+44", false, selected);
    expect(out).toBe("+44 1234");
  });
});

describe("format/formatting formatNumberAsYouType", () => {
  const selected = { dialCode: "44", iso2: "gb" };

  test("uses utils when provided", () => {
    const utils = { formatNumberAsYouType: vi.fn(() => "+44 1234") };
    const out = formatNumberAsYouType("+441234", "+441234", utils, selected, false);
    expect(out).toBe("+44 1234");
    expect(utils.formatNumberAsYouType).toHaveBeenCalled();
  });

  test("strips dial code for separateDialCode when not retyped", () => {
    const utils = { formatNumberAsYouType: vi.fn(() => "+44 1234") };
    const out = formatNumberAsYouType("+441234", "1234", utils, selected, true);
    expect(out).toBe("1234");
  });

  test("falls back to fullNumber when no utils", () => {
    const out = formatNumberAsYouType("+441234", "1234", null, selected, false);
    expect(out).toBe("+441234");
  });
});
