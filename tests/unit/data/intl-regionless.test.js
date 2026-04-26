/**
 * @vitest-environment node
 */

import { hasRegionlessDialCode, regionlessDialCodes } from "../../../packages/core/src/js/data/intl-regionless.ts";

describe("data/intl-regionless hasRegionlessDialCode", () => {
  test("identifies +800 (UIFS) as regionless", () => {
    expect(hasRegionlessDialCode("+80012345678")).toBe(true);
  });

  test("identifies all documented regionless codes", () => {
    for (const code of regionlessDialCodes) {
      expect(hasRegionlessDialCode(`+${code}1234567`)).toBe(true);
    }
  });

  test("returns false for country-assigned codes", () => {
    expect(hasRegionlessDialCode("+441234567890")).toBe(false); // UK
    expect(hasRegionlessDialCode("+11234567890")).toBe(false);  // NANP
  });

  test("requires leading + to match", () => {
    expect(hasRegionlessDialCode("80012345678")).toBe(false);
  });

  test("returns false for empty / too-short input", () => {
    expect(hasRegionlessDialCode("")).toBe(false);
    expect(hasRegionlessDialCode("+")).toBe(false);
    expect(hasRegionlessDialCode("+80")).toBe(false);
  });

  test("only considers the first 3 digits", () => {
    // first 3 digits are 800 -> regionless
    expect(hasRegionlessDialCode("+800999")).toBe(true);
    // first 3 are 801 (not regionless)
    expect(hasRegionlessDialCode("+801999")).toBe(false);
  });
});
