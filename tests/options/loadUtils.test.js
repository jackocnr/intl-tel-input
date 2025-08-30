/**
 * @jest-environment jsdom
 */

const intlTelInput = require("intl-tel-input");
const { initPlugin, resetPackageAfterEach } = require("../helpers/helpers");

describe("loadUtils option", () => {
  resetPackageAfterEach(intlTelInput);

  const loadUtils = () => import("intl-tel-input/utils");

  test("does not load the utils script if `loadUtils` option is not set", async () => {
    const { iti } = initPlugin({ intlTelInput });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

    await iti.promise;

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);
  });

  test("loads the utils script successfully", async () => {
    expect(intlTelInput).not.toHaveProperty("utils.isValidNumber");

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtils },
    });

    await iti.promise;
    expect(intlTelInput).toHaveProperty("utils.isValidNumber");
  });

  test("waits until the page is loaded before loading utils", async () => {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(false);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtils },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);

    await iti.promise;
  });

  test("loads utils immediately if page is already finished loading", async function() {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtils },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);

    await iti.promise;
  });

  test("rejects with an error if the utils script cannot load", async function() {
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: { loadUtils: () => import("/some/incorrect/url") },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);

    await expect(iti.promise).rejects.toThrow();
  });

  test("works if loadUtils is a function", async function() {
    const mockUtils = { default: { mockUtils: true } };
    jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initPlugin({
      intlTelInput,
      options: {
        async loadUtils () {
          return mockUtils;
        },
      },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    await iti.promise;

    expect(intlTelInput.utils).toBe(mockUtils.default);
  });

  test("works if loadUtils returns a custom promise", async function() {
    const mockUtils = { default: { mockUtils: true } };

    const { iti } = initPlugin({
      intlTelInput,
      options: {
        loadUtils:  () => ({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          then: (resolve, reject) => resolve(mockUtils),
        }),
      },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    await iti.promise;

    expect(intlTelInput.utils).toBe(mockUtils.default);
  });

  describe("in 'withUtils' builds", () => {
    const intlTelInput = require("intl-tel-input/intlTelInputWithUtils");
    resetPackageAfterEach(intlTelInput);

    test("ignores the `loadUtils` option and does not load", async () => {
      const { iti } = initPlugin({
        intlTelInput,
        options: { loadUtils },
      });

      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);

      await iti.promise;

      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);
    });
  });

});
