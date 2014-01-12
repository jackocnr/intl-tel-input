"use strict";

describe("create input element", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("init plugin with onlyCountries", function() {

    var onlyCountries;

    beforeEach(function() {
      // China and Japan (note that none of the default preferredCountries are included here, so wont be in the list)
      onlyCountries = ['ch', 'jp'];
      input.intlTelInput({
        onlyCountries: onlyCountries
      });
    });

    afterEach(function() {
      onlyCountries = null;
    });

    it("defaults to the first onlyCountries", function() {
      expect(getSelectedFlagElement()).toHaveClass(onlyCountries[0]);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(onlyCountries.length);
    });

  });

});