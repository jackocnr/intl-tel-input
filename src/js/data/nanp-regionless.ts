import { DIAL } from "../constants";
import { getNumeric } from "../helpers/string";

// NANP (North American Numbering Plan) countries (e.g. USA, Canada, and many more) use +1 as their international dial code

//* https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
// e.g. +1800 is a toll-free number, which can be used across NANP countries and is not associated with any specific country
// NOTE: this export is used in the tests!
export const regionlessNanpNumbers = new Set([
  "800",
  "822",
  "833",
  "844",
  "855",
  "866",
  "877",
  "880",
  "881",
  "882",
  "883",
  "884",
  "885",
  "886",
  "887",
  "888",
  "889",
]);

//* Check if the given number is a regionless NANP number (expects the number to contain an international dial code)
export const isRegionlessNanp = (number: string): boolean => {
  const numeric = getNumeric(number);
  if (numeric.startsWith(DIAL.NANP) && numeric.length >= 4) {
    const areaCode = numeric.substring(1, 4);
    return regionlessNanpNumbers.has(areaCode);
  }
  return false;
};
