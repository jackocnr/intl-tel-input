"use strict";

describe("init plugin and call public method setNumber", function() {

  var number = "+44 7733 123 456";

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
    input.intlTelInput("setNumber", number);
  });

  afterEach(function() {
    input = null;
  });
  
  it("sets the number", function() {
    expect(getInputVal()).toEqual(number);
  });

  it("updates the flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});