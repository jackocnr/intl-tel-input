import {
  I18N_LANGUAGE_CODES,
  UTILS_PATH,
  I18N_DIR_HASH,
} from "../../../tmp/playground/playgroundConstants.js";

import { createI18nOptionLabels } from "./modules/i18n";
import { renderControls, getStateFromForm, setFormFromState } from "./modules/forms";
import { renderInitCodeFromState, type Integration } from "./modules/initCode";
import { createPlaygroundConfig } from "./modules/playgroundConfig";
import { ItiPlaygroundController } from "./modules/itiController";
import {
  createDefaultState,
  deepClone,
  parseBooleanParam,
  parseQueryOverrides,
} from "./modules/stateUtils";
import { updateUrlFromState } from "./modules/urlState";

const telInput = document.querySelector<HTMLInputElement>("#playgroundPhone")!;
const playgroundContainer = document.querySelector<HTMLElement>("#itiPlayground")!;
const keepDropdownOpenCheckbox = document.querySelector<HTMLInputElement>("#playgroundKeepDropdownOpen")!;
const keepDropdownOpenWrapper = keepDropdownOpenCheckbox.closest<HTMLElement>(".playground-dropdown-checkbox")!;
const optionsForm = document.querySelector<HTMLFormElement>("#playgroundOptions")!;
const attrsForm = document.querySelector<HTMLFormElement>("#playgroundAttributes")!;
const resetAllButton = document.querySelector<HTMLButtonElement>("#playgroundResetAll");
const shareButton = document.querySelector<HTMLButtonElement>("#playgroundShareBtn");
const resetAttrsButton = document.querySelector<HTMLButtonElement>("#playgroundResetAttrs");
const initCodeEl = document.querySelector<HTMLElement>("#playgroundInitCode")!;
const integrationTabs = document.querySelectorAll<HTMLButtonElement>(".iti-playground-integration-tabs [data-integration]");

const INTEGRATION_VALUES = new Set<Integration>(["vanilla", "react", "vue", "angular", "svelte"]);
const INTEGRATION_STORAGE_KEY = "iti.playground.integration";

function isIntegration(value: string | null | undefined): value is Integration {
  return !!value && INTEGRATION_VALUES.has(value as Integration);
}

function readInitialIntegration(): Integration {
  const fromUrl = new URLSearchParams(window.location.search).get("integration");
  if (isIntegration(fromUrl)) {
    return fromUrl;
  }
  try {
    const fromStorage = window.localStorage.getItem(INTEGRATION_STORAGE_KEY);
    if (isIntegration(fromStorage)) {
      return fromStorage;
    }
  } catch {
    // localStorage may be unavailable (private mode, sandboxed iframe) — fall through.
  }
  return "vanilla";
}

let currentIntegration: Integration = readInitialIntegration();

function persistIntegration(value: Integration) {
  try {
    window.localStorage.setItem(INTEGRATION_STORAGE_KEY, value);
  } catch {
    // ignore — see readInitialIntegration
  }
  const url = new URL(window.location.href);
  if (value === "vanilla") {
    url.searchParams.delete("integration");
  } else {
    url.searchParams.set("integration", value);
  }
  if (url.search !== window.location.search) {
    window.history.replaceState(null, "", url);
  }
}
const infoIconTemplate = document.querySelector<HTMLTemplateElement>("#itiPlaygroundInfoIconTemplate");
const optionGroupTemplate = document.querySelector<HTMLTemplateElement>("#itiPlaygroundOptionGroupTemplate");
const iso2ModalEl = document.querySelector<HTMLElement>("#itiPlaygroundIso2Modal");
const iso2ModalTableBody = document.querySelector<HTMLElement>("#itiPlaygroundIso2ModalTableBody");
const iso2ModalSearch = document.querySelector<HTMLInputElement>("#itiPlaygroundIso2ModalSearch");

const KEEP_DROPDOWN_OPEN_PARAM = "keepDropdownOpen";

const presetsSelect = document.querySelector<HTMLSelectElement>("#playgroundPresetsSelect");
if (presetsSelect) {
  presetsSelect.addEventListener("change", function (this: HTMLSelectElement) {
    if (this.value) {
      window.location.href = this.value;
    }
    // reset the selection, as the longer option text doesn't fit in the box
    presetsSelect.selectedIndex = 0;
  });
}

