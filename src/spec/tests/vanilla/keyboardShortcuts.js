"use strict";

describe("init vanilla plugin to test keyboard shortcuts - open dropdown", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
    getSelectedFlagContainer().click();
  });

  afterEach(function() {
    input = null;
  });

  it("pressing esc closes the popup", function() {
    triggerKey("esc");
    expect(getListElement()).toHaveClass("hide");
  });

  it("pressing up while on the top item does not change the highlighted item", function() {
    triggerKey("up");
    var topItem = getListElement().find("li.country:eq(0)");
    expect(topItem).toHaveClass("highlight");
  });

  it("pressing z highlights Zambia", function() {
    triggerKey("z");
    var zambiaListItem = getListElement().find("li[data-country-code='zm']");
    expect(zambiaListItem).toHaveClass("highlight");
  });

  it("pressing z twice highlights Zimbabwe", function() {
    triggerKey("z");
    triggerKey("z");
    var zimbabweListItem = getListElement().find("li[data-country-code='zw']");
    expect(zimbabweListItem).toHaveClass("highlight");
  });



  describe("pressing down", function() {
  
    beforeEach(function() {
      triggerKey("down");
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
        triggerKey("enter");
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