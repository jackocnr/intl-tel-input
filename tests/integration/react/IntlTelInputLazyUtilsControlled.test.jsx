import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { createRef, useState } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
//* Deliberately the build WITHOUT utils (in its own file, so the module graph never has utils preloaded), so we can
//* control when utils arrives via the loadUtils option and exercise the utils-loading gap.
import IntlTelInput, { intlTelInput } from "../../../packages/react/src/IntlTelInput";

afterEach(cleanup);

describe("React IntlTelInput wrapper (lazy-loaded utils, controlled value)", () => {
  test("typing during the utils-loading gap is not overwritten by the stale controlled value", async () => {
    expect(intlTelInput.utils).toBeFalsy();
    const { promise: gate, resolve: releaseUtils } = Promise.withResolvers();
    const loadUtils = () => gate.then(() => import("intl-tel-input/utils"));
    const onChangeNumber = vi.fn();
    const itiRef = createRef();

    const ControlledInput = () => {
      const [value, setValue] = useState("");
      return (
        <>
          <IntlTelInput
            ref={itiRef}
            initialCountry="us"
            loadUtils={loadUtils}
            value={value}
            onChangeNumber={(num) => {
              onChangeNumber(num);
              setValue(num);
            }}
          />
          <button type="button">Continue</button>
        </>
      );
    };
    render(<ControlledInput />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "7024181234");
    //* The controlled value is only synced into the input while it doesn't have focus
    await user.click(screen.getByRole("button", { name: "Continue" }));

    releaseUtils();
    await itiRef.current.getInstance().promise;

    expect(onChangeNumber).toHaveBeenCalledExactlyOnceWith("+17024181234");
    expect(input.value.replace(/\D/g, "")).toBe("7024181234");
  });
});
