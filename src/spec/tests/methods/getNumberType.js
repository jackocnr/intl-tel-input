"use strict";

// just make sure the method works
describe("IntlTelInput#getNumberType()", function() {

  it("works", function() {
    var intlTelInput = new IntlTelInput(document.createElement("input"));
    expect(intlTelInput.getNumberType()).toEqual(-99);
  });
});
