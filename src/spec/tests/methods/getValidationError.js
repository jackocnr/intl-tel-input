"use strict";

describe("getValidationError:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("returns the right error for a number that is too short", function() {
    input.intlTelInput("setNumber", "+4477");
    expect(input.intlTelInput("getValidationError")).toEqual(intlTelInputUtils.validationError.TOO_SHORT);
  });

  it("returns the right error for a number that is too long", function() {
    input.intlTelInput("setNumber", "+447733123456789");
    expect(input.intlTelInput("getValidationError")).toEqual(intlTelInputUtils.validationError.TOO_LONG);
  });

  it("returns the right error for a number with an invalid country code", function() {
    input.intlTelInput("setNumber", "+969");
    expect(input.intlTelInput("getValidationError")).toEqual(intlTelInputUtils.validationError.INVALID_COUNTRY_CODE);
  });

});
