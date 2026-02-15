/**
 * @jest-environment jsdom
 */

const { defaults, applyOptionSideEffects, validateOptions } = require("../../../src/js/modules/core/options.ts");

describe("core/options applyOptionSideEffects", () => {
  const clone = () => JSON.parse(JSON.stringify(defaults));

  test("onlyCountries single sets initialCountry", () => {
    const o = clone();
    o.onlyCountries = ["us"];
    o.initialCountry = "";
    applyOptionSideEffects(o);
    expect(o.initialCountry).toBe("us");
  });

  test("separateDialCode forces nationalMode false", () => {
    const o = clone();
    o.separateDialCode = true;
    o.nationalMode = true;
    applyOptionSideEffects(o);
    expect(o.nationalMode).toBe(false);
  });

  test("allowDropdown without flags dial code forces nationalMode false", () => {
    const o = clone();
    o.allowDropdown = true;
    o.showFlags = false;
    o.separateDialCode = false;
    o.nationalMode = true;
    applyOptionSideEffects(o);
    expect(o.nationalMode).toBe(false);
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
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
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
        initialCountry: "auto",
        excludeCountries: ["us"],
        allowedNumberTypes: ["MOBILE"],
        autoPlaceholder: "aggressive",
      }),
    ).not.toThrow();
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
