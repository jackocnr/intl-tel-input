/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown } from "../helpers/helpers";


describe("setPlaceholderNumberType method", () => {
  let iti, input;

  beforeEach(() => {
    const options = { initialCountry: "gb" };
    ({ iti, input } = initPlugin({ options }));
  });
  afterEach(() => teardown(iti));

  test("sets placeholder type to fixed line", async () => {
    iti.setPlaceholderNumberType("FIXED_LINE");
    expect(input.getAttribute("placeholder")).toEqual("121 234 5678");
  });

  test("sets placeholder type to mobile", async () => {
    iti.setPlaceholderNumberType("MOBILE");
    expect(input.getAttribute("placeholder")).toEqual("7400 123456");
  });

  test("placeholder updates after switching country", async () => {
    iti.setPlaceholderNumberType("MOBILE");
    iti.setCountry("us");
    expect(input.getAttribute("placeholder")).toEqual("201-555-0123");
  });

  test("switching type re-renders placeholder", async () => {
    iti.setPlaceholderNumberType("MOBILE");
    expect(input.getAttribute("placeholder")).toEqual("7400 123456");
    iti.setPlaceholderNumberType("FIXED_LINE");
    expect(input.getAttribute("placeholder")).toEqual("121 234 5678");
  });
});
