import { Component } from '@angular/core';
import IntlTelInput from '../../src/IntlTelInputWithUtils';

@Component({
  selector: "app-root",
  template: `
    <intl-tel-input
      initialCountry="us"
      [inputAttributes]="{ class: 'form-control' }"
      searchInputClass="form-control"
    />
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {}