import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "../../../../angular/dist/IntlTelInput.js";

const getErrorMessage = (errorCode: number | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) {
    return genericError;
  }
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
          formControlName="phone"
          (blur)="enableValidation()"
          initialCountry="us"
          [loadUtils]="loadUtils"
          searchInputClass="form-control"
          [inputAttributes]="inputAttributes"
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
  showValidation = false;
  submitted = false;

  // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
  // eslint-disable-next-line class-methods-use-this
  loadUtils = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>("", [Validators.required]),
  });

  get phone() {
    return this.fg.get("phone");
  }

  get inputValidityClass(): string {
    if (!this.showValidation) {
      return "";
    }
    return this.phone?.valid ? "is-valid" : "is-invalid";
  }

  get invalidMsg(): string | null {
    if (!this.showValidation || !this.phone || this.phone.valid) {
      return null;
    }
    if (!this.phone.value) {
      return "Please enter a number";
    }
    return getErrorMessage(this.phone.errors?.["invalidPhone"] ?? null);
  }

  get validMsg(): string | null {
    const showValid =
      this.showValidation && this.phone?.valid && this.submitted;
    return showValid ? `Full number: ${this.phone.value}` : null;
  }

  get inputAttributes(): Record<string, unknown> {
    return {
      name: "phone",
      title: "Enter your phone number",
      class: `form-control ${this.inputValidityClass}`,
    };
  }

  enableValidation(): void {
    this.showValidation = true;
  }

  handleSubmit(): void {
    this.showValidation = true;
    this.submitted = true;
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
