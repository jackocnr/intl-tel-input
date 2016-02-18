"use strict";

describe("dropdownContainer:", function() {

  beforeEach(function() {
    intlSetup();
    // insert input into the DOM so our visibility tests will work
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = null;
  });

  describe("init plugin with dropdownContainer=''", function() {

    beforeEach(function() {
      input.intlTelInput({
        dropdownContainer: ""
      });
    });

    it("adds the dropdown markup next to the input", function() {
      expect(getListElement()).toExist();
    });

    describe("clicking the selected flag", function() {

      beforeEach(function() {
        getSelectedFlagContainer().click();
      });

      it("shows the dropdown", function() {
        expect(getListElement()).toBeVisible();
      });

      it("clicking-off removes the markup again", function() {
        $("body").click();
        expect(getListElement()).not.toBeVisible();
      });

    });

  });

  describe("init plugin with dropdownContainer='body'", function() {

    var selector = "body";

    beforeEach(function() {
      input.intlTelInput({
        dropdownContainer: selector
      });
    });

    it("doesnt immediately add the markup to that element", function() {
      expect($(selector+">.iti-container")).not.toExist();
    });

    describe("triggering the dropdown", function() {

      beforeEach(function() {
        getSelectedFlagContainer().click();
      });

      it("adds the markup to that element and makes it visible in the document", function() {
        expect($(selector+">.iti-container")).toBeVisible();
      });

      it("selecting a country removes the markup again", function() {
        $(selector+">.iti-container").find("li[data-country-code='gb']").click();
        expect($(selector+">.iti-container")).not.toExist();
      });

      it("clicking-off removes the markup again", function() {
        $("body").click();
        expect($(selector+">.iti-container")).not.toExist();
      });

    });

  });

});
