import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput, { intlTelInput } from "../../../../angular/dist/IntlTelInput.js";

const getErrorMessage = (errorCode: number | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) {
    return genericError;
  }
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
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()" class="row g-2" novalidate>
      <div class="col-auto demo-input-wrap position-relative">
        <div class="toast-container demo-toast-container">
          <div #toastRef class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
            <div class="d-flex">
              <div class="toast-body">{{ toastMessage }}</div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
        <intl-tel-input
          #iti
          formControlName="phone"
          (blur)="enableValidation()"
          initialCountry="auto"
          [separateDialCode]="true"
          [strictMode]="true"
          [strictRejectAnimation]="true"
          [geoIpLookup]="geoIpLookup"
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
export class AppComponent implements AfterViewInit {
  @ViewChild("iti") itiComponent!: IntlTelInput;
  @ViewChild("toastRef") toastRef!: { nativeElement: HTMLElement };

  showValidation = false;
  submitted = false;
  toastMessage = "";

  // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
  // eslint-disable-next-line class-methods-use-this
  loadUtils = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

  // eslint-disable-next-line class-methods-use-this
  geoIpLookup = (success: (iso2: string) => void, failure: () => void): void => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then((res) => res.json())
      .then((data) => success(data.country_code))
      .catch(() => failure());
  };

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

  ngAfterViewInit(): void {
    const input = this.itiComponent.getInput();
    const toastEl = this.toastRef.nativeElement;
    if (!input || !toastEl || !window.bootstrap?.Toast) {
      return;
    }
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
    input.addEventListener("strict:reject", (e) => {
      const { reason, rejectedInput, source } = (e as CustomEvent).detail;
      if (reason === "max-length") {
        this.toastMessage = "Maximum length reached for this country";
      } else if (source === "paste") {
        this.toastMessage = "Stripped invalid characters from pasted text";
      } else {
        this.toastMessage = `Character not allowed: "${rejectedInput}"`;
      }
      toast.show();
    });
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
