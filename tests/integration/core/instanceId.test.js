/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, intlTelInput } from "../helpers/helpers";

describe("instance id", () => {
  test("is a number", () => {
    const { iti } = initIntlTelInput();
    expect(typeof iti.id).toBe("number");
    teardown(iti);
  });

  test("is unique across instances", () => {
    const { iti: iti1 } = initIntlTelInput();
    const { iti: iti2 } = initIntlTelInput();
    const { iti: iti3 } = initIntlTelInput();
    const ids = new Set([iti1.id, iti2.id, iti3.id]);
    expect(ids.size).toBe(3);
    teardown(iti1);
    teardown(iti2);
    teardown(iti3);
  });

  test("is exposed as data-intl-tel-input-id on the input element", () => {
    const { iti, input } = initIntlTelInput();
    expect(input.dataset.intlTelInputId).toBe(String(iti.id));
    teardown(iti);
  });

  test("is used as the key in intlTelInput.instances", () => {
    const { iti } = initIntlTelInput();
    expect(intlTelInput.instances.get(String(iti.id))).toBe(iti);
    teardown(iti);
  });
});
