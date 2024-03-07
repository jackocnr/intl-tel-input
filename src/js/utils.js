goog.provide("i18n.phonenumbers.demo");
// includes
goog.require("i18n.phonenumbers.PhoneNumberFormat");
goog.require("i18n.phonenumbers.PhoneNumberUtil");
goog.require("i18n.phonenumbers.Error");
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

// format the number as the user types
const formatNumberAsYouType = (number, countryCode) => {
  try {
    // have to clean it first, as AYTF stops formatting as soon as it hits any formatting char (even it's own)
    // (it's designed to be fed one char at a time, as opposed to every char every time)
    const clean = number.replace(/[^+0-9]/g, "");
    const formatter = new i18n.phonenumbers.AsYouTypeFormatter(countryCode);
    let result = "";
    for (let i = 0; i < clean.length; i++) {
      result = formatter.inputDigit(clean.charAt(i));
    }
    return result;
  } catch (e) {
    return number;
  }
};

// format the given number to the given format
const formatNumber = (number, countryCode, formatArg) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    if (phoneUtil.isPossibleNumber(numberObj)) {
      const format =
        typeof formatArg === "undefined"
          ? i18n.phonenumbers.PhoneNumberFormat.E164
          : formatArg;
      return phoneUtil.format(numberObj, format);
    }
    return number;
  } catch (e) {
    return number;
  }
};

// get an example number for the given country code
const getExampleNumber = (countryCode, national, numberType) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.getExampleNumberForType(
      countryCode,
      numberType
    );
    const format = national
      ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL
      : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL;
    return phoneUtil.format(numberObj, format);
  } catch (e) {
    return "";
  }
};

// get the extension from the given number
const getExtension = (number, countryCode) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return numberObj.getExtension();
  } catch (e) {
    return "";
  }
};

// get the type of the given number e.g. fixed-line/mobile
const getNumberType = (number, countryCode) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.getNumberType(numberObj);
  } catch (e) {
    // broken
    return -99;
  }
};

// get more info if the validation has failed e.g. too long/too short
// NOTE that isPossibleNumberWithReason returns a i18n.phonenumbers.PhoneNumberUtil.ValidationResult
const getValidationError = (number, countryCode) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isPossibleNumberWithReason(numberObj);
  } catch (e) {
    // here I convert thrown errors into ValidationResult enums (if possible)
    // errors are from i18n.phonenumbers.Error in the file https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
    if (e.message === i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult
        .INVALID_COUNTRY_CODE;
    }
    if (
      // hack to solve issue where parseAndKeepRawInput throws weird error for zero or 1-digit (national) numbers e.g. "3" or "+13"   s
      number.length <= 3 ||
      e.message === i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD ||
      e.message === i18n.phonenumbers.Error.TOO_SHORT_NSN
    ) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
    }
    if (e.message === i18n.phonenumbers.Error.TOO_LONG) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
    }

    // broken
    return -99;
  }
};

// check if given number is valid
const isValidNumber = (number, countryCode) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    return false;
  }
};

// check if given number is possible
const isPossibleNumber = (number, countryCode, mobileOnly) => {
  try {
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);

    if (mobileOnly) {
      const resultMobile = phoneUtil.isPossibleNumberForTypeWithReason(numberObj, i18n.phonenumbers.PhoneNumberType.MOBILE);
      const isPossibleMobile = resultMobile === i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE;
      return isPossibleMobile;
    }

    // can't use phoneUtil.isPossibleNumber directly as it accepts IS_POSSIBLE_LOCAL_ONLY numbers e.g. local numbers that are much shorter
    const result = phoneUtil.isPossibleNumberWithReason(numberObj);
    const isPossible = result === i18n.phonenumbers.PhoneNumberUtil.ValidationResult.IS_POSSIBLE;

    // custom validation for UK mobile numbers
    // because libphonenumber returns IS_POSSIBLE (rather than IS_POSSIBLE_LOCAL_ONLY) for 0740012 which is not possible
    let customValidation = true;
    const nationalNumber = numberObj.getNationalNumber().toString();
    if (countryCode === 'gb' && nationalNumber.charAt(0) === '7') {
      customValidation = nationalNumber.length === 10;
    }

    return isPossible && customValidation;
  } catch (e) {
    return false;
  }
};

/********************
 * NOTE: for following sections, keys must be in quotes to force closure compiler to preserve them
 ********************/

// copied this from i18n.phonenumbers.PhoneNumberFormat in the file https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
const numberFormat = {
  "E164": 0,
  "INTERNATIONAL": 1,
  "NATIONAL": 2,
  "RFC3966": 3
};

// copied this from i18n.phonenumbers.PhoneNumberType in https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js and put the keys in quotes to force closure compiler to preserve the keys
// TODO: there must be a way to just tell closure compiler to preserve the keys on i18n.phonenumbers.PhoneNumberType and just export that
const numberType = {
  "FIXED_LINE": 0,
  "MOBILE": 1,
  "FIXED_LINE_OR_MOBILE": 2,
  "TOLL_FREE": 3,
  "PREMIUM_RATE": 4,
  "SHARED_COST": 5,
  "VOIP": 6,
  "PERSONAL_NUMBER": 7,
  "PAGER": 8,
  "UAN": 9,
  "VOICEMAIL": 10,
  "UNKNOWN": -1
};

// copied this from i18n.phonenumbers.PhoneNumberUtil.ValidationResult in https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js and again put the keys in quotes.
const validationError = {
  "IS_POSSIBLE": 0,
  "INVALID_COUNTRY_CODE": 1,
  "TOO_SHORT": 2,
  "TOO_LONG": 3,
  "IS_POSSIBLE_LOCAL_ONLY": 4,
  "INVALID_LENGTH": 5,
};

// exports
goog.exportSymbol("intlTelInputUtils", {});
goog.exportSymbol("intlTelInputUtils.formatNumberAsYouType", formatNumberAsYouType);
goog.exportSymbol("intlTelInputUtils.formatNumber", formatNumber);
goog.exportSymbol("intlTelInputUtils.getExampleNumber", getExampleNumber);
goog.exportSymbol("intlTelInputUtils.getExtension", getExtension);
goog.exportSymbol("intlTelInputUtils.getNumberType", getNumberType);
goog.exportSymbol("intlTelInputUtils.getValidationError", getValidationError);
goog.exportSymbol("intlTelInputUtils.isValidNumber", isValidNumber);
goog.exportSymbol("intlTelInputUtils.isPossibleNumber", isPossibleNumber);
// enums
goog.exportSymbol("intlTelInputUtils.numberFormat", numberFormat);
goog.exportSymbol("intlTelInputUtils.numberType", numberType);
goog.exportSymbol("intlTelInputUtils.validationError", validationError);
