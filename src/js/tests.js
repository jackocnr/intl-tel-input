//"use strict";

describe("create input element", function() {

  var input, totalCountries = 221;

  var getListElement = function() {
    return input.parent().find(".country-list");
  };

  var getListLength = function() {
    return getListElement().find("li.country").length;
  };

  var getSelectedFlagElement = function() {
    return input.parent().find(".selected-flag .flag");
  };

  var selectFlag = function(countryCode) {
    getSelectedFlagElement().click();
    getListElement().find("li[data-country-code='" + countryCode + "']").click();
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



  describe("init plugin with initialDialCode set to false", function() {

    beforeEach(function() {
      input.intlTelInput({
        initialDialCode: false
      });
    });

    it("defaults to no dial code", function() {
      expect(input.val()).toEqual("");
    });

  });



  describe("init plugin with americaMode set to true", function() {

    beforeEach(function() {
      input.intlTelInput({
        americaMode: true
      });
    });

    it("defaults to no dial code", function() {
      expect(input.val()).toEqual("");
    });



    describe("selecting another country", function() {

      beforeEach(function() {
        selectFlag("gb");
      });

      it("still does update the dial code", function() {
        expect(input.val().trim()).toEqual("+44");
      });

    });



    describe("selecting america again", function() {

      beforeEach(function() {
        selectFlag("us");
      });

      it("does not insert the dial code", function() {
        expect(input.val()).toEqual("");
      });

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

    it("defaults to the right dial code", function() {
      expect(input.val().trim()).toEqual("+44");
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
      // China and Japan (note that none of the default preferredCountries are included here, so wont be in the list)
      onlyCountries = ['ch', 'jp'];
      input.intlTelInput({
        onlyCountries: onlyCountries
      });
    });

    afterEach(function() {
      onlyCountries = null;
    });

    it("defaults to the right dial code", function() {
      expect(input.val().trim()).toEqual("+41");
    });

    it("defaults to the first onlyCountries", function() {
      expect(getSelectedFlagElement()).toHaveClass(onlyCountries[0]);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(onlyCountries.length);
    });

  });

});