import { Component } from '@angular/core';
import IntlTelInput from '../../src/IntlTelInputWithUtils';

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