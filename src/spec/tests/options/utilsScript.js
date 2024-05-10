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

  it("init vanilla plugin does not start loading the utils script", function() {
    iti = window.intlTelInput(input[0]);

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
  });

  it("init plugin with utilsScript before documentReady event does not inject the script", function() {
    window.intlTelInput.documentReady = () => false;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
  });

  it("faking documentReady then init plugin with utilsScript does inject the script", function() {
    window.intlTelInput.documentReady = () => true;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
  });

});
