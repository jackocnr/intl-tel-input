import { createRef } from "react";
import { render, screen, waitFor, cleanup, fireEvent } from "@testing-library/react";
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

  test("getSelectedCountry inside an onChangeNumber handler returns the newly-typed country", async () => {
    //* Listener-order regression guard: React's synthetic onInput is delegated to the root, so it fires
    //* after native listeners on the element itself — which means the core's input handler has already
    //* updated the country by the time onChangeNumber runs and the user reads getSelectedCountry().
    //* See https://github.com/jackocnr/intl-tel-input/issues/2171#issuecomment-4565159354
    const ref = createRef();
    const seenCountriesInHandler = [];
    const onChangeNumber = vi.fn(() => {
      const iso2 = ref.current?.getInstance()?.getSelectedCountry()?.iso2 ?? "";
      seenCountriesInHandler.push(iso2);
    });
    render(
      <IntlTelInput
        ref={ref}
        initialCountry="dk"
        onChangeNumber={onChangeNumber}
      />,
    );

    const input = getTelInput();
    //* Wait for the wrapper's promise.then() seed step to run, otherwise our event will be treated
    //* as a "fired during the utils-loading gap" replay rather than going through the normal update path.
    await waitFor(() => expect(ref.current.getInstance().getNumber()).toBeDefined());
    //* Replace previous "+45..." with "+47..." in one input event (simulates pasting/selecting-all-then-typing the new prefix).
    //* Use the native value setter so React's input value tracker registers the change.
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "+4712345678");
    fireEvent.input(input);

    await waitFor(() => expect(onChangeNumber).toHaveBeenCalled());
    expect(seenCountriesInHandler.at(-1)).toBe("no");
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

  // React's equivalent of an `initialValue` prop is `inputProps.defaultValue`.
  test("inputProps.defaultValue sets the initial number on mount", async () => {
    const ref = createRef();
    render(
      <IntlTelInput
        ref={ref}
        inputProps={{ defaultValue: "+447733123456" }}
      />,
    );
    await waitFor(() => {
      expect(ref.current.getInstance().getNumber()).toBe("+447733123456");
      expect(ref.current.getInstance().getSelectedCountry().iso2).toBe("gb");
    });
  });

  test("clearing the value prop empties the input", async () => {
    const onChangeNumber = vi.fn();
    const { rerender } = render(
      <IntlTelInput onChangeNumber={onChangeNumber} value="+447733123456" />,
    );
    await waitFor(() => {
      expect(getTelInput().value).not.toBe("");
      expect(onChangeNumber).toHaveBeenCalledWith("+447733123456");
    });
    rerender(<IntlTelInput onChangeNumber={onChangeNumber} value="" />);
    await waitFor(() => {
      expect(getTelInput().value).toBe("");
      expect(onChangeNumber).toHaveBeenLastCalledWith("");
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
    expect(ref.current.getInstance().getSelectedCountry().iso2).toBe("gb");
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

  test("passes classNames through to the library", () => {
    render(
      <IntlTelInput
        // DROPDOWN so the country list is rendered inline (fullscreen only attaches it on open)
        countrySelectorMode="DROPDOWN"
        classNames={{ selectedCountry: "custom-button", countryList: "custom-list" }}
      />,
    );
    expect(document.querySelector(".iti__selected-country").classList).toContain("custom-button");
    expect(document.querySelector(".iti__country-list").classList).toContain("custom-list");
  });

  test("classNames.input and inputProps.className are both applied to the input", () => {
    render(
      <IntlTelInput
        classNames={{ input: "from-classnames" }}
        inputProps={{ className: "from-inputprops" }}
      />,
    );
    const input = getTelInput();
    expect(input.classList.contains("from-inputprops")).toBe(true);
    expect(input.classList.contains("from-classnames")).toBe(true);
    expect(input.classList.contains("iti__tel-input")).toBe(true);
  });

  test("changing inputProps.className replaces the old class rather than accumulating", () => {
    const { rerender } = render(
      <IntlTelInput
        classNames={{ input: "from-classnames" }}
        inputProps={{ className: "border-green" }}
      />,
    );
    const input = getTelInput();
    expect(input.classList.contains("border-green")).toBe(true);

    rerender(
      <IntlTelInput
        classNames={{ input: "from-classnames" }}
        inputProps={{ className: "border-red" }}
      />,
    );

    expect(input.classList.contains("border-red")).toBe(true);
    expect(input.classList.contains("border-green")).toBe(false);
    // the library's own classes survive the re-render
    expect(input.classList.contains("iti__tel-input")).toBe(true);
    expect(input.classList.contains("from-classnames")).toBe(true);
  });

  test("re-rendering with an unchanged inputProps.className does not duplicate it", () => {
    const { rerender } = render(<IntlTelInput inputProps={{ className: "custom" }} />);
    const input = getTelInput();

    rerender(<IntlTelInput inputProps={{ className: "custom" }} />);

    const occurrences = input.className.split(/\s+/).filter((c) => c === "custom");
    expect(occurrences).toHaveLength(1);
  });

  test("an undefined inputProps.className does not add a stray class", () => {
    render(<IntlTelInput inputProps={{ className: undefined }} />);
    const input = getTelInput();
    expect(input.classList.contains("undefined")).toBe(false);
    expect(input.classList.contains("iti__tel-input")).toBe(true);
  });

  test("initOptions are init-only: changing initialCountry on re-render is a no-op", () => {
    const ref = createRef();
    const { rerender } = render(<IntlTelInput ref={ref} initialCountry="gb" />);
    expect(ref.current.getInstance().getSelectedCountry().iso2).toBe("gb");
    rerender(<IntlTelInput ref={ref} initialCountry="fr" />);
    // initOptions snapshot at mount time only; re-rendering does not re-init the library
    expect(ref.current.getInstance().getSelectedCountry().iso2).toBe("gb");
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
