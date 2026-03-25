import intlTelInput from "../intl-tel-input";
//* Keep the TS imports separate, as the above line gets substituted in the angularWithUtils build process.
import { Iti } from "../intl-tel-input";
import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { SomeOptions } from "../modules/types/public-api";

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
      (blur)="handleBlur($event)"
      (focus)="handleFocus($event)"
      (keydown)="handleKeyDown($event)"
      (keyup)="handleKeyUp($event)"
      (paste)="handlePaste($event)"
      (click)="handleClick($event)"
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
export class IntlTelInputComponent
  implements
    AfterViewInit,
    OnDestroy,
    OnChanges,
    ControlValueAccessor,
    Validator
{
  @ViewChild("inputRef", { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  /** initialValue and initOptions are only used during initialization — changes after init are ignored. */
  @Input() initialValue?: string;
  @Input() initOptions?: SomeOptions;

  @Input() usePreciseValidation: boolean = false;
  @Input() inputProps: Record<string, string> = {};
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @Output() numberChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() errorCodeChange = new EventEmitter<number | null>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() paste = new EventEmitter<ClipboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();

  private iti?: Iti;
  private appliedInputPropKeys = new Set<string>();

  private lastEmittedNumber?: string;
  private lastEmittedCountry?: string;
  private lastEmittedValidity?: boolean;
  private lastEmittedErrorCode?: number | null;

  private countryChangeHandler = () => this.handleInput();
  // eslint-disable-next-line class-methods-use-this
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onTouched: () => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onValidatorChange: () => void = () => {};

  ngAfterViewInit() {
    this.iti = intlTelInput(this.inputRef.nativeElement, this.initOptions);

    this.inputRef.nativeElement.addEventListener(
      "countrychange",
      this.countryChangeHandler,
    );

    this.applyInputProps();

    if (this.initialValue) {
      this.iti?.setNumber(this.initialValue);
    }

    if (this.disabled) {
      this.iti?.setDisabled(this.disabled);
    }

    if (this.readonly) {
      this.iti?.setReadonly(this.readonly);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["disabled"]) {
      this.iti?.setDisabled(this.disabled);
    }

    if (changes["readonly"]) {
      this.iti?.setReadonly(this.readonly);
    }

    if (changes["inputProps"]) {
      this.applyInputProps();
    }
  }

  handleInput() {
    if (!this.iti) return;

    const num = this.iti.getNumber() || "";
    const countryIso = this.iti.getSelectedCountryData().iso2 || "";

    let hasChanged = false;
    if (num !== this.lastEmittedNumber) {
      this.lastEmittedNumber = num;
      this.numberChange.emit(num);
      this.onChange(num);
      hasChanged = true;
    }

    if (countryIso !== this.lastEmittedCountry) {
      this.lastEmittedCountry = countryIso;
      this.countryChange.emit(countryIso);
      hasChanged = true;
    }

    const isValid = this.usePreciseValidation
      ? this.iti.isValidNumberPrecise()
      : this.iti.isValidNumber();

    const errorCode = isValid ? null : this.iti.getValidationError();

    if (isValid !== this.lastEmittedValidity) {
      this.lastEmittedValidity = isValid;
      this.validityChange.emit(isValid);
      hasChanged = true;
    }

    if (errorCode !== this.lastEmittedErrorCode) {
      this.lastEmittedErrorCode = errorCode;
      this.errorCodeChange.emit(errorCode);
      hasChanged = true;
    }

    if (hasChanged) {
      this.onValidatorChange();
    }
  }

  handleBlur(event: FocusEvent) {
    this.onTouched();
    this.blur.emit(event);
  }

  handleFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.keydown.emit(event);
  }

  handleKeyUp(event: KeyboardEvent) {
    this.keyup.emit(event);
  }

  handlePaste(event: ClipboardEvent) {
    this.paste.emit(event);
  }

  handleClick(event: MouseEvent) {
    this.click.emit(event);
  }

  /**
   * This method must be called in `ngAfterViewInit` or later lifecycle hooks,
   * not in `ngOnInit` or the `constructor`, as the component needs to be fully initialized.
   */
  getInstance(): Iti | null {
    return this.iti;
  }

  /**
   * This method must be called in `ngAfterViewInit` or later lifecycle hooks,
   * not in `ngOnInit` or the `constructor`, as the component needs to be fully initialized.
   */
  getInput(): HTMLInputElement {
    return this.inputRef.nativeElement;
  }

  ngOnDestroy() {
    this.iti?.destroy();

    this.inputRef.nativeElement.removeEventListener(
      "countrychange",
      this.countryChangeHandler,
    );
  }

  private applyInputProps(): void {
    const currentKeys = new Set<string>();
    Object.entries(this.inputProps).forEach(([key, value]) => {
      currentKeys.add(key);
      this.inputRef.nativeElement.setAttribute(key, value);
    });
    this.appliedInputPropKeys.forEach((key) => {
      if (!currentKeys.has(key)) {
        this.inputRef.nativeElement.removeAttribute(key);
      }
    });
    this.appliedInputPropKeys = currentKeys;
  }

  // ============ ControlValueAccessor Implementation ============

  writeValue(value: string | null): void {
    if (this.iti) {
      this.iti.setNumber(value || "");
      this.handleInput();
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
    this.iti?.setDisabled(isDisabled);
  }

  // ============ Validator Implementation ============

  validate(_control: AbstractControl): ValidationErrors | null {
    if (!this.iti || !this.iti.getNumber()) {
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
        errorMessage: PHONE_ERROR_MESSAGES[errorCode] ?? "unknown",
      },
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
