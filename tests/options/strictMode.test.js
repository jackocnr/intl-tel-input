/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { initPlugin, teardown } = require("../helpers/helpers");

let input, iti, user;

const options = {
  initialCountry: "us",
  strictMode: true,
};

describe("strictMode", () => {
  beforeEach(() => {
    user = userEvent.setup();
    ({ input, iti } = initPlugin({ options }));
  });
      
  afterEach(() => {
    teardown(iti);
  });
  
  test("ignore irrelevant chars", async () => {
    await user.type(input, "+1a9./-:$@&*b8c7d+");
    expect(input.value).toBe("+1 987");
  });
  
  test("ignore chars after max length", async () => {
    await user.type(input, "70212345678");
    expect(input.value).toBe("(702) 123-4567");
  });
});
