"use strict";

describe("destroy: init plugin to test public method destroy", function() {

  var input;

  beforeEach(function() {
    intlSetup();
    input = new IntlTelInput(document.createElement("input"));
  });

  afterEach(function() {
    input = null;
  });

  it("adds the markup", function() {
    expect(input.inputElement.parentNode).toHaveClass("intl-tel-input");
    expect(getSelectedFlagContainer(input.inputElement)).toExist();
    expect(getListElement(input.inputElement)).toExist();
  });


  describe("calling destroy", function() {

    beforeEach(function() {
      input.destroy();
    });

    it("removes the markup", function() {
      expect(input.inputElement.parentNode).not.toHaveClass("intl-tel-input");
      expect(getSelectedFlagContainer(input.inputElement)).not.toExist();
      expect(getListElement(input.inputElement)).not.toExist();
    });
  });
});
