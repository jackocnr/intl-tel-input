/**
 * @vitest-environment jsdom
 */

import intlTelInput from "intl-tel-input";
import { initIntlTelInput, resetPackageAfterEach } from "../helpers/helpers";

describe("loadUtils option", () => {
  resetPackageAfterEach(intlTelInput);

  const loadUtils = () => import("intl-tel-input/utils");

  test("does not load the utils script if `loadUtils` option is not set", async () => {
    const { iti } = initIntlTelInput({ intlTelInput });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", false);

    await iti.promise;

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", false);
  });

  test("loads the utils script successfully", async () => {
    expect(intlTelInput).not.toHaveProperty("utils.isValidNumber");

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: { loadUtils },
    });

    await iti.promise;
    expect(intlTelInput).toHaveProperty("utils.isValidNumber");
  });

  test("waits until the page is loaded before loading utils", async () => {
    vi.spyOn(intlTelInput, "documentReady").mockReturnValue(false);

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: { loadUtils },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", false);

    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);

    await iti.promise;
  });

  test("loads utils immediately if page is already finished loading", async function() {
    vi.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: { loadUtils },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);

    await iti.promise;
  });

  test("rejects with an error if the utils script cannot load", async function() {
    vi.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: { loadUtils: () => {
        const url = "/some/incorrect/url"; return import(/* @vite-ignore */ url);
      } },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);

    await expect(iti.promise).rejects.toThrow();
  });

  test("works if loadUtils is a function", async function() {
    const mockUtils = { default: { mockUtils: true } };
    vi.spyOn(intlTelInput, "documentReady").mockReturnValue(true);

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: {
        async loadUtils () {
          return mockUtils;
        },
      },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);
    await iti.promise;

    expect(intlTelInput.utils).toBe(mockUtils.default);
  });

  test("works if loadUtils returns a custom promise", async function() {
    const mockUtils = { default: { mockUtils: true } };

    const { iti } = initIntlTelInput({
      intlTelInput,
      options: {
        loadUtils:  () => ({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          then: (resolve, reject) => resolve(mockUtils),
        }),
      },
    });

    expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);
    await iti.promise;

    expect(intlTelInput.utils).toBe(mockUtils.default);
  });

  test("does not reformat the input value when utils loads while input is focused", async () => {
    let resolveLoad;
    const deferredLoadUtils = () => new Promise((resolve) => {
      resolveLoad = resolve;
    });

    const { iti, input } = initIntlTelInput({
      intlTelInput,
      inputValue: "7024181234",
      options: { loadUtils: deferredLoadUtils, initialCountry: "us", separateDialCode: false },
    });

    // Value is unformatted because utils has not loaded yet.
    expect(input.value).toBe("7024181234");

    // Simulate user mid-edit when utils resolves.
    input.focus();
    expect(document.activeElement).toBe(input);

    resolveLoad(await import("intl-tel-input/utils"));
    await iti.promise;

    // Confirm utils actually attached, so we know handleUtilsLoaded ran.
    expect(intlTelInput).toHaveProperty("utils.formatNumber");
    // Value stays as the user typed it — no reformat, no caret jump.
    expect(input.value).toBe("7024181234");
  });

  describe("in 'withUtils' builds", async () => {
    const { default: intlTelInputWithUtils } = await import("intl-tel-input/intlTelInputWithUtils");
    resetPackageAfterEach(intlTelInputWithUtils);

    test("ignores the `loadUtils` option and does not load", async () => {
      const { iti } = initIntlTelInput({
        intlTelInput: intlTelInputWithUtils,
        options: { loadUtils },
      });

      expect(intlTelInputWithUtils).toHaveProperty("startedLoadingUtils", false);

      await iti.promise;

      expect(intlTelInputWithUtils).toHaveProperty("startedLoadingUtils", false);
    });
  });

});
