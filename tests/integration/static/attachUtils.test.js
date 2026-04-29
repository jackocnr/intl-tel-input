/**
 * @vitest-environment jsdom
 */

import intlTelInput from "intl-tel-input";
import { initIntlTelInput, resetPackageAfterEach } from "../helpers/helpers";
import "../helpers/matchers";

describe("attachUtils", function() {
  resetPackageAfterEach(intlTelInput);

  describe("calling attachUtils before init library", () => {

    const utilsLoader = () => import("intl-tel-input/utils");
    let loadResult;

    beforeEach(() => {
      loadResult = intlTelInput.attachUtils(utilsLoader);
    });

    test("starts loading the utils", () => {
      expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);
    });

    test("resolves the promise", async () => {
      expect(loadResult).toBeAPromise();
      await expect(loadResult).resolves.toBe(true);
    });

    test("installs the utils module at intlTelInput.utils", async () => {
      await loadResult;

      expect(intlTelInput).toHaveProperty("utils.isValidNumber");
    });

    describe("then init library with loadUtils option", () => {

      test("resolves the instance's promise", async () => {
        const { iti } = initIntlTelInput({
          intlTelInput,
          options: {
            loadUtils: () => {
              const url = "some/other/url/ok"; return import(/* @vite-ignore */ url);
            },
          },
        });
        await iti.promise;
      });

    });

  });



  describe("init library with loadUtils option, but force documentReady=false so it wont fire", function() {
    /** @type {vi.Mock<() => Promise<any>>} */
    let utilsLoader;
    /** @type {intlTelInput.Iti} */
    let iti;

    beforeEach(function() {
      vi.spyOn(intlTelInput, "documentReady").mockReturnValue(false);
      utilsLoader = vi.fn(async () => import("intl-tel-input/utils"));

      ({ iti } = initIntlTelInput({
        intlTelInput,
        options: { loadUtils: utilsLoader },
      }));
    });

    test("does not start loading the utils", function() {
      expect(intlTelInput).toHaveProperty("startedLoadingUtils", false);
    });

    test("does not resolve the promise", async function() {
      await expect(iti.promise).toBePending();
    });



    describe("calling attachUtils", function() {
      /** @type {Promise<any>} */
      let attachUtilsPromise;

      beforeEach(async function() {
        attachUtilsPromise = intlTelInput.attachUtils(utilsLoader);
      });

      test("starts loading the utils", function() {
        expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);
      });

      test("resolves the promise", async function() {
        await expect(attachUtilsPromise).resolves.toBe(true);
      });



      describe("then init another library instance with loadUtils option", function() {

        beforeEach(async function() {
          // Wait for previous load to finish.
          await attachUtilsPromise;

          initIntlTelInput({
            intlTelInput,
            options: { loadUtils: utilsLoader },
          });
        });

        test("only loads once", function() {
          expect(utilsLoader).toHaveBeenCalledTimes(1);
        });

      });

    });

  });



  describe("force documentReady=true then init library with loadUtils", function() {

    const utilsLoader = () => import("intl-tel-input/utils");
    /** @type {intlTelInput.Iti} */
    let iti;

    beforeEach(function() {
      vi.spyOn(intlTelInput, "documentReady").mockReturnValue(true);
      ({ iti } = initIntlTelInput({
        intlTelInput,
        options: { loadUtils: utilsLoader },
      }));
    });

    test("resolves the promise immediately", async function() {
      await expect(iti.promise).resolves.toBeUndefined();
    });

    test("starts loading the utils", function() {
      expect(intlTelInput).toHaveProperty("startedLoadingUtils", true);
    });

  });



  describe("calling with a function", function() {
    const mockUtils = { default: { mymodule: "fakeutils" } };

    test("uses the object the function resolves with", async () => {
      const result = await intlTelInput.attachUtils(async () => mockUtils);

      expect(result).toEqual(true);
      expect(intlTelInput.utils).toBe(mockUtils.default);
    });

    test("rejects if the function rejects", async () => {
      const loadPromise = intlTelInput.attachUtils(async () => {
        throw new Error("Uhoh!");
      });

      await expect(loadPromise).rejects.toThrow("Uhoh!");
    });

    test("rejects if the function throws", async () => {
      const loadPromise = intlTelInput.attachUtils(() => {
        throw new Error("Uhoh!");
      });

      await expect(loadPromise).rejects.toThrow("Uhoh!");
    });

    test("rejects if the function returns a non-promise", async () => {
      const loadPromise = intlTelInput.attachUtils(() => ({
        anObject: "That is not a promise",
      }));

      await expect(loadPromise).rejects.toThrow();
    });

    test("rejects if the function resolves to a non-object", async () => {
      const loadPromise = intlTelInput.attachUtils(async () => "Hello!");

      await expect(loadPromise).rejects.toThrow();
    });

    test("does not call the function a second time", async () => {
      const loader = vi.fn(async () => mockUtils);

      await intlTelInput.attachUtils(loader);
      await intlTelInput.attachUtils(loader);

      expect(loader).toHaveBeenCalledTimes(1);
    });

  });

});
