/**
 * @vitest-environment jsdom
 */

import { initIntlTelInput, teardown } from "../helpers/helpers";

describe("isActive method", () => {
  let iti;

  beforeEach(() => {
    ({ iti } = initIntlTelInput());
  });

  afterEach(() => teardown(iti));

  test("returns true for a newly initialised instance", () => {
    expect(iti.isActive()).toBe(true);
  });

  test("returns false after destroy", () => {
    iti.destroy();
    expect(iti.isActive()).toBe(false);
  });
});
