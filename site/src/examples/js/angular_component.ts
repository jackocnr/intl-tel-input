import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput from "../../../build/intl-tel-input/angular/IntlTelInput.js";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

// @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
const loadUtilsFn = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()" class="row g-2">
      <div class="col-auto">
        <intl-tel-input
          #telInput
          formControlName="phone"
          name="phone"
          initialCountry="us"
          [loadUtils]="loadUtils"
          searchInputClass="form-control"
          [inputProps]="{ class: 'form-control', title: 'Enter your phone number' }"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" type="submit">Validate</button>
      </div>
      <div class="notice">{{ noticeText }}</div>
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("telInput") telInput?: InstanceType<typeof IntlTelInput>;
  private hasValidated = false;

  loadUtils = loadUtilsFn;

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>("", [Validators.required]),
  });

  get phone() {
    return this.fg.get("phone");
  }

  get noticeText(): string | null {
    const phone = this.phone;
    if (!phone?.touched) return null;

    if (phone.errors?.["required"]) {
      return "Please enter a number";
    }
    if (phone.errors?.["invalidPhone"]) {
      const errorCode = phone.errors["invalidPhone"].errorCode;
      const errorMessage = errorMap[errorCode || 0] || "Invalid number";
      return `Error: ${errorMessage}`;
    }

    if (!this.hasValidated || !this.fg.valid) {
      return null;
    }

    const number = this.telInput?.getInstance?.()?.getNumber();
    return number ? `Valid number: ${number}` : null;
  }

  handleSubmit(): void {
    this.phone?.markAsTouched();
    this.hasValidated = true;
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
