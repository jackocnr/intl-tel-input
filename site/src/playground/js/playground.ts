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
import { setupStrictRejectToast } from "../../js/strictRejectToast";

const telInput = document.querySelector<HTMLInputElement>("#playgroundPhone")!;
const playgroundContainer = document.querySelector<HTMLElement>("#itiPlayground")!;
const keepDropdownOpenCheckbox = document.querySelector<HTMLInputElement>("#playgroundKeepDropdownOpen")!;
const keepDropdownOpenWrapper = keepDropdownOpenCheckbox.closest<HTMLElement>(".playground-dropdown-checkbox")!;
const keepDropdownOpenInfo = document.querySelector<HTMLElement>("#playgroundKeepDropdownOpenInfo")!;
const KEEP_DROPDOWN_OPEN_DEFAULT_TOOLTIP = keepDropdownOpenInfo.getAttribute("data-bs-title") ?? "";
const syncDemoStateCheckbox = document.querySelector<HTMLInputElement>("#playgroundSyncDemoState")!;
const syncDemoStateWrapper = syncDemoStateCheckbox.closest<HTMLElement>(".form-check")!;
const optionsForm = document.querySelector<HTMLFormElement>("#playgroundOptions")!;
const attrsForm = document.querySelector<HTMLFormElement>("#playgroundAttributes")!;
const resetAllButton = document.querySelector<HTMLButtonElement>("#playgroundResetAll");
const shareButton = document.querySelector<HTMLButtonElement>("#playgroundShareBtn");
const resetAttrsButton = document.querySelector<HTMLButtonElement>("#playgroundResetAttrs");
const initCodeEl = document.querySelector<HTMLElement>("#playgroundInitCode")!;
const initHtmlEl = document.querySelector<HTMLElement>("#playgroundInitHtml");
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

const KEEP_DROPDOWN_OPEN_PARAM = "keepDropdownOpen";
const SYNC_DEMO_STATE_PARAM = "syncDemoState";

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
  return null;
}

function shouldDisableKeepDropdownOpen(state) {
  return getKeepDropdownOpenDisabledReason(state) !== null;
}

// Tracks "we auto-unchecked the checkbox because the current options disabled
// it" so that when the user reverses those options, we can restore the
// previous on-state. Cleared whenever the user toggles the checkbox themselves.
let keepDropdownOpenAutoDisabled = false;

let keepDropdownOpenTooltip: InstanceType<typeof window.bootstrap.Tooltip> | null = null;
// Bootstrap's Tooltip doesn't expose a clean way to swap title text, so we
// dispose and recreate the instance whenever the content changes.
function setKeepDropdownOpenTooltip(title: string) {
  if (keepDropdownOpenTooltip) {
    keepDropdownOpenTooltip.dispose();
    keepDropdownOpenTooltip = null;
  }
  keepDropdownOpenInfo.setAttribute("data-bs-title", title);
  keepDropdownOpenTooltip = new window.bootstrap.Tooltip(keepDropdownOpenInfo);
}
setKeepDropdownOpenTooltip(KEEP_DROPDOWN_OPEN_DEFAULT_TOOLTIP);

function syncKeepDropdownOpenAvailability(state) {
  const reason = getKeepDropdownOpenDisabledReason(state);
  const disabled = reason !== null;
  keepDropdownOpenCheckbox.disabled = disabled;
  keepDropdownOpenWrapper.classList.toggle("is-disabled", disabled);

  setKeepDropdownOpenTooltip(reason ?? KEEP_DROPDOWN_OPEN_DEFAULT_TOOLTIP);

  if (disabled && keepDropdownOpenCheckbox.checked) {
    keepDropdownOpenAutoDisabled = true;
    keepDropdownOpenCheckbox.checked = false;
    syncKeepDropdownOpen();
  } else if (!disabled && keepDropdownOpenAutoDisabled && !keepDropdownOpenCheckbox.checked) {
    keepDropdownOpenAutoDisabled = false;
    keepDropdownOpenCheckbox.checked = true;
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
  // User toggled it themselves — drop any pending auto-restore.
  keepDropdownOpenAutoDisabled = false;
  syncKeepDropdownOpen();
  scheduleReinit();
});
syncKeepDropdownOpen();

// Flash the "Keep dropdown open" checkbox if the user clicks the selected
// country's primary area (flag + arrow) while it's on — that click would
// normally close the dropdown, so the no-op can be confusing without
// something pointing at the cause. Excludes clicks on the separate dial code,
// where users are often just probing whether the dial code is editable.
let keepDropdownOpenFlashTimer: number | null = null;
playgroundContainer.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  if (!event.target.closest(".iti__selected-country-primary")) {
    return;
  }
  if (!keepDropdownOpenCheckbox.checked || keepDropdownOpenCheckbox.disabled) {
    return;
  }
  keepDropdownOpenWrapper.classList.remove("is-flashing");
  // Force reflow so the animation restarts cleanly on rapid clicks.
  void keepDropdownOpenWrapper.offsetWidth;
  keepDropdownOpenWrapper.classList.add("is-flashing");
  if (keepDropdownOpenFlashTimer) {
    window.clearTimeout(keepDropdownOpenFlashTimer);
  }
  keepDropdownOpenFlashTimer = window.setTimeout(() => {
    keepDropdownOpenWrapper.classList.remove("is-flashing");
    keepDropdownOpenFlashTimer = null;
  }, 600);
});

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
const i18nLanguageCodesSorted = [...I18N_LANGUAGE_CODES].sort((a, b) =>
  (i18nOptionLabels[a] || a).localeCompare(i18nOptionLabels[b] || b),
);

//* Datalist of all supported countries (used by countryOrder, excludeCountries, onlyCountries
//* multi-comboboxes) — labels in English so they stay stable regardless of countryNameLocale.
const countryDatalist = (() => {
  const englishNames = new Intl.DisplayNames(["en"], { type: "region" });
  return window.intlTelInput.getCountryData()
    .map((c) => ({ value: c.iso2, label: englishNames.of(c.iso2.toUpperCase()) || c.iso2 }))
    .sort((a, b) => a.label.localeCompare(b.label));
})();

//* Datalist for the initialCountry combobox.
const initialCountryDatalist = [...countryDatalist];

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
  i18nLanguageCodes: i18nLanguageCodesSorted,
  i18nOptionLabels,
  initialCountryDatalist,
  countryDatalist,
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

// Track whether an iti init (incl. async initialCountryLookup) is in flight, so that
// the demo-state capture below can skip the countrychange events that fire
// from initial setup / lookup results — those aren't user-driven selections.
let itiInitInProgress = true;
let itiInitNonce = 0;

function initItiWithState(state) {
  const nonce = ++itiInitNonce;
  itiInitInProgress = true;
  syncKeepDropdownOpenAvailability(state);
  return itiController.initWithState(getFullState(state))
    .then(() => {
      syncKeepDropdownOpen();
      // Wait for the iti instance's own promise too (resolves after initialCountryLookup).
      return itiController.iti?.promise?.catch(() => undefined);
    })
    .then(() => {
      // If a newer init has started since, leave the flag for it to clear.
      if (nonce === itiInitNonce) {
        itiInitInProgress = false;
      }
    });
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

// Hash-target handling. Two forms are supported:
//   - group slug (e.g. #user-interface-options) → scroll to the group header
//   - option name (e.g. #allowDropdown, case-insensitive) → scroll to the parent
//     group header AND flash the option control to draw the eye to it
const optionKeyByLower = new Map(
  Object.keys(optionMeta).map((k) => [k.toLowerCase(), k]),
);

function findOptionControl(key: string): HTMLElement | null {
  return optionsForm.querySelector<HTMLElement>(`[data-option='${key}']`)
    || optionsForm.querySelector<HTMLElement>(`[data-multidropdown='${key}']`);
}

// Per-wrapper timers so flashing one element back-to-back with another doesn't
// leave the first stuck with the is-flashing class.
const flashTimers = new WeakMap<HTMLElement, number>();
function startFlash(wrapper: HTMLElement) {
  wrapper.classList.remove("is-flashing");
  // Force reflow so the animation restarts cleanly on rapid hashchange events.
  void wrapper.offsetWidth;
  wrapper.classList.add("is-flashing");
  const existing = flashTimers.get(wrapper);
  if (existing) {
    window.clearTimeout(existing);
  }
  flashTimers.set(wrapper, window.setTimeout(() => {
    wrapper.classList.remove("is-flashing");
    flashTimers.delete(wrapper);
  }, 700));
}

// Find the nearest scrollable ancestor of `el`. The playground's right column
// is its own overflow:auto container at ≥992px, so window.scrollY alone can't
// detect scrolls within it.
function findScrollableAncestor(el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement;
  while (parent && parent !== document.body) {
    const overflowY = window.getComputedStyle(parent).overflowY;
    if ((overflowY === "auto" || overflowY === "scroll")
      && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

// Wait until scrolling has stopped before invoking `callback`. We poll the
// window and (optionally) a nested scroll container for a few stable frames so
// this works for both instant and smooth scrolls, and fires near-immediately
// when no scroll is happening.
function whenScrollSettles(callback: () => void, container: HTMLElement | null = null) {
  const snapshot = () => `${window.scrollY}:${container?.scrollTop ?? 0}`;
  let last = snapshot();
  let stableFrames = 0;
  let frameId = 0;
  let done = false;
  const finish = () => {
    if (done) {
      return;
    }
    done = true;
    window.cancelAnimationFrame(frameId);
    window.clearTimeout(fallback);
    callback();
  };
  const tick = () => {
    const now = snapshot();
    if (now === last) {
      stableFrames += 1;
      if (stableFrames >= 3) {
        finish();
        return;
      }
    } else {
      stableFrames = 0;
      last = now;
    }
    frameId = window.requestAnimationFrame(tick);
  };
  // Safety net: if something keeps the page jittering, flash anyway.
  const fallback = window.setTimeout(finish, 1500);
  frameId = window.requestAnimationFrame(tick);
}

function flashOptionControl(key: string) {
  const wrapper = findOptionControl(key)?.closest<HTMLElement>(".iti-playground-control");
  if (!wrapper) {
    return;
  }
  whenScrollSettles(() => startFlash(wrapper), findScrollableAncestor(wrapper));
}

// Render a tip/note string, expanding markdown `[label](url)` syntax into
// link elements. URLs starting with `#` are intercepted so the same-hash case
// still runs scroll+flash (the browser fires no hashchange in that case).
// Returns a DocumentFragment for safe insertion — no innerHTML, no XSS risk.
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderMarkdownLinks(text: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  MARKDOWN_LINK_PATTERN.lastIndex = 0;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = MARKDOWN_LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const [, label, url] = match;
    const link = document.createElement("a");
    link.href = url;
    link.className = "iti-playground-option-link";
    link.textContent = label;
    if (url.startsWith("#")) {
      const key = url.slice(1);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.location.hash === `#${key}`) {
          handleHashTarget();
        } else {
          window.location.hash = key;
        }
      });
    }
    frag.appendChild(link);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return frag;
}

function handleHashTarget() {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!raw) {
    return;
  }
  const matchedOptionKey = optionKeyByLower.get(raw.toLowerCase());
  if (matchedOptionKey) {
    const card = findOptionControl(matchedOptionKey)?.closest<HTMLElement>(".card");
    const title = card?.querySelector<HTMLElement>("[data-role='title']");
    if (title && typeof title.scrollIntoView === "function") {
      title.scrollIntoView({ block: "start" });
    }
    flashOptionControl(matchedOptionKey);
    return;
  }
  // The Live-Demo checkboxes are treated like option links: scroll to the
  // parent group's header (Live Demo) and flash the checkbox.
  const liveDemoWrapper = [keepDropdownOpenWrapper, syncDemoStateWrapper].find(
    (w) => raw === w.id,
  );
  if (liveDemoWrapper) {
    const title = liveDemoWrapper.closest<HTMLElement>(".card")?.querySelector<HTMLElement>("h2");
    if (title && typeof title.scrollIntoView === "function") {
      title.scrollIntoView({ block: "start" });
    }
    whenScrollSettles(
      () => startFlash(liveDemoWrapper),
      findScrollableAncestor(liveDemoWrapper),
    );
    return;
  }
  const el = document.getElementById(raw);
  if (el && typeof el.scrollIntoView === "function") {
    el.scrollIntoView({ block: "start" });
  }
}

