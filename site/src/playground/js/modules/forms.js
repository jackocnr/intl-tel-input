import { deepClone, parseJsonParam, safeStringify } from "./stateUtils.js";

function initTooltips(container) {
  if (!container) return;
  if (!window.bootstrap || !window.bootstrap.Tooltip) return;

  container.querySelectorAll("[data-bs-toggle='tooltip']").forEach((el) => {
    const existing = window.bootstrap.Tooltip.getInstance(el);
    if (existing) existing.dispose();
    new window.bootstrap.Tooltip(el);
  });
}

function cloneInfoIconSvg(infoIconTemplate) {
  if (!infoIconTemplate || !infoIconTemplate.content) return null;
  const svg = infoIconTemplate.content.querySelector("svg");
  return svg ? svg.cloneNode(true) : null;
}

function createInfoIcon(meta, infoIconTemplate) {
  const text = String(meta && meta.description ? meta.description : "").trim();
  if (!text) return null;
  const icon = document.createElement("span");
  icon.className = "iti-playground-info";

  const svg = cloneInfoIconSvg(infoIconTemplate);
  if (svg) icon.appendChild(svg);

  icon.tabIndex = 0;
  icon.setAttribute("role", "button");
  icon.setAttribute("aria-label", text);
  icon.setAttribute("data-bs-toggle", "tooltip");
  icon.setAttribute("data-bs-placement", "top");
  icon.setAttribute("title", text);
  return icon;
}

function buildLabelGroup(meta, { labelText, htmlFor, labelClassName, infoIconTemplate }) {
  const group = document.createElement("div");
  group.className = "iti-playground-labelgroup";

  const label = document.createElement("label");
  label.className = labelClassName;
  label.htmlFor = htmlFor;
  label.textContent = labelText;

  group.appendChild(label);

  const infoIcon = createInfoIcon(meta, infoIconTemplate);
  if (infoIcon) group.appendChild(infoIcon);

  return group;
}

function buildBooleanExampleControl(key, meta, { idPrefix, dataAttr, exampleText, infoIconTemplate }) {
  // Custom layout: show the code example to the right of the label (desktop), then the checkbox below.
  const wrapper = document.createElement("div");
  wrapper.className = "iti-playground-control iti-playground-control--example-code";

  const checkboxRow = document.createElement("div");
  checkboxRow.className = "form-check iti-playground-example-toggle";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input";
  checkbox.id = `${idPrefix}_${key}`;
  checkbox.setAttribute(dataAttr, key);

  const enableLabel = document.createElement("label");
  enableLabel.className = "form-check-label";
  enableLabel.htmlFor = checkbox.id;
  enableLabel.textContent = "Enable example code";

  checkboxRow.appendChild(checkbox);
  checkboxRow.appendChild(enableLabel);

  wrapper.appendChild(
    buildLabelGroup(meta, {
      labelText: meta.label || key,
      htmlFor: checkbox.id,
      labelClassName: "form-label",
      infoIconTemplate,
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

function formatMultiDropdownSelection(values) {
  const items = Array.isArray(values) ? values : [];
  if (items.length === 0) return "None";
  if (items.length <= 2) return items.join(", ");
  return `${items.length} selected`;
}

function buildControlRow(key, meta, { idPrefix, dataAttr, infoIconTemplate }) {
  const wrapper = document.createElement("div");

  if (meta.type === "boolean") {
    if (key === "loadUtils") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: "() => import(\"/intl-tel-input/js/utils.js\")",
      });
    }

    if (key === "customPlaceholder") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: "(exampleNumber) => exampleNumber ? `e.g. ${exampleNumber}` : 'Phone number'",
      });
    }

    if (key === "dropdownContainer") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: "document.body",
      });
    }

    if (key === "geoIpLookup") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: [
          "(success, failure) => {",
          "  fetch(\"https://ipapi.co/json\")",
          "    .then((res) => res.json())",
          "    .then((data) => success(data.country_code))",
          "    .catch(() => failure());",
          "}",
        ].join("\n"),
      });
    }

    if (key === "hiddenInput") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
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
        infoIconTemplate,
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
      infoIconTemplate,
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
    wrapper.appendChild(textarea);

    const placeholderText = String(meta.placeholder || "").trim();
    if (placeholderText) {
      const placeholderEl = document.createElement("span");
      placeholderEl.className = "form-text";
      placeholderEl.textContent = placeholderText;
      wrapper.appendChild(placeholderEl);
    }

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

function createControlGroup(optionGroupTemplate, title, groupId, description) {
  const root = optionGroupTemplate.content.firstElementChild;
  const group = root.cloneNode(true);

  const titleEl = group.querySelector("[data-role=\"title\"]");
  titleEl.textContent = title;

  const descEl = group.querySelector("[data-role=\"description\"]");
  descEl.textContent = description;

  const resetButton = group.querySelector("[data-role=\"reset\"]");
  resetButton.setAttribute("data-playground-reset-group", String(groupId));

  const stack = group.querySelector("[data-role=\"stack\"]");

  return { group, stack };
}

export function renderControls(formEl, metaMap, { idPrefix, dataAttr, groups = null, templates = {} } = {}) {
  if (!formEl) return { resetGroupKeys: null };
  formEl.innerHTML = "";

  const { infoIconTemplate, optionGroupTemplate } = templates;

  if (!groups) {
    Object.entries(metaMap).forEach(([key, meta]) => {
      formEl.appendChild(buildControlRow(key, meta, { idPrefix, dataAttr, infoIconTemplate }));
    });
    initTooltips(formEl);
    return { resetGroupKeys: null };
  }

  const resetGroupKeys = new Map();

  const allKeys = Object.keys(metaMap);
  const usedKeys = new Set();

  groups.forEach(({ title, description, keys }, index) => {
    const groupKeys = (Array.isArray(keys) ? keys : []).filter((k) => metaMap[k]);
    if (groupKeys.length === 0) return;

    const groupId = `group_${index}`;
    resetGroupKeys.set(groupId, groupKeys);
    const { group, stack } = createControlGroup(optionGroupTemplate, title, groupId, description);

    groupKeys.forEach((key) => {
      usedKeys.add(key);
      stack.appendChild(buildControlRow(key, metaMap[key], { idPrefix, dataAttr, infoIconTemplate }));
    });

    formEl.appendChild(group);
  });

  const remainingKeys = allKeys.filter((k) => !usedKeys.has(k));
  if (remainingKeys.length) {
    const groupId = "group_other";
    resetGroupKeys.set(groupId, remainingKeys);
    const { group, stack } = createControlGroup(
      optionGroupTemplate,
      "Other",
      groupId,
      "Additional options that don’t fit into the groups above.",
    );
    remainingKeys.forEach((key) => {
      stack.appendChild(buildControlRow(key, metaMap[key], { idPrefix, dataAttr, infoIconTemplate }));
    });
    formEl.appendChild(group);
  }

  initTooltips(formEl);

  return { resetGroupKeys };
}

export function getStateFromForm(formEl, defaults, metaMap, dataAttr) {
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

export function setFormFromState(formEl, state, metaMap, dataAttr, { defaultState } = {}) {
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
      const defaultValue = defaultState ? defaultState[key] : undefined;
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
