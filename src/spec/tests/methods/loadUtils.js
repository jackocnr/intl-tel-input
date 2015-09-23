"use strict";

// just make sure the method works
describe("IntlTelInput#loadUtils(path?)", function() {

  it("works", function() {
    var intlTelInput = new IntlTelInput(document.createElement("input"));
    expect(intlTelInput.loadUtils()).toBe(undefined);
  });
});
