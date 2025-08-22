//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import intlTelInput from "./intlTelInputWithUtils";
//* Keep the TS imports separate, as the above line gets substituted in the angularWithUtils build process.
import { Iti, SomeOptions } from "../intl-tel-input";
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, forwardRef, AfterViewInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

export { intlTelInput };

export const PHONE_ERROR_MESSAGES: string[] = [
  "invalid",
  "invalid-country-code",
  "too-short",
  "too-long",
  "invalid-format",
];

@Component({
  selector: "intl-tel-input",
  standalone: true,
  template: `
    <input
      type="tel"
      #inputRef
      (input)="handleInput()"
      (blur)="handleBlur()"
      [disabled]="disabled"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntlTelInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntlTelInputComponent),
      multi: true,
    },
  ],
})
export class IntlTelInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  @ViewChild("inputRef", { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  @Input() initialValue: string = "";
  @Input() usePreciseValidation: boolean = false;
  @Input() inputProps: object = {};
  @Input() disabled: boolean | undefined = undefined;
  @Input() initOptions: SomeOptions = {};

  @Output() numberChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() errorCodeChange = new EventEmitter<number | null>();

  private iti: Iti | null = null;
  private countryChangeHandler = () => this.handleInput();
  // eslint-disable-next-line class-methods-use-this
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onTouched: () => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onValidatorChange: () => void = () => {};

  ngOnInit() {
    if (this.inputRef.nativeElement) {
      this.iti = intlTelInput(this.inputRef.nativeElement, this.initOptions);
    }

    this.inputRef.nativeElement.addEventListener("countrychange", this.countryChangeHandler);

    this.applyInputProps();

    for (const key in this.inputProps) {
      if (this.inputProps.hasOwnProperty(key)) {
        this.inputRef.nativeElement.setAttribute(key, this.inputProps[key]);
      }
    }
  }

  ngAfterViewInit() {
    if (this.initialValue) {
      this.iti?.setNumber(this.initialValue);
    }
  }

  handleInput() {
    if (!this.iti) return;

    const num = this.iti.getNumber() || "";
    const countryIso = this.iti.getSelectedCountryData().iso2 || "";

    this.numberChange.emit(num);
    this.countryChange.emit(countryIso);

    const isValid = this.usePreciseValidation
      ? this.iti.isValidNumberPrecise()
      : this.iti.isValidNumber();

    if (isValid) {
      this.validityChange.emit(true);
      this.errorCodeChange.emit(null);
    } else {
      this.validityChange.emit(false);
      this.errorCodeChange.emit(this.iti.getValidationError());
    }

    this.onChange(num);
    this.onValidatorChange();
  }

  handleBlur() {
    this.onTouched();
  }

  getInstance(): Iti | null {
    return this.iti;
  }

  getInput(): HTMLInputElement | null {
    return this.inputRef.nativeElement;
  }

  ngOnDestroy() {
    this.iti?.destroy();

    this.inputRef.nativeElement.removeEventListener("countrychange", this.countryChangeHandler);
  }

  private applyInputProps(): void {
    const props = this.inputProps;
    Object.entries(props).forEach(([key, value]) => {
      this.inputRef.nativeElement.setAttribute(key, value);
    });
  }

  // ============ ControlValueAccessor Implementation ============

  writeValue(value: string | null): void {
    if (this.iti && value) {
      this.iti.setNumber(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ============ Validator Implementation ============

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.iti) {
      return null;
    }

    const isValid = this.usePreciseValidation
      ? this.iti.isValidNumberPrecise()
      : this.iti.isValidNumber();

    if (isValid) {
      return null;
    }

    const errorCode = this.iti.getValidationError();
    return {
      invalidPhone: {
        errorCode,
        errorMessage: PHONE_ERROR_MESSAGES[errorCode],
      },
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