// On initial load, the browser can't scroll to the hash until after the option
// groups are rendered — defer to the next frame.
if (window.location.hash) {
  window.requestAnimationFrame(handleHashTarget);
}
window.addEventListener("hashchange", handleHashTarget);

renderControls(attrsForm, attributeMeta, {
  idPrefix: "attr",
  dataAttr: "data-attr",
  templates: {
    infoIconTemplate,
  },
});

// The playground exposes i18n + countryNameLocale as a single "Language" select,
// so countryNameLocale isn't read from a form control of its own — keep it in
// lockstep with state.i18n before passing state downstream.
function mirrorLanguage(state: Record<string, any>): Record<string, any> {
  state.countryNameLocale = state.i18n;
  return state;
}

function getCombinedStateFromControls() {
  return mirrorLanguage({
    ...getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option"),
    ...getStateFromForm(attrsForm, defaultInputAttributes, attributeMeta, "data-attr"),
  });
}

const initialOptionsState = parseQueryOverrides(playgroundInitialOptions, optionMeta);
const initialAttrsState = parseQueryOverrides(defaultInputAttributes, attributeMeta);
const initialState = mirrorLanguage({ ...initialOptionsState, ...initialAttrsState });

setFormFromState(optionsForm, initialState, optionMeta, "data-option");
setFormFromState(attrsForm, initialState, attributeMeta, "data-attr");

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
    }, currentIntegration, initHtmlEl);
  });
});

renderInitCodeFromState(initialState, initCodeEl, {
  defaultInitOptions,
  optionMeta,
  defaultState,
  specialOptionKeys,
}, currentIntegration, initHtmlEl);

void initItiWithState(initialState);
updateUrlFromState(initialState, {
  optionMeta,
  attributeMeta,
  defaultState: playgroundInitialState,
});

setupStrictRejectToast(telInput, "playgroundStrictRejectToast", "playgroundStrictRejectToastBody", {
  href: "#strictMode",
  text: "strictMode",
});

// Re-trigger scroll+flash when the toast link is clicked and the hash is
// already set — the browser fires no hashchange in that case.
document.getElementById("playgroundStrictRejectToastBody")?.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href^='#']");
  if (target && window.location.hash === new URL(target.href).hash) {
    event.preventDefault();
    handleHashTarget();
  }
});

// Returns true when the browser's Intl.DisplayNames falls back to English for the
// given locale — either the locale isn't in supportedLocalesOf, or it claims support
// but the region data is missing (Chrome does this for e.g. "bs"). Used to warn the
// user that country names won't actually be translated.
function hasNoBrowserCountryNameData(locale: string): boolean {
  if (!locale || /^en($|-)/i.test(locale)) {
    return false;
  }
  try {
    const supported = (Intl as any).DisplayNames.supportedLocalesOf([locale]);
    if (supported.length === 0) {
      return true;
    }
    const dn = new (Intl as any).DisplayNames([locale], { type: "region" });
    const en = new (Intl as any).DisplayNames(["en"], { type: "region" });
    return ["US", "FR", "DE", "CN", "RU"].every((iso) => dn.of(iso) === en.of(iso));
  } catch {
    return false;
  }
}

