"use strict";

describe("countrychange event:", function() {

  var spy;

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    spy = jasmine.createSpy();
    input[0].addEventListener("countrychange", spy);
  });

  afterEach(function() {
    input[0].removeEventListener("countrychange", spy);
    intlTeardown();
  });

  describe("init plugin", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
    });

    it("does not trigger the event", function() {
      expect(spy).not.toHaveBeenCalled();
    });

    it("calling setCountry triggers the event", function() {
      iti.setCountry("fr");

      expect(spy).toHaveBeenCalled();
    });

    it("calling setNumber triggers the event", function() {
      iti.setNumber("+34");

      expect(spy).toHaveBeenCalled();
    });

    it("selecting another country triggers the event", function() {
      selectCountry("gb");

      expect(spy).toHaveBeenCalled();
    });

    it("typing another number triggers the event", function() {
      input.val("+4");
      triggerKeyOnInput("4"); //* Selects UK.

      expect(spy).toHaveBeenCalled();
    });
  });

});
