"use strict";

describe("setNumber: init (vanilla) plugin to call public method setNumber", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    input.intlTelInput();
    input.intlTelInput("setNumber", "+447733123456");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });
  
  it("sets the input val to the given number", function() {
    expect(getInputVal()).toEqual("+447733123456");
  });

  it("updates the flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});