"use strict";

describe("init plugin with a default country", function() {

  var defaultCountry = "jp";

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      defaultCountry: defaultCountry
    });
  });

  afterEach(function() {
    input = null;
  });

  it("sets the selected flag correctly", function() {
    expect(getSelectedFlagElement()).toHaveClass(defaultCountry);
  });

  it("sets the active list item correctly", function() {
    expect(getActiveListItem().attr("data-country-code")).toEqual(defaultCountry);
  });

});