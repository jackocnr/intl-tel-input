var input, totalCountries = 221;
var keyCodes = {
  'up': 38,
  'down': 40,
  'enter': 13,
  'esc': 27,
  'z': 90
};

var getInputVal = function(i) {
  i = i || input;
  return i.val().trim();
};

var getListElement = function(i) {
  i = i || input;
  return i.parent().find(".country-list");
};

var getListLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.country").length;
};

var getPreferredCountriesLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.country.preferred").length;
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

var triggerKey = function(key) {
  var e = $.Event('keydown', {
    which: keyCodes[key]
  });
  $("body").trigger(e);
};