var input,
  totalCountries = 233,
  totalDialCodes = 227,
  // don't call this "keys" as it will clash with the plugin
  keyCodes = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46,
    CTRL: 17
  };

var intlSetup = function(utilsScript) {
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
  return getSelectedFlagContainer(i).find(".flag");
};

var getFlagsContainerElement = function(i) {
  i = i || input;
  return i.parent().find(".flag-dropdown");
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

var triggerKeyOnInput = function(key) {
  triggerKey(input, key);
};

var triggerKeyOnBody = function(key) {
  triggerKey($("body"), key);
};

// when a key is pressed IRL, these events are triggered in this order
var triggerKey = function(target, key) {
  target.trigger(getKeyEvent(key, "keydown"));
  target.trigger(getKeyEvent(key, "keypress"));
  target.trigger(getKeyEvent(key, "keyup"));
};