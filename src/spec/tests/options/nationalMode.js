"use strict";


describe("nationalMode:", function() {

  var element;
  var input;

  beforeEach(function() {
    intlSetup();
  });

  beforeEach(function() {
    element = document.createElement("input");
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });



  describe("init plugin with no value", function() {

    beforeEach(function() {
      input = new IntlTelInput(element, {
        nationalMode: true
      });

      // must be in DOM for focus to work
      // FIXME: tests still pass when this line is commented out -_-
      document.body.appendChild(input.inputElement.parentNode);
    });

    afterEach(function() {
      var parent = input.inputElement.parentNode;
      parent.parentNode.removeChild(parent);
    });

    it("defaults to no dial code", function() {
      expect(input.inputElement.value).toEqual("");
    });

    it("focusing the input does not insert the dial code", function() {
      input.inputElement.focus();
      expect(input.inputElement.value).toEqual("");
    });

    it("selecting another country does not insert the dial code", function() {
      selectFlag("gb", input.inputElement);
      expect(input.inputElement.value).toEqual("");
    });

    it("but typing a dial code does still update the selected country", function() {
      input.inputElement.value = "+";

      triggerNativeKeyOnInput("4", input.inputElement);
      triggerNativeKeyOnInput("4", input.inputElement);

      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
    });

  });



  describe("init plugin with US national number and selectCountry=us", function() {

    var nationalNum = "702 418 1234";

    beforeEach(function() {
      element.value = nationalNum;

      input =  new IntlTelInput(element, {
        nationalMode: true
      });

      input.selectCountry("us");
    });

    it("displays the number and has US flag selected", function() {
      expect(input.inputElement.value).toEqual(nationalNum);
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("us");
    });

    it("changing to canadian area code updates flag", function() {
      input.inputElement.value = "204 555 555";
      triggerNativeKeyOnInput("5", input.inputElement); // trigger update flag
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("ca");
    });

  });



  describe("init plugin with intl number", function() {

    var intlNumber = "+44 7733 123456";

    beforeEach(function() {
      element.value = intlNumber;

      input = new IntlTelInput(element, {
        nationalMode: true
      });
    });

    it("displays the number and selects the right flag", function() {
      expect(input.inputElement.value).toEqual(intlNumber);
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
    });

    it("changing to another intl number updates the flag", function() {
      input.inputElement.value = "+34 5555555";
      triggerNativeKeyOnInput("5", input.inputElement); // trigger update flag
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("es");
    });

  });

});
