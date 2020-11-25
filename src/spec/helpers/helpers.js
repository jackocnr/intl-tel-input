var input,
  iti,
  totalCountries = 244,
  totalDialCodes = 228,
  defaultPreferredCountries = 2;

var intlSetup = function(utilsScript) {
  // by default put us in desktop mode
  window.innerWidth = 1024;

  // this should only run the first time
  if (!window.intlTelInputUtilsBackup) {
    window.intlTelInputUtilsBackup = window.intlTelInputUtils;
  }
  if (utilsScript) {
    window.intlTelInputUtils = window.intlTelInputUtilsBackup;
  } else {
    window.intlTelInputUtils = null;
  }
};

var intlTeardown = function() {
  $("script.iti-load-utils").remove();
  window.intlTelInputGlobals.startedLoadingUtilsScript = false;
  window.intlTelInputGlobals.documentReady = () => false;
  window.intlTelInputGlobals.autoCountry = null;
  window.intlTelInputGlobals.startedLoadingAutoCountry = false;
  // just make sure before we change the ref
  if (!window.intlTelInputUtilsBackup) {
    window.intlTelInputUtilsBackup = window.intlTelInputUtils;
  }
  window.intlTelInputUtils = null;
  if (iti) iti.destroy();
  if (input) input.remove();
  input = iti = null;
};

var waitForUtilsRequest = function(done) {
  // this wait is needed while jasmine actually does the request to load utils.js
  setTimeout(done, 100);
};

var getInputVal = function(i) {
  i = i || input;
  return i.val();
};

var getParentElement = function(i) {
  i = i || input;
  return i.parent();
};

var getListElement = function(i) {
  i = i || input;
  return i.parent().find(".iti__country-list");
};

var getListLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__country").length;
};

var getActiveListItem = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__active");
};

var getPreferredCountriesLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__preferred").length;
};

var getSelectedFlagContainer = function(i) {
  i = i || input;
  return i.parent().find(".iti__selected-flag");
};

var getSelectedFlagElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".iti__flag");
};

var getSelectedDialCodeElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".iti__selected-dial-code");
};

var getFlagsContainerElement = function(i) {
  i = i || input;
  return i.parent().find(".iti__flag-container");
};

var selectFlag = function(countryCode, i) {
  i = i || input;
  getSelectedFlagContainer(i)[0].click();
  getListElement(i).find("li[data-country-code='" + countryCode + "']")[0].click();
};

var openCountryDropDown = function() {
  getSelectedFlagContainer()[0].click();
};

var putCursorAtEnd = function() {
  var len = input.val().length;
  selectInputChars(len, len);
};

var selectInputChars = function(start, end) {
  input[0].setSelectionRange(start, end);
};

// use this for focus/blur (instead of using .focus() and .blur() directly, which cause problems in IE11)
var triggerInputEvent = function(type) {
  var e = new CustomEvent(type);
  input[0].dispatchEvent(e);
}

var triggerKey = function(el, type, key) {
  var e = new CustomEvent(type);
  e.key = key;
  el.dispatchEvent(e);
};

// trigger keydown, then keypress, then add the key, then keyup
var triggerKeyOnInput = function(key) {
  triggerKey(input[0], 'keydown', key);
  triggerKey(input[0], 'keypress', key);
  var val = input.val();
  input.val(val + key);
  triggerKey(input[0], 'keyup', key);
};

var triggerKeyOnBody = function(key) {
  triggerKey(document, 'keydown', key);
  triggerKey(document, 'keypress', key);
  triggerKey(document, 'keyup', key);
};

var triggerKeyOnFlagsContainerElement = function(key) {
  triggerKey(getFlagsContainerElement()[0], 'keydown', key);
};
