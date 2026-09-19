/**
 * @vitest-environment node
 */

import ga from "../../../packages/core/src/js/locale/ga.ts";
import mt from "../../../packages/core/src/js/locale/mt.ts";

describe("locale/ga searchSummaryAria", () => {
  // Irish keeps the noun singular after a number, but the initial mutation
  // depends on the count: 2-6 lenition, 7-10 eclipsis, otherwise none.
  test.each([
    [0, "Níor aimsíodh aon torthaí"],
    [1, "1 toradh aimsithe"],
    [2, "2 thoradh aimsithe"],
    [6, "6 thoradh aimsithe"],
    [7, "7 dtoradh aimsithe"],
    [10, "10 dtoradh aimsithe"],
    [11, "11 toradh aimsithe"],
    [20, "20 toradh aimsithe"],
    [100, "100 toradh aimsithe"],
  ])("count %i", (count, expected) => {
    expect(ga.searchSummaryAria(count)).toBe(expected);
  });
});

describe("locale/mt searchSummaryAria", () => {
  // Maltese uses the plural noun for numbers ending in 2-10, "-il" plus the
  // singular for numbers ending in 11-19, and the singular otherwise.
  test.each([
    [0, "Ma nstabux riżultati"],
    [1, "Instab riżultat 1"],
    [2, "Instabu 2 riżultati"],
    [10, "Instabu 10 riżultati"],
    [11, "Instabu 11-il riżultat"],
    [19, "Instabu 19-il riżultat"],
    [20, "Instabu 20 riżultat"],
    [101, "Instabu 101 riżultat"],
    [102, "Instabu 102 riżultati"],
    [110, "Instabu 110 riżultati"],
    [111, "Instabu 111-il riżultat"],
  ])("count %i", (count, expected) => {
    expect(mt.searchSummaryAria(count)).toBe(expected);
  });
});
