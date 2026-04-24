import intlTelInput, { Iti } from "intl-tel-input";
import type { AllOptions, SomeOptions } from "intl-tel-input";
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

export { intlTelInput };

export type StrictRejectDetail = {
  source: "key" | "paste";
  rejectedInput: string;
  reason: "invalid" | "max-length";
};

const warnInputAttr = (prop: string): void => {
  console.warn(
    `intl-tel-input: ignoring inputAttributes.${prop} - see docs for more info.`,
  );
};

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
      useExisting: forwardRef(() => IntlTelInput),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntlTelInput),
      multi: true,
    },
  ],
})
class IntlTelInput
  implements
    AfterViewInit,
    OnDestroy,
    OnChanges,
    ControlValueAccessor,
    Validator {
  @ViewChild("inputRef", { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  /** initialValue is only used during initialization — changes after init are ignored. */
  @Input() initialValue?: string;

  @Input() usePreciseValidation: boolean = false;
  @Input() inputAttributes: Record<string, string> = {};
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Plugin initialisation options (one @Input per option)
  @Input() allowDropdown?: AllOptions["allowDropdown"];
  @Input() allowedNumberTypes?: AllOptions["allowedNumberTypes"];
  @Input() allowNumberExtensions?: AllOptions["allowNumberExtensions"];
  @Input() allowPhonewords?: AllOptions["allowPhonewords"];
  @Input() autoPlaceholder?: AllOptions["autoPlaceholder"];
  @Input() containerClass?: AllOptions["containerClass"];
  @Input() countryNameLocale?: AllOptions["countryNameLocale"];
  @Input() countryOrder?: AllOptions["countryOrder"];
  @Input() countrySearch?: AllOptions["countrySearch"];
  @Input() customPlaceholder?: AllOptions["customPlaceholder"];
  @Input() dropdownAlwaysOpen?: AllOptions["dropdownAlwaysOpen"];
  @Input() dropdownContainer?: AllOptions["dropdownContainer"];
  @Input() excludeCountries?: AllOptions["excludeCountries"];
  @Input() fixDropdownWidth?: AllOptions["fixDropdownWidth"];
  @Input() formatAsYouType?: AllOptions["formatAsYouType"];
  @Input() formatOnDisplay?: AllOptions["formatOnDisplay"];
  @Input() geoIpLookup?: AllOptions["geoIpLookup"];
  @Input() hiddenInput?: AllOptions["hiddenInput"];
  @Input() i18n?: AllOptions["i18n"];
  @Input() initialCountry?: AllOptions["initialCountry"];
  @Input() loadUtils?: AllOptions["loadUtils"];
  @Input() nationalMode?: AllOptions["nationalMode"];
  @Input() onlyCountries?: AllOptions["onlyCountries"];
  @Input() placeholderNumberType?: AllOptions["placeholderNumberType"];
  @Input() searchInputClass?: AllOptions["searchInputClass"];
  @Input() separateDialCode?: AllOptions["separateDialCode"];
  @Input() showFlags?: AllOptions["showFlags"];
  @Input() strictMode?: AllOptions["strictMode"];
  @Input() strictRejectAnimation?: AllOptions["strictRejectAnimation"];
  @Input() useFullscreenPopup?: AllOptions["useFullscreenPopup"];

  @Output() numberChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() errorCodeChange = new EventEmitter<number | null>();
  @Output() openCountryDropdown = new EventEmitter<void>();
  @Output() closeCountryDropdown = new EventEmitter<void>();
  @Output() strictReject = new EventEmitter<StrictRejectDetail>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() paste = new EventEmitter<ClipboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();

  private iti?: Iti;
  private appliedInputAttrKeys = new Set<string>();

  private lastEmittedNumber?: string;
  private lastEmittedCountry?: string;
  private lastEmittedValidity?: boolean;
  private lastEmittedErrorCode?: number | null;

  // writeValue may be called by Angular forms before utils has loaded; queue it until then
  private pendingWriteValue?: string;

  // if an input event fires before utils has loaded, we defer the update until the promise resolves
  private pendingUpdate = false;

  // eslint-disable-next-line class-methods-use-this
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onTouched: () => void = () => {};
  // eslint-disable-next-line class-methods-use-this
  private onValidatorChange: () => void = () => {};

  private handleOpenDropdown = (): void => this.openCountryDropdown.emit();
  private handleCloseDropdown = (): void => this.closeCountryDropdown.emit();
  private handleStrictReject = (e: Event): void => {
    this.strictReject.emit((e as CustomEvent<StrictRejectDetail>).detail);
  };

  ngAfterViewInit() {
    this.iti = intlTelInput(
      this.inputRef.nativeElement,
      this.buildInitOptions(),
    );

    this.inputRef.nativeElement.addEventListener(
      "open:countrydropdown",
      this.handleOpenDropdown,
    );
    this.inputRef.nativeElement.addEventListener(
      "close:countrydropdown",
      this.handleCloseDropdown,
    );
    this.inputRef.nativeElement.addEventListener(
      "strict:reject",
      this.handleStrictReject,
    );

    this.applyInputAttrs();

    if (this.disabled) {
      this.iti.setDisabled(this.disabled);
    }

    if (this.readonly) {
      this.iti.setReadonly(this.readonly);
    }

    // wait for utils to load before calling methods that require it (setNumber, etc.)
    this.iti.promise.then(() => {
      if (!this.iti?.isActive()) {
        return;
      }
      if (this.pendingWriteValue !== undefined) {
        this.iti.setNumber(this.pendingWriteValue);
        this.pendingWriteValue = undefined;
      } else if (this.initialValue) {
        this.iti.setNumber(this.initialValue);
      }
      // if an input event fired during the utils-loading gap, replay it now so the skipped emissions fire
      if (this.pendingUpdate) {
        this.pendingUpdate = false;
        this.handleInput();
      } else if (this.inputRef.nativeElement.value) {
        // input was populated via writeValue/initialValue — re-run validation now that utils is loaded
        this.onValidatorChange();
      }
    });
  }

  private buildInitOptions(): SomeOptions {
    const options: Partial<AllOptions> = {
      allowDropdown: this.allowDropdown,
      allowedNumberTypes: this.allowedNumberTypes,
      allowNumberExtensions: this.allowNumberExtensions,
      allowPhonewords: this.allowPhonewords,
      autoPlaceholder: this.autoPlaceholder,
      containerClass: this.containerClass,
      countryNameLocale: this.countryNameLocale,
      countryOrder: this.countryOrder,
      countrySearch: this.countrySearch,
      customPlaceholder: this.customPlaceholder,
      dropdownAlwaysOpen: this.dropdownAlwaysOpen,
      dropdownContainer: this.dropdownContainer,
      excludeCountries: this.excludeCountries,
      fixDropdownWidth: this.fixDropdownWidth,
      formatAsYouType: this.formatAsYouType,
      formatOnDisplay: this.formatOnDisplay,
      geoIpLookup: this.geoIpLookup,
      hiddenInput: this.hiddenInput,
      i18n: this.i18n,
      initialCountry: this.initialCountry,
      loadUtils: this.loadUtils,
      nationalMode: this.nationalMode,
      onlyCountries: this.onlyCountries,
      placeholderNumberType: this.placeholderNumberType,
      searchInputClass: this.searchInputClass,
      separateDialCode: this.separateDialCode,
      showFlags: this.showFlags,
      strictMode: this.strictMode,
      strictRejectAnimation: this.strictRejectAnimation,
      useFullscreenPopup: this.useFullscreenPopup,
    };

    return Object.fromEntries(
      Object.entries(options).filter(([, value]) => value !== undefined),
    ) as SomeOptions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["disabled"]) {
      this.iti?.setDisabled(this.disabled);
    }

    if (changes["readonly"]) {
      this.iti?.setReadonly(this.readonly);
    }

    if (changes["inputAttributes"]) {
      this.applyInputAttrs();
    }
  }

  handleInput() {
    if (!this.iti) {
      return;
    }
    // if utils has not loaded yet, getNumber/isValidNumber/etc. will throw. defer until the promise resolves.
    if (!intlTelInput.utils) {
      this.pendingUpdate = true;
      return;
    }

    const num = this.iti.getNumber() ?? "";
    const countryIso = this.iti.getSelectedCountryData()?.iso2 ?? "";

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

    const isValid =
      (this.usePreciseValidation
        ? this.iti.isValidNumberPrecise()
        : this.iti.isValidNumber()) ?? false;

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
  getInstance(): Iti | undefined {
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
    this.inputRef.nativeElement.removeEventListener(
      "open:countrydropdown",
      this.handleOpenDropdown,
    );
    this.inputRef.nativeElement.removeEventListener(
      "close:countrydropdown",
      this.handleCloseDropdown,
    );
    this.inputRef.nativeElement.removeEventListener(
      "strict:reject",
      this.handleStrictReject,
    );
    this.iti?.destroy();
  }

  private ignoredInputAttrs = new Set([
    "type",
    "value",
    "disabled",
    "readonly",
  ]);

  private applyInputAttrs(): void {
    const currentKeys = new Set<string>();
    Object.entries(this.inputAttributes).forEach(([key, value]) => {
      if (this.ignoredInputAttrs.has(key)) {
        warnInputAttr(key);
      } else {
        currentKeys.add(key);
        this.inputRef.nativeElement.setAttribute(key, value);
      }
    });
    this.appliedInputAttrKeys.forEach((key) => {
      if (!currentKeys.has(key)) {
        this.inputRef.nativeElement.removeAttribute(key);
      }
    });
    this.appliedInputAttrKeys = currentKeys;
    // Setting the `class` attribute above wipes the plugin-added `iti__tel-input` class;
    // re-add it so CSS selectors (e.g. the strictRejectAnimation shake) keep matching.
    if (this.iti) {
      this.inputRef.nativeElement.classList.add("iti__tel-input");
    }
  }

  // ============ ControlValueAccessor Implementation ============

  writeValue(value: string | null): void {
    const next = value || "";
    if (this.iti) {
      // wait for utils to load before calling setNumber
      this.iti.promise.then(() => {
        if (this.iti?.isActive()) {
          this.iti.setNumber(next);
        }
      });
    } else {
      // iti not yet created (writeValue called before ngAfterViewInit) - queue for later
      this.pendingWriteValue = next;
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
    // if utils has not loaded yet, getNumber/isValidNumber/etc. will throw. treat as valid until then;
    // the ngAfterViewInit promise handler calls onValidatorChange once utils is ready so forms will re-validate.
    if (!this.iti || !intlTelInput.utils || !this.iti.getNumber()) {
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
      invalidPhone: errorCode,
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
export default IntlTelInput;
