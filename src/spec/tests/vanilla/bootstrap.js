"use strict";

describe("bootstrap: init plugin with form-control class to test bootstrap compatibility", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input class='form-control'>");

    input.intlTelInput();

    $("body").append(getParentElement(input));
  });

  afterEach(function() {
    getParentElement(input).remove();
    input.intlTelInput("destroy");
    input = null;
  });

  // ensure compatibility with bootstrap .input-group which requires immediate descendant .form-control elements
  it("adds the form-control class to the input wrapper", function() {
    expect(getParentElement(input)).toHaveClass("form-control");

    // input will be floated by bootstrap CSS; ensure that parent fully contains it
    expect(getParentElement(input)).toHaveClass("clearfix");
  });

  // ensure that the metrics for the input match the parent element; they are overlayed
  it("maintains the form-control class on the input", function() {
    expect(input).toHaveClass("form-control");
  });

});