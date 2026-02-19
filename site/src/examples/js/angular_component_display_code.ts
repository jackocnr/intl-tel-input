import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IntlTelInputComponent } from "intl-tel-input/angular";
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
      <button 
        class="button" 
        type="submit" 
        [disabled]="!fg.valid"
        [style.opacity]="fg.valid ? '1' : '0.5'"
        [style.cursor]="fg.valid ? 'pointer' : 'not-allowed'"
      >
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
  imports: [IntlTelInputComponent, ReactiveFormsModule],
})
export class AppComponent {
  @ViewChild("telInput") telInput!: IntlTelInputComponent;

  initOptions = {
    initialCountry: "us",
    loadUtils: () => import("intl-tel-input/utils"),
  };

  fg: FormGroup = new FormGroup({
    phone: new FormControl<string>("", [Validators.required]),
  });

  notice: string | null = null;

  get phone() {
    return this.fg.get("phone");
  }

  handleSubmit(): void {
    if (this.fg.valid) {
      this.notice = `Valid number: ${this.telInput.getInstance()?.getNumber()}`;
    }
  }
}