function flashActionButtonLabel(buttonEl: HTMLButtonElement | null, temporaryLabel: string) {
  if (!buttonEl) {
    return;
  }

  const labelEl = (buttonEl.querySelector<HTMLElement>("[data-role=\"label\"]") || buttonEl) as HTMLElement;
  const originalLabel = labelEl.textContent;

  labelEl.textContent = temporaryLabel;
  buttonEl.disabled = true;

  window.setTimeout(() => {
    labelEl.textContent = originalLabel;
    buttonEl.disabled = false;
  }, 2000);
}

function getKeepDropdownOpenDisabledReason(state) {
  if (state.useFullscreenPopup) {
    return "Disabled because useFullscreenPopup is on — the dropdown becomes a modal popup.";
  }
  if (!state.allowDropdown) {
    return "Disabled because allowDropdown is off — there is no dropdown to keep open.";
  }
  if (state.dropdownContainer) {
    return "Disabled because dropdownContainer uses position:fixed, which wouldn't work on a scrollable page.";
  }
  return null;
}

function shouldDisableKeepDropdownOpen(state) {
  return getKeepDropdownOpenDisabledReason(state) !== null;
}

let keepDropdownOpenTooltip: InstanceType<typeof window.bootstrap.Tooltip> | null = null;
let keepDropdownOpenTooltipCleanup: (() => void) | null = null;
function disposeKeepDropdownOpenTooltip() {
  if (keepDropdownOpenTooltipCleanup) {
    keepDropdownOpenTooltipCleanup();
    keepDropdownOpenTooltipCleanup = null;
  }
  if (keepDropdownOpenTooltip) {
    keepDropdownOpenTooltip.dispose();
    keepDropdownOpenTooltip = null;
  }
}

function syncKeepDropdownOpenAvailability(state) {
  const reason = getKeepDropdownOpenDisabledReason(state);
  const disabled = reason !== null;
  keepDropdownOpenCheckbox.disabled = disabled;
  keepDropdownOpenWrapper.classList.toggle("is-disabled", disabled);

  // Bootstrap Tooltip won't render with an empty title, so dispose+recreate
  // each time the reason changes rather than try to update an existing instance.
  disposeKeepDropdownOpenTooltip();
  if (reason) {
    keepDropdownOpenTooltip = new window.bootstrap.Tooltip(keepDropdownOpenWrapper, {
      title: reason,
      trigger: "click",
    });

    const onDocumentMousedown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && !keepDropdownOpenWrapper.contains(target)) {
        keepDropdownOpenTooltip?.hide();
      }
    };
    const onShown = () => document.addEventListener("mousedown", onDocumentMousedown);
    const onHidden = () => document.removeEventListener("mousedown", onDocumentMousedown);
    keepDropdownOpenWrapper.addEventListener("shown.bs.tooltip", onShown);
    keepDropdownOpenWrapper.addEventListener("hidden.bs.tooltip", onHidden);
    keepDropdownOpenTooltipCleanup = () => {
      keepDropdownOpenWrapper.removeEventListener("shown.bs.tooltip", onShown);
      keepDropdownOpenWrapper.removeEventListener("hidden.bs.tooltip", onHidden);
      document.removeEventListener("mousedown", onDocumentMousedown);
    };
  }

  if (disabled && keepDropdownOpenCheckbox.checked) {
    keepDropdownOpenCheckbox.checked = false;
    syncKeepDropdownOpen();
  }
}

function getFullState(state) {
  return {
    ...(state || {}),
    dropdownAlwaysOpen:
      Boolean(keepDropdownOpenCheckbox.checked) &&
      !shouldDisableKeepDropdownOpen(state),
  };
}

function getKeepDropdownOpenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseBooleanParam(params.get(KEEP_DROPDOWN_OPEN_PARAM), true);
}

function updateKeepDropdownOpenUrlParam(enabled) {
  const currentUrl = new URL(window.location.href);
  if (enabled) {
    // Keep the URL clean: omit the param when true (default).
    currentUrl.searchParams.delete(KEEP_DROPDOWN_OPEN_PARAM);
  } else {
    // Only include the param when false.
    currentUrl.searchParams.set(KEEP_DROPDOWN_OPEN_PARAM, "false");
  }

  const nextUrl = currentUrl;
  const compareUrl = new URL(window.location.href);
  if (compareUrl.search === nextUrl.search) {
    return;
  }
  window.history.replaceState(null, "", nextUrl);
}

