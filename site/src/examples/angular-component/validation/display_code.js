import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput from "@intl-tel-input/angular";
import "intl-tel-input/styles";

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <label for="phone">Phone number</label>
      <intl-tel-input
        formControlName="phone"
        [inputAttributes]="{ id: 'phone' }"
        initialCountry="auto"
        [geoIpLookup]="geoIpLookup"
        [loadUtils]="loadUtils"
      />
      <button type="submit">Submit</button>
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
  showValidation = false;
  submitted = false;

  loadUtils = () => import("intl-tel-input/utils");

  geoIpLookup = async () => {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code;
  };

  fg = new FormGroup({
    phone: new FormControl("", [Validators.required]),
  });

  get phone() {
    return this.fg.get("phone");
  }

  get invalidMsg() {
    if (!this.showValidation || this.phone?.valid) return null;
    if (!this.phone?.value) return "Please enter a number";
    return yourCodeToDeriveErrorMessage(this.phone.errors?.["invalidPhone"] ?? null);
  }

  get validMsg() {
    const showValid =
      this.showValidation && this.phone?.valid && this.submitted;
    return showValid ? `Full number: ${this.phone.value}` : null;
  }

  handleSubmit() {
    this.showValidation = true;
    this.submitted = true;
  }
}
