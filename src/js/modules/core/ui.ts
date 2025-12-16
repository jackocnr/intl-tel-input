import { Country, Iso2 } from "../../intl-tel-input/data";
import { AllOptions } from "../types/public-api";
import { buildClassNames, createEl } from "../utils/dom";
import { buildSearchIcon, buildClearIcon } from "./icons";
import { CLASSES, ARIA, LAYOUT } from "../constants";

export default class UI {
  // private
  private readonly options: AllOptions;
  private readonly id: number;
  private readonly isRTL: boolean;
  private readonly originalPaddingLeft: string;
  private countries: Country[];

  // public
  telInput: HTMLInputElement;
  countryContainer: HTMLElement;
  selectedCountry: HTMLElement;
  selectedCountryInner: HTMLElement;
  selectedDialCode: HTMLElement;
  dropdownArrow: HTMLElement;
  dropdownContent: HTMLElement;
  searchInput: HTMLInputElement;
  searchIcon: HTMLElement;
  searchClearButton: HTMLButtonElement;
  searchNoResults: HTMLElement;
  searchResultsA11yText: HTMLElement;
  countryList: HTMLElement;
  dropdown: HTMLElement;
  hiddenInput: HTMLInputElement;
  hiddenInputCountry: HTMLInputElement;
  highlightedItem: HTMLElement | null = null;
  selectedItem: HTMLElement | null = null;
  readonly hadInitialPlaceholder: boolean;

  constructor(input: HTMLInputElement, options: AllOptions, id: number) {
    input.dataset.intlTelInputId = id.toString();
    this.telInput = input;
    this.options = options;
    this.id = id;
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
    this.isRTL = !!this.telInput.closest("[dir=rtl]");
    //* Store original styling before we override it.
    if (this.options.separateDialCode) {
      this.originalPaddingLeft = this.telInput.style.paddingLeft;
    }
  }

  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  generateMarkup(countries: Country[]): void {
    this.countries = countries;
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
            [ARIA.LABEL]: this.options.i18n.noCountrySelected,
            [ARIA.HASPOPUP]: "dialog",
            [ARIA.CONTROLS]: `iti-${this.id}__dropdown-content`,
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
        { class: CLASSES.FLAG },
        selectedCountryPrimary,
      );

      if (allowDropdown) {
        this.dropdownArrow = createEl(
          "div",
          { class: "iti__arrow", [ARIA.HIDDEN]: "true" },
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
      class: `iti__dropdown-content ${CLASSES.HIDE} ${extraClasses}`,
      role: "dialog",
      [ARIA.MODAL]: "true",
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
        [ARIA.LABEL]: i18n.countryListAriaLabel,
      },
      this.dropdownContent,
    );
    this._appendListItems();

