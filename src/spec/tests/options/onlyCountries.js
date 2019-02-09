"use strict";

describe("onlyCountries option:", function() {

  var onlyCountries;

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("init plugin with onlyCountries set to japan, china and korea", function() {

    var chinaCountryCode = "cn";

    beforeEach(function() {
      // China and Japan (note that none of the default preferredCountries are included here, so wont be in the list)
      onlyCountries = ['jp', chinaCountryCode, 'kr'];
      iti = window.intlTelInput(input[0], {
        onlyCountries: onlyCountries,
      });
    });

    it("defaults to the first onlyCountries alphabetically", function() {
      expect(getSelectedFlagElement()).toHaveClass(chinaCountryCode);
    });

    it("has the right number of list items", function() {
      expect(getListLength()).toEqual(onlyCountries.length);
    });

  });


  describe("init plugin with onlyCountries for Afghanistan, Kazakhstan and Russia", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        preferredCountries: [],
        onlyCountries: ["af", "kz", "ru"],
      });
    });

    it("entering +7 defaults to the top priority country (Russia)", function() {
      input.val("+");
      triggerKeyOnInput("7");
      expect(getSelectedFlagElement()).toHaveClass("ru");
    });

  });



  describe("init plugin on 2 different inputs with different onlyCountries and nationalMode = false", function() {

    var input2,
      iti2;

    beforeEach(function() {
      input2 = $("<input>").wrap("div");
      // japan
      iti = window.intlTelInput(input[0], {
        onlyCountries: ['jp'],
        nationalMode: false,
      });
      // korea
      iti2 = window.intlTelInput(input2[0], {
        onlyCountries: ['kr'],
        nationalMode: false,
      });
      $("body").append(getParentElement(input)).append(getParentElement(input2));
    });

    afterEach(function() {
      iti2.destroy();
      input2.remove();
      input2 = iti2 = null;
    });

    it("they both display their respective only country option as the selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("jp");
      expect(getSelectedFlagElement(input2)).toHaveClass("kr");
    });

  });

});
