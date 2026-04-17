import type { Country, Iso2 } from "../data";
import type { AllOptions, SelectedCountryData } from "../types/public-api";
import { buildClassNames, createEl } from "../helpers/dom";
import {
  buildSearchIcon,
  buildClearIcon,
  buildCheckIcon,
  buildGlobeIcon,
} from "./icons";
import { CLASSES, ARIA, LAYOUT, KEYS, REGEX, TIMINGS } from "../constants";
import { findFirstCountryStartingWith, getMatchedCountries } from "./countrySearch";

export default class UI {
  // private
  readonly #options: AllOptions;
  readonly #id: number;
  readonly #isRTL: boolean;
  readonly #originalPaddingLeft: string = "";
  #countries!: Country[];
  #searchKeyupTimer: ReturnType<typeof setTimeout> | null = null;
  #inlineDropdownHeight?: number;
  #selectedDialCodeEl?: HTMLElement;
  #dropdownArrow?: HTMLElement;
  #dropdownContent?: HTMLElement;
  #searchIcon?: HTMLElement;
  #noResultsMessageEl?: HTMLElement;
  #searchResultsLiveRegion?: HTMLElement;
  #detachedDropdown?: HTMLElement;
  #selectedListItem: HTMLElement | null = null;
  #viewportHandler: (() => void) | null = null;
  #dropdownAbortController: AbortController | null = null;

  // public
  public telInput!: HTMLInputElement;
  public countryContainer?: HTMLElement;
  public selectedCountryEl?: HTMLElement;
  public selectedFlagEl?: HTMLElement;
  public searchInput?: HTMLInputElement;
  #searchClearButton?: HTMLButtonElement;
  public countryList?: HTMLElement;
  public hiddenInputPhone?: HTMLInputElement;
  public hiddenInputCountry?: HTMLInputElement;
  #highlightedListItem: HTMLElement | null = null;
  public readonly hadInitialPlaceholder: boolean;

  public constructor(input: HTMLInputElement, options: AllOptions, id: number) {
    input.dataset.intlTelInputId = id.toString();
    this.telInput = input;
    this.#options = options;
    this.#id = id;
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
    this.#isRTL = !!this.telInput.closest("[dir=rtl]");
    //* Store original styling before we override it.
    this.#originalPaddingLeft = this.telInput.style.paddingLeft;
  }

  // Validate that the provided element is an HTMLInputElement.
  public static validateInput(input: unknown): void {
    const tagName = (input as { tagName?: unknown } | null)?.tagName;
    const isInputEl =
      Boolean(input) &&
      typeof input === "object" &&
      tagName === "INPUT" &&
      typeof (input as { setAttribute?: unknown }).setAttribute === "function";

    if (!isInputEl) {
      const type = Object.prototype.toString.call(input);
      throw new TypeError(
        `The first argument must be an HTMLInputElement, not ${type}`,
      );
    }
  }

  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  public generateMarkup(countries: Country[]): void {
    this.#countries = countries;

    this.telInput.classList.add("iti__tel-input");
    //* Set useful defaults for phone number input attributes.
    if (!this.telInput.hasAttribute("type")) {
      this.telInput.setAttribute("type", "tel");
    }
    if (!this.telInput.hasAttribute("autocomplete")) {
      this.telInput.setAttribute("autocomplete", "tel");
    }
    if (!this.telInput.hasAttribute("inputmode")) {
      this.telInput.setAttribute("inputmode", "tel");
    }

    const wrapper = this.#createWrapperAndInsert();
    this.#maybeBuildCountryContainer(wrapper);
    wrapper.appendChild(this.telInput);

    this.#maybeUpdateInputPaddingAndReveal();
    this.#maybeBuildHiddenInputs(wrapper);
  }

