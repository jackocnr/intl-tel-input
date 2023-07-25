"use strict";

describe("isValidNumber:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin and call public method isValidNumber", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
    });

    it("returns true for: valid intl number", function() {
      iti.setNumber("+44 7733 123456");
      expect(iti.isValidNumber()).toBeTruthy();
    });

    it("returns false for: invalid (too short) intl number", function() {
      iti.setNumber("+44 7733 123");
      expect(iti.isValidNumber()).toBeFalsy();
    });

    it("returns false for: possible but invalid (bad dial code) intl number", function() {
      iti.setNumber("+44 9999 123456");
      expect(iti.isValidNumber()).toBeFalsy();
    });

    it("returns null when utils script is not available", function() {
      delete window.intlTelInputUtils;
      iti.setNumber("+44 7733 123456");
      expect(iti.isValidNumber()).toBeNull();
    });

  });


  describe("init plugin with nationalMode=true and call public method isValidNumber", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        nationalMode: true
      });
    });

    it("returns false for: incorrect selected country, valid number", function() {
      iti.setNumber("07733 123456");
      expect(iti.isValidNumber()).toBeFalsy();
    });

    it("returns true for: correct selected country, valid number", function() {
      iti.setCountry("gb");
      iti.setNumber("07733 123456");
      expect(iti.isValidNumber()).toBeTruthy();
    });

    it("returns false for: correct selected country, invalid (too short) number", function() {
      iti.setCountry("gb");
      iti.setNumber("07733 123");
      expect(iti.isValidNumber()).toBeFalsy();
    });

  });

});
