"use strict";

describe("vanilla:", function() {

  beforeEach(function() {
    intlSetup();
  });



  describe("init plugin on input with prepopulated value", function() {

    beforeEach(function() {
      input = $("<input value='+44 12345'>");
      input.intlTelInput();
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual("gb");
    });

  });



  describe("init vanilla plugin on input with invalid prepopulated value", function() {

    beforeEach(function() {
      input = $("<input value='8'>");
      input.intlTelInput();
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement()).toHaveClass("us");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual("us");
    });

  });



  describe("init vanilla plugin with nationalMode = false", function() {

    beforeEach(function() {
      input = $("<input>");
      input.intlTelInput({
        nationalMode: false
      });
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });


    it("creates a container with the right class", function() {
      expect(getParentElement()).toHaveClass("intl-tel-input");
    });

    // preferredCountries defaults to 2 countries
    it("has the right number of list items", function() {
      var defaultPreferredCountries = 2;
      expect(getListLength()).toEqual(totalCountries + defaultPreferredCountries);
      expect(getPreferredCountriesLength()).toEqual(defaultPreferredCountries);
      // only 1 active list item
      expect(getActiveListItem().length).toEqual(1);
    });

    it("defaults to the right flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("us");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem().attr("data-country-code")).toEqual("us");
    });

    // autoHideDialCode defaults to true, which means dont show dial code until focused
    it("doesn't automatically populate the input value on initialisation", function() {
      expect(getInputVal()).toEqual("");
    });



    describe("opening the dropdown and clicking on canada", function() {

      beforeEach(function() {
        selectFlag("ca");
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("ca");
      });

      it("adding a space doesnt reset to the default country for that dial code", function() {
        triggerKeyOnInput(" ");
        expect(getSelectedFlagElement()).toHaveClass("ca");
      });

    });



    describe("typing a number with a different dial code", function() {

      beforeEach(function() {
        input.val("+44 1234567");
        triggerKeyOnInput(" ");
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("clearing the input again does not change the selected flag", function() {
        input.val("");
        triggerKeyOnInput(" ");
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

    });



    describe("typing a dial code containing a space", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.val("+4 4 " + telNo);
        triggerKeyOnInput(key);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw");
        expect(getInputVal()).toEqual("+263 " + telNo + key);
      });

    });



    describe("typing a dial code containing a dot", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.val("+4.4 " + telNo);
        triggerKeyOnInput(key);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw");
        expect(getInputVal()).toEqual("+263 " + telNo + key);
      });

    });



    // must add to the dom to get focus/click-off-to-close to work
    describe("adding to dom", function() {

      beforeEach(function() {
        getParentElement().appendTo($("body"));
      });

      afterEach(function() {
        getParentElement().remove();
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

        // apparently it is impossible to trigger a CSS psuedo selector like :hover
        // http://stackoverflow.com/a/4347249/217866
        /*it("adds the hover class on hover", function() {
          getFlagsContainerElement().mouseover();
          expect(getFlagsContainerElement().css("cursor")).toEqual("pointer");
        });*/

        it("opens the dropdown on click", function() {
          getSelectedFlagContainer().click();
          expect(getListElement()).not.toHaveClass("hide");
        });

      });

      describe("input disabled", function() {

        beforeEach(function() {
          input.prop("disabled", true);
        });

        // apparently it is impossible to trigger a CSS psuedo selector like :hover
        // http://stackoverflow.com/a/4347249/217866
        /*it("doesn't add the hover class on hover", function() {
          getFlagsContainerElement().mouseover();
          expect(getFlagsContainerElement()).toHaveCss({"cursor": "default"});
        });*/

        it("doesn't open the dropdown on click", function() {
          getSelectedFlagContainer().click();
          expect(getListElement()).toHaveClass("hide");
        });

      });

    });

  });

});