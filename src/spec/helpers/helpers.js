var input, totalCountries = 221;

var getInputVal = function() {
  return input.val().trim();
};

var getListElement = function() {
  return input.parent().find(".country-list");
};

var getListLength = function() {
  return getListElement().find("li.country").length;
};

var getPreferredCountriesLength = function() {
  return getListElement().find("li.country.preferred").length;
};

var getSelectedFlagContainer = function() {
  return input.parent().find(".selected-flag");
};

var getSelectedFlagElement = function() {
  return getSelectedFlagContainer().find(".flag");
};

var getFlagsContainerElement = function() {
  return input.parent().find(".flag-dropdown");
};

var selectFlag = function(countryCode) {
  getSelectedFlagContainer().click();
  getListElement().find("li[data-country-code='" + countryCode + "']").click();
};