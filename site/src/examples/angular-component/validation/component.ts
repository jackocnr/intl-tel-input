import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import IntlTelInput, { type StrictRejectDetail } from "@intl-tel-input/angular";
import { getErrorMessage } from "../../../js/getErrorMessage";
import { initialCountryLookup } from "../../../js/initialCountryLookup";

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()" novalidate>
      <label for="phone" class="form-label">Phone number</label>
      <div class="d-flex gap-2">
        <div class="demo-input-wrap position-relative">
          <div class="toast-container demo-toast-container">
            <div
              #toastRef
              class="toast text-bg-primary"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-bs-delay="4000"
            >
              <div class="d-flex">
                <div class="toast-body">@if (toastMessage) { {{ toastMessage }} (see <a href="/docs/options#strictmode" class="link-light">strictMode</a>) }</div>
                <button
                  type="button"
                  class="btn-close btn-close-white me-2"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
          <intl-tel-input
            formControlName="phone"
            (blur)="enableValidation()"
            (strictReject)="handleStrictReject($event)"
            [initialCountryLookup]="initialCountryLookup"
            [loadUtils]="loadUtils"
            searchInputClass="form-control"
            [inputAttributes]="inputAttributes"
          />
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
      @if (invalidMsg) {
        <div class="invalid-feedback d-block">{{ invalidMsg }}</div>
      }
      @if (validMsg) {
        <div class="valid-feedback d-block">{{ validMsg }}</div>
      }
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("toastRef") toastRef!: { nativeElement: HTMLElement };

  showValidation = false;
  submitted = false;
  toastMessage = "";

  // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
  // eslint-disable-next-line class-methods-use-this
  loadUtils = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

  initialCountryLookup = initialCountryLookup;

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
    const errorCode = this.phone.errors?.["invalidPhone"] ?? null;
    return getErrorMessage(this.phone.value, errorCode);
  }

  get validMsg(): string | null {
    const showValid =
      this.showValidation && this.phone?.valid && this.submitted;
    return showValid ? `Full number: ${this.phone.value}` : null;
  }

  get inputAttributes(): Record<string, unknown> {
    return {
      id: "phone",
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

  handleStrictReject({ source, rejectedInput, reason }: StrictRejectDetail): void {
    const toastEl = this.toastRef.nativeElement;
    if (!toastEl) {
      return;
    }
    if (reason === "max-length") {
      this.toastMessage = "Maximum length reached for this country";
    } else if (source === "paste") {
      this.toastMessage = "Stripped invalid characters from pasted text";
    } else {
      this.toastMessage = `Character not allowed: "${rejectedInput}"`;
    }
    window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
  }
}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
