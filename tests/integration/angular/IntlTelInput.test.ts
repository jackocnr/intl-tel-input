import { afterEach, describe, expect, test, vi } from "vitest";
import { TestBed, ComponentFixture } from "@angular/core/testing";
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

const getTelInput = (fixture: ItiFixture): HTMLInputElement =>
  fixture.nativeElement.querySelector("input[type=tel]") as HTMLInputElement;

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
    expect(instance.getSelectedCountryData()?.iso2).toBe("gb");
    expect(instance.getNumber()).toBe("+447733123456");
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
