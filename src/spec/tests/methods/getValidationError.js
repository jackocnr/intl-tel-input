"use strict";

// just make sure the method works
describe("IntlTelInput#getValidationError()", function() {

  it("works", function() {
    var intlTelInput = new IntlTelInput(document.createElement("input"));
    expect(intlTelInput.getValidationError()).toEqual(-99);
  });
});
