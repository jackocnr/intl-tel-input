import { SelectedCountryData } from "../types/public-api";

//* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
export const beforeSetNumber = (
  fullNumber: string,
  dialCode: string,
  separateDialCode: boolean,
  selectedCountryData: SelectedCountryData,
): string => {
  let number = fullNumber;
  if (separateDialCode) {
    //* If there is a valid dial code.
    if (dialCode) {
      //* In case _getDialCode returned an area code as well.
      dialCode = `+${selectedCountryData.dialCode}`;
      //* a lot of numbers will have a space separating the dial code and the main number, and
      //* some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it.
      //* NOTE: Don't just trim all non-numerics as may want to preserve an open parenthesis etc.
      const start =
        number[dialCode.length] === " " || number[dialCode.length] === "-"
          ? dialCode.length + 1
          : dialCode.length;
      number = number.substring(start);
    }
  }
  return number;
};

//* Format the number as the user types.
export const formatNumberAsYouType = (
  fullNumber: string,
  telInputValue: string,
  utils: any,
  selectedCountryData: SelectedCountryData,
  separateDialCode: boolean,
): string => {
  const result = utils
    ? utils.formatNumberAsYouType(fullNumber, selectedCountryData.iso2)
    : fullNumber;
  //* If separateDialCode and they haven't (re)typed the dial code in the input as well, then remove the dial code.
  const { dialCode } = selectedCountryData;
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
