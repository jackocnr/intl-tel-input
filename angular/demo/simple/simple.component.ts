import { Component } from '@angular/core';
import { IntlTelInputComponent } from '../../src/intl-tel-input/angularWithUtils';

@Component({
  selector: "app-root",
  template: `
    <intl-tel-input
      [initOptions]="{
        initialCountry: 'us',
      }"
    />
  `,
  standalone: true,
  imports: [IntlTelInputComponent]
})
export class AppComponent {}