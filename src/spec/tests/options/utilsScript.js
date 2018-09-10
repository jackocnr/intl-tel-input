"use strict";

describe("utilsScript:", function() {

  var url = "build/js/utils.js";

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("init vanilla plugin does not inject the script", function() {
    iti = window.intlTelInput(input[0]);
    expect($("script.iti-load-utils")).not.toExist();
  });

  it("init plugin with utilsScript before window.load event does not inject the script", function() {
    // must explicitly call this here, as when running the test the real window.load event might have just fired
    window.intlTelInputGlobals.windowLoaded = false;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });
    expect($("script.iti-load-utils")).not.toExist();
  });

  it("faking window.load then init plugin with utilsScript does inject the script", function() {
    window.intlTelInputGlobals.windowLoaded = true;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });
    expect($("script.iti-load-utils")).toExist();
  });

});
