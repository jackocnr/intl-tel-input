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

    var url = "build/js/utils.js?v=1",
      resolved = false;

    beforeEach(function(done) {
      var promise = window.intlTelInputGlobals.loadUtils(url);
      promise.then(function() {
        resolved = true;
        done();
      });
    });

    afterEach(function() {
      resolved = false;
    });

    it("injects the script", function() {
      expect($("script.iti-load-utils")).toExist();
      expect($("script.iti-load-utils").attr("src")).toEqual(url);
    });

    it("does resolve the promise", function() {
      expect(resolved).toEqual(true);
    });



    describe("then init plugin with utilsScript option", function() {

      var resolved2 = false;

      beforeEach(function(done) {
        iti = window.intlTelInput(input[0], {
          utilsScript: "some/other/url/ok",
        });
        iti.promise.then(function() {
          resolved2 = true;
        });
        setTimeout(done);
      });

      afterEach(function() {
        resolved2 = false;
      });

      it("does not inject another script", function() {
        expect($("script.iti-load-utils").length).toEqual(1);
        expect($("script.iti-load-utils").attr("src")).toEqual(url);
      });

      it("does resolve the promise immediately", function() {
        expect(resolved2).toEqual(true);
      });

    });

  });



  describe("init plugin with utilsScript option, but force windowLoaded=false so it wont fire", function() {

    var url2 = "build/js/utils.js?v=2",
      resolved = false;

    beforeEach(function(done) {
      window.intlTelInputGlobals.windowLoaded = false;
      iti = window.intlTelInput(input[0], {
        utilsScript: "some/other/url/ok",
      });
      iti.promise.then(function() {
        resolved = true;
      });
      waitForUtilsRequest(done);
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
        waitForUtilsRequest(done);
      });

      it("does inject the script", function() {
        expect($("script.iti-load-utils")).toExist();
      });

      it("does resolve the promise", function() {
        expect(resolved).toEqual(true);
      });



      describe("then init another plugin instance with utilsScript option", function() {

        var iti2,
          input2,
          resolved2 = false;

        beforeEach(function(done) {
          input2 = $("<input>").appendTo("body");
          iti2 = window.intlTelInput(input2[0], {
            utilsScript: "test/url/three/utils.js",
          });
          iti2.promise.then(function() {
            resolved2 = true;
          });
          setTimeout(done);
        });

        afterEach(function() {
          iti2.destroy();
          input2.remove();
          iti2 = input2 = null;
        });

        it("does not inject another script", function() {
          expect($("script.iti-load-utils").length).toEqual(1);
          expect($("script.iti-load-utils").attr("src")).toEqual(url2);
        });

        it("does resolve the promise immediately", function() {
          expect(resolved2).toEqual(true);
        });

      });

    });

  });



  describe("fake window.load event then init plugin with utilsScript", function() {

    var url3 = "build/js/utils.js?v=3";

    beforeEach(function(done) {
      window.intlTelInputGlobals.windowLoaded = true;
      iti = window.intlTelInput(input[0], {
        utilsScript: url3,
      });
      // wait for the request to finish so we dont interfere with other tests
      iti.promise.finally(done);
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
