"use strict";

describe("keyboard shortcuts: init vanilla plugin (with nationalMode=false) to test keyboard shortcuts", function() {

  var input;

  beforeEach(function() {
    intlSetup();
    input = new IntlTelInput(document.createElement("input"), {
      nationalMode: false
    });
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  describe("when dropdown is closed", function () {
    beforeEach(function () {
      // FIXME: tests still pass when this line is commented out -_-
      getFlagsContainerElement(input.inputElement).focus();
    });

    it("pressing UP opens the dropdown", function () {
      triggerKeyOnFlagsContainerElement(input.inputElement, "UP");
      expect(getListElement(input.inputElement)).not.toHaveClass("hide");
    });

    it("pressing DOWN opens the dropdown", function () {
      triggerKeyOnFlagsContainerElement(input.inputElement, "DOWN");
      expect(getListElement(input.inputElement)).not.toHaveClass("hide");
    });

    it("pressing SPACE opens the dropdown", function () {
      triggerKeyOnFlagsContainerElement(input.inputElement, "SPACE");
      expect(getListElement(input.inputElement)).not.toHaveClass("hide");
    });

    it("pressing ENTER opens the dropdown", function () {
      triggerKeyOnFlagsContainerElement(input.inputElement, "ENTER");
      expect(getListElement(input.inputElement)).not.toHaveClass("hide");
    });
  });

  describe("when dropdown is opened", function () {
    beforeEach(function () {
      dispatchEvent(getSelectedFlagContainer(input.inputElement), "click", true, false);;
    });

    it("pressing esc closes the popup", function() {
      triggerKeyOnBody("ESC");
      expect(getListElement(input.inputElement)).toHaveClass("hide");
    });

    it("pressing up while on the top item does not change the highlighted item", function() {
      var topItem = getListElement(input.inputElement).querySelector("li.country:first-child");
      triggerKeyOnBody("UP");

      expect(topItem).toHaveClass("highlight");
    });

    it("pressing z highlights Zambia", function() {
      var zambiaListItem = getListElement(input.inputElement).querySelector("li[data-country-code='zm']");
      triggerKeyOnBody("Z");

      expect(zambiaListItem).toHaveClass("highlight");
    });

    it("pressing z three times also highlights Zambia (no further matches)", function() {
      var zambiaListItem = getListElement(input.inputElement).querySelector("li[data-country-code='zm']");
      triggerKeyOnBody("Z");
      triggerKeyOnBody("Z");
      triggerKeyOnBody("Z");

      expect(zambiaListItem).toHaveClass("highlight");
    });

    describe("typing z then i", function() {

      var lastItem;

      beforeEach(function() {
        lastItem = getListElement(input.inputElement).querySelector("li.country:last-child");
        triggerKeyOnBody("Z");
        triggerKeyOnBody("I");
      });

      it("highlights the last item, which is Zimbabwe", function() {
        expect(lastItem.getAttribute("data-country-code")).toEqual("zw");
        expect(lastItem).toHaveClass("highlight");
      });

      it("pressing down while on the last item does not change the highlighted item", function() {
        triggerKeyOnBody("DOWN");
        expect(lastItem).toHaveClass("highlight");
      });
    });



    describe("pressing down", function() {

      beforeEach(function() {
        triggerKeyOnBody("DOWN");
      });

      it("changes the highlighted item", function() {
        var listElement = getListElement(input.inputElement);
        var topItem = listElement.querySelector("li.country:first-child");
        var secondItem = listElement.querySelector("li.country:nth-child(2)");

        expect(topItem).not.toHaveClass("highlight");
        expect(secondItem).toHaveClass("highlight");
      });



      describe("pressing enter", function() {

        beforeEach(function() {
          triggerKeyOnBody("ENTER");
        });

        it("changes the active item", function() {
          var listElement = getListElement(input.inputElement);
          var topItem = listElement.querySelector("li.country:first-child");
          var secondItem = listElement.querySelector("li.country:nth-child(2)");

          expect(topItem).not.toHaveClass("active");
          expect(secondItem).toHaveClass("active");
        });

        it("closes the dropdown", function() {
          expect(getListElement(input.inputElement)).toHaveClass("hide");
        });

        it("updates the dial code", function() {
          expect(input.inputElement.value).toEqual("+44");
        });

      });

    });
  });

});
