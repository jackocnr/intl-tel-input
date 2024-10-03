"use strict";

describe("loadUtils:", function() {
  useIntlTelInputBuild("build/js/intlTelInput.js");

  function setTimeoutAsync (milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  beforeEach(function() {
    intlSetup();
    //* Must be in markup for utils loaded handler to work.
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("calling loadUtils before init plugin", function() {

    let url = "/build/js/utils.js?v=1";
    let loadResult;

    beforeEach(function() {
      loadResult = window.intlTelInput.loadUtils(url);
    });

    it("starts loading the utils", function() {
      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    });

    it("resolves the promise", async function() {
      expect(loadResult).toBeInstanceOf(Promise);
      await expectAsync(loadResult).toBeResolvedTo(true);
    });

    describe("then init plugin with utilsScript option", function() {

      beforeEach(async function() {
        iti = window.intlTelInput(input[0], {
          utilsScript: "some/other/url/ok",
        });
      });

      it("resolves the instance's promise", async function() {
        await expectAsync(iti.promise).toBeResolved();
      });

    });

  });



  describe("init plugin with utilsScript option, but force documentReady=false so it wont fire", function() {

    let url2 = "/build/js/utils.js?v=2";
    let loadUtilsSpy;

    beforeEach(function() {
      loadUtilsSpy = spyOn(window.intlTelInput, "loadUtils").and.callThrough();

      window.intlTelInput.documentReady = () => false;

      iti = window.intlTelInput(input[0], {
        utilsScript: "some/other/url/ok",
      });
    });

    it("does not start loading the utils", function() {
      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
    });

    it("does not resolve the promise", async function() {
      await expectAsync(iti.promise).toBePending();
    });



    describe("calling loadUtils", function() {

      let loadUtilsPromise;

      beforeEach(async function() {
        loadUtilsPromise = window.intlTelInput.loadUtils(url2);
      });

      it("starts loading the utils", function() {
        expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
      });

      it("resolves the promise", async function() {
        await expectAsync(loadUtilsPromise).toBeResolvedTo(true);
      });



      describe("then init another plugin instance with utilsScript option", function() {

        var iti2,
          input2;

        beforeEach(async function() {
          // Wait for previous load to finish.
          await loadUtilsPromise;

          input2 = $("<input>").appendTo("body");
          iti2 = window.intlTelInput(input2[0], {
            utilsScript: "test/url/three/utils.js",
          });
        });

        afterEach(function() {
          iti2.destroy();
          input2.remove();
          iti2 = input2 = null;
        });

        it("does resolve the promise immediately", async function() {
          await expectAsync(iti2.promise).already.toBeResolved();
        });

        it("only loads once", function() {
          // `loadUtils()` returns undefined if it doesn't do anything.
          const loads = loadUtilsSpy.calls.all().filter(call => call.returnValue);

          expect(loads).toHaveLength(1);
        });

      });

    });

  });



  describe("force documentReady=true then init plugin with utilsScript", function() {

    var url3 = "/build/js/utils.js?v=3";

    beforeEach(function() {
      window.intlTelInput.documentReady = () => true;
      iti = window.intlTelInput(input[0], {
        utilsScript: url3,
      });
    });

    afterEach(async function() {
      await iti.promise.catch(() => {});
    });

    it("resolves the promise immediately", async function() {
      await expectAsync(iti.promise).toBeResolved();
    });

    it("starts loading the utils", function() {
      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    });

  });

});
