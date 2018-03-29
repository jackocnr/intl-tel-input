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
    $.fn.intlTelInput.loadedUtilsScript = $.fn.intlTelInput.windowLoaded = false;
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

  describe("utilsScript multi-instance:", function() {
    var input2;

    beforeEach(function () {
      input2 = $("<input>");
      // pretend that window has loaded so utilsScript will be loaded
      $.fn.intlTelInput.windowLoaded = true;
    });

    afterEach(function() {
      input2.intlTelInput("destroy");
      input2 = null;
    });

    it("utilsScriptDeferred is resolved correctly for both instances",
      function () {
        var url = "fake.url",
          fakeAjax = $.Deferred();

        // set up fake completion of ajax call
        $.ajax.and.callFake(function (params) {
          fakeAjax.done(() => params.complete({}));
        });

        var deferred1 = input.intlTelInput({
          utilsScript: url
        });
        var deferred2 = input2.intlTelInput({
          utilsScript: url
        });
        $("body").append(getParentElement(input)).append(getParentElement(input2));

        expect(deferred1.state()).toEqual("pending");
        expect(deferred2.state()).toEqual("pending");

        // fake complete the ajax call, do checks after handlers have finished
        fakeAjax.resolve().then(() => {
          expect(deferred1.state()).toEqual("resolved");
          expect(deferred2.state()).toEqual("resolved");
        });
      });
  });
});
