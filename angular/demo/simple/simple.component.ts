import { Component } from '@angular/core';
import IntlTelInput from '../../src/intl-tel-input/angularWithUtils';

@Component({
  selector: "app-root",
  template: `
    <intl-tel-input
      initialCountry="us"
    />
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {}