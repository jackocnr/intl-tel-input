"use strict";

describe("setCountry: init plugin and calling public method setCountry()", function() {

  var iso2 = "gb";

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
    iti.setCountry(iso2);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("updates the selected flag", function() {
    expect(getSelectedFlagElement()).toHaveClass(`iti__${iso2}`);
  });

  it("does not insert the dial code", function() {
    expect(getInputVal()).toEqual("");
  });

  describe("setting title attribute on flag container", function() {
    describe("when showSelectedDialCode is false", function() {
      beforeEach(function() {
        iti = window.intlTelInput(input[0], {
          showFlags: true,
          showSelectedDialCode: false,
        });
        iti.setCountry(iso2);
      });

      it("has the country name and dial code in the flag's title", function() {
        expect(getSelectedFlagContainer().attr("title")).toEqual("United Kingdom: +44");
      });
    });

    describe("when showSelectedDialCode is true", function() {
      beforeEach(function() {
        iti = window.intlTelInput(input[0], {
          showFlags: true,
          showSelectedDialCode: true,
        });
        iti.setCountry(iso2);
      });

      it("has the country name but not the dial code in the flag's title", function() {
        expect(getSelectedFlagContainer().attr("title")).toEqual("United Kingdom");
      });
    });
  });
});
