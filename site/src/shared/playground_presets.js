// Single source of truth for the Playground presets shown on both the
// Homepage and the Playground page. Order matters — entries are rendered
// in this order.
export const playgroundPresets = [
  {
    label: "Chinese UI",
    href: "/playground?uiTranslations=zh&initialCountry=cn#uiTranslations",
  },
  {
    label: "No country selector",
    href: "/playground?keepDropdownOpen=false&countrySelectorMode=OFF#countrySelectorMode",
  },
  {
    label: "No flags",
    href: "/playground?showFlags=false#showFlags",
  },
  {
    label: "Fullscreen country selector",
    href: "/playground?countrySelectorMode=FULLSCREEN#countrySelectorMode",
  },
  {
    label: "Prioritise US & UK",
    href: "/playground?countryOrder=%5B%22us%22%2C%22gb%22%5D&initialCountry=us#countryOrder",
  },
  {
    label: "Only South American countries",
    href: "/playground?initialCountryLookup=false&onlyCountries=%5B%22ar%22%2C%22bo%22%2C%22br%22%2C%22cl%22%2C%22co%22%2C%22ec%22%2C%22gy%22%2C%22py%22%2C%22pe%22%2C%22sr%22%2C%22uy%22%2C%22ve%22%5D#onlyCountries",
  },
  {
    label: "National format",
    href: "/playground?numberDisplayFormat=NATIONAL&separateDialCode=false#numberDisplayFormat",
  },
  {
    label: "Localised country names",
    href: "/playground?initialCountryLookup=false&onlyCountries=%5B%22de%22%2C%22es%22%2C%22jp%22%2C%22cn%22%2C%22ru%22%2C%22gr%22%2C%22kr%22%2C%22eg%22%2C%22in%22%2C%22th%22%5D&countryNameOverrides=%7B%22de%22%3A%22Germany%20(Deutschland)%22%2C%22es%22%3A%22Spain%20(Espa%C3%B1a)%22%2C%22jp%22%3A%22Japan%20(%E6%97%A5%E6%9C%AC)%22%2C%22cn%22%3A%22China%20(%E4%B8%AD%E5%9B%BD)%22%2C%22ru%22%3A%22Russia%20(%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F)%22%2C%22gr%22%3A%22Greece%20(%CE%95%CE%BB%CE%BB%CE%AC%CE%B4%CE%B1)%22%2C%22kr%22%3A%22South%20Korea%20(%ED%95%9C%EA%B5%AD)%22%2C%22eg%22%3A%22Egypt%20(%D9%85%D8%B5%D8%B1)%22%2C%22in%22%3A%22India%20(%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4)%22%2C%22th%22%3A%22Thailand%20(%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)%22%7D#countryNameOverrides",
  },
];

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Anchor buttons for the homepage.
export function renderPlaygroundPresetsHomepage() {
  return playgroundPresets
    .map(
      ({ label, href }) =>
        `      <a class="btn btn-outline-primary btn-sm" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`,
    )
    .join("\n");
}

// <option> tags for the playground select.
export function renderPlaygroundPresetsPlayground() {
  return playgroundPresets
    .map(
      ({ label, href }) =>
        `            <option value="${escapeHtml(href)}">${escapeHtml(label)}</option>`,
    )
    .join("\n");
}
