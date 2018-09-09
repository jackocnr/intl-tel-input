"use strict";

describe("getNumberType:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("returns the right type for a UK mobile number", function() {
    iti.setNumber("+447733123456");
    expect(iti.getNumberType()).toEqual(intlTelInputUtils.numberType.MOBILE);
  });

  it("returns the right type for a UK landline number", function() {
    iti.setNumber("+441531123456");
    expect(iti.getNumberType()).toEqual(intlTelInputUtils.numberType.FIXED_LINE);
  });

  it("returns the right type for a UK toll-free number", function() {
    iti.setNumber("+448000123456");
    expect(iti.getNumberType()).toEqual(intlTelInputUtils.numberType.TOLL_FREE);
  });

});