// set the checkbox state from the URL param on initial load (default checked)
keepDropdownOpenCheckbox.checked = getKeepDropdownOpenFromUrl();

const syncKeepDropdownOpen = () => {
  // when keeping the dropdown open, use a CSS class to update the page layout
  playgroundContainer.classList.toggle(
    "iti-playground--keep-dropdown-open",
    keepDropdownOpenCheckbox.checked,
  );
  updateKeepDropdownOpenUrlParam(keepDropdownOpenCheckbox.checked);
};
keepDropdownOpenCheckbox.addEventListener("change", () => {
  syncKeepDropdownOpen();
  scheduleReinit();
});
syncKeepDropdownOpen();

if (shareButton) {
  let copiedResetTimer: number | null = null;
  const labelEl = shareButton.querySelector("[data-role=\"label\"]") || shareButton;
  const originalLabel = labelEl.textContent;

  shareButton.addEventListener("click", () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.hash = "";
    const url = shareUrl.toString();

    if (!navigator.clipboard || !window.isSecureContext) {
      return;
    }
    navigator.clipboard.writeText(url).then(
      () => {
        labelEl.textContent = "Copied URL!";
        shareButton.disabled = true;

        if (copiedResetTimer) {
          window.clearTimeout(copiedResetTimer);
        }
        copiedResetTimer = window.setTimeout(() => {
          labelEl.textContent = originalLabel;
          shareButton.disabled = false;
          copiedResetTimer = null;
        }, 2000);
      },
      () => {
        // Intentionally no UI feedback on failure.
      },
    );
  });
}

const { defaults } = window.intlTelInput;
const i18nOptionLabels = createI18nOptionLabels(I18N_LANGUAGE_CODES);

const {
  defaultInitOptions,
  playgroundInitialOptions,
  defaultInputAttributes,
  optionMeta,
  attributeMeta,
  optionGroups,
  specialOptionKeys,
} = createPlaygroundConfig({
  defaults,
  i18nLanguageCodes: I18N_LANGUAGE_CODES,
  i18nOptionLabels,
});

// Library defaults — what the user would get calling intlTelInput(input) with no options.
// Used for code-snippet diffing so the copied snippet lists every opinionated override.
const defaultState = createDefaultState(defaultInitOptions, defaultInputAttributes);
// Playground opinionated start — used for form initial state, URL diffing, and "Reset" actions.
// Keeps the first-load URL clean despite the form starting with non-library defaults.
const playgroundInitialState = createDefaultState(playgroundInitialOptions, defaultInputAttributes);

const itiController = new ItiPlaygroundController({
  telInput,
  utilsPath: UTILS_PATH,
  i18nDirHash: I18N_DIR_HASH,
  defaultInitOptions,
  specialOptionKeys,
});

function initItiWithState(state) {
  syncKeepDropdownOpenAvailability(state);
  return itiController.initWithState(getFullState(state)).then(() => syncKeepDropdownOpen());
}

const { resetGroupKeys: optionResetGroupKeys } = renderControls(optionsForm, optionMeta, {
  idPrefix: "opt",
  dataAttr: "data-option",
  groups: optionGroups,
  templates: {
    infoIconTemplate,
    optionGroupTemplate,
  },
});

// If the page is loaded with a hash, the browser can't scroll to it until after
// the option groups are rendered.
if (window.location.hash) {
  window.requestAnimationFrame(() => {
    const id = window.location.hash.replace(/^#/, "");
    const el = id ? document.getElementById(id) : null;
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "start" });
    }
  });
}

renderControls(attrsForm, attributeMeta, {
  idPrefix: "attr",
  dataAttr: "data-attr",
  templates: {
    infoIconTemplate,
  },
});

function getCombinedStateFromControls() {
  return {
    ...getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option"),
    ...getStateFromForm(attrsForm, defaultInputAttributes, attributeMeta, "data-attr"),
  };
}

const initialOptionsState = parseQueryOverrides(playgroundInitialOptions, optionMeta);
const initialAttrsState = parseQueryOverrides(defaultInputAttributes, attributeMeta);
const initialState = { ...initialOptionsState, ...initialAttrsState };

