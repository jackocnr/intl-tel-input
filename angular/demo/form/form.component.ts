import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IntlTelInputComponent } from '../../src/intl-tel-input/angularWithUtils';

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <intl-tel-input
        #telInput
        formControlName="phone"
        name="phone"
        [initOptions]="{
          initialCountry: 'us',
        }"
      />
      <button class="button" type="submit" [disabled]="!fg.valid">
        Validate
      </button>
      <div class="notice">
        @if (phone?.errors?.["required"] && phone?.touched) {
          Phone number is required.
        } @else if (phone?.errors?.["invalidPhone"] && phone?.touched) {
          {{ phone?.errors?.["invalidPhone"].errorMessage }}
        } @else if (notice) {
          {{ notice }}
        }
      </div>
    </form>
  `,
  standalone: true,
  imports: [IntlTelInputComponent, ReactiveFormsModule]
})
export class AppComponent {
  @ViewChild('telInput') telInput!: IntlTelInputComponent;

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>('', [Validators.required]),
  });

  notice: string | null = null;

  get phone() {
    return this.fg.get('phone');
  }

  handleSubmit(): void {
    if (this.fg.valid) {
      this.notice = `Valid number: ${this.telInput.getInstance()?.getNumber()}`;
    }
  }
}