"use strict";

describe("getNumberType:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("it returns the right type for a UK mobile number", function() {
    input.intlTelInput("setNumber", "+447733123456");
    expect(input.intlTelInput("getNumberType")).toEqual(intlTelInputUtils.numberType.MOBILE);
  });

  it("it returns the right type for a UK landline number", function() {
    input.intlTelInput("setNumber", "+441531123456");
    expect(input.intlTelInput("getNumberType")).toEqual(intlTelInputUtils.numberType.FIXED_LINE);
  });

  it("it returns the right type for a UK toll free number", function() {
    input.intlTelInput("setNumber", "+448000123456");
    expect(input.intlTelInput("getNumberType")).toEqual(intlTelInputUtils.numberType.TOLL_FREE);
  });

});