setFormFromState(optionsForm, initialState, optionMeta, "data-option", { defaultState: playgroundInitialState });
setFormFromState(attrsForm, initialState, attributeMeta, "data-attr", { defaultState: playgroundInitialState });

function syncIntegrationTabs() {
  integrationTabs.forEach((tab) => {
    const isActive = tab.dataset.integration === currentIntegration;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

syncIntegrationTabs();
integrationTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = tab.dataset.integration;
    if (!isIntegration(next) || next === currentIntegration) {
      return;
    }
    currentIntegration = next;
    persistIntegration(next);
    syncIntegrationTabs();
    renderInitCodeFromState(getCombinedStateFromControls(), initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    }, currentIntegration);
  });
});

renderInitCodeFromState(initialState, initCodeEl, {
  defaultInitOptions,
  optionMeta,
  defaultState,
  specialOptionKeys,
}, currentIntegration);

void initItiWithState(initialState);
updateUrlFromState(initialState, {
  optionMeta,
  attributeMeta,
  defaultState: playgroundInitialState,
});

const strictToastEl = document.getElementById("playgroundStrictRejectToast");
const strictToastBody = document.getElementById("playgroundStrictRejectToastBody");
if (strictToastEl && strictToastBody) {
  const strictToast = window.bootstrap.Toast.getOrCreateInstance(strictToastEl);
  telInput.addEventListener("strict:reject", (e) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    if (reason === "max-length") {
      strictToastBody.textContent = "Maximum length reached for this country";
    } else if (source === "paste") {
      strictToastBody.textContent = "Stripped invalid characters from pasted text";
    } else {
      strictToastBody.textContent = `Character not allowed: "${rejectedInput}"`;
    }
    strictToast.show();
  });
}

// Contextual hints: shown when toggling an option that has no visible effect
// until the user takes an additional action (e.g. selecting a country, typing a number).
const HINT_CONFIGS = [
  // Country Options
  {
    optionKey: "countryOrder",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  {
    optionKey: "excludeCountries",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  {
    optionKey: "geoIpLookup",
    message: "Tip: set initialCountry to \"auto\" for this to take effect.",
    shouldShow: () => getCombinedStateFromControls().initialCountry !== "auto",
  },
  {
    optionKey: "initialCountry",
    message: "Tip: enable geoIpLookup to get this working.",
    shouldShow: () => {
      const state = getCombinedStateFromControls();
      return state.initialCountry === "auto" && !state.geoIpLookup;
    },
  },
  {
    optionKey: "onlyCountries",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  // User Interface Options (allowDropdown not needed as always clear)
  {
    optionKey: "containerClass",
    message: "Tip: open devtools and inspect the Live Demo to check this is working.",
    shouldShow: () => true,
  },
  {
    optionKey: "countrySearch",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "dropdownContainer",
    message: "Tip: open devtools and inspect the Live Demo to check this is working.",
    shouldShow: () => true,
  },
  {
    optionKey: "fixDropdownWidth",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "searchInputClass",
    message: "Tip: open devtools and inspect the Live Demo to check this is working.",
    shouldShow: () => true,
  },
  {
    optionKey: "separateDialCode",
    message: "Tip: try selecting a country from the dropdown to see this in action.",
    shouldShow: () => !itiController.iti?.getSelectedCountryData(),
  },
  {
    optionKey: "showFlags",
    message: "Tip: set an initialCountry and/or enable \"Keep dropdown open\" to see this in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked && !itiController.iti?.getSelectedCountryData(),
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "useFullscreenPopup",
    message: "Tip: click the selected country to open the popup.",
    shouldShow: () => true,
  },
  // Placeholder Options
  {
    optionKey: "autoPlaceholder",
    message: () => {
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: set an initialCountry to see the placeholder.";
      }
      return "Tip: \"polite\" only differs from \"aggressive\" when the input has a placeholder attribute — set one below to see the effect.";
    },
    shouldShow: () => {
      if (!itiController.iti?.getSelectedCountryData()) {
        return true;
      }
      const state = getCombinedStateFromControls();
      return state.autoPlaceholder === "polite" && !state.placeholder;
    },
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "customPlaceholder",
    message: "Tip: set an initialCountry to see the placeholder.",
    shouldShow: () => !itiController.iti?.getSelectedCountryData(),
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "placeholderNumberType",
    message: "Tip: set an initialCountry to see the placeholder.",
    shouldShow: () => !itiController.iti?.getSelectedCountryData(),
    alsoShowOnToggleOff: true,
  },
  // Formatting Options
  {
    optionKey: "formatAsYouType",
    message: "Tip: select a country and type a phone number to see this in action.",
    shouldShow: () => !telInput.value,
  },
  {
    optionKey: "formatOnDisplay",
    message: "Tip: add a phone number in the Phone Input Attributes section below in order to see this in action.",
    shouldShow: () => !telInput.value,
  },
  {
    optionKey: "nationalMode",
    message: "Tip: set an initialCountry to see how this option formats the placeholder number differently.",
    shouldShow: () => !telInput.value && !telInput.placeholder,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "strictMode",
    message: "Tip: select a country and try typing valid/invalid characters in the input to see this in action.",
    shouldShow: () => !telInput.value,
  },
  // Validation Options
  {
    optionKey: "allowedNumberTypes",
    message: "Tip: add a phone number in the Phone Input Attributes section below in order to see this in action.",
    shouldShow: () => !telInput.value,
    isMultidropdown: true,
  },
  {
    optionKey: "allowNumberExtensions",
    message: "Tip: add a phone number in the Phone Input Attributes section below in order to see this in action.",
    shouldShow: () => !telInput.value,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "allowPhonewords",
    message: "Tip: add a phone number in the Phone Input Attributes section below in order to see this in action.",
    shouldShow: () => !telInput.value,
    alsoShowOnToggleOff: true,
  },
  // Translation Options
  {
    optionKey: "countryNameLocale",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  {
    optionKey: "i18n",
    message: "Tip: in the Live Demo section, enable \"Keep dropdown open\" to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  // Miscellaneous Options
  {
    optionKey: "hiddenInput",
    message: "Tip: open devtools and inspect the Live Demo to check this is working.",
    shouldShow: () => true,
  },
  {
    optionKey: "loadUtils",
    message: "NOTE: without utils, formatting/validation (and more) is disabled.",
    shouldShow: () => !getCombinedStateFromControls().loadUtils,
    alsoShowOnToggleOff: true,
  },
];

const hintTimers: Record<string, number | null> = {};
const pendingHintChecks = new Set<string>();
const hintOptionKeys = new Set(HINT_CONFIGS.map((c) => c.optionKey));

function findControl(optionKey: string, isMultidropdown?: boolean) {
  if (isMultidropdown) {
    return optionsForm.querySelector<HTMLInputElement>(`[data-multidropdown='${optionKey}']`);
  }
  return optionsForm.querySelector<HTMLInputElement>(`[data-option='${optionKey}']`);
}

function maybeShowHint(config: any) {
  const { optionKey, message, shouldShow } = config;
  const control = findControl(optionKey, config.isMultidropdown);
  if (!control) {
    return;
  }

  if (!config.isMultidropdown) {
    const isCheckbox = control.type === "checkbox";
    if (isCheckbox && !control.checked && !config.alsoShowOnToggleOff) {
      return;
    }
    if (!isCheckbox && !control.value.trim()) {
      return;
    }
  }

  if (!shouldShow()) {
    return;
  }

  const existing = optionsForm.querySelector(`[data-hint-option='${optionKey}']`);
  if (existing) {
    existing.remove();
  }
  if (hintTimers[optionKey]) {
    window.clearTimeout(hintTimers[optionKey]!);
  }

  const messageText = typeof message === "function" ? message() : message;
  if (!messageText) {
    return;
  }

  const hint = document.createElement("span");
  hint.className = "iti-playground-hint form-text";
  hint.setAttribute("data-hint-option", optionKey);
  hint.textContent = messageText;

  const controlWrapper = control.closest(".iti-playground-control");
  if (!controlWrapper) {
    return;
  }
  controlWrapper.appendChild(hint);

  hintTimers[optionKey] = window.setTimeout(() => {
    hint.remove();
    hintTimers[optionKey] = null;
  }, 5000);
}

const notesContainer = document.getElementById("playgroundNotes");
function updateNotesVisibility(state) {
  if (!notesContainer) {
    return;
  }
  const noteKeys = ["strictMode", "geoIpLookup"];
  let anyVisible = false;
  noteKeys.forEach((key) => {
    const el = notesContainer.querySelector(`[data-note-for="${key}"]`);
    if (!el) {
      return;
    }
    const isActive = Boolean(state[key]);
    if (isActive) {
      anyVisible = true;
    }
    el.toggleAttribute("hidden", !isActive);
  });
  notesContainer.toggleAttribute("hidden", !anyVisible);
}
updateNotesVisibility(initialState);

let reinitTimer: number | null = null;
function scheduleReinit() {
  if (reinitTimer) {
    window.clearTimeout(reinitTimer);
  }
  reinitTimer = window.setTimeout(() => {
    const state = getCombinedStateFromControls();
    syncKeepDropdownOpenAvailability(state);
    updateUrlFromState(state, {
      optionMeta,
      attributeMeta,
      defaultState: playgroundInitialState,
    });
    renderInitCodeFromState(state, initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    }, currentIntegration);
    updateNotesVisibility(state);
    initItiWithState(state).then(() => {
      if (pendingHintChecks.size > 0) {
        for (const config of HINT_CONFIGS) {
          if (pendingHintChecks.has(config.optionKey)) {
            maybeShowHint(config);
          }
        }
        pendingHintChecks.clear();
      }
    });
  }, 100);
}

function maybeQueueHintCheck(event) {
  const target = event.target;
  const optionKey = target && target.getAttribute("data-option");
  if (optionKey && hintOptionKeys.has(optionKey)) {
    pendingHintChecks.add(optionKey);
    return;
  }
  // For multidropdown controls, the change event fires on inner checkboxes;
  // walk up to find the [data-multidropdown] wrapper.
  const multidropdown = target && target.closest("[data-multidropdown]");
  if (multidropdown) {
    const mdKey = multidropdown.getAttribute("data-multidropdown");
    if (mdKey && hintOptionKeys.has(mdKey)) {
      pendingHintChecks.add(mdKey);
    }
  }
}

optionsForm.addEventListener("input", (event) => {
  maybeQueueHintCheck(event);
  scheduleReinit();
});
optionsForm.addEventListener("change", (event) => {
  maybeQueueHintCheck(event);
  scheduleReinit();
});

if (attrsForm) {
  attrsForm.addEventListener("input", scheduleReinit);
  attrsForm.addEventListener("change", scheduleReinit);
}

function resetOptionGroupToDefaults(groupKeys) {
  const keys = Array.isArray(groupKeys) ? groupKeys : [];
  if (keys.length === 0) {
    return;
  }

  const optionsState = getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option");
  keys.forEach((key) => {
    optionsState[key] = deepClone(playgroundInitialOptions[key]);
  });

  // Gather attributes too because we pass a single combined state object downstream.
  const attrsState = getStateFromForm(attrsForm, defaultInputAttributes, attributeMeta, "data-attr");

  const state = { ...optionsState, ...attrsState };
  setFormFromState(optionsForm, state, optionMeta, "data-option", { defaultState: playgroundInitialState });
  revalidateCustomInputs();
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  }, currentIntegration);
  updateNotesVisibility(state);
  void initItiWithState(state);
  updateUrlFromState(state, {
    optionMeta,
    attributeMeta,
    defaultState: playgroundInitialState,
  });
}

optionsForm.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const btn = event.target.closest("[data-playground-reset=\"options\"]");
  if (!btn) {
    return;
  }

  const groupId = btn.getAttribute("data-playground-reset-group");
  const groupKeys = groupId && optionResetGroupKeys ? optionResetGroupKeys.get(groupId) : null;
  if (!groupKeys) {
    return;
  }

  event.preventDefault();
  resetOptionGroupToDefaults(groupKeys);
  flashActionButtonLabel(btn as HTMLButtonElement, "Reset!");
});

function resetAllToDefaults() {
  const state = {
    ...deepClone(playgroundInitialOptions),
    ...deepClone(defaultInputAttributes),
  };

  setFormFromState(optionsForm, state, optionMeta, "data-option", { defaultState: playgroundInitialState });
  setFormFromState(attrsForm, state, attributeMeta, "data-attr", { defaultState: playgroundInitialState });
  revalidateCustomInputs();
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  }, currentIntegration);
  updateNotesVisibility(state);
  void initItiWithState(state);
  updateUrlFromState(state, {
    optionMeta,
    attributeMeta,
    defaultState: playgroundInitialState,
  });
}

if (resetAllButton) {
  resetAllButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetAllToDefaults();
    flashActionButtonLabel(resetAllButton, "Reset!");
  });
}

if (resetAttrsButton) {
  resetAttrsButton.addEventListener("click", () => {
    // We store both options and attributes in the same state object that is passed downstream,
    // so we must gather the current option settings first.
    const optionsState = getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option");
    const state = { ...optionsState, ...deepClone(defaultInputAttributes) };
    setFormFromState(attrsForm, state, attributeMeta, "data-attr", { defaultState: playgroundInitialState });
    renderInitCodeFromState(state, initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    }, currentIntegration);
    updateNotesVisibility(state);
    void initItiWithState(state);
    updateUrlFromState(state, {
      optionMeta,
      attributeMeta,
      defaultState: playgroundInitialState,
    });

    flashActionButtonLabel(resetAttrsButton, "Reset!");
  });
}

function getSupportedCountries() {
  if (!window.intlTelInput || typeof window.intlTelInput.getCountryData !== "function") {
    return [];
  }
  const data = window.intlTelInput.getCountryData();
  return Array.isArray(data) ? data : [];
}

const englishDisplayNames = new Intl.DisplayNames(["en"], { type: "region" });

function renderSupportedCountriesTable(filter = "") {
  if (!iso2ModalTableBody) {
    return;
  }
  iso2ModalTableBody.innerHTML = "";

  const countries = getSupportedCountries();
  const query = filter.toLowerCase().trim();

  const fragment = document.createDocumentFragment();
  countries.forEach(({ iso2, dialCode }) => {
    const name = englishDisplayNames.of(iso2.toUpperCase()) || iso2;
    if (query && !name.toLowerCase().includes(query) && !iso2.includes(query) && !("+"+dialCode).includes(query)) {
      return;
    }

    const row = document.createElement("tr");

    const countryCell = document.createElement("td");
    countryCell.className = "d-flex align-items-center";
    const flagDiv = document.createElement("div");
    flagDiv.className = `iti__flag iti__${iso2}`;
    const countryNameSpan = document.createElement("span");
    countryNameSpan.className = "ms-2";
    countryNameSpan.textContent = `${name} (+${dialCode})`;
    countryCell.appendChild(flagDiv);
    countryCell.appendChild(countryNameSpan);

    const iso2Cell = document.createElement("td");
    iso2Cell.textContent = iso2;

    row.appendChild(countryCell);
    row.appendChild(iso2Cell);
    fragment.appendChild(row);
  });

  iso2ModalTableBody.appendChild(fragment);

  if (query && iso2ModalTableBody.childElementCount === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 2;
    cell.className = "text-center text-muted py-3";
    cell.textContent = "No countries found";
    row.appendChild(cell);
    iso2ModalTableBody.appendChild(row);
  }
}

if (iso2ModalEl) {
  iso2ModalEl.addEventListener("show.bs.modal", () => {
    if (iso2ModalSearch) {
      iso2ModalSearch.value = "";
    }
    renderSupportedCountriesTable();
  });
  iso2ModalEl.addEventListener("shown.bs.modal", () => {
    iso2ModalSearch?.focus();
  });
}

if (iso2ModalSearch) {
  iso2ModalSearch.addEventListener("input", () => {
    renderSupportedCountriesTable(iso2ModalSearch.value);
  });
}

// --- ISO2 array textarea validation ---
const ISO2_TEXTAREA_KEYS = ["countryOrder", "excludeCountries", "onlyCountries"];

function getValidIso2Set() {
  return new Set(getSupportedCountries().map((c) => c.iso2));
}

function isValidIso2Array(value, validIso2s) {
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  } // empty = neutral, no class
  let parsed;
  // Accept bare comma-separated values (e.g. "us, gb") as well as JSON arrays.
  if (!trimmed.startsWith("[")) {
    parsed = trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  } else {
    try {
      parsed = JSON.parse(trimmed.replace(/'/g, "\""));
    } catch {
      return false;
    }
    if (!Array.isArray(parsed)) {
      return false;
    }
  }
  return parsed.every((item) => typeof item === "string" && validIso2s.has(item.toLowerCase()));
}

function validateIso2Textarea(textarea, { invalidOnly = false } = {}) {
  const validIso2s = getValidIso2Set();
  const result = isValidIso2Array(textarea.value, validIso2s);
  textarea.classList.remove("is-valid", "is-invalid");
  if (result === true && !invalidOnly) {
    textarea.classList.add("is-valid");
  } else if (result === false) {
    textarea.classList.add("is-invalid");
  }
}

ISO2_TEXTAREA_KEYS.forEach((key) => {
  const textarea = optionsForm.querySelector(`[data-option='${key}']`);
  if (textarea) {
    textarea.addEventListener("input", () => validateIso2Textarea(textarea));
    // on load, only flag invalid values (don't show green for valid)
    validateIso2Textarea(textarea, { invalidOnly: true });
  }
});

// --- initialCountry input validation ---
function validateInitialCountryInput(input, { invalidOnly = false } = {}) {
  const trimmed = input.value.trim();
  input.classList.remove("is-valid", "is-invalid");
  if (trimmed === "") {
    return;
  } // empty = neutral
  if (trimmed.toLowerCase() === "auto" || getValidIso2Set().has(trimmed.toLowerCase())) {
    if (!invalidOnly) {
      input.classList.add("is-valid");
    }
  } else {
    input.classList.add("is-invalid");
  }
}

const initialCountryInput = optionsForm.querySelector("[data-option='initialCountry']");
if (initialCountryInput) {
  initialCountryInput.addEventListener("input", () => validateInitialCountryInput(initialCountryInput));
  validateInitialCountryInput(initialCountryInput, { invalidOnly: true });
}

// --- countryNameLocale input validation ---
function isValidLocale(value) {
  try {
    new Intl.DisplayNames([value], { type: "region" });
    return true;
  } catch {
    return false;
  }
}

function validateCountryNameLocaleInput(input, { invalidOnly = false } = {}) {
  const trimmed = input.value.trim();
  input.classList.remove("is-valid", "is-invalid");
  if (trimmed === "") {
    return;
  } // empty = neutral
  if (isValidLocale(trimmed)) {
    if (!invalidOnly) {
      input.classList.add("is-valid");
    }
  } else {
    input.classList.add("is-invalid");
  }
}

const countryNameLocaleInput = optionsForm.querySelector("[data-option='countryNameLocale']");
if (countryNameLocaleInput) {
  countryNameLocaleInput.addEventListener("input", () => validateCountryNameLocaleInput(countryNameLocaleInput));
  validateCountryNameLocaleInput(countryNameLocaleInput, { invalidOnly: true });
}

// --- countryNameOverrides textarea validation ---
function isValidCountryNameOverrides(value, validIso2s) {
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  } // empty = neutral, no class
  let parsed;
  try {
    parsed = JSON.parse(trimmed.replace(/'/g, "\""));
  } catch {
    return false;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return false;
  }
  return Object.entries(parsed).every(
    ([k, v]) => validIso2s.has(k.toLowerCase()) && typeof v === "string" && v.trim() !== "",
  );
}

function validateCountryNameOverridesTextarea(textarea, { invalidOnly = false } = {}) {
  const validIso2s = getValidIso2Set();
  const result = isValidCountryNameOverrides(textarea.value, validIso2s);
  textarea.classList.remove("is-valid", "is-invalid");
  if (result === true && !invalidOnly) {
    textarea.classList.add("is-valid");
  } else if (result === false) {
    textarea.classList.add("is-invalid");
  }
}

const countryNameOverridesInput = optionsForm.querySelector("[data-option='countryNameOverrides']");
if (countryNameOverridesInput) {
  countryNameOverridesInput.addEventListener("input", () => validateCountryNameOverridesTextarea(countryNameOverridesInput));
  validateCountryNameOverridesTextarea(countryNameOverridesInput, { invalidOnly: true });
}

function revalidateCustomInputs() {
  ISO2_TEXTAREA_KEYS.forEach((key) => {
    const textarea = optionsForm.querySelector(`[data-option='${key}']`);
    if (textarea) {
      validateIso2Textarea(textarea, { invalidOnly: true });
    }
  });
  if (initialCountryInput) {
    validateInitialCountryInput(initialCountryInput, { invalidOnly: true });
  }
  if (countryNameLocaleInput) {
    validateCountryNameLocaleInput(countryNameLocaleInput, { invalidOnly: true });
  }
  if (countryNameOverridesInput) {
    validateCountryNameOverridesTextarea(countryNameOverridesInput, { invalidOnly: true });
  }
}
