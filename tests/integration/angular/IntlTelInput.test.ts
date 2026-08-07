import { afterEach, describe, expect, test, vi } from "vitest";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "../../../packages/angular/dist/IntlTelInputWithUtils.js";

type ItiComponent = InstanceType<typeof IntlTelInput>;
type ItiFixture = ComponentFixture<ItiComponent>;

const flushMicrotasks = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

const waitUntil = async (
  predicate: () => boolean,
  timeout = 2000,
): Promise<void> => {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeout) {
      throw new Error("waitUntil timed out");
    }
    await flushMicrotasks();
  }
};

const mount = (
  inputs: Record<string, unknown> = {},
): { fixture: ItiFixture; component: ItiComponent } => {
  const fixture = TestBed.createComponent(IntlTelInput) as ItiFixture;
  for (const [key, val] of Object.entries(inputs)) {
    fixture.componentRef.setInput(key, val);
  }
  fixture.detectChanges();
  return { fixture, component: fixture.componentInstance };
};

const getTelInput = (fixture: ComponentFixture<unknown>): HTMLInputElement =>
  fixture.nativeElement.querySelector("input[type=tel]") as HTMLInputElement;

class ReactiveFormHost {
  control = new FormControl<string | null>(null, Validators.required);

  valueChanges: (string | null)[] = [];

  constructor() {
    this.control.valueChanges.subscribe((value) => this.valueChanges.push(value));
  }
}

//* Decorator syntax isn't transformed in these test files, so apply the Component decorator as a
//* plain function call instead - the JIT compiler is happy either way.
const ReactiveFormHostComponent = Component({
  standalone: true,
  imports: [ReactiveFormsModule, IntlTelInput],
  template: `<intl-tel-input [formControl]="control" initialCountry="gb"></intl-tel-input>`,
})(ReactiveFormHost) as typeof ReactiveFormHost;

const mountReactiveForm = async (): Promise<{
  fixture: ComponentFixture<ReactiveFormHost>;
  host: ReactiveFormHost;
}> => {
  const fixture = TestBed.createComponent(ReactiveFormHostComponent);
  fixture.detectChanges();
  //* let the wrapper's iti.promise handler (which writes the initial value) run
  await flushMicrotasks();
  await flushMicrotasks();
  fixture.detectChanges();
  return { fixture, host: fixture.componentInstance };
};

afterEach(() => {
  TestBed.resetTestingModule();
  vi.restoreAllMocks();
});

