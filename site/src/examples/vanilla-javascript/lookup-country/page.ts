const input = document.querySelector<HTMLInputElement>("#phone")!;

const geoIpLookup = async () => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};

window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
if (toastEl && toastBody) {
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
