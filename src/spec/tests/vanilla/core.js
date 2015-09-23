"use strict";

describe("vanilla:", function() {

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


  describe("init plugin on input with prepopulated value", function() {

    beforeEach(function() {
      element.value = "+44 12345";
      input = new IntlTelInput(element);
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem(input.inputElement)[0].getAttribute("data-country-code")).toEqual("gb");
    });

  });



  describe("init vanilla plugin on input with invalid prepopulated value", function() {

    beforeEach(function() {
      element.value = "8";
      input = new IntlTelInput(element);
    });

    it("sets the selected flag correctly", function() {
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("us");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem(input.inputElement)[0].getAttribute("data-country-code")).toEqual("us");
    });

  });



  describe("init vanilla plugin with nationalMode = false", function() {

    beforeEach(function() {
      input = new IntlTelInput(element, {
        nationalMode: false
      });
    });


    it("creates a container with the right class", function() {
      expect(input.inputElement.parentNode).toHaveClass("intl-tel-input");
    });

    // preferredCountries defaults to 2 countries
    it("has the right number of list items", function() {
      var defaultPreferredCountries = 2;

      expect(getListLength(input.inputElement)).toEqual(totalCountries + defaultPreferredCountries);
      expect(getPreferredCountriesLength(input.inputElement)).toEqual(defaultPreferredCountries);

      // only 1 active list item
      expect(getActiveListItem(input.inputElement).length).toEqual(1);
    });

    it("defaults to the right flag", function() {
      expect(getSelectedFlagElement(input.inputElement)).toHaveClass("us");
    });

    it("sets the active list item correctly", function() {
      expect(getActiveListItem(input.inputElement)[0].getAttribute("data-country-code")).toEqual("us");
    });

    // autoHideDialCode defaults to true, which means dont show dial code until focused
    it("doesn't automatically populate the input value on initialisation", function() {
      expect(input.inputElement.value).toEqual("");
    });



    describe("opening the dropdown and clicking on canada", function() {

      beforeEach(function() {
        selectFlag("ca", input.inputElement);
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("ca");
      });

      it("adding a space doesnt reset to the default country for that dial code", function() {
        triggerNativeKeyOnInput(" ", input.inputElement);
        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("ca");
      });

    });



    describe("typing a number with a different dial code", function() {

      beforeEach(function() {
        input.inputElement.value = "+44 1234567";
        triggerNativeKeyOnInput(" ", input.inputElement);
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
      });

      it("clearing the input again does not change the selected flag", function() {
        input.inputElement.value = "";
        triggerNativeKeyOnInput(" ", input.inputElement);

        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
      });

    });



    describe("typing a dial code containing a space", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.inputElement.value = "+4 4 " + telNo;
        triggerNativeKeyOnInput(key, input.inputElement);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw", input.inputElement);
        expect(input.inputElement.value).toEqual("+263 " + telNo + key);
      });

    });



    describe("typing a dial code containing a dot", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.inputElement.value = "+4.4 " + telNo;
        triggerNativeKeyOnInput(key, input.inputElement);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement(input.inputElement)).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw", input.inputElement);
        expect(input.inputElement.value).toEqual("+263 " + telNo + key);
      });

    });



    // must add to the dom to get focus/click-off-to-close to work
    describe("adding to dom", function() {

      beforeEach(function() {
        document.body.appendChild(input.inputElement.parentNode);
      });

      afterEach(function() {
        var parentElement = input.inputElement.parentNode;
        parentElement.parentNode.removeChild(parentElement);
      });

      // autoHideDialCode defaults to true
      it("focusing the input adds the default dial code, and blur removes it again", function() {
        expect(input.inputElement.value).toEqual("");
        input.inputElement.focus();

        expect(input.inputElement.value).toEqual("+1");
        input.inputElement.blur();
        expect(input.inputElement.value).toEqual("");
      });


      describe("clicking the selected flag to open the dropdown", function() {

        beforeEach(function() {
          dispatchEvent(getSelectedFlagContainer(input.inputElement), "click", true, false);;
        });

        it("opens the dropdown with the top item marked as active and highlighted", function() {
          expect(getListElement(input.inputElement)).not.toHaveClass("hide");
          var topItem = getListElement(input.inputElement).querySelector("li.country:first-child");
          expect(topItem).toHaveClass("active highlight");
        });

        it("clicking it again closes the dropdown", function() {
          dispatchEvent(getSelectedFlagContainer(input.inputElement), "click", true, false);;
          expect(getListElement(input.inputElement)).toHaveClass("hide");
        });

        it("clicking off closes the dropdown", function() {
          dispatchEvent(document, "click", true, true);
          expect(getListElement(input.inputElement)).toHaveClass("hide");
        });



        describe("selecting a new country item", function() {

          var countryCode = "gb";

          beforeEach(function() {
            var countryElement = getListElement(input.inputElement).querySelector("li[data-country-code='" + countryCode + "']");
            dispatchEvent(countryElement, "click", true, false);
          });

          it("updates the selected flag", function() {
            expect(getSelectedFlagElement(input.inputElement)).toHaveClass(countryCode);
          });

          it("updates the dial code", function() {
            expect(input.inputElement.value).toEqual("+44");
          });

        });

      });

    });



    describe("enabled/disabled tests", function() {

      describe("input enabled", function() {

        // apparently it is impossible to trigger a CSS psuedo selector like :hover
        // http://stackoverflow.com/a/4347249/217866
        /*it("adds the hover class on hover", function() {
          getFlagsContainerElement([0]).mouseover();
          expect(getFlagsContainerElement([0]).css("cursor")).toEqual("pointer");
        });*/

        it("opens the dropdown on click", function() {
          dispatchEvent(getSelectedFlagContainer(input.inputElement), "click", true, false);;
          expect(getListElement(input.inputElement)).not.toHaveClass("hide");
        });

      });

      describe("input disabled", function() {

        beforeEach(function() {
          input.inputElement.disabled = true;
        });

        // apparently it is impossible to trigger a CSS psuedo selector like :hover
        // http://stackoverflow.com/a/4347249/217866
        /*it("doesn't add the hover class on hover", function() {
          getFlagsContainerElement([0]).mouseover();
          expect(getFlagsContainerElement([0])).toHaveCss({"cursor": "default"});
        });*/

        it("doesn't open the dropdown on click", function() {
          dispatchEvent(getSelectedFlagContainer(input.inputElement), "click", true, false);;
          expect(getListElement(input.inputElement)).toHaveClass("hide");
        });

      });

    });

  });

});
