const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: (success, failure) => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  },
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
if (toastEl && toastBody && window.bootstrap?.Toast) {
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    if (reason === "max-length") {
      toastBody.textContent = "Maximum length reached for this country";
    } else if (source === "paste") {
      toastBody.textContent = "Stripped invalid characters from pasted text";
    } else {
      toastBody.textContent = `Character not allowed: "${rejectedInput}"`;
    }
    toast.show();
  });
}
