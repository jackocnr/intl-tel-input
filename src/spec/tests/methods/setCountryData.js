"use strict";

describe("setCountryData: use static method setCountryData before initialising the plugin", function() {

  var oldCountryData, newCountryData = [{
    "name": "Afghanistan (افغانستان‎)",
    "iso2": "af",
    "dialCode": "93"
  }];

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    oldCountryData = $.fn.intlTelInput.getCountryData();
    $.fn.intlTelInput.setCountryData(newCountryData);
    input.intlTelInput();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
    $.fn.intlTelInput.setCountryData(oldCountryData);
  });

  it("the plugin is initialised with the new data", function() {
    expect(getListLength()).toEqual(newCountryData.length);
  });

});