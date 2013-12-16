//"use strict";

describe("create input element", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("using static getCountryData function", function() {

    var countryData;

    beforeEach(function() {
      countryData = $.fn.intlTelInput.getCountryData();
    });

    it("gets the country data object", function() {
      expect(countryData.countries.length).toEqual(221);
      expect(Object.keys(countryData.countryCodes).length).toEqual(227);
    });

  });

});