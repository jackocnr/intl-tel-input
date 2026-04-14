import { Component } from '@angular/core';
import IntlTelInput from '../../src/IntlTelInputWithUtils';

@Component({
  selector: "app-root",
  template: `
    <div>
      <intl-tel-input
        [disabled]="isDisabled"
        [inputAttributes]="{ class: 'form-control' }"
        searchInputClass="form-control"
      />
      <button class="btn btn-primary" type="button" (click)="toggleDisabled()">Toggle</button>
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