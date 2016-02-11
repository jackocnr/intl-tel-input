"use strict";

describe("setCountry: init plugin and calling public method setCountry()", function() {

  var countryCode = "gb";

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    input.intlTelInput();
    input.intlTelInput("setCountry", countryCode);
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("updates the selected flag", function() {
    expect(getSelectedFlagElement()).toHaveClass(countryCode);
  });

  it("does not insert the dial code", function() {
    expect(getInputVal()).toEqual("");
  });

});