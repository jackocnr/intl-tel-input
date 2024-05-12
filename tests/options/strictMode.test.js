/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const { setup, teardown } = require("../helpers/helpers");

let input, iti;
const options = {
  initialCountry: "us",
  strictMode: true,
};

beforeEach(() => {
  ({ input, iti } = setup(options));
});
    
afterEach(() => {
  teardown(iti);
});

test("strictMode: ignore irrelevant chars", async () => {
  const user = userEvent.setup();
  await user.type(input, "+1a9./-:$@&*b8c7d+");
  expect(input.value).toBe("+1 987");
});

test("strictMode: ignore chars after max length", async () => {
  const user = userEvent.setup();
  await user.type(input, "70212345678");
  expect(input.value).toBe("(702) 123-4567");
});