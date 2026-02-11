import { resolveI18nSelection } from "./i18n.js";

function applyInputAttributes(state, telInput) {
  if (!state || !telInput) return;

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

function destroyInstance(iti) {
  if (iti && typeof iti.destroy === "function") {
    try {
      iti.destroy();
    } catch {
      // ignore
    }
  }
}

function detachUtilsIfNeeded(state) {
  if (!state || state.loadUtils) return;
  if (!window.intlTelInput) return;
  // If utils were previously attached, clear them so disabling loadUtils actually disables
  // formatting/validation, and allow re-attaching if the user re-enables it.
  window.intlTelInput.utils = null;
  window.intlTelInput.startedLoadingUtilsScript = false;
}

function toInitOptions(state, { defaultInitOptions, specialOptionKeys, utilsPath }) {
  const opts = {};

  Object.keys(defaultInitOptions).forEach((key) => {
    if (specialOptionKeys.includes(key)) return;
    opts[key] = state[key];
  });

  if (state.loadUtils) {
    opts.loadUtils = () => import(utilsPath);
  }

  if (state.customPlaceholder) {
    opts.customPlaceholder = (exampleNumber) => (exampleNumber ? `e.g. ${exampleNumber}` : "Phone number");
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

export class ItiPlaygroundController {
  constructor({ telInput, utilsPath, i18nDirHash, defaultInitOptions, specialOptionKeys }) {
    this.telInput = telInput;
    this.utilsPath = utilsPath;
    this.i18nDirHash = i18nDirHash;
    this.defaultInitOptions = defaultInitOptions;
    this.specialOptionKeys = specialOptionKeys;

    this.iti = null;
    this.initNonce = 0;
  }

  destroy() {
    destroyInstance(this.iti);
    this.iti = null;
  }

  async initWithState(state) {
    const nonce = (this.initNonce += 1);

    detachUtilsIfNeeded(state);

    const initOptions = toInitOptions(state, {
      defaultInitOptions: this.defaultInitOptions,
      specialOptionKeys: this.specialOptionKeys,
      utilsPath: this.utilsPath,
    });

    const i18n = await resolveI18nSelection(state.i18n, { i18nDirHash: this.i18nDirHash });

    if (nonce !== this.initNonce) return;

    // Apply attributes BEFORE initialising the plugin, so it can read the correct DOM state.
    applyInputAttributes(state, this.telInput);

    this.destroy();
    initOptions.i18n = i18n;
    this.iti = window.intlTelInput(this.telInput, initOptions);

    // Trigger live results box to update by triggering a countrychange event on the telInput
    // (avoid triggering an input event as the plugin responds to that)
    window.setTimeout(() => {
      this.telInput.dispatchEvent(new Event("countrychange"));
    }, 0);
  }
}
