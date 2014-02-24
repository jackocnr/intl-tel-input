/**
 * Follow instructions here to compile this file:
 * https://code.google.com/p/libphonenumber/source/browse/trunk/javascript/README 
 * 
 * (start by copying the contents of this file into
 * libphonenumber/javascript/i18n/phonenumbers/demo.js)
 */

// includes
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

function isValidNumber(numberString, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(numberString, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    // do nothing
  }
  return false;
}

// exports
goog.exportSymbol('isValidNumber', isValidNumber);
