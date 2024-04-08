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

    beforeEach(function() {
      //* China and Japan (note that none of the default preferredCountries are included here, so wont be in the list).
      onlyCountries = ["jp", "cn", "kr"];
      iti = window.intlTelInput(input[0], {
        onlyCountries: onlyCountries,
      });
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

      expect(getSelectedCountryElement()).toHaveClass("iti__ru");
    });

  });



  describe("init plugin on 2 different inputs with different onlyCountries and nationalMode = false", function() {

    var input2,
      iti2;

    beforeEach(function() {
      input2 = $("<input>").wrap("div");
      //* Japan
      iti = window.intlTelInput(input[0], {
        onlyCountries: ["jp"],
        nationalMode: false,
      });
      //* Korea
      iti2 = window.intlTelInput(input2[0], {
        onlyCountries: ["kr"],
        nationalMode: false,
      });
      $("body").append(getParentElement(input)).append(getParentElement(input2));
    });

    afterEach(function() {
      iti2.destroy();
      input2.remove();
      input2 = iti2 = null;
    });

    it("they both only have 1 country listed, which is the correct one", function() {
      expect(getListLength()).toEqual(1);
      expect(getListElement().find("li.iti__country:first .iti__flag")).toHaveClass("iti__jp");
      expect(getListLength(input2)).toEqual(1);
      expect(getListElement(input2).find("li.iti__country:first .iti__flag")).toHaveClass("iti__kr");
    });

  });

});
