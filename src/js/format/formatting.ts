import type { ItiUtils, SelectedCountryData } from "../types/public-api";

//* Remove the dial code if separateDialCode is enabled
export const beforeSetNumber = (
  fullNumber: string,
  hasValidDialCode: boolean,
  separateDialCode: boolean,
  selectedCountryData: SelectedCountryData,
): string => {
  if (!separateDialCode || !hasValidDialCode) {
    return fullNumber;
  }

  //* In case _getDialCode returned an area code as well.
  const dialCode = `+${selectedCountryData!.dialCode}`;
  //* a lot of numbers will have a space separating the dial code and the main number, and
  //* some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it.
  //* NOTE: Don't just trim all non-numerics as may want to preserve an open parenthesis etc.
  const start =
    fullNumber[dialCode.length] === " " || fullNumber[dialCode.length] === "-"
      ? dialCode.length + 1
      : dialCode.length;
  return fullNumber.substring(start);
};

//* Format the number as the user types.
export const formatNumberAsYouType = (
  fullNumber: string,
  telInputValue: string,
  utils: ItiUtils | undefined,
  selectedCountryData: SelectedCountryData,
  separateDialCode: boolean,
): string => {
  const result = utils
    ? utils.formatNumberAsYouType(fullNumber, selectedCountryData?.iso2)
    : fullNumber;
  //* If separateDialCode and they haven't (re)typed the dial code in the input as well, then remove the dial code.
  const dialCode = selectedCountryData?.dialCode;
  if (
    separateDialCode &&
    telInputValue.charAt(0) !== "+" &&
    result.includes(`+${dialCode}`)
  ) {
    const afterDialCode = result.split(`+${dialCode}`)[1] || "";
    return afterDialCode.trim();
  }
  return result;
};
