"use strict";

describe("isPossibleNumber:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin and call public method isPossibleNumber", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
    });

    it("returns true for: valid intl number", function() {
      iti.setNumber("+44 7733 123456");
      expect(iti.isPossibleNumber()).toBeTruthy();
    });

    it("returns true for: possible but invalid (bad dial code) intl number", function() {
      iti.setNumber("+44 9999 123456");
      expect(iti.isPossibleNumber()).toBeTruthy();
    });

    it("returns false for: invalid (too short by 2 digits) intl number", function() {
      iti.setNumber("+44 7733 1234");
      expect(iti.isPossibleNumber()).toBeFalsy();
    });

    // guess this is a quirk of UK phone numbers that some valid ones are only 10 digits (e.g. 0773312345)
    it("returns true for: invalid (too short by 1 digit) intl number", function() {
      iti.setNumber("+44 7733 12345");
      expect(iti.isPossibleNumber()).toBeTruthy();
    });

    it("returns false for: invalid (too long) intl number", function() {
      iti.setNumber("+44 7733 1234567");
      expect(iti.isPossibleNumber()).toBeFalsy();
    });

    it("returns null when utils script is not available", function() {
      delete window.intlTelInputUtils;
      iti.setNumber("+44 7733 123456");
      expect(iti.isPossibleNumber()).toBeNull();
    });

  });

});