// Contextual hints: shown when toggling an option that has no visible effect
// until the user takes an additional action (e.g. selecting a country, typing a number).
const HINT_CONFIGS = [
  // User Interface Options (allowDropdown not needed as always clear)
  {
    optionKey: "countrySearch",
    message: "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "fixDropdownWidth",
    message: "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see this change in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "separateDialCode",
    message: () => {
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country to see this in action.";
      }
      return "Tip: by design, the separate dial code is styled to look like part of the typed number, so toggling this option has no visible effect when the value already contains a number.";
    },
    shouldShow: () => !itiController.iti?.getSelectedCountryData() || getCombinedStateFromControls().value.trim().startsWith("+"),
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "showFlags",
    message: () => {
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country to see this in action.";
      }
      return "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see how this updates the dropdown.";
    },
    shouldShow: () => !keepDropdownOpenCheckbox.checked && !itiController.iti?.getSelectedCountryData(),
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "useFullscreenPopup",
    message: () => {
      if (!getCombinedStateFromControls().allowDropdown) {
        return "Tip: enable [allowDropdown](#allowDropdown) for this to work.";
      }
      return "Tip: click the selected country to open the popup.";
    },
    shouldShow: () => true,
  },
  // Country Options
  {
    optionKey: "countryOrder",
    message: "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  {
    optionKey: "excludeCountries",
    message: "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  {
    optionKey: "initialCountryLookup",
    message: "Tip: clear [initialCountry](#initialCountry) for the lookup to take effect — an explicit initialCountry always wins.",
    shouldShow: () => Boolean(getCombinedStateFromControls().initialCountry),
  },
  {
    optionKey: "onlyCountries",
    message: "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see these changes in action.",
    shouldShow: () => !keepDropdownOpenCheckbox.checked,
  },
  // Formatting Options
  {
    optionKey: "formatAsYouType",
    message: () => {
      if (!getCombinedStateFromControls().loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country and type a phone number to see this in action.";
      }
      return "Tip: type a phone number to see this in action.";
    },
    shouldShow: () => true, // always show this as they have to take action
  },
  {
    optionKey: "numberDisplayFormat",
    message: () => {
      const state = getCombinedStateFromControls();
      if (!state.loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (state.separateDialCode && state.numberDisplayFormat === "NATIONAL") {
        return "Tip: disable [separateDialCode](#separateDialCode) for NATIONAL to take effect (otherwise it falls back to INTERNATIONAL).";
      }
      return "Tip: select a country and enter (or set) a number to see how this option formats it differently.";
    },
    shouldShow: () => {
      const state = getCombinedStateFromControls();
      return !state.loadUtils
        || (state.separateDialCode && state.numberDisplayFormat === "NATIONAL")
        || !itiController.iti?.getSelectedCountryData();
    },
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "strictMode",
    message: () => {
      if (!getCombinedStateFromControls().loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country and try typing valid/invalid characters in the input to see this in action.";
      }
      return "Tip: try typing valid/invalid characters in the input to see this in action.";
    },
    shouldShow: () => true, // always show this as they have to take action
  },
  // Placeholder Options
  {
    optionKey: "autoPlaceholder",
    message: () => {
      if (!getCombinedStateFromControls().loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country to see the placeholder update based on this setting.";
      }
      if (telInput.value) {
        return "Tip: clear the input to see the placeholder update based on this setting.";
      }
      return "Tip: clear the existing placeholder (see Settings at the bottom) for \"polite\" to set the example number placeholder.";
    },
    shouldShow: () => {
      const state = getCombinedStateFromControls();
      if (!state.loadUtils) {
        return true;
      }
      if (!itiController.iti?.getSelectedCountryData() || telInput.value) {
        return true;
      }
      return state.autoPlaceholder === "polite" && state.placeholder;
    },
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "customPlaceholder",
    message: () => {
      if (!getCombinedStateFromControls().loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (!itiController.iti?.getSelectedCountryData()) {
        return "Tip: select a country to see the placeholder update based on this setting.";
      }
      return "Tip: clear the input to see the placeholder update based on this setting.";
    },
    shouldShow: () => !getCombinedStateFromControls().loadUtils || !itiController.iti?.getSelectedCountryData() || telInput.value,
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "placeholderNumberType",
    message: () => {
      const country = itiController.iti?.getSelectedCountryData();
      if (!country) {
        return "Tip: select a country to see the placeholder update based on this setting.";
      }
      if (telInput.value) {
        return "Tip: clear the input to see the placeholder update based on this setting.";
      }
      const state = getCombinedStateFromControls();
      if (state.autoPlaceholder === "off") {
        return "Tip: set [autoPlaceholder](#autoPlaceholder) to \"polite\" or \"aggressive\" to see this in action.";
      }
      if (!state.loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      return `Tip: libphonenumber has no example "${state.placeholderNumberType}" number for ${country.name} — try "MOBILE", "FIXED_LINE", or a different country.`;
    },
    shouldShow: () => {
      const country = itiController.iti?.getSelectedCountryData();
      if (!country || telInput.value) {
        return true;
      }
      const state = getCombinedStateFromControls();
      if (state.autoPlaceholder === "off" || !state.loadUtils) {
        return true;
      }
      return !window.intlTelInput.utils!.getExampleNumber(country.iso2, state.placeholderNumberType, "INTERNATIONAL");
    },
    alsoShowOnToggleOff: true,
  },
  // Validation Options
  {
    optionKey: "allowedNumberTypes",
    message: () => {
      if (!getCombinedStateFromControls().loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      return "Tip: enter a valid phone number to see this in action.";
    },
    shouldShow: () => !getCombinedStateFromControls().loadUtils || !telInput.value,
    isMultidropdown: true,
  },
  {
    optionKey: "allowNumberExtensions",
    message: () => {
      const state = getCombinedStateFromControls();
      if (!state.loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (state.strictMode) {
        return "Tip: disable [strictMode](#strictMode) to see this in action.";
      }
      return "Tip: enter a phone number with/without an extension to see this in action.";
    },
    shouldShow: () => true, // always show this as they have to take action
    alsoShowOnToggleOff: true,
  },
  {
    optionKey: "allowPhonewords",
    message: () => {
      const state = getCombinedStateFromControls();
      if (!state.loadUtils) {
        return "Tip: enable [loadUtils](#loadUtils) to see this in action.";
      }
      if (state.strictMode) {
        return "Tip: disable [strictMode](#strictMode) to see this in action.";
      }
      let tip = "Tip: enter a phone number with/without letters to see this in action.";
      if (syncDemoStateCheckbox.checked) {
        tip += " Note: with [Sync demo state](#sync-demo-state) on, the typed number survives option changes (e.g. toggling allowPhonewords on/off) — but any phoneword letters get converted to digits when this happens.";
      }
      return tip;
    },
    shouldShow: () => true, // always show this as they have to take action
    alsoShowOnToggleOff: true,
  },
  // Translation Options
  {
    optionKey: "i18n",
    message: () => {
      const state = getCombinedStateFromControls();
      if (hasNoBrowserCountryNameData(state.i18n)) {
        return "Warning: your browser's Intl.DisplayNames has no country-name data for this locale — country names will fall back to English.";
      }
      if (!state.countrySearch) {
        return "Tip: enable [countrySearch](#countrySearch) to see the search placeholder update based on this setting.";
      }
      if (!keepDropdownOpenCheckbox.checked) {
        return "Tip: in the Live Demo section, enable [Keep dropdown open](#keep-dropdown-open) to see the changes in action.";
      }
      return "";
    },
    shouldShow: () => {
      const state = getCombinedStateFromControls();
      if (hasNoBrowserCountryNameData(state.i18n)) {
        return true;
      }
      return !state.countrySearch || !keepDropdownOpenCheckbox.checked;
    },
  },
  // Miscellaneous Options
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
  hint.appendChild(renderMarkdownLinks(messageText));

  const controlWrapper = control.closest(".iti-playground-control");
  if (!controlWrapper) {
    return;
  }
  controlWrapper.appendChild(hint);

  // Scale timeout with rendered text length: ~5s base, +40ms per readable
  // character. Strip markdown link syntax so we count only what the user sees.
  const renderedLength = messageText.replace(MARKDOWN_LINK_PATTERN, "$1").length;
  hintTimers[optionKey] = window.setTimeout(() => {
    hint.remove();
    hintTimers[optionKey] = null;
  }, Math.max(5000, renderedLength * 40));
}

const notesContainer = document.getElementById("playgroundNotes");
function updateNotesVisibility(state) {
  if (!notesContainer) {
    return;
  }
  const noteKeys = ["strictMode", "initialCountryLookup"];
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
    }, currentIntegration, initHtmlEl);
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

  const state = mirrorLanguage({ ...optionsState, ...attrsState });
  setFormFromState(optionsForm, state, optionMeta, "data-option");
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  }, currentIntegration, initHtmlEl);
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
  const state = mirrorLanguage({
    ...deepClone(playgroundInitialOptions),
    ...deepClone(defaultInputAttributes),
  });

  setFormFromState(optionsForm, state, optionMeta, "data-option");
  setFormFromState(attrsForm, state, attributeMeta, "data-attr");
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  }, currentIntegration, initHtmlEl);
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
    const state = mirrorLanguage({ ...optionsState, ...deepClone(defaultInputAttributes) });
    setFormFromState(attrsForm, state, attributeMeta, "data-attr");
    renderInitCodeFromState(state, initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    }, currentIntegration, initHtmlEl);
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

