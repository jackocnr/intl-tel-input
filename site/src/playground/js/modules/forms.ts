import { deepClone, parseJsonParam, safeStringify } from "./stateUtils";
// Add a single event listener for all enable spans
// Listener toggles the adjacent checkbox
document.addEventListener("click", function (e) {
  const target = e.target as HTMLElement;
  if (target?.classList?.contains("form-check-enable-span")) {
    const checkbox = target.previousElementSibling as HTMLInputElement | null;
    if (checkbox && checkbox.type === "checkbox") {
      checkbox.checked = !checkbox.checked;
      // Optionally trigger change event if needed
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
});

function initTooltips(container: Element | null) {
  if (!container) {
    return;
  }

  container.querySelectorAll<HTMLElement>("[data-bs-toggle='tooltip']").forEach((el) => {
    const existing = window.bootstrap.Tooltip.getInstance(el);
    if (existing) {
      existing.dispose();
    }

    // Manual trigger: the tooltip's ::after extends its hit area to fully cover
    // the icon, so the whole icon+gap+tooltip region behaves as one hover zone.
    // Show on icon hover, hide only once the cursor leaves that combined zone.
    const tooltip = new window.bootstrap.Tooltip(el, {
      trigger: "manual",
      html: true,
      customClass: "iti-playground-tooltip-interactive",
    });

    el.addEventListener("mouseenter", () => tooltip.show());
    el.addEventListener("focus", () => tooltip.show());
    el.addEventListener("blur", () => tooltip.hide());

    el.addEventListener("inserted.bs.tooltip", () => {
      // `tip` is an internal property exposing the popup element after insertion.
      const tipEl = (tooltip as unknown as { tip: HTMLElement | null }).tip;
      if (!tipEl || tipEl.dataset.itiHoverBound === "1") {
        return;
      }
      tipEl.dataset.itiHoverBound = "1";
      tipEl.addEventListener("mouseleave", () => tooltip.hide());
    });
  });
}

function cloneInfoIconSvg(infoIconTemplate: HTMLTemplateElement | null) {
  if (!infoIconTemplate || !infoIconTemplate.content) {
    return null;
  }
  const svg = infoIconTemplate.content.querySelector("svg");
  return svg ? svg.cloneNode(true) : null;
}

function createInfoIcon(key: string, meta: any, infoIconTemplate: HTMLTemplateElement | null) {
  const text = String(meta && meta.tooltip ? meta.tooltip : "").trim();
  if (!text) {
    return null;
  }
  const icon = document.createElement("span");
  icon.className = "iti-playground-info";

  const svg = cloneInfoIconSvg(infoIconTemplate);
  if (svg) {
    icon.appendChild(svg);
  }

  const slug = String(key || "").toLowerCase();
  const html = slug
    ? `${text} <a href="/docs/options#${slug}" target="_blank" rel="noopener">Docs&nbsp;»</a>`
    : text;

  icon.tabIndex = 0;
  icon.setAttribute("role", "button");
  icon.setAttribute("aria-label", text);
  icon.setAttribute("data-bs-toggle", "tooltip");
  icon.setAttribute("data-bs-placement", "top");
  icon.setAttribute("data-bs-html", "true");
  icon.setAttribute("title", html);
  return icon;
}

function buildLabelGroup(key: string, meta: any, { labelText, htmlFor, labelClassName, infoIconTemplate }: any) {
  const group = document.createElement("div");
  group.className = "iti-playground-labelgroup";

  const label = document.createElement("label");
  label.className = labelClassName;
  label.htmlFor = htmlFor;
  label.textContent = labelText;

  group.appendChild(label);

  const infoIcon = createInfoIcon(key, meta, infoIconTemplate);
  if (infoIcon) {
    group.appendChild(infoIcon);
  }

  return group;
}

function buildBooleanExampleControl(key: string, meta: any, { idPrefix, dataAttr, exampleText, infoIconTemplate }: any) {
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

  // this must be a span as we already have a label for this checkbox
  const enableSpan = document.createElement("span");
  enableSpan.className = "form-check-enable-span";
  enableSpan.textContent = "Enable example code";

  checkboxRow.appendChild(checkbox);
  checkboxRow.appendChild(enableSpan);

  wrapper.appendChild(
    buildLabelGroup(key, meta, {
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

function formatMultiDropdownSelection(values: any) {
  const items = Array.isArray(values) ? values : [];
  if (items.length === 0) {
    return "None";
  }
  if (items.length <= 2) {
    return items.join(", ");
  }
  return `${items.length} selected`;
}

function buildControlRow(key: string, meta: any, { idPrefix, dataAttr, infoIconTemplate }: any) {
  const wrapper = document.createElement("div");

  if (meta.type === "boolean") {
    if (key === "loadUtils") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: "() => import(\"intl-tel-input/utils\")",
      });
    }

    if (key === "customPlaceholder") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: [
          "(exampleNumber) => exampleNumber",
          "  ? exampleNumber.replace(/\\d/g, 'X')",
          "  : 'Enter number'",
        ].join("\n"),
      });
    }

    if (key === "geoIpLookup") {
      return buildBooleanExampleControl(key, meta, {
        idPrefix,
        dataAttr,
        infoIconTemplate,
        exampleText: [
          "async () => {",
          "  const res = await fetch(\"https://ipapi.co/json\");",
          "  const data = await res.json();",
          "  return data.country_code;",
          "}",
        ].join("\n"),
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
      buildLabelGroup(key, meta, {
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
    buildLabelGroup(key, meta, {
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

    meta.options.forEach((value: string) => {
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

    meta.options.forEach((value: string) => {
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
      const selected = [...dropdown.querySelectorAll<HTMLInputElement>("input[type=\"checkbox\"]:checked")].map((el) => el.value);
      button.textContent = formatMultiDropdownSelection(selected);
    });

    return wrapper;
  }

  if (meta.type === "json") {
    if (Array.isArray(meta.multiCombobox) && meta.multiCombobox.length > 0) {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.id = `${idPrefix}_${key}`;
      hiddenInput.setAttribute(dataAttr, key);
      wrapper.appendChild(attachMultiCombobox(hiddenInput, meta.multiCombobox, { draggable: Boolean(meta.draggable) }));
      return wrapper;
    }

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
    if (meta.placeholder) {
      numberInput.placeholder = meta.placeholder;
    }
    wrapper.appendChild(numberInput);
    return wrapper;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.id = `${idPrefix}_${key}`;
  input.setAttribute(dataAttr, key);
  if (meta.placeholder) {
    input.placeholder = meta.placeholder;
  }

  if (Array.isArray(meta.datalist) && meta.datalist.length > 0) {
    wrapper.appendChild(attachCombobox(input, meta.datalist));
  } else {
    wrapper.appendChild(input);
  }

  return wrapper;
}

// Custom combobox: text input + filterable suggestion list. Unlike the native
// <datalist>, the popup is a regular DOM element under our control, so it
// doesn't get dismissed by validation classes, hint mutations, or live-demo
// reinits elsewhere on the page.
function attachCombobox(input: HTMLInputElement, options: Array<{ value: string; label?: string }>) {
  const container = document.createElement("div");
  container.className = "iti-playground-combobox";

  const menu = document.createElement("ul");
  menu.className = "iti-playground-combobox-menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;

  const listboxId = `${input.id}_listbox`;
  menu.id = listboxId;
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-controls", listboxId);
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("autocomplete", "off");

  const optionEls: HTMLLIElement[] = [];
  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.className = "iti-playground-combobox-option";
    li.id = `${listboxId}_${i}`;
    li.setAttribute("role", "option");
    li.dataset.value = opt.value;

    const valueEl = document.createElement("span");
    valueEl.className = "iti-playground-combobox-value";
    valueEl.textContent = opt.value;
    li.appendChild(valueEl);

    if (opt.label) {
      const labelEl = document.createElement("span");
      labelEl.className = "iti-playground-combobox-label";
      labelEl.textContent = opt.label;
      li.appendChild(labelEl);
    }

    menu.appendChild(li);
    optionEls.push(li);
  });

  let activeIndex = -1;

  function setActive(newIndex: number) {
    if (activeIndex >= 0 && optionEls[activeIndex]) {
      optionEls[activeIndex].classList.remove("is-active");
    }
    activeIndex = newIndex;
    if (activeIndex >= 0 && optionEls[activeIndex]) {
      const li = optionEls[activeIndex];
      li.classList.add("is-active");
      input.setAttribute("aria-activedescendant", li.id);
      li.scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function filter(query: string) {
    const q = query.toLowerCase().trim();
    optionEls.forEach((el) => {
      const value = (el.dataset.value || "").toLowerCase();
      const label = el.querySelector(".iti-playground-combobox-label")?.textContent?.toLowerCase() || "";
      el.hidden = q !== "" && !value.includes(q) && !label.includes(q);
    });
    setActive(-1);
  }

  function getVisible() {
    return optionEls.filter((el) => !el.hidden);
  }

  function open() {
    if (!menu.hidden) {
      return;
    }
    menu.hidden = false;
    input.setAttribute("aria-expanded", "true");
    filter(input.value);
  }

  function close() {
    if (menu.hidden) {
      return;
    }
    menu.hidden = true;
    input.setAttribute("aria-expanded", "false");
    setActive(-1);
  }

  function selectOption(li: HTMLLIElement) {
    const value = li.dataset.value || "";
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    close();
    input.focus();
  }

  input.addEventListener("focus", open);
  input.addEventListener("click", open);
  input.addEventListener("input", () => {
    open();
    filter(input.value);
  });

  input.addEventListener("keydown", (e) => {
    const visible = getVisible();
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        open();
        if (visible.length === 0) {
          return;
        }
        const curr = activeIndex >= 0 ? visible.indexOf(optionEls[activeIndex]) : -1;
        const next = curr < visible.length - 1 ? curr + 1 : 0;
        setActive(optionEls.indexOf(visible[next]));
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        open();
        if (visible.length === 0) {
          return;
        }
        const curr = activeIndex >= 0 ? visible.indexOf(optionEls[activeIndex]) : -1;
        const prev = curr > 0 ? curr - 1 : visible.length - 1;
        setActive(optionEls.indexOf(visible[prev]));
        break;
      }
      case "Enter":
        if (!menu.hidden && activeIndex >= 0 && !optionEls[activeIndex].hidden) {
          e.preventDefault();
          selectOption(optionEls[activeIndex]);
        }
        break;
      case "Escape":
        if (!menu.hidden) {
          e.preventDefault();
          close();
        }
        break;
      case "Tab":
        close();
        break;
    }
  });

  // mousedown prevents the input from blurring before the click handler runs.
  menu.addEventListener("mousedown", (e) => e.preventDefault());

  menu.addEventListener("click", (e) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>(".iti-playground-combobox-option");
    if (li && optionEls.includes(li)) {
      selectOption(li);
    }
  });

  input.addEventListener("blur", () => {
    // setTimeout lets click events on menu options register before we close.
    setTimeout(() => {
      if (!container.contains(document.activeElement)) {
        close();
      }
    }, 0);
  });

  document.addEventListener("mousedown", (e) => {
    if (!container.contains(e.target as Node)) {
      close();
    }
  });

  container.appendChild(input);
  container.appendChild(menu);

  return container;
}

// Multi-select combobox: chip-style selected items + filterable suggestion list.
// Stores the underlying value as a JSON-stringified array on the hidden input, so
// existing JSON form-state plumbing (URL/share, code-snippet diffing) works unchanged.
// Optionally allows drag-and-drop reordering of chips (used by countryOrder).
function attachMultiCombobox(
  hiddenInput: HTMLInputElement,
  options: Array<{ value: string; label?: string }>,
  { draggable = false }: { draggable?: boolean } = {},
): HTMLElement {
  const container = document.createElement("div");
  container.className = "iti-playground-multi-combobox";

  // Chip strip + filter input. Styled like a form-control so it blends in.
  const control = document.createElement("div");
  control.className = "iti-playground-multi-combobox-control form-control";
  container.appendChild(control);

  const filter = document.createElement("input");
  filter.type = "text";
  filter.className = "iti-playground-multi-combobox-filter";
  filter.placeholder = "type to add…";
  filter.id = `${hiddenInput.id}_filter`;
  filter.setAttribute("role", "combobox");
  filter.setAttribute("autocomplete", "off");
  control.appendChild(filter);

  // Suggestion menu — reuses the single-combobox option styling.
  const menu = document.createElement("ul");
  menu.className = "iti-playground-combobox-menu iti-playground-multi-combobox-menu";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;
  container.appendChild(menu);

  const optionEls = new Map<string, HTMLLIElement>();
  options.forEach((opt) => {
    const li = document.createElement("li");
    li.className = "iti-playground-combobox-option";
    li.dataset.value = opt.value;
    li.setAttribute("role", "option");

    const valueEl = document.createElement("span");
    valueEl.className = "iti-playground-combobox-value";
    valueEl.textContent = opt.value;
    li.appendChild(valueEl);

    if (opt.label) {
      const labelEl = document.createElement("span");
      labelEl.className = "iti-playground-combobox-label";
      labelEl.textContent = opt.label;
      li.appendChild(labelEl);
    }

    menu.appendChild(li);
    optionEls.set(opt.value, li);
  });

  let selected: string[] = [];
  let activeIndex = -1;

  function updateHiddenInput(dispatch = true) {
    hiddenInput.value = selected.length === 0 ? "" : JSON.stringify(selected);
    if (dispatch) {
      hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));
      hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function getChipLabel(value: string) {
    return optionEls.get(value)?.querySelector(".iti-playground-combobox-label")?.textContent || value;
  }

  function renderChips() {
    [...control.querySelectorAll(".iti-playground-multi-combobox-chip")].forEach((el) => el.remove());
    selected.forEach((value) => {
      const chip = document.createElement("span");
      chip.className = "iti-playground-multi-combobox-chip";
      chip.dataset.value = value;
      if (draggable) {
        chip.draggable = true;
        chip.title = "Drag to reorder";
        setupDragHandlers(chip);
      }

      const codeEl = document.createElement("span");
      codeEl.className = "iti-playground-multi-combobox-chip-code";
      codeEl.textContent = value;
      chip.appendChild(codeEl);

      const labelEl = document.createElement("span");
      labelEl.className = "iti-playground-multi-combobox-chip-label";
      labelEl.textContent = getChipLabel(value);
      chip.appendChild(labelEl);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "iti-playground-multi-combobox-chip-remove";
      removeBtn.setAttribute("aria-label", `Remove ${value}`);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeValue(value);
      });
      chip.appendChild(removeBtn);

      control.insertBefore(chip, filter);
    });
  }

  function syncMenuSelectionState() {
    optionEls.forEach((el, value) => {
      el.classList.toggle("is-selected", selected.includes(value));
    });
  }

  function filterMenu(query: string) {
    const q = query.toLowerCase().trim();
    optionEls.forEach((el, value) => {
      if (selected.includes(value)) {
        el.hidden = true;
        return;
      }
      const label = el.querySelector(".iti-playground-combobox-label")?.textContent?.toLowerCase() || "";
      el.hidden = q !== "" && !value.toLowerCase().includes(q) && !label.includes(q);
    });
    setActive(-1);
  }

  function getVisible() {
    return [...optionEls.values()].filter((el) => !el.hidden);
  }

  function setActive(idx: number) {
    const visible = getVisible();
    visible.forEach((el) => el.classList.remove("is-active"));
    activeIndex = idx;
    if (idx >= 0 && idx < visible.length) {
      visible[idx].classList.add("is-active");
      visible[idx].scrollIntoView({ block: "nearest" });
    }
  }

  function addValue(value: string) {
    if (selected.includes(value) || !optionEls.has(value)) {
      return;
    }
    selected.push(value);
    renderChips();
    filter.value = "";
    filterMenu("");
    syncMenuSelectionState();
    updateHiddenInput();
    filter.focus();
  }

  function removeValue(value: string) {
    selected = selected.filter((v) => v !== value);
    renderChips();
    filterMenu(filter.value);
    syncMenuSelectionState();
    updateHiddenInput();
    filter.focus();
  }

  function openMenu() {
    menu.hidden = false;
  }

  function closeMenu() {
    menu.hidden = true;
    setActive(-1);
  }

  // Drag-and-drop reordering: each chip is the drop target. Drop position is
  // determined by mouse x relative to the chip's center (before vs. after).
  let dragValue: string | null = null;
  function clearDropTargets() {
    [...control.querySelectorAll(".is-drop-target-before, .is-drop-target-after")].forEach((el) => {
      el.classList.remove("is-drop-target-before", "is-drop-target-after");
    });
  }
  function setupDragHandlers(chip: HTMLElement) {
    chip.addEventListener("dragstart", (e) => {
      dragValue = chip.dataset.value || null;
      chip.classList.add("is-dragging");
      if (e.dataTransfer) {
        e.dataTransfer.setData("text/plain", dragValue || "");
        e.dataTransfer.effectAllowed = "move";
      }
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("is-dragging");
      clearDropTargets();
      dragValue = null;
    });
    chip.addEventListener("dragover", (e) => {
      if (!dragValue || chip.dataset.value === dragValue) {
        return;
      }
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
      }
      const rect = chip.getBoundingClientRect();
      const isAfter = e.clientX > rect.left + rect.width / 2;
      clearDropTargets();
      chip.classList.add(isAfter ? "is-drop-target-after" : "is-drop-target-before");
    });
    chip.addEventListener("dragleave", () => {
      chip.classList.remove("is-drop-target-before", "is-drop-target-after");
    });
    chip.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!dragValue || chip.dataset.value === dragValue) {
        return;
      }
      const dropAfter = chip.classList.contains("is-drop-target-after");
      const targetValue = chip.dataset.value!;
      const without = selected.filter((v) => v !== dragValue);
      const targetIdx = without.indexOf(targetValue);
      without.splice(dropAfter ? targetIdx + 1 : targetIdx, 0, dragValue);
      selected = without;
      clearDropTargets();
      renderChips();
      updateHiddenInput();
    });
  }

  filter.addEventListener("focus", openMenu);
  filter.addEventListener("click", openMenu);
  filter.addEventListener("input", () => {
    openMenu();
    filterMenu(filter.value);
  });
  filter.addEventListener("keydown", (e) => {
    const visible = getVisible();
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        openMenu();
        if (visible.length === 0) {
          return;
        }
        setActive(activeIndex < visible.length - 1 ? activeIndex + 1 : 0);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        openMenu();
        if (visible.length === 0) {
          return;
        }
        setActive(activeIndex > 0 ? activeIndex - 1 : visible.length - 1);
        break;
      }
      case "Enter":
        if (!menu.hidden && activeIndex >= 0 && visible[activeIndex]) {
          e.preventDefault();
          const value = visible[activeIndex].dataset.value;
          if (value) {
            addValue(value);
          }
        }
        break;
      case "Escape":
        if (!menu.hidden) {
          e.preventDefault();
          closeMenu();
        }
        break;
      case "Backspace":
        if (filter.value === "" && selected.length > 0) {
          e.preventDefault();
          removeValue(selected[selected.length - 1]);
        }
        break;
    }
  });

  // mousedown rather than click prevents filter input from blurring first.
  menu.addEventListener("mousedown", (e) => e.preventDefault());
  menu.addEventListener("click", (e) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>(".iti-playground-combobox-option");
    if (li?.dataset.value) {
      addValue(li.dataset.value);
    }
  });

  control.addEventListener("click", (e) => {
    // Clicking the chip-strip gaps (not on a chip or button) focuses the filter.
    if (e.target === control) {
      filter.focus();
    }
  });

  document.addEventListener("mousedown", (e) => {
    if (!container.contains(e.target as Node)) {
      closeMenu();
    }
  });

  // External API used by setFormFromState to push state back into the chips.
  (hiddenInput as any).__multiCombobox = {
    setValues(arr: unknown) {
      const next = Array.isArray(arr) ? arr.filter((v) => typeof v === "string" && optionEls.has(v)) as string[] : [];
      selected = next;
      renderChips();
      filter.value = "";
      filterMenu("");
      syncMenuSelectionState();
      // Don't dispatch — this is an external set, not a user edit.
      updateHiddenInput(false);
    },
  };

  // Hidden input lives outside the visible control so the listeners on `control`
  // don't fire on it (it has no rendered surface anyway).
  container.insertBefore(hiddenInput, control);

  // Initialize from any pre-existing value on the hidden input (URL load path).
  if (hiddenInput.value) {
    try {
      const parsed = JSON.parse(hiddenInput.value);
      if (Array.isArray(parsed)) {
        selected = parsed.filter((v) => typeof v === "string" && optionEls.has(v));
        renderChips();
        syncMenuSelectionState();
      }
    } catch {
      // Ignore — leave selected empty.
    }
  }

  return container;
}

