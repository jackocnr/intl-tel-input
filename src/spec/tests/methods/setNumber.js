"use strict";

describe("setNumber: init (vanilla) plugin and call setNumber with a valid UK number", function() {

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

  it("sets the input val to the given number (no formatting)", function() {
    expect(getInputVal()).toEqual("+447733123456");
  });

  it("updates the flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});

describe("setNumber: init plugin with utils", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("call setNumber with a valid UK number, and format=NATIONAL", function() {

    beforeEach(function() {
      input.intlTelInput("setNumber", "+447733123456", intlTelInputUtils.numberFormat.NATIONAL);
    });

    it("sets the input val to the given number, with default formatting", function() {
      expect(getInputVal()).toEqual("07733 123456");
    });

  });

  describe("call setNumber with a valid UK number, with format=INTERNATIONAL", function() {

    beforeEach(function() {
      input.intlTelInput("setNumber", "+447733123456", intlTelInputUtils.numberFormat.INTERNATIONAL);
    });

    it("sets the input val to the given number, with INTERNATIONAL formatting", function() {
      expect(getInputVal()).toEqual("+44 7733 123456");
    });

  });

});
