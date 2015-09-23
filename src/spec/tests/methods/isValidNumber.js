"use strict";

describe("isValidNumber:", function() {

  var input;

  beforeEach(function() {
    intlSetup(true);
    input = new IntlTelInput(document.createElement("input"));
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });


  describe("init plugin and call public method isValidNumber", function() {

    beforeEach(function() {
      input = new IntlTelInput(document.createElement("input"), {
        // we must disable formatting to test with alpha chars
        autoFormat: false,
      });
    });

    it("returns true for: valid intl number", function() {
      input.setNumber("+44 7733 123456");
      expect(input.isValidNumber()).toBeTruthy();
    });

    it("returns false for: invalid intl number", function() {
      input.setNumber("+44 7733 123");
      expect(input.isValidNumber()).toBeFalsy();
    });

    /*it("returns false for: valid intl number containing alpha chars", function() {
      input.intlTelInput("setNumber", "+44 7733 123 abc");
      expect(input.intlTelInput("isValidNumber")).toBeFalsy();
    });*/

  });


  describe("init plugin with nationalMode=true and call public method isValidNumber", function() {

    beforeEach(function() {
      input =  new IntlTelInput(document.createElement("input"), {
        nationalMode: true
      });
    });

    it("returns false for: incorrect selected country, valid number", function() {
      input.setNumber("07733 123456");
      expect(input.isValidNumber()).toBeFalsy();
    });

    it("returns true for: correct selected country, valid number", function() {
      input.selectCountry("gb");
      input.setNumber("07733 123456");
      expect(input.isValidNumber()).toBeTruthy();
    });

    it("returns false for: correct selected country, invalid number", function() {
      input.selectCountry("gb");
      input.setNumber("07733 123");
      expect(input.isValidNumber()).toBeFalsy();
    });

  });

});
