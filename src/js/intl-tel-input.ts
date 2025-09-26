import allCountries, { Country, Iso2 } from "./intl-tel-input/data";
import defaultEnglishStrings from "./intl-tel-input/i18n/en/countries";
import { defaults, applyOptionSideEffects } from "./modules/core/options";
import type {
  UtilsLoader,
  NumberType,
  AllOptions,
  SomeOptions,
  IntlTelInputInterface,
  SelectedCountryData,
} from "./modules/types/public-api";
import { getNumeric, normaliseString } from "./modules/utils/string";
import { createEl, buildClassNames } from "./modules/utils/dom";
import {
  processAllCountries,
  processDialCodes,
  translateCountryNames,
  sortCountries,
  cacheSearchTokens,
} from "./modules/data/country-data";
import {
  beforeSetNumber,
  formatNumberAsYouType,
} from "./modules/format/formatting";
import { translateCursorPosition } from "./modules/format/caret";
import { isRegionlessNanp } from "./modules/data/nanp-regionless";
import type { ItiEventMap } from "./modules/types/events";

//* Populate the country names in the default language - useful if you want to use static getCountryData to populate another country dropdown etc.
for (const c of allCountries) {
  c.name = defaultEnglishStrings[c.iso2];
}

declare global {
  interface HTMLInputElement {
    iti?: Iti;
  }
}

//* These vars persist through all instances of the plugin.
let id = 0;

// build a Set for iso2 runtime validation (lightweight)
const iso2Set: Set<Iso2> = new Set(allCountries.map((c) => c.iso2));
const isIso2 = (val: string): val is Iso2 => iso2Set.has(val as Iso2);

//* This is our plugin class that we will create an instance of
// eslint-disable-next-line no-unused-vars
export class Iti {
  //* PUBLIC FIELDS
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  readonly id: number;
  // accessed externally via iti.promise.then(...)
  promise: Promise<[unknown, unknown]>;

  //* PRIVATE FIELDS - READONLY
  private readonly telInput: HTMLInputElement;
  private readonly options: AllOptions;
  private readonly hadInitialPlaceholder: boolean;
  // NOTE: most of these fields could be "readonly" (a TypeScript convention), but TS requires them to be assigned in the constructor and there are WAY too many to do that - it would be a mess (e.g. think of all the DOM node fields alone - maybe this will be feasible if we ever extract the DOM node creation to a separate class)
  private originalPaddingLeft: string;
  private isRTL: boolean;
  private isAndroid: boolean;
  // country data
  private countries: Country[];
  private dialCodeMaxLen: number;
  private dialCodeToIso2Map: Record<string, Iso2[]>;
  private dialCodes: Set<string>;
  private countryByIso2: Map<Iso2, Country>;
  // DOM nodes
  private countryContainer: HTMLElement;
  private selectedCountry: HTMLElement;
  private selectedCountryInner: HTMLElement;
  private selectedDialCode: HTMLElement;
  private dropdownArrow: HTMLElement;
  private dropdownContent: HTMLElement;
  private searchInput: HTMLInputElement;
  private searchIcon: HTMLElement;
  private searchClearButton: HTMLButtonElement;
  private searchNoResults: HTMLElement;
  private searchResultsA11yText: HTMLElement;
  private countryList: HTMLElement;
  private dropdown: HTMLElement;
  private hiddenInput: HTMLInputElement;
  private hiddenInputCountry: HTMLInputElement;

  //* PRIVATE FIELDS - NOT READONLY
  private highlightedItem: HTMLElement | null;
  private selectedCountryData: SelectedCountryData;
  private maxCoreNumberLength: number | null;
  private defaultCountry: Iso2;
  // centralised event management
  private abortController: AbortController;
  private dropdownAbortController: AbortController | null;

  private resolveAutoCountryPromise: (value?: unknown) => void;
  private rejectAutoCountryPromise: (reason?: unknown) => void;
  private resolveUtilsScriptPromise: (value?: unknown) => void;
  private rejectUtilsScriptPromise: (reason?: unknown) => void;

