"use strict";

describe("dropdownContainer:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("init plugin with dropdownContainer='' adds the dropdown markup next to the input", function() {
    input.intlTelInput({
      dropdownContainer: ""
    });
    expect(getSelectedFlagContainer()).toExist();
  });

  describe("init plugin with dropdownContainer='body'", function() {

    beforeEach(function() {
      input.intlTelInput({
        dropdownContainer: "body"
      });
      // must be in DOM for the detach call to work in _closeDropdown
      getParentElement().appendTo($("body"));
    });

    afterEach(function() {
      getParentElement().remove();
    });

    it("doesnt immediately add the markup to that element", function() {
      expect($("body>.iti-container")).not.toExist();
    });

    describe("triggering the dropdown", function() {

      beforeEach(function() {
        getSelectedFlagContainer().click();
      });

      it("adds the markup to that element and makes it visible in the document", function() {
        expect($("body>.iti-container")).toBeVisible();
      });

      it("selecting a country removes the markup again", function() {
        $("body>.iti-container").find("li[data-country-code='gb']").click();
        expect($("body>.iti-container")).not.toExist();
      });

    });

  });

});
