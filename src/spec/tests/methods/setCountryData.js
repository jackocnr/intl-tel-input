//"use strict";

describe("create input element", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("using static setCountryData function and then initialising the plugin", function() {

    var oldCountryData, newCountryData = {
      countries: [{
        "name": "Afghanistan (افغانستان‎)",
        "cca2": "af",
        "calling-code": "93"
      }],
      countryCodes: {
        "93": ["af"]
      }
    };

    beforeEach(function() {
      oldCountryData = $.fn.intlTelInput.getCountryData();
      $.fn.intlTelInput.setCountryData(newCountryData);
      input.intlTelInput();
    });

    afterEach(function() {
      $.fn.intlTelInput.setCountryData(oldCountryData);
    });

    it("the plugin is initialised with the new data", function() {
      expect(getListLength()).toEqual(newCountryData.countries.length);
    });

  });

});