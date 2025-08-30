/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");

let iti, input;

describe("setPlaceholderNumberType method", () => {
  const options = { initialCountry: "gb" };

  beforeEach(() => {
    ({ iti, input } = initPlugin({ options }));
  });
  afterEach(() => teardown(iti));

  test("sets placeholder type to fixed line", async () => {
    iti.setPlaceholderNumberType("FIXED_LINE");
    expect(input.getAttribute("placeholder")).toEqual("0121 234 5678");
  });

  test("sets placeholder type to mobile", async () => {
    iti.setPlaceholderNumberType("MOBILE");
    expect(input.getAttribute("placeholder")).toEqual("07400 123456");
  });
});
