/**
 * @vitest-environment jsdom
 */

import { defaults, applyOptionSideEffects, validateOptions } from "../../../packages/core/src/js/core/options.ts";

describe("core/options applyOptionSideEffects", () => {
  const clone = () => JSON.parse(JSON.stringify(defaults));

  test("onlyCountries single sets initialCountry", () => {
    const o = clone();
    o.onlyCountries = ["us"];
    o.initialCountry = "";
    applyOptionSideEffects(o);
    expect(o.initialCountry).toBe("us");
  });

  test("separateDialCode forces numberDisplayFormat=NATIONAL back to INTERNATIONAL", () => {
    const o = clone();
    o.separateDialCode = true;
    o.numberDisplayFormat = "NATIONAL";
    applyOptionSideEffects(o);
    expect(o.numberDisplayFormat).toBe("INTERNATIONAL");
  });

  test("countrySelectorMode!=OFF without flags or separateDialCode forces NATIONAL back to INTERNATIONAL", () => {
    const o = clone();
    o.countrySelectorMode = "DROPDOWN";
    o.showFlags = false;
    o.separateDialCode = false;
    o.numberDisplayFormat = "NATIONAL";
    applyOptionSideEffects(o);
    expect(o.numberDisplayFormat).toBe("INTERNATIONAL");
  });

  test("countrySelectorMode 'AUTO' resolves to 'DROPDOWN' or 'FULLSCREEN'", () => {
    const o = clone();
    o.countrySelectorMode = "AUTO";
    applyOptionSideEffects(o);
    expect(["DROPDOWN", "FULLSCREEN"]).toContain(o.countrySelectorMode);
  });

  test("dropdownAlwaysOpen forces countrySelectorMode to 'DROPDOWN'", () => {
    const o = clone();
    o.dropdownAlwaysOpen = true;
    o.countrySelectorMode = "FULLSCREEN";
    applyOptionSideEffects(o);
    expect(o.countrySelectorMode).toBe("DROPDOWN");
  });
});



describe("core/options validateOptions", () => {
  let warnSpy;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test("warns on unknown option key", () => {
    expect(() => validateOptions({ doesNotExist: true })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid initialCountry", () => {
    expect(() => validateOptions({ initialCountry: "zz" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid allowedNumberTypes", () => {
    expect(() => validateOptions({ allowedNumberTypes: ["NOPE"] })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid placeholderNumberPolicy", () => {
    expect(() => validateOptions({ placeholderNumberPolicy: "invalid" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("accepts a minimal valid options object", () => {
    expect(() =>
      validateOptions({
        countrySelectorMode: "OFF",
        initialCountry: "us",
        excludeCountries: ["us"],
        allowedNumberTypes: ["MOBILE"],
        placeholderNumberPolicy: "AGGRESSIVE",
      }),
    ).not.toThrow();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("warns on invalid countrySelectorMode", () => {
    expect(() => validateOptions({ countrySelectorMode: "nope" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("accepts valid countrySelectorMode values", () => {
    expect(() => validateOptions({ countrySelectorMode: "OFF" })).not.toThrow();
    expect(() => validateOptions({ countrySelectorMode: "DROPDOWN" })).not.toThrow();
    expect(() => validateOptions({ countrySelectorMode: "FULLSCREEN" })).not.toThrow();
    expect(() => validateOptions({ countrySelectorMode: "AUTO" })).not.toThrow();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("warns when initialCountry is 'auto' (no longer accepted)", () => {
    expect(() => validateOptions({ initialCountry: "auto" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid uiTranslations option type", () => {
    expect(() => validateOptions({ uiTranslations: [] })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("accepts valid numberDisplayFormat values", () => {
    expect(() => validateOptions({ numberDisplayFormat: "E164" })).not.toThrow();
    expect(() => validateOptions({ numberDisplayFormat: "INTERNATIONAL" })).not.toThrow();
    expect(() => validateOptions({ numberDisplayFormat: "NATIONAL" })).not.toThrow();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("warns on RFC3966 numberDisplayFormat", () => {
    expect(() => validateOptions({ numberDisplayFormat: "RFC3966" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid numberDisplayFormat", () => {
    expect(() => validateOptions({ numberDisplayFormat: "WHATEVER" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });
});
