import { Component, ViewChild } from '@angular/core';
import { IntlTelInputComponent, PHONE_ERROR_MESSAGES } from '../../src/intl-tel-input/angularWithUtils';

@Component({
  selector: "app-root",
  template: `
    <div>
      <intl-tel-input
        #telInput
        (numberChange)="handleNumberChange($event)"
        (validityChange)="handleValidityChange($event)"
        (errorCodeChange)="handleErrorCodeChange($event)"
        [initOptions]="{
          initialCountry: 'us',
        }"
      />
      <button class="button" type="button" (click)="handleSetNumber()">
        Set Number
      </button>
      <button class="button" type="button" (click)="handleSubmit()">
        Validate
      </button>
      @if (notice) {
        <div class="notice">{{ notice }}</div>
      }
    </div>
  `,
  standalone: true,
  imports: [IntlTelInputComponent]
})
export class AppComponent {
  @ViewChild('telInput') telInput!: IntlTelInputComponent;

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
      const errorMessage = PHONE_ERROR_MESSAGES[this.errorCode || 0] || "Invalid number";
      this.notice = `Error: ${errorMessage}`;
    }
  }
}