  constructor(input: HTMLInputElement, customOptions: SomeOptions = {}) {
    this.id = id++;
    input.dataset.intlTelInputId = this.id.toString();
    this.telInput = input;

    this.highlightedItem = null;

    //* Process specified options / defaults.
    this.options = { ...defaults, ...customOptions } as AllOptions;
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));

    this._init();
  }

  private _detectEnvironmentAndLayout(): void {
    this.isAndroid =
      typeof navigator !== "undefined"
        ? /Android/i.test(navigator.userAgent)
        : false;

    //* Check if input has an ancestor with RTL.
    this.isRTL = !!this.telInput.closest("[dir=rtl]");

    //* Store original styling before we override it.
    if (this.options.separateDialCode) {
      this.originalPaddingLeft = this.telInput.style.paddingLeft;
    }
  }

  private _createInitPromises(): void {
    //* these promises get resolved when their individual requests complete
    //* this way the dev can do something like iti.promise.then(...) to know when all requests are complete.
    const autoCountryPromise = new Promise((resolve, reject) => {
      this.resolveAutoCountryPromise = resolve;
      this.rejectAutoCountryPromise = reject;
    });
    const utilsScriptPromise = new Promise((resolve, reject) => {
      this.resolveUtilsScriptPromise = resolve;
      this.rejectUtilsScriptPromise = reject;
    });
    this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
  }

  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init(): void {
    applyOptionSideEffects(this.options);
    this._detectEnvironmentAndLayout();
    this._createInitPromises();

    //* In various situations there could be no country selected initially, but we need to be able
    //* to assume this variable exists.
    this.selectedCountryData = {} as SelectedCountryData;

    // init event controller
    this.abortController = new AbortController();

    //* Process all the data: onlyCountries, excludeCountries, countryOrder etc.
    this._processCountryData();

    //* generate the markup.
    this._generateMarkup();

    //* Set the initial state of the input value and the selected country.
    this._setInitialState();

    //* Start all of the event listeners: input keydown, selectedCountry click.
    this._initListeners();

    //* Utils script, and auto country.
    this._initRequests();
  }

  //********************
  //*  PRIVATE METHODS
  //********************

  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  private _processCountryData(): void {
    //* Process onlyCountries or excludeCountries array if present.
    this.countries = processAllCountries(this.options);

    //* Generate this.dialCodes and this.dialCodeToIso2Map.
    const { dialCodes, dialCodeMaxLen, dialCodeToIso2Map } = processDialCodes(
      this.countries,
      this.options,
    );
    this.dialCodes = dialCodes;
    this.dialCodeMaxLen = dialCodeMaxLen;
    this.dialCodeToIso2Map = dialCodeToIso2Map;

    //* Translate country names according to i18n option.
    translateCountryNames(this.countries, this.options);

    //* Sort countries by countryOrder option (if present), then name.
    sortCountries(this.countries, this.options);

    //* Build fast iso2 -> country map for O(1) lookups (used by _getCountryData).
    this.countryByIso2 = new Map(this.countries.map((c) => [c.iso2, c]));

    //* Precompute and cache country search tokens to speed up filtering
    cacheSearchTokens(this.countries);
  }

  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  private _generateMarkup(): void {
    this._prepareTelInput();

    const wrapper = this._createWrapperAndInsert();
    this._maybeBuildCountryContainer(wrapper);
    wrapper.appendChild(this.telInput);

    this._maybeUpdateInputPaddingAndReveal();
    this._maybeBuildHiddenInputs(wrapper);
  }

  private _prepareTelInput(): void {
    this.telInput.classList.add("iti__tel-input");

    //* If autocomplete does not exist on the element and its form, then
    //* prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
    //* easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
    //* autocompleted number, which on submit could mean wrong number is saved.
    if (
      !this.telInput.hasAttribute("autocomplete") &&
      !this.telInput.form?.hasAttribute("autocomplete")
    ) {
      this.telInput.setAttribute("autocomplete", "off");
    }
  }

  private _createWrapperAndInsert(): HTMLElement {
    const { allowDropdown, showFlags, containerClass, useFullscreenPopup } =
      this.options;

    //* Containers (mostly for positioning).
    const parentClasses = buildClassNames({
      iti: true,
      "iti--allow-dropdown": allowDropdown,
      "iti--show-flags": showFlags,
      "iti--inline-dropdown": !useFullscreenPopup,
      [containerClass]: Boolean(containerClass),
    });
    const wrapper = createEl("div", { class: parentClasses });
    // if the page is RTL, then add dir=LTR to the wrapper, as numbers are still written LTR, so the input should be LTR, but we also need to display any separate dial code to the left as well (but we then make the dropdown content RTL)
    if (this.isRTL) {
      wrapper.setAttribute("dir", "ltr");
    }
    this.telInput.before(wrapper);
    return wrapper;
  }

  private _maybeBuildCountryContainer(wrapper: HTMLElement): void {
    const { allowDropdown, separateDialCode, showFlags } = this.options;

    //* If we need a countryContainer
    if (allowDropdown || showFlags || separateDialCode) {
      this.countryContainer = createEl(
        "div",
        // visibly hidden until we measure it's width to set the input padding correctly
        { class: "iti__country-container iti__v-hide" },
        wrapper,
      );

      //* Selected country (displayed on left of input while allowDropdown is enabled, otherwise to right)
      //* https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only
      if (allowDropdown) {
        this.selectedCountry = createEl(
          "button",
          {
            type: "button",
            class: "iti__selected-country",
            "aria-expanded": "false",
            "aria-label": this.options.i18n.noCountrySelected,
            "aria-haspopup": "dialog",
            "aria-controls": `iti-${this.id}__dropdown-content`,
          },
          this.countryContainer,
        );

        if (this.telInput.disabled) {
          this.selectedCountry.setAttribute("disabled", "true");
        }
      } else {
        this.selectedCountry = createEl(
          "div",
          { class: "iti__selected-country" },
          this.countryContainer,
        );
      }

      // The element that gets a grey background on hover (if allowDropdown enabled)
      const selectedCountryPrimary = createEl(
        "div",
        { class: "iti__selected-country-primary" },
        this.selectedCountry,
      );

      //* This is where we will add the selected flag (or globe) class later
      this.selectedCountryInner = createEl(
        "div",
        { class: "iti__flag" },
        selectedCountryPrimary,
      );

      if (allowDropdown) {
        this.dropdownArrow = createEl(
          "div",
          { class: "iti__arrow", "aria-hidden": "true" },
          selectedCountryPrimary,
        );
      }

      if (separateDialCode) {
        this.selectedDialCode = createEl(
          "div",
          { class: "iti__selected-dial-code" },
          this.selectedCountry,
        );
      }

      if (allowDropdown) {
        this._buildDropdownContent();
      }
    }
  }

  private _buildDropdownContent(): void {
    const {
      fixDropdownWidth,
      useFullscreenPopup,
      countrySearch,
      i18n,
      dropdownContainer,
      containerClass,
    } = this.options;

    const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
    this.dropdownContent = createEl("div", {
      id: `iti-${this.id}__dropdown-content`,
      class: `iti__dropdown-content iti__hide ${extraClasses}`,
      role: "dialog",
      "aria-modal": "true",
    });
    if (this.isRTL) {
      this.dropdownContent.setAttribute("dir", "rtl");
    }

    if (countrySearch) {
      this._buildSearchUI();
    }

    this.countryList = createEl(
      "ul",
      {
        class: "iti__country-list",
        id: `iti-${this.id}__country-listbox`,
        role: "listbox",
        "aria-label": i18n.countryListAriaLabel,
      },
      this.dropdownContent,
    );
    this._appendListItems();

    if (countrySearch) {
      this._updateSearchResultsA11yText();
    }

    //* Create dropdownContainer markup.
    if (dropdownContainer) {
      const dropdownClasses = buildClassNames({
        iti: true,
        "iti--container": true,
        "iti--fullscreen-popup": useFullscreenPopup,
        "iti--inline-dropdown": !useFullscreenPopup,
        [containerClass]: Boolean(containerClass),
      });
      this.dropdown = createEl("div", { class: dropdownClasses });
      this.dropdown.appendChild(this.dropdownContent);
    } else {
      this.countryContainer.appendChild(this.dropdownContent);
    }
  }

  private _buildSearchUI(): void {
    const { i18n } = this.options;

    // Wrapper so we can position the icons (search + clear)
    const searchWrapper = createEl(
      "div",
      { class: "iti__search-input-wrapper" },
      this.dropdownContent,
    );

    // Search (magnifying glass) icon SVG
    this.searchIcon = createEl(
      "span",
      {
        class: "iti__search-icon",
        "aria-hidden": "true",
      },
      searchWrapper,
    );

    this.searchIcon.innerHTML = `
      <svg class="iti__search-icon-svg" width="14" height="14" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>`;

    this.searchInput = createEl(
      "input",
      {
        id: `iti-${this.id}__search-input`, // Chrome says inputs need either a name or an id
        type: "search",
        class: "iti__search-input",
        placeholder: i18n.searchPlaceholder,
        // role=combobox + aria-autocomplete=list + aria-activedescendant allows maintaining focus on the search input while allowing users to navigate search results with up/down keyboard keys
        role: "combobox",
        "aria-expanded": "true",
        "aria-label": i18n.searchPlaceholder,
        "aria-controls": `iti-${this.id}__country-listbox`,
        "aria-autocomplete": "list",
        autocomplete: "off",
      },
      searchWrapper,
    ) as HTMLInputElement;

    this.searchClearButton = createEl(
      "button",
      {
        type: "button",
        class: "iti__search-clear iti__hide",
        "aria-label": i18n.clearSearchAriaLabel,
        tabindex: "-1",
      },
      searchWrapper,
    ) as HTMLButtonElement;

    const maskId = `iti-${this.id}-clear-mask`;
    // Mask creates a transparent cross 'cut' through the filled circle so underlying input bg shows.
    this.searchClearButton.innerHTML = `
      <svg class="iti__search-clear-svg" width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <mask id="${maskId}" maskUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="white" />
          <path d="M5.2 5.2 L10.8 10.8 M10.8 5.2 L5.2 10.8" stroke="black" stroke-linecap="round" class="iti__search-clear-x" />
        </mask>
        <circle cx="8" cy="8" r="8" class="iti__search-clear-bg" mask="url(#${maskId})" />
      </svg>`;

    this.searchResultsA11yText = createEl(
      "span",
      { class: "iti__a11y-text" },
      this.dropdownContent,
    );

    // Visible no-results message (hidden by default)
    this.searchNoResults = createEl(
      "div",
      {
        class: "iti__no-results iti__hide",
        "aria-hidden": "true", // all a11y messaging happens in this.searchResultsA11yText
      },
      this.dropdownContent,
    );
    this.searchNoResults.textContent = i18n.zeroSearchResults;
  }

  private _maybeUpdateInputPaddingAndReveal(): void {
    if (this.countryContainer) {
      this._updateInputPadding();
      this.countryContainer.classList.remove("iti__v-hide");
    }
  }

  private _maybeBuildHiddenInputs(wrapper: HTMLElement): void {
    const { hiddenInput } = this.options;
    if (hiddenInput) {
      const telInputName = this.telInput.getAttribute("name") || "";
      const names = hiddenInput(telInputName);

      if (names.phone) {
        const existingInput = this.telInput.form?.querySelector(
          `input[name="${names.phone}"]`,
        );
        if (existingInput) {
          this.hiddenInput = existingInput as HTMLInputElement;
        } else {
          //* Create hidden input for the full international number.
          this.hiddenInput = createEl("input", {
            type: "hidden",
            name: names.phone,
          }) as HTMLInputElement;
          wrapper.appendChild(this.hiddenInput);
        }
      }

      if (names.country) {
        const existingInput = this.telInput.form?.querySelector(
          `input[name="${names.country}"]`,
        );
        if (existingInput) {
          this.hiddenInputCountry = existingInput as HTMLInputElement;
        } else {
          //* Create hidden input for the selected country iso2 code.
          this.hiddenInputCountry = createEl("input", {
            type: "hidden",
            name: names.country,
          }) as HTMLInputElement;
          wrapper.appendChild(this.hiddenInputCountry);
        }
      }
    }
  }

  //* For each country: add a country list item <li> to the countryList <ul> container.
  private _appendListItems(): void {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      // Compute classes (highlight first item when countrySearch disabled)
      const liClass = buildClassNames({
        iti__country: true,
        iti__highlight: i === 0,
      });

      const listItem = createEl("li", {
        id: `iti-${this.id}__item-${c.iso2}`,
        class: liClass,
        tabindex: "-1",
        role: "option",
        "aria-selected": "false",
      });
      listItem.dataset.dialCode = c.dialCode;
      listItem.dataset.countryCode = c.iso2;

      // Store this for later use e.g. country search filtering.
      c.nodeById[this.id] = listItem;

      // Build contents without innerHTML for safety and clarity
      if (this.options.showFlags) {
        createEl("div", { class: `iti__flag iti__${c.iso2}` }, listItem);
      }

      const nameEl = createEl("span", { class: "iti__country-name" }, listItem);
      nameEl.textContent = c.name;

      const dialEl = createEl("span", { class: "iti__dial-code" }, listItem);
      if (this.isRTL) {
        dialEl.setAttribute("dir", "ltr");
      }
      dialEl.textContent = `+${c.dialCode}`;

      frag.appendChild(listItem);
    }
    this.countryList.appendChild(frag);
  }

  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  private _setInitialState(overrideAutoCountry: boolean = false): void {
    //* Fix firefox bug: when first load page (with input with value set to number with intl dial code)
    //* and initialising plugin removes the dial code from the input, then refresh page,
    //* and we try to init plugin again but this time on number without dial code so show globe icon.
    const attributeValue = this.telInput.getAttribute("value");
    const inputValue = this.telInput.value;
    const useAttribute =
      attributeValue &&
      attributeValue.startsWith("+") &&
      (!inputValue || !inputValue.startsWith("+"));
    const val = useAttribute ? attributeValue : inputValue;
    const dialCode = this._getDialCode(val);
    const isRegionlessNanpNumber = isRegionlessNanp(val);
    const { initialCountry, geoIpLookup } = this.options;
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;

    //* If we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
    //* country, else fall back to the default country.
    if (dialCode && !isRegionlessNanpNumber) {
      this._updateCountryFromNumber(val);
    } else if (!isAutoCountry || overrideAutoCountry) {
      const lowerInitialCountry = initialCountry
        ? initialCountry.toLowerCase()
        : "";
      //* See if we should select a country.
      if (isIso2(lowerInitialCountry)) {
        this._setCountry(lowerInitialCountry);
      } else {
        if (dialCode && isRegionlessNanpNumber) {
          //* Has intl dial code, is regionless nanp, and no initialCountry, so default to US.
          this._setCountry("us");
        } else {
          //* Display the empty state (globe icon).
          this._setCountry("");
        }
      }
    }
    //* NOTE: if initialCountry is set to auto, that will be handled separately.

    //* Format - note this wont be run after _updateDialCode as that's only called if no val.
    if (val) {
      this._updateValFromNumber(val);
    }
  }

  //* Initialise the main event listeners: input keyup, and click selected country.
  private _initListeners(): void {
    this._initTelInputListeners();
    if (this.options.allowDropdown) {
      this._initDropdownListeners();
    }
    if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
      this._initHiddenInputListener();
    }
  }

  //* Update hidden input on form submit.
  private _initHiddenInputListener(): void {
    const handleHiddenInputSubmit = (): void => {
      if (this.hiddenInput) {
        this.hiddenInput.value = this.getNumber();
      }
      if (this.hiddenInputCountry) {
        this.hiddenInputCountry.value = this.selectedCountryData.iso2 || "";
      }
    };
    this.telInput.form?.addEventListener("submit", handleHiddenInputSubmit, {
      signal: this.abortController.signal,
    });
  }

  //* initialise the dropdown listeners.
  private _initDropdownListeners(): void {
    const signal = this.abortController.signal;
    //* Hack for input nested inside label (which is valid markup): clicking the selected country to
    //* open the dropdown would then automatically trigger a 2nd click on the input which would
    //* close it again.
    const handleLabelClick = (e: Event): void => {
      //* If the dropdown is closed, then focus the input, else ignore the click.
      if (this.dropdownContent.classList.contains("iti__hide")) {
        this.telInput.focus();
      } else {
        e.preventDefault();
      }
    };
    const label = this.telInput.closest("label");
    if (label) {
      label.addEventListener("click", handleLabelClick, { signal });
    }

    //* Toggle country dropdown on click.
    const handleClickSelectedCountry = (): void => {
      const dropdownClosed =
        this.dropdownContent.classList.contains("iti__hide");
      if (
        dropdownClosed &&
        !this.telInput.disabled &&
        !this.telInput.readOnly
      ) {
        this._openDropdown();
      }
    };
    this.selectedCountry.addEventListener("click", handleClickSelectedCountry, {
      signal,
    });

    //* Open dropdown if selected country is focused and they press up/down/space/enter.
    const handleCountryContainerKeydown = (e: KeyboardEvent): void => {
      const isDropdownHidden =
        this.dropdownContent.classList.contains("iti__hide");

      if (
        isDropdownHidden &&
        ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)
      ) {
        //* Prevent form from being submitted if "ENTER" was pressed.
        e.preventDefault();
        //* Prevent event from being handled again by document.
        e.stopPropagation();
        this._openDropdown();
      }

      //* Allow navigation from dropdown to input on TAB.
      if (e.key === "Tab") {
        this._closeDropdown();
      }
    };
    this.countryContainer.addEventListener(
      "keydown",
      handleCountryContainerKeydown,
      { signal },
    );
  }

  //* Init many requests: utils script / geo ip lookup.
  private _initRequests(): void {
    const { loadUtils, initialCountry, geoIpLookup } = this.options;

    //* If the user has specified the path to the utils script, fetch it on window.load, else resolve.
    if (loadUtils && !intlTelInput.utils) {
      const doAttachUtils = () => {
        //* Catch and ignore any errors to prevent unhandled-promise failures.
        //* The error from `attachUtils()` is also surfaced in each instance's
        //* `promise` property, so it's not getting lost by being ignored here.
        intlTelInput.attachUtils(loadUtils)?.catch(() => {});
      };

      //* If the plugin is being initialised after the window.load event has already been fired.
      if (intlTelInput.documentReady()) {
        doAttachUtils();
      } else {
        const handlePageLoad = (): void => {
          doAttachUtils();
        };
        //* Wait until the load event so we don't block any other requests e.g. the flags image.
        window.addEventListener("load", handlePageLoad, {
          signal: this.abortController.signal,
        });
      }
    } else {
      this.resolveUtilsScriptPromise();
    }

    //* Don't bother with IP lookup if we already have a selected country.
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;
    if (isAutoCountry && !this.selectedCountryData.iso2) {
      this._loadAutoCountry();
    } else {
      this.resolveAutoCountryPromise();
    }
  }

  //* Perform the geo ip lookup.
  private _loadAutoCountry(): void {
    //* 3 options:
    //* 1) Already loaded (we're done)
    //* 2) Not already started loading (start)
    //* 3) Already started loading (do nothing - just wait for loading callback to fire)
    if (intlTelInput.autoCountry) {
      this.handleAutoCountry();
    } else if (!intlTelInput.startedLoadingAutoCountry) {
      //* Don't do this twice!
      intlTelInput.startedLoadingAutoCountry = true;

      if (typeof this.options.geoIpLookup === "function") {
        this.options.geoIpLookup(
          (iso2 = "") => {
            const iso2Lower = iso2.toLowerCase();
            if (isIso2(iso2Lower)) {
              intlTelInput.autoCountry = iso2Lower;
              //* Tell all instances the auto country is ready.
              //TODO: this should just be the current instances
              //* UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
              //* away (e.g. if they have already done the geo ip lookup somewhere else). Using
              //* setTimeout means that the current thread of execution will finish before executing
              //* this, which allows the plugin to finish initialising.
              setTimeout(() => forEachInstance("handleAutoCountry"));
            } else {
              this._setInitialState(true);
              forEachInstance("rejectAutoCountryPromise");
            }
          },
          () => {
            this._setInitialState(true);
            forEachInstance("rejectAutoCountryPromise");
          },
        );
      }
    }
  }

  private _openDropdownWithPlus(): void {
    this._openDropdown();
    this.searchInput.value = "+";
    this._filterCountries("");
  }

  //* Initialize the tel input listeners.
  private _initTelInputListeners(): void {
    this._bindInputListener();
    this._maybeBindKeydownListener();
    this._maybeBindPasteListener();
  }

  private _bindInputListener(): void {
    const {
      strictMode,
      formatAsYouType,
      separateDialCode,
      allowDropdown,
      countrySearch,
    } = this.options;
    let userOverrideFormatting = false;
    //* If the initial val contains any alpha chars (e.g. the extension separator "ext."), then set the override, as libphonenumber's AYT-formatter cannot handle alphas.
    if (/\p{L}/u.test(this.telInput.value)) {
      userOverrideFormatting = true;
    }

    //* On input event: (1) Update selected country, (2) Format-as-you-type.
    //* Note that this fires AFTER the input is updated.
    const handleInputEvent = (e: InputEvent): void => {
      //* Android workaround for handling plus when separateDialCode enabled (as impossible to handle with keydown/keyup, for which e.key always returns "Unidentified", see https://stackoverflow.com/q/59584061/217866)
      if (
        this.isAndroid &&
        e?.data === "+" &&
        separateDialCode &&
        allowDropdown &&
        countrySearch
      ) {
        const currentCaretPos = this.telInput.selectionStart || 0;
        const valueBeforeCaret = this.telInput.value.substring(
          0,
          currentCaretPos - 1,
        );
        const valueAfterCaret = this.telInput.value.substring(currentCaretPos);
        this.telInput.value = valueBeforeCaret + valueAfterCaret;
        this._openDropdownWithPlus();
        return;
      }

      //* Update selected country.
      if (this._updateCountryFromNumber(this.telInput.value)) {
        this._triggerCountryChange();
      }

      //* If user types their own formatting char (not a plus or a numeric), or they paste something, then set the override.
      const isFormattingChar = e?.data && /[^+0-9]/.test(e.data);
      const isPaste = e?.inputType === "insertFromPaste" && this.telInput.value;
      if (isFormattingChar || (isPaste && !strictMode)) {
        userOverrideFormatting = true;
      }
      //* If user removes all formatting chars, then reset the override.
      else if (!/[^+0-9]/.test(this.telInput.value)) {
        userOverrideFormatting = false;
      }

      const isSetNumber = e?.detail && e.detail["isSetNumber"];
      //* Handle format-as-you-type, unless userOverrideFormatting, or isSetNumber.
      if (formatAsYouType && !userOverrideFormatting && !isSetNumber) {
        //* Maintain caret position after reformatting.
        const currentCaretPos = this.telInput.selectionStart || 0;
        const valueBeforeCaret = this.telInput.value.substring(
          0,
          currentCaretPos,
        );
        const relevantCharsBeforeCaret = valueBeforeCaret.replace(
          /[^+0-9]/g,
          "",
        ).length;
        const isDeleteForwards = e?.inputType === "deleteContentForward";
        const fullNumber = this._getFullNumber();
        const formattedValue = formatNumberAsYouType(
          fullNumber,
          this.telInput.value,
          intlTelInput.utils,
          this.selectedCountryData,
          this.options.separateDialCode,
        );
        const newCaretPos = translateCursorPosition(
          relevantCharsBeforeCaret,
          formattedValue,
          currentCaretPos,
          isDeleteForwards,
        );
        this.telInput.value = formattedValue;
        // WARNING: calling setSelectionRange triggers a focus on iOS
        this.telInput.setSelectionRange(newCaretPos, newCaretPos);
      }
    };
    //* This handles individual key presses as well as cut/paste events
    //* the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
    //* whereas "keyup" fires even for shift key, arrow key presses etc.
    this.telInput.addEventListener("input", handleInputEvent as EventListener, {
      signal: this.abortController.signal,
    });
  }

  private _maybeBindKeydownListener(): void {
    const { strictMode, separateDialCode, allowDropdown, countrySearch } =
      this.options;
    if (strictMode || separateDialCode) {
      //* On keydown event: (1) if strictMode then prevent invalid characters, (2) if separateDialCode then handle plus key
      //* Note that this fires BEFORE the input is updated.
      const handleKeydownEvent = (e: KeyboardEvent): void => {
        //* Only interested in actual character presses, rather than ctrl, alt, command, arrow keys, delete/backspace, cut/copy/paste etc.
        if (
          e.key &&
          e.key.length === 1 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          //* If separateDialCode, handle the plus key differently: open dropdown and put plus in the search input instead.
          if (
            separateDialCode &&
            allowDropdown &&
            countrySearch &&
            e.key === "+"
          ) {
            e.preventDefault();
            this._openDropdownWithPlus();
            return;
          }
          //* If strictMode, prevent invalid characters.
          if (strictMode) {
            const value = this.telInput.value;
            const alreadyHasPlus = value.startsWith("+");
            const isInitialPlus =
              !alreadyHasPlus &&
              this.telInput.selectionStart === 0 &&
              e.key === "+";
            const isNumeric = /^[0-9]$/.test(e.key);
            const isAllowedChar = separateDialCode
              ? isNumeric
              : isInitialPlus || isNumeric;

            // insert the new character in the right place
            const newValue =
              value.slice(0, this.telInput.selectionStart) +
              e.key +
              value.slice(this.telInput.selectionEnd);
            const newFullNumber = this._getFullNumber(newValue);
            const coreNumber = intlTelInput.utils.getCoreNumber(
              newFullNumber,
              this.selectedCountryData.iso2,
            );
            const hasExceededMaxLength =
              this.maxCoreNumberLength &&
              coreNumber.length > this.maxCoreNumberLength;

            const newCountry = this._getNewCountryFromNumber(newFullNumber);
            const isChangingDialCode = newCountry !== null;

            // ignore the char if (1) it's not an allowed char, or (2) this new char will exceed the max length and this char will not change the selected country and it's not the initial plus (aka they're starting to type a dial code)
            if (
              !isAllowedChar ||
              (hasExceededMaxLength && !isChangingDialCode && !isInitialPlus)
            ) {
              e.preventDefault();
            }
          }
        }
      };
      this.telInput.addEventListener("keydown", handleKeydownEvent, {
        signal: this.abortController.signal,
      });
    }
  }

  private _maybeBindPasteListener(): void {
    // Sanitise pasted values in strictMode
    if (this.options.strictMode) {
      const handlePasteEvent = (e: ClipboardEvent): void => {
        // in strict mode we always control the pasted value
        e.preventDefault();

        // shortcuts
        const input = this.telInput;
        const selStart = input.selectionStart;
        const selEnd = input.selectionEnd;
        const before = input.value.slice(0, selStart);
        const after = input.value.slice(selEnd);
        const iso2 = this.selectedCountryData.iso2;

        const pasted = e.clipboardData.getData("text");
        // only allow a plus in the pasted content if there's not already one in the input, or the existing one is selected to be replaced by the pasted content
        const initialCharSelected = selStart === 0 && selEnd > 0;
        const allowLeadingPlus =
          !input.value.startsWith("+") || initialCharSelected;
        // just numerics and pluses
        const allowedChars = pasted.replace(/[^0-9+]/g, "");
        const hasLeadingPlus = allowedChars.startsWith("+");
        // just numerics
        const numerics = allowedChars.replace(/\+/g, "");
        const sanitised =
          hasLeadingPlus && allowLeadingPlus ? `+${numerics}` : numerics;
        let newVal = before + sanitised + after;
        let coreNumber = intlTelInput.utils.getCoreNumber(newVal, iso2);

        // utils.getCoreNumber returns empty string for very long numbers
        // if this is the case, keep trimming the new value until we have a valid core number (or nothing left)
        while (coreNumber.length === 0 && newVal.length > 0) {
          newVal = newVal.slice(0, -1);
          coreNumber = intlTelInput.utils.getCoreNumber(newVal, iso2);
        }
        // if no valid core number can be found, then just ignore the paste
        if (!coreNumber) {
          return;
        }
        if (
          this.maxCoreNumberLength &&
          coreNumber.length > this.maxCoreNumberLength
        ) {
          if (input.selectionEnd === input.value.length) {
            // if they try to paste too many digits at the end, then just trim the excess
            const trimLength = coreNumber.length - this.maxCoreNumberLength;
            newVal = newVal.slice(0, newVal.length - trimLength);
          } else {
            // if they try to paste too many digits in the middle, then just ignore the paste entirely
            return;
          }
        }
        input.value = newVal;
        const caretPos = selStart + sanitised.length;
        input.setSelectionRange(caretPos, caretPos);

        // trigger format-as-you-type and country update etc
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      };
      this.telInput.addEventListener("paste", handlePasteEvent, {
        signal: this.abortController.signal,
      });
    }
  }

  //* Adhere to the input's maxlength attr.
  private _cap(number: string): string {
    const max = Number(this.telInput.getAttribute("maxlength"));
    return max && number.length > max ? number.substring(0, max) : number;
  }

  //* Trigger a custom event on the input (typed via ItiEventMap).
  private _trigger<K extends keyof ItiEventMap>(
    name: K,
    detailProps: ItiEventMap[K] = {} as ItiEventMap[K],
  ): void {
    const e = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: detailProps,
    });
    this.telInput.dispatchEvent(e);
  }

  //* Open the dropdown.
  private _openDropdown(): void {
    const { fixDropdownWidth, countrySearch } = this.options;

    // create a fresh AbortController for dropdown-scoped listeners
    // this.dropdownAbortController?.abort();
    this.dropdownAbortController = new AbortController();

    if (fixDropdownWidth) {
      this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`;
    }
    this.dropdownContent.classList.remove("iti__hide");
    this.selectedCountry.setAttribute("aria-expanded", "true");

    this._setDropdownPosition();

    if (countrySearch) {
      //* When countrySearch enabled, every time the dropdown is opened we reset by highlighting the first item and scrolling to top.
      const firstCountryItem = this.countryList
        .firstElementChild as HTMLElement;
      if (firstCountryItem) {
        this._highlightListItem(firstCountryItem, false);
        this.countryList.scrollTop = 0;
      }
      this.searchInput.focus();
    }

    //* Bind all the dropdown-related listeners: mouseover, click, click-off, keydown.
    this._bindDropdownListeners();

    //* Update the arrow.
    this.dropdownArrow.classList.add("iti__arrow--up");

    this._trigger("open:countrydropdown");
  }

  //* Set the dropdown position
  private _setDropdownPosition(): void {
    if (this.options.dropdownContainer) {
      this.options.dropdownContainer.appendChild(this.dropdown);
    }

    if (!this.options.useFullscreenPopup) {
      // getBoundingClientRect is relative to the viewport, so when you scroll down, pos.top goes down, hence needing to add on scrollTop below
      const inputPosRelativeToVP = this.telInput.getBoundingClientRect();
      const inputHeight = this.telInput.offsetHeight;

      //* If dropdownContainer is enabled, calculate postion.
      if (this.options.dropdownContainer) {
        //* Calculate position.
        this.dropdown.style.top = `${inputPosRelativeToVP.top + inputHeight}px`;
        this.dropdown.style.left = `${inputPosRelativeToVP.left}px`;

        //* Close menu on window scroll.
        const handleWindowScroll = (): void => this._closeDropdown();
        window.addEventListener("scroll", handleWindowScroll, {
          signal: this.dropdownAbortController.signal,
        });
      }
    }
  }

  //* We only bind dropdown listeners when the dropdown is open.
  private _bindDropdownListeners(): void {
    const signal = this.dropdownAbortController.signal;
    //* When mouse over a list item, just highlight that one
    //* we add the class "highlight", so if they hit "enter" we know which one to select.
    const handleMouseoverCountryList = (e: MouseEvent): void => {
      //* Handle event delegation, as we're listening for this event on the countryList.
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(
        ".iti__country",
      );
      if (listItem) {
        this._highlightListItem(listItem, false);
      }
    };
    this.countryList.addEventListener("mouseover", handleMouseoverCountryList, {
      signal,
    });

    //* Listen for country selection.
    const handleClickCountryList = (e: MouseEvent): void => {
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(
        ".iti__country",
      );
      if (listItem) {
        this._selectListItem(listItem);
      }
    };
    this.countryList.addEventListener("click", handleClickCountryList, {
      signal,
    });

    //* Click off to close (except when this initial opening click is bubbling up).
    //* We cannot just stopPropagation as it may be needed to close another instance.
    const handleClickOffToClose = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const clickedInsideDropdown = !!target.closest(
        `#iti-${this.id}__dropdown-content`,
      );
      // only close if clicked outside (allow clicks on country search input/clear button/no results message etc)
      if (!clickedInsideDropdown) {
        this._closeDropdown();
      }
    };
    // Use setTimeout to allow this event listener to be bound after the current thread of execution, which is where the opening click is happening (which would otherwise immediately trigger click-off-to-close so the dropdown would never open)
    setTimeout(() => {
      document.documentElement.addEventListener(
        "click",
        handleClickOffToClose,
        { signal },
      );
    }, 0);

    //* Listen for up/down scrolling, enter to select, or escape to close.
    //* Use keydown as keypress doesn't fire for non-char keys and we want to catch if they
    //* just hit down and hold it to scroll down (no keyup event).
    //* Listen on the document because that's where key events are triggered if no input has focus.
    let query = "";
    let queryTimer: NodeJS.Timeout | null = null;
    const handleKeydownOnDropdown = (e: KeyboardEvent): void => {
      //* prevent down key from scrolling the whole page, and enter key from submitting a form etc.
      if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        //* Up and down to navigate.
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          this._handleUpDownKey(e.key);
        }
        //* Enter to select.
        else if (e.key === "Enter") {
          this._handleEnterKey();
        }
        //* Esc to close
        else if (e.key === "Escape") {
          this._closeDropdown();
        }
      }

      //* When countrySearch disabled: Listen for alpha chars to perform hidden search.
      //* Regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866.
      if (!this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
        e.stopPropagation();
        //* Jump to countries that start with the query string.
        if (queryTimer) {
          clearTimeout(queryTimer);
        }
        query += e.key.toLowerCase();
        this._searchForCountry(query);
        //* If the timer hits 1 second, reset the query.
        queryTimer = setTimeout(() => {
          query = "";
        }, 1000);
      }
    };
    document.addEventListener("keydown", handleKeydownOnDropdown, { signal });

    if (this.options.countrySearch) {
      const doFilter = (): void => {
        const inputQuery = this.searchInput.value.trim();
        this._filterCountries(inputQuery);
        // show/hide clear button
        if (this.searchInput.value) {
          this.searchClearButton.classList.remove("iti__hide");
        } else {
          this.searchClearButton.classList.add("iti__hide");
        }
      };

      let keyupTimer: NodeJS.Timeout | null = null;
      const handleSearchChange = (): void => {
        //* Filtering country nodes is expensive (lots of DOM manipulation), so rate limit it.
        if (keyupTimer) {
          clearTimeout(keyupTimer);
        }
        keyupTimer = setTimeout(() => {
          doFilter();
          keyupTimer = null;
        }, 100);
      };
      this.searchInput.addEventListener("input", handleSearchChange, {
        signal,
      });

      const handleSearchClear = (): void => {
        this.searchInput.value = "";
        this.searchInput.focus();
        doFilter();
      };
      // Prevent click from closing dropdown, clear text, refocus input, and reset filter
      this.searchClearButton.addEventListener("click", handleSearchClear, {
        signal,
      });
    }
  }

  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  private _searchForCountry(query: string): void {
    for (const c of this.countries) {
      const startsWith =
        c.name.substring(0, query.length).toLowerCase() === query;
      if (startsWith) {
        const listItem = c.nodeById[this.id];
        //* Update highlighting and scroll.
        this._highlightListItem(listItem, false);
        this._scrollTo(listItem);
        break;
      }
    }
  }

  //* Country search enabled: Filter the countries according to the search query.
  private _filterCountries(query: string): void {
    this.countryList.innerHTML = "";
    let matchedCountries: Country[];

    if (query === "") {
      // reset - back to all countries
      matchedCountries = this.countries;
    } else {
      matchedCountries = this._getMatchedCountries(query);
    }

    let noCountriesAddedYet = true;
    for (const c of matchedCountries) {
      const listItem = c.nodeById[this.id];
      if (listItem) {
        this.countryList.appendChild(listItem);

        //* Highlight the first item
        if (noCountriesAddedYet) {
          this._highlightListItem(listItem, false);
          noCountriesAddedYet = false;
        }
      }
    }
    if (noCountriesAddedYet) {
      //* If no countries are shown, unhighlight the previously highlighted item.
      this._highlightListItem(null, false);
      if (this.searchNoResults) {
        this.searchNoResults.classList.remove("iti__hide");
      }
    } else if (this.searchNoResults) {
      this.searchNoResults.classList.add("iti__hide");
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList.scrollTop = 0;
    this._updateSearchResultsA11yText();
  }

  private _getMatchedCountries(query: string): Country[] {
    const normalisedQuery = normaliseString(query);
    // search result groups, in order of priority
    // first, exact ISO2 matches, then name starts with, then name contains, dial code match etc.
    const iso2Matches: Country[] = [];
    const nameStartWith: Country[] = [];
    const nameContains: Country[] = [];
    const dialCodeMatches: Country[] = [];
    const dialCodeContains: Country[] = [];
    const initialsMatches: Country[] = [];

    for (const c of this.countries) {
      if (c.iso2 === normalisedQuery) {
        iso2Matches.push(c);
      } else if (c.normalisedName.startsWith(normalisedQuery)) {
        nameStartWith.push(c);
      } else if (c.normalisedName.includes(normalisedQuery)) {
        nameContains.push(c);
      } else if (
        normalisedQuery === c.dialCode ||
        normalisedQuery === c.dialCodePlus
      ) {
        dialCodeMatches.push(c);
      } else if (c.dialCodePlus.includes(normalisedQuery)) {
        dialCodeContains.push(c);
      } else if (c.initials.includes(normalisedQuery)) {
        initialsMatches.push(c);
      }
    }

    // Combine result groups in correct order (and respect country priority order within each group e.g. if search +44, then UK appears first above Guernsey etc)
    return [
      ...iso2Matches.sort((a, b) => a.priority - b.priority),
      ...nameStartWith.sort((a, b) => a.priority - b.priority),
      ...nameContains.sort((a, b) => a.priority - b.priority),
      ...dialCodeMatches.sort((a, b) => a.priority - b.priority),
      ...dialCodeContains.sort((a, b) => a.priority - b.priority),
      ...initialsMatches.sort((a, b) => a.priority - b.priority),
    ];
  }

  //* Update search results text (for a11y).
  private _updateSearchResultsA11yText(): void {
    const { i18n } = this.options;
    const count = this.countryList.childElementCount;
    let searchText: string;
    if (count === 0) {
      searchText = i18n.zeroSearchResults;
    } else {
      // one or more results
      if (i18n.searchResultsText) {
        searchText = i18n.searchResultsText(count);
      } else if (count === 1) {
        searchText = i18n.oneSearchResult;
      } else {
        // eslint-disable-next-line no-template-curly-in-string
        searchText = i18n.multipleSearchResults.replace(
          "${count}",
          count.toString(),
        );
      }
    }
    this.searchResultsA11yText.textContent = searchText;
  }

  //* Highlight the next/prev item in the list (and ensure it is visible).
  private _handleUpDownKey(key: string): void {
    let next =
      key === "ArrowUp"
        ? (this.highlightedItem?.previousElementSibling as HTMLElement)
        : (this.highlightedItem?.nextElementSibling as HTMLElement);
    if (!next && this.countryList.childElementCount > 1) {
      //* Otherwise, we must be at the end, so loop round again.
      next =
        key === "ArrowUp"
          ? (this.countryList.lastElementChild as HTMLElement)
          : (this.countryList.firstElementChild as HTMLElement);
    }
    if (next) {
      //* Make sure the next item is visible
      //* (before calling focus(), which can cause the next item to scroll to the middle of the dropdown, which is jarring).
      this._scrollTo(next);
      //* If country search enabled, don't lose focus from the search input on up/down
      this._highlightListItem(next, false);
    }
  }

  //* Select the currently highlighted item.
  private _handleEnterKey(): void {
    if (this.highlightedItem) {
      this._selectListItem(this.highlightedItem);
    }
  }

  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
  private _updateValFromNumber(fullNumber: string): void {
    let number = fullNumber;
    if (
      this.options.formatOnDisplay &&
      intlTelInput.utils &&
      this.selectedCountryData
    ) {
      const useNational =
        this.options.nationalMode ||
        (!number.startsWith("+") && !this.options.separateDialCode);
      const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInput.utils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format,
      );
    }

    number = this._beforeSetNumber(number);
    this.telInput.value = number;
  }

  //* Check if need to select a new country based on the given number
  //* Note: called from _setInitialState, keyup handler, setNumber.
  private _updateCountryFromNumber(fullNumber: string): boolean {
    const iso2 = this._getNewCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this._setCountry(iso2);
    }
    return false;
  }

  // if there is a selected country, and the number doesn't start with a dial code, then add it
  private _ensureHasDialCode(number: string): string {
    const { dialCode, nationalPrefix } = this.selectedCountryData;
    const alreadyHasPlus = number.startsWith("+");
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    //* Don't remove "nationalPrefix" digit if separateDialCode is enabled, as it can be part of a valid area code e.g. in Russia then have area codes starting with 8, which is also the national prefix digit.
    const hasPrefix =
      nationalPrefix &&
      number.startsWith(nationalPrefix) &&
      !this.options.separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }

  // Get the country ISO2 code from the given number
  // BUT ONLY IF ITS CHANGED FROM THE CURRENTLY SELECTED COUNTRY
  // NOTE: consider refactoring this to be more clear
  private _getNewCountryFromNumber(fullNumber: string): Iso2 | "" | null {
    const plusIndex = fullNumber.indexOf("+");
    //* If it contains a plus, discard any chars before it e.g. accidental space char.
    //* This keeps the selected country auto-updating correctly, which we want as
    //* libphonenumber's validation/getNumber methods will ignore these chars anyway.
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
    const selectedIso2 = this.selectedCountryData.iso2;
    const selectedDialCode = this.selectedCountryData.dialCode;

    //* Ensure the number starts with the dial code (if there is a selected country), for getDialCode to work properly (e.g. if number is entered in national format, or with separateDialCode enabled)
    number = this._ensureHasDialCode(number);

    //* Try and extract valid dial code (plus area code digits) from input.
    const dialCodeMatch = this._getDialCode(number, true);
    const numeric = getNumeric(number);
    if (dialCodeMatch) {
      // we have a match, so we WILL be selecting a country (unless it's already selected)
      const dialCodeMatchNumeric = getNumeric(dialCodeMatch);
      const iso2Codes = this.dialCodeToIso2Map[dialCodeMatchNumeric];

      // SINGLE country found for the typed dialcode/areacode
      if (iso2Codes.length === 1) {
        // if it's already selected, then no change
        if (iso2Codes[0] === selectedIso2) {
          return null;
        }
        // it's not already selected, so change
        return iso2Codes[0];
      }

      // MULTIPLE countries found for the typed dialcode/areacode

      //* If they've just typed a dial code (from empty state), and it matches the last selected country (this.defaultCountry), then stick to that country e.g. if they select Aland Islands, then type it's dial code +358, we should stick to that country and not switch to Finland!
      if (
        !selectedIso2 &&
        this.defaultCountry &&
        iso2Codes.includes(this.defaultCountry)
      ) {
        return this.defaultCountry;
      }

      // if they're typing a regionless NANP number and they already have a NANP country selected, then don't change the country
      const isRegionlessNanpNumber =
        selectedDialCode === "1" && isRegionlessNanp(numeric);
      if (isRegionlessNanpNumber) {
        return null;
      }

      // if the currently selected country has area codes and the entered number already has a full match to one of them, then don't change the country
      const { areaCodes, priority } = this.selectedCountryData;
      if (areaCodes) {
        const dialCodeAreaCodes = areaCodes.map(
          (areaCode) => `${selectedDialCode}${areaCode}`,
        );
        for (const dialCodeAreaCode of dialCodeAreaCodes) {
          if (numeric.startsWith(dialCodeAreaCode)) {
            // it's a full area code match, so the right country is already selected
            return null;
          }
        }
      }

      // If the currently selected country has area codes (and it's not the "main" country, which only has partial area code coverage), and they've typed more digits than the best area code match, then that means none of the area codes matched the input number, as a full area code match would have been caught above.
      const isMainCountry = priority === 0;
      const hasAreaCodesButNoneMatched =
        areaCodes &&
        !isMainCountry &&
        numeric.length > dialCodeMatchNumeric.length;
      const isValidSelection =
        selectedIso2 &&
        iso2Codes.includes(selectedIso2) &&
        !hasAreaCodesButNoneMatched;
      // extra protection: don't return isoCodes[0] if it's already selected
      const alreadySelected = selectedIso2 === iso2Codes[0];

      if (!isValidSelection && !alreadySelected) {
        return iso2Codes[0];
      }
    } else if (number.startsWith("+") && numeric.length) {
      //* Invalid dial code, so empty.
      //* Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars.
      return "";
    } else if ((!number || number === "+") && !selectedIso2) {
      //* If no selected country, and user either clears the input, or just types a plus, then show default.
      return this.defaultCountry;
    }
    return null;
  }

  //* Remove highlighting from other list items and highlight the given item.
  private _highlightListItem(
    listItem: HTMLElement | null,
    shouldFocus: boolean,
  ): void {
    const prevItem = this.highlightedItem;
    if (prevItem) {
      prevItem.classList.remove("iti__highlight");
      prevItem.setAttribute("aria-selected", "false");
    }
    //* Set this, even if it's null, as it will clear the highlight.
    this.highlightedItem = listItem;
    if (this.highlightedItem) {
      this.highlightedItem.classList.add("iti__highlight");
      this.highlightedItem.setAttribute("aria-selected", "true");
      if (this.options.countrySearch) {
        const activeDescendant = this.highlightedItem.getAttribute("id") || "";
        this.searchInput.setAttribute(
          "aria-activedescendant",
          activeDescendant,
        );
      }
    }

    if (shouldFocus) {
      this.highlightedItem.focus();
    }
  }

  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  private _setCountry(iso2: Iso2 | ""): boolean {
    const { separateDialCode, showFlags, i18n } = this.options;

    const prevIso2 = this.selectedCountryData.iso2 || "";

    this.selectedCountryData = iso2
      ? (this.countryByIso2.get(iso2) as Country)
      : ({} as SelectedCountryData);

    //* Update the defaultCountry - we only need the iso2 from now on, so just store that.
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    //* Update the flag class and the a11y text.
    if (this.selectedCountry) {
      const flagClass =
        iso2 && showFlags ? `iti__flag iti__${iso2}` : "iti__flag iti__globe";
      let ariaLabel, title;
      if (iso2) {
        const { name, dialCode } = this.selectedCountryData;
        title = name;
        ariaLabel = i18n.selectedCountryAriaLabel
          .replace("${countryName}", name)
          .replace("${dialCode}", `+${dialCode}`);
      } else {
        title = i18n.noCountrySelected;
        ariaLabel = i18n.noCountrySelected;
      }
      this.selectedCountryInner.className = flagClass;
      this.selectedCountry.setAttribute("title", title);
      this.selectedCountry.setAttribute("aria-label", ariaLabel);
    }

    //* Update the selected dial code.
    if (separateDialCode) {
      const dialCode = this.selectedCountryData.dialCode
        ? `+${this.selectedCountryData.dialCode}`
        : "";
      this.selectedDialCode.textContent = dialCode;
      this._updateInputPadding();
    }

    //* And the input's placeholder.
    this._updatePlaceholder();

    //* Update the maximum valid number length.
    this._updateMaxLength();

    //* Return if the country has changed or not.
    return prevIso2 !== iso2;
  }

  //* Update the input padding to make space for the selected country/dial code.
  private _updateInputPadding(): void {
    if (this.selectedCountry) {
      // if all else fails, these are better than nothing
      const saneDefaultWidth = this.options.separateDialCode ? 78 : 42;
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth =
        this.selectedCountry.offsetWidth ||
        this._getHiddenSelectedCountryWidth() ||
        saneDefaultWidth;
      const inputPadding = selectedCountryWidth + 6;
      this.telInput.style.paddingLeft = `${inputPadding}px`;
    }
  }

  //* Update the maximum valid number length for the currently selected country.
  private _updateMaxLength(): void {
    const { strictMode, placeholderNumberType, validationNumberTypes } =
      this.options;
    const { iso2 } = this.selectedCountryData;
    if (strictMode && intlTelInput.utils) {
      if (iso2) {
        const numberType = intlTelInput.utils.numberType[placeholderNumberType];
        let exampleNumber = intlTelInput.utils.getExampleNumber(
          iso2,
          false,
          numberType,
          true,
        );
        //* See if adding more digits is still valid to get the true maximum valid length.
        let validNumber = exampleNumber;
        while (
          intlTelInput.utils.isPossibleNumber(
            exampleNumber,
            iso2,
            validationNumberTypes,
          )
        ) {
          validNumber = exampleNumber;
          exampleNumber += "0";
        }
        const coreNumber = intlTelInput.utils.getCoreNumber(validNumber, iso2);
        this.maxCoreNumberLength = coreNumber.length;

        // hack for Belarus, because for some reason, getCoreNumber("80294911911"), aka the placeholder number, returns "294911911" (9 digits), but getCoreNumber("8029491191"), aka you're typing the penultimate digit of the placeholder number, returns "8029491191" (10 digits) and so strictMode blocks it. so we increase the max length to 10 digits to allow this penultimate digit, and then when they type the final digit, getCoreNumber will return 9 digits again, so it will be fine.
        if (iso2 === "by") {
          this.maxCoreNumberLength = coreNumber.length + 1;
        }
      } else {
        this.maxCoreNumberLength = null;
      }
    }
  }

  //* When input is in a hidden container during init, we cannot calculate the selected country width.
  //* Fix: clone the markup, make it invisible, add it to the end of the DOM, and then measure it's width.
  //* To get the right styling to apply, all we need is a shallow clone of the container,
  //* and then to inject a deep clone of the selectedCountry element.
  private _getHiddenSelectedCountryWidth(): number {
    if (this.telInput.parentNode) {
      // Use window.top as a fix for same-origin iframes (that are hidden during init) where even appending it to document.body would still be hidden. window.top accesses the top-most document, which will not be hidden.
      let body;
      try {
        body = window.top.document.body;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // fix for cross-origin iframes, where accessing window.top.document throws a security error
        body = document.body;
      }

      const containerClone = this.telInput.parentNode.cloneNode(
        false,
      ) as HTMLElement;
      containerClone.style.visibility = "hidden";
      body.appendChild(containerClone);

      const countryContainerClone =
        this.countryContainer.cloneNode() as HTMLElement;
      containerClone.appendChild(countryContainerClone);

      const selectedCountryClone = this.selectedCountry.cloneNode(
        true,
      ) as HTMLElement;
      countryContainerClone.appendChild(selectedCountryClone);

      const width = selectedCountryClone.offsetWidth;
      body.removeChild(containerClone);
      return width;
    }
    return 0;
  }

  //* Update the input placeholder to an example number from the currently selected country.
  private _updatePlaceholder(): void {
    const {
      autoPlaceholder,
      placeholderNumberType,
      nationalMode,
      customPlaceholder,
    } = this.options;
    const shouldSetPlaceholder =
      autoPlaceholder === "aggressive" ||
      (!this.hadInitialPlaceholder && autoPlaceholder === "polite");

    if (intlTelInput.utils && shouldSetPlaceholder) {
      const numberType = intlTelInput.utils.numberType[placeholderNumberType];
      //* Note: Must set placeholder to empty string if no country selected (globe icon showing).
      let placeholder = this.selectedCountryData.iso2
        ? intlTelInput.utils.getExampleNumber(
            this.selectedCountryData.iso2,
            nationalMode,
            numberType,
          )
        : "";

      placeholder = this._beforeSetNumber(placeholder);
      if (typeof customPlaceholder === "function") {
        placeholder = customPlaceholder(placeholder, this.selectedCountryData);
      }
      this.telInput.setAttribute("placeholder", placeholder);
    }
  }

  //* Called when the user selects a list item from the dropdown.
  private _selectListItem(listItem: HTMLElement): void {
    //* Update selected country and active list item.
    const iso2 = listItem.dataset.countryCode as Iso2;
    const countryChanged = this._setCountry(iso2);
    this._closeDropdown();

    const dialCode = listItem.dataset.dialCode;
    this._updateDialCode(dialCode);

    // reformat any existing number to the new country
    if (this.options.formatOnDisplay) {
      this._updateValFromNumber(this.telInput.value);
    }

    //* Focus the input.
    this.telInput.focus();

    if (countryChanged) {
      this._triggerCountryChange();
    }
  }

  //* Close the dropdown and unbind any listeners.
  private _closeDropdown(): void {
    // we call closeDropdown in places where it might not even be open e.g. in destroy()
    if (this.dropdownContent.classList.contains("iti__hide")) {
      return;
    }
    this.dropdownContent.classList.add("iti__hide");
    this.selectedCountry.setAttribute("aria-expanded", "false");
    if (this.highlightedItem) {
      this.highlightedItem.setAttribute("aria-selected", "false");
    }
    if (this.options.countrySearch) {
      this.searchInput.removeAttribute("aria-activedescendant");
    }

    //* Update the arrow.
    this.dropdownArrow.classList.remove("iti__arrow--up");

    //* Unbind dropdown-scoped events in one go
    this.dropdownAbortController.abort();
    this.dropdownAbortController = null;

    //* Remove dropdown from container.
    if (this.options.dropdownContainer) {
      this.dropdown.remove();
    }

    this._trigger("close:countrydropdown");
  }

  //* Check if an element is visible within it's container, else scroll until it is.
  private _scrollTo(element: HTMLElement): void {
    const container = this.countryList;
    const scrollTop = document.documentElement.scrollTop;
    const containerHeight = container.offsetHeight;
    const containerTop = container.getBoundingClientRect().top + scrollTop;
    const containerBottom = containerTop + containerHeight;
    const elementHeight = element.offsetHeight;
    const elementTop = element.getBoundingClientRect().top + scrollTop;
    const elementBottom = elementTop + elementHeight;
    const newScrollTop = elementTop - containerTop + container.scrollTop;

    if (elementTop < containerTop) {
      //* Scroll up.
      container.scrollTop = newScrollTop;
    } else if (elementBottom > containerBottom) {
      //* Scroll down.
      const heightDifference = containerHeight - elementHeight;
      container.scrollTop = newScrollTop - heightDifference;
    }
  }

  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  private _updateDialCode(newDialCodeBare: string): void {
    const inputVal = this.telInput.value;
    //* Save having to pass this every time.
    const newDialCode = `+${newDialCodeBare}`;

    let newNumber;
    if (inputVal.startsWith("+")) {
      //* There's a plus so we're dealing with a replacement.
      const prevDialCode = this._getDialCode(inputVal);
      if (prevDialCode) {
        //* Current number contains a valid dial code, so replace it.
        newNumber = inputVal.replace(prevDialCode, newDialCode);
      } else {
        //* Current number contains an invalid dial code, so ditch it
        //* (no way to determine where the invalid dial code ends and the rest of the number begins)
        newNumber = newDialCode;
      }
      this.telInput.value = newNumber;
    }
  }

  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  private _getDialCode(number: string, includeAreaCode?: boolean): string {
    let dialCode = "";
    //* Only interested in international numbers (starting with a plus)
    if (number.startsWith("+")) {
      let numericChars = "";
      //* Iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        //* If char is number.
        if (/[0-9]/.test(c)) {
          numericChars += c;
          const isMatch = Boolean(this.dialCodeToIso2Map[numericChars]);
          if (!isMatch) {
            // if no match, don't continue
            break;
          }
          if (includeAreaCode) {
            //* Store the actual raw string (useful for matching later).
            dialCode = number.substring(0, i + 1);
          } else if (this.dialCodes.has(numericChars)) {
            //* Current numericChars make a valid dial code, so store it and break out as we're done.
            //* Store the actual raw string (useful for matching later).
            dialCode = number.substring(0, i + 1);
            break;
          }
          //* Stop searching as soon as we can - in this case when we hit max len.
          if (numericChars.length === this.dialCodeMaxLen) {
            break;
          }
        }
      }
    }
    return dialCode;
  }

  //* Get the input val, adding the dial code if separateDialCode is enabled.
  private _getFullNumber(overrideVal?: string): string {
    const val = overrideVal || this.telInput.value.trim();
    const { dialCode } = this.selectedCountryData;
    let prefix;
    const numericVal = getNumeric(val);

    if (
      this.options.separateDialCode &&
      !val.startsWith("+") &&
      dialCode &&
      numericVal
    ) {
      //* When using separateDialCode, it is visible so is effectively part of the typed number.
      prefix = `+${dialCode}`;
    } else {
      prefix = "";
    }
    return prefix + val;
  }

  //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
  private _beforeSetNumber(fullNumber: string): string {
    const dialCode = this._getDialCode(fullNumber);
    const number = beforeSetNumber(
      fullNumber,
      dialCode,
      this.options.separateDialCode,
      this.selectedCountryData,
    );
    return this._cap(number);
  }

  //* Trigger the 'countrychange' event.
  private _triggerCountryChange(): void {
    this._trigger("countrychange");
  }

  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************

  //* This is called when the geoip call returns.
  handleAutoCountry(): void {
    if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
      //* We must set this even if there is an initial val in the input: in case the initial val is
      //* invalid and they delete it - they should see their auto country.
      this.defaultCountry = intlTelInput.autoCountry;
      const hasSelectedCountryOrGlobe =
        this.selectedCountryData.iso2 ||
        this.selectedCountryInner.classList.contains("iti__globe");
      //* If no country/globe currently selected, then update the country.
      if (!hasSelectedCountryOrGlobe) {
        this.setCountry(this.defaultCountry);
      }
      this.resolveAutoCountryPromise();
    }
  }

  //* This is called when the utils request completes.
  handleUtils(): void {
    //* If the request was successful
    if (intlTelInput.utils) {
      //* If there's an initial value in the input, then format it.
      if (this.telInput.value) {
        this._updateValFromNumber(this.telInput.value);
      }
      if (this.selectedCountryData.iso2) {
        this._updatePlaceholder();
        this._updateMaxLength();
      }
    }
    this.resolveUtilsScriptPromise();
  }

  //********************
  //*  PUBLIC METHODS
  //********************

  //* Remove plugin.
  destroy(): void {
    this.telInput.iti = undefined;
    const { allowDropdown, separateDialCode } = this.options;
    if (allowDropdown) {
      //* Make sure the dropdown is closed (and unbind listeners).
      this._closeDropdown();
    }

    //* Abort all listeners registered via the main controller
    this.abortController.abort();

    //* Remove attribute of id instance: data-intl-tel-input-id.
    delete this.telInput.dataset.intlTelInputId;

    //* Restore original styling
    if (separateDialCode) {
      this.telInput.style.paddingLeft = this.originalPaddingLeft;
    }

    //* Remove markup (but leave the original input).
    const wrapper = this.telInput.parentNode as HTMLElement;
    wrapper.before(this.telInput);
    wrapper.remove();

    if (intlTelInput.instances instanceof Map) {
      intlTelInput.instances.delete(this.id);
    } else {
      delete (intlTelInput.instances as any)[this.id];
    }
  }

  //* Get the extension from the current number.
  getExtension(): string {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getExtension(
        this._getFullNumber(),
        this.selectedCountryData.iso2,
      );
    }
    return "";
  }

  //* Format the number to the given format.
  getNumber(format?: number): string {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.formatNumber(
        this._getFullNumber(),
        iso2,
        format,
      );
    }
    return "";
  }

  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType(): number {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getNumberType(
        this._getFullNumber(),
        this.selectedCountryData.iso2,
      );
    }
    return -99;
  }

  //* Get the country data for the currently selected country.
  getSelectedCountryData(): SelectedCountryData {
    return this.selectedCountryData;
  }

  //* Get the validation error.
  getValidationError(): number {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.getValidationError(this._getFullNumber(), iso2);
    }
    return -99;
  }

  //* Validate the input val using number length only
  isValidNumber(): boolean | null {
    // custom validation for UK mobile numbers - useful when validationNumberTypes=["MOBILE", "FIXED_LINE"], where UK fixed_line numbers can be much shorter than mobile numbers
    const { dialCode, iso2 } = this.selectedCountryData;
    if (dialCode === "44" && intlTelInput.utils) {
      const number = this._getFullNumber();
      const coreNumber = intlTelInput.utils.getCoreNumber(number, iso2);
      // UK mobile numbers (starting with a 7) must have a core number that is 10 digits long (excluding dial code/national prefix)
      if (coreNumber[0] === "7" && coreNumber.length !== 10) {
        return false;
      }
    }
    return this._validateNumber(false);
  }

  //* Validate the input val with precise validation
  isValidNumberPrecise(): boolean | null {
    return this._validateNumber(true);
  }

  private _utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(
          val,
          this.selectedCountryData.iso2,
          this.options.validationNumberTypes,
        )
      : null;
  }

  //* Shared internal validation logic to handle alpha character extension rules.
  private _validateNumber(precise: boolean): boolean | null {
    if (!intlTelInput.utils) {
      return null;
    }
    if (!this.selectedCountryData.iso2) {
      return false;
    }

    const testValidity = (s: string) =>
      precise ? this._utilsIsValidNumber(s) : this._utilsIsPossibleNumber(s);

    const val = this._getFullNumber();
    const alphaCharPosition = val.search(/\p{L}/u);
    const hasAlphaChar = alphaCharPosition > -1;
    if (hasAlphaChar && !this.options.allowPhonewords) {
      const beforeAlphaChar = val.substring(0, alphaCharPosition);
      //* Workaround to allow some alpha chars e.g. "+1 (444) 444-4444 ext. 1234" while rejecting others e.g. "+1 (444) 444-FAST". The only legit use of alpha chars is as an extension separator, in which case, the number before it must be valid on its own.
      const beforeAlphaIsValid = testValidity(beforeAlphaChar);
      const isValid = testValidity(val);
      return beforeAlphaIsValid && isValid;
    }
    return testValidity(val);
  }

  private _utilsIsValidNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(
          val,
          this.selectedCountryData.iso2,
          this.options.validationNumberTypes,
        )
      : null;
  }

  //* Update the selected country, and update the input val accordingly.
  setCountry(iso2: Iso2): void {
    const iso2Lower = iso2?.toLowerCase() as Iso2;
    // handle invalid iso2
    if (!isIso2(iso2Lower)) {
      throw new Error(`Invalid country code: '${iso2Lower}'`);
    }

    const currentCountry = this.selectedCountryData.iso2;
    //* There is a country change IF: either there is a new country and it's different to the current one, OR there is no new country (i.e. globe state) and there is a current country
    const isCountryChange =
      (iso2 && iso2Lower !== currentCountry) || (!iso2 && currentCountry);
    if (isCountryChange) {
      this._setCountry(iso2Lower);
      this._updateDialCode(this.selectedCountryData.dialCode);
      // reformat
      if (this.options.formatOnDisplay) {
        this._updateValFromNumber(this.telInput.value);
      }
      this._triggerCountryChange();
    }
  }

  //* Set the input value and update the country.
  setNumber(number: string): void {
    //* We must update the country first, which updates this.selectedCountryData, which is used for
    //* formatting the number before displaying it.
    const countryChanged = this._updateCountryFromNumber(number);
    this._updateValFromNumber(number);
    if (countryChanged) {
      this._triggerCountryChange();
    }
    //* This is required for the React cmp to update its state correctly.
    this._trigger("input", { isSetNumber: true });
  }

  //* Set the placeholder number typ
  setPlaceholderNumberType(type: NumberType): void {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }

  setDisabled(disabled: boolean): void {
    this.telInput.disabled = disabled;
    if (disabled) {
      this.selectedCountry.setAttribute("disabled", "true");
    } else {
      this.selectedCountry.removeAttribute("disabled");
    }
  }
}

