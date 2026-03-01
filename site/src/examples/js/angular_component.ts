import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IntlTelInputComponent } from "../../../build/intl-tel-input/angular/IntlTelInput.js";
import type { IntlTelInputComponent as IntlTelInputComponentType } from "../../../build/intl-tel-input/angular/types/intl-tel-input/angular";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

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
          (errorCodeChange)="errorCode = $event ?? 0"
          (blur)="enableValidation()"
          [initOptions]="initOptions"
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
  imports: [IntlTelInputComponent, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("telInput") telInput?: IntlTelInputComponentType;

  number = "";
  isValid = false;
  errorCode = 0;
  showValidation = false;
  submitted = false;

  initOptions = {
    initialCountry: "us",
    // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
    loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
    searchInputClass: "form-control",
  };

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>(""),
  });

  get inputValidityClass(): string {
    if (!this.showValidation) return "";
    return this.number && this.isValid ? "is-valid" : "is-invalid";
  }

  get invalidMsg(): string | null {
    if (!this.showValidation || this.isValid) return null;
    return this.number
      ? errorMap[this.errorCode || 0] || "Invalid number"
      : "Please enter a number";
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
