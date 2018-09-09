"use strict";

describe("getCountryData: use static method getCountryData", function() {

  var countryData;

  beforeEach(function() {
    intlSetup();
    countryData = window.intlTelInputGlobals.getCountryData();
  });

  afterEach(function() {
    intlTeardown();
    countryData = null;
  });

  it("gets the country data object", function() {
    expect(countryData.length).toEqual(totalCountries);
  });

});
