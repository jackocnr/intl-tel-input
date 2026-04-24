import { formatJsValue, isDefaultForKey } from "./stateUtils";

export type Integration = "vanilla" | "react" | "vue" | "angular" | "svelte";

export const INTEGRATIONS: Integration[] = [
  "vanilla",
  "react",
  "vue",
  "angular",
  "svelte",
];

const HLJS_LANGUAGE: Record<Integration, string> = {
  vanilla: "javascript",
  react: "javascript",
  vue: "html",
  angular: "javascript",
  svelte: "html",
};

// geoIpLookup and customPlaceholder both get hoisted to a top-level const (or Angular class field)
// in every integration, so we store them at zero indentation and let each renderer embed them uniformly.
const GEO_IP_LOOKUP_BODY = [
  "(success, failure) => {",
  '  fetch("https://ipapi.co/json")',
  "    .then((res) => res.json())",
  "    .then((data) => success(data.country_code))",
  "    .catch(() => failure());",
  "}",
].join("\n");

const CUSTOM_PLACEHOLDER_BODY = [
  "(exampleNumber) => exampleNumber",
  "  ? exampleNumber.replace(/\\d/g, 'X')",
  "  : 'Enter number'",
].join("\n");

type OptionEntry = {
  key: string;
  value: any;
  // When true, value is a literal JS source string (function/expression) and must NOT be JSON.stringified.
  raw: boolean;
};

type SnippetModel = {
  options: OptionEntry[];
  i18n: { code: string; importName: string } | null;
  initialValue: string;
  placeholder: string;
  // Non-null when enabled — renderers hoist these to top-level consts (or Angular class fields).
  geoIpLookup: string | null;
  customPlaceholder: string | null;
};

type BuildModelDeps = {
  defaultInitOptions: Record<string, any>;
  optionMeta: Record<string, any>;
  defaultState: Record<string, any>;
  specialOptionKeys: string[];
};

function buildModel(
  state: Record<string, any>,
  deps: BuildModelDeps,
): SnippetModel {
  const { defaultInitOptions, optionMeta, defaultState, specialOptionKeys } =
    deps;
  const options: OptionEntry[] = [];

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
    options.push({ key, value, raw: false });
  });

  if (state.loadUtils) {
    options.push({
      key: "loadUtils",
      value: '() => import("intl-tel-input/utils")',
      raw: true,
    });
  }
  if (state.dropdownContainer) {
    options.push({
      key: "dropdownContainer",
      value: "document.body",
      raw: true,
    });
  }
  if (state.hiddenInput) {
    options.push({
      key: "hiddenInput",
      value: '() => ({ phone: "phone_full", country: "country_iso2" })',
      raw: true,
    });
  }

  const i18nCode = String(state.i18n ?? "").trim();
  const hasI18n = Boolean(i18nCode) && i18nCode.toLowerCase() !== "en";
  const i18n = hasI18n
    ? {
        code: i18nCode,
        importName: i18nCode.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
      }
    : null;

  return {
    options,
    i18n,
    initialValue: String(state.value ?? ""),
    placeholder: String(state.placeholder ?? ""),
    geoIpLookup: state.geoIpLookup ? GEO_IP_LOOKUP_BODY : null,
    customPlaceholder: state.customPlaceholder ? CUSTOM_PLACEHOLDER_BODY : null,
  };
}

function camelToKebab(s: string): string {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase();
}

// ---------- VANILLA ----------

function renderVanilla(model: SnippetModel): string {
  const lines: string[] = [];
  lines.push('import intlTelInput from "intl-tel-input";');
  if (model.i18n) {
    lines.push(
      `import { ${model.i18n.importName} } from "intl-tel-input/i18n";`,
    );
  }
  lines.push('import "intl-tel-input/styles";');
  lines.push("");
  if (model.geoIpLookup) {
    lines.push(`const geoIpLookup = ${model.geoIpLookup};`);
    lines.push("");
  }
  if (model.customPlaceholder) {
    lines.push(`const customPlaceholder = ${model.customPlaceholder};`);
    lines.push("");
  }
  lines.push('const input = document.querySelector("#phone");');

  const hasGeoIp = !!model.geoIpLookup;
  const hasCustomPlaceholder = !!model.customPlaceholder;
  if (!model.i18n && !hasGeoIp && !hasCustomPlaceholder && model.options.length === 0) {
    lines.push("const iti = intlTelInput(input);");
  } else {
    lines.push("const iti = intlTelInput(input, {");
    if (model.i18n) {
      lines.push(`  i18n: ${model.i18n.importName},`);
    }
    if (hasGeoIp) {
      lines.push("  geoIpLookup,");
    }
    if (hasCustomPlaceholder) {
      lines.push("  customPlaceholder,");
    }
    model.options.forEach(({ key, value, raw }) => {
      const formatted = raw ? value : formatJsValue(value);
      lines.push(`  ${key}: ${formatted},`);
    });
    lines.push("});");
  }
  return lines.join("\n");
}

