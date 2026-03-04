/**
 * Cloudflare Workers middleware to inject a script tag with the user's geographical information (window.__IS_EUROPE)
 */

const EUROPE = new Set([
  // EU members
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR",
  "DE","GR","HU","IE","IT","LV","LT","LU","MT","NL",
  "PL","PT","RO","SK","SI","ES","SE",
  // EEA + other European countries
  "GB","NO","IS","LI","CH","AL","AD","BA","BY","GE",
  "MD","ME","MK","MC","RS","SM","TR","UA","VA",
]);

class GeoInjector {
  constructor(isEurope) {
    this.isEurope = isEurope;
  }

  element(element) {
    element.prepend(
      `<script>window.__IS_EUROPE=${this.isEurope};</script>`,
      { html: true },
    );
  }
}

export async function onRequest(context) {
  const country = context.request.cf?.country || "";
  const isEurope = EUROPE.has(country);
  const response = await context.next();

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  // eslint-disable-next-line no-undef
  return new HTMLRewriter()
    .on("head", new GeoInjector(isEurope))
    .transform(response);
}