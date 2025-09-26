import { DIAL } from "../constants";
import { getNumeric } from "../utils/string";

//* https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
export const regionlessNanpNumbers = [
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
];

//* Check if the given number is a regionless NANP number (expects the number to contain an international dial code)
export const isRegionlessNanp = (number: string): boolean => {
  const numeric = getNumeric(number);
  if (numeric.startsWith(DIAL.NANP) && numeric.length >= 4) {
    const areaCode = numeric.substring(1, 4);
    return regionlessNanpNumbers.includes(areaCode);
  }
  return false;
};
