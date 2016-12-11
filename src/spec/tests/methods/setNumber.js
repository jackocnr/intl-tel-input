"use strict";

describe("setNumber: init vanilla plugin (no utils) and call setNumber with a valid UK number", function() {

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



describe("setNumber: with utils", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("init plugin with nationalMode=true and call setNumber with a valid UK number", function() {

    beforeEach(function() {
      input.intlTelInput();
      input.intlTelInput("setNumber", "+447733123456");
    });

    it("sets the input val to the given number, with ntl formatting", function() {
      expect(getInputVal()).toEqual("07733 123456");
    });

  });

  describe("init plugin with nationalMode=false and call setNumber with a valid UK number", function() {

    beforeEach(function() {
      input.intlTelInput({
        nationalMode: false
      });
      input.intlTelInput("setNumber", "+447733123456");
    });

    it("sets the input val to the given number, with intl formatting", function() {
      expect(getInputVal()).toEqual("+44 7733 123456");
    });

  });

});
