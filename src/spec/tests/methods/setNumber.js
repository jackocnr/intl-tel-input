"use strict";

describe("init plugin and call public method setNumber", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
    input.intlTelInput("setNumber", "+447733123456");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });
  
  it("sets the input val to the formatted number", function() {
    expect(getInputVal()).toEqual("+44 7733 123456");
  });

  it("updates the flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});