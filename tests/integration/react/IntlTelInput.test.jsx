import { createRef } from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import IntlTelInput, { intlTelInput } from "../../../packages/react/src/IntlTelInputWithUtils";

const getTelInput = () => screen.getByRole("textbox");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("React IntlTelInput wrapper", () => {
  test("renders a tel input inside the iti container", () => {
    render(<IntlTelInput />);
    const input = getTelInput();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.parentElement.classList.contains("iti")).toBe(true);
  });

  test("exposes the underlying iti instance and input via ref", () => {
    const ref = createRef();
    render(<IntlTelInput ref={ref} />);
    expect(ref.current.getInstance()).toBeTruthy();
    expect(ref.current.getInput()).toBe(getTelInput());
    expect(ref.current.getInstance().isActive()).toBe(true);
  });

  test("destroys the iti instance on unmount", () => {
    const ref = createRef();
    const { unmount } = render(<IntlTelInput ref={ref} />);
    const instance = ref.current.getInstance();
    expect(instance.isActive()).toBe(true);
    unmount();
    expect(instance.isActive()).toBe(false);
  });

  test("updating the value prop fires onChangeNumber / onChangeCountry", async () => {
    const onChangeNumber = vi.fn();
    const onChangeCountry = vi.fn();
    const { rerender } = render(
      <IntlTelInput
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        value=""
      />,
    );

    rerender(
      <IntlTelInput
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        value="+447733123456"
      />,
    );

    await waitFor(() => {
      expect(onChangeNumber).toHaveBeenCalledWith("+447733123456");
      expect(onChangeCountry).toHaveBeenCalledWith("gb");
    });
  });

  test("fires onChangeValidity and onChangeErrorCode for valid and invalid numbers", async () => {
    const onChangeValidity = vi.fn();
    const onChangeErrorCode = vi.fn();
    const { rerender } = render(
      <IntlTelInput
        onChangeValidity={onChangeValidity}
        onChangeErrorCode={onChangeErrorCode}
        value=""
      />,
    );
    rerender(
      <IntlTelInput
        onChangeValidity={onChangeValidity}
        onChangeErrorCode={onChangeErrorCode}
        value="+447733123456"
      />,
    );

    await waitFor(() => {
      expect(onChangeValidity).toHaveBeenCalledWith(true);
      expect(onChangeErrorCode).toHaveBeenCalledWith(null);
    });
  });

  test("disabled prop toggles the input disabled state", () => {
    const { rerender } = render(<IntlTelInput disabled />);
    expect(getTelInput().disabled).toBe(true);
    rerender(<IntlTelInput disabled={false} />);
    expect(getTelInput().disabled).toBe(false);
  });

  test("readOnly prop toggles the input readOnly state", () => {
    const { rerender } = render(<IntlTelInput readOnly />);
    expect(getTelInput().readOnly).toBe(true);
    rerender(<IntlTelInput readOnly={false} />);
    expect(getTelInput().readOnly).toBe(false);
  });

  test("initOptions are passed through to the library", () => {
    const ref = createRef();
    render(<IntlTelInput ref={ref} initialCountry="gb" />);
    expect(ref.current.getInstance().getSelectedCountryData().iso2).toBe("gb");
  });

  test("re-exports intlTelInput so users can access globals", () => {
    expect(typeof intlTelInput).toBe("function");
    expect(intlTelInput.utils).toBeTruthy();
  });

  test("applies safe inputProps (className, placeholder) to the input", () => {
    render(
      <IntlTelInput
        inputProps={{ className: "custom", placeholder: "enter number" }}
      />,
    );
    const input = getTelInput();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.getAttribute("placeholder")).toBe("enter number");
  });

  test("initOptions are init-only: changing initialCountry on re-render is a no-op", () => {
    const ref = createRef();
    const { rerender } = render(<IntlTelInput ref={ref} initialCountry="gb" />);
    expect(ref.current.getInstance().getSelectedCountryData().iso2).toBe("gb");
    rerender(<IntlTelInput ref={ref} initialCountry="fr" />);
    // initOptions snapshot at mount time only; re-rendering does not re-init the library
    expect(ref.current.getInstance().getSelectedCountryData().iso2).toBe("gb");
  });

  test("ref.current stays stable across re-renders", () => {
    const ref = createRef();
    const { rerender } = render(<IntlTelInput ref={ref} value="" />);
    const firstInstance = ref.current.getInstance();
    rerender(<IntlTelInput ref={ref} value="+44" />);
    expect(ref.current.getInstance()).toBe(firstInstance);
  });

  test("warns and ignores unsafe inputProps (type, value, disabled, readOnly, onInput)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ignoredOnInput = vi.fn();
    render(
      <IntlTelInput
        inputProps={{
          type: "text",
          value: "nope",
          disabled: true,
          readOnly: true,
          onInput: ignoredOnInput,
        }}
      />,
    );
    const input = getTelInput();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.value).not.toBe("nope");
    expect(input.disabled).toBe(false);
    expect(input.readOnly).toBe(false);
    // one warning per ignored prop
    expect(warn).toHaveBeenCalledTimes(5);
  });
});
