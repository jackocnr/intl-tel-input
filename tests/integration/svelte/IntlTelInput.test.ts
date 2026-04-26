import { render, screen, waitFor, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, test, vi } from "vitest";
import IntlTelInput, { intlTelInput } from "../../../packages/svelte/src/IntlTelInputWithUtils.svelte";

const getTelInput = () => screen.getByRole("textbox") as HTMLInputElement;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Svelte IntlTelInput wrapper", () => {
  test("renders a tel input inside the iti container", () => {
    render(IntlTelInput);
    const input = getTelInput();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.parentElement?.classList.contains("iti")).toBe(true);
  });

  test("exposes the underlying iti instance and input via getInstance/getInput", () => {
    const { component } = render(IntlTelInput);
    const instance = (component as unknown as { getInstance: () => { isActive: () => boolean } | undefined }).getInstance();
    const input = (component as unknown as { getInput: () => HTMLInputElement | undefined }).getInput();
    expect(instance).toBeTruthy();
    expect(instance!.isActive()).toBe(true);
    expect(input).toBe(getTelInput());
  });

  test("destroys the iti instance on unmount", () => {
    const { unmount, container } = render(IntlTelInput);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.parentElement?.classList.contains("iti")).toBe(true);
    unmount();
    expect(document.body.contains(input)).toBe(false);
  });

  test("updating value prop fires onChangeNumber / onChangeCountry", async () => {
    const onChangeNumber = vi.fn();
    const onChangeCountry = vi.fn();
    const { rerender } = render(IntlTelInput, {
      value: "",
      onChangeNumber,
      onChangeCountry,
    });

    await rerender({
      value: "+447733123456",
      onChangeNumber,
      onChangeCountry,
    });

    await waitFor(() => {
      expect(onChangeNumber).toHaveBeenCalledWith("+447733123456");
      expect(onChangeCountry).toHaveBeenCalledWith("gb");
    });
  });

  test("fires onChangeValidity and onChangeErrorCode when number becomes valid", async () => {
    const onChangeValidity = vi.fn();
    const onChangeErrorCode = vi.fn();
    const { rerender } = render(IntlTelInput, {
      value: "",
      onChangeValidity,
      onChangeErrorCode,
    });

    await rerender({
      value: "+447733123456",
      onChangeValidity,
      onChangeErrorCode,
    });

    await waitFor(() => {
      expect(onChangeValidity).toHaveBeenCalledWith(true);
      expect(onChangeErrorCode).toHaveBeenCalledWith(null);
    });
  });

  test("disabled prop toggles the input disabled state", async () => {
    const { rerender } = render(IntlTelInput, { disabled: true });
    await waitFor(() => expect(getTelInput().disabled).toBe(true));
    await rerender({ disabled: false });
    await waitFor(() => expect(getTelInput().disabled).toBe(false));
  });

  test("readonly prop toggles the input readOnly state", async () => {
    const { rerender } = render(IntlTelInput, { readonly: true });
    await waitFor(() => expect(getTelInput().readOnly).toBe(true));
    await rerender({ readonly: false });
    await waitFor(() => expect(getTelInput().readOnly).toBe(false));
  });

  test("initOptions are passed through to the plugin", async () => {
    render(IntlTelInput, { initialCountry: "gb" });
    await waitFor(() => {
      expect(document.body.innerHTML.includes("iti__gb")).toBe(true);
    });
  });

  test("re-exports intlTelInput so users can access globals", () => {
    expect(typeof intlTelInput).toBe("function");
    expect(intlTelInput.utils).toBeTruthy();
  });

  test("applies safe inputProps (class, placeholder) to the input", () => {
    render(IntlTelInput, {
      inputProps: { class: "custom", placeholder: "enter number" },
    });
    const input = getTelInput();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.getAttribute("placeholder")).toBe("enter number");
  });

  test("getInstance returns undefined after unmount", () => {
    const { unmount, component } = render(IntlTelInput);
    const instance = (component as unknown as { getInstance: () => { isActive: () => boolean } | undefined }).getInstance();
    expect(instance?.isActive()).toBe(true);
    unmount();
    // after unmount, the instance has been destroyed
    expect(instance?.isActive()).toBe(false);
  });

  test("rapid value changes update number without errors", async () => {
    const onChangeNumber = vi.fn();
    const { rerender } = render(IntlTelInput, { value: "", onChangeNumber });
    await rerender({ value: "+33123456789", onChangeNumber });
    await rerender({ value: "+447733123456", onChangeNumber });
    await rerender({ value: "+4930901820", onChangeNumber });
    await waitFor(() => {
      expect(onChangeNumber).toHaveBeenCalledWith("+4930901820");
    });
  });

  test("warns and ignores unsafe inputProps (type, value, disabled, readonly, oninput)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ignoredOnInput = vi.fn();
    render(IntlTelInput, {
      inputProps: {
        type: "text",
        value: "nope",
        disabled: true,
        readonly: true,
        oninput: ignoredOnInput,
      },
    });
    const input = getTelInput();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.value).not.toBe("nope");
    expect(input.disabled).toBe(false);
    expect(input.readOnly).toBe(false);
    expect(warn).toHaveBeenCalledTimes(5);
  });
});
