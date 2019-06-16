"use strict";

describe("setCountry: init plugin and calling public method setCountry()", function() {

  var countryCode = "gb";

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
    iti.setCountry(countryCode);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("updates the selected flag", function() {
    expect(getSelectedFlagElement()).toHaveClass(`iti__${countryCode}`);
  });

  it("does not insert the dial code", function() {
    expect(getInputVal()).toEqual("");
  });

});