// ---------- JSX HELPERS (React + Svelte share JSX-ish syntax) ----------

// Format a single prop in JSX-style syntax (React, Svelte).
// Returns the full attribute string, e.g. `initialCountry="us"` or `separateDialCode` or `loadUtils={() => import(...)}`.
function formatJsxProp(key: string, value: any, raw: boolean): string {
  if (raw) {
    return `${key}={${value}}`;
  }
  if (typeof value === "string") {
    return `${key}=${JSON.stringify(value)}`;
  }
  if (value === true) {
    return key;
  }
  if (value === false) {
    return `${key}={false}`;
  }
  if (typeof value === "number") {
    return `${key}={${value}}`;
  }
  // arrays/objects
  return `${key}={${formatJsValue(value)}}`;
}

// Render an inline object literal for inputProps={{ ... }}.
function formatJsxObjectProp(
  key: string,
  entries: Array<[string, string]>,
  indent: string,
): string {
  if (entries.length === 1) {
    const [k, v] = entries[0];
    return `${key}={{ ${k}: ${JSON.stringify(v)} }}`;
  }
  const innerIndent = `${indent}  `;
  const inner = entries
    .map(([k, v]) => `${innerIndent}${k}: ${JSON.stringify(v)},`)
    .join("\n");
  return `${key}={{\n${inner}\n${indent}}}`;
}

// ---------- REACT ----------

function renderReact(model: SnippetModel): string {
  const lines: string[] = [];
  lines.push('import IntlTelInput from "intl-tel-input/react";');
  if (model.i18n) {
    lines.push(
      `import { ${model.i18n.importName} } from "intl-tel-input/i18n";`,
    );
  }
  lines.push('import "intl-tel-input/styles";');
  lines.push("");
  if (model.geoIpLookup) {
    lines.push(`const geoIpLookup = ${model.geoIpLookup};`);
    lines.push("");
  }
  if (model.customPlaceholder) {
    lines.push(`const customPlaceholder = ${model.customPlaceholder};`);
    lines.push("");
  }

  // React folds placeholder + initial value into a single inputProps object.
  const inputPropsEntries: Array<[string, string]> = [];
  if (model.placeholder) {
    inputPropsEntries.push(["placeholder", model.placeholder]);
  }
  if (model.initialValue) {
    inputPropsEntries.push(["defaultValue", model.initialValue]);
  }

  const props: string[] = [];
  if (model.i18n) {
    props.push(`i18n={${model.i18n.importName}}`);
  }
  if (model.geoIpLookup) {
    props.push("geoIpLookup={geoIpLookup}");
  }
  if (model.customPlaceholder) {
    props.push("customPlaceholder={customPlaceholder}");
  }
  model.options.forEach(({ key, value, raw }) =>
    props.push(formatJsxProp(key, value, raw)),
  );
  if (inputPropsEntries.length > 0) {
    props.push(formatJsxObjectProp("inputProps", inputPropsEntries, "    "));
  }

  lines.push("const PhoneInput = () => (");
  if (props.length === 0) {
    lines.push("  <IntlTelInput />");
  } else {
    lines.push("  <IntlTelInput");
    props.forEach((p) => lines.push(`    ${p}`));
    lines.push("  />");
  }
  lines.push(");");
  return lines.join("\n");
}

// ---------- VUE ----------

function formatVueAttr(key: string, value: any, raw: boolean): string {
  const name = camelToKebab(key);
  if (raw) {
    // Vue attribute values are double-quoted, so swap any inner double quotes to single quotes
    // (matches the convention used in the wrapper docs, e.g. `:load-utils="() => import('...')"`).
    return `:${name}="${value.replace(/"/g, "'")}"`;
  }
  if (typeof value === "string") {
    return `${name}=${JSON.stringify(value)}`;
  }
  if (value === true) {
    return name;
  }
  if (value === false) {
    return `:${name}="false"`;
  }
  if (typeof value === "number") {
    return `:${name}="${value}"`;
  }
  // arrays/objects — emit as JS expression bound with `:`
  return `:${name}="${formatJsValue(value).replace(/"/g, "'")}"`;
}