// Pin the live demo state across reinits, by mirroring user interactions in
// the live demo back into the form's initialCountry / value fields. Without
// this, toggling any option wipes the user's selection.
syncDemoStateCheckbox.checked = parseBooleanParam(
  new URLSearchParams(window.location.search).get(SYNC_DEMO_STATE_PARAM),
  true,
);

const syncDemoStateInfo = document.querySelector<HTMLElement>("#playgroundSyncDemoStateInfo");
if (syncDemoStateInfo) {
  new window.bootstrap.Tooltip(syncDemoStateInfo);
}


function updateSyncDemoStateUrlParam(enabled: boolean) {
  const url = new URL(window.location.href);
  if (enabled) {
    url.searchParams.delete(SYNC_DEMO_STATE_PARAM);
  } else {
    url.searchParams.set(SYNC_DEMO_STATE_PARAM, "false");
  }
  if (url.search !== window.location.search) {
    window.history.replaceState(null, "", url);
  }
}

let dropdownCurrentlyOpen = false;
telInput.addEventListener("open:countrydropdown", () => {
  dropdownCurrentlyOpen = true;
});
telInput.addEventListener("close:countrydropdown", () => {
  dropdownCurrentlyOpen = false;
});

function syncStateAfterFormEdit() {
  const state = getCombinedStateFromControls();
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
  }, currentIntegration, initHtmlEl);
}

