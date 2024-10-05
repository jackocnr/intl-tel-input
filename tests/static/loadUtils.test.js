/**
 * @jest-environment jsdom
 */

const intlTelInput = require("intl-tel-input");
const { initPlugin, resetPackageAfterEach } = require("../helpers/helpers");
require("../helpers/matchers");

describe("loadUtils", function() {
  resetPackageAfterEach(intlTelInput);

  describe("calling loadUtils before init plugin", () => {

    let url = "./utils.js?v=1";
    let loadResult;

    beforeEach(() => {
      loadResult = intlTelInput.loadUtils(url);
      loadResult.catch(() => {});
    });

    it("starts loading the utils", () => {
      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    });

    it("resolves the promise", async () => {
      expect(loadResult).toBeAPromise();
      await expect(loadResult).resolves.toBe(true);
    });

    it("installs the utils module at intlTelInput.utils", async () => {
      await loadResult;

      expect(intlTelInput).toHaveProperty("utils.isValidNumber");
    });

    describe("then init plugin with loadUtilsOnInit option", () => {

      it("resolves the instance's promise", async () => {
        const { iti } = initPlugin({
          intlTelInput,
          options: { loadUtilsOnInit: "some/other/url/ok" },
        });
        await iti.promise;
      });

    });

  });



  describe("init plugin with loadUtilsOnInit option, but force documentReady=false so it wont fire", function() {
    /** @type {jest.Mock<() => Promise<any>>} */
    let utilsLoader;
    /** @type {intlTelInput.Iti} */
    let iti;

    beforeEach(function() {
      jest.spyOn(intlTelInput, "documentReady").mockReturnValue(false);
      utilsLoader = jest.fn(async () => import("intl-tel-input/utils"));

      ({ iti } = initPlugin({
        intlTelInput,
        options: { loadUtilsOnInit: utilsLoader },
      }));
    });

    it("does not start loading the utils", function() {
      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", false);
    });

    it("does not resolve the promise", async function() {
      await expect(iti.promise).toBePending();
    });



    describe("calling loadUtils", function() {
      /** @type {Promise<any>} */
      let loadUtilsPromise;

      beforeEach(async function() {
        loadUtilsPromise = intlTelInput.loadUtils(utilsLoader);
      });

      it("starts loading the utils", function() {
        expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
      });

      it("resolves the promise", async function() {
        await expect(loadUtilsPromise).resolves.toBe(true);
      });



      describe("then init another plugin instance with loadUtilsOnInit option", function() {

        beforeEach(async function() {
          // Wait for previous load to finish.
          await loadUtilsPromise;

          initPlugin({
            intlTelInput,
            options: { loadUtilsOnInit: utilsLoader },
          });
        });

        it("only loads once", function() {
          expect(utilsLoader).toHaveBeenCalledTimes(1);
        });

      });

    });

  });



  describe("force documentReady=true then init plugin with loadUtilsOnInit", function() {

    const url3 = "./utils.js?v=3";
    /** @type {intlTelInput.Iti} */
    let iti;

    beforeEach(function() {
      jest.spyOn(intlTelInput, "documentReady").mockReturnValue(true);
      ({ iti } = initPlugin({
        intlTelInput,
        options: { loadUtilsOnInit: url3 },
      }));
    });

    it("resolves the promise immediately", async function() {
      await expect(iti.promise).resolves.toBeInstanceOf(Array);
    });

    it("starts loading the utils", function() {
      expect(intlTelInput).toHaveProperty("startedLoadingUtilsScript", true);
    });

  });



  describe("calling with a function", function() {
    const mockUtils = { default: { mymodule: "fakeutils" } };

    it("uses the object the function resolves with", async () => {
      const result = await intlTelInput.loadUtils(async () => mockUtils);

      expect(result).toEqual(true);
      expect(intlTelInput.utils).toBe(mockUtils.default);
    });

    it("rejects if the function rejects", async () => {
      const loadPromise = intlTelInput.loadUtils(async () => {
        throw new Error("Uhoh!");
      });

      await expect(loadPromise).rejects.toThrow("Uhoh!");
    });

    it("rejects if the function throws", async () => {
      const loadPromise = intlTelInput.loadUtils(() => {
        throw new Error("Uhoh!");
      });

      await expect(loadPromise).rejects.toThrow("Uhoh!");
    });

    it("rejects if the function returns a non-promise", async () => {
      const loadPromise = intlTelInput.loadUtils(() => ({
        anObject: "That is not a promise",
      }));

      await expect(loadPromise).rejects.toThrow();
    });

    it("rejects if the function resolves to a non-object", async () => {
      const loadPromise = intlTelInput.loadUtils(async () => "Hello!");

      await expect(loadPromise).rejects.toThrow();
    });

    it("does not call the function a second time", async () => {
      const loader = jest.fn(async () => mockUtils);

      await intlTelInput.loadUtils(loader);
      await intlTelInput.loadUtils(loader);

      expect(loader).toHaveBeenCalledTimes(1);
    });

  });

});
