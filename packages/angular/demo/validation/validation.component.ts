import { Component } from '@angular/core';
import IntlTelInput, { intlTelInput } from '../../src/IntlTelInputWithUtils';

const getErrorMessage = (errorCode: number | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { validationError } = intlTelInput.utils!;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

@Component({
  selector: "app-root",
  template: `
    <div>
      <intl-tel-input
        (numberChange)="handleNumberChange($event)"
        (validityChange)="handleValidityChange($event)"
        (errorCodeChange)="handleErrorCodeChange($event)"
        initialCountry="us"
        [inputAttributes]="{ class: 'form-control' }"
        searchInputClass="form-control"
      />
      <button class="btn btn-primary" type="button" (click)="handleSubmit()">
        Validate
      </button>
      @if (notice) {
        <div class="notice">{{ notice }}</div>
      }
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {
  isValid: boolean | null = null;
  number: string | null = null;
  errorCode: number | null = null;
  notice: string | null = null;

  handleNumberChange(value: string): void {
    this.number = value;
  }

  handleValidityChange(value: boolean): void {
    this.isValid = value;
  }

  handleErrorCodeChange(value: number | null): void {
    this.errorCode = value;
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