import { Component, ViewChild } from '@angular/core';
import IntlTelInput, { intlTelInput } from '../../src/IntlTelInputWithUtils';
import type { ValidationError } from "intl-tel-input";

const getErrorMessage = (errorCode: ValidationError | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { VALIDATION_ERROR } = intlTelInput;
  const errorMap: Record<string, string> = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: "Invalid number",
  };
  return errorMap[errorCode] || genericError;
};

@Component({
  selector: "app-root",
  template: `
    <div>
      <div class="d-flex align-items-start gap-2">
        <intl-tel-input
          #telInput
          (numberChange)="handleNumberChange($event)"
          (validityChange)="handleValidityChange($event)"
          (errorCodeChange)="handleErrorCodeChange($event)"
          initialCountry="us"
          [inputAttributes]="{ class: 'form-control' }"
          searchInputClass="form-control"
        />
        <button class="btn btn-primary" type="button" (click)="handleSetNumber()">
          Set Number
        </button>
        <button class="btn btn-primary" type="button" (click)="handleSubmit()">
          Validate
        </button>
      </div>
      @if (notice) {
        <div class="notice">{{ notice }}</div>
      }
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {
  @ViewChild('telInput') telInput!: IntlTelInput;

  isValid: boolean | null = null;
  number: string | null = null;
  errorCode: ValidationError | null = null;
  notice: string | null = null;

  handleNumberChange(value: string): void {
    this.number = value;
  }

  handleValidityChange(value: boolean): void {
    this.isValid = value;
  }

  handleErrorCodeChange(value: ValidationError | null): void {
    this.errorCode = value;
  }

  handleSetNumber(): void {
    const instance = this.telInput?.getInstance();
    if (instance) {
      instance.setNumber('+14155552671');
    }
  }

  handleSubmit(): void {
    if (this.isValid) {
      this.notice = `Valid number: ${this.number}`;
    } else {
      const errorMessage = getErrorMessage(this.errorCode);
      this.notice = `Error: ${errorMessage}`;
    }
  }
}