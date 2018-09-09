"use strict";

describe("initialCountry: ", function() {

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with initialCountry set to Japan", function() {

    var initialCountry = "jp";

    beforeEach(function() {
      input = $("<input>").wrap("div");
      iti = window.intlTelInput(input[0], {
        initialCountry: initialCountry
      });
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass(initialCountry);
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual(initialCountry);
    });

  });



  describe("init plugin with initialCountry set to Canada, on an input with a valid toll-free (regionless) NANP number with intl dial code", function() {

    var initialCountry = "ca";

    beforeEach(function() {
      input = $("<input value='+1 800 123 1234'>");
      iti = window.intlTelInput(input[0], {
        initialCountry: initialCountry
      });
    });

    it("sets the state correctly: selected flag and active list item", function() {
      expect(getSelectedFlagElement()).toHaveClass(initialCountry);
      expect(getActiveListItem().attr("data-country-code")).toEqual(initialCountry);
    });

  });

});
