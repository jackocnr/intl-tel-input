"use strict";

describe("defaultCountry: init plugin with a default country", function() {

  var defaultCountry = "jp";

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    input.intlTelInput({
      defaultCountry: defaultCountry
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("sets the selected flag correctly", function() {
    expect(getSelectedFlagElement()).toHaveClass(defaultCountry);
  });

  it("sets the active list item correctly", function() {
    expect(getActiveListItem().attr("data-country-code")).toEqual(defaultCountry);
  });

});