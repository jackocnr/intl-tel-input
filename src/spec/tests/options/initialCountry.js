"use strict";

describe("initialCountry: ", function() {

  describe("init plugin with initialCountry set to Japan", function() {

    var initialCountry = "jp";

    beforeEach(function() {
      intlSetup();
      input = $("<input>");
      input.intlTelInput({
        initialCountry: initialCountry
      });
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
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
      intlSetup();
      input = $("<input value='+1 800 123 1234'>");
      input.intlTelInput({
        initialCountry: initialCountry
      });
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    it("sets the state correctly: selected flag and active list item", function() {
      expect(getSelectedFlagElement()).toHaveClass(initialCountry);
      expect(getActiveListItem().attr("data-country-code")).toEqual(initialCountry);
    });

  });

});
