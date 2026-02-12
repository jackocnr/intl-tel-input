import { formatJsValue, isDefaultForKey } from "./stateUtils.js";

export function buildInitCodeFromState(state, { defaultInitOptions, optionMeta, defaultState, specialOptionKeys }) {
  const nonDefaultOptionEntries = [];

  Object.keys(defaultInitOptions).forEach((key) => {
    if (specialOptionKeys.includes(key)) return;
    const meta = optionMeta[key];
    if (!meta) return;
    const value = state[key];
    if (isDefaultForKey(key, meta, value, defaultState)) return;
    nonDefaultOptionEntries.push([key, value]);
  });

  const optionEntriesForCode = [...nonDefaultOptionEntries];
  if (state.loadUtils) {
    optionEntriesForCode.push(["loadUtils", "() => import(\"/intl-tel-input/js/utils.js\")"]);
  }

  if (state.customPlaceholder) {
    optionEntriesForCode.push([
      "customPlaceholder",
      "(exampleNumber) => exampleNumber ? `e.g. ${exampleNumber}` : 'Phone number'",
    ]);
  }

  if (state.dropdownContainer) {
    optionEntriesForCode.push([
      "dropdownContainer",
      "document.body",
    ]);
  }

  if (state.geoIpLookup) {
    optionEntriesForCode.push([
      "geoIpLookup",
      [
        "(success, failure) => {",
        "    fetch(\"https://ipapi.co/json\")",
        "      .then((res) => res.json())",
        "      .then((data) => success(data.country_code))",
        "      .catch(() => failure());",
        "  }",
      ].join("\n"),
    ]);
  }

  if (state.hiddenInput) {
    optionEntriesForCode.push([
      "hiddenInput",
      "() => ({ phone: \"phone_full\", country: \"country_code\" })",
    ]);
  }

  const i18nCode = String(state.i18n ?? "").trim();
  const hasI18n = Boolean(i18nCode);

  if (!hasI18n && optionEntriesForCode.length === 0) {
    return [
      "const input = document.querySelector(\"#phone\");",
      "const iti = window.intlTelInput(input);",
    ].join("\n");
  }

  const lines = [];

  if (hasI18n) {
    lines.push("(async () => {");
    lines.push("  const input = document.querySelector(\"#phone\");");
    lines.push(`  const i18n = (await import("/intl-tel-input/js/i18n/${encodeURIComponent(i18nCode)}/index.js")).default;`,
    );
    lines.push("  const iti = window.intlTelInput(input, {");
    lines.push("    i18n,");
  } else {
    lines.push("const input = document.querySelector(\"#phone\");");
    lines.push("const iti = window.intlTelInput(input, {");
  }

  optionEntriesForCode.forEach(([key, value]) => {
    const isRawJsSnippet =
      ["loadUtils", "customPlaceholder", "dropdownContainer", "geoIpLookup", "hiddenInput"].includes(key) &&
      typeof value === "string";
    const formatted = isRawJsSnippet ? value : formatJsValue(value);
    lines.push(`${hasI18n ? "    " : "  "}${key}: ${formatted},`);
  });

  lines.push(`${hasI18n ? "  " : ""}});`);

  if (hasI18n) {
    lines.push("})();");
  }

  return lines.join("\n");
}

export function renderInitCodeFromState(state, initCodeEl, { defaultInitOptions, optionMeta, defaultState, specialOptionKeys }) {
  if (!initCodeEl) return;
  initCodeEl.textContent = buildInitCodeFromState(state, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  });

  // Highlight.js highlights on page load, but we update this block live, so we need to re-run highlighting.
  // Highlight.js marks nodes as already-highlighted via `data-highlighted`, so clear that first.
  // Highlight.js is loaded after this script, so guard for it not being available yet.
  if (window.hljs && typeof window.hljs.highlightElement === "function") {
    delete initCodeEl.dataset.highlighted;
    window.hljs.highlightElement(initCodeEl);
  }
}
