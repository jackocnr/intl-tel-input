"use strict";

describe("utilsScript:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    spyOn($, "ajax");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
    // here we must fake that the script has not yet been loaded
    $.fn.intlTelInput.startedLoadingUtilsScript = $.fn.intlTelInput.windowLoaded = false;
  });

  it("init vanilla plugin does not load the script", function() {
    input.intlTelInput();
    expect($.ajax).not.toHaveBeenCalled();
  });

  it("init plugin with utilsScript before window.load event does not load the script", function() {
    input.intlTelInput({
      utilsScript: "this/is/not/real.lol"
    });
    expect($.ajax).not.toHaveBeenCalled();
  });

  it("faking window.load then init plugin with utilsScript does load the script", function() {
    var url = "build/js/utils.js";
    $.fn.intlTelInput.windowLoaded = true;
    input.intlTelInput({
      utilsScript: url
    });
    expect($.ajax.calls.count()).toEqual(1);
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
  });

});