function captureSelectedCountryToForm({ requireDropdownInteraction = true } = {}) {
  if (!syncDemoStateCheckbox.checked) {
    return;
  }
  // Skip countrychange events that fire while the iti instance is still
  // setting itself up (incl. async initialCountryLookup). Otherwise the
  // lookup result on first load would silently overwrite the playground's
  // intended initial state.
  if (itiInitInProgress) {
    return;
  }
  // Only mirror user-driven dropdown picks. Skip country auto-detection from
  // typing — in that case the typed number itself is what gets preserved,
  // and the country re-derives from it on the next reinit. Note: with
  // keepDropdownOpen on, the dropdown is "open" from init, so this guard
  // can't filter out the lookup on its own — itiInitInProgress (above) does that.
  if (requireDropdownInteraction && !dropdownCurrentlyOpen) {
    return;
  }
  const iso2 = itiController.iti?.getSelectedCountryData()?.iso2;
  if (!iso2) {
    return;
  }
  const input = optionsForm.querySelector<HTMLInputElement>("[data-option='initialCountry']");
  if (!input || input.value === iso2) {
    return;
  }
  const singleCombobox = (input as any).__singleCombobox;
  if (singleCombobox) {
    singleCombobox.setValue(iso2);
  } else {
    input.value = iso2;
  }
  syncStateAfterFormEdit();
}

function captureTypedNumberToForm() {
  if (!syncDemoStateCheckbox.checked) {
    return;
  }
  const input = attrsForm.querySelector<HTMLInputElement>("[data-attr='value']");
  if (!input) {
    return;
  }
  let newValue: string;
  if (!telInput.value) {
    newValue = "";
  } else if (window.intlTelInput?.utils && itiController.iti) {
    newValue = itiController.iti.getNumber();
  } else {
    // utils not loaded — getNumber() would throw, so leave the saved value alone
    return;
  }
  if (input.value === newValue) {
    return;
  }
  input.value = newValue;
  syncStateAfterFormEdit();
}

syncDemoStateCheckbox.addEventListener("change", () => {
  updateSyncDemoStateUrlParam(syncDemoStateCheckbox.checked);
  if (syncDemoStateCheckbox.checked) {
    // Enabling the checkbox is itself explicit consent, so skip the
    // dropdown-interaction gate when capturing the current country.
    captureSelectedCountryToForm({ requireDropdownInteraction: false });
    captureTypedNumberToForm();
  }
});

telInput.addEventListener("countrychange", () => captureSelectedCountryToForm());
telInput.addEventListener("input", captureTypedNumberToForm);
// strictMode paste sanitisation runs in the iti's input listener AFTER ours and
// updates the value silently, so the form-value capture above sees the raw pasted
// text. The iti dispatches strict:reject AFTER writing the sanitised value, so
// re-capture from there to pick up the post-strip value.
telInput.addEventListener("strict:reject", captureTypedNumberToForm);
