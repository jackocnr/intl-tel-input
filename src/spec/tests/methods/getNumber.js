"use strict";

// just make sure the method works
describe("IntlTelInput#getNumber(type)", function() {

  it("works", function() {
    var intlTelInput = new IntlTelInput(document.createElement("input"));
    expect(intlTelInput.getNumber("MOBILE")).toEqual("");
  });
});
