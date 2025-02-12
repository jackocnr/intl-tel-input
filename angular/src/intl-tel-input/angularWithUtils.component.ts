//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import intlTelInput from "./intlTelInputWithUtils";
//* Keep the TS imports separate, as the above line gets substituted in the angularWithUtils build process.
import { Iti, SomeOptions } from "../intl-tel-input";
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";

export { intlTelInput };

@Component({
  selector: "intl-tel-input",
  standalone: true,
  template: `
    <input
      type="tel"
      #inputRef
      (input)="update()"
      [value]="initialValue"
      [disabled]="disabled"
    />
  `,
})
export class IntlTelInputComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    if (this.inputRef.nativeElement) {
      this.iti = intlTelInput(this.inputRef.nativeElement, this.initOptions);
    }
    for (const key in this.inputProps) {
      if (this.inputProps.hasOwnProperty(key)) {
        this.inputRef.nativeElement.setAttribute(key, this.inputProps[key]);
      }
    }
  }

  update() {
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
  }

  getInstance(): Iti | null {
    return this.iti;
  }

  getInput(): HTMLInputElement | null {
    return this.inputRef?.nativeElement;
  }

  ngOnDestroy() {
    this.iti?.destroy();
  }
}