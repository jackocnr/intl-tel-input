import {
  I18N_LANGUAGE_CODES,
  UTILS_PATH,
  I18N_DIR_HASH,
} from "../../../tmp/playground/playgroundConstants.js";

import { bindCopyCodeButton } from "./modules/clipboard.js";
import { createI18nOptionLabels } from "./modules/i18n.js";
import { renderControls, getStateFromForm, setFormFromState } from "./modules/forms.js";
import { renderInitCodeFromState } from "./modules/initCode.js";
import { createPlaygroundConfig } from "./modules/playgroundConfig.js";
import { ItiPlaygroundController } from "./modules/itiController.js";
import { createDefaultState, deepClone, parseQueryOverrides } from "./modules/stateUtils.js";
import { updateUrlFromState } from "./modules/urlState.js";

const telInput = document.querySelector("#playgroundPhone");
const optionsForm = document.querySelector("#playgroundOptions");
const attrsForm = document.querySelector("#playgroundAttributes");
const resetAllButton = document.querySelector("#playgroundResetAll");
const resetAttrsButton = document.querySelector("#playgroundResetAttrs");
const initCodeEl = document.querySelector("#playgroundInitCode");
const copyInitCodeButton = document.querySelector("#playgroundCopyInitCode");
const infoIconTemplate = document.querySelector("#itiPlaygroundInfoIconTemplate");
const optionGroupTemplate = document.querySelector("#itiPlaygroundOptionGroupTemplate");

bindCopyCodeButton(copyInitCodeButton, initCodeEl);

const { defaults } = window.intlTelInput;
const i18nOptionLabels = createI18nOptionLabels(I18N_LANGUAGE_CODES);

const {
  defaultInitOptions,
  defaultInputAttributes,
  optionMeta,
  attributeMeta,
  attributeQueryAliases,
  optionGroups,
  specialOptionKeys,
} = createPlaygroundConfig({
  defaults,
  i18nLanguageCodes: I18N_LANGUAGE_CODES,
  i18nOptionLabels,
});

const defaultState = createDefaultState(defaultInitOptions, defaultInputAttributes);

const itiController = new ItiPlaygroundController({
  telInput,
  utilsPath: UTILS_PATH,
  i18nDirHash: I18N_DIR_HASH,
  defaultInitOptions,
  specialOptionKeys,
});

const { resetGroupKeys: optionResetGroupKeys } = renderControls(optionsForm, optionMeta, {
  idPrefix: "opt",
  dataAttr: "data-option",
  groups: optionGroups,
  templates: {
    infoIconTemplate,
    optionGroupTemplate,
  },
});

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

const initialOptionsState = parseQueryOverrides(defaultInitOptions, optionMeta);
const initialAttrsState = parseQueryOverrides(defaultInputAttributes, attributeMeta, {
  aliases: attributeQueryAliases,
});

const initialState = { ...initialOptionsState, ...initialAttrsState };

setFormFromState(optionsForm, initialState, optionMeta, "data-option", { defaultState });
setFormFromState(attrsForm, initialState, attributeMeta, "data-attr", { defaultState });

renderInitCodeFromState(initialState, initCodeEl, {
  defaultInitOptions,
  optionMeta,
  defaultState,
  specialOptionKeys,
});

void itiController.initWithState(initialState);
updateUrlFromState(initialState, {
  optionMeta,
  attributeMeta,
  attributeQueryAliases,
  defaultState,
});

let reinitTimer = null;
function scheduleReinit() {
  if (reinitTimer) window.clearTimeout(reinitTimer);
  reinitTimer = window.setTimeout(() => {
    const state = getCombinedStateFromControls();
    updateUrlFromState(state, {
      optionMeta,
      attributeMeta,
      attributeQueryAliases,
      defaultState,
    });
    renderInitCodeFromState(state, initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    });
    void itiController.initWithState(state);
  }, 100);
}

optionsForm.addEventListener("input", scheduleReinit);
optionsForm.addEventListener("change", scheduleReinit);

if (attrsForm) {
  attrsForm.addEventListener("input", scheduleReinit);
  attrsForm.addEventListener("change", scheduleReinit);
}

function resetOptionGroupToDefaults(groupKeys) {
  const keys = Array.isArray(groupKeys) ? groupKeys : [];
  if (keys.length === 0) return;

  const optionsState = getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option");
  keys.forEach((key) => {
    optionsState[key] = deepClone(defaultInitOptions[key]);
  });

  // Gather attributes too because we pass a single combined state object downstream.
  const attrsState = getStateFromForm(attrsForm, defaultInputAttributes, attributeMeta, "data-attr");

  const state = { ...optionsState, ...attrsState };
  setFormFromState(optionsForm, state, optionMeta, "data-option", { defaultState });
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  });
  void itiController.initWithState(state);
  updateUrlFromState(state, {
    optionMeta,
    attributeMeta,
    attributeQueryAliases,
    defaultState,
  });
}

optionsForm.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const btn = event.target.closest("[data-playground-reset=\"options\"]");
  if (!btn) return;

  const groupId = btn.getAttribute("data-playground-reset-group");
  const groupKeys = groupId && optionResetGroupKeys ? optionResetGroupKeys.get(groupId) : null;
  if (!groupKeys) return;

  event.preventDefault();
  resetOptionGroupToDefaults(groupKeys);
});

function resetAllToDefaults() {
  const state = {
    ...deepClone(defaultInitOptions),
    ...deepClone(defaultInputAttributes),
  };

  setFormFromState(optionsForm, state, optionMeta, "data-option", { defaultState });
  setFormFromState(attrsForm, state, attributeMeta, "data-attr", { defaultState });
  renderInitCodeFromState(state, initCodeEl, {
    defaultInitOptions,
    optionMeta,
    defaultState,
    specialOptionKeys,
  });
  void itiController.initWithState(state);
  updateUrlFromState(state, {
    optionMeta,
    attributeMeta,
    attributeQueryAliases,
    defaultState,
  });
}

if (resetAllButton) {
  resetAllButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetAllToDefaults();
  });
}

if (resetAttrsButton) {
  resetAttrsButton.addEventListener("click", () => {
    // We store both options and attributes in the same state object that is passed downstream,
    // so we must gather the current option settings first.
    const optionsState = getStateFromForm(optionsForm, defaultInitOptions, optionMeta, "data-option");
    const state = { ...optionsState, ...deepClone(defaultInputAttributes) };
    setFormFromState(attrsForm, state, attributeMeta, "data-attr", { defaultState });
    renderInitCodeFromState(state, initCodeEl, {
      defaultInitOptions,
      optionMeta,
      defaultState,
      specialOptionKeys,
    });
    void itiController.initWithState(state);
    updateUrlFromState(state, {
      optionMeta,
      attributeMeta,
      attributeQueryAliases,
      defaultState,
    });
  });
}
