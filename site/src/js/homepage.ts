const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  searchInputClass: "form-control",
  initialCountry: "auto",
  geoIpLookup: async () => {
    const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
    const data = await res.json();
    return data.country_code;
  },
  // @ts-expect-error - resolved at runtime from a separate URL
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
});

const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
if (toastEl && toastBody) {
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    let message: string;
    if (reason === "max-length") {
      message = "Maximum length reached for this country";
    } else if (source === "paste") {
      message = "Stripped invalid characters from pasted text";
    } else {
      message = `Character not allowed: "${rejectedInput}"`;
    }
    const link = document.createElement("a");
    link.href = "/docs/options#strictmode";
    link.className = "link-light";
    link.textContent = "strictMode";
    toastBody.replaceChildren(`${message} (see `, link, ")");
    toast.show();
  });
}
