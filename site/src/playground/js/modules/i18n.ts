const i18nDisplayNames = (() => {
  try {
    if (typeof Intl === "undefined" || !Intl.DisplayNames) {
      return null;
    }
    return new Intl.DisplayNames(["en"], { type: "language" });
  } catch {
    return null;
  }
})();

// English names for the language codes we ship i18n packs for. Used as a
// fallback when Intl.DisplayNames lacks data for a tag (Chrome on Android
// uses a reduced ICU build and returns the tag itself for several of these e.g. it returns "bs" instead of "Bosnian").
const FALLBACK_LANGUAGE_NAMES: Record<string, string> = {
  ar: "Arabic",
  bg: "Bulgarian",
  bn: "Bengali",
  bs: "Bosnian",
  ca: "Catalan",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  et: "Estonian",
  fa: "Persian",
  fi: "Finnish",
  fil: "Filipino",
  fr: "French",
  he: "Hebrew",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  is: "Icelandic",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  mk: "Macedonian",
  mr: "Marathi",
  ms: "Malay",
  nl: "Dutch",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovenian",
  sq: "Albanian",
  sr: "Serbian",
  sv: "Swedish",
  sw: "Swahili",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  zh: "Chinese",
  "zh-hk": "Chinese (Hong Kong)",
};

function toBcp47LanguageTag(code) {
  const raw = String(code || "").trim();
  if (!raw) {
    return "";
  }
  const parts = raw.split("-");
  if (parts.length === 1) {
    return parts[0].toLowerCase();
  }
  if (parts.length >= 2) {
    const [lang, region, ...rest] = parts;
    const normLang = String(lang).toLowerCase();
    const normRegion = region && region.length === 2 ? String(region).toUpperCase() : String(region || "");
    return [normLang, normRegion, ...rest].filter(Boolean).join("-");
  }
  return raw;
}

function resolveLanguageName(code) {
  const tag = toBcp47LanguageTag(code);
  if (!tag) {
    return "";
  }
  const label = i18nDisplayNames ? i18nDisplayNames.of(tag) : null;
  // Intl.DisplayNames returns the canonicalized tag itself when no data is
  // available — fall back to our bundled English name in that case.
  if (label && label.toLowerCase() !== tag.toLowerCase()) {
    return label;
  }
  return FALLBACK_LANGUAGE_NAMES[String(code).toLowerCase()] || "";
}

function getLanguageLabel(code) {
  const rawCode = String(code || "").trim();
  if (!rawCode) {
    return "";
  }
  const name = resolveLanguageName(code);
  return name ? `${name} (${rawCode})` : rawCode;
}

export function createI18nOptionLabels(languageCodes) {
  const labels = {};

  (languageCodes || []).forEach((code) => {
    labels[code] = getLanguageLabel(code);
  });

  return labels;
}

function getPlainLanguageLabel(code) {
  const rawCode = String(code || "").trim();
  if (!rawCode) {
    return "";
  }
  return resolveLanguageName(code) || rawCode;
}

export function createI18nDatalist(languageCodes) {
  return (languageCodes || [])
    .map((code) => ({
      value: code,
      label: getPlainLanguageLabel(code),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export async function resolveI18nSelection(value, { i18nDirHash }) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "object") {
    return value;
  }

  const code = String(value).trim();
  if (!code) {
    return null;
  }

  // English is the core library's built-in default language, so avoid loading an
  // additional i18n pack (and keep the generated init code simpler).
  if (code.toLowerCase() === "en") {
    return null;
  }

  try {
    const mod = await import(`/intl-tel-input/js/i18n/${code}.js?${i18nDirHash}`);
    return mod && mod.default ? mod.default : null;
  } catch {
    return null;
  }
}
