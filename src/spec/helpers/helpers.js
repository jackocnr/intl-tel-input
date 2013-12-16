var input, totalCountries = 221;

var getListElement = function() {
  return input.parent().find(".country-list");
};

var getListLength = function() {
  return getListElement().find("li.country").length;
};

var getSelectedFlagElement = function() {
  return input.parent().find(".selected-flag .flag");
};

var getSelectedCountry = function() {
  return getListElement().find(".active").attr("data-country-code");
};

var selectFlag = function(countryCode) {
  getSelectedFlagElement().click();
  getListElement().find("li[data-country-code='" + countryCode + "']").click();
};