function createControlGroup(optionGroupTemplate: HTMLTemplateElement, title: string, groupId: string, description: string, { icon = null }: { icon?: string | null } = {}) {
  const slugify = (text: string) => String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const root = optionGroupTemplate.content.firstElementChild as Element;
  const group = root.cloneNode(true) as Element;

  const titleEl = group.querySelector<HTMLElement>("[data-role=\"title\"]");
  const slug = slugify(title);
  if (titleEl) {
    titleEl.id = slug;
    titleEl.textContent = "";

    if (icon) {
      const iconEl = document.createElement("i");
      iconEl.className = `bi ${icon} text-muted me-2`;
      iconEl.setAttribute("aria-hidden", "true");
      titleEl.appendChild(iconEl);
    }

    const link = document.createElement("a");
    link.href = `#${slug}`;
    link.className = "header-anchor";
    link.textContent = title;

    titleEl.appendChild(link);
  }

  const descEl = group.querySelector<HTMLElement>("[data-role=\"description\"]")!;
  descEl.textContent = description;

  const resetButton = group.querySelector("[data-role=\"reset\"]")!;
  resetButton.setAttribute("data-playground-reset-group", String(groupId));

  const stack = group.querySelector("[data-role=\"stack\"]")!;

  return { group, stack };
}

