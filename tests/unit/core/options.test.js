/**
 * @jest-environment jsdom
 */

const { defaults, applyOptionSideEffects } = require("../../../src/js/modules/core/options.ts");

describe("core/options applyOptionSideEffects", () => {
  const clone = () => JSON.parse(JSON.stringify(defaults));

  test("onlyCountries single sets initialCountry", () => {
    const o = clone();
    o.onlyCountries = ["us"]; o.initialCountry = "";
    applyOptionSideEffects(o, {});
    expect(o.initialCountry).toBe("us");
  });

  test("separateDialCode forces nationalMode false", () => {
    const o = clone();
    o.separateDialCode = true; o.nationalMode = true;
    applyOptionSideEffects(o, {});
    expect(o.nationalMode).toBe(false);
  });

  test("allowDropdown without flags dial code forces nationalMode false", () => {
    const o = clone();
    o.allowDropdown = true; o.showFlags = false; o.separateDialCode = false; o.nationalMode = true;
    applyOptionSideEffects(o, {});
    expect(o.nationalMode).toBe(false);
  });

  test("useFullscreenPopup without container sets dropdownContainer", () => {
    const o = clone();
    o.useFullscreenPopup = true; o.dropdownContainer = null;
    applyOptionSideEffects(o, {});
    expect(o.dropdownContainer).toBe(document.body);
  });

  test("i18n merged with defaults", () => {
    const o = clone();
    o.i18n = { test: "x" };
    applyOptionSideEffects(o, { base: "base" });
    expect(o.i18n.test).toBe("x");
    expect(o.i18n.base).toBe("base");
  });
});
