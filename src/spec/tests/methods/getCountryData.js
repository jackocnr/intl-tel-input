"use strict";

describe("use static method getCountryData", function() {

  var countryData;

  beforeEach(function() {
    countryData = $.fn.intlTelInput.getCountryData();
  });

  afterEach(function() {
    countryData = null;
  });

  it("gets the country data object", function() {
    expect(countryData.length).toEqual(totalCountries);
  });

});