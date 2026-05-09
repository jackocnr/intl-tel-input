import { Component, ViewChild } from '@angular/core';
import IntlTelInput from '../../src/IntlTelInputWithUtils';

@Component({
  selector: "app-root",
  template: `
    <div>
      <div class="d-flex align-items-start gap-2">
        <intl-tel-input
          #telInput
          (countryChange)="handleCountryChange($event)"
          initialCountry="us"
          [inputAttributes]="{ class: 'form-control' }"
          searchInputClass="form-control"
        />
        <button class="btn btn-primary" type="button" (click)="handleSetCountry()">
          Set Country to GB
        </button>
      </div>
      <p>Current country (per parent state): {{ country }}</p>
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {
  @ViewChild('telInput') telInput!: IntlTelInput;

  country: string = "us";

  handleCountryChange(value: string): void {
    this.country = value;
  }

  handleSetCountry(): void {
    this.telInput?.getInstance()?.setCountry('gb');
  }
}
