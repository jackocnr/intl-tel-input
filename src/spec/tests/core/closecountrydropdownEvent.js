"use strict";

describe("close:countrydropdown event:", function() {

  var spy;

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    spy = spyOnEvent(input, 'close:countrydropdown');
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

    it("clicking outside the dropdown to close it triggers the event", function() {
      openCountryDropDown();
      $("<h1>").click();
      expect(spy).not.toHaveBeenTriggered();
    });

    it("selecting another country triggers the event", function() {
      selectFlag("af");
      expect(spy).toHaveBeenTriggered();
    });

  });

});
