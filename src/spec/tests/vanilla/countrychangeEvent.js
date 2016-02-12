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

  it("init plugin does not trigger the event", function() {
    input.intlTelInput();
    expect(spy).not.toHaveBeenTriggered();
  });

  describe("init plugin", function() {

    beforeEach(function() {
      input.intlTelInput();
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

  });

});
