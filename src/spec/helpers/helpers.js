var input,
  totalCountries = 243,
  totalDialCodes = 228,
  defaultPreferredCountries = 2,
  // don't call this "keys" as it will clash with the plugin
  keyCodes = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    SPACE: 32
  };

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
  return i.parent().find(".country-list");
};

var getListLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.country").length;
};

var getActiveListItem = function(i) {
  i = i || input;
  return getListElement(i).find("li.active");
};

var getPreferredCountriesLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.preferred").length;
};

var getSelectedFlagContainer = function(i) {
  i = i || input;
  return i.parent().find(".selected-flag");
};

var getSelectedFlagElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".iti-flag");
};

var getSelectedDialCodeElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".selected-dial-code");
};

var getFlagsContainerElement = function(i) {
  i = i || input;
  return i.parent().find(".flag-container");
};

var selectFlag = function(countryCode, i) {
  i = i || input;
  getSelectedFlagContainer(i).click();
  getListElement(i).find("li[data-country-code='" + countryCode + "']").click();
};

var putCursorAtEnd = function() {
  var len = input.val().length;
  selectInputChars(len, len);
};

var selectInputChars = function(start, end) {
  input[0].setSelectionRange(start, end);
};

var getKeyEvent = function(key, type) {
  return $.Event(type, {
    which: (key.length > 1) ? keyCodes[key] : key.charCodeAt(0)
  });
};

// trigger keydown, then keypress, then add the key, then keyup
var triggerKeyOnInput = function(key) {
  input.trigger(getKeyEvent(key, "keydown"));
  var e = getKeyEvent(key, "keypress");
  input.trigger(e);
  // insert char
  if (!e.isDefaultPrevented()) {
    var domInput = input[0],
      val = input.val();
    input.val(val.substr(0, domInput.selectionStart) + key + val.substring(domInput.selectionEnd, val.length));
  }
  input.trigger(getKeyEvent(key, "keyup"));
};

var triggerKeyOnBody = function(key) {
  $("body").trigger(getKeyEvent(key, "keydown"));
  $("body").trigger(getKeyEvent(key, "keypress"));
  $("body").trigger(getKeyEvent(key, "keyup"));
};

var triggerKeyOnFlagsContainerElement = function(key) {
  getFlagsContainerElement().trigger(getKeyEvent(key, "keydown"));
};
