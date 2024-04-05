"use strict";

describe("close:countrydropdown event:", function() {

  var spy;

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    spy = jasmine.createSpy();
    input[0].addEventListener("close:countrydropdown", spy);
  });

  afterEach(function() {
    input[0].removeEventListener("close:countrydropdown", spy);
    intlTeardown();
  });

  describe("init plugin", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
    });

    it("does not trigger the event", function() {
      expect(spy).not.toHaveBeenCalled();
    });

    it("clicking outside the dropdown to close it triggers the event", function() {
      openCountryDropDown();
      input[0].click();

      expect(spy).toHaveBeenCalled();
    });

    it("pressing esc triggers the event", function() {
      openCountryDropDown();
      triggerKeyOnBody("Escape");

      expect(spy).toHaveBeenCalled();
    });

    it("selecting another country triggers the event", function() {
      selectCountry("af");

      expect(spy).toHaveBeenCalled();
    });

  });

});
