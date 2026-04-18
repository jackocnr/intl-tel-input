import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "intl-tel-input/angular";
import "intl-tel-input/styles";

const getErrorMessage = (errorCode) => {
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { validationError } = intlTelInput.utils;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <intl-tel-input
        formControlName="phone"
        initialCountry="us"
        [loadUtils]="loadUtils"
      />
      <button type="submit">Submit</button>
      @if (invalidMsg) {
        <div class="invalid-feedback d-block">{{ invalidMsg }}</div>
      }
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent {
  showValidation = false;

  loadUtils = () => import("intl-tel-input/utils");

  fg = new FormGroup({
    phone: new FormControl("", [Validators.required]),
  });

  get phone() {
    return this.fg.get("phone");
  }

  get invalidMsg() {
    if (!this.showValidation || this.phone?.valid) return null;
    if (!this.phone?.value) return "Please enter a number";
    return getErrorMessage(this.phone.errors?.["invalidPhone"] ?? null);
  }

  handleSubmit() {
    this.showValidation = true;
  }
}
