const i18nDisplayNames = (() => {
  try {
    if (typeof Intl === "undefined" || !Intl.DisplayNames) return null;
    return new Intl.DisplayNames(["en"], { type: "language" });
  } catch {
    return null;
  }
})();

function toBcp47LanguageTag(code) {
  const raw = String(code || "").trim();
  if (!raw) return "";
  const parts = raw.split("-");
  if (parts.length === 1) return parts[0].toLowerCase();
  if (parts.length >= 2) {
    const [lang, region, ...rest] = parts;
    const normLang = String(lang).toLowerCase();
    const normRegion = region && region.length === 2 ? String(region).toUpperCase() : String(region || "");
    return [normLang, normRegion, ...rest].filter(Boolean).join("-");
  }
  return raw;
}

function getLanguageLabel(code) {
  const rawCode = String(code || "").trim();
  if (!rawCode) return "";
  const tag = toBcp47LanguageTag(code);
  if (!tag) return rawCode;
  const label = i18nDisplayNames ? i18nDisplayNames.of(tag) : null;
  return label ? `${label} (${rawCode})` : rawCode;
}

export function createI18nOptionLabels(languageCodes) {
  const labels = {
    "": "None (default)",
  };

  (languageCodes || []).forEach((code) => {
    labels[code] = getLanguageLabel(code);
  });

  return labels;
}

export async function resolveI18nSelection(value, { i18nDirHash }) {
  if (value === null || value === undefined) return null;

  if (typeof value === "object") return value;

  const code = String(value).trim();
  if (!code) return null;

  try {
    const mod = await import(`/intl-tel-input/js/i18n/${code}/index.js?${i18nDirHash}`);
    return mod && mod.default ? mod.default : null;
  } catch {
    return null;
  }
}
