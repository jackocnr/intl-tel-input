import type { Country, Iso2 } from "../data";
import type { AllOptions, SelectedCountryData } from "../types/public-api";
import { buildClassNames, createEl } from "../helpers/dom";
import {
  buildSearchIcon,
  buildClearIcon,
  buildCheckIcon,
  buildGlobeIcon,
} from "./icons";
import { CLASSES, ARIA, LAYOUT, KEYS, TIMINGS } from "../constants";
import { getMatchedCountries } from "./countrySearch";

export default class UI {
  // private
  readonly #options: AllOptions;
  readonly #id: number;
  readonly #isRTL: boolean;
  readonly #originalPaddingLeft: string = "";
  #countries!: Country[];
  #searchKeyupTimer: ReturnType<typeof setTimeout> | null = null;
  #inlineDropdownHeight?: number;
  #selectedDialCode?: HTMLElement;
  #dropdownArrow?: HTMLElement;
  #dropdownContent?: HTMLElement;
  #searchIcon?: HTMLElement;
  #searchNoResults?: HTMLElement;
  #searchResultsA11yText?: HTMLElement;
  #dropdownForContainer?: HTMLElement;
  #selectedItem: HTMLElement | null = null;
  #viewportHandler: (() => void) | null = null;

  // public
  public telInput!: HTMLInputElement;
  public countryContainer?: HTMLElement;
  public selectedCountry?: HTMLElement;
  public selectedCountryInner?: HTMLElement;
  public searchInput?: HTMLInputElement;
  public searchClearButton?: HTMLButtonElement;
  public countryList?: HTMLElement;
  public hiddenInputPhone?: HTMLInputElement;
  public hiddenInputCountry?: HTMLInputElement;
  public highlightedItem: HTMLElement | null = null;
  public readonly hadInitialPlaceholder: boolean;

  public constructor(input: HTMLInputElement, options: AllOptions, id: number) {
    input.dataset.intlTelInputId = id.toString();
    this.telInput = input;
    this.#options = options;
    this.#id = id;
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
    this.#isRTL = !!this.telInput.closest("[dir=rtl]");
    //* Store original styling before we override it.
    if (this.#options.separateDialCode) {
      this.#originalPaddingLeft = this.telInput.style.paddingLeft;
    }
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
    const {
      allowDropdown,
      showFlags,
      containerClass,
      useFullscreenPopup,
    } = this.#options;

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

    //* If we need a countryContainer
    if (allowDropdown || showFlags || separateDialCode) {
      this.countryContainer = createEl(
        "div",
        // visibly hidden until we measure it's width to set the input padding correctly
        { class: `iti__country-container ${CLASSES.V_HIDE}` },
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
            [ARIA.EXPANDED]: "false",
            [ARIA.LABEL]: this.#options.i18n.noCountrySelected,
            [ARIA.HASPOPUP]: "dialog",
            [ARIA.CONTROLS]: `iti-${this.#id}__dropdown-content`,
          },
          this.countryContainer,
        );

        if (this.telInput.disabled) {
          this.selectedCountry!.setAttribute("disabled", "true");
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
        this.#selectedDialCode = createEl(
          "div",
          { class: "iti__selected-dial-code" },
          this.selectedCountry,
        );
      }

