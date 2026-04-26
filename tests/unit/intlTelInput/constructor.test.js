/**
 * @vitest-environment jsdom
 */

import intlTelInput from "../../../packages/core/src/js/intlTelInput.ts";

describe("Iti constructor argument validation", () => {
  test("throws if input is not an HTMLInputElement", () => {
    expect(() => intlTelInput(null)).toThrow(TypeError);

    const div = document.createElement("div");
    expect(() => intlTelInput(div)).toThrow(TypeError);
  });
});
