import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput from "intl-tel-input/angular";
import "intl-tel-input/styles";

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <intl-tel-input
        formControlName="phone"
        initialCountry="auto"
        [separateDialCode]="true"
        [strictMode]="true"
        [geoIpLookup]="geoIpLookup"
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

  geoIpLookup = (success, failure) => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
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

  handleSubmit() {
    this.showValidation = true;
  }
}
