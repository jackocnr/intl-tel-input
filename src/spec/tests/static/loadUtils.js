"use strict";

describe("loadUtils:", function() {

  beforeEach(function() {
    intlSetup();
    // must be in markup for utils loaded handler to work
    input = $("<input>").appendTo("body");
    spyOn($, "ajax").and.callFake(function(params) {
      params.complete({});
    });
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("calling loadUtils before init plugin", function() {

    var url = "test/url/one/utils.js";

    beforeEach(function() {
      window.intlTelInputGlobals.loadUtils(url);
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
    });

    it("then if init plugin with utilsScript option it does not make another request", function() {
      iti = window.intlTelInput(input[0], {
        utilsScript: "some/other/url/ok",
      });
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url);
    });

  });


  describe("calling loadUtils after init plugin", function() {

    var url2 = "test/url/two/utils.js"
      resolved = false;

    beforeEach(function() {
      iti = window.intlTelInput(input[0]);
      iti.promise.then(function() {
        resolved = true;
      });
      window.intlTelInputGlobals.loadUtils(url2);
    });

    afterEach(function() {
      resolved = false;
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url2);
    });

    it("resolves the promise object", function() {
      expect(resolved).toEqual(true);
    });

    it("then init plugin again with utilsScript option does not make another request", function() {
      iti = window.intlTelInput(input[0], {
        utilsScript: "build/js/utils.js",
      });
      expect($.ajax.calls.count()).toEqual(1);
    });

  });


  describe("fake window.load event then init plugin with utilsScript", function() {

    var url3 = "test/url/three/utils.js";

    beforeEach(function() {
      window.intlTelInputGlobals.windowLoaded = true;
      iti = window.intlTelInput(input[0], {
        utilsScript: url3,
      });
    });

    it("makes an ajax call to the given url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url3);
    });

    it("then calling loadUtils does not make another request", function() {
      window.intlTelInputGlobals.loadUtils("this/is/a/test");
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.mostRecent().args[0].url).toEqual(url3);
    });

  });

});
