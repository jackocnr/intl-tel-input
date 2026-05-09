import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IntlTelInput from '../../src/IntlTelInputWithUtils';

@Component({
  selector: "app-root",
  template: `
    <div>
      <div class="d-flex align-items-start gap-2">
        <intl-tel-input
          [(ngModel)]="value"
          initialCountry="us"
          [inputAttributes]="{ class: 'form-control' }"
          searchInputClass="form-control"
        />
        <button class="btn btn-primary" type="button" (click)="populate()">
          Populate Number
        </button>
        <button class="btn btn-secondary" type="button" (click)="reset()">
          Reset Number
        </button>
      </div>
      <p>Current bound value: {{ value || "(empty)" }}</p>
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput, FormsModule]
})
export class AppComponent {
  value: string = "";

  populate(): void {
    this.value = "+14155552671";
  }

  reset(): void {
    this.value = "";
  }
}
