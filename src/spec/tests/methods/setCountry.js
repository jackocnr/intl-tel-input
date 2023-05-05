"use strict";

describe("setCountry: init plugin and calling public method setCountry()", function() {

  var countryCode = "gb";

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
    iti.setCountry(countryCode);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("updates the selected flag", function() {
    expect(getSelectedFlagElement()).toHaveClass(`iti__${countryCode}`);
  });

  it("does not insert the dial code", function() {
    expect(getInputVal()).toEqual("");
  });

  describe("setting title attribute on flag container", function() {
    describe("when separateDialCode is false", function() {
      beforeEach(function() {
        iti = window.intlTelInput(input[0], {
          showFlags: true,
          separateDialCode: false,
        });
        iti.setCountry(countryCode);
      });

      it("has the country name and dial code in the flag's title", function() {
        expect(getSelectedFlagContainer().attr("title")).toEqual("United Kingdom: +44");
      });
    });

    describe("when separateDialCode is true", function() {
      beforeEach(function() {
        iti = window.intlTelInput(input[0], {
          showFlags: true,
          separateDialCode: true,
        });
        iti.setCountry(countryCode);
      });

      it("has the country name but not the dial code in the flag's title", function() {
        expect(getSelectedFlagContainer().attr("title")).toEqual("United Kingdom");
      });
    });


    // setCountry errors out when country code is undefined, so we can likely remove this scenario and make country code a required param
    describe("when countryCode is falsey", function() {
      // beforeEach(function() {
      //   iti = window.intlTelInput(input[0], {
      //     showFlags: true,
      //   });
      //   iti.setCountry();
      // });

      it("sets the flag's title as Unknown", function() {
        // expect(getSelectedFlagContainer().attr("title")).toEqual("Unknown");
      });
    })
  });
});