    if (countrySearch) {
      this.updateSearchResultsA11yText();
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
        [ARIA.HIDDEN]: "true",
      },
      searchWrapper,
    );

    this.searchIcon.innerHTML = buildSearchIcon();

    this.searchInput = createEl(
      "input",
      {
        id: `iti-${this.id}__search-input`, // Chrome says inputs need either a name or an id
        type: "search",
        class: "iti__search-input",
        placeholder: i18n.searchPlaceholder,
        // role=combobox + aria-autocomplete=list + aria-activedescendant allows maintaining focus on the search input while allowing users to navigate search results with up/down keyboard keys
        role: "combobox",
        [ARIA.EXPANDED]: "true",
        [ARIA.LABEL]: i18n.searchPlaceholder,
        [ARIA.CONTROLS]: `iti-${this.id}__country-listbox`,
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
    this.searchClearButton.innerHTML = buildClearIcon(this.id);

    this.searchResultsA11yText = createEl(
      "span",
      { class: "iti__a11y-text" },
      this.dropdownContent,
    );

    // Visible no-results message (hidden by default)
    this.searchNoResults = createEl(
      "div",
      {
        class: `iti__no-results ${CLASSES.HIDE}`,
        [ARIA.HIDDEN]: "true", // all a11y messaging happens in this.searchResultsA11yText
      },
      this.dropdownContent,
    );
    this.searchNoResults.textContent = i18n.zeroSearchResults;
  }

  private _maybeUpdateInputPaddingAndReveal(): void {
    if (this.countryContainer) {
      this.updateInputPadding();
      this.countryContainer.classList.remove(CLASSES.V_HIDE);
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
        [CLASSES.COUNTRY_ITEM]: true,
      });

      const listItem = createEl("li", {
        id: `iti-${this.id}__item-${c.iso2}`,
        class: liClass,
        tabindex: "-1",
        role: "option",
        [ARIA.SELECTED]: "false",
      });
      listItem.dataset.dialCode = c.dialCode;
      listItem.dataset.countryCode = c.iso2;

      // Store this for later use e.g. country search filtering.
      c.nodeById[this.id] = listItem;

      // Build contents without innerHTML for safety and clarity
      if (this.options.showFlags) {
        createEl("div", { class: `${CLASSES.FLAG} iti__${c.iso2}` }, listItem);
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

  //* Update the input padding to make space for the selected country/dial code.
  updateInputPadding(): void {
    if (this.selectedCountry) {
      // fallback widths differ for separateDialCode mode
      const fallbackWidth = this.options.separateDialCode
        ? LAYOUT.SANE_SELECTED_WITH_DIAL_WIDTH
        : LAYOUT.SANE_SELECTED_NO_DIAL_WIDTH;
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth =
        this.selectedCountry.offsetWidth ||
        this._getHiddenSelectedCountryWidth() ||
        fallbackWidth;
      const inputPadding =
        selectedCountryWidth + LAYOUT.INPUT_PADDING_EXTRA_LEFT;
      this.telInput.style.paddingLeft = `${inputPadding}px`;
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

  //* Update search results text (for a11y).
  updateSearchResultsA11yText(): void {
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

  //* Check if an element is visible within it's container, else scroll until it is.
  scrollTo(element: HTMLElement): void {
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

  //* Remove highlighting from the previous list item and highlight the new one.
  highlightListItem(listItem: HTMLElement | null, shouldFocus: boolean): void {
    const prevItem = this.highlightedItem;
    if (prevItem) {
      prevItem.classList.remove(CLASSES.HIGHLIGHT);
    }
    //* Set this, even if it's null, as it will clear the highlight.
    this.highlightedItem = listItem;
    if (this.highlightedItem) {
      this.highlightedItem.classList.add(CLASSES.HIGHLIGHT);
      if (this.options.countrySearch) {
        const activeDescendant = this.highlightedItem.getAttribute("id") || "";
        this.searchInput.setAttribute(ARIA.ACTIVE_DESCENDANT, activeDescendant);
      }
    }

    if (shouldFocus) {
      this.highlightedItem.focus();
    }
  }

  updateSelectedItem(iso2: Iso2 | ""): void {
    // if the existing selected item is different to the new country, set aria-selected to false
    if (this.selectedItem && this.selectedItem.dataset.countryCode !== iso2) {
      this.selectedItem.setAttribute(ARIA.SELECTED, "false");
      this.selectedItem = null;
    }
    // if setting to a new country (rather than null/globe icon, or the existing selected item), find the new list item and set aria-selected to true
    if (iso2 && !this.selectedItem) {
      const newListItem = this.countryList.querySelector(
        `[data-country-code="${iso2}"]`,
      ) as HTMLElement;
      if (newListItem) {
        newListItem.setAttribute(ARIA.SELECTED, "true");
        this.selectedItem = newListItem;
      }
    }
  }

  //* Country search: Filter the country list to the given array of countries.
  filterCountries(matchedCountries: Country[]): void {
    this.countryList.innerHTML = "";

    let noCountriesAddedYet = true;
    for (const c of matchedCountries) {
      const listItem = c.nodeById[this.id];
      if (listItem) {
        this.countryList.appendChild(listItem);

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
      if (this.searchNoResults) {
        this.searchNoResults.classList.remove(CLASSES.HIDE);
      }
    } else if (this.searchNoResults) {
      this.searchNoResults.classList.add(CLASSES.HIDE);
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList.scrollTop = 0;
    this.updateSearchResultsA11yText();
  }

  destroy(): void {
    this.telInput.iti = undefined;
    //* Remove attribute of id instance: data-intl-tel-input-id.
    delete this.telInput.dataset.intlTelInputId;

    //* Restore original styling
    if (this.options.separateDialCode) {
      this.telInput.style.paddingLeft = this.originalPaddingLeft;
    }

    //* Remove markup (but leave the original input).
    const wrapper = this.telInput.parentNode as HTMLElement;
    wrapper.before(this.telInput);
    wrapper.remove();

    this.telInput = null;
    this.countryContainer = null;
    this.selectedCountry = null;
    this.selectedCountryInner = null;
    this.selectedDialCode = null;
    this.dropdownArrow = null;
    this.dropdownContent = null;
    this.searchInput = null;
    this.searchIcon = null;
    this.searchClearButton = null;
    this.searchNoResults = null;
    this.searchResultsA11yText = null;
    this.countryList = null;
    this.dropdown = null;
    this.hiddenInput = null;
    this.hiddenInputCountry = null;
    this.highlightedItem = null;
    this.selectedItem = null;

    // also clear all references to the list items in the countries data
    for (const c of this.countries) {
      delete c.nodeById[this.id];
    }
    this.countries = null;
  }
}
