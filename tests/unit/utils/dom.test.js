/**
 * @jest-environment jsdom
 */

const { buildClassNames, createEl } = require("../../../src/js/modules/utils/dom.ts");

describe("utils/dom", () => {
  test("buildClassNames filters falsy values", () => {
    const result = buildClassNames({ a: true, b: 0, c: false, d: "x" });
    expect(result.split(" ").sort()).toEqual(["a", "d"].sort());
  });

  test("createEl creates element with attrs and optional container", () => {
    const container = document.createElement("div");
    const el = createEl("span", { "data-x": "1", id: "foo" }, container);
    expect(el.tagName).toBe("SPAN");
    expect(el.getAttribute("data-x")).toBe("1");
    expect(container.contains(el)).toBe(true);
  });
});
