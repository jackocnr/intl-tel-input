const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  searchInputClass: "form-control",
  initialCountry: "auto",
  geoIpLookup: (success, failure) => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  },
  // @ts-expect-error - resolved at runtime from a separate URL
  loadUtils: () => import("/intl-tel-input/js/utils.js"),
});
