"use strict";

describe("allowPlaceholderOverwrite: testing input without an initial placeholder", function() {

  var placeholder = "";

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("init plugin with allowPlaceholderOverwrite=false has a placeholder", function() {
    input.intlTelInput({
      allowPlaceholderOverwrite: false
    });
    expect(input.attr("placeholder")).toEqual("(201) 555-5555");
  });

  it("init plugin with allowPlaceholderOverwrite=true overwrites the placeholder", function() {
    input.intlTelInput({
      allowPlaceholderOverwrite: true
    });
    expect(input.attr("placeholder")).toEqual("(201) 555-5555");
  });

});

describe("allowPlaceholderOverwrite: testing input with an initial placeholder", function() {

  var placeholder = "wow";

  beforeEach(function() {
    intlSetup(true);
    input = $("<input placeholder='"+placeholder+"'>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("init plugin with allowPlaceholderOverwrite=false leaves the placeholder the same", function() {
    input.intlTelInput({
      allowPlaceholderOverwrite: false
    });
    expect(input.attr("placeholder")).toEqual(placeholder);
  });

  it("init plugin with allowPlaceholderOverwrite=true overwrites the placeholder", function() {
    input.intlTelInput({
      allowPlaceholderOverwrite: true
    });
    expect(input.attr("placeholder")).toEqual("(201) 555-5555");
  });

});

