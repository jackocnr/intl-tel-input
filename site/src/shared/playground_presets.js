// Single source of truth for the Playground presets shown on both the
// Homepage and the Playground page. Order matters — entries are rendered
// in this order.
export const playgroundPresets = [
  {
    label: "Chinese UI",
    href: "/playground?countryNameLocale=zh&i18n=zh&initialCountry=cn#translation-options",
  },
  {
    label: "No dropdown",
    href: "/playground?keepDropdownOpen=false&allowDropdown=false&initialCountry=us#user-interface-options",
  },
  {
    label: "No flags",
    href: "/playground?showFlags=false&initialCountry=us#user-interface-options",
  },
  {
    label: "Prioritise US & UK",
    href: "/playground?countryOrder=%5B%22us%22%2C%22gb%22%5D&initialCountry=us#country-options",
  },
  {
    label: "Only European countries",
    href: "/playground?initialCountry=fr&onlyCountries=%5B%22al%22%2C%22ad%22%2C%22at%22%2C%22by%22%2C%22be%22%2C%22ba%22%2C%22bg%22%2C%22hr%22%2C%22cz%22%2C%22dk%22%2C%22ee%22%2C%22fo%22%2C%22fi%22%2C%22fr%22%2C%22de%22%2C%22gi%22%2C%22gr%22%2C%22va%22%2C%22hu%22%2C%22is%22%2C%22ie%22%2C%22it%22%2C%22lv%22%2C%22li%22%2C%22lt%22%2C%22lu%22%2C%22mk%22%2C%22mt%22%2C%22md%22%2C%22mc%22%2C%22me%22%2C%22nl%22%2C%22no%22%2C%22pl%22%2C%22pt%22%2C%22ro%22%2C%22ru%22%2C%22sm%22%2C%22rs%22%2C%22sk%22%2C%22si%22%2C%22es%22%2C%22se%22%2C%22ch%22%2C%22ua%22%2C%22gb%22%5D#country-options",
  },
  {
    label: "National format",
    href: "/playground?nationalMode=true&separateDialCode=false&initialCountry=gb#formatting-options",
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
