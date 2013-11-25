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
      expect(typeof countryData).toBe("object");
    });

  });

});