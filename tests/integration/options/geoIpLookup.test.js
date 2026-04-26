/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown, oneTickAsync, intlTelInput } from "../helpers/helpers";

describe("geoIpLookup option", () => {
  describe("vanilla", () => {
    let iti, resolved;

    beforeEach(async () => {
      resolved = false;
      ({ iti } = initPlugin());
      iti.promise.then(() => {
        resolved = true;
      });
      await oneTickAsync(); // allow one tick for promise to resolve
    });

    afterEach(() => teardown(iti));

    test("iti.promise resolves immediately", async () => {
      expect(intlTelInput.startedLoadingAutoCountry).toBe(false);
      expect(resolved).toEqual(true);
    });
  });

  describe("geoIpLookup failure path", () => {
    let iti, rejected;

    beforeEach(async () => {
      rejected = false;
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountry: "auto",
        geoIpLookup: () => new Promise((_, reject) => setTimeout(() => reject(), 0)),
      };
      ({ iti } = initPlugin({ options }));
      iti.promise.catch(() => {
        rejected = true;
      });
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("iti.promise rejects when geoIpLookup promise rejects", async () => {
      await expect(iti.promise).rejects.toBeUndefined();
      expect(rejected).toBe(true);
    });
  });

  describe("geoIpLookup invalid iso2 response", () => {
    let iti;

    beforeEach(() => {
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountry: "auto",
        geoIpLookup: () => new Promise((resolve) => setTimeout(() => resolve("zz"), 0)),
      };
      ({ iti } = initPlugin({ options }));
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("treated as failure: iti.promise rejects", async () => {
      await expect(iti.promise).rejects.toBeUndefined();
    });
  });

  describe("geoIpLookup and initialCountry=auto", () => {
    let iti, resolved;

    beforeEach(async () => {
      resolved = false;
      const options = {
        initialCountry: "auto",
        geoIpLookup: () => new Promise((resolve) => setTimeout(() => resolve("gb"), 10)),
      };
      ({ iti } = initPlugin({ options }));
      iti.promise.then(() => {
        resolved = true;
      });
      await oneTickAsync(); // allow one tick, as before
    });

    afterEach(() => teardown(iti));

    test("iti.promise does not resolve until geoIpLookup complete", async () => {
      expect(intlTelInput.startedLoadingAutoCountry).toBe(true);
      expect(resolved).toBe(false);
      await iti.promise;
      expect(resolved).toBe(true);
    });

    describe("init a 2nd instance with geoIpLookup", () => {
      let iti2, resolved2;

      beforeEach(async () => {
        resolved2 = false;
        await iti.promise; // allow the first instance to resolve before initialising the second
        const options = {
          initialCountry: "auto",
          geoIpLookup: () => new Promise((resolve) => setTimeout(() => resolve("gb"), 10)),
        };
        ({ iti: iti2 } = initPlugin({ options }));
        iti2.promise.then(() => {
          resolved2 = true;
        });
        await oneTickAsync(); // allow one tick, as before
      });

      afterEach(() => teardown(iti2));

      test("second instance resolves immediately", async () => {
        expect(resolved2).toBe(true);
      });
    });
  });
});
