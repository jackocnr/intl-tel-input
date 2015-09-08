"use strict";

describe("preferredCountries option:", function() {

  var input;

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      input = new IntlTelInput(document.createElement("input"), {
        preferredCountries: []
      });
    });

    it("defaults to the first country in the alphabet", function() {
      // Afghanistan
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("af");
    });

    it("has the right number of list items", function() {
      expect(getListLength(input.inputElement)).toEqual(totalCountries);
    });

  });



  describe("init plugin with preferredCountries", function() {

    var preferredCountries;

    beforeEach(function() {
      // United Kingdom
      preferredCountries = ['gb'];
      input = new IntlTelInput(document.createElement("input"), {
        preferredCountries: preferredCountries
      });
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass(preferredCountries[0]);
    });

    it("has the right number of list items", function() {
      expect(getListLength(input.inputElement)).toEqual(totalCountries + preferredCountries.length);
    });

  });

});
