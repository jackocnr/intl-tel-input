import { formatJsValue, isDefaultForKey } from "./stateUtils";

// This module is responsible for generating the initialization code snippet based on the current state of the playground.
export function renderInitCodeFromState(
  state: Record<string, any>,
  initCodeEl: HTMLElement | null,
  { defaultInitOptions, optionMeta, defaultState, specialOptionKeys }: { defaultInitOptions: Record<string, any>; optionMeta: Record<string, any>; defaultState: Record<string, any>; specialOptionKeys: string[] },
) {
  if (!initCodeEl) {
    return;
  }

  const nonDefaultOptionEntries: [string, any][] = [];

  Object.keys(defaultInitOptions).forEach((key) => {
    if (specialOptionKeys.includes(key)) {
      return;
    }
    const meta = optionMeta[key];
    if (!meta) {
      return;
    }
    const value = state[key];
    if (isDefaultForKey(key, meta, value, defaultState)) {
      return;
    }
    nonDefaultOptionEntries.push([key, value]);
  });

  const optionEntriesForCode = [...nonDefaultOptionEntries];
  if (state.loadUtils) {
    optionEntriesForCode.push(["loadUtils", "() => import(\"intl-tel-input/utils\")"]);
  }

  if (state.customPlaceholder) {
    optionEntriesForCode.push([
      "customPlaceholder",
      [
        "(exampleNumber) => exampleNumber",
        "    ? exampleNumber.replace(/\\d/g, 'X')",
        "    : 'Enter number'",
      ].join("\n"),
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
      "() => ({ phone: \"phone_full\", country: \"country_iso2\" })",
    ]);
  }

  const i18nCode = String(state.i18n ?? "").trim();
  const hasI18n = Boolean(i18nCode) && i18nCode.toLowerCase() !== "en";

  const lines: string[] = [];
  lines.push("import intlTelInput from \"intl-tel-input\";");

  let i18nExportName = "";
  if (hasI18n) {
    i18nExportName = i18nCode.replace(/-([a-z])/g, (_, chr) => chr.toUpperCase());
    lines.push(`import { ${i18nExportName} } from "intl-tel-input/i18n";`);
  }

  lines.push("");
  lines.push("const input = document.querySelector(\"#phone\");");

  if (!hasI18n && optionEntriesForCode.length === 0) {
    lines.push("const iti = intlTelInput(input);");
  } else {
    lines.push("const iti = intlTelInput(input, {");

    if (hasI18n) {
      lines.push(`  i18n: ${i18nExportName},`);
    }

    optionEntriesForCode.forEach(([key, value]) => {
      const isRawJsSnippet =
        ["loadUtils", "customPlaceholder", "dropdownContainer", "geoIpLookup", "hiddenInput"].includes(key) &&
        typeof value === "string";
      const formatted = isRawJsSnippet ? value : formatJsValue(value);
      lines.push(`  ${key}: ${formatted},`);
    });

    lines.push("});");
  }

  const output = lines.join("\n");

  initCodeEl.textContent = output;

  // Highlight.js highlights on page load, but we update this block live, so we need to re-run highlighting.
  // Highlight.js marks nodes as already-highlighted via `data-highlighted`, so clear that first.
  // Highlight.js is loaded after this script, so guard for it not being available yet.
  if (window.hljs && typeof window.hljs.highlightElement === "function") {
    delete initCodeEl.dataset.highlighted;
    window.hljs.highlightElement(initCodeEl);
  }
}
