"use strict";

describe("initial values:", function() {

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init vanilla plugin on empty input", function() {

    beforeEach(function() {
      input = $("<input>").wrap("div");
      iti = window.intlTelInput(input[0]);
    });

    it("creates a container with the right class", function() {
      expect(getParentElement()).toHaveClass("iti");
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries);
    });

    it("sets the state correctly: selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("iti__af");
    });

  });



  describe("init vanilla plugin on input containing valid UK dial code", function() {

    beforeEach(function() {
      input = $("<input value='+44 12345'>");
      iti = window.intlTelInput(input[0]);
    });

    it("sets the state correctly: selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("iti__gb");
    });

  });



  describe("input containing valid regionless NANP number with intl dial code", function() {

    beforeEach(function() {
      input = $("<input value='+1 800 123 1234'>");
    });

    describe("init plugin with nationalMode enabled", function() {

      beforeEach(function() {
        iti = window.intlTelInput(input[0]);
      });

      it("defaults to US flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("iti__us");
      });

    });

    describe("init plugin with nationalMode enabled and an initialCountry", function() {

      var initialCountry = "ca";

      beforeEach(function() {
        iti = window.intlTelInput(input[0], {
          initialCountry: initialCountry
        });
      });

      it("defaults to the initialCountry flag", function() {
        expect(getSelectedFlagElement()).toHaveClass(`iti__${initialCountry}`);
      });

    });

  });



  describe("init vanilla plugin on input containing valid Cook Island number with intl dial code", function() {

    beforeEach(function() {
      input = $("<input value='+682 21 234'>");
      iti = window.intlTelInput(input[0]);
    });

    // issue 520
    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass("iti__ck");
    });

  });



  describe("init vanilla plugin on input containing number with invalid dial code", function() {

    beforeEach(function() {
      input = $("<input value='+969999'>");
      iti = window.intlTelInput(input[0]);
    });

    it("does not set the selected flag", function() {
      expect(getSelectedFlagElement().attr("class")).toBe("iti__flag iti__globe");
    });

  });



  describe("init vanilla plugin on input containing number with no dial code", function() {

    beforeEach(function() {
      input = $("<input value='8'>");
      iti = window.intlTelInput(input[0]);
    });

    it("does not set the selected flag", function() {
      expect(getSelectedFlagElement().attr("class")).toBe("iti__flag iti__globe");
    });

  });

});
