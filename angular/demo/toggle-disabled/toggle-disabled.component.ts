import { Component } from '@angular/core';
import IntlTelInput from '../../src/intl-tel-input/angularWithUtils';

@Component({
  selector: "app-root",
  template: `
    <div>
      <intl-tel-input
        [disabled]="isDisabled"
      />
      <button class="button" type="button" (click)="toggleDisabled()">Toggle</button>
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput]
})
export class AppComponent {
  isDisabled: boolean = false;

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}