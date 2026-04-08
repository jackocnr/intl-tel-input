const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  initialCountry: "us",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});
