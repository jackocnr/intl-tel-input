"use strict";

describe("getNumber: init plugin with valid US number and utils.js", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input value='+17024181234'>");
    input.intlTelInput();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("calling getNumber with no args returns the number as E.164", function() {
    expect(input.intlTelInput("getNumber")).toEqual("+17024181234");
  });

  it("calling getNumber with format=INTERNATIONAL", function() {
    expect(input.intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)).toEqual("+1 702-418-1234");
  });

  it("calling getNumber with format=NATIONAL", function() {
    expect(input.intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL)).toEqual("(702) 418-1234");
  });

});
