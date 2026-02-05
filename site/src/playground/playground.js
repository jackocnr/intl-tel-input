(function () {
  let iti = null;
  const telInput = document.querySelector("#playgroundPhone");
  const optionsForm = document.querySelector("#playgroundOptions");
  const attrsForm = document.querySelector("#playgroundAttributes");
  const resetOptionsButton = document.querySelector("#playgroundReset");
  const resetAttrsButton = document.querySelector("#playgroundResetAttrs");
  const initCodeEl = document.querySelector("#playgroundInitCode");

  if (!telInput || !optionsForm) return;

  const CACHE_BUST_UTILS = "<%= cacheBust('/intl-tel-input/js/utils.js') %>";
  const CACHE_BUST_I18N = "<%= cacheBustDir('/intl-tel-input/js/i18n') %>";

  // i18nLanguages is injected by grunt/template.js
  // eslint-disable-next-line quotes -- JSON.stringify output contains double quotes, so single quotes here are safe/readable.
  const I18N_LANGUAGE_CODES = JSON.parse('<%= JSON.stringify(i18nLanguages || []) %>');

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

  const I18N_OPTION_LABELS = {
    "": "None (default)",
  };

  I18N_LANGUAGE_CODES.forEach((code) => {
    I18N_OPTION_LABELS[code] = getLanguageLabel(code);
  });

  const AUTO_PLACEHOLDER_OPTIONS = ["polite", "aggressive", "off"];
  const NUMBER_TYPES = [
    "FIXED_LINE",
    "MOBILE",
    "FIXED_LINE_OR_MOBILE",
    "TOLL_FREE",
    "PREMIUM_RATE",
    "SHARED_COST",
    "VOIP",
    "PERSONAL_NUMBER",
    "PAGER",
    "UAN",
    "VOICEMAIL",
  ];

  const { defaults } = window.intlTelInput;

  const SPECIAL_PLAYGROUND_OPTION_KEYS = [
    "i18n",
    "loadUtils",
    "customPlaceholder",
    "dropdownContainer",
    "geoIpLookup",
    "hiddenInput",
  ];

  const defaultInitOptions = {
    allowDropdown: defaults.allowDropdown,
    allowedNumberTypes: defaults.allowedNumberTypes,
    allowNumberExtensions: defaults.allowNumberExtensions,
    allowPhonewords: defaults.allowPhonewords,
    autoPlaceholder: defaults.autoPlaceholder,
    containerClass: defaults.containerClass,
    countryNameLocale: defaults.countryNameLocale,
    countryOrder: defaults.countryOrder,
    countrySearch: defaults.countrySearch,
    customPlaceholder: false, // in playground, this is a checkbox
    dropdownContainer: false, // in playground, this is a checkbox
    geoIpLookup: false, // in playground, this is a checkbox
    hiddenInput: false, // in playground, this is a checkbox
    excludeCountries: defaults.excludeCountries,
    fixDropdownWidth: defaults.fixDropdownWidth,
    formatAsYouType: defaults.formatAsYouType,
    formatOnDisplay: defaults.formatOnDisplay,
    i18n: "", // different default for playground display
    initialCountry: defaults.initialCountry,
    loadUtils: true, // in playground, this is a checkbox
    nationalMode: defaults.nationalMode,
    onlyCountries: defaults.onlyCountries,
    placeholderNumberType: defaults.placeholderNumberType,
    separateDialCode: defaults.separateDialCode,
    showFlags: defaults.showFlags,
    strictMode: defaults.strictMode,
    useFullscreenPopup: defaults.useFullscreenPopup,
  };

  const defaultInputAttributes = {
    value: "",
    placeholder: "",
    disabled: false,
    readOnly: false,
  };

  const optionMeta = {
    allowDropdown: {
      type: "boolean",
      description: "Allow clicking the selected country to open the dropdown.",
    },
    allowedNumberTypes: {
      type: "multidropdown",
      description: "Restrict the types of numbers that are considered valid.",
      options: NUMBER_TYPES,
    },
    allowNumberExtensions: {
      type: "boolean",
      description: "Accept number extensions as valid (e.g. x123).",
    },
    allowPhonewords: {
      type: "boolean",
      description: "Accept letters in the number (phonewords) as valid.",
    },
    autoPlaceholder: {
      type: "select",
      description: "Automatically set a placeholder based on the selected country and placeholderNumberType.",
      options: AUTO_PLACEHOLDER_OPTIONS,
    },
    containerClass: {
      type: "text",
      description: "Additional CSS class to add to the container element.",
    },
    countryNameLocale: {
      type: "text",
      description: "Locale used when generating country names with Intl.DisplayNames (e.g. 'fr' for French).",
      placeholder: "e.g. fr",
    },
    countryOrder: {
      type: "json",
      description: "Custom ordering for countries, given as an array of ISO2 codes. Any countries not listed will appear at the end in default order.",
      placeholder: "e.g. ['us', 'gb']",
    },
    countrySearch: {
      type: "boolean",
      description: "Enable the search input inside the country dropdown.",
    },
    customPlaceholder: {
      type: "boolean",
      label: "customPlaceholder",
      description: "Customise the auto-generated placeholder.",
    },
    dropdownContainer: {
      type: "boolean",
      label: "dropdownContainer",
      description: "Append the dropdown to a specific element (useful when the input is inside a container with overflow:hidden).",
    },
    geoIpLookup: {
      type: "boolean",
      label: "geoIpLookup",
      description: "Auto-detect the user's country by IP address (async). Requires initialCountry='auto'.",
    },
    hiddenInput: {
      type: "boolean",
      label: "hiddenInput",
      description: "Add hidden inputs that get populated with the full number and country code on submit.",
    },
    excludeCountries: {
      type: "json",
      description: "Exclude specific countries (array of ISO2 codes) from the dropdown.",
      placeholder: "e.g. ['ru', 'cn']",
    },
    fixDropdownWidth: {
      type: "boolean",
      description: "Keep the dropdown width aligned to the input width.",
    },
    formatAsYouType: {
      type: "boolean",
      description: "Format the number as the user types.",
    },
    formatOnDisplay: {
      type: "boolean",
      description: "Format any initial value when the plugin initialises.",
    },
    i18n: {
      type: "select",
      description: "Translate UI strings (e.g. country search placeholder) using the provided language packs.",
      options: ["", ...I18N_LANGUAGE_CODES],
      optionLabels: I18N_OPTION_LABELS,
    },
    initialCountry: {
      type: "text",
      description: "Initial selected country (ISO2 code), e.g. 'gb'.",
      placeholder: "e.g. gb",
    },
    loadUtils: {
      type: "boolean",
      label: "loadUtils",
      description: "Dynamically load utils.js, required for formatting/validation (async).",
    },
    nationalMode: {
      type: "boolean",
      description: "Display numbers in national format (instead of international) where applicable.",
    },
    onlyCountries: {
      type: "json",
      description: "Restrict the dropdown to only these countries (array of ISO2 codes).",
      placeholder: "e.g. ['us', 'ca', 'mx']",
    },
    placeholderNumberType: {
      type: "select",
      description: "Number type used when generating placeholders (e.g. MOBILE).",
      options: NUMBER_TYPES,
    },
    separateDialCode: {
      type: "boolean",
      description: "Show the dial code separately from the number input.",
    },
    showFlags: {
      type: "boolean",
      description: "Show country flags in the dropdown and selected country.",
    },
    strictMode: {
      type: "boolean",
      description: "As the user types in the input, ignore irrelevant characters and cap the number at the maximum valid length.",
    },
    useFullscreenPopup: {
      type: "boolean",
      description: "Use a fullscreen-style country picker instead of the dropdown (defaults to true on small screens).",
    },
  };

  const attributeMeta = {
    value: { type: "text", label: "value (initial)" },
    placeholder: { type: "text" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  };

  const attributeQueryAliases = {
    readOnly: "readonly",
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function parseBooleanParam(value, fallback) {
    if (value === null || value === undefined) return fallback;
    const v = String(value).trim().toLowerCase();
    if (["1", "true", "yes", "y", "on"].includes(v)) return true;
    if (["0", "false", "no", "n", "off"].includes(v)) return false;
    return fallback;
  }

  function parseJsonParam(value, fallback) {
    if (value === null || value === undefined) return fallback;
    const text = String(value).trim();
    if (!text) return fallback;
    if (text === "null") return null;
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  }

  function parseQueryOverrides(defaults, metaMap, aliases = {}) {
    const params = new URLSearchParams(window.location.search);
    const next = deepClone(defaults);

    Object.keys(metaMap).forEach((key) => {
      const paramKey = params.has(key) ? key : aliases[key];
      if (!paramKey || !params.has(paramKey)) return;
      const raw = params.get(paramKey);
      const meta = metaMap[key];

      if (meta.type === "boolean") {
        next[key] = parseBooleanParam(raw, next[key]);
      } else if (meta.type === "select" || meta.type === "text") {
        next[key] = raw;
      } else if (meta.type === "number") {
        const num = Number(raw);
        next[key] = Number.isFinite(num) ? num : next[key];
      } else if (meta.type === "multidropdown") {
        const parsed = parseJsonParam(raw, next[key]);
        next[key] = Array.isArray(parsed) ? parsed : next[key];
      } else if (meta.type === "json") {
        next[key] = parseJsonParam(raw, next[key]);
      }
    });

    return next;
  }

  function toInitOptions(state) {
    const opts = {};

    Object.keys(defaultInitOptions).forEach((key) => {
      if (SPECIAL_PLAYGROUND_OPTION_KEYS.includes(key)) return;
      opts[key] = state[key];
    });

    if (state.loadUtils) {
      opts.loadUtils = () => import(`/intl-tel-input/js/utils.js?${CACHE_BUST_UTILS}`);
    }

    if (state.customPlaceholder) {
      opts.customPlaceholder = (selectedCountryPlaceholder) => `e.g. ${selectedCountryPlaceholder}`;
    }

    if (state.dropdownContainer) {
      opts.dropdownContainer = document.body;
    }

    if (state.geoIpLookup) {
      opts.geoIpLookup = (success, failure) => {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => success(data.country_code))
          .catch(() => failure());
      };
    }

    if (state.hiddenInput) {
      opts.hiddenInput = () => ({ phone: "phone_full", country: "country_code" });
    }

    return opts;
  }

  async function resolveI18nSelection(value) {
    if (value === null || value === undefined) return null;

    if (typeof value === "object") return value;

    const code = String(value).trim();
    if (!code) return null;

    try {
      const mod = await import(`/intl-tel-input/js/i18n/${code}/index.js?${CACHE_BUST_I18N}`);
      return mod && mod.default ? mod.default : null;
    } catch {
      return null;
    }
  }

  function safeStringify(value) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  function formatJsValue(value) {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "string") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    try {
      return JSON.stringify(value);
    } catch {
      return safeStringify(value);
    }
  }

  function buildInitCodeFromState(state) {
    const nonDefaultOptionEntries = [];

    Object.keys(defaultInitOptions).forEach((key) => {
      if (SPECIAL_PLAYGROUND_OPTION_KEYS.includes(key)) return;
      const meta = optionMeta[key];
      if (!meta) return;
      const value = state[key];
      if (isDefaultForKey(key, meta, value)) return;
      nonDefaultOptionEntries.push([key, value]);
    });

    const optionEntriesForCode = [...nonDefaultOptionEntries];
    if (state.loadUtils) {
      optionEntriesForCode.push(["loadUtils", "() => import(\"/intl-tel-input/js/utils.js\")"]);
    }

    if (state.customPlaceholder) {
      optionEntriesForCode.push([
        "customPlaceholder",
        "(selectedCountryPlaceholder) => `e.g. ${selectedCountryPlaceholder}`",
      ]);
    }

    if (state.dropdownContainer) {
      optionEntriesForCode.push(["dropdownContainer", "document.body"]);
    }

    if (state.geoIpLookup) {
      optionEntriesForCode.push([
        "geoIpLookup",
        "(success, failure) => {\n    fetch(\"https://ipapi.co/json\")\n      .then((res) => res.json())\n      .then((data) => success(data.country_code))\n      .catch(() => failure())\n  }",
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
      lines.push(
        `  const i18n = (await import("/intl-tel-input/js/i18n/${encodeURIComponent(i18nCode)}/index.js")).default;`,
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

    lines.push(`${hasI18n ? "  " : ""});`);

    if (hasI18n) {
      lines.push("})();");
    }

    return lines.join("\n");
  }

  function renderInitCodeFromState(state) {
    if (!initCodeEl) return;
    initCodeEl.textContent = buildInitCodeFromState(state);

    // Prism highlights on page load, but we update this block live, so we need to re-run highlighting.
    // Prism is loaded after this script, so guard for it not being available yet.
    if (window.Prism && typeof window.Prism.highlightElement === "function") {
      window.Prism.highlightElement(initCodeEl);
    }
  }

  function encodeJsonParam(value) {
    if (value === null) return "";
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return a === b;
    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i += 1) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (typeof a === "object" && typeof b === "object") {
      const aKeys = Object.keys(a).sort();
      const bKeys = Object.keys(b).sort();
      if (aKeys.length !== bKeys.length) return false;
      for (let i = 0; i < aKeys.length; i += 1) {
        if (aKeys[i] !== bKeys[i]) return false;
        const key = aKeys[i];
        if (!deepEqual(a[key], b[key])) return false;
      }
      return true;
    }

    return false;
  }

  function normalizeStringArrayAsSet(value) {
    if (!Array.isArray(value)) return [];
    return value
      .map((v) => String(v))
      .filter(Boolean)
      .sort();
  }

  function formatMultiDropdownSelection(values) {
    const items = Array.isArray(values) ? values : [];
    if (items.length === 0) return "None";
    if (items.length <= 2) return items.join(", ");
    return `${items.length} selected`;
  }

  function applyInputAttributes(state) {
    if (!state) return;

    if (typeof state.value === "string") {
      telInput.value = state.value;
      // Keep the DOM "value" attribute (defaultValue) in sync for visibility in devtools.
      telInput.defaultValue = state.value;
    }

    if (typeof state.placeholder === "string") {
      telInput.placeholder = state.placeholder;
    }

    telInput.disabled = Boolean(state.disabled);
    telInput.readOnly = Boolean(state.readOnly);
  }

  function getStateFromForm(formEl, defaults, metaMap, dataAttr) {
    const state = deepClone(defaults);
    if (!formEl) return state;

    Object.entries(metaMap).forEach(([key, meta]) => {
      if (meta.type === "multidropdown") {
        const root = formEl.querySelector(`[data-multidropdown="${key}"]`);
        if (!root) return;
        const checked = [...root.querySelectorAll("input[type=\"checkbox\"]:checked")].map((el) => el.value);
        state[key] = checked;
        return;
      }

      const control = formEl.querySelector(`[${dataAttr}="${key}"]`);
      if (!control) return;

      if (meta.type === "boolean") {
        state[key] = Boolean(control.checked);
      } else if (meta.type === "text") {
        state[key] = control.value;
      } else if (meta.type === "number") {
        const raw = String(control.value || "").trim();
        state[key] = raw === "" ? "" : Number(raw);
      } else if (meta.type === "select") {
        state[key] = control.value;
      } else if (meta.type === "json") {
        const value = String(control.value || "").trim();
        if (value === "") {
          state[key] = defaults[key];
        } else {
          const parsed = parseJsonParam(value, state[key]);
          state[key] = parsed;
        }
      }
    });

    return state;
  }

  function setFormFromState(formEl, state, metaMap, dataAttr) {
    if (!formEl) return;

    Object.entries(metaMap).forEach(([key, meta]) => {
      if (meta.type === "multidropdown") {
        const values = new Set(Array.isArray(state[key]) ? state[key] : []);
        const root = formEl.querySelector(`[data-multidropdown="${key}"]`);
        if (!root) return;

        root.querySelectorAll("input[type=\"checkbox\"]").forEach((el) => {
          el.checked = values.has(el.value);
        });

        const button = root.querySelector("button[data-bs-toggle=\"dropdown\"]");
        if (button) button.textContent = formatMultiDropdownSelection([...values]);
        return;
      }

      const control = formEl.querySelector(`[${dataAttr}="${key}"]`);
      if (!control) return;

      if (meta.type === "boolean") {
        control.checked = Boolean(state[key]);
      } else if (meta.type === "text") {
        control.value = state[key] ?? "";
      } else if (meta.type === "number") {
        control.value = state[key] === "" || state[key] === null || state[key] === undefined ? "" : String(state[key]);
      } else if (meta.type === "select") {
        control.value = state[key] ?? "";
      } else if (meta.type === "json") {
        const value = state[key];
        const defaultValue = defaultState[key];
        if (Array.isArray(value) && value.length === 0 && Array.isArray(defaultValue) && defaultValue.length === 0) {
          control.value = "";
        } else if (value === null) {
          control.value = "";
        } else if (typeof value === "string") {
          control.value = value;
        } else if (value === undefined) {
          control.value = "";
        } else {
          control.value = safeStringify(value);
        }
      }
    });
  }

  function initTooltips(container) {
    if (!container) return;
    if (!window.bootstrap || !window.bootstrap.Tooltip) return;

    container.querySelectorAll("[data-bs-toggle='tooltip']").forEach((el) => {
      const existing = window.bootstrap.Tooltip.getInstance(el);
      if (existing) existing.dispose();
      new window.bootstrap.Tooltip(el);
    });
  }

  function createInfoIcon(meta) {
    const text = String(meta && meta.description ? meta.description : "").trim();
    if (!text) return null;
    const icon = document.createElement("span");
    icon.className = "iti-playground-info";
    icon.textContent = "i";
    icon.tabIndex = 0;
    icon.setAttribute("role", "button");
    icon.setAttribute("aria-label", text);
    icon.setAttribute("data-bs-toggle", "tooltip");
    icon.setAttribute("data-bs-placement", "top");
    icon.setAttribute("title", text);
    return icon;
  }

  function buildLabelGroup(meta, { labelText, htmlFor, labelClassName }) {
    const group = document.createElement("div");
    group.className = "iti-playground-labelgroup";

    const label = document.createElement("label");
    label.className = labelClassName;
    label.htmlFor = htmlFor;
    label.textContent = labelText;

    group.appendChild(label);

    const infoIcon = createInfoIcon(meta);
    if (infoIcon) group.appendChild(infoIcon);

    return group;
  }

  function buildBooleanExampleControl(key, meta, { idPrefix, dataAttr, exampleText }) {
    // Custom layout: show the code example to the right of the label (desktop), then the checkbox below.
    const wrapper = document.createElement("div");
    wrapper.className = "iti-playground-control iti-playground-control--loadutils";

    const checkboxRow = document.createElement("div");
    checkboxRow.className = "form-check iti-playground-loadutils-toggle";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";
    checkbox.id = `${idPrefix}_${key}`;
    checkbox.setAttribute(dataAttr, key);

    const enableLabel = document.createElement("label");
    enableLabel.className = "form-check-label";
    enableLabel.htmlFor = checkbox.id;
    enableLabel.textContent = "Enable";

    checkboxRow.appendChild(checkbox);
    checkboxRow.appendChild(enableLabel);

    wrapper.appendChild(
      buildLabelGroup(meta, {
        labelText: meta.label || key,
        htmlFor: checkbox.id,
        labelClassName: "form-label",
      }),
    );

    const example = document.createElement("pre");
    example.className = "mb-0 language-javascript iti-playground-loadutils-example";
    const code = document.createElement("code");
    code.className = "language-javascript";
    code.textContent = exampleText;
    example.appendChild(code);
    wrapper.appendChild(example);

    wrapper.appendChild(checkboxRow);

    return wrapper;
  }

  function buildControlRow(key, meta, { idPrefix, dataAttr }) {
    const wrapper = document.createElement("div");

    if (meta.type === "boolean") {
      if (key === "loadUtils") {
        return buildBooleanExampleControl(key, meta, {
          idPrefix,
          dataAttr,
          exampleText: "() => import(\"/intl-tel-input/js/utils.js\")",
        });
      }

      if (key === "customPlaceholder") {
        return buildBooleanExampleControl(key, meta, {
          idPrefix,
          dataAttr,
          exampleText: "(selectedCountryPlaceholder) => \"e.g. \" + selectedCountryPlaceholder",
        });
      }

      if (key === "dropdownContainer") {
        return buildBooleanExampleControl(key, meta, {
          idPrefix,
          dataAttr,
          exampleText: "document.body",
        });
      }

      if (key === "geoIpLookup") {
        return buildBooleanExampleControl(key, meta, {
          idPrefix,
          dataAttr,
          exampleText:
            "(success, failure) => {\n    fetch(\"https://ipapi.co/json\")\n      .then((res) => res.json())\n      .then((data) => success(data.country_code))\n      .catch(() => failure())\n  }",
        });
      }

      if (key === "hiddenInput") {
        return buildBooleanExampleControl(key, meta, {
          idPrefix,
          dataAttr,
          exampleText: "() => ({ phone: \"phone_full\", country: \"country_code\" })",
        });
      }

      wrapper.className = "form-check iti-playground-control iti-playground-control--check";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input";
      checkbox.id = `${idPrefix}_${key}`;
      checkbox.setAttribute(dataAttr, key);

      wrapper.appendChild(checkbox);
      wrapper.appendChild(
        buildLabelGroup(meta, {
          labelText: meta.label || key,
          htmlFor: checkbox.id,
          labelClassName: "form-check-label",
        }),
      );

      return wrapper;
    }

    wrapper.className = "iti-playground-control";

    wrapper.appendChild(
      buildLabelGroup(meta, {
        labelText: meta.label || key,
        htmlFor: `${idPrefix}_${key}`,
        labelClassName: "form-label",
      }),
    );

    if (meta.type === "select") {
      const select = document.createElement("select");
      select.className = "form-select";
      select.id = `${idPrefix}_${key}`;
      select.setAttribute(dataAttr, key);

      meta.options.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = (meta.optionLabels && meta.optionLabels[value]) || value;
        select.appendChild(option);
      });

      wrapper.appendChild(select);
      return wrapper;
    }

    if (meta.type === "multidropdown") {
      const dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      dropdown.setAttribute("data-multidropdown", key);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-outline-secondary dropdown-toggle w-100 text-start iti-playground-multidropdown-toggle";
      button.id = `${idPrefix}_${key}`;
      button.setAttribute("data-bs-toggle", "dropdown");
      button.setAttribute("data-bs-auto-close", "outside");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "Select";

      const menu = document.createElement("div");
      menu.className = "dropdown-menu p-2";
      menu.setAttribute("aria-labelledby", button.id);
      menu.style.maxHeight = "240px";
      menu.style.overflow = "auto";

      meta.options.forEach((value) => {
        const checkWrap = document.createElement("div");
        checkWrap.className = "form-check";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";
        checkbox.id = `${idPrefix}_${key}_${value}`;
        checkbox.value = value;
        const checkLabel = document.createElement("label");
        checkLabel.className = "form-check-label";
        checkLabel.htmlFor = checkbox.id;
        checkLabel.textContent = value;

        checkWrap.appendChild(checkbox);
        checkWrap.appendChild(checkLabel);
        menu.appendChild(checkWrap);
      });

      dropdown.appendChild(button);
      dropdown.appendChild(menu);
      wrapper.appendChild(dropdown);

      dropdown.addEventListener("change", () => {
        const selected = [...dropdown.querySelectorAll("input[type=\"checkbox\"]:checked")].map((el) => el.value);
        button.textContent = formatMultiDropdownSelection(selected);
      });

      return wrapper;
    }

    if (meta.type === "json") {
      const textarea = document.createElement("textarea");
      textarea.className = "form-control";
      textarea.id = `${idPrefix}_${key}`;
      textarea.rows = 2;
      textarea.setAttribute(dataAttr, key);
      textarea.placeholder = meta.placeholder || "";
      wrapper.appendChild(textarea);
      return wrapper;
    }

    if (meta.type === "number") {
      const numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.className = "form-control";
      numberInput.id = `${idPrefix}_${key}`;
      numberInput.setAttribute(dataAttr, key);
      if (meta.placeholder) numberInput.placeholder = meta.placeholder;
      wrapper.appendChild(numberInput);
      return wrapper;
    }

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = `${idPrefix}_${key}`;
    input.setAttribute(dataAttr, key);
    if (meta.placeholder) input.placeholder = meta.placeholder;

    wrapper.appendChild(input);

    return wrapper;
  }

  function renderControls(formEl, metaMap, idPrefix, dataAttr) {
    if (!formEl) return;
    formEl.innerHTML = "";

    Object.entries(metaMap).forEach(([key, meta]) => {
      formEl.appendChild(buildControlRow(key, meta, { idPrefix, dataAttr }));
    });

    initTooltips(formEl);
  }

  let reinitTimer = null;

  function destroyCurrentInstance() {
    if (iti && typeof iti.destroy === "function") {
      try {
        iti.destroy();
      } catch {
        // ignore
      }
    }
  }

  let initNonce = 0;

  function detachUtilsIfNeeded(state) {
    if (!state || state.loadUtils) return;
    if (!window.intlTelInput) return;
    // If utils were previously attached, clear them so disabling loadUtils actually disables
    // formatting/validation, and allow re-attaching if the user re-enables it.
    window.intlTelInput.utils = null;
    window.intlTelInput.startedLoadingUtilsScript = false;
  }

  async function initWithStateAsync(state) {
    const nonce = (initNonce += 1);

    detachUtilsIfNeeded(state);

    const initOptions = toInitOptions(state);
    const i18n = await resolveI18nSelection(state.i18n);

    if (nonce !== initNonce) return;

    // Apply attributes BEFORE initialising the plugin, so it can read the correct DOM state.
    applyInputAttributes(state);

    destroyCurrentInstance();
    initOptions.i18n = i18n;
    iti = window.intlTelInput(telInput, initOptions);

    // Trigger live results box to update by triggering an input event on the telInput
    window.setTimeout(() => {
      telInput.dispatchEvent(new Event("input", { bubbles: true }));
    }, 0);
  }

  function scheduleReinit() {
    if (reinitTimer) window.clearTimeout(reinitTimer);
    reinitTimer = window.setTimeout(() => {
      const state = getCombinedStateFromControls();
      updateUrlFromState(state);
      renderInitCodeFromState(state);
      void initWithStateAsync(state);
    }, 100);
  }

  function getCombinedStateFromControls() {
    return {
      ...getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option"),
      ...getStateFromForm(attrsForm, defaultInputAttributes, attributeMeta, "data-attr"),
    };
  }

  const defaultState = { ...deepClone(defaultInitOptions), ...deepClone(defaultInputAttributes) };

  function isDefaultForKey(key, meta, value) {
    const def = defaultState[key];

    if (meta.type === "multidropdown") {
      const a = normalizeStringArrayAsSet(value);
      const b = normalizeStringArrayAsSet(def);
      return deepEqual(a, b);
    }

    if (meta.type === "text" || meta.type === "select") {
      return String(value ?? "") === String(def ?? "");
    }

    if (meta.type === "number") {
      const a = value === "" ? "" : Number(value);
      const b = def === "" ? "" : Number(def);
      return a === b || (Number.isNaN(a) && Number.isNaN(b));
    }

    if (meta.type === "boolean") {
      return Boolean(value) === Boolean(def);
    }

    if (meta.type === "json") {
      return deepEqual(value, def);
    }

    return deepEqual(value, def);
  }

  function buildShareUrlFromState(state, { excludeDefaults = false } = {}) {
    const url = new URL(window.location.href);
    const allMeta = {
      ...optionMeta,
      ...attributeMeta,
    };

    // Keep unrelated params, but rewrite all playground-controlled params.
    Object.keys(allMeta).forEach((key) => url.searchParams.delete(key));
    Object.values(attributeQueryAliases).forEach((aliasKey) => url.searchParams.delete(aliasKey));

    Object.entries(allMeta).forEach(([key, meta]) => {
      const value = state[key];

      if (excludeDefaults && isDefaultForKey(key, meta, value)) return;

      if (meta.type === "boolean") {
        url.searchParams.set(key, value ? "true" : "false");
      } else if (meta.type === "text" || meta.type === "select") {
        url.searchParams.set(key, String(value ?? ""));
      } else if (meta.type === "number") {
        url.searchParams.set(key, value === "" || value === null || value === undefined ? "" : String(value));
      } else if (meta.type === "multidropdown") {
        url.searchParams.set(key, encodeJsonParam(Array.isArray(value) ? value : []));
      } else if (meta.type === "json") {
        url.searchParams.set(key, encodeJsonParam(value));
      }
    });

    return url;
  }

  function updateUrlFromState(state) {
    const nextUrl = buildShareUrlFromState(state, { excludeDefaults: true });
    const currentUrl = new URL(window.location.href);
    if (currentUrl.search === nextUrl.search) return;
    window.history.replaceState(null, "", nextUrl);
  }


  // boot
  renderControls(optionsForm, optionMeta, "opt", "data-option");
  renderControls(attrsForm, attributeMeta, "attr", "data-attr");

  const initialOptionsState = parseQueryOverrides(defaultInitOptions, optionMeta);
  const initialAttrsState = parseQueryOverrides(defaultInputAttributes, attributeMeta, attributeQueryAliases);
  const initialState = { ...initialOptionsState, ...initialAttrsState };

  setFormFromState(optionsForm, initialState, optionMeta, "data-option");
  setFormFromState(attrsForm, initialState, attributeMeta, "data-attr");
  renderInitCodeFromState(initialState);
  void initWithStateAsync(initialState);
  updateUrlFromState(initialState);

  optionsForm.addEventListener("input", scheduleReinit);
  optionsForm.addEventListener("change", scheduleReinit);

  if (attrsForm) {
    attrsForm.addEventListener("input", scheduleReinit);
    attrsForm.addEventListener("change", scheduleReinit);
  }

  if (resetOptionsButton) {
    resetOptionsButton.addEventListener("click", () => {
      // we store both options and attributes in the same state object that is passed to initWithStateAsync and updateUrlFromState, so we must gather the current attribute settings first
      const attrsState = getStateFromForm(
        attrsForm,
        defaultInputAttributes,
        attributeMeta,
        "data-attr",
      );
      const state = { ...deepClone(defaultInitOptions), ...attrsState };
      setFormFromState(optionsForm, state, optionMeta, "data-option");
      renderInitCodeFromState(state);
      void initWithStateAsync(state);
      updateUrlFromState(state);
    });
  }

  if (resetAttrsButton) {
    resetAttrsButton.addEventListener("click", () => {
      // we store both options and attributes in the same state object that is passed to initWithStateAsync and updateUrlFromState, so we must gather the current option settings first
      const optionsState = getStateFromForm(
        optionsForm,
        defaultInitOptions,
        optionMeta,
        "data-option",
      );
      const state = { ...optionsState, ...deepClone(defaultInputAttributes) };
      setFormFromState(attrsForm, state, attributeMeta, "data-attr");
      renderInitCodeFromState(state);
      void initWithStateAsync(state);
      updateUrlFromState(state);
    });
  }

})();
