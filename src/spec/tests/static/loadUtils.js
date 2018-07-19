"use strict";

describe("loadUtils:", function() {

  var deferred;

  beforeEach(function() {
    intlSetup();
    // must be in markup for utils loaded handler to work
    input = $("<input>").appendTo("body");
    spyOn($, "ajax").and.callFake(function(params) {
      params.complete({});
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = deferred = null;
    // reset this flag so it doesn't think utils.js is already loaded
    $.fn.intlTelInput.startedLoadingUtilsScript = $.fn.intlTelInput.windowLoaded = false;
  });

  describe("calling loadUtils before init plugin", function() {

    var url = "test/url/one/utils.js";

    beforeEach(function() {
      $.fn.intlTelInput.loadUtils(url);
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
    });

    it("then if init plugin with utilsScript option it does not make another request", function() {
      input.intlTelInput({
        utilsScript: "some/other/url/ok"
      });
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
    });

  });


  describe("calling loadUtils after init plugin", function() {

    var url2 = "test/url/two/utils.js";

    beforeEach(function() {
      deferred = input.intlTelInput();
      $.fn.intlTelInput.loadUtils(url2);
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url2);
    });

    it("resolves the deferred object", function() {
      expect(deferred.state()).toEqual("resolved");
    });

    it("then init plugin again with utilsScript option does not make another request", function() {
      input.intlTelInput({
        utilsScript: "build/js/utils.js"
      });
      expect($.ajax.calls.count()).toEqual(1);
    });

  });


  describe("fake window.load event then init plugin with utilsScript", function() {

    var url3 = "test/url/three/utils.js";

    beforeEach(function() {
      $.fn.intlTelInput.windowLoaded = true;
      input.intlTelInput({
        utilsScript: url3
      });
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url3);
    });

    it("then calling loadUtils does not make another request", function() {
      $.fn.intlTelInput.loadUtils("this/is/a/test");
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url3);
    });

  });

});
