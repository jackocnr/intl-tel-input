import type { ValidationError } from "intl-tel-input";

export const getErrorMessage = (
  number: string,
  errorCode: ValidationError | null,
): string => {
  if (!number) {
    return "Please enter a number";
  }
  switch (errorCode) {
    case "INVALID_COUNTRY_CODE": return "Invalid dial code";
    case "TOO_SHORT": return "Too short";
    case "TOO_LONG": return "Too long";
    default: return "Invalid number";
  }
};
