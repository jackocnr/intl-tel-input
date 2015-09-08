"use strict";

describe("getSelectedCountryData: init plugin to test public method getSelectedCountryData", function() {

  var input;

  beforeEach(function() {
    intlSetup();
    input = new IntlTelInput(document.createElement("input"));
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  it("gets the right default country data", function() {
    expect(input.getSelectedCountryData().iso2).toEqual("us");
  });

  it("change country by number gets the right country data", function() {
    input.inputElement.value = "+44";
    triggerNativeKeyOnInput(" ", input.inputElement);
    expect(input.getSelectedCountryData().iso2).toEqual("gb");
  });

  it("change country by selecting a flag gets the right country data", function() {
    selectFlag("ch", input.inputElement);
    expect(input.getSelectedCountryData().iso2).toEqual("ch");
  });

});
