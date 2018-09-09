"use strict";

describe("countrychange event:", function() {

  var spy;

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    spy = spyOnEvent(input, 'countrychange');
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0])
    });

    it("does not trigger the event", function() {
      expect(spy).not.toHaveBeenTriggered();
    });

    it("calling setCountry triggers the event", function() {
      iti.setCountry("fr");
      expect(spy).toHaveBeenTriggered();
    });

    it("calling setNumber triggers the event", function() {
      iti.setNumber("+34");
      expect(spy).toHaveBeenTriggered();
    });

    it("selecting another country triggers the event", function() {
      selectFlag("af");
      expect(spy).toHaveBeenTriggered();
    });

    it("typing another number triggers the event", function() {
      input.val("+4");
      triggerKeyOnInput("4"); // selects uk
      expect(spy).toHaveBeenTriggered();
    });
  });

});
