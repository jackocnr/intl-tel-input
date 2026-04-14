/**
 * @vitest-environment jsdom
 */

import { initPlugin, teardown } from "../helpers/helpers";

describe("isActive method", () => {
  let iti;

  beforeEach(() => {
    ({ iti } = initPlugin());
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
