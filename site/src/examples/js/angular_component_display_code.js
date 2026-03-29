import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "intl-tel-input/angular";
import "intl-tel-input/styles";

const getErrorMessage = (number, errorCode) => {
  if (!number) return "Please enter a number";
  const genericError = "Invalid number";
  const { validationError } = intlTelInput.utils;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid country code",
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
        #telInput
        formControlName="phone"
        (numberChange)="number = $event"
        (validityChange)="isValid = $event"
        (errorCodeChange)="errorCode = $event"
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
  @ViewChild("telInput") telInput;

  number = "";
  isValid = false;
  errorCode = 0;
  showValidation = false;

  loadUtils = () => import("intl-tel-input/utils");

  fg = new FormGroup({
    phone: new FormControl(""),
  });

  get invalidMsg() {
    if (!this.showValidation || this.isValid) return null;
    return getErrorMessage(this.number, this.errorCode);
  }

  handleSubmit() {
    this.showValidation = true;
  }
}
