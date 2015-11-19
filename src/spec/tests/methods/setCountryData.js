"use strict";

describe("setCountryData method", function() {

  var countryData;
  var originalCountryData = $.fn.intlTelInput.getCountryData();

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    $.fn.intlTelInput.setCountryData(originalCountryData);
  });

  it("sets the country data object", function() {
    $.fn.intlTelInput.setCountryData([ ['foo'] ]);
    countryData = $.fn.intlTelInput.getCountryData();
    expect(countryData.length).toEqual(1);
    expect(countryData[0][0]).toEqual('foo');
  });

});