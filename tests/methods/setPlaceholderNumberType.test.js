/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");


describe("setPlaceholderNumberType method", () => {
  let iti, input;

  beforeEach(() => {
    const options = { initialCountry: "gb" };
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
