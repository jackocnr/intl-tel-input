import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import IntlTelInput from "intl-tel-input/angular";
import "intl-tel-input/styles";

@Component({
  selector: "#app",
  template: `
    <form [formGroup]="fg" (ngSubmit)="handleSubmit()">
      <intl-tel-input
        #telInput
        formControlName="phone"
        name="phone"
        [initOptions]="initOptions"
      />
      <button type="submit">Validate</button>
      <div class="notice">{{ noticeText }}</div>
    </form>
  `,
  standalone: true,
  imports: [IntlTelInput, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("telInput") telInput;
  hasValidated = false;

  initOptions = {
    initialCountry: "us",
    loadUtils: () => import("intl-tel-input/utils"),
  };

  fg = new FormGroup({
    phone: new FormControl<string>("", [Validators.required]),
  });

  get phone() {
    return this.fg.get("phone");
  }

  get noticeText() {
    // Determine the notice message based on the current state
  }

  handleSubmit() {
    this.phone?.markAsTouched();
    this.hasValidated = true;
  }
}
