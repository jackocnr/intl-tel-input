/* eslint-disable @typescript-eslint/no-unused-vars */
var input,
  iti,
  totalCountries = 244,
  totalDialCodes = 228,
  afghanistanDialCode = "+93",
  utilsBackup = null;

var intlSetup = function(utilsScript) {
  // by default put us in desktop mode
  window.innerWidth = 1024;

  // first run: backup utils, so we can remove it and then restore it later when needed
  if (!utilsBackup) {
    utilsBackup = window.intlTelInput.utils;
  }
  if (utilsScript) {
    window.intlTelInput.utils = utilsBackup;
  } else {
    window.intlTelInput.utils = null;
  }
};

var intlTeardown = function() {
  window.intlTelInput.startedLoadingUtilsScript = false;
  window.intlTelInput.documentReady = () => false;
  window.intlTelInput.autoCountry = null;
  window.intlTelInput.startedLoadingAutoCountry = false;
  window.intlTelInput.utils = null;
  if (iti) iti.destroy();
  if (input) input.remove();
  input = iti = null;
};

var getInputVal = function(i) {
  i = i || input;
  return i.val();
};

var getParentElement = function(i) {
  i = i || input;
  return i.parent();
};

var getHiddenInputs = function(i) {
  i = i || input;
  return i.parent().find("input[type=hidden]");
};

var getDropdownContent = function(i) {
  i = i || input;
  return i.parent().find(".iti__dropdown-content");
};

var getSearchInput = function(i) {
  i = i || input;
  return i.parent().find(".iti__search-input");
};

var getListElement = function(i) {
  i = i || input;
  return i.parent().find(".iti__country-list");
};

var getListLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__country").length;
};

var getActiveListItem = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__active");
};

var getPreferredCountriesLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.iti__preferred").length;
};

var getSelectedCountryContainer = function(i) {
  i = i || input;
  return i.parent().find(".iti__selected-country");
};

var getSelectedCountryElement = function(i) {
  i = i || input;
  return getSelectedCountryContainer(i).find(".iti__flag");
};

var getSelectedDialCodeElement = function(i) {
  i = i || input;
  return getSelectedCountryContainer(i).find(".iti__selected-dial-code");
};

var getCountryContainerElement = function(i) {
  i = i || input;
  return i.parent().find(".iti__country-container");
};

var selectCountry = function(iso2, i) {
  i = i || input;
  getSelectedCountryContainer(i)[0].click();
  getListElement(i).find("li[data-country-code='" + iso2 + "']")[0].click();
};

var openCountryDropDown = function() {
  getSelectedCountryContainer()[0].click();
};

var putCursorAtEnd = function() {
  var len = input.val().length;
  selectInputChars(len, len);
};

var selectInputChars = function(start, end) {
  input[0].setSelectionRange(start, end);
};

// use this for focus/blur (instead of using .focus() and .blur() directly, which cause problems in IE11)
var triggerInputEvent = function(type) {
  var e = new Event(type);
  input[0].dispatchEvent(e);
};

var triggerKey = function(el, type, key) {
  var e = new KeyboardEvent(type, { key: key, data: key });
  el.dispatchEvent(e);
};

// trigger keydown, then keypress, then add the key, then keyup
var triggerKeyOnInput = function(key, customInput) {
  const inputEl = customInput || input;
  triggerKey(inputEl[0], "keydown", key);
  triggerKey(inputEl[0], "keypress", key);
  var previousVal = inputEl.val();
  inputEl.val(previousVal + key);
  triggerKey(inputEl[0], "keyup", key);
  triggerKey(inputEl[0], "input", key);
};

var triggerKeyOnBody = function(key) {
  triggerKey(document, "keydown", key);
  triggerKey(document, "keypress", key);
  triggerKey(document, "keyup", key);
  triggerKey(document, "input", key);
};

var triggerKeyOnCountryContainerElement = function(key) {
  triggerKey(getCountryContainerElement()[0], "keydown", key);
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const moduleCache = new Map();

/**
 * A very simplistic module loader.
 * @param {string} path 
 * @returns {Promise<{exports: any, hasUtils: boolean}>}
 */
async function loadCommonJsModule (path) {
  const url = new URL(path, window.location.href);

  let module = moduleCache.get(url);

  if (!module) {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new TypeError(`error loading dynamically imported module: ${url}`);
    }

    const source = await response.text();
    module = eval?.(`
      (function() {
        const module = { exports: {} };
        ${source}
        return module;
      })()
    `);
    module.hasUtils = !!module.exports.utils;

    moduleCache.set(moduleCache, module);
  }

  return module;
}

/**
 * Configure a test suite to use a specific build of intl-tel-input.
 * @param {string} path
 * 
 * @example
 * describe("my suite", function () {
 *   useIntlTelInputBuild("build/intlTelInputWithUtils.js");
 *
 *   it("should do something", () => {
 *     // In this test, window.intlTelInput will be the version from
 *     // "build/intlTelInputWithUtils.js"
 *   })
 * })
 */
function useIntlTelInputBuild(path) {
  let defaultBuild;

  beforeEach(async function() {
    defaultBuild = window.intlTelInput;

    const usedBuild = await loadCommonJsModule(path);
    if (!usedBuild.hasUtils) {
      usedBuild.exports.utils = undefined;
      usedBuild.exports.startedLoadingUtilsScript = false;
    }

    window.intlTelInput = usedBuild.exports;
  });

  afterEach(function() {
    try {
      for (const instance of Object.values(window.intlTelInput?.instances ?? {})) {
        instance.destroy();
      }
    } finally {
      window.intlTelInput = defaultBuild;
    }
  });
}
