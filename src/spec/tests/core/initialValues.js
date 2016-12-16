"use strict";

describe("initial values:", function() {

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });



  describe("init vanilla plugin on empty input", function() {

    beforeEach(function() {
      input = $("<input>");
      input.intlTelInput();
    });

    it("creates a container with the right class", function() {
      expect(getParentElement()).toHaveClass("intl-tel-input");
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(totalCountries + defaultPreferredCountries);
      expect(getPreferredCountriesLength()).toEqual(defaultPreferredCountries);
      // only 1 active list item
      expect(getActiveListItem().length).toEqual(1);
    });

    it("sets the state correctly: selected flag and active list item", function() {
      expect(getSelectedFlagElement()).toHaveClass("us");
      expect(getActiveListItem().attr("data-country-code")).toEqual("us");
    });

  });



  describe("init vanilla plugin on input containing valid UK dial code", function() {

    beforeEach(function() {
      input = $("<input value='+44 12345'>");
      input.intlTelInput();
    });

    it("sets the state correctly: selected flag and active list item", function() {
      expect(getSelectedFlagElement()).toHaveClass("gb");
      expect(getActiveListItem().attr("data-country-code")).toEqual("gb");
    });

  });



  describe("init vanilla plugin on input containing valid toll-free (regionless) NANP number with intl dial code", function() {

    beforeEach(function() {
      input = $("<input value='+1 800 123 1234'>");
      input.intlTelInput();
    });

    it("does not set the selected flag or the active list item", function() {
      expect(getSelectedFlagElement().attr("class")).toBe("iti-flag");
      expect(getActiveListItem().length).toEqual(0);
    });

  });



  describe("init vanilla plugin on input containing valid Cook Island number with intl dial code", function() {

    beforeEach(function() {
      input = $("<input value='+682 21 234'>");
      input.intlTelInput();
    });

    // issue 520
    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass("ck");
    });

  });



  describe("init vanilla plugin on input containing number with invalid dial code", function() {

    beforeEach(function() {
      input = $("<input value='+969999'>");
      input.intlTelInput();
    });

    it("does not set the selected flag or the active list item", function() {
      expect(getSelectedFlagElement().attr("class")).toBe("iti-flag");
      expect(getActiveListItem().length).toEqual(0);
    });

  });



  describe("init vanilla plugin on input containing number with no dial code", function() {

    beforeEach(function() {
      input = $("<input value='8'>");
      input.intlTelInput();
    });

    it("does not set the selected flag or the active list item", function() {
      expect(getSelectedFlagElement().attr("class")).toBe("iti-flag");
      expect(getActiveListItem().length).toEqual(0);
    });

  });

});
