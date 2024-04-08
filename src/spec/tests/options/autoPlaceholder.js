"use strict";

describe("autoPlaceholder: testing input with no placeholder", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("init plugin with autoPlaceholder=off leaves the placeholder empty", function() {
    iti = window.intlTelInput(input[0], {
      autoPlaceholder: "off",
      initialCountry: "af",
    });

    expect(input.attr("placeholder")).toBeUndefined();
  });

  describe("init plugin with autoPlaceholder=polite and nationalMode=true", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoPlaceholder: "polite",
        nationalMode: true,
        initialCountry: "af",
      });
    });

    it("sets the placeholder to an example national number for Afghanistan", function() {
      expect(input.attr("placeholder")).toEqual("070 123 4567");
    });

    describe("changing the country to the UK", function() {

      beforeEach(function() {
        selectCountry("gb");
      });

      it("updates the placeholder to an example national number for the UK", function() {
        expect(input.attr("placeholder")).toEqual("07400 123456");
      });

    });

  });

  describe("init plugin with autoPlaceholder=polite and nationalMode=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoPlaceholder: "polite",
        nationalMode: false,
        initialCountry: "af",
      });
    });

    it("sets the placeholder to an example international number for Afghanistan", function() {
      expect(input.attr("placeholder")).toEqual("+93 70 123 4567");
    });

    describe("changing the country to the UK", function() {

      beforeEach(function() {
        selectCountry("gb");
      });

      it("updates the placeholder to an example national number for the UK", function() {
        expect(input.attr("placeholder")).toEqual("+44 7400 123456");
      });

    });

  });

});




describe("autoPlaceholder: testing input with an initial placeholder", function() {

  var placeholder = "lol";

  beforeEach(function() {
    intlSetup(true);
    input = $("<input placeholder='"+placeholder+"'>");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("init plugin with autoPlaceholder=off leaves the placeholder the same", function() {
    iti = window.intlTelInput(input[0], {
      autoPlaceholder: "off",
      initialCountry: "af",
    });

    expect(input.attr("placeholder")).toEqual(placeholder);
  });

  it("init plugin with autoPlaceholder=polite leaves the placeholder the same", function() {
    iti = window.intlTelInput(input[0], {
      autoPlaceholder: "polite",
      initialCountry: "af",
    });

    expect(input.attr("placeholder")).toEqual(placeholder);
  });

  it("init plugin with autoPlaceholder=aggressive overwrites the placeholder", function() {
    iti = window.intlTelInput(input[0], {
      autoPlaceholder: "aggressive",
      initialCountry: "af",
    });

    expect(input.attr("placeholder")).toEqual("070 123 4567");
  });

});
