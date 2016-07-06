"use strict";

describe("flagOnEmptyDialCode option", function() {

  var flagOnEmptyDialCode;

  var setUpInput = function()
  {
    input = $("<input>");
    input.intlTelInput({
      flagOnEmptyDialCode: flagOnEmptyDialCode
    });
  }

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("true shows the last valid flag after deleting", function() {
    flagOnEmptyDialCode = true;
    setUpInput();
    input.intlTelInput("setNumber", "+332345678");
    expect(getSelectedFlagElement()).toHaveClass("fr");
    input.intlTelInput("setNumber", "+");
    expect(getSelectedFlagElement()).toHaveClass("fr");
    input.intlTelInput("setNumber", "");
    expect(getSelectedFlagElement()).toHaveClass("fr");     
  });

  it("false does not show a flag after emptying the field", function() {
    flagOnEmptyDialCode = false;
    setUpInput();
    input.intlTelInput("setNumber", "+332345678");
    expect(getSelectedFlagElement()).toHaveClass("fr");
    input.intlTelInput("setNumber", "+");
    expect(getSelectedFlagElement()).not.toHaveClass("fr");
    input.intlTelInput("setNumber", "");
    expect(getSelectedFlagElement()).not.toHaveClass("fr");      
  });
});