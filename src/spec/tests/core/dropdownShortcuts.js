"use strict";

describe("dropdown shortcuts: init plugin (with nationalMode=false) to test keyboard shortcuts", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    input.intlTelInput({
      nationalMode: false
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = null;
  });



  describe("when selected flag element has focus", function() {

    beforeEach(function() {
      getFlagsContainerElement().focus();
    });

    it("pressing UP opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("UP");
      expect(getListElement()).toBeVisible();
    });

    it("pressing DOWN opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("DOWN");
      expect(getListElement()).toBeVisible();
    });

    it("pressing SPACE opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("SPACE");
      expect(getListElement()).toBeVisible();
    });

    it("pressing ENTER opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("ENTER");
      expect(getListElement()).toBeVisible();
    });

  });



  describe("when dropdown is opened", function() {

    beforeEach(function() {
      getSelectedFlagContainer().click();
    });

    it("pressing esc closes the popup", function() {
      triggerKeyOnBody("ESC");
      expect(getListElement()).not.toBeVisible();
    });

    it("pressing up while on the top item does not change the highlighted item", function() {
      triggerKeyOnBody("UP");
      var topItem = getListElement().find("li.country:eq(0)");
      expect(topItem).toHaveClass("highlight");
    });

    it("pressing z highlights Zambia", function() {
      triggerKeyOnBody("Z");
      var zambiaListItem = getListElement().find("li[data-country-code='zm']");
      expect(zambiaListItem).toHaveClass("highlight");
    });

    it("pressing z three times also highlights Zambia (no further matches)", function() {
      triggerKeyOnBody("Z");
      triggerKeyOnBody("Z");
      triggerKeyOnBody("Z");
      var zambiaListItem = getListElement().find("li[data-country-code='zm']");
      expect(zambiaListItem).toHaveClass("highlight");
    });



    describe("typing z then i then DOWN", function() {

      var lastItem;

      beforeEach(function() {
        lastItem = getListElement().find("li.country:last");
        triggerKeyOnBody("Z");
        triggerKeyOnBody("I");
        triggerKeyOnBody("DOWN");
      });

      it("highlights the last item, which is Åland Islands", function() {
        expect(lastItem).toHaveClass("highlight");
        expect(lastItem.attr("data-country-code")).toEqual("ax");
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
        var listElement = getListElement();
        var topItem = listElement.find("li.country:eq(0)");
        expect(topItem).not.toHaveClass("highlight");
        var secondItem = listElement.find("li.country:eq(1)");
        expect(secondItem).toHaveClass("highlight");
      });



      describe("pressing enter", function() {

        beforeEach(function() {
          triggerKeyOnBody("ENTER");
        });

        it("changes the active item", function() {
          var listElement = getListElement();
          var topItem = listElement.find("li.country:eq(0)");
          expect(topItem).not.toHaveClass("active");
          var secondItem = listElement.find("li.country:eq(1)");
          expect(secondItem).toHaveClass("active");
        });

        it("closes the dropdown", function() {
          expect(getListElement()).not.toBeVisible();
        });

        it("updates the dial code", function() {
          expect(getInputVal()).toEqual("+44");
        });

      });

    });
  });

});
