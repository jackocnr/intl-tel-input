import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component } from "@angular/core";
import IntlTelInput from "@intl-tel-input/angular";

@Component({
  selector: "#app",
  template: `
    <label for="phone" class="form-label">Phone number</label>
    <div class="demo-input-wrap">
      <intl-tel-input
        initialValue="+447733312345"
        [loadUtils]="loadUtils"
        searchInputClass="form-control"
        [inputAttributes]="inputAttributes"
      />
    </div>
  `,
  standalone: true,
  imports: [IntlTelInput],
})
export class AppComponent {
  // @ts-expect-error Vite/ESM dynamic import is using an EJS-templated URL string.
  // eslint-disable-next-line class-methods-use-this
  loadUtils = () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>");

  // eslint-disable-next-line class-methods-use-this
  get inputAttributes(): Record<string, unknown> {
    return {
      id: "phone",
      name: "phone",
      title: "Enter your phone number",
      class: "form-control",
    };
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
