"use strict";

describe("setNumber: init (vanilla) plugin to call public method setNumber", function() {

  var input;

  beforeEach(function() {
    intlSetup();
    input = new IntlTelInput(document.createElement("input"));
    input.setNumber("+447733123456");
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  it("sets the input val to the given number", function() {
    expect(input.inputElement.value).toEqual("+447733123456");
  });

  it("updates the flag", function() {
    expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
  });

});
