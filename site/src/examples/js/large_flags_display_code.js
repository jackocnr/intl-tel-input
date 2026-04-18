import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");
intlTelInput(input, {
  initialCountry: "us",
  loadUtils: () => import("intl-tel-input/utils"),
});
