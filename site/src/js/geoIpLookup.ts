import type { Iso2 } from "intl-tel-input";

export const geoIpLookup = async (): Promise<Iso2> => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};
