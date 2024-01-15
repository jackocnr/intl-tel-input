"use strict";

describe("getSelectedCountryData: init plugin to test public method getSelectedCountryData", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("gets the right default country data", function() {
    expect(iti.getSelectedCountryData().iso2).toEqual("af");
  });

  it("change country by number gets the right country data", function() {
    input.val("+44");
    triggerKeyOnInput(" ");
    expect(iti.getSelectedCountryData().iso2).toEqual("gb");
  });

  it("change country by selecting a flag gets the right country data", function() {
    selectFlag("ch");
    expect(iti.getSelectedCountryData().iso2).toEqual("ch");
  });

});
