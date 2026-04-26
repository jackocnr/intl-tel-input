/**
 * @vitest-environment node
 */

import { isRegionlessNanp, regionlessNanpAreaCodes } from "../../../packages/core/src/js/data/nanp-regionless.ts";

const regionlessNanpAreaCodesArray = Array.from(regionlessNanpAreaCodes);

describe("data/nanp-regionless", () => {
  test("identifies known regionless NANP numbers", () => {
    for (const ac of regionlessNanpAreaCodesArray.slice(0,3)) {
      expect(isRegionlessNanp(`+1${ac}1234567`)).toBe(true);
    }
  });

  test("non NANP or non-regionless returns false", () => {
    expect(isRegionlessNanp("+441234567890")).toBe(false);
  });
});
