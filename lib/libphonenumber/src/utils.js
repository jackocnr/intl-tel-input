/**
 * Follow instructions here to compile this file:
 * https://code.google.com/p/libphonenumber/source/browse/trunk/javascript/README 
 * 
 * (start by copying the contents of this file into
 * libphonenumber/javascript/i18n/phonenumbers/demo.js)
 */

// includes
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('i18n.phonenumbers.AsYouTypeFormatter');

function getExampleNumber(countryCode) {
  var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  var number = phoneUtil.getExampleNumber(countryCode);
  return phoneUtil.format(number, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL);
}

function isValidNumber(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    return false;
  }
}

function formatNumber(val, addSuffix) {
  try {
    // ignore numbers if they dont start with an intl dial code
    if (val.substr(0, 1) != "+") {
      return val;
    }
    var clean = "+" + val.replace(/\D/g, "");
    var formatter = new i18n.phonenumbers.AsYouTypeFormatter("");
    var result;
    for (var i = 0; i < clean.length; i++) {
      result = formatter.inputDigit(clean.charAt(i));
    }
    // for some reason libphonenumber formats "+44" to "+44 ", but doesn't do the same with "+1"
    if (result.charAt(result.length - 1) == " ") {
      result = result.substr(0, result.length - 1);
    }
    if (addSuffix) {
      // hack to get formatting suffix
      var test = formatter.inputDigit('5');
      // if the number still contains formatting (there's always a space after the dial code) then we're good to go (else the number is too long and libphonenumber removed all the formatting)
      if (test.indexOf(' ') !== -1) {
        // update the result to the new value (minus that last '5' we just added)
        result = test.substr(0, test.length - 1);
      }
    }
    return result;
  } catch (e) {
    return val;
  }
}

// exports
goog.exportSymbol('intlTelInputUtils', {});
goog.exportSymbol('intlTelInputUtils.formatNumber', formatNumber);
goog.exportSymbol('intlTelInputUtils.isValidNumber', isValidNumber);
goog.exportSymbol('intlTelInputUtils.getExampleNumber', getExampleNumber);
