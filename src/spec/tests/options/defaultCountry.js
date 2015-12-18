"use strict";

describe("initialCountry: init plugin with a default country", function() {

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