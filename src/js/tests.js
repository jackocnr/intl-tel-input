//"use strict";

describe("create input element", function() {

  var input, totalCountries = 221;

  var getListLength = function() {
    return input.parent().find(".country-list li.country").length;
  };

  var getSelectedFlagElement = function() {
    return input.parent().find(".selected-flag .flag");
  };

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("init vanilla plugin", function() {

    beforeEach(function() {
      input.intlTelInput();
    });

    it("creates a container with the right classes", function() {
      expect(input.parent()).toHaveClass("intl-tel-input pretty");
    });

    it("has the right number of list items", function() {
      var defaultPreferredCountries = 2;
      expect(getListLength()).toEqual(totalCountries + defaultPreferredCountries);
    });

    it("defaults to the right flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("us");
    });

    it("defaults to the right dial code", function() {
      expect(input.val().trim()).toEqual("+1");
    });

    it("calling selectCountry updates the selected flag", function() {
      var countryCode = "gb";
      input.intlTelInput("selectCountry", countryCode);
      expect(getSelectedFlagElement()).toHaveClass(countryCode);
    });

    it("typing a different dial code updates the selected flag", function() {
      input.val("+44").keyup();
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

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



  describe("init plugin with onlyCountries", function() {

    var onlyCountries;

    beforeEach(function() {
      // China and Japan (these are NOT in the default preferredCountries)
      onlyCountries = ['ch', 'jp'];
      input.intlTelInput({
        onlyCountries: onlyCountries
      });
    });

    afterEach(function() {
      onlyCountries = null;
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(onlyCountries.length);
    });

  });

});