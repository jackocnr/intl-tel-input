"use strict";

describe("formatOnDisplay: testing input containing valid US number", function() {

  var validUsNumber = "+17024181234";

  beforeEach(function() {
    intlSetup(true);
    input = $("<input value='"+validUsNumber+"'>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("init plugin with formatOnDisplay=false", function() {

    beforeEach(function() {
      input.intlTelInput({
        formatOnDisplay: false
      });
    });

    it("doesnt format the number on init", function() {
      expect(getInputVal()).toEqual(validUsNumber);
    });

    it("calling setNumber doesnt format the number", function() {
      var anotherNumber = "+14154181234";
      input.intlTelInput("setNumber", anotherNumber);
      expect(getInputVal()).toEqual(anotherNumber);
    });

  });

  describe("init plugin with formatOnDisplay=true and nationalMode=true", function() {

    beforeEach(function() {
      input.intlTelInput({
        formatOnDisplay: true,
        nationalMode: true
      });
    });

    it("sets the number to national format on init", function() {
      expect(getInputVal()).toEqual("(702) 418-1234");
    });

    it("calling setNumber formats the number to national format", function() {
      input.intlTelInput("setNumber", "+14154181234");
      expect(getInputVal()).toEqual("(415) 418-1234");
    });

  });

  describe("init plugin with formatOnDisplay=true and nationalMode=false", function() {

    beforeEach(function() {
      input.intlTelInput({
        formatOnDisplay: true,
        nationalMode: false
      });
    });

    it("sets the number to intl format on init", function() {
      expect(getInputVal()).toEqual("+1 702-418-1234");
    });

    it("calling setNumber formats the number to international format", function() {
      input.intlTelInput("setNumber", "+14154181234");
      expect(getInputVal()).toEqual("+1 415-418-1234");
    });

  });

});
