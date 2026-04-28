import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import IntlTelInput from "../../src/IntlTelInputWithUtils";

@Component({
  selector: "app-root",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <div class="d-flex align-items-start gap-2">
        <intl-tel-input
          #telInput
          formControlName="phone"
          name="phone"
          initialCountry="us"
          [inputAttributes]="{ class: 'form-control' }"
          searchInputClass="form-control"
        />
        <button class="btn btn-primary" type="submit" [disabled]="!fg.valid">
          Validate
        </button>
      </div>
      <div class="notice">
        @if (phone?.errors?.["required"] && phone?.touched) {
          Phone number is required.
        } @else if (phone?.errors?.["invalidPhone"] && phone?.touched) {
          {{ phone?.errors?.["invalidPhone"].errorMessage }}
        } @else if (isSubmitted && fg.valid) {
          Valid number: {{ telInput.getInstance()?.getNumber() }}
        }
      </div>
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  @ViewChild("telInput") telInput!: IntlTelInput;

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>("", [Validators.required]),
  });

  isSubmitted = false;

  get phone() {
    return this.fg.get("phone");
  }

  ngOnInit(): void {
    this.phone?.valueChanges.subscribe(() => {
      this.isSubmitted = false;
    });
  }

  handleSubmit(): void {
    this.phone?.markAsTouched();
    if (this.fg.valid) {
      this.isSubmitted = true;
    }
  }
}
