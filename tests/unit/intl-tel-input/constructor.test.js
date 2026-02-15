/**
 * @jest-environment jsdom
 */

const imported = require("../../../src/js/intl-tel-input.ts");
const intlTelInput = imported.default || imported;

describe("Iti constructor argument validation", () => {
  test("throws if input is not an HTMLInputElement", () => {
    expect(() => intlTelInput(null)).toThrow(TypeError);

    const div = document.createElement("div");
    expect(() => intlTelInput(div)).toThrow(TypeError);
  });
});
