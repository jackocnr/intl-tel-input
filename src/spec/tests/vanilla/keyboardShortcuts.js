"use strict";

describe("keyboard shortcuts: init vanilla plugin (with nationalMode=false) to test keyboard shortcuts - open dropdown", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    input.intlTelInput({
      nationalMode: false
    });
    getSelectedFlagContainer().click();
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("pressing esc closes the popup", function() {
    triggerKeyOnBody("ESC");
    expect(getListElement()).toHaveClass("hide");
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



  describe("typing z then i", function() {

    var lastItem;

    beforeEach(function() {
      lastItem = getListElement().find("li.country:last");
      triggerKeyOnBody("Z");
      triggerKeyOnBody("I");
    });

    it("highlights the last item, which is Zimbabwe", function() {
      expect(lastItem).toHaveClass("highlight");
      expect(lastItem.attr("data-country-code")).toEqual("zw");
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
        expect(getListElement()).toHaveClass("hide");
      });

      it("updates the dial code", function() {
        expect(getInputVal()).toEqual("+44");
      });

    });

  });

});