export function renderControls(formEl: HTMLElement | null, metaMap: Record<string, any>, { idPrefix, dataAttr, groups = null, templates = {} }: { idPrefix?: string; dataAttr?: string; groups?: any; templates?: any } = {}) {
  if (!formEl) {
    return { resetGroupKeys: null };
  }
  formEl.innerHTML = "";

  const { infoIconTemplate, optionGroupTemplate } = templates;

  if (!groups) {
    Object.entries(metaMap).forEach(([key, meta]: [string, any]) => {
      formEl.appendChild(buildControlRow(key, meta, { idPrefix, dataAttr, infoIconTemplate }));
    });
    initTooltips(formEl);
    return { resetGroupKeys: null };
  }

  const resetGroupKeys = new Map();

  const allKeys = Object.keys(metaMap);
  const usedKeys = new Set();

  groups.forEach(({ title, description, keys, icon }: any, index: number) => {
    const groupKeys = (Array.isArray(keys) ? keys : []).filter((k: string) => metaMap[k]);
    if (groupKeys.length === 0) {
      return;
    }

    const groupId = `group_${index}`;
    resetGroupKeys.set(groupId, groupKeys);
    const { group, stack } = createControlGroup(optionGroupTemplate, title, groupId, description, { icon });

    groupKeys.forEach((key: string) => {
      usedKeys.add(key);
      stack.appendChild(buildControlRow(key, metaMap[key], { idPrefix, dataAttr, infoIconTemplate }));
    });

    formEl.appendChild(group);
  });

  const remainingKeys = allKeys.filter((k: string) => !usedKeys.has(k));
  if (remainingKeys.length) {
    const groupId = "group_other";
    resetGroupKeys.set(groupId, remainingKeys);
    const { group, stack } = createControlGroup(
      optionGroupTemplate,
      "Other",
      groupId,
      "Additional options that don’t fit into the groups above.",
      { icon: "bi-question-circle" },
    );
    remainingKeys.forEach((key: string) => {
      stack.appendChild(buildControlRow(key, metaMap[key], { idPrefix, dataAttr, infoIconTemplate }));
    });
    formEl.appendChild(group);
  }

  initTooltips(formEl);

  return { resetGroupKeys };
}

