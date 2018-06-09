/**
 * Follow instructions here to compile this file:
 * https://github.com/googlei18n/libphonenumber/blob/master/javascript/README.md
 *
 * Once setup, to re-compile:
 * 1) Copy the contents of this file into libphonenumber/javascript/i18n/phonenumbers/demo.js
 * 2) ant -f libphonenumber/javascript/build.xml compile-demo
 * 3) Copy libphonenumber/javascript/i18n/phonenumbers/demo-compiled.js to intl-tel-input/build/js/utils.js
 */

// includes
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberUtil');


// format the given number to the given format
function formatNumber(number, countryCode, format) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    if (phoneUtil.isPossibleNumber(numberObj)) {
        format = (typeof format == "undefined") ? i18n.phonenumbers.PhoneNumberFormat.E164 : format;
        return phoneUtil.format(numberObj, format);
    } else {
        return number;
    }
  } catch (e) {
    return number;
  }
}


// get an example number for the given country code
function getExampleNumber(countryCode, national, numberType) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.getExampleNumberForType(countryCode, numberType);
    var format = (national) ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL;
    return phoneUtil.format(numberObj, format);
  } catch (e) {
    return "";
  }
}


// get the extension from the given number
function getExtension(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return numberObj.getExtension();
  } catch (e) {
    return "";
  }
}


// get the type of the given number e.g. fixed-line/mobile
function getNumberType(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.getNumberType(numberObj);
  } catch (e) {
    // broken
    return -99;
  }
}


// get more info if the validation has failed e.g. too long/too short
function getValidationError(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isPossibleNumberWithReason(numberObj);
  } catch (e) {
    //console.log(e);

    // here I convert thrown errors into ValidationResult enums (if possible)
    if (e.message == i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_COUNTRY_CODE;
    }
    if (e.message == i18n.phonenumbers.Error.NOT_A_NUMBER) {
      return 4;
    }
    if (e.message == i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD || e == i18n.phonenumbers.Error.TOO_SHORT_NSN) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
    }
    if (e.message == i18n.phonenumbers.Error.TOO_LONG) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
    }

    // broken
    return -99;
  }
}


// check if given number is valid
function isValidNumber(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    return false;
  }
}


// copied this from i18n.phonenumbers.PhoneNumberFormat in the file https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
var numberFormat = {
  "E164": 0,
  "INTERNATIONAL": 1,
  "NATIONAL": 2,
  "RFC3966": 3
};


// copied this from i18n.phonenumbers.PhoneNumberType in https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js and put the keys in quotes to force closure compiler to preserve the keys
// TODO: there must be a way to just tell closure compiler to preserve the keys on i18n.phonenumbers.PhoneNumberType and just export that
var numberType = {
  "FIXED_LINE": 0,
  "MOBILE": 1,
  // In some regions (e.g. the USA), it is impossible to distinguish between
  // fixed-line and mobile numbers by looking at the phone number itself.
  "FIXED_LINE_OR_MOBILE": 2,
  // Freephone lines
  "TOLL_FREE": 3,
  "PREMIUM_RATE": 4,
  // The cost of this call is shared between the caller and the recipient, and
  // is hence typically less than PREMIUM_RATE calls. See
  // http://en.wikipedia.org/wiki/Shared_Cost_Service for more information.
  "SHARED_COST": 5,
  // Voice over IP numbers. This includes TSoIP (Telephony Service over IP).
  "VOIP": 6,
  // A personal number is associated with a particular person, and may be routed
  // to either a MOBILE or FIXED_LINE number. Some more information can be found
  // here: http://en.wikipedia.org/wiki/Personal_Numbers
  "PERSONAL_NUMBER": 7,
  "PAGER": 8,
  // Used for 'Universal Access Numbers' or 'Company Numbers'. They may be
  // further routed to specific offices, but allow one number to be used for a
  // company.
  "UAN": 9,
  // Used for 'Voice Mail Access Numbers'.
  "VOICEMAIL": 10,
  // A phone number is of type UNKNOWN when it does not fit any of the known
  // patterns for a specific region.
  "UNKNOWN": -1
};


// copied this from i18n.phonenumbers.PhoneNumberUtil.ValidationResult in https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js and again put the keys in quotes.
// Also: added NOT_A_NUMBER to match i18n.phonenumbers.Error.NOT_A_NUMBER
var validationError = {
  "IS_POSSIBLE": 0,
  "INVALID_COUNTRY_CODE": 1,
  "TOO_SHORT": 2,
  "TOO_LONG": 3,
  "NOT_A_NUMBER": 4
};


// exports
goog.exportSymbol('intlTelInputUtils', {});
goog.exportSymbol('intlTelInputUtils.formatNumber', formatNumber);
goog.exportSymbol('intlTelInputUtils.getExampleNumber', getExampleNumber);
goog.exportSymbol('intlTelInputUtils.getExtension', getExtension);
goog.exportSymbol('intlTelInputUtils.getNumberType', getNumberType);
goog.exportSymbol('intlTelInputUtils.getValidationError', getValidationError);
goog.exportSymbol('intlTelInputUtils.isValidNumber', isValidNumber);
// enums
goog.exportSymbol('intlTelInputUtils.numberFormat', numberFormat);
goog.exportSymbol('intlTelInputUtils.numberType', numberType);
goog.exportSymbol('intlTelInputUtils.validationError', validationError);
