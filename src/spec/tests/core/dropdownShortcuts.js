"use strict";

describe("dropdown shortcuts: init plugin with nationalMode=false to test keyboard shortcuts", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    iti = window.intlTelInput(input[0], {
      nationalMode: false,
    });
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("when selected flag element has focus", function() {

    beforeEach(function() {
      getCountryContainerElement().focus();
    });

    it("pressing UP opens the dropdown", function() {
      triggerKeyOnCountryContainerElement("ArrowUp");

      expect(getListElement()).toBeVisible();
    });

    it("pressing DOWN opens the dropdown", function() {
      triggerKeyOnCountryContainerElement("ArrowDown");

      expect(getListElement()).toBeVisible();
    });

    it("pressing SPACE opens the dropdown", function() {
      triggerKeyOnCountryContainerElement(" ");

      expect(getListElement()).toBeVisible();
    });

    it("pressing ENTER opens the dropdown", function() {
      triggerKeyOnCountryContainerElement("Enter");

      expect(getListElement()).toBeVisible();
    });

  });



  describe("when dropdown is opened", function() {

    beforeEach(function() {
      getSelectedCountryContainer()[0].click();
    });

    it("pressing esc closes the popup", function() {
      triggerKeyOnBody("Escape");

      expect(getListElement()).not.toBeVisible();
    });

    it("pressing up while on the top item highlights the bottom item", function() {
      triggerKeyOnBody("ArrowUp");
      var lastItem = getListElement().find("li.iti__country:last");

      expect(lastItem).toHaveClass("iti__highlight");
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

        it("closes the dropdown", function() {
          expect(getListElement()).not.toBeVisible();
        });

        it("updates the selected flag", function() {
          expect(getSelectedCountryElement()).toHaveClass("iti__al");
        });

      });

    });
  });

});
