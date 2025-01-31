import { Component } from '@angular/core';
import { IntlTelInputComponent } from '../../src/intl-tel-input/angularWithUtils.component';

@Component({
  selector: "app-root",
  template: `
    <form>
      <intl-tel-input
        [disabled]="isDisabled"
      />
      <button class="button" type="button" (click)="toggleDisabled()">Toggle</button>
    </form>
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