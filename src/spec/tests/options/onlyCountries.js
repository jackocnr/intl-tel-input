"use strict";

describe("onlyCountries option:", function() {

  var onlyCountries;
  var input;

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    input.destroy();
    input = onlyCountries = null;
  });



  describe("init plugin with onlyCountries", function() {

    var chinaCountryCode = "cn";

    beforeEach(function() {
      // China and Japan (note that none of the default preferredCountries are included here, so wont be in the list)
      onlyCountries = ['jp', chinaCountryCode, 'kr'];
      input = new IntlTelInput(document.createElement("input"), {
        onlyCountries: onlyCountries
      });
    });

    it("defaults to the first onlyCountries alphabetically", function() {
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass(chinaCountryCode);
    });

    it("has the right number of list items", function() {
      expect(getListLength(input.inputElement)).toEqual(onlyCountries.length);
    });

  });


  describe("init plugin with onlyCountries for Afghanistan, Kazakhstan and Russia", function() {

    beforeEach(function() {
      input = new IntlTelInput(document.createElement("input"), {
        preferredCountries: [],
        onlyCountries: ["af", "kz", "ru"]
      });
    });

    it("entering +7 defaults to the top priority country (Russia)", function() {
      input.inputElement.value = "+7";
      triggerNativeKeyOnInput(" ", input.inputElement);
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("ru");
    });

  });



  describe("init plugin on 2 different inputs with different onlyCountries and nationalMode = false", function() {

    var input2;

    beforeEach(function() {
      // japan
      input = new IntlTelInput(document.createElement("input"), {
        onlyCountries: ['jp'],
        nationalMode: false
      });
      // korea
      input2 = new IntlTelInput(document.createElement("input"), {
        onlyCountries: ['kr'],
        nationalMode: false
      });

      document.body.appendChild(input.inputElement.parentNode);
      document.body.appendChild(input2.inputElement.parentNode);
    });

    afterEach(function() {
      var parent1 = input.inputElement.parentNode;
      var parent2 = input2.inputElement.parentNode;

      parent1.parentNode.removeChild(parent1);
      parent2.parentNode.removeChild(parent2);

      input2 = null;
    });

    it("first instance still works", function() {
      input.inputElement.focus();
      expect(input.inputElement.value).toEqual("+81");
    });

  });

});