/********************
 *  STATIC METHODS
 ********************/

//* Load the utils script.
const attachUtils = (source: UtilsLoader): Promise<boolean> | null => {
  //* 2 Options:
  //* 1) Not already started loading (start)
  //* 2) Already started loading (do nothing - just wait for the onload callback to fire, which will
  //* trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
  if (!intlTelInput.utils && !intlTelInput.startedLoadingUtilsScript) {
    let loadCall;
    if (typeof source === "function") {
      try {
        loadCall = Promise.resolve(source());
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(
        new TypeError(
          `The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof source}`,
        ),
      );
    }

    //* Only do this once.
    intlTelInput.startedLoadingUtilsScript = true;

    return loadCall
      .then((module) => {
        const utils = module?.default;
        if (!utils || typeof utils !== "object") {
          throw new TypeError(
            "The loader function passed to attachUtils did not resolve to a module object with utils as its default export.",
          );
        }

        intlTelInput.utils = utils;
        forEachInstance("handleUtils");
        return true;
      })
      .catch((error: Error) => {
        forEachInstance("rejectUtilsScriptPromise", error);
        throw error;
      });
  }
  return null;
};

//* Convenience wrapper.

//* Run a method on each instance of the plugin.
type InstanceMethodMap = {
  handleUtils: () => void;
  handleAutoCountry: () => void;
  rejectAutoCountryPromise: (reason?: unknown) => void;
  rejectUtilsScriptPromise: (reason?: unknown) => void;
};

const forEachInstance = <K extends keyof InstanceMethodMap>(
  method: K,
  ...args: Parameters<InstanceMethodMap[K]>
): void => {
  Object.values(intlTelInput.instances).forEach((instance) => {
    const fn = (instance as unknown as InstanceMethodMap)[method];
    if (typeof fn === "function") {
      fn.apply(instance, args);
    }
  });
};

const intlTelInput: IntlTelInputInterface = Object.assign(
  (input: HTMLInputElement, options?: SomeOptions): Iti => {
    const iti = new Iti(input, options);
    intlTelInput.instances[iti.id] = iti;
    input.iti = iti;
    return iti;
  },
  {
    defaults,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: (): boolean => document.readyState === "complete",
    //* Get the country data object.
    getCountryData: (): Country[] => allCountries,
    //* A getter for the plugin instance.
    getInstance: (input: HTMLInputElement): Iti | null => {
      const id = input.dataset.intlTelInputId;
      return id ? intlTelInput.instances[id] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  },
);

export default intlTelInput;
