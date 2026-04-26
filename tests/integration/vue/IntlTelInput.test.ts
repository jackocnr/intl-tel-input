import { render, screen, waitFor, cleanup } from "@testing-library/vue";
import { afterEach, describe, expect, test, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import IntlTelInput, { intlTelInput } from "../../../packages/vue/src/indexWithUtils";

const getTelInput = () => screen.getByRole("textbox") as HTMLInputElement;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Vue IntlTelInput wrapper", () => {
  test("renders a tel input inside the iti container", () => {
    render(IntlTelInput);
    const input = getTelInput();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.parentElement?.classList.contains("iti")).toBe(true);
  });

  test("exposes the underlying iti instance and input via defineExpose", async () => {
    const itiRef = ref<{ instance: { isActive: () => boolean } | null; input: HTMLInputElement | null } | null>(null);
    const Wrapper = defineComponent({
      setup() {
        return () => h(IntlTelInput, { ref: itiRef });
      },
    });
    render(Wrapper);
    await waitFor(() => expect(itiRef.value?.instance).toBeTruthy());
    expect(itiRef.value!.instance!.isActive()).toBe(true);
    expect(itiRef.value!.input).toBeInstanceOf(HTMLInputElement);
  });

  test("destroys the iti instance on unmount", async () => {
    const { unmount, container } = render(IntlTelInput);
    const input = container.querySelector("input") as HTMLInputElement;
    const itiContainer = input.parentElement;
    expect(itiContainer?.classList.contains("iti")).toBe(true);
    unmount();
    // after unmount the input should no longer be wrapped by an active iti container in the DOM
    expect(document.body.contains(input)).toBe(false);
  });

  test("updating modelValue fires changeNumber / changeCountry", async () => {
    const onChangeNumber = vi.fn();
    const onChangeCountry = vi.fn();
    const { rerender } = render(IntlTelInput, {
      props: {
        modelValue: "",
        onChangeNumber,
        onChangeCountry,
      },
    });

    await rerender({
      modelValue: "+447733123456",
      onChangeNumber,
      onChangeCountry,
    });

    await waitFor(() => {
      expect(onChangeNumber).toHaveBeenCalledWith("+447733123456");
      expect(onChangeCountry).toHaveBeenCalledWith("gb");
    });
  });

  test("fires changeValidity and changeErrorCode when number becomes valid", async () => {
    const onChangeValidity = vi.fn();
    const onChangeErrorCode = vi.fn();
    const { rerender } = render(IntlTelInput, {
      props: {
        modelValue: "",
        onChangeValidity,
        onChangeErrorCode,
      },
    });

    await rerender({
      modelValue: "+447733123456",
      onChangeValidity,
      onChangeErrorCode,
    });

    await waitFor(() => {
      expect(onChangeValidity).toHaveBeenCalledWith(true);
      expect(onChangeErrorCode).toHaveBeenCalledWith(null);
    });
  });

  test("disabled prop toggles the input disabled state", async () => {
    const { rerender } = render(IntlTelInput, { props: { disabled: true } });
    await nextTick();
    expect(getTelInput().disabled).toBe(true);
    await rerender({ disabled: false });
    expect(getTelInput().disabled).toBe(false);
  });

  test("readonly prop toggles the input readOnly state", async () => {
    const { rerender } = render(IntlTelInput, { props: { readonly: true } });
    await nextTick();
    expect(getTelInput().readOnly).toBe(true);
    await rerender({ readonly: false });
    expect(getTelInput().readOnly).toBe(false);
  });

  test("initOptions are passed through to the plugin", async () => {
    render(IntlTelInput, { props: { initialCountry: "gb" } });
    await waitFor(() => {
      const flag = document.querySelector(".iti__selected-flag, .iti__selected-country");
      expect(flag).toBeTruthy();
    });
    // the country dropdown should now reflect gb
    const gbMarker = document.querySelector(".iti__flag.iti__gb, .iti__country.iti__gb");
    expect(gbMarker ?? document.body.innerHTML.includes("iti__gb")).toBeTruthy();
  });

  test("re-exports intlTelInput so users can access globals", () => {
    expect(typeof intlTelInput).toBe("function");
    expect(intlTelInput.utils).toBeTruthy();
  });

  test("applies safe inputProps (class, placeholder) to the input", () => {
    render(IntlTelInput, {
      props: {
        inputProps: { class: "custom", placeholder: "enter number" },
      },
    });
    const input = getTelInput();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.getAttribute("placeholder")).toBe("enter number");
  });

  test("modelValue takes precedence over initialValue when both are provided", async () => {
    const itiRef = ref<{ instance: { getSelectedCountryData: () => { iso2: string } } | null } | null>(null);
    const Wrapper = defineComponent({
      setup() {
        return () => h(IntlTelInput, {
          ref: itiRef,
          modelValue: "+447733123456",
          initialValue: "+33123456789",
        });
      },
    });
    render(Wrapper);
    await waitFor(() => expect(itiRef.value?.instance).toBeTruthy());
    // +44 means GB, so modelValue wins over initialValue (+33 = FR)
    expect(itiRef.value!.instance!.getSelectedCountryData().iso2).toBe("gb");
  });

  test("falls back to initialValue when modelValue is null/undefined", async () => {
    const itiRef = ref<{ instance: { getSelectedCountryData: () => { iso2: string } } | null } | null>(null);
    const Wrapper = defineComponent({
      setup() {
        return () => h(IntlTelInput, {
          ref: itiRef,
          modelValue: null,
          initialValue: "+447733123456",
        });
      },
    });
    render(Wrapper);
    await waitFor(() => expect(itiRef.value?.instance).toBeTruthy());
    expect(itiRef.value!.instance!.getSelectedCountryData().iso2).toBe("gb");
  });

  test("omitted boolean props do not override plugin defaults (e.g. nationalMode)", async () => {
    const { container } = render(IntlTelInput, { props: { initialCountry: "us" } });
    await waitFor(() => {
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.parentElement?.classList.contains("iti")).toBe(true);
    });
    // If boolean props were coerced to false, nationalMode (default true) would be wrong.
    // Assert via behavior: typing a US national number should not auto-prepend the +1 dial code.
    const input = getTelInput();
    input.value = "7024181234";
    input.dispatchEvent(new Event("input"));
    expect(input.value).not.toContain("+1");
  });

  test("warns and ignores unsafe inputProps (type, value, disabled, readonly, oninput)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ignoredOnInput = vi.fn();
    render(IntlTelInput, {
      props: {
        inputProps: {
          type: "text",
          value: "nope",
          disabled: true,
          readonly: true,
          oninput: ignoredOnInput,
        } as Record<string, unknown>,
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
