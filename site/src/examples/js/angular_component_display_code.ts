import { Component } from "@angular/core";
import {
  IntlTelInputComponent,
  PHONE_ERROR_MESSAGES,
} from "intl-tel-input/angular";

@Component({
  selector: "app-root",
  template: `
    <form (submit)="handleSubmit($event)">
      <intl-tel-input
        (numberChange)="handleNumberChange($event)"
        (validityChange)="handleValidityChange($event)"
        (errorCodeChange)="handleErrorCodeChange($event)"
        [initOptions]="initOptions"
      />
      <span>&nbsp;</span>
      <button class="button" type="submit">Validate</button>
      @if (notice) {
        <div class="notice">{{ notice }}</div>
      }
    </form>
  `,
  standalone: true,
  imports: [IntlTelInputComponent],
})
export class AppComponent {
  initOptions = {
    initialCountry: "us",
    loadUtils: () => import("intl-tel-input/utils"),
  };

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

  handleSubmit(event?: SubmitEvent): void {
    event?.preventDefault();
    if (this.isValid) {
      this.notice = `Valid number: ${this.number}`;
    } else {
      const errorMessage = PHONE_ERROR_MESSAGES[this.errorCode || 0];
      this.notice = `Error: ${errorMessage}`;
    }
  }
}
