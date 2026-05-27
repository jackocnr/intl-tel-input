import "zone.js";
import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";
import IntlTelInput, { type StrictRejectDetail } from "@intl-tel-input/angular";

@Component({
  selector: "#app",
  template: `
    <label for="phone" class="form-label">Phone number</label>
    <div class="demo-input-wrap position-relative">
      <div class="toast-container demo-toast-container">
        <div
          #toastRef
          class="toast text-bg-primary"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="4000"
        >
          <div class="d-flex">
            <div class="toast-body">@if (toastMessage) { {{ toastMessage }} (see <a href="/docs/options#strictmode" class="link-light">strictMode</a>) }</div>
            <button
              type="button"
              class="btn-close btn-close-white me-2"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <intl-tel-input
        (strictReject)="handleStrictReject($event)"
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
  @ViewChild("toastRef") toastRef!: { nativeElement: HTMLElement };

  toastMessage = "";

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

  handleStrictReject({ source, rejectedInput, reason }: StrictRejectDetail): void {
    const toastEl = this.toastRef.nativeElement;
    if (!toastEl) {
      return;
    }
    if (reason === "max-length") {
      this.toastMessage = "Maximum length reached for this country";
    } else if (source === "paste") {
      this.toastMessage = "Stripped invalid characters from pasted text";
    } else {
      this.toastMessage = `Character not allowed: "${rejectedInput}"`;
    }
    window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
  }
}

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
