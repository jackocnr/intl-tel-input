"use strict";

describe("init vanilla plugin", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input = null;
  });


  // defaultStyling defaults to true
  it("creates a container with the right classes", function() {
    expect(input.parent()).toHaveClass("intl-tel-input pretty");
  });

  // preferredCountries defaults to 2 countries
  it("has the right number of list items", function() {
    var defaultPreferredCountries = 2;
    expect(getListLength()).toEqual(totalCountries + defaultPreferredCountries);
    expect(getPreferredCountriesLength()).toEqual(defaultPreferredCountries);
  });

  it("defaults to the right flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("us");
  });

  // autoHideDialCode defaults to true, which means dont show dial code until focused
  it("doesn't automatically populate the input value on initialisation", function() {
    expect(getInputVal()).toEqual("");
  });



  describe("typing a number with a different dial code", function() {
  
    beforeEach(function() {
      input.val("+44 1234567").keyup();
    });

    it("updates the selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("clearing the input again defaults to the right flag", function() {
      input.val("").keyup();
      expect(getSelectedFlagElement()).toHaveClass("us");
    });
  
  });



  // must add to the dom to get focus/click-off-to-close to work
  describe("adding to dom", function() {
  
    beforeEach(function() {
      input.parent().appendTo($("body"));
    });

    afterEach(function() {
      input.parent().remove();
    });
  
    // autoHideDialCode defaults to true
    it("focusing the input adds the default dial code, and blur removes it again", function() {
      expect(getInputVal()).toEqual("");
      input.focus();
      expect(getInputVal()).toEqual("+1");
      input.blur();
      expect(getInputVal()).toEqual("");
    });


    describe("clicking the selected flag to open the dropdown", function() {

      beforeEach(function() {
        getSelectedFlagContainer().click();
      });

      it("opens the dropdown with the top item marked as active and highlighted", function() {
        expect(getListElement()).not.toHaveClass("hide");
        var topItem = getListElement().find("li.country:first");
        expect(topItem).toHaveClass("active highlight");
      });

      it("clicking it again closes the dropdown", function() {
        getSelectedFlagContainer().click();
        expect(getListElement()).toHaveClass("hide");
      });

      it("clicking off closes the dropdown", function() {
        $("body").click();
        expect(getListElement()).toHaveClass("hide");
      });



      describe("selecting a new country item", function() {
      
        var countryCode = "gb";

        beforeEach(function() {
          getListElement().find("li[data-country-code='" + countryCode + "']").click();
        });

        it("updates the selected flag", function() {
          expect(getSelectedFlagElement()).toHaveClass(countryCode);
        });

        it("updates the dial code", function() {
          expect(getInputVal()).toEqual("+44");
        });
      
      });

    });

  });



  describe("enabled/disabled tests", function() {

    describe("input enabled", function() {

      it("adds the hover class on hover", function() {
        getFlagsContainerElement().mouseover();
        expect(getFlagsContainerElement()).toHaveClass("hover");
      });

      it("opens the dropdown on click", function() {
        getSelectedFlagContainer().click();
        expect(getListElement()).not.toHaveClass("hide");
      });

    });

    describe("input disabled", function() {

      beforeEach(function() {
        input.prop("disabled", true);
      });

      it("doesn't add the hover class on hover", function() {
        getFlagsContainerElement().mouseover();
        expect(getFlagsContainerElement()).not.toHaveClass("hover");
      });

      it("doesn't open the dropdown on click", function() {
        getSelectedFlagContainer().click();
        expect(getListElement()).toHaveClass("hide");
      });

    });

  }); 

});