"use strict";

describe("init plugin with autoHideDialCode set to false", function() {

  var defaultDialCode = "+1";

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      autoHideDialCode: false
    });
    input.parent().appendTo($("body"));
  });

  afterEach(function() {
    input.parent().remove();
    input = null;
  });

  it("automatically inserts the default dial code", function() {
    expect(getInputVal()).toEqual(defaultDialCode);
  });

  it("focusing and bluring the input dont change anything", function() {
    input.focus();
    expect(getInputVal()).toEqual(defaultDialCode);
    input.blur();
    expect(getInputVal()).toEqual(defaultDialCode);
  });

});