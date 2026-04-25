import { Component } from "@angular/core";
import IntlTelInput from "intl-tel-input/angular";
import "intl-tel-input/styles";

@Component({
  selector: "#app",
  template: `
    <label for="phone">Phone number</label>
    <intl-tel-input
      initialValue="+447733312345"
      [inputAttributes]="{ id: 'phone' }"
      [loadUtils]="loadUtils"
    />
  `,
  standalone: true,
  imports: [IntlTelInput],
})
export class AppComponent {
  loadUtils = () => import("intl-tel-input/utils");
}