      if (allowDropdown) {
        this.#buildDropdownContent();
      }
    }
  }

  #maybeEnsureDropdownWidthSet(): void {
    const { fixDropdownWidth } = this.#options;

    // Note: fixDropdownWidth is always false if useFullscreenPopup is true
    // don't re-set it if it's already set
    if (fixDropdownWidth && !this.#dropdownContent!.style.width) {
      const inputWidth = this.telInput.offsetWidth;
      // dont fix dropdown width if input width is zero (e.g. it's hidden during init)
      if (inputWidth > 0) {
        this.#dropdownContent!.style.width = `${inputWidth}px`;
      }
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
      // inline dropdown
      this.#maybeEnsureDropdownWidthSet();
      // capture the dropdownHeight before injecting it into the DOM, using a clever invisible technique. This is used later to decide whether to show dropdown above/below input.
      this.#inlineDropdownHeight = this.#getHiddenInlineDropdownHeight();
      // fix the dropdown height when using countrySearch so when dropdown is positioned above input, and you type in the search input and the country list changes, the search input doesn't jump up/down.
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
      this.#dropdownForContainer = createEl("div", { class: dropdownClasses });
      this.#dropdownForContainer.appendChild(this.#dropdownContent);
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

    this.searchClearButton = createEl(
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
    this.searchClearButton.innerHTML = buildClearIcon(this.#id);

    this.#searchResultsA11yText = createEl(
      "span",
      { class: "iti__a11y-text" },
      this.#dropdownContent!,
    );

    // Visible no-results message (hidden by default)
    this.#searchNoResults = createEl(
      "div",
      {
        class: `iti__no-results ${CLASSES.HIDE}`,
        [ARIA.HIDDEN]: "true", // all a11y messaging happens in this.#searchResultsA11yText
      },
      this.#dropdownContent!,
    );
    this.#searchNoResults.textContent = i18n.searchEmptyState ?? null;
  }

  #maybeUpdateInputPaddingAndReveal(): void {
    if (this.countryContainer) {
      this.#updateInputPadding();
      this.countryContainer.classList.remove(CLASSES.V_HIDE);
    }
  }

  #maybeBuildHiddenInputs(wrapper: HTMLElement): void {
    const { hiddenInput } = this.#options;
    if (hiddenInput) {
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
      c.nodeById[this.#id] = listItem;

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

  //* Update the input padding to make space for the selected country/dial code.
  #updateInputPadding(): void {
    if (this.selectedCountry) {
      // fallback widths differ for separateDialCode mode
      const fallbackWidth = this.#options.separateDialCode
        ? LAYOUT.SANE_SELECTED_WITH_DIAL_WIDTH
        : LAYOUT.SANE_SELECTED_NO_DIAL_WIDTH;
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth =
        this.selectedCountry.offsetWidth ||
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
  //* and then to inject a deep clone of the selectedCountry element.
  #getHiddenSelectedCountryWidth(): number {
    if (this.telInput.parentNode) {
      const body = UI.#getBody();
      const containerClone = this.telInput.parentNode!.cloneNode(
        false,
      ) as HTMLElement;
      containerClone.style.visibility = "hidden";
      body.appendChild(containerClone);

      const countryContainerClone =
        this.countryContainer!.cloneNode() as HTMLElement;
      containerClone.appendChild(countryContainerClone);

      const selectedCountryClone = this.selectedCountry!.cloneNode(
        true,
      ) as HTMLElement;
      countryContainerClone.appendChild(selectedCountryClone);

      const width = selectedCountryClone.offsetWidth;
      body.removeChild(containerClone);
      return width;
    }
    return 0;
  }

  // this is run before we add the dropdown to the DOM
  #getHiddenInlineDropdownHeight(): number {
    const body = UI.#getBody();
    this.#dropdownContent!.classList.remove(CLASSES.HIDE);

    // it needs these classes on the container to get the correct height
    const tempContainer = createEl("div", { class: "iti iti--inline-dropdown" });
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
    this.#searchResultsA11yText!.textContent = i18n.searchSummaryAria!(count);
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
  #doFilter(): void {
    const inputQuery = this.searchInput!.value.trim();
    this.filterCountriesByQuery(inputQuery);
    // show/hide clear button
    if (this.searchInput!.value) {
      this.searchClearButton!.classList.remove(CLASSES.HIDE);
    } else {
      this.searchClearButton!.classList.add(CLASSES.HIDE);
    }
  }

  public handleSearchChange(): void {
    // Filtering country nodes is expensive (lots of DOM manipulation), so rate limit it.
    if (this.#searchKeyupTimer) {
      clearTimeout(this.#searchKeyupTimer);
    }
    this.#searchKeyupTimer = setTimeout(() => {
      this.#doFilter();
      this.#searchKeyupTimer = null;
    }, TIMINGS.SEARCH_DEBOUNCE_MS);
  }

  public handleSearchClear(): void {
    this.searchInput!.value = "";
    this.searchInput!.focus();
    this.#doFilter();
  }

  //* Check if a country list item element is visible within it's container (the country list), else scroll until it is.
  public scrollCountryListToItem(element: HTMLElement): void {
    const container = this.countryList!;
    const containerRect = container!.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const offsetTop = elementRect.top - containerRect.top + container!.scrollTop;

    if (elementRect.top < containerRect.top) {
      //* Scroll up.
      container!.scrollTop = offsetTop;
    } else if (elementRect.bottom > containerRect.bottom) {
      //* Scroll down.
      container!.scrollTop = offsetTop - containerRect.height + elementRect.height;
    }
  }

  //* Remove highlighting from the previous list item and highlight the new one.
  public highlightListItem(
    listItem: HTMLElement | null,
    shouldFocus: boolean,
  ): void {
    const prevItem = this.highlightedItem;
    if (prevItem) {
      prevItem.classList.remove(CLASSES.HIGHLIGHT);
    }
    //* Set this, even if it's null, as it will clear the highlight.
    this.highlightedItem = listItem;
    if (this.highlightedItem) {
      this.highlightedItem.classList.add(CLASSES.HIGHLIGHT);
      if (this.#options.countrySearch) {
        const activeDescendant = this.highlightedItem.getAttribute("id") || "";
        this.searchInput!.setAttribute(ARIA.ACTIVE_DESCENDANT, activeDescendant);
      }

      if (shouldFocus) {
        this.highlightedItem.focus();
      }
    }
  }

  //* Highlight the next/prev item in the list (and ensure it is visible).
  public handleUpDownKey(key: string): void {
    let next =
      key === KEYS.ARROW_UP
        ? (this.highlightedItem?.previousElementSibling as HTMLElement)
        : (this.highlightedItem?.nextElementSibling as HTMLElement);
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
  #updateSelectedItem(iso2: Iso2 | ""): void {
    // if the existing selected item is different to the new country, set aria-selected to false
    if (this.#selectedItem && this.#selectedItem.dataset.countryCode !== iso2) {
      this.#selectedItem.setAttribute(ARIA.SELECTED, "false");
      this.#selectedItem.querySelector(".iti__country-check")?.remove();
      this.#selectedItem = null;
    }

    // if setting to a new country (rather than null/globe icon, or the existing selected item), find the new list item and set aria-selected to true
    if (iso2 && !this.#selectedItem) {
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
        this.#selectedItem = newListItem;
      }
    }
  }

  //* Country search: Filter the country list to the given array of countries.
  #filterCountries(matchedCountries: Country[]): void {
    // remove all items from the list
    this.countryList!.replaceChildren();

    let noCountriesAddedYet = true;
    for (const c of matchedCountries) {
      const listItem = c.nodeById[this.#id];
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
      if (this.#searchNoResults) {
        this.#searchNoResults.classList.remove(CLASSES.HIDE);
      }
    } else if (this.#searchNoResults) {
      this.#searchNoResults.classList.add(CLASSES.HIDE);
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList!.scrollTop = 0;
    this.#updateSearchResultsA11yText();
  }

  public destroy(): void {
    //* Break cross-references from long-lived objects back to this instance.
    this.telInput.iti = undefined;
    delete this.telInput.dataset.intlTelInputId;

    //* Restore original styling
    if (this.#options.separateDialCode) {
      this.telInput.style.paddingLeft = this.#originalPaddingLeft;
    }

    //* Remove markup (but leave the original input).
    const wrapper = this.telInput.parentNode as HTMLElement;
    wrapper.before(this.telInput);
    wrapper.remove();

    //* Clear references from shared country data to this instance's list items.
    for (const c of this.#countries) {
      delete c.nodeById[this.#id];
    }
  }

  // UI: Open the dropdown (DOM only).
  public openDropdown(): void {
    const {
      countrySearch,
      dropdownAlwaysOpen,
      dropdownContainer,
    } = this.#options;

    // if fixDropdownWidth enabled, and the width was not set during init (e.g. because input was hidden), then set it now as the input must be visible now.
    this.#maybeEnsureDropdownWidthSet();

    // dropdownContainer is used (1) to show the inline dropdown when dropdownContainer option is set, and (2) to show the fullscreen popup on mobile
    if (dropdownContainer) {
      this.#handleDropdownContainer();
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
    this.selectedCountry!.setAttribute(ARIA.EXPANDED, "true");

    //* Highlight the selected country (or fall back to the first item) and scroll it into view.
    const itemToHighlight = this.#selectedItem ?? this.countryList!.firstElementChild as HTMLElement;
    if (itemToHighlight) {
      this.highlightListItem(itemToHighlight, false);
      this.scrollCountryListToItem(itemToHighlight);
    }
    if (countrySearch && !dropdownAlwaysOpen) {
      this.searchInput!.focus();
    }

    // When using fullscreen popup, listen for virtual keyboard show/hide via visualViewport
    // so the popup resizes to stay above the keyboard.
    if (this.#options.useFullscreenPopup && this.#dropdownForContainer && window.visualViewport) {
      this.#viewportHandler = (): void => {
        this.#adjustFullscreenPopupToViewport();
        // Re-scroll to highlighted item after keyboard resize
        if (this.highlightedItem) {
          this.scrollCountryListToItem(this.highlightedItem);
        }
      };
      window.visualViewport.addEventListener("resize", this.#viewportHandler);
    }

    // Update the arrow.
    this.#dropdownArrow!.classList.add(CLASSES.ARROW_UP);
  }

  // UI: Close the dropdown (DOM only).
  public closeDropdown(): void {
    const { countrySearch, dropdownContainer } = this.#options;

    this.#dropdownContent!.classList.add(CLASSES.HIDE);
    this.selectedCountry!.setAttribute(ARIA.EXPANDED, "false");

    if (countrySearch) {
      this.searchInput!.removeAttribute(ARIA.ACTIVE_DESCENDANT);
      // Clear the search query so it starts fresh next time.
      this.searchInput!.value = "";
      this.#doFilter();
      // only clear the highlighted item if countrySearch is enabled as this gets reset each time the dropdown is opened
      if (this.highlightedItem) {
        this.highlightedItem.classList.remove(CLASSES.HIGHLIGHT);
        this.highlightedItem = null;
      }
    }

    // Update the arrow.
    this.#dropdownArrow!.classList.remove(CLASSES.ARROW_UP);

    // Clean up visualViewport listeners
    if (this.#viewportHandler && window.visualViewport) {
      window.visualViewport.removeEventListener("resize", this.#viewportHandler);
      this.#viewportHandler = null;
    }

    // Remove dropdown from container if using external container
    if (dropdownContainer) {
      this.#dropdownForContainer!.remove();
      this.#dropdownForContainer!.style.top = "";
      this.#dropdownForContainer!.style.bottom = "";
      this.#dropdownForContainer!.style.paddingLeft = "";
      this.#dropdownForContainer!.style.paddingRight = "";
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
    return spaceBelow >= this.#inlineDropdownHeight! || spaceBelow >= spaceAbove;
  }

  // inject dropdown into container and apply positioning styles
  #handleDropdownContainer(): void {
    const { dropdownContainer, useFullscreenPopup } = this.#options;

    if (useFullscreenPopup) {
      // on wider screens, constrain the popup to the input width instead of full width
      if (window.innerWidth >= LAYOUT.NARROW_VIEWPORT_WIDTH) {
        const inputPos = this.telInput.getBoundingClientRect();
        this.#dropdownForContainer!.style.paddingLeft = `${inputPos.left}px`;
        this.#dropdownForContainer!.style.paddingRight = `${window.innerWidth - inputPos.right}px`;
      }
    } else {
      // inline dropdown
      // remember this inputPos is relative to the viewport, not the page
      const inputPos = this.telInput.getBoundingClientRect();
      this.#dropdownForContainer!.style.left = `${inputPos.left}px`;
      const positionBelow = this.#shouldPositionInlineDropdownBelowInput();
      if (positionBelow) {
        this.#dropdownForContainer!.style.top = `${inputPos.bottom + LAYOUT.DROPDOWN_MARGIN}px`;
      } else {
        // unset the default top:-1000px in the CSS
        this.#dropdownForContainer!.style.top = "unset";
        this.#dropdownForContainer!.style.bottom = `${window.innerHeight - inputPos.top + LAYOUT.DROPDOWN_MARGIN}px`;
      }
    }

    dropdownContainer!.appendChild(this.#dropdownForContainer!);
  }

  // Adjust the fullscreen popup dimensions to match the visual viewport,
  // so it stays above the virtual keyboard on mobile devices.
  #adjustFullscreenPopupToViewport(): void {
    const vv = window.visualViewport;
    if (!vv || !this.#dropdownForContainer) {
      return;
    }
    const virtualKeyboardHeight = window.innerHeight - vv.height;
    this.#dropdownForContainer.style.bottom = `${virtualKeyboardHeight}px`;
  }

  // UI: Whether the dropdown is currently closed (hidden).
  public isDropdownClosed(): boolean {
    return this.#dropdownContent!.classList.contains(CLASSES.HIDE);
  }

  public setCountry(selectedCountryData: SelectedCountryData): void {
    const { allowDropdown, showFlags, separateDialCode, i18n } = this.#options;
    const name = selectedCountryData?.name;
    const dialCode = selectedCountryData?.dialCode;
    const iso2 = selectedCountryData?.iso2 ?? "";

    if (allowDropdown) {
      // Update the selected list item in the dropdown
      this.#updateSelectedItem(iso2);
    }

    //* Update the selected flag class and the a11y text.
    if (this.selectedCountry) {
      const flagClass =
        iso2 && showFlags
          ? `${CLASSES.FLAG} iti__${iso2}`
          : `${CLASSES.FLAG} ${CLASSES.GLOBE}`;
      let ariaLabel, title, selectedCountryInner;
      if (iso2) {
        title = name;
        ariaLabel = i18n.selectedCountryAriaLabel!
          .replace("${countryName}", name!)
          .replace("${dialCode}", `+${dialCode}`);
        selectedCountryInner = showFlags ? "" : buildGlobeIcon();
      } else {
        title = i18n.noCountrySelected;
        ariaLabel = i18n.noCountrySelected;
        selectedCountryInner = buildGlobeIcon();
      }
      this.selectedCountryInner!.className = flagClass;
      this.selectedCountry!.setAttribute("title", title!);
      this.selectedCountry!.setAttribute(ARIA.LABEL, ariaLabel!);
      this.selectedCountryInner!.innerHTML = selectedCountryInner;
    }

    //* Update the selected dial code.
    if (separateDialCode) {
      const fullDialCode = dialCode ? `+${dialCode}` : "";
      this.#selectedDialCode!.textContent = fullDialCode;
      this.#updateInputPadding();
    }
  }
}
