"use strict";

describe("loadUtilsOnInit:", function() {
  useIntlTelInputBuild("build/js/intlTelInput.js");

  const loadUtilsOnInit = "/build/js/utils.js";

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("does not load the utils script if `loadUtilsOnInit` option is not set", async () => {
    iti = window.intlTelInput(input[0]);

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);

    await iti.promise;

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
  });

  it("waits until the page is loaded before loading utils", async () => {
    spyOn(window.intlTelInput, "documentReady").and.returnValue(false);
    iti = window.intlTelInput(input[0], {
      loadUtilsOnInit,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);

    // Ideally, this would dispatch a load event and test that the utils script started loading after that.
    // Unfortunately, doing so triggers Jasmine's internals to partially reboot and all the other tests blow up.
    iti._handlePageLoad();
    
    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    await expectAsync(iti.promise).toBeResolved();
  });

  it("loads utils immediately if page is already finished loading", async function() {
    spyOn(window.intlTelInput, "documentReady").and.returnValue(true);
    iti = window.intlTelInput(input[0], {
      loadUtilsOnInit,
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    await expectAsync(iti.promise).toBeResolved();
  });

  it("rejects with an error if the utils script cannot load", async function() {
    spyOn(window.intlTelInput, "documentReady").and.returnValue(true);
    iti = window.intlTelInput(input[0], {
      loadUtilsOnInit: "/some/incorrect/url",
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    await expectAsync(iti.promise).toBeRejectedWithError();
  });

  it("works if loadUtilsOnInit is a function", async function() {
    const mockUtils = { default: { mockUtils: true } };
    spyOn(window.intlTelInput, "documentReady").and.returnValue(true);

    iti = window.intlTelInput(input[0], {
      async loadUtilsOnInit () {
        return mockUtils;
      },
    });

    expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
    await expectAsync(iti.promise).toBeResolved();

    expect(window.intlTelInput.utils).toBe(mockUtils.default);
  });

  describe("in 'withUtils' builds", () => {
    useIntlTelInputBuild("build/js/intlTelInputWithUtils.js");

    it("ignores the `loadUtilsOnInit` option and does not load", async () => {
      iti = window.intlTelInput(input[0], {
        loadUtilsOnInit,
      });

      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);

      await iti.promise;

      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(false);
    });

    it("Raises an informative error when `utils` is missing", async () => {
      delete window.intlTelInput.utils;
      iti = window.intlTelInput(input[0], {
        loadUtilsOnInit,
      });

      expect(window.intlTelInput.startedLoadingUtilsScript).toEqual(true);
      await expectAsync(iti.promise).toBeRejectedWithError(/INTENTIONALLY BROKEN/);
    });
  });

});
