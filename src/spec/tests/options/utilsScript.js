"use strict";

describe("utilsScript:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    spyOn($, "ajax");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("init vanilla plugin does not load the script", function() {
    iti = window.intlTelInput(input[0]);
    expect($.ajax).not.toHaveBeenCalled();
  });

  it("init plugin with utilsScript before window.load event does not load the script", function() {
    iti = window.intlTelInput(input[0], {
      utilsScript: "this/is/not/real.lol",
    });
    expect($.ajax).not.toHaveBeenCalled();
  });

  it("faking window.load then init plugin with utilsScript does load the script", function() {
    var url = "build/js/utils.js";
    window.intlTelInputGlobals.windowLoaded = true;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });
    expect($.ajax.calls.count()).toEqual(1);
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
  });

});
