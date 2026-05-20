import type { Iti } from "../../../../../packages/core/dist/js/intlTelInput";
import { resolveI18nSelection } from "./i18n";
import { geoIpLookup } from "../../../js/geoIpLookup";

function applyInputAttributes(state: any, telInput: HTMLInputElement) {
  if (!state || !telInput) {
    return;
  }

  if (typeof state.value === "string") {
    telInput.value = state.value;
    // Keep the DOM "value" attribute (defaultValue) in sync for visibility in devtools.
    telInput.defaultValue = state.value;
  }

  if (typeof state.placeholder === "string") {
    telInput.placeholder = state.placeholder;
  }
}

function destroyInstance(iti: any) {
  if (iti && typeof iti.destroy === "function") {
    try {
      iti.destroy();
    } catch {
      // ignore
    }
  }
}

function detachUtilsIfNeeded(state: any) {
  if (!state || state.loadUtils) {
    return;
  }
  if (!window.intlTelInput) {
    return;
  }
  // If utils were previously attached, clear them so disabling loadUtils actually disables
  // formatting/validation, and allow re-attaching if the user re-enables it.
  window.intlTelInput.utils = undefined;
  window.intlTelInput.startedLoadingUtils = false;
}

function toInitOptions(
  state: any,
  { defaultInitOptions, specialOptionKeys, utilsPath }: { defaultInitOptions: Record<string, any>; specialOptionKeys: string[]; utilsPath: string },
) {
  const opts: any = {};

  Object.keys(defaultInitOptions).forEach((key) => {
    if (specialOptionKeys.includes(key)) {
      return;
    }
    opts[key] = state[key];
  });

  if (state.loadUtils) {
    opts.loadUtils = () => import(utilsPath);
  }

  if (state.customPlaceholder) {
    opts.customPlaceholder = (exampleNumber: string) => (exampleNumber ? exampleNumber.replace(/\d/g, "X") : "Enter number");
  }

  if (state.geoIpLookup) {
    opts.geoIpLookup = geoIpLookup;
  }

  if (typeof state.dropdownAlwaysOpen === "boolean") {
    opts.dropdownAlwaysOpen = state.dropdownAlwaysOpen;
  }

  return opts;
}

export class ItiPlaygroundController {
  telInput: HTMLInputElement;
  utilsPath: string;
  i18nDirHash: string;
  defaultInitOptions: Record<string, any>;
  specialOptionKeys: string[];
  iti: Iti | null;
  initNonce: number;

  constructor({ telInput, utilsPath, i18nDirHash, defaultInitOptions, specialOptionKeys }: { telInput: HTMLInputElement; utilsPath: string; i18nDirHash: string; defaultInitOptions: Record<string, any>; specialOptionKeys: string[] }) {
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

  async initWithState(state: any) {
    const nonce = (this.initNonce += 1);

    detachUtilsIfNeeded(state);

    const initOptions = toInitOptions(state, {
      defaultInitOptions: this.defaultInitOptions,
      specialOptionKeys: this.specialOptionKeys,
      utilsPath: this.utilsPath,
    });

    const i18n = await resolveI18nSelection(state.i18n, { i18nDirHash: this.i18nDirHash });

    if (nonce !== this.initNonce) {
      return;
    }

    // Apply attributes BEFORE initialising the core library, so it can read the correct DOM state.
    applyInputAttributes(state, this.telInput);

    this.destroy();
    // Clear any padding-left set by the previous init, so switching to a config
    // that doesn't touch padding doesn't inherit stale padding from the old one.
    this.telInput.style.paddingLeft = "";
    initOptions.i18n = i18n;
    // we need this bootstrap class, but don't want to bother users with this, so just add it here.
    initOptions.searchInputClass = "form-control";
    this.iti = window.intlTelInput(this.telInput, initOptions);

    // Force the live results box to re-render against the new instance.
    const dispatchRefresh = () => {
      this.telInput.dispatchEvent(new Event("iti-live-results:refresh"));
    };
    window.setTimeout(dispatchRefresh, 0);
    // Also re-dispatch after the iti's promise resolves, so the box updates once
    // async utils loading finishes (otherwise enabling loadUtils leaves the
    // "Enable loadUtils" message in place even after utils has loaded).
    this.iti.promise?.catch(() => undefined).then(dispatchRefresh);
  }
}
