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

  test("allowDropdown without flags or separateDialCode forces NATIONAL back to INTERNATIONAL", () => {
    const o = clone();
    o.allowDropdown = true;
    o.showFlags = false;
    o.separateDialCode = false;
    o.numberDisplayFormat = "NATIONAL";
    applyOptionSideEffects(o);
    expect(o.numberDisplayFormat).toBe("INTERNATIONAL");
  });

  test("useFullscreenPopup without container sets dropdownContainer", () => {
    const o = clone();
    o.useFullscreenPopup = true;
    o.dropdownContainer = null;
    applyOptionSideEffects(o);
    expect(o.dropdownContainer).toBe(document.body);
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

  test("warns on invalid autoPlaceholder", () => {
    expect(() => validateOptions({ autoPlaceholder: "invalid" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("accepts a minimal valid options object", () => {
    expect(() =>
      validateOptions({
        allowDropdown: false,
        initialCountry: "us",
        excludeCountries: ["us"],
        allowedNumberTypes: ["MOBILE"],
        autoPlaceholder: "aggressive",
      }),
    ).not.toThrow();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test("warns when initialCountry is 'auto' (no longer accepted)", () => {
    expect(() => validateOptions({ initialCountry: "auto" })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
  });

  test("warns on invalid i18n option type", () => {
    expect(() => validateOptions({ i18n: [] })).not.toThrow();
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