export function getStateFromForm(formEl: HTMLElement | null, defaults: Record<string, any>, metaMap: Record<string, any>, dataAttr: string) {
  const state = deepClone(defaults);
  if (!formEl) {
    return state;
  }

  Object.entries(metaMap).forEach(([key, meta]: [string, any]) => {
    if (meta.type === "multidropdown") {
      const root = formEl.querySelector(`[data-multidropdown="${key}"]`);
      if (!root) {
        return;
      }

      const checked = [...root.querySelectorAll<HTMLInputElement>("input[type=\"checkbox\"]:checked")].map((el) => el.value);

      // Keep ordering stable by always following the dropdown option order.
      const optionOrder: string[] = meta && Array.isArray(meta.options) ? meta.options : [];
      const indexByValue = new Map<string, number>(optionOrder.map((v, i) => [v, i]));
      checked.sort(
        (a, b) => (indexByValue.get(a) ?? Number.MAX_SAFE_INTEGER) - (indexByValue.get(b) ?? Number.MAX_SAFE_INTEGER),
      );

      state[key] = checked;
      return;
    }

    const control = formEl.querySelector<HTMLInputElement>(`[${dataAttr}="${key}"]`);
    if (!control) {
      return;
    }

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

export function setFormFromState(formEl: HTMLElement | null, state: Record<string, any>, metaMap: Record<string, any>, dataAttr: string, { defaultState }: { defaultState?: Record<string, any> } = {}) {
  if (!formEl) {
    return;
  }

  Object.entries(metaMap).forEach(([key, meta]) => {
    if (meta.type === "multidropdown") {
      const values = new Set(Array.isArray(state[key]) ? state[key] : []);
      const root = formEl.querySelector(`[data-multidropdown="${key}"]`);
      if (!root) {
        return;
      }

      root.querySelectorAll<HTMLInputElement>("input[type=\"checkbox\"]").forEach((el) => {
        el.checked = values.has(el.value);
      });

      const button = root.querySelector("button[data-bs-toggle=\"dropdown\"]");
      if (button) {
        const optionOrder: string[] = meta && Array.isArray(meta.options) ? meta.options : [];
        const ordered = optionOrder.filter((v: string) => values.has(v));
        button.textContent = formatMultiDropdownSelection(ordered);
      }
      return;
    }

    const control = formEl.querySelector<HTMLInputElement>(`[${dataAttr}="${key}"]`);
    if (!control) {
      return;
    }

    if (meta.type === "boolean") {
      control.checked = Boolean(state[key]);
    } else if (meta.type === "text") {
      control.value = state[key] ?? "";
    } else if (meta.type === "number") {
      control.value = state[key] === "" || state[key] === null || state[key] === undefined ? "" : String(state[key]);
    } else if (meta.type === "select") {
      control.value = state[key] ?? "";
    } else if (meta.type === "json") {
      const multiComboboxApi = (control as any).__multiCombobox;
      if (multiComboboxApi) {
        multiComboboxApi.setValues(state[key]);
        return;
      }
      const value = state[key];
      const defaultValue = defaultState ? defaultState[key] : undefined;
      const isEmptyArray = (v: unknown): boolean => Array.isArray(v) && v.length === 0;
      const isEmptyObject = (v: unknown): boolean => Boolean(v) && typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0;
      if (isEmptyArray(value) && isEmptyArray(defaultValue)) {
        control.value = "";
      } else if (isEmptyObject(value) && isEmptyObject(defaultValue)) {
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
