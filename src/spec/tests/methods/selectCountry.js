"use strict";

describe("selectCountry: init plugin and calling public method selectCountry()", function() {

  var countryCode = "gb";
  var input;

  beforeEach(function() {
    intlSetup();
    input = new IntlTelInput(document.createElement("input"));
    input.selectCountry(countryCode);
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  it("updates the selected flag", function() {
    expect(getSelectedFlagElement(input.inputElement)).toHaveClass(countryCode);
  });

  it("does not insert the dial code", function() {
    expect(input.inputElement.value).toEqual("");
  });

});
