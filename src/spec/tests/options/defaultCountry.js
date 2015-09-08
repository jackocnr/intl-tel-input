"use strict";

describe("defaultCountry: init plugin with a default country", function() {

  var defaultCountry = "jp";
  var input;

  beforeEach(function() {
    intlSetup();
    input =  new IntlTelInput(document.createElement("input"), {
      defaultCountry: defaultCountry
    });
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  it("sets the selected flag correctly", function() {
    expect(getSelectedFlagElement(input.inputElement)).toHaveClass(defaultCountry);
  });

  it("sets the active list item correctly", function() {
    expect(getActiveListItem(input.inputElement)[0].getAttribute("data-country-code")).toEqual(defaultCountry);
  });

});
