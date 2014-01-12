"use strict";

describe("init vanilla plugin to test keyboard shortcuts - open dropdown", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
    getSelectedFlagContainer().click();
  });

  afterEach(function() {
    input = null;
  });

  it("pressing down highlights the second country option", function() {
    
  });

});