/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { setup, teardown } = require("../helpers/helpers");

let input, iti;

const initOptions = {
  initialCountry: "us",
  strictMode: true,
};

describe("strictMode", () => {
  beforeEach(() => {
    ({ input, iti } = setup(initOptions));
  });
      
  afterEach(() => {
    teardown(iti);
  });
  
  test("ignore irrelevant chars", async () => {
    const user = userEvent.setup();
    await user.type(input, "+1a9./-:$@&*b8c7d+");
    expect(input.value).toBe("+1 987");
  });
  
  test("ignore chars after max length", async () => {
    const user = userEvent.setup();
    await user.type(input, "70212345678");
    expect(input.value).toBe("(702) 123-4567");
  });
});