  #createWrapperAndInsert(): HTMLElement {
    const { allowDropdown, showFlags, containerClass, useFullscreenPopup } =
      this.#options;

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
    if (this.#isRTL) {
      wrapper.setAttribute("dir", "ltr");
    }
    this.telInput.before(wrapper);
    return wrapper;
  }

  #maybeBuildCountryContainer(wrapper: HTMLElement): void {
    const { allowDropdown, separateDialCode, showFlags } = this.#options;

    //* If we don't need a countryContainer
    if (!allowDropdown && !showFlags && !separateDialCode) {
      return;
    }

    this.countryContainer = createEl(
      "div",
      // visibly hidden until we measure its width to set the input padding correctly
      { class: `iti__country-container ${CLASSES.V_HIDE}` },
      wrapper,
    );

    //* Selected country (displayed on left of input while allowDropdown is enabled, otherwise to right)
    //* https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only
    if (allowDropdown) {
      this.selectedCountryEl = createEl(
        "button",
        {
          type: "button",
          class: "iti__selected-country",
          [ARIA.EXPANDED]: "false",
          [ARIA.LABEL]: this.#options.i18n.noCountrySelected,
          [ARIA.HASPOPUP]: "dialog",
          [ARIA.CONTROLS]: `iti-${this.#id}__dropdown-content`,
        },
        this.countryContainer,
      );

      if (this.telInput.disabled) {
        this.selectedCountryEl!.setAttribute("disabled", "true");
      }
    } else {
      this.selectedCountryEl = createEl(
        "div",
        { class: "iti__selected-country" },
        this.countryContainer,
      );
    }

    // The element that gets a grey background on hover (if allowDropdown enabled)
    const selectedCountryPrimary = createEl(
      "div",
      { class: "iti__selected-country-primary" },
      this.selectedCountryEl,
    );

    //* This is where we will add the selected flag (or globe) class later
    this.selectedFlagEl = createEl(
      "div",
      { class: CLASSES.FLAG },
      selectedCountryPrimary,
    );

    if (allowDropdown) {
      this.#dropdownArrow = createEl(
        "div",
        { class: "iti__arrow", [ARIA.HIDDEN]: "true" },
        selectedCountryPrimary,
      );
    }

    if (separateDialCode) {
      this.#selectedDialCodeEl = createEl(
        "div",
        { class: "iti__selected-dial-code" },
        this.selectedCountryEl,
      );
    }

    if (allowDropdown) {
      this.#buildDropdownContent();
    }
  }

  public maybeEnsureDropdownWidthSet(): void {
    const { fixDropdownWidth, allowDropdown } = this.#options;

    // Note: fixDropdownWidth is always false if useFullscreenPopup is true
    // don't re-set it if it's already set
    if (!allowDropdown || !fixDropdownWidth || this.#dropdownContent!.style.width) {
      return;
    }

    const inputWidth = this.telInput.offsetWidth;
    // dont fix dropdown width if input width is zero (e.g. it's hidden during init)
    if (inputWidth > 0) {
      this.#dropdownContent!.style.width = `${inputWidth}px`;
    }
  }

  #buildDropdownContent(): void {
    const {
      fixDropdownWidth,
      useFullscreenPopup,
      countrySearch,
      i18n,
      dropdownContainer,
      containerClass,
    } = this.#options;

    const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
    this.#dropdownContent = createEl("div", {
      id: `iti-${this.#id}__dropdown-content`,
      class: `iti__dropdown-content ${CLASSES.HIDE} ${extraClasses}`,
      role: "dialog",
      [ARIA.MODAL]: "true",
    });
    if (this.#isRTL) {
      this.#dropdownContent.setAttribute("dir", "rtl");
    }

    if (countrySearch) {
      this.#buildSearchUI();
    }

    this.countryList = createEl(
      "ul",
      {
        class: "iti__country-list",
        id: `iti-${this.#id}__country-listbox`,
        role: "listbox",
        [ARIA.LABEL]: i18n.countryListAriaLabel,
      },
      this.#dropdownContent,
    );
    this.#appendListItems();

    if (countrySearch) {
      this.#updateSearchResultsA11yText();
    }

    if (!useFullscreenPopup) {
      // capture the dropdown height for later uses: (1) on dropdown open: decide whether to position it above or below the input, and (2) when countrySearch enabled, fix the dropdown height to prevent it jumping around when filtering the country list.
      this.#inlineDropdownHeight = this.#getHiddenInlineDropdownHeight();
      // fix the dropdown height when using countrySearch so when dropdown is positioned above input, and you type in the search input and the country list changes, the search input doesn't jump up/down. (NOTE: the country list just has a max-height as it may only be needed to show a few items e.g. from onlyCountries, or from filtering with a search query)
      if (countrySearch) {
        this.#dropdownContent.style.height = `${this.#inlineDropdownHeight}px`;
      }
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
      this.#detachedDropdown = createEl("div", { class: dropdownClasses });
      this.#detachedDropdown.appendChild(this.#dropdownContent);
    } else {
      this.countryContainer!.appendChild(this.#dropdownContent!);
    }
  }

  #buildSearchUI(): void {
    const { i18n, searchInputClass } = this.#options;

    // Wrapper so we can position the icons (search + clear)
    const searchWrapper = createEl(
      "div",
      { class: "iti__search-input-wrapper" },
      this.#dropdownContent!,
    );

    // Search (magnifying glass) icon SVG
    this.#searchIcon = createEl(
      "span",
      {
        class: "iti__search-icon",
        [ARIA.HIDDEN]: "true",
      },
      searchWrapper,
    );

    this.#searchIcon.innerHTML = buildSearchIcon();

    this.searchInput = createEl(
      "input",
      {
        id: `iti-${this.#id}__search-input`, // Chrome says inputs need either a name or an id
        type: "search",
        class: `iti__search-input ${searchInputClass}`,
        placeholder: i18n.searchPlaceholder,
        // role=combobox + aria-autocomplete=list + aria-activedescendant allows maintaining focus on the search input while allowing users to navigate search results with up/down keyboard keys
        role: "combobox",
        [ARIA.EXPANDED]: "true",
        [ARIA.LABEL]: i18n.searchPlaceholder,
        [ARIA.CONTROLS]: `iti-${this.#id}__country-listbox`,
        [ARIA.AUTOCOMPLETE]: "list",
        autocomplete: "off",
      },
      searchWrapper,
    ) as HTMLInputElement;

    this.#searchClearButton = createEl(
      "button",
      {
        type: "button",
        class: `iti__search-clear ${CLASSES.HIDE}`,
        [ARIA.LABEL]: i18n.clearSearchAriaLabel,
        tabindex: "-1",
      },
      searchWrapper,
    ) as HTMLButtonElement;

    // Mask creates a transparent cross 'cut' through the filled circle so underlying input bg shows.
    this.#searchClearButton.innerHTML = buildClearIcon(this.#id);

    this.#searchResultsLiveRegion = createEl(
      "span",
      { class: "iti__a11y-text" },
      this.#dropdownContent!,
    );

    // Visible no-results message (hidden by default)
    this.#noResultsMessageEl = createEl(
      "div",
      {
        class: `iti__no-results ${CLASSES.HIDE}`,
        [ARIA.HIDDEN]: "true", // all a11y messaging happens in this.#searchResultsLiveRegion
      },
      this.#dropdownContent!,
    );
    this.#noResultsMessageEl.textContent = i18n.searchEmptyState ?? null;
  }

  #maybeUpdateInputPaddingAndReveal(): void {
    if (!this.countryContainer) {
      return;
    }
    this.#updateInputPadding();
    this.countryContainer.classList.remove(CLASSES.V_HIDE);
  }

  #maybeBuildHiddenInputs(wrapper: HTMLElement): void {
    const { hiddenInput } = this.#options;
    if (!hiddenInput) {
      return;
    }

    const telInputName = this.telInput.getAttribute("name") || "";
    const names = hiddenInput(telInputName);

    if (names.phone) {
      const existingInput = this.telInput.form?.querySelector(
        `input[name="${names.phone}"]`,
      );
      if (existingInput) {
        this.hiddenInputPhone = existingInput as HTMLInputElement;
      } else {
        //* Create hidden input for the full international number.
        this.hiddenInputPhone = createEl("input", {
          type: "hidden",
          name: names.phone,
        }) as HTMLInputElement;
        wrapper.appendChild(this.hiddenInputPhone);
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

  //* For each country: add a country list item <li> to the countryList <ul> container.
  #appendListItems(): void {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.#countries.length; i++) {
      const c = this.#countries[i];
      // Compute classes (highlight first item when countrySearch disabled)
      const liClass = buildClassNames({
        [CLASSES.COUNTRY_ITEM]: true,
      });

      const listItem = createEl("li", {
        id: `iti-${this.#id}__item-${c.iso2}`,
        class: liClass,
        tabindex: "-1",
        role: "option",
        [ARIA.SELECTED]: "false",
      });
      listItem.dataset.dialCode = c.dialCode;
      listItem.dataset.countryCode = c.iso2;

      // Store this for later use e.g. country search filtering.
      c.listItemByInstanceId[this.#id] = listItem;

      // Build contents without innerHTML for safety and clarity
      if (this.#options.showFlags) {
        createEl("div", { class: `${CLASSES.FLAG} iti__${c.iso2}` }, listItem);
      }

      const nameEl = createEl("span", { class: "iti__country-name" }, listItem);
      nameEl.textContent = `${c.name} `;

      // the dial code span sits inside the name span, separated by a space, which works for both LTR and RTL languages
      // (visually it looks better separated by a standard space character, rather than a fixed margin distance, and is more flexible)
      const dialEl = createEl("span", { class: "iti__dial-code" }, nameEl);
      if (this.#isRTL) {
        dialEl.setAttribute("dir", "ltr");
      }
      dialEl.textContent = `(+${c.dialCode})`;

      frag.appendChild(listItem);
    }
    this.countryList!.appendChild(frag);
  }

  //* Update the input padding to make space for (1) the selected country/globe, (2) the arrow, and (3) the separate dial code, all of which are optional, hence handling this in the JS rather than CSS.
  #updateInputPadding(): void {
    if (this.selectedCountryEl) {
      // fallback widths differ for separateDialCode mode
      const fallbackWidth = this.#options.separateDialCode
        ? LAYOUT.SANE_SELECTED_WITH_DIAL_WIDTH
        : LAYOUT.SANE_SELECTED_NO_DIAL_WIDTH;
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth =
        this.selectedCountryEl.offsetWidth ||
        this.#getHiddenSelectedCountryWidth() ||
        fallbackWidth;
      const inputPadding =
        selectedCountryWidth + LAYOUT.INPUT_PADDING_EXTRA_LEFT;
      this.telInput.style.paddingLeft = `${inputPadding}px`;
    }
  }

  static #getBody(): HTMLElement {
    // Use window.top as a fix for same-origin iframes (that are hidden during init) where even appending it to document.body would still be hidden. window.top accesses the top-most document, which will not be hidden.
    let body;
    try {
      body = window.top!.document.body;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // fix for cross-origin iframes, where accessing window.top.document throws a security error
      body = document.body;
    }
    return body;
  }

  //* When input is in a hidden container during init, we cannot calculate the selected country width.
  //* Fix: clone the markup, make it invisible, add it to the end of the DOM, and then measure it's width.
  //* To get the right styling to apply, all we need is a shallow clone of the container,
  //* and then to inject a deep clone of the selectedCountryEl element.
  #getHiddenSelectedCountryWidth(): number {
    if (!this.telInput.parentNode) {
      return 0;
    }

    const body = UI.#getBody();
    const containerClone = this.telInput.parentNode!.cloneNode(
      false,
    ) as HTMLElement;
    containerClone.style.visibility = "hidden";
    body.appendChild(containerClone);

    const countryContainerClone =
      this.countryContainer!.cloneNode() as HTMLElement;
    containerClone.appendChild(countryContainerClone);

    const selectedCountryClone = this.selectedCountryEl!.cloneNode(
      true,
    ) as HTMLElement;
    countryContainerClone.appendChild(selectedCountryClone);

    const width = selectedCountryClone.offsetWidth;
    body.removeChild(containerClone);
    return width;
  }

  // Get the dropdown height (before it is added to the DOM)
  #getHiddenInlineDropdownHeight(): number {
    const body = UI.#getBody();
    // it's safe to remove the hide class as the dropdown has not yet been added to the DOM
    this.#dropdownContent!.classList.remove(CLASSES.HIDE);

    // it needs these classes on the container to get the correct height
    const tempContainer = createEl("div", {
      class: "iti iti--inline-dropdown",
    });
    tempContainer.appendChild(this.#dropdownContent!);

    tempContainer.style.visibility = "hidden";
    body.appendChild(tempContainer);
    const height = this.#dropdownContent!.offsetHeight;
    body.removeChild(tempContainer);
    tempContainer.style.visibility = "";

    this.#dropdownContent!.classList.add(CLASSES.HIDE);
    return height > 0 ? height : LAYOUT.SANE_DROPDOWN_HEIGHT;
  }

  //* Update search results text (for a11y).
  #updateSearchResultsA11yText(): void {
    const { i18n } = this.#options;
    const count = this.countryList!.childElementCount;
    this.#searchResultsLiveRegion!.textContent = i18n.searchSummaryAria!(count);
  }

  //* Country search: Filter the countries according to the search query.
  public filterCountriesByQuery(query: string): void {
    let matchedCountries: Country[];

    if (query === "") {
      // reset - back to all countries
      matchedCountries = this.#countries;
    } else {
      matchedCountries = getMatchedCountries(this.#countries, query);
    }
    this.#filterCountries(matchedCountries);
  }

  // Search input handlers
  #applySearchFilter(): void {
    const inputQuery = this.searchInput!.value.trim();
    this.filterCountriesByQuery(inputQuery);
    // show/hide clear button
    if (this.searchInput!.value) {
      this.#searchClearButton!.classList.remove(CLASSES.HIDE);
    } else {
      this.#searchClearButton!.classList.add(CLASSES.HIDE);
    }
  }

  #handleSearchChange(): void {
    // Filtering country nodes is expensive (lots of DOM manipulation), so rate limit it.
    if (this.#searchKeyupTimer) {
      clearTimeout(this.#searchKeyupTimer);
    }
    this.#searchKeyupTimer = setTimeout(() => {
      this.#applySearchFilter();
      this.#searchKeyupTimer = null;
    }, TIMINGS.SEARCH_DEBOUNCE_MS);
  }

  #handleSearchClear(): void {
    this.searchInput!.value = "";
    this.searchInput!.focus();
    this.#applySearchFilter();
  }

  //* Check if a country list item element is visible within it's container (the country list), else scroll until it is.
  public scrollCountryListToItem(element: HTMLElement): void {
    const container = this.countryList!;
    const containerRect = container!.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const offsetTop =
      elementRect.top - containerRect.top + container!.scrollTop;

    if (elementRect.top < containerRect.top) {
      //* Scroll up.
      container!.scrollTop = offsetTop;
    } else if (elementRect.bottom > containerRect.bottom) {
      //* Scroll down.
      container!.scrollTop =
        offsetTop - containerRect.height + elementRect.height;
    }
  }

  //* Remove highlighting from the previous list item and highlight the new one.
  public highlightListItem(
    listItem: HTMLElement | null,
    shouldFocus: boolean,
  ): void {
    const prevItem = this.#highlightedListItem;
    if (prevItem) {
      prevItem.classList.remove(CLASSES.HIGHLIGHT);
    }
    //* Set this, even if it's null, as it will clear the highlight.
    this.#highlightedListItem = listItem;
    if (this.#highlightedListItem) {
      this.#highlightedListItem.classList.add(CLASSES.HIGHLIGHT);
      if (this.#options.countrySearch) {
        const activeDescendant = this.#highlightedListItem.getAttribute("id") || "";
        this.searchInput!.setAttribute(
          ARIA.ACTIVE_DESCENDANT,
          activeDescendant,
        );
      }

      if (shouldFocus) {
        this.#highlightedListItem.focus();
      }
    }
  }

  //* Wire up triggers that open/close the dropdown: label click (focus input or swallow repeat click),
  //* selected-country click (open), and keydown on countryContainer (open on arrow/space/enter, close on tab).
  public bindInitialDropdownListeners(
    signal: AbortSignal,
    onOpen: () => void,
    onClose: () => void,
  ): void {
    //* Hack for input nested inside label (valid markup): clicking the selected country to open the
    //* dropdown would otherwise trigger a 2nd click on the input which would close it again.
    const label = this.telInput.closest("label");
    if (label) {
      label.addEventListener(
        "click",
        (e: Event): void => {
          //* If the dropdown is closed, focus the input; otherwise ignore the click.
          if (this.isDropdownClosed()) {
            this.telInput.focus();
          } else {
            e.preventDefault();
          }
        },
        { signal },
      );
    }

    //* Open dropdown on click (unless already open, or input is disabled/readonly).
    this.selectedCountryEl!.addEventListener(
      "click",
      (): void => {
        if (
          this.isDropdownClosed() &&
          !this.telInput.disabled &&
          !this.telInput.readOnly
        ) {
          onOpen();
        }
      },
      { signal },
    );

    //* Open dropdown if selected country is focused and they press up/down/space/enter; close on tab.
    this.countryContainer!.addEventListener(
      "keydown",
      (e: KeyboardEvent): void => {
        const openKeys = [
          KEYS.ARROW_UP,
          KEYS.ARROW_DOWN,
          KEYS.SPACE,
          KEYS.ENTER,
        ] as string[];

        if (this.isDropdownClosed() && openKeys.includes(e.key)) {
          //* Prevent form submit on ENTER, and prevent document from re-handling this event.
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }
        //* Allow tabbing out of the dropdown area.
        if (e.key === KEYS.TAB) {
          onClose();
        }
      },
      { signal },
    );
  }

  //* Open the dropdown: create a fresh AbortController, do the DOM work, and wire up all
  //* dropdown-open listeners (which invoke the caller's onSelect / onClose callbacks).
  public openDropdown(
    onSelect: (listItem: HTMLElement | null) => void,
    onClose: () => void,
  ): void {
    const { countrySearch, dropdownAlwaysOpen, dropdownContainer } =
      this.#options;

    this.#dropdownAbortController = new AbortController();

    // if fixDropdownWidth enabled, and the width was not set during init (e.g. because input was hidden), then set it now as the input must be visible now.
    this.maybeEnsureDropdownWidthSet();

    // dropdownContainer is used (1) to show the inline dropdown when dropdownContainer option is set, and (2) to show the fullscreen popup on mobile
    if (dropdownContainer) {
      this.#injectAndPositionDetachedDropdown();
    } else {
      // inline dropdown
      const positionBelow = this.#shouldPositionInlineDropdownBelowInput();
      const distance = this.telInput.offsetHeight + LAYOUT.DROPDOWN_MARGIN;
      if (positionBelow) {
        this.#dropdownContent!.style.top = `${distance}px`;
      } else {
        this.#dropdownContent!.style.bottom = `${distance}px`;
      }
    }

    this.#dropdownContent!.classList.remove(CLASSES.HIDE);
    this.selectedCountryEl!.setAttribute(ARIA.EXPANDED, "true");

    //* Highlight the selected country (or fall back to the first item) and scroll it into view.
    const itemToHighlight =
      this.#selectedListItem ??
      (this.countryList!.firstElementChild as HTMLElement);
    if (itemToHighlight) {
      this.highlightListItem(itemToHighlight, false);
      this.scrollCountryListToItem(itemToHighlight);
    }
    if (countrySearch && !dropdownAlwaysOpen) {
      this.searchInput!.focus();
    }

    // When using fullscreen popup, listen for virtual keyboard show/hide via visualViewport
    // so the popup resizes to stay above the keyboard.
    if (
      this.#options.useFullscreenPopup &&
      this.#detachedDropdown &&
      window.visualViewport
    ) {
      this.#viewportHandler = (): void => {
        this.#adjustFullscreenPopupToViewport();
        // Re-scroll to highlighted item after keyboard resize
        if (this.#highlightedListItem) {
          this.scrollCountryListToItem(this.#highlightedListItem);
        }
      };
      window.visualViewport.addEventListener("resize", this.#viewportHandler);
    }

    // Update the arrow.
    this.#dropdownArrow!.classList.add(CLASSES.ARROW_UP);

    this.#bindDropdownOpenListeners(onSelect, onClose);
  }

  //* Wire up all listeners needed while the dropdown is open: list-item hover (highlight),
  //* list-item click & enter key (select), click-off & escape (close), search input (filter),
  //* (when countrySearch disabled) typed-char hidden search, and (when dropdown is in an external
  //* container) close on window scroll.
  #bindDropdownOpenListeners(
    onSelect: (listItem: HTMLElement | null) => void,
    onClose: () => void,
  ): void {
    const signal = this.#dropdownAbortController!.signal;
    this.#bindListItemHover(signal);
    this.#bindListItemClick(signal, onSelect);
    if (!this.#options.dropdownAlwaysOpen) {
      this.#bindClickOffDropdownToClose(signal, onClose);
    }
    this.#bindDropdownKeydownListener(signal, onSelect, onClose);
    if (this.#options.countrySearch) {
      this.#bindSearchInputListeners(signal);
    }
    if (!this.#options.useFullscreenPopup && this.#options.dropdownContainer) {
      //* Close on window scroll when the dropdown is detached into an external container
      //* (it stays in its original page position while the page scrolls underneath).
      window.addEventListener("scroll", onClose, { signal });
    }
  }

  //* When mouse over a list item, just highlight that one (so if they hit "enter" we know which to select).
  #bindListItemHover(signal: AbortSignal): void {
    this.countryList!.addEventListener(
      "mouseover",
      (e: MouseEvent): void => {
        //* Handle event delegation, as we're listening on the countryList.
        const listItem = (e.target as HTMLElement)?.closest(
          `.${CLASSES.COUNTRY_ITEM}`,
        ) as HTMLElement | null;
        if (listItem) {
          this.highlightListItem(listItem, false);
        }
      },
      { signal },
    );
  }

  //* Delegate clicks on the country list to the caller's onSelect callback, passing the clicked list item.
  #bindListItemClick(
    signal: AbortSignal,
    onSelect: (listItem: HTMLElement) => void,
  ): void {
    this.countryList!.addEventListener(
      "click",
      (e: MouseEvent): void => {
        const listItem = (e.target as HTMLElement)?.closest(
          `.${CLASSES.COUNTRY_ITEM}`,
        ) as HTMLElement | null;
        if (listItem) {
          onSelect(listItem);
        }
      },
      { signal },
    );
  }

  //* Invoke onClickOff when the user clicks anywhere outside the dropdown.
  #bindClickOffDropdownToClose(signal: AbortSignal, onClickOff: () => void): void {
    //* Use setTimeout to bind this listener after the current thread of execution, which is where the opening click is happening (otherwise it would immediately trigger onClickOff so the dropdown would never open).
    setTimeout(() => {
      document.documentElement.addEventListener(
        "click",
        (e: MouseEvent): void => {
          if (!this.#dropdownContent!.contains(e.target as Node)) {
            onClickOff();
          }
        },
        { signal },
      );
    }, 0);
  }

  //* Keyboard navigation while the dropdown is open: arrow keys navigate, hidden-search keys filter,
  //* and enter/escape invoke the caller's callbacks (which handle country selection / dropdown close).
  //* Listens on document because key events go there when no input has focus.
  //* Uses keydown rather than keypress so non-char keys (arrow, esc) fire and so holding a key repeats.
  #bindDropdownKeydownListener(
    signal: AbortSignal,
    onEnter: (highlightedListItem: HTMLElement | null) => void,
    onEscape: () => void,
  ): void {
    let query = "";
    let queryTimer: ReturnType<typeof setTimeout> | null = null;
    const handleKeydown = (e: KeyboardEvent): void => {
      //* Prevent arrow-down from scrolling the whole page, enter from submitting a form, etc.
      const allowedKeys = [
        KEYS.ARROW_UP,
        KEYS.ARROW_DOWN,
        KEYS.ENTER,
        KEYS.ESC,
      ] as string[];
      if (allowedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        if (e.key === KEYS.ARROW_UP || e.key === KEYS.ARROW_DOWN) {
          this.handleUpDownKey(e.key);
        } else if (e.key === KEYS.ENTER && !e.isComposing) {
          //* Enter to select (but not when IME is composing e.g. Japanese input).
          onEnter(this.#highlightedListItem);
        } else if (e.key === KEYS.ESC) {
          onEscape();
          //* Accessibility: re-focus the select country button (this is how native <select> elements behave).
          this.selectedCountryEl!.focus();
        }
      }

      //* When countrySearch disabled: listen for alpha chars to perform hidden search.
      //* Regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866.
      if (
        !this.#options.countrySearch &&
        REGEX.HIDDEN_SEARCH_CHAR.test(e.key)
      ) {
        e.stopPropagation();
        if (queryTimer) {
          clearTimeout(queryTimer);
        }
        query += e.key.toLowerCase();
        this.#searchForCountry(query);
        //* Reset the query after a pause so consecutive keystrokes accumulate.
        queryTimer = setTimeout(() => {
          query = "";
        }, TIMINGS.HIDDEN_SEARCH_RESET_MS);
      }
    };
    document.addEventListener("keydown", handleKeydown, { signal });
  }

  //* Wire up search input listeners (countrySearch): typing filters the list, the clear button resets it.
  #bindSearchInputListeners(signal: AbortSignal): void {
    this.searchInput!.addEventListener(
      "input",
      () => this.#handleSearchChange(),
      { signal },
    );
    this.#searchClearButton!.addEventListener(
      "click",
      () => this.#handleSearchClear(),
      { signal },
    );
  }

  //* Hidden search (countrySearch disabled): jump to the first list item whose name starts with the query.
  #searchForCountry(query: string): void {
    const match = findFirstCountryStartingWith(this.#countries, query);
    if (match) {
      const listItem = match.listItemByInstanceId[this.#id];
      this.highlightListItem(listItem, false);
      this.scrollCountryListToItem(listItem);
    }
  }

  //* Highlight the next/prev item in the list (and ensure it is visible).
  public handleUpDownKey(key: string): void {
    let next =
      key === KEYS.ARROW_UP
        ? (this.#highlightedListItem?.previousElementSibling as HTMLElement)
        : (this.#highlightedListItem?.nextElementSibling as HTMLElement);
    if (!next && this.countryList!.childElementCount > 1) {
      //* Otherwise, we must be at the end, so loop round again.
      next =
        key === KEYS.ARROW_UP
          ? (this.countryList!.lastElementChild as HTMLElement)
          : (this.countryList!.firstElementChild as HTMLElement);
    }
    if (next) {
      //* Make sure the next item is visible
      //* (before calling focus(), which can cause the next item to scroll to the middle of the dropdown, which is jarring).
      this.scrollCountryListToItem(next);
      //* If country search enabled, don't lose focus from the search input on up/down
      this.highlightListItem(next, false);
    }
  }

  // Update the selected list item in the dropdown
  #updateSelectedListItem(iso2: Iso2 | ""): void {
    // if the existing selected item is different to the new country, set aria-selected to false
    if (this.#selectedListItem && this.#selectedListItem.dataset.countryCode !== iso2) {
      this.#selectedListItem.setAttribute(ARIA.SELECTED, "false");
      this.#selectedListItem.querySelector(".iti__country-check")?.remove();
      this.#selectedListItem = null;
    }

    // if setting to a new country (rather than null/globe icon, or the existing selected item), find the new list item and set aria-selected to true
    if (iso2 && !this.#selectedListItem) {
      const newListItem = this.countryList!.querySelector(
        `[data-country-code="${iso2}"]`,
      ) as HTMLElement;
      if (newListItem) {
        newListItem.setAttribute(ARIA.SELECTED, "true");
        const checkIcon = createEl(
          "span",
          { class: "iti__country-check", [ARIA.HIDDEN]: "true" },
          newListItem,
        );
        checkIcon.innerHTML = buildCheckIcon();
        this.#selectedListItem = newListItem;
      }
    }
  }

  //* Country search: Filter the country list to the given array of countries.
  #filterCountries(matchedCountries: Country[]): void {
    // remove all items from the list
    this.countryList!.replaceChildren();

    let noCountriesAddedYet = true;
    for (const c of matchedCountries) {
      const listItem = c.listItemByInstanceId[this.#id];
      if (listItem) {
        this.countryList!.appendChild(listItem);

        //* Highlight the first item
        if (noCountriesAddedYet) {
          this.highlightListItem(listItem, false);
          noCountriesAddedYet = false;
        }
      }
    }
    if (noCountriesAddedYet) {
      //* If no countries are shown, unhighlight the previously highlighted item.
      this.highlightListItem(null, false);
      if (this.#noResultsMessageEl) {
        this.#noResultsMessageEl.classList.remove(CLASSES.HIDE);
      }
    } else if (this.#noResultsMessageEl) {
      this.#noResultsMessageEl.classList.add(CLASSES.HIDE);
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList!.scrollTop = 0;
    this.#updateSearchResultsA11yText();
  }

  // UI: Close the dropdown (DOM + abort dropdown-scoped listeners).
  public closeDropdown(): void {
    const { countrySearch, dropdownContainer } = this.#options;

    //* Unbind all dropdown-scoped listeners in one go.
    this.#dropdownAbortController!.abort();
    this.#dropdownAbortController = null;

    this.#dropdownContent!.classList.add(CLASSES.HIDE);
    this.selectedCountryEl!.setAttribute(ARIA.EXPANDED, "false");

    if (countrySearch) {
      this.searchInput!.removeAttribute(ARIA.ACTIVE_DESCENDANT);
      // Clear the search query so it starts fresh next time.
      this.searchInput!.value = "";
      this.#applySearchFilter();
      // only clear the highlighted item if countrySearch is enabled as this gets reset each time the dropdown is opened
      if (this.#highlightedListItem) {
        this.#highlightedListItem.classList.remove(CLASSES.HIGHLIGHT);
        this.#highlightedListItem = null;
      }
    }

    // Update the arrow.
    this.#dropdownArrow!.classList.remove(CLASSES.ARROW_UP);

    // Clean up visualViewport listeners
    if (this.#viewportHandler && window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.#viewportHandler,
      );
      this.#viewportHandler = null;
    }

    // Remove dropdown from container if using external container
    if (dropdownContainer) {
      this.#detachedDropdown!.remove();
      this.#detachedDropdown!.style.top = "";
      this.#detachedDropdown!.style.bottom = "";
      this.#detachedDropdown!.style.paddingLeft = "";
      this.#detachedDropdown!.style.paddingRight = "";
    } else {
      this.#dropdownContent!.style.top = "";
      this.#dropdownContent!.style.bottom = "";
    }
  }

  #shouldPositionInlineDropdownBelowInput(): boolean {
    // for testing, it's helpful for it to always be shown below.
    if (this.#options.dropdownAlwaysOpen) {
      return true;
    }
    const inputPos = this.telInput.getBoundingClientRect();
    const spaceAbove = inputPos.top;
    const spaceBelow = window.innerHeight - inputPos.bottom;
    return (
      spaceBelow >= this.#inlineDropdownHeight! || spaceBelow >= spaceAbove
    );
  }

  // inject dropdown into container and apply positioning styles
  #injectAndPositionDetachedDropdown(): void {
    const { dropdownContainer, useFullscreenPopup } = this.#options;

    if (useFullscreenPopup) {
      // on wider screens, constrain the popup to the input width instead of full width
      if (window.innerWidth >= LAYOUT.NARROW_VIEWPORT_WIDTH) {
        const inputPos = this.telInput.getBoundingClientRect();
        this.#detachedDropdown!.style.paddingLeft = `${inputPos.left}px`;
        this.#detachedDropdown!.style.paddingRight = `${window.innerWidth - inputPos.right}px`;
      }
    } else {
      // inline dropdown
      // remember this inputPos is relative to the viewport, not the page
      const inputPos = this.telInput.getBoundingClientRect();
      this.#detachedDropdown!.style.left = `${inputPos.left}px`;
      const positionBelow = this.#shouldPositionInlineDropdownBelowInput();
      if (positionBelow) {
        this.#detachedDropdown!.style.top = `${inputPos.bottom + LAYOUT.DROPDOWN_MARGIN}px`;
      } else {
        // unset the default top:-1000px in the CSS
        this.#detachedDropdown!.style.top = "unset";
        this.#detachedDropdown!.style.bottom = `${window.innerHeight - inputPos.top + LAYOUT.DROPDOWN_MARGIN}px`;
      }
    }

    dropdownContainer!.appendChild(this.#detachedDropdown!);
  }

  // Adjust the fullscreen popup dimensions to match the visual viewport,
  // so it stays above the virtual keyboard on mobile devices.
  #adjustFullscreenPopupToViewport(): void {
    const vv = window.visualViewport;
    if (!vv || !this.#detachedDropdown) {
      return;
    }
    const virtualKeyboardHeight = window.innerHeight - vv.height;
    this.#detachedDropdown.style.bottom = `${virtualKeyboardHeight}px`;
  }

  // UI: Whether the dropdown is currently closed (hidden).
  public isDropdownClosed(): boolean {
    return this.#dropdownContent!.classList.contains(CLASSES.HIDE);
  }

  // Toggle the loading spinner on the selected flag (used during auto-country geoIP lookup).
  public setLoading(isLoading: boolean): void {
    this.selectedFlagEl!.classList.toggle(CLASSES.LOADING, isLoading);
  }

  // Whether the selected flag is currently showing the globe icon (no country selected).
  public isShowingGlobe(): boolean {
    return this.selectedFlagEl!.classList.contains(CLASSES.GLOBE);
  }

  public setCountry(selectedCountryData: SelectedCountryData): void {
    const { allowDropdown, showFlags, separateDialCode, i18n } = this.#options;
    const name = selectedCountryData?.name;
    const dialCode = selectedCountryData?.dialCode;
    const iso2 = selectedCountryData?.iso2 ?? "";

    if (allowDropdown) {
      // Update the selected list item in the dropdown
      this.#updateSelectedListItem(iso2);
    }

    //* Update the selected flag class and the a11y text.
    if (this.selectedCountryEl) {
      const flagClass =
        iso2 && showFlags
          ? `${CLASSES.FLAG} iti__${iso2}`
          : `${CLASSES.FLAG} ${CLASSES.GLOBE}`;
      let ariaLabel, title, flagInnerHtml;
      if (iso2) {
        title = name;
        ariaLabel = i18n
          .selectedCountryAriaLabel!.replace("${countryName}", name!)
          .replace("${dialCode}", `+${dialCode}`);
        flagInnerHtml = showFlags ? "" : buildGlobeIcon();
      } else {
        title = i18n.noCountrySelected;
        ariaLabel = i18n.noCountrySelected;
        flagInnerHtml = buildGlobeIcon();
      }
      this.selectedFlagEl!.className = flagClass;
      this.selectedCountryEl!.setAttribute("title", title!);
      this.selectedCountryEl!.setAttribute(ARIA.LABEL, ariaLabel!);
      this.selectedFlagEl!.innerHTML = flagInnerHtml;
    }

    //* Update the selected dial code.
    if (separateDialCode) {
      const fullDialCode = dialCode ? `+${dialCode}` : "";
      this.#selectedDialCodeEl!.textContent = fullDialCode;
      this.#updateInputPadding();
    }
  }

  public destroy(): void {
    //* Break cross-references from long-lived objects back to this instance.
    this.telInput.iti = undefined;
    delete this.telInput.dataset.intlTelInputId;

    //* Restore original styling
    this.telInput.style.paddingLeft = this.#originalPaddingLeft;

    //* Remove markup (but leave the original input). parentNode may be null if the host framework (e.g. Svelte) detached the input before destroy() ran; the orphaned wrapper has no parent and will be GC'd once references are released.
    const wrapper = this.telInput.parentNode as HTMLElement | null;
    if (wrapper) {
      wrapper.before(this.telInput);
      wrapper.remove();
    }

    //* Clear references from shared country data to this instance's list items.
    for (const c of this.#countries) {
      delete c.listItemByInstanceId[this.#id];
    }
  }
}
