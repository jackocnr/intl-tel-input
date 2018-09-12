"use strict";

describe("loadUtils:", function() {

  beforeEach(function() {
    intlSetup();
    // must be in markup for utils loaded handler to work
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });



  describe("calling loadUtils before init plugin", function() {

    var url = "test/url/one/utils.js";

    beforeEach(function() {
      window.intlTelInputGlobals.loadUtils(url);
    });

    it("injects the script", function() {
      expect($("script.iti-load-utils")).toExist();
      expect($("script.iti-load-utils").attr("src")).toEqual(url);
    });

    describe("then init plugin with utilsScript option", function() {

      beforeEach(function(done) {
        iti = window.intlTelInput(input[0], {
          utilsScript: "some/other/url/ok",
        });
        setTimeout(done);
      });

      it("does not inject another script", function() {
        expect($("script.iti-load-utils").length).toEqual(1);
        expect($("script.iti-load-utils").attr("src")).toEqual(url);
      });

    });

  });



  describe("init plugin with utilsScript option, but force windowLoaded=false so it wont fire", function() {

    var url2 = "test/url/two/utils.js",
      resolved = false;

    beforeEach(function() {
      window.intlTelInputGlobals.windowLoaded = false;
      iti = window.intlTelInput(input[0], {
        utilsScript: "some/other/url/ok",
      });
      iti.promise.then(function() {
        resolved = true;
      });
    });

    afterEach(function() {
      resolved = false;
    });

    it("does not inject the script", function() {
      expect($("script.iti-load-utils")).not.toExist();
    });

    it("does not resolve the promise", function() {
      expect(resolved).toEqual(false);
    });



    describe("calling loadUtils", function() {

      beforeEach(function(done) {
        window.intlTelInputGlobals.loadUtils(url2);
        setTimeout(done);
      });

      it("does inject the script", function() {
        expect($("script.iti-load-utils")).toExist();
      });

      it("does resolve the promise", function() {
        expect(resolved).toEqual(true);
      });

      describe("then init another plugin instance with utilsScript option", function() {

        beforeEach(function(done) {
          var input2 = $("<input>").appendTo("body");
          var iti2 = window.intlTelInput(input2[0], {
            utilsScript: "test/url/three/utils.js",
          });
          setTimeout(done);
        });

        it("does not inject another script", function() {
          expect($("script.iti-load-utils").length).toEqual(1);
          expect($("script.iti-load-utils").attr("src")).toEqual(url2);
        });

      });

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

    it("injects the script", function() {
      expect($("script.iti-load-utils")).toExist();
    });

    it("then calling loadUtils does not inject another script", function() {
      window.intlTelInputGlobals.loadUtils("this/is/a/test");
      expect($("script.iti-load-utils").length).toEqual(1);
      expect($("script.iti-load-utils").attr("src")).toEqual(url3);
    });

  });

});
