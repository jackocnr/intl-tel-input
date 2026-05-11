import type { Iso2 } from "intl-tel-input";

const STORAGE_KEY = "iti-geoip-country";

export const geoIpLookup = async (): Promise<Iso2> => {
  const cached = sessionStorage.getItem(STORAGE_KEY) as Iso2 | null;
  if (cached) {
    return cached;
  }

  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  const country = data.country_code as Iso2;
  if (country) {
    sessionStorage.setItem(STORAGE_KEY, country);
  }
  return country;
};