function renderVue(model: SnippetModel): string {
  // Build script body unindented, then indent each line by 2 spaces on emission.
  const scriptBody: string[] = [];
  scriptBody.push('import IntlTelInput from "intl-tel-input/vue";');
  if (model.i18n) {
    scriptBody.push(
      `import { ${model.i18n.importName} } from "intl-tel-input/i18n";`,
    );
  }
  scriptBody.push('import "intl-tel-input/styles";');
  if (model.geoIpLookup) {
    scriptBody.push("");
    `const geoIpLookup = ${model.geoIpLookup};`
      .split("\n")
      .forEach((line) => scriptBody.push(line));
  }
  if (model.customPlaceholder) {
    scriptBody.push("");
    `const customPlaceholder = ${model.customPlaceholder};`
      .split("\n")
      .forEach((line) => scriptBody.push(line));
  }

  const scriptLines: string[] = [];
  scriptLines.push("<script setup>");
  scriptBody.forEach((line) => scriptLines.push(line ? `  ${line}` : ""));
  scriptLines.push("</script>");

  const inputPropsEntries: Array<[string, string]> = [];
  if (model.placeholder) {
    inputPropsEntries.push(["placeholder", model.placeholder]);
  }

  const attrs: string[] = [];
  if (model.i18n) {
    attrs.push(`:i18n="${model.i18n.importName}"`);
  }
  if (model.geoIpLookup) {
    attrs.push(':geo-ip-lookup="geoIpLookup"');
  }
  if (model.customPlaceholder) {
    attrs.push(':custom-placeholder="customPlaceholder"');
  }
  if (model.initialValue) {
    attrs.push(`initial-value=${JSON.stringify(model.initialValue)}`);
  }
  model.options.forEach(({ key, value, raw }) =>
    attrs.push(formatVueAttr(key, value, raw)),
  );
  if (inputPropsEntries.length > 0) {
    const innerObject = inputPropsEntries
      .map(([k, v]) => `${k}: ${JSON.stringify(v).replace(/"/g, "'")}`)
      .join(", ");
    attrs.push(`:input-props="{ ${innerObject} }"`);
  }

  const tplLines: string[] = [];
  tplLines.push("<template>");
  if (attrs.length === 0) {
    tplLines.push("  <IntlTelInput />");
  } else {
    tplLines.push("  <IntlTelInput");
    attrs.forEach((a) => tplLines.push(`    ${a}`));
    tplLines.push("  />");
  }
  tplLines.push("</template>");

  return [...scriptLines, "", ...tplLines].join("\n");
}

// ---------- ANGULAR ----------

// For Angular, complex prop values (functions, arrays, objects) live as class fields and get bound by name.
// Returns either an inline binding string OR null if the value was hoisted to a class field (in which case
// the binding has been added to `attrs` and the field assignment to `classFields`).
function pushAngularProp(
  attrs: string[],
  classFields: string[],
  key: string,
  value: any,
  raw: boolean,
): void {
  if (raw) {
    classFields.push(`${key} = ${value};`);
    attrs.push(`[${key}]="${key}"`);
    return;
  }
  if (typeof value === "string") {
    attrs.push(`${key}=${JSON.stringify(value)}`);
    return;
  }
  if (typeof value === "boolean" || typeof value === "number") {
    attrs.push(`[${key}]="${value}"`);
    return;
  }
  // arrays/objects — hoist to class field for readability
  classFields.push(`${key} = ${formatJsValue(value)};`);
  attrs.push(`[${key}]="${key}"`);
}

function renderAngular(model: SnippetModel): string {
  const importLines: string[] = [];
  importLines.push('import { Component } from "@angular/core";');
  importLines.push('import IntlTelInput from "intl-tel-input/angular";');
  if (model.i18n) {
    importLines.push(
      `import { ${model.i18n.importName} } from "intl-tel-input/i18n";`,
    );
  }
  importLines.push('import "intl-tel-input/styles";');

  const attrs: string[] = [];
  const classFields: string[] = [];

  if (model.i18n) {
    classFields.push(`i18n = ${model.i18n.importName};`);
    attrs.push('[i18n]="i18n"');
  }
  if (model.geoIpLookup) {
    classFields.push(`geoIpLookup = ${model.geoIpLookup};`);
    attrs.push('[geoIpLookup]="geoIpLookup"');
  }
  if (model.customPlaceholder) {
    classFields.push(`customPlaceholder = ${model.customPlaceholder};`);
    attrs.push('[customPlaceholder]="customPlaceholder"');
  }
  if (model.initialValue) {
    attrs.push(`initialValue=${JSON.stringify(model.initialValue)}`);
  }
  model.options.forEach(({ key, value, raw }) =>
    pushAngularProp(attrs, classFields, key, value, raw),
  );
  if (model.placeholder) {
    classFields.push(
      `inputAttributes = { placeholder: ${JSON.stringify(model.placeholder)} };`,
    );
    attrs.push('[inputAttributes]="inputAttributes"');
  }

  const templateBody =
    attrs.length === 0
      ? "<intl-tel-input />"
      : `<intl-tel-input\n      ${attrs.join("\n      ")}\n    />`;

  const lines: string[] = [];
  lines.push(...importLines);
  lines.push("");
  lines.push("@Component({");
  lines.push('  selector: "app-phone-input",');
  lines.push("  imports: [IntlTelInput],");
  lines.push(`  template: \`\n    ${templateBody}\n  \`,`);
  lines.push("})");
  if (classFields.length === 0) {
    lines.push("export class PhoneInputComponent {}");
  } else {
    lines.push("export class PhoneInputComponent {");
    classFields.forEach((f) => {
      f.split("\n").forEach((line) => lines.push(`  ${line}`));
    });
    lines.push("}");
  }
  return lines.join("\n");
}

