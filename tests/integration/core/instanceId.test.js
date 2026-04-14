/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown, intlTelInput } from "../helpers/helpers";

describe("instance id", () => {
  test("is a number", () => {
    const { iti } = initPlugin();
    expect(typeof iti.id).toBe("number");
    teardown(iti);
  });

  test("is unique across instances", () => {
    const { iti: iti1 } = initPlugin();
    const { iti: iti2 } = initPlugin();
    const { iti: iti3 } = initPlugin();
    const ids = new Set([iti1.id, iti2.id, iti3.id]);
    expect(ids.size).toBe(3);
    teardown(iti1);
    teardown(iti2);
    teardown(iti3);
  });

  test("is exposed as data-intl-tel-input-id on the input element", () => {
    const { iti, input } = initPlugin();
    expect(input.dataset.intlTelInputId).toBe(String(iti.id));
    teardown(iti);
  });

  test("is used as the key in intlTelInput.instances", () => {
    const { iti } = initPlugin();
    expect(intlTelInput.instances.get(String(iti.id))).toBe(iti);
    teardown(iti);
  });
});
