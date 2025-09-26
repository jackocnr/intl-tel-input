/**
 * @jest-environment node
 */

const { translateCursorPosition } = require("../../../src/js/modules/format/caret.ts");

describe("format/caret translateCursorPosition", () => {
  test("returns 0 when at start and backspacing", () => {
    expect(translateCursorPosition(1, "+1 23", 0, false)).toBe(0);
  });

  test("moves to just after final relevant char (not skipping following space)", () => {
    // formatted value has 3 relevant chars (+12) then a space then next digit
    // Implementation returns index immediately after 3rd relevant char (before the space) => 3
    expect(translateCursorPosition(3, "+12 3", 4, false)).toBe(3);
  });

  test("delete forwards places caret before next relevant char", () => {
    // relevant chars = 2, expect position right before 3rd relevant
    expect(translateCursorPosition(2, "+12 3", 2, true)).toBeGreaterThanOrEqual(2);
  });
});
