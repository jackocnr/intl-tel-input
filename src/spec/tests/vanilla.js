//"use strict";

describe("create input element", function() {

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

    it("doesn't automatically populate the input value", function() {
      expect(input.val()).toEqual("");
    });

    it("typing a different dial code updates the selected flag", function() {
      input.val("+44").keyup();
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });



    describe("clearing the input", function() {

      beforeEach(function() {
        input.val("").keyup();
      });

      it("defaults to the right flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("us");
      });

    });



    describe("manually selecting another flag", function() {

      beforeEach(function() {
        selectFlag("gb");
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("updates the dial code", function() {
        expect(input.val().trim()).toEqual("+44");
      });

    });



    describe("using public setCountry function to choose another country", function() {

      beforeEach(function() {
        input.intlTelInput("selectCountry", "gb");
      });

      it("calling selectCountry updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

    });

  });

});