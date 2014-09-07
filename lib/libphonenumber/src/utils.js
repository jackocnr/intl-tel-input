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

function getExampleNumber(countryCode, national) {
  var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  var number = phoneUtil.getExampleNumber(countryCode);
  var format = (national) ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL;
  return phoneUtil.format(number, format);
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

function formatNumber(val, countryCode, addSuffix) {
  try {
    var clean = val.replace(/\D/g, "");
    if (val.substr(0, 1) == "+") {
      clean = "+" + clean;
    }
    var formatter = new i18n.phonenumbers.AsYouTypeFormatter(countryCode);
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
      // again the "+44 " problem... (also affects "+45" apparently)
      if (test.charAt(test.length - 1) == " ") {
        test = test.substr(0, test.length - 1);
      }
      // if adding a '5' introduces a formatting char (i.e. it's length changes by >1)
      if (test.length - result.length > 1) {
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
