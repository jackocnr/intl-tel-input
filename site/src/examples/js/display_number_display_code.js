import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");
intlTelInput(input, {
  loadUtils: () => import("intl-tel-input/utils"),
});
