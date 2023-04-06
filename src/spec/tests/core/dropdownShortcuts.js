"use strict";

describe("dropdown shortcuts: init plugin (with nationalMode=false, autoInsertDialCode=true) to test keyboard shortcuts", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    iti = window.intlTelInput(input[0], {
      nationalMode: false,
      autoInsertDialCode: true,
    });
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("when selected flag element has focus", function() {

    beforeEach(function() {
      getFlagsContainerElement().focus();
    });

    it("pressing UP opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("ArrowUp");
      expect(getListElement()).toBeVisible();
    });

    it("pressing DOWN opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("ArrowDown");
      expect(getListElement()).toBeVisible();
    });

    it("pressing SPACE opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement(" ");
      expect(getListElement()).toBeVisible();
    });

    it("pressing ENTER opens the dropdown", function() {
      triggerKeyOnFlagsContainerElement("Enter");
      expect(getListElement()).toBeVisible();
    });

  });



  describe("when dropdown is opened", function() {

    beforeEach(function() {
      getSelectedFlagContainer()[0].click();
    });

    it("pressing esc closes the popup", function() {
      triggerKeyOnBody("Escape");
      expect(getListElement()).not.toBeVisible();
    });

    it("pressing up while on the top item does not change the highlighted item", function() {
      triggerKeyOnBody("ArrowUp");
      var topItem = getListElement().find("li.iti__country:eq(0)");
      expect(topItem).toHaveClass("iti__highlight");
    });

    it("pressing z highlights Zambia", function() {
      triggerKeyOnBody("z");
      var zambiaListItem = getListElement().find("li[data-country-code='zm']");
      expect(zambiaListItem).toHaveClass("iti__highlight");
    });

    it("pressing z three times also highlights Zambia (no further matches)", function() {
      triggerKeyOnBody("z");
      triggerKeyOnBody("z");
      triggerKeyOnBody("z");
      var zambiaListItem = getListElement().find("li[data-country-code='zm']");
      expect(zambiaListItem).toHaveClass("iti__highlight");
    });



    describe("typing z then i then DOWN", function() {

      var lastItem;

      beforeEach(function() {
        lastItem = getListElement().find("li.iti__country:last");
        triggerKeyOnBody("z");
        triggerKeyOnBody("i");
        triggerKeyOnBody("ArrowDown");
      });

      it("highlights the last item, which is Åland Islands", function() {
        expect(lastItem).toHaveClass("iti__highlight");
        expect(lastItem.attr("data-country-code")).toEqual("ax");
      });

      it("pressing down while on the last item does not change the highlighted item", function() {
        triggerKeyOnBody("ArrowDown");
        expect(lastItem).toHaveClass("iti__highlight");
      });
    });



    describe("pressing down", function() {

      beforeEach(function() {
        triggerKeyOnBody("ArrowDown");
      });

      it("changes the highlighted item", function() {
        var listElement = getListElement();
        var topItem = listElement.find("li.iti__country:eq(0)");
        expect(topItem).not.toHaveClass("iti__highlight");
        var secondItem = listElement.find("li.iti__country:eq(1)");
        expect(secondItem).toHaveClass("iti__highlight");
      });



      describe("pressing enter", function() {

        beforeEach(function() {
          triggerKeyOnBody("Enter");
        });

        it("changes the active item", function() {
          var listElement = getListElement();
          var topItem = listElement.find("li.iti__country:eq(0)");
          expect(topItem).not.toHaveClass("iti__active");
          var secondItem = listElement.find("li.iti__country:eq(1)");
          expect(secondItem).toHaveClass("iti__active");
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
