/**
 * @jest-environment jsdom
 */

const intlTelInput = require("intl-tel-input");
const { initPlugin, resetPackageAfterEach } = require("../helpers/helpers");

describe("loadUtilsOnInit", () => {
  resetPackageAfterEach(intlTelInput);

  const loadUtilsOnInit = "intl-tel-input/utils";

  it("does not load the utils script if `loadUtilsOnInit` option is not set", async () => {
    const { iti } = initPlugin({ intlTelInput });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

    await iti.promise;

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);
  });

  it("loads the utils script successfully", async () => {
    expect(intlTelInput).not.toHaveProperty("utils.isValidNumber");

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtilsOnInit },
    });

    await iti.promise;
    expect(intlTelInput).toHaveProperty("utils.isValidNumber");
  });

  it("waits until the page is loaded before loading utils", async () => {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(false);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtilsOnInit },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);

    await iti.promise;
  });

  it("loads utils immediately if page is already finished loading", async function() {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtilsOnInit },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);

    await iti.promise;
  });

  it("rejects with an error if the utils script cannot load", async function() {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtilsOnInit: "/some/incorrect/url" },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    
    await expect(iti.promise).rejects.toThrow();
  });

  it("works if loadUtilsOnInit is a function", async function() {
    const mockUtils = { default: { mockUtils: true } };
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: {
        async loadUtilsOnInit () {
          return mockUtils;
        },
      },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    await iti.promise;

    expect(intlTelInput.utils).toBe(mockUtils.default);
  });

  describe("in 'withUtils' builds", () => {
    const intlTelInput = require("intl-tel-input/intlTelInputWithUtils");
    resetPackageAfterEach(intlTelInput);

    it("ignores the `loadUtilsOnInit` option and does not load", async () => {
      const { iti } = initPlugin({
        intlTelInput,
        options: { loadUtilsOnInit },
      });

      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

      await iti.promise;

      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);
    });

    it("Raises an informative error when `utils` is missing", async () => {
      delete intlTelInput.utils;
      const { iti } = initPlugin({
        intlTelInput,
        options: { loadUtilsOnInit },
      });

      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
      await expect(iti.promise).rejects.toThrow("INTENTIONALLY BROKEN");
    });
  });

});
