/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, oneTickAsync, intlTelInput } from "../helpers/helpers";

describe("initialCountryLookup option", () => {
  describe("vanilla", () => {
    let iti, resolved;

    beforeEach(async () => {
      resolved = false;
      ({ iti } = initIntlTelInput());
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

  describe("initialCountryLookup failure path", () => {
    let iti, rejected;

    beforeEach(async () => {
      rejected = false;
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountryLookup: () => new Promise((_, reject) => setTimeout(() => reject(), 0)),
      };
      ({ iti } = initIntlTelInput({ options }));
      iti.promise.catch(() => {
        rejected = true;
      });
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("iti.promise rejects when initialCountryLookup promise rejects", async () => {
      await expect(iti.promise).rejects.toBeUndefined();
      expect(rejected).toBe(true);
    });
  });

  describe("initialCountryLookup invalid iso2 response", () => {
    let iti;

    beforeEach(() => {
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountryLookup: () => new Promise((resolve) => setTimeout(() => resolve("zz"), 0)),
      };
      ({ iti } = initIntlTelInput({ options }));
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

  describe("initialCountryLookup resolves successfully", () => {
    let iti, resolved;

    beforeEach(async () => {
      resolved = false;
      const options = {
        initialCountryLookup: () => new Promise((resolve) => setTimeout(() => resolve("gb"), 10)),
      };
      ({ iti } = initIntlTelInput({ options }));
      iti.promise.then(() => {
        resolved = true;
      });
      await oneTickAsync(); // allow one tick, as before
    });

    afterEach(() => teardown(iti));

    test("iti.promise does not resolve until initialCountryLookup complete", async () => {
      expect(intlTelInput.startedLoadingAutoCountry).toBe(true);
      expect(resolved).toBe(false);
      await iti.promise;
      expect(resolved).toBe(true);
    });

    describe("init a 2nd instance with initialCountryLookup", () => {
      let iti2, resolved2;

      beforeEach(async () => {
        resolved2 = false;
        await iti.promise; // allow the first instance to resolve before initialising the second
        const options = {
          initialCountryLookup: () => new Promise((resolve) => setTimeout(() => resolve("gb"), 10)),
        };
        ({ iti: iti2 } = initIntlTelInput({ options }));
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

  describe("explicit initialCountry overrides initialCountryLookup", () => {
    let iti, lookupCalled;

    beforeEach(async () => {
      lookupCalled = false;
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountry: "gb",
        initialCountryLookup: () => {
          lookupCalled = true;
          return Promise.resolve("us");
        },
      };
      ({ iti } = initIntlTelInput({ options }));
      await iti.promise;
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("lookup is not called when initialCountry is set", () => {
      expect(lookupCalled).toBe(false);
      expect(intlTelInput.startedLoadingAutoCountry).toBe(false);
      expect(iti.getSelectedCountry().iso2).toBe("gb");
    });
  });

  describe("init a 2nd instance after the first lookup fails", () => {
    let iti1, iti2, secondLookupCalled;

    beforeEach(async () => {
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      secondLookupCalled = false;

      ({ iti: iti1 } = initIntlTelInput({
        options: {
          initialCountryLookup: () => Promise.reject(),
        },
      }));
      // Wait for the first lookup to fail.
      await iti1.promise.catch(() => {});

      ({ iti: iti2 } = initIntlTelInput({
        options: {
          initialCountryLookup: () => {
            secondLookupCalled = true;
            return Promise.resolve("gb");
          },
        },
      }));
    });

    afterEach(() => {
      teardown(iti1);
      teardown(iti2);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("second instance's initialCountryLookup is invoked and resolves", async () => {
      await iti2.promise;
      expect(secondLookupCalled).toBe(true);
      expect(intlTelInput.autoCountry).toBe("gb");
    });
  });

  describe("initialCountryLookup resolves while input is focused with a value", () => {
    let iti, input, resolveLookup;

    beforeEach(() => {
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;

      ({ iti, input } = initIntlTelInput({
        inputValue: "7024181234",
        options: {
          separateDialCode: false,
          initialCountryLookup: () => new Promise((resolve) => {
            resolveLookup = resolve;
          }),
        },
      }));
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
    });

    test("auto country is stashed as fallback only, leaving focused input untouched", async () => {
      // No country detected from the national-format value, so still loading.
      expect(iti.getSelectedCountry()).toBeNull();
      expect(input.value).toBe("7024181234");

      input.focus();
      expect(document.activeElement).toBe(input);

      resolveLookup("us");
      await iti.promise;

      // Auto country was discovered but treated as fallback only — user input untouched.
      expect(intlTelInput.autoCountry).toBe("us");
      expect(iti.getSelectedCountry()).toBeNull();
      expect(input.value).toBe("7024181234");
    });
  });

  describe("initialCountryLookup hangs (never settles)", () => {
    let iti, rejected;

    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      rejected = false;
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      const options = {
        initialCountryLookup: () => new Promise(() => {}), // never resolves
      };
      ({ iti } = initIntlTelInput({ options }));
      iti.promise.catch(() => {
        rejected = true;
      });
    });

    afterEach(() => {
      teardown(iti);
      intlTelInput.startedLoadingAutoCountry = false;
      intlTelInput.autoCountry = undefined;
      vi.useRealTimers();
    });

    test("times out and rejects after 10s", async () => {
      // Advance past the 10s built-in timeout.
      await vi.advanceTimersByTimeAsync(10000);
      await expect(iti.promise).rejects.toBeUndefined();
      expect(rejected).toBe(true);
      // Reset on failure so a future instance can retry.
      expect(intlTelInput.startedLoadingAutoCountry).toBe(false);
    });
  });
});
