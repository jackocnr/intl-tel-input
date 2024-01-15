"use strict";

describe("preferredCountries option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        countrySearch: false,
        preferredCountries: [],
      });
    });

    it("defaults to the first country in the list", function() {
      // Afghanistan
      expect(getSelectedFlagElement()).toHaveClass("iti__af");
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
      iti = window.intlTelInput(input[0], {
        countrySearch: false,
        preferredCountries: preferredCountries,
      });
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      expect(getSelectedFlagElement()).toHaveClass(`iti__${preferredCountries[0]}`);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries + preferredCountries.length);
    });

  });

});
