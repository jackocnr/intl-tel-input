"use strict";

describe("customPlaceholder: init plugin with autoPlaceholder=polite and customPlaceholder function", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0], {
      autoPlaceholder: "polite",
      initialCountry: "af",
      customPlaceholder: function(placeholder) {
        return "e.g. " + placeholder;
      },
    });
  });

  afterEach(function() {
    intlTeardown();
  });

  it("sets the placeholder to the customised Afghanistan number", function() {
    expect(input.attr("placeholder")).toEqual("e.g. 070 123 4567");
  });

  it("selecting UK updates the placeholder", function() {
    selectCountry("gb");

    expect(input.attr("placeholder")).toEqual("e.g. 07400 123456");
  });

});
