import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "../../../build/intl-tel-input/angular/IntlTelInput.js";

const getErrorMessage = (number: string | null, errorCode: number | null): string => {
  if (!number) return "Please enter a number";
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { validationError } = intlTelInput.utils!;
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
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()" class="row g-2" novalidate>
      <div class="col-auto">
        <intl-tel-input
          #telInput
          formControlName="phone"
          (numberChange)="handleNumberChange($event)"
          (validityChange)="isValid = $event"
          (errorCodeChange)="errorCode = $event"
          (blur)="enableValidation()"
          initialCountry="us"
          [loadUtils]="loadUtils"
          searchInputClass="form-control"
          [inputProps]="inputProps"
        />
        @if (invalidMsg) {
          <div class="invalid-feedback d-block">{{ invalidMsg }}</div>
        }
        @if (validMsg) {
          <div class="valid-feedback d-block">{{ validMsg }}</div>
        }
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("telInput") telInput?: InstanceType<typeof IntlTelInput>;

  number = "";
  isValid = false;
  errorCode = 0;
  showValidation = false;
  submitted = false;

  // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
  // eslint-disable-next-line class-methods-use-this
  loadUtils = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>(""),
  });

  get inputValidityClass(): string {
    if (!this.showValidation) return "";
    return this.number && this.isValid ? "is-valid" : "is-invalid";
  }

  get invalidMsg(): string | null {
    if (!this.showValidation || this.isValid) return null;
    return getErrorMessage(this.number, this.errorCode);
  }

  get validMsg(): string | null {
    const showValid =
      this.showValidation && this.number && this.isValid && this.submitted;
    return showValid ? `Full number: ${this.number}` : null;
  }

  get inputProps(): Record<string, unknown> {
    return {
      name: "phone",
      title: "Enter your phone number",
      required: true,
      class: `form-control ${this.inputValidityClass}`,
    };
  }

  enableValidation(): void {
    this.showValidation = true;
  }

  handleNumberChange(newNumber: string): void {
    this.submitted = false;
    this.number = newNumber;
  }

  handleSubmit(): void {
    this.showValidation = true;
    this.submitted = true;
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
