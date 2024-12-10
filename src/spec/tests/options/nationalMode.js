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
      //* Must be in DOM for focus to work.
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
      selectCountry("gb");

      expect(getInputVal()).toEqual("");
    });

    it("but typing a dial code does still update the selected country", function() {
      input.val("+");
      triggerKeyOnInput("4");
      triggerKeyOnInput("4");

      expect(getSelectedCountryElement()).toHaveClass("iti__gb");
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
      expect(getSelectedCountryElement()).toHaveClass("iti__us");
    });

    it("changing to canadian area code updates flag", function() {
      input.val("204 555 555");
      triggerKeyOnInput("5"); //* Trigger update flag.

      expect(getSelectedCountryElement()).toHaveClass("iti__ca");
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
      expect(getSelectedCountryElement()).toHaveClass("iti__gb");
    });

    it("changing to another intl number updates the flag", function() {
      input.val("+34 5555555");
      triggerKeyOnInput("5"); //* Trigger update flag.

      expect(getSelectedCountryElement()).toHaveClass("iti__es");
    });

  });



  // new feature: area codes now update selected flag even in national mode, with countries that use a national prefix digit!
  describe("init plugin with nationalMode=true and initialCountry=GB", function() {

    beforeEach(function() {
      input = $("<input>").appendTo("body");
      iti = window.intlTelInput(input[0], {
        nationalMode: true,
        initialCountry: "gb",
      });
    });

    it("typing Jersey area code changes flag to Jersey", function() {
      triggerKeyOnInput("0");
      triggerKeyOnInput("1");
      triggerKeyOnInput("5");
      triggerKeyOnInput("3");
      triggerKeyOnInput("4");

      expect(getSelectedCountryElement()).toHaveClass("iti__je");
    });

  });


  describe("init plugin with nationalMode=false and initialCountry=AX", function() {

    beforeEach(function() {
      input = $("<input>").appendTo("body");
      iti = window.intlTelInput(input[0], {
        nationalMode: false,
        initialCountry: "ax",
      });
    });

    it("typing the selected country's intl dial code maintains the selected country", function() {
      triggerKeyOnInput("+");
      triggerKeyOnInput("3");
      triggerKeyOnInput("5");
      triggerKeyOnInput("8");
      // it previously changed to finland! (typing +3 gave globe icon, then 58 gave primary country for that dial code which is Finland)
      expect(getSelectedCountryElement()).toHaveClass("iti__ax");
    });

  });

});