describe("Angular IntlTelInput wrapper", () => {
  test("renders a tel input inside the iti container", () => {
    const { fixture } = mount();
    const input = getTelInput(fixture);
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.parentElement?.classList.contains("iti")).toBe(true);
  });

  test("passes classNames through to the library", () => {
    const { fixture } = mount({
      // DROPDOWN so the country list is rendered inline (fullscreen only attaches it on open)
      countrySelectorMode: "DROPDOWN",
      classNames: { selectedCountry: "custom-button", countryList: "custom-list", input: "custom-input" },
    });
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector(".iti__selected-country")!.classList).toContain("custom-button");
    expect(root.querySelector(".iti__country-list")!.classList).toContain("custom-list");
    expect(getTelInput(fixture).classList).toContain("custom-input");
  });

  test("changing inputAttributes.class replaces the old class rather than accumulating", () => {
    const { fixture } = mount({
      classNames: { input: "from-classnames" },
      inputAttributes: { class: "border-green" },
    });
    const input = getTelInput(fixture);
    expect(input.classList).toContain("border-green");

    fixture.componentRef.setInput("inputAttributes", { class: "border-red" });
    fixture.detectChanges();

    expect(input.classList).toContain("border-red");
    expect(input.classList).not.toContain("border-green");
    // the library's own classes survive
    expect(input.classList).toContain("iti__tel-input");
    expect(input.classList).toContain("from-classnames");
  });

  test("exposes the underlying iti instance and input via getters", () => {
    const { fixture, component } = mount();
    expect(component.getInstance()).toBeTruthy();
    expect(component.getInput()).toBe(getTelInput(fixture));
    expect(component.getInstance()!.isActive()).toBe(true);
  });

  test("destroys the iti instance on destroy", () => {
    const { fixture, component } = mount();
    const instance = component.getInstance()!;
    expect(instance.isActive()).toBe(true);
    fixture.destroy();
    expect(instance.isActive()).toBe(false);
  });

  test("initialValue + initialCountry are applied", async () => {
    const { component } = mount({
      initialValue: "+447733123456",
      initialCountry: "gb",
    });
    const instance = component.getInstance()!;
    await waitUntil(() => !!instance.getNumber());
    expect(instance.getSelectedCountry()?.iso2).toBe("gb");
    expect(instance.getNumber()).toBe("+447733123456");
  });

  test("getSelectedCountry inside a numberChange subscriber returns the newly-typed country", async () => {
    //* Listener-order regression: if the wrapper's input listener runs before the core updates the country,
    //* the user's numberChange subscriber sees stale country data when they look it up via getInstance().getSelectedCountry().
    //* See https://github.com/jackocnr/intl-tel-input/issues/2171#issuecomment-4565159354
    const { fixture, component } = mount({ initialCountry: "dk" });
    const seenCountriesInHandler: string[] = [];
    component.numberChange.subscribe(() => {
      const iso2 = component.getInstance()?.getSelectedCountry()?.iso2 ?? "";
      seenCountriesInHandler.push(iso2);
    });
    const instance = component.getInstance()!;
    await instance.promise;

    const input = getTelInput(fixture);
    //* Replace previous "+45..." with "+47..." in one input event (simulates pasting/selecting-all-then-typing the new prefix).
    input.value = "+4712345678";
    input.dispatchEvent(new Event("input"));

    await waitUntil(() => seenCountriesInHandler.length > 0);
    expect(seenCountriesInHandler.at(-1)).toBe("no");
  });

  test("emits numberChange / countryChange / validityChange / errorCodeChange on input", async () => {
    const { fixture, component } = mount({ initialCountry: "gb" });
    const numberChange = vi.fn();
    const validityChange = vi.fn();
    const errorCodeChange = vi.fn();
    component.numberChange.subscribe(numberChange);
    component.validityChange.subscribe(validityChange);
    component.errorCodeChange.subscribe(errorCodeChange);

    const instance = component.getInstance()!;
    await instance.promise;

    const input = getTelInput(fixture);
    input.value = "07733123456";
    input.dispatchEvent(new Event("input"));

    await waitUntil(() => numberChange.mock.calls.length > 0);
    expect(numberChange).toHaveBeenCalledWith("+447733123456");
    expect(validityChange).toHaveBeenCalledWith(true);
    expect(errorCodeChange).toHaveBeenLastCalledWith(null);
  });

  test("emits numberChange / countryChange / validityChange / errorCodeChange when the value changes via writeValue (ControlValueAccessor)", async () => {
    const { component } = mount();
    const numberChange = vi.fn();
    const countryChange = vi.fn();
    const validityChange = vi.fn();
    const errorCodeChange = vi.fn();
    component.numberChange.subscribe(numberChange);
    component.countryChange.subscribe(countryChange);
    component.validityChange.subscribe(validityChange);
    component.errorCodeChange.subscribe(errorCodeChange);

    const instance = component.getInstance()!;
    await instance.promise;

    component.writeValue("+447733123456");

    await waitUntil(() => numberChange.mock.calls.length > 0);
    expect(numberChange).toHaveBeenCalledWith("+447733123456");
    expect(countryChange).toHaveBeenCalledWith("gb");
    expect(validityChange).toHaveBeenCalledWith(true);
    expect(errorCodeChange).toHaveBeenLastCalledWith(null);
  });

  test("writeValue then resetting to empty clears the input", async () => {
    const { fixture, component } = mount();
    const numberChange = vi.fn();
    component.numberChange.subscribe(numberChange);

    const instance = component.getInstance()!;
    await instance.promise;

    component.writeValue("+447733123456");
    await waitUntil(() => getTelInput(fixture).value !== "");
    expect(numberChange).toHaveBeenCalledWith("+447733123456");

    component.writeValue("");
    await waitUntil(() => getTelInput(fixture).value === "");
    expect(numberChange).toHaveBeenLastCalledWith("");
  });

  //* Angular marks a control dirty on ANY onChange call from the value accessor, so writing a value
  //* that came from the model must not go back through onChange. See issue #2186.
  test("leaves the form control pristine on init", async () => {
    const { host } = await mountReactiveForm();
    expect(host.control.pristine).toBe(true);
    expect(host.control.dirty).toBe(false);
    //* the empty writeValue must not coerce the control's value from null to ""
    expect(host.control.value).toBe(null);
  });

  test("leaves the form control pristine when the value is set programmatically", async () => {
    const { fixture, host } = await mountReactiveForm();

    host.control.setValue("+447733123456");
    await waitUntil(() => getTelInput(fixture).value !== "");

    expect(host.control.pristine).toBe(true);
    expect(host.control.dirty).toBe(false);
    expect(host.control.value).toBe("+447733123456");
  });

  test("marks the form control dirty when the user types", async () => {
    const { fixture, host } = await mountReactiveForm();

    const input = getTelInput(fixture);
    input.value = "07733123456";
    input.dispatchEvent(new Event("input"));

    await waitUntil(() => host.control.dirty);
    expect(host.control.pristine).toBe(false);
    expect(host.control.value).toBe("+447733123456");
  });

  test("disabled input toggles the input disabled state", () => {
    const { fixture } = mount({ disabled: true });
    expect(getTelInput(fixture).disabled).toBe(true);
    fixture.componentRef.setInput("disabled", false);
    fixture.detectChanges();
    expect(getTelInput(fixture).disabled).toBe(false);
  });

  test("readonly input toggles the input readOnly state", () => {
    const { fixture } = mount({ readonly: true });
    expect(getTelInput(fixture).readOnly).toBe(true);
    fixture.componentRef.setInput("readonly", false);
    fixture.detectChanges();
    expect(getTelInput(fixture).readOnly).toBe(false);
  });

  test("re-exports intlTelInput so users can access globals", () => {
    expect(typeof intlTelInput).toBe("function");
    expect(intlTelInput.utils).toBeTruthy();
  });

  test("applies safe inputAttributes (class, placeholder) to the input", () => {
    const { fixture } = mount({
      inputAttributes: { class: "custom", placeholder: "enter number" },
    });
    const input = getTelInput(fixture);
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.getAttribute("placeholder")).toBe("enter number");
  });

  test("warns and ignores unsafe inputAttributes (type, value, disabled, readonly)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { fixture } = mount({
      inputAttributes: {
        type: "text",
        value: "nope",
        disabled: "true",
        readonly: "true",
      },
    });
    const input = getTelInput(fixture);
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.value).not.toBe("nope");
    expect(input.disabled).toBe(false);
    expect(input.readOnly).toBe(false);
    // applyInputAttrs runs twice (once from ngOnChanges when the @Input binds,
    // once from ngAfterViewInit) so each of the 4 unsafe keys triggers 2 warnings.
    expect(warn).toHaveBeenCalledTimes(8);
    const warnedKeys = warn.mock.calls.map((c) => c[0]);
    ["type", "value", "disabled", "readonly"].forEach((key) => {
      expect(warnedKeys.some((msg: string) => msg.includes(`inputAttributes.${key}`))).toBe(true);
    });
  });
});
