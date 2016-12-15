"use strict";

describe("countrychange event:", function() {

  var spy;

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    spy = spyOnEvent(input, 'countrychange');
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("init plugin", function() {

    beforeEach(function() {
      input.intlTelInput();
    });

    it("does not trigger the event", function() {
      expect(spy).not.toHaveBeenTriggered();
    });

    it("calling setCountry triggers the event", function() {
      input.intlTelInput("setCountry", "fr");
      expect(spy).toHaveBeenTriggered();
    });

    it("calling setNumber triggers the event", function() {
      input.intlTelInput("setNumber", "+34");
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

    it("returns the selected country as extraParameter", function() {
      selectFlag("fr");
      expect('countrychange').toHaveBeenTriggeredOnAndWith(input, {
        name: 'France',
        iso2: 'fr',
        dialCode: '33',
        priority: 0,
        areaCodes: null
      });
    });
  });

});
