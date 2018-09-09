"use strict";

describe("setNumber: init vanilla plugin (no utils) and call setNumber with a valid UK number", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
    iti.setNumber("+447733123456");
  });

  afterEach(function() {
    intlTeardown();
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
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with nationalMode=true and call setNumber with a valid UK number", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
      iti.setNumber("+447733123456");
    });

    it("sets the input val to the given number, with ntl formatting", function() {
      expect(getInputVal()).toEqual("07733 123456");
    });

  });

  describe("init plugin with nationalMode=false and call setNumber with a valid UK number", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        nationalMode: false
      });
      iti.setNumber("+447733123456");
    });

    it("sets the input val to the given number, with intl formatting", function() {
      expect(getInputVal()).toEqual("+44 7733 123456");
    });

  });

});
