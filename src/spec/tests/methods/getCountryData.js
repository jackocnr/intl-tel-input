"use strict";

describe("getCountryData: use static method getCountryData", function() {

  var countryData;

  beforeEach(function() {
    intlSetup();
    countryData = $.fn.intlTelInput.getCountryData();
  });

  afterEach(function() {
    countryData = null;
  });

  it("gets the country data object", function() {
    expect(countryData.length).toEqual(totalCountries);
  });

});