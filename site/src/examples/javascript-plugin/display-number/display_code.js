import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");
intlTelInput(input, {
  separateDialCode: true,
  strictMode: true,
  strictRejectAnimation: true,
  loadUtils: () => import("intl-tel-input/utils"),
});
