"use strict";

describe("init plugin and call public method isValidNumber", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      // we must disable formatting to test with alpha chars
      autoFormat: false,
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });
  
  it("returns true for: valid intl number", function() {
    input.intlTelInput("setNumber", "+44 7733 123456");
    expect(input.intlTelInput("isValidNumber")).toBeTruthy();
  });

  it("returns false for: invalid intl number", function() {
    input.intlTelInput("setNumber", "+44 7733 123");
    expect(input.intlTelInput("isValidNumber")).toBeFalsy();
  });

  it("returns false for: valid intl number containing alpha chars", function() {
    input.intlTelInput("setNumber", "+44 7733 123 abc");
    expect(input.intlTelInput("isValidNumber")).toBeFalsy();
  });

});


describe("init plugin with nationalMode=true and call public method isValidNumber", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      nationalMode: true
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });


  describe("with a valid national number", function() {
  
    beforeEach(function() {
      input.intlTelInput("setNumber", "07733 123456");
    });
  
    it("returns false for: incorrect selected country, no allowNational flag", function() {
      expect(input.intlTelInput("isValidNumber")).toBeFalsy();
    });

    it("returns false for: incorrect selected country, allowNational flag", function() {
      expect(input.intlTelInput("isValidNumber", true)).toBeFalsy();
    });

    it("returns false for: correct selected country, no allowNational flag", function() {
      input.intlTelInput("selectCountry", "gb");
      expect(input.intlTelInput("isValidNumber")).toBeFalsy();
    });

    it("returns true for: correct selected country, allowNational flag", function() {
      input.intlTelInput("selectCountry", "gb");
      expect(input.intlTelInput("isValidNumber", true)).toBeTruthy();
    });

  });


  it("returns false for: invalid national number, correct selected country, allowNational flag", function() {
    input.intlTelInput("setNumber", "07733 123");
    input.intlTelInput("selectCountry", "gb");
    expect(input.intlTelInput("isValidNumber", true)).toBeFalsy();
  });

});