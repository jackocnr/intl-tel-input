"use strict";

describe("customPlaceholder: init plugin with autoPlaceholder=true and customPlaceholder function", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput({
      autoPlaceholder: true,
      customPlaceholder: function(placeholder) {
        return "e.g. " + placeholder;
      }
    })
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("sets the placeholder to the customised US number", function() {
    expect(input.attr("placeholder")).toEqual("e.g. (201) 555-5555");
  });

  it("selecting UK updates the placeholder", function() {
    selectFlag("gb");
    expect(input.attr("placeholder")).toEqual("e.g. 07400 123456");
  });

});
