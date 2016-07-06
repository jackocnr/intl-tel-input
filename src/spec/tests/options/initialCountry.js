"use strict";

describe("initialCountry", function() {

  var initialCountry;

  var setUpInput = function()
  {
    input = $("<input>");
    input.intlTelInput({
      initialCountry: initialCountry
    });
  }

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("init plugin with a default country", function() {
    beforeEach(function() {
      initialCountry = "jp";
      setUpInput();
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass(initialCountry);
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual(initialCountry);
    });
  });

  describe("init plugin with a blank flag", function() {
    beforeEach(function() {
      initialCountry = "blank";
      setUpInput();
    });

    it("sets a blank flag correctly", function() {
      expect(getSelectedFlagElement()).not.toHaveClass(initialCountry);
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual(undefined);
    });
  });
});