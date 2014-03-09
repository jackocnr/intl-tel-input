"use strict";

describe("use static method setCountryData before initialising the plugin", function() {

  var oldCountryData, newCountryData = [{
    "name": "Afghanistan (افغانستان‎)",
    "cca2": "af",
    "calling-code": "93"
  }];

  beforeEach(function() {
    input = $("<input>");
    oldCountryData = $.fn.intlTelInput.getCountryData();
    $.fn.intlTelInput.setCountryData(newCountryData);
    input.intlTelInput();
  });

  afterEach(function() {
    input = null;
    $.fn.intlTelInput.setCountryData(oldCountryData);
  });

  it("the plugin is initialised with the new data", function() {
    expect(getListLength()).toEqual(newCountryData.length);
  });

});