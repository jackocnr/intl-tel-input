"use strict";


describe("nationalMode:", function() {

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin with no value", function() {

    beforeEach(function() {
      // must be in DOM for focus to work
      input = $("<input>").appendTo("body");
      iti = window.intlTelInput(input[0], {
        nationalMode: true,
      });
    });

    it("defaults to no dial code", function() {
      expect(getInputVal()).toEqual("");
    });

    it("focusing the input does not insert the dial code", function() {
      triggerInputEvent("focus");
      expect(getInputVal()).toEqual("");
    });

    it("selecting another country does not insert the dial code", function() {
      selectFlag("gb");
      expect(getInputVal()).toEqual("");
    });

    it("but typing a dial code does still update the selected country", function() {
      input.val("+");
      triggerKeyOnInput("4");
      triggerKeyOnInput("4");
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

  });



  describe("init plugin with US national number and setCountry=us", function() {

    var nationalNum = "702 418 1234";

    beforeEach(function() {
      input = $("<input value='" + nationalNum + "'>");
      iti = window.intlTelInput(input[0], {
        nationalMode: true,
      });
      iti.setCountry("us");
    });

    it("displays the number and has US flag selected", function() {
      expect(getInputVal()).toEqual(nationalNum);
      expect(getSelectedFlagElement()).toHaveClass("us");
    });

    it("changing to canadian area code updates flag", function() {
      input.val("204 555 555");
      triggerKeyOnInput("5"); // trigger update flag
      expect(getSelectedFlagElement()).toHaveClass("ca");
    });

  });



  describe("init plugin with intl number", function() {

    var intlNumber = "+44 7733 123456";

    beforeEach(function() {
      input = $("<input value='" + intlNumber + "'>");
      iti = window.intlTelInput(input[0], {
        nationalMode: true,
      });
    });

    it("displays the number and selects the right flag", function() {
      expect(getInputVal()).toEqual(intlNumber);
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("changing to another intl number updates the flag", function() {
      input.val("+34 5555555");
      triggerKeyOnInput("5"); // trigger update flag
      expect(getSelectedFlagElement()).toHaveClass("es");
    });

  });

});
