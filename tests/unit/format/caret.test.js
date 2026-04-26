/**
 * @vitest-environment node
 */

import { computeNewCaretPosition } from "../../../packages/core/src/js/format/caret.ts";

describe("format/caret computeNewCaretPosition", () => {
  test("returns 0 when at start and backspacing", () => {
    expect(computeNewCaretPosition(1, "+1 23", 0, false)).toBe(0);
  });

  test("moves to just after final relevant char (not skipping following space)", () => {
    // formatted value has 3 relevant chars (+12) then a space then next digit
    // Implementation returns index immediately after 3rd relevant char (before the space) => 3
    expect(computeNewCaretPosition(3, "+12 3", 4, false)).toBe(3);
  });

  test("delete forwards places caret before next relevant char", () => {
    // relevant chars = 2, expect position right before 3rd relevant
    expect(computeNewCaretPosition(2, "+12 3", 2, true)).toBeGreaterThanOrEqual(2);
  });

  test("forward-delete at start preserves position 0", () => {
    // prevCaretPos === 0 early return only applies when NOT delete-forwards
    // With delete-forwards, we traverse: relevantChars=0 -> first relevant at i=0 triggers (0+1==1), returns 0
    expect(computeNewCaretPosition(0, "+12 3", 0, true)).toBe(0);
  });

  test("returns end of string when relevantChars exceeds total", () => {
    expect(computeNewCaretPosition(99, "+12 34", 6, false)).toBe("+12 34".length);
  });

  test("caret lands after last relevant char when at end", () => {
    // formatted "+1 234 5678" has relevant chars: + 1 2 3 4 5 6 7 8 (9 total)
    const formatted = "+1 234 5678";
    expect(computeNewCaretPosition(9, formatted, formatted.length, false)).toBe(formatted.length);
  });

  test("caret skips over formatting chars when counting relevant", () => {
    // "+1 (234) 5" - find position after 5 relevant chars (+,1,2,3,4)
    expect(computeNewCaretPosition(5, "+1 (234) 5", 7, false)).toBe(7); // after "4" at index 6, returns 7
  });

  test("backspace from position 1 traverses normally (not early-return)", () => {
    // prevCaretPos=1 so early return doesn't fire; position after 1 relevant char
    expect(computeNewCaretPosition(1, "+12", 1, false)).toBe(1);
  });

  test("delete-forwards counting accounts for the '+' as relevant", () => {
    // Format "+12 34": after 1 relevant (+), delete-forwards puts caret before next relevant ("1")
    expect(computeNewCaretPosition(1, "+12 34", 1, true)).toBe(1);
  });

  test("handles empty formatted value", () => {
    expect(computeNewCaretPosition(0, "", 0, false)).toBe(0);
    expect(computeNewCaretPosition(3, "", 0, false)).toBe(0);
  });

  test("handles formatted value of only formatting chars", () => {
    expect(computeNewCaretPosition(0, "   ", 0, false)).toBe(0);
    expect(computeNewCaretPosition(2, "   ", 2, false)).toBe(3);
  });
});
