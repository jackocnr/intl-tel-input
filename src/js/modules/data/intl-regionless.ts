import { getNumeric } from "../utils/string";

// Non-geographic / regionless international dial codes that should always be
// treated as international numbers (no associated ISO2 country).
export const REGIONLESS_DIAL_CODES: Set<string> = new Set([
  "800",
  "808",
  "870",
  "881",
  "882",
  "883",
  "888",
  "979",
]);

export const hasRegionlessDialCode = (number: string): boolean => {
  const dialCode = getNumeric(number).slice(0, 3);
  return number.startsWith("+") && REGIONLESS_DIAL_CODES.has(dialCode);
};
