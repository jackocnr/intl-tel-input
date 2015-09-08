"use strict";

// just make sure the method works
describe("IntlTelInput#autoCountryLoaded()", function() {

  it("works", function() {
    var intlTelInput = new IntlTelInput(document.createElement("input"));
    expect(intlTelInput.autoCountryLoaded()).toBe(undefined);
  });
});