// ---------- SVELTE ----------

function pushSvelteHoistedConst(
  scriptLines: string[],
  name: string,
  body: string | null,
): void {
  if (!body) {
    return;
  }
  scriptLines.push("");
  body.split("\n").forEach((line, i) => {
    // Match the script-block 2-space indent; first line gets the `const X = ` prefix.
    scriptLines.push(i === 0 ? `  const ${name} = ${line}` : `  ${line}`);
  });
  scriptLines[scriptLines.length - 1] = `${scriptLines[scriptLines.length - 1]};`;
}

function renderSvelte(model: SnippetModel): string {
  const scriptLines: string[] = [];
  scriptLines.push("<script>");
  scriptLines.push('  import IntlTelInput from "intl-tel-input/svelte";');
  if (model.i18n) {
    scriptLines.push(
      `  import { ${model.i18n.importName} } from "intl-tel-input/i18n";`,
    );
  }
  scriptLines.push('  import "intl-tel-input/styles";');
  pushSvelteHoistedConst(scriptLines, "geoIpLookup", model.geoIpLookup);
  pushSvelteHoistedConst(scriptLines, "customPlaceholder", model.customPlaceholder);
  scriptLines.push("</script>");

  const inputPropsEntries: Array<[string, string]> = [];
  if (model.placeholder) {
    inputPropsEntries.push(["placeholder", model.placeholder]);
  }

  const attrs: string[] = [];
  if (model.i18n) {
    attrs.push(`i18n={${model.i18n.importName}}`);
  }
  if (model.geoIpLookup) {
    attrs.push("geoIpLookup={geoIpLookup}");
  }
  if (model.customPlaceholder) {
    attrs.push("customPlaceholder={customPlaceholder}");
  }
  if (model.initialValue) {
    attrs.push(`initialValue=${JSON.stringify(model.initialValue)}`);
  }
  model.options.forEach(({ key, value, raw }) =>
    attrs.push(formatJsxProp(key, value, raw)),
  );
  if (inputPropsEntries.length > 0) {
    attrs.push(formatJsxObjectProp("inputProps", inputPropsEntries, "  "));
  }

  const componentLines: string[] = [];
  if (attrs.length === 0) {
    componentLines.push("<IntlTelInput />");
  } else {
    componentLines.push("<IntlTelInput");
    attrs.forEach((a) => componentLines.push(`  ${a}`));
    componentLines.push("/>");
  }

  return [...scriptLines, "", ...componentLines].join("\n");
}

// ---------- DISPATCH ----------

const RENDERERS: Record<Integration, (model: SnippetModel) => string> = {
  vanilla: renderVanilla,
  react: renderReact,
  vue: renderVue,
  angular: renderAngular,
  svelte: renderSvelte,
};

export function renderInitCodeFromState(
  state: Record<string, any>,
  initCodeEl: HTMLElement | null,
  deps: BuildModelDeps,
  integration: Integration = "vanilla",
) {
  if (!initCodeEl) {
    return;
  }

  const model = buildModel(state, deps);
  const output = (RENDERERS[integration] ?? renderVanilla)(model);

  initCodeEl.textContent = output;

  // Keep the <pre> + <code> language class in sync so highlight.js picks the right grammar.
  const lang = HLJS_LANGUAGE[integration] ?? "javascript";
  const langClass = `language-${lang}`;
  const pre = initCodeEl.parentElement;
  [initCodeEl, pre].forEach((el) => {
    if (!el) {
      return;
    }
    Array.from(el.classList)
      .filter((c) => c.startsWith("language-"))
      .forEach((c) => el.classList.remove(c));
    el.classList.add(langClass);
  });

  // Highlight.js highlights on page load, but we update this block live, so re-run highlighting.
  // Highlight.js marks nodes as already-highlighted via `data-highlighted`, so clear that first.
  // Highlight.js is loaded after this script, so guard for it not being available yet.
  if (window.hljs && typeof window.hljs.highlightElement === "function") {
    delete initCodeEl.dataset.highlighted;
    window.hljs.highlightElement(initCodeEl);
  }
}
