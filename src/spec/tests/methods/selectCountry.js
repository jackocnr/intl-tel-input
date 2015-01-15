"use strict";

describe("selectCountry: init plugin and calling public method selectCountry()", function() {

  var countryCode = "gb";

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    input.intlTelInput();
    input.intlTelInput("selectCountry", countryCode);
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