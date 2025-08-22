import { Component } from '@angular/core';
import { IntlTelInputComponent } from '../../src/intl-tel-input/angularWithUtils';

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
  imports: [IntlTelInputComponent]
})
export class AppComponent {
  isDisabled: boolean = false;

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}