"use strict";

describe("dropdownContainer:", function() {

  beforeEach(function() {
    intlSetup();
    // insert input into the DOM so our visibility tests will work
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with dropdownContainer=null", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        dropdownContainer: null,
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

  describe("init plugin with dropdownContainer=document.body", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        dropdownContainer: document.body,
      });
    });

    it("doesnt immediately add the markup to the DOM", function() {
      expect($(".iti--container")).not.toExist();
    });

    describe("triggering the dropdown", function() {

      beforeEach(function() {
        getSelectedFlagContainer().click();
      });

      it("adds the markup to that element and makes it visible in the document", function() {
        expect($("body>.iti--container")).toBeVisible();
      });

      it("selecting a country removes the markup again", function() {
        $("body>.iti--container").find("li[data-country-code='gb']").click();
        expect($("body>.iti--container")).not.toExist();
      });

      it("clicking-off removes the markup again", function() {
        $("body").click();
        expect($("body>.iti--container")).not.toExist();
      });

    });

  });

});
