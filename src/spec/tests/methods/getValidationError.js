"use strict";

describe("getValidationError:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("returns the right error for a number that is too short", function() {
    iti.setNumber("+4477");
    expect(iti.getValidationError()).toEqual(intlTelInputUtils.validationError.TOO_SHORT);
  });

  it("returns the right error for a number that is too long", function() {
    iti.setNumber("+447733123456789");
    expect(iti.getValidationError()).toEqual(intlTelInputUtils.validationError.TOO_LONG);
  });

  it("returns the right error for a number with an invalid country code", function() {
    iti.setNumber("+969");
    expect(iti.getValidationError()).toEqual(intlTelInputUtils.validationError.INVALID_COUNTRY_CODE);
  });

});
