"use strict";

describe("preferredCountries option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      input.intlTelInput({
        preferredCountries: []
      });
    });

    it("defaults to the first country in the alphabet", function() {
      // Afghanistan
      expect(getSelectedFlagElement()).toHaveClass("af");
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries);
    });

  });



  describe("init plugin with preferredCountries", function() {

    var preferredCountries;

    beforeEach(function() {
      // United Kingdom
      preferredCountries = ['gb'];
      input.intlTelInput({
        preferredCountries: preferredCountries
      });
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      expect(getSelectedFlagElement()).toHaveClass(preferredCountries[0]);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries + preferredCountries.length);
    });

  });

});