import { render, screen, waitFor, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
//* Deliberately the build WITHOUT utils (in its own file, so the module graph never has utils preloaded), so we can
//* control when utils arrives via the loadUtils option and exercise the utils-loading gap.
import IntlTelInput, { intlTelInput } from "../../../packages/react/src/IntlTelInput";

const getTelInput = () => screen.getByRole("textbox");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("React IntlTelInput wrapper (lazy-loaded utils)", () => {
  test("typing during the utils-loading gap does not fire onChangeCountry for an unchanged country", async () => {
    //* Regression: an input event before utils has loaded is deferred and replayed once the promise resolves.
    //* The replay compared against an unseeded country baseline, so it fired onChangeCountry for the initialCountry.
    //* See https://github.com/jackocnr/intl-tel-input/pull/2201
    expect(intlTelInput.utils).toBeFalsy();
    let releaseUtils;
    const gate = new Promise((resolve) => {
      releaseUtils = resolve;
    });
    const loadUtils = () => gate.then(() => import("intl-tel-input/utils"));
    const onChangeNumber = vi.fn();
    const onChangeCountry = vi.fn();
    render(
      <IntlTelInput
        initialCountry="us"
        loadUtils={loadUtils}
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
      />,
    );

    const input = getTelInput();
    //* Use the native value setter so React's input value tracker registers the change.
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, "7024181234");
    fireEvent.input(input);
    //* utils hasn't loaded yet, so the update is deferred
    expect(onChangeNumber).not.toHaveBeenCalled();

    releaseUtils();
    await waitFor(() => expect(onChangeNumber).toHaveBeenCalledWith("+17024181234"));
    expect(onChangeCountry).not.toHaveBeenCalled();
  });
});
