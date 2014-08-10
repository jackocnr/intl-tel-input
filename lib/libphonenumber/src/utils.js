/**
 * Follow instructions here to compile this file:
 * https://code.google.com/p/libphonenumber/source/browse/trunk/javascript/README 
 * 
 * (start by copying the contents of this file into
 * libphonenumber/javascript/i18n/phonenumbers/demo.js)
 */

// includes
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

function isValidNumber(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    return false;
  }
}

function formatNumber(val) {
  try {
    // ignore numbers if they dont start with an intl dial code
    if (val.substr(0, 1) != "+") {
      return val;
    }
    var clean = "+" + val.replace(/\D/g, "");
    var formatter = new i18n.phonenumbers.AsYouTypeFormatter("");
    var output = new goog.string.StringBuffer();
    for (var i = 0; i < clean.length; i++) {
      output = formatter.inputDigit(clean.charAt(i));
    }
    return output.toString();
  } catch (e) {
    return val;
  }
}

// exports
goog.exportSymbol('intlTelInputUtils', {});
goog.exportSymbol('intlTelInputUtils.formatNumber', formatNumber);
goog.exportSymbol('intlTelInputUtils.isValidNumber', isValidNumber);
