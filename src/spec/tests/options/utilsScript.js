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

  it("init vanilla plugin does not start loading the utils script", async function() {
    iti = window.intlTelInput(input[0]);

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);

    // The readiness promise should resolve without loading, too.
    await iti.promise;

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
  });

  it("init plugin with utilsScript before documentReady event does not inject the script", async function() {
    window.intlTelInput.documentReady = () => false;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);

    // TODO: ideally, this would dispatch a load event and test that the utils script started loading after that.
    // Unfortunately, doing so triggers Jasmine's internals to partially reboot and all the other tests blow up.
    iti._handlePageLoad();
    
    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);

    // We expect loading to fail because this is the `withUtils` build, which cannot load utils.
    await expectAsync(iti.promise).toBeRejectedWithError(/INTENTIONALLY BROKEN/);
  });

  it("faking documentReady then init plugin with utilsScript does inject the script", async function() {
    window.intlTelInput.documentReady = () => true;
    iti = window.intlTelInput(input[0], {
      utilsScript: url,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);

    // We expect loading to fail because this is the `withUtils` build, which cannot load utils.
    await expectAsync(iti.promise).toBeRejectedWithError(/INTENTIONALLY BROKEN/);
  });

});
