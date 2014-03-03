"use strict";

describe("init plugin with nationalMode set to true", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      nationalMode: true
    });
    // must be in DOM for focus to work
    getParentElement().appendTo($("body"));
  });

  afterEach(function() {
    getParentElement().remove();
    input = null;
  });

  it("defaults to no dial code", function() {
    expect(getInputVal()).toEqual("");
  });

  it("focusing the input does not insert the dial code", function() {
    input.focus();
    expect(getInputVal()).toEqual("");
  });

  it("selecting another country does not insert the dial code", function() {
    selectFlag("gb");
    expect(getInputVal()).toEqual("");
  });

  it("but typing a dial code does still update the selected country", function() {
    input.val("+44 1234567").keyup();
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});