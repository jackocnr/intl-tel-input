window.intlTelInputGlobals = {
  getInstance: (input) => {
    const id = input.getAttribute('data-intl-tel-input-id');
    return window.intlTelInputGlobals.instances[id];
  },
  instances: {},
};

// these vars persist through all instances of the plugin
let id = 0;
const defaults = {
  // whether or not to allow the dropdown
  allowDropdown: true,
  // if there is just a dial code in the input: remove it on blur
  autoHideDialCode: true,
  // add a placeholder in the input with an example number for the selected country
  autoPlaceholder: 'polite',
  // modify the parentClass
  customContainer: '',
  // modify the auto placeholder
  customPlaceholder: null,
  // append menu to specified element
  dropdownContainer: null,
  // don't display these countries
  excludeCountries: [],
  // format the input value during initialisation and on setNumber
  formatOnDisplay: true,
  // geoIp lookup function
  geoIpLookup: null,
  // inject a hidden input with this name, and on submit, populate it with the result of getNumber
  hiddenInput: '',
  // initial country
  initialCountry: '',
  // localized country names e.g. { 'de': 'Deutschland' }
  localizedCountries: null,
  // don't insert international dial codes
  nationalMode: true,
  // display only these countries
  onlyCountries: [],
  // number type to use for placeholders
  placeholderNumberType: 'MOBILE',
  // the countries at the top of the list. defaults to united states and united kingdom
  preferredCountries: ['us', 'gb'],
  // display the country dial code next to the selected flag so it's not part of the typed number
  separateDialCode: false,
  // specify the path to the libphonenumber script to enable validation/formatting
  utilsScript: '',
};
// https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
const regionlessNanpNumbers = ['800', '822', '833', '844', '855', '866', '877', '880', '881', '882', '883', '884', '885', '886', '887', '888', '889'];


// keep track of if the window.load event has fired as impossible to check after the fact
window.addEventListener('load', () => {
  // UPDATE: use a public static field so we can fudge it in the tests
  window.intlTelInputGlobals.windowLoaded = true;
});


// utility function to iterate over an object. can't use Object.entries or native forEach because
// of IE11
const forEachProp = (obj, callback) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    callback(keys[i], obj[keys[i]]);
  }
};


// run a method on each instance of the plugin
const forEachInstance = (method) => {
  forEachProp(window.intlTelInputGlobals.instances, (key) => {
    window.intlTelInputGlobals.instances[key][method]();
  });
};


// this is our plugin class that we will create an instance of
// eslint-disable-next-line no-unused-vars
class Iti {
  constructor(input, options) {
    this.id = id++;
    this.telInput = input;

    this.activeItem = null;
    this.highlightedItem = null;

    // process specified options / defaults
    // alternative to Object.assign, which isn't supported by IE11
    const customOptions = options || {};
    this.options = {};
    forEachProp(defaults, (key, value) => {
      this.options[key] = (customOptions.hasOwnProperty(key)) ? customOptions[key] : value;
    });

    this.hadInitialPlaceholder = Boolean(input.getAttribute('placeholder'));
  }

  _init() {
    // if in nationalMode, disable options relating to dial codes
    if (this.options.nationalMode) this.options.autoHideDialCode = false;

    // if separateDialCode then doesn't make sense to A) insert dial code into input
    // (autoHideDialCode), and B) display national numbers (because we're displaying the country
    // dial code next to them)
    if (this.options.separateDialCode) {
      this.options.autoHideDialCode = this.options.nationalMode = false;
    }

    // we cannot just test screen size as some smartphones/website meta tags will report desktop
    // resolutions
    // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
    // rest of these declarations
    // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
    this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (this.isMobile) {
      // trigger the mobile dropdown css
      document.body.classList.add('iti-mobile');

      // on mobile, we want a full screen dropdown, so we must append it to the body
      if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
    }

    // these promises get resolved when their individual requests complete
    // this way the dev can do something like iti.promise.then(...) to know when all requests are
    // complete
    if (typeof Promise !== 'undefined') {
      const autoCountryPromise = new Promise((resolve, reject) => {
        this.resolveAutoCountryPromise = resolve;
        this.rejectAutoCountryPromise = reject;
      });
      const utilsScriptPromise = new Promise((resolve, reject) => {
        this.resolveUtilsScriptPromise = resolve;
        this.rejectUtilsScriptPromise = reject;
      });
      this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
    } else {
      // prevent errors when Promise doesn't exist
      this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = () => {};
      this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = () => {};
    }

    // in various situations there could be no country selected initially, but we need to be able
    // to assume this variable exists
    this.selectedCountryData = {};

    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
    this._processCountryData();

    // generate the markup
    this._generateMarkup();

    // set the initial state of the input value and the selected flag
    this._setInitialState();

    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
    this._initListeners();

    // utils script, and auto country
    this._initRequests();
  }


  /********************
   *  PRIVATE METHODS
   ********************/


  // prepare all of the country data, including onlyCountries, excludeCountries and
  // preferredCountries options
  _processCountryData() {
    // process onlyCountries or excludeCountries array if present
    this._processAllCountries();

    // process the countryCodes map
    this._processCountryCodes();

    // process the preferredCountries
    this._processPreferredCountries();

    // translate countries according to localizedCountries option
    if (this.options.localizedCountries) this._translateCountriesByLocale();

    // sort countries by name
    if (this.options.onlyCountries.length || this.options.localizedCountries) {
      this.countries.sort(this._countryNameSort);
    }
  }


  // add a country code to this.countryCodes
  _addCountryCode(iso2, dialCode, priority) {
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    if (!this.countryCodes.hasOwnProperty(dialCode)) {
      this.countryCodes[dialCode] = [];
    }
    // bail if we already have this country for this dialCode
    for (let i = 0; i < this.countryCodes[dialCode].length; i++) {
      if (this.countryCodes[dialCode][i] === iso2) return;
    }
    // check for undefined as 0 is falsy
    const index = (priority !== undefined) ? priority : this.countryCodes[dialCode].length;
    this.countryCodes[dialCode][index] = iso2;
  }


  // process onlyCountries or excludeCountries array if present
  _processAllCountries() {
    if (this.options.onlyCountries.length) {
      const lowerCaseOnlyCountries = this.options.onlyCountries.map(
        country => country.toLowerCase()
      );
      this.countries = allCountries.filter(
        country => lowerCaseOnlyCountries.indexOf(country.iso2) > -1
      );
    } else if (this.options.excludeCountries.length) {
      const lowerCaseExcludeCountries = this.options.excludeCountries.map(
        country => country.toLowerCase()
      );
      this.countries = allCountries.filter(
        country => lowerCaseExcludeCountries.indexOf(country.iso2) === -1
      );
    } else {
      this.countries = allCountries;
    }
  }

  // Translate Countries by object literal provided on config
  _translateCountriesByLocale() {
    for (let i = 0; i < this.countries.length; i++) {
      const iso = this.countries[i].iso2.toLowerCase();
      if (this.options.localizedCountries.hasOwnProperty(iso)) {
        this.countries[i].name = this.options.localizedCountries[iso];
      }
    }
  }

  // sort by country name
  _countryNameSort(a, b) {
    return a.name.localeCompare(b.name);
  }


  // process the countryCodes map
  _processCountryCodes() {
    this.dialCodeMaxLen = 0;
    this.countryCodes = {};

    // first: add dial codes
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      this._addCountryCode(c.iso2, c.dialCode, c.priority);
    }

    // next: add area codes
    // this is a second loop over countries, to make sure we have all of the "root" countries
    // already in the map, so that we can access them, as each time we add an area code substring
    // to the map, we also need to include the "root" country's code, as that also matches
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      // area codes
      if (c.areaCodes) {
        const rootCountryCode = this.countryCodes[c.dialCode][0];
        // for each area code
        for (let j = 0; j < c.areaCodes.length; j++) {
          const areaCode = c.areaCodes[j];
          // for each digit in the area code to add all partial matches as well
          for (let k = 1; k < areaCode.length; k++) {
            const partialDialCode = c.dialCode + areaCode.substr(0, k);
            // start with the root country, as that also matches this dial code
            this._addCountryCode(rootCountryCode, partialDialCode);
            this._addCountryCode(c.iso2, partialDialCode);
          }
          // add the full area code
          this._addCountryCode(c.iso2, c.dialCode + areaCode);
        }
      }
    }
  }


  // process preferred countries - iterate through the preferences, fetching the country data for
  // each one
  _processPreferredCountries() {
    this.preferredCountries = [];
    for (let i = 0; i < this.options.preferredCountries.length; i++) {
      const countryCode = this.options.preferredCountries[i].toLowerCase();
      const countryData = this._getCountryData(countryCode, false, true);
      if (countryData) this.preferredCountries.push(countryData);
    }
  }


  // create a DOM element
  _createEl(name, attrs, container) {
    const el = document.createElement(name);
    if (attrs) forEachProp(attrs, (key, value) => el.setAttribute(key, value));
    if (container) container.appendChild(el);
    return el;
  }


  // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
  _generateMarkup() {
    // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
    // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
    // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
    this.telInput.setAttribute('autocomplete', 'off');

    // containers (mostly for positioning)
    let parentClass = 'iti';
    if (this.options.allowDropdown) parentClass += ' iti--allow-dropdown';
    if (this.options.separateDialCode) parentClass += ' iti--separate-dial-code';
    if (this.options.customContainer) {
      parentClass += ' ';
      parentClass += this.options.customContainer;
    }

    const wrapper = this._createEl('div', { class: parentClass });
    this.telInput.parentNode.insertBefore(wrapper, this.telInput);
    this.flagsContainer = this._createEl('div', { class: 'iti__flag-container' }, wrapper);
    wrapper.appendChild(this.telInput);

    // selected flag (displayed to left of input)
    this.selectedFlag = this._createEl('div', {
      class: 'iti__selected-flag',
      role: 'combobox',
      'aria-owns': 'country-listbox',
    }, this.flagsContainer);
    this.selectedFlagInner = this._createEl('div', { class: 'iti__flag' }, this.selectedFlag);

    if (this.options.separateDialCode) {
      this.selectedDialCode = this._createEl('div', { class: 'iti__selected-dial-code' }, this.selectedFlag);
    }

    if (this.options.allowDropdown) {
      // make element focusable and tab navigable
      this.selectedFlag.setAttribute('tabindex', '0');
      this.dropdownArrow = this._createEl('div', { class: 'iti__arrow' }, this.selectedFlag);

      // country dropdown: preferred countries, then divider, then all countries
      this.countryList = this._createEl('ul', {
        class: 'iti__country-list iti__hide',
        id: 'country-listbox',
        'aria-expanded': 'false',
        role: 'listbox',
      });
      if (this.preferredCountries.length) {
        this._appendListItems(this.preferredCountries, 'iti__preferred');
        this._createEl('li', {
          class: 'iti__divider',
          role: 'separator',
          'aria-disabled': 'true',
        }, this.countryList);
      }
      this._appendListItems(this.countries, 'iti__standard');

      // create dropdownContainer markup
      if (this.options.dropdownContainer) {
        this.dropdown = this._createEl('div', { class: 'iti iti--container' });
        this.dropdown.appendChild(this.countryList);
      } else {
        this.flagsContainer.appendChild(this.countryList);
      }
    }

    if (this.options.hiddenInput) {
      let hiddenInputName = this.options.hiddenInput;
      const name = this.telInput.getAttribute('name');
      if (name) {
        const i = name.lastIndexOf('[');
        // if input name contains square brackets, then give the hidden input the same name,
        // replacing the contents of the last set of brackets with the given hiddenInput name
        if (i !== -1) hiddenInputName = `${name.substr(0, i)}[${hiddenInputName}]`;
      }
      this.hiddenInput = this._createEl('input', {
        type: 'hidden',
        name: hiddenInputName,
      });
      wrapper.appendChild(this.hiddenInput);
    }
  }


  // add a country <li> to the countryList <ul> container
  _appendListItems(countries, className) {
    // we create so many DOM elements, it is faster to build a temp string
    // and then add everything to the DOM in one go at the end
    let tmp = '';
    // for each country
    for (let i = 0; i < countries.length; i++) {
      const c = countries[i];
      // open the list item
      tmp += `<li class='iti__country ${className}' tabIndex='-1' id='iti-item-${c.iso2}' role='option' data-dial-code='${c.dialCode}' data-country-code='${c.iso2}'>`;
      // add the flag
      tmp += `<div class='iti__flag-box'><div class='iti__flag iti__${c.iso2}'></div></div>`;
      // and the country name and dial code
      tmp += `<span class='iti__country-name'>${c.name}</span>`;
      tmp += `<span class='iti__dial-code'>+${c.dialCode}</span>`;
      // close the list item
      tmp += '</li>';
    }
    this.countryList.insertAdjacentHTML('beforeend', tmp);
  }


  // set the initial state of the input value and the selected flag by:
  // 1. extracting a dial code from the given number
  // 2. using explicit initialCountry
  // 3. picking the first preferred country
  // 4. picking the first country
  _setInitialState() {
    const val = this.telInput.value;
    const dialCode = this._getDialCode(val);
    const isRegionlessNanp = this._isRegionlessNanp(val);
    const {
      initialCountry,
      nationalMode,
      autoHideDialCode,
      separateDialCode,
    } = this.options;

    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
    // flag, else fall back to the default country
    if (dialCode && !isRegionlessNanp) {
      this._updateFlagFromNumber(val);
    } else if (initialCountry !== 'auto') {
      // see if we should select a flag
      if (initialCountry) {
        this._setFlag(initialCountry.toLowerCase());
      } else {
        if (dialCode && isRegionlessNanp) {
          // has intl dial code, is regionless nanp, and no initialCountry, so default to US
          this._setFlag('us');
        } else {
          // no dial code and no initialCountry, so default to first in list
          this.defaultCountry = (this.preferredCountries.length) ? this.preferredCountries[0].iso2
            : this.countries[0].iso2;
          if (!val) {
            this._setFlag(this.defaultCountry);
          }
        }
      }

      // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
      if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
        this.telInput.value = `+${this.selectedCountryData.dialCode}`;
      }
    }
    // NOTE: if initialCountry is set to auto, that will be handled separately

    // format - note this wont be run after _updateDialCode as that's only called if no val
    if (val) this._updateValFromNumber(val);
  }


  // initialise the main event listeners: input keyup, and click selected flag
  _initListeners() {
    this._initKeyListeners();
    if (this.options.autoHideDialCode) this._initBlurListeners();
    if (this.options.allowDropdown) this._initDropdownListeners();
    if (this.hiddenInput) this._initHiddenInputListener();
  }


  // update hidden input on form submit
  _initHiddenInputListener() {
    this._handleHiddenInputSubmit = () => {
      this.hiddenInput.value = this.getNumber();
    };
    if (this.telInput.form) this.telInput.form.addEventListener('submit', this._handleHiddenInputSubmit);
  }


  // iterate through parent nodes to find the closest label ancestor, if it exists
  _getClosestLabel() {
    let el = this.telInput;
    while (el && el.tagName !== 'LABEL') el = el.parentNode;
    return el;
  }


  // initialise the dropdown listeners
  _initDropdownListeners() {
    // hack for input nested inside label (which is valid markup): clicking the selected-flag to
    // open the dropdown would then automatically trigger a 2nd click on the input which would
    // close it again
    this._handleLabelClick = (e) => {
      // if the dropdown is closed, then focus the input, else ignore the click
      if (this.countryList.classList.contains('iti__hide')) this.telInput.focus();
      else e.preventDefault();
    };
    const label = this._getClosestLabel();
    if (label) label.addEventListener('click', this._handleLabelClick);

    // toggle country dropdown on click
    this._handleClickSelectedFlag = () => {
      // only intercept this event if we're opening the dropdown
      // else let it bubble up to the top ("click-off-to-close" listener)
      // we cannot just stopPropagation as it may be needed to close another instance
      if (this.countryList.classList.contains('iti__hide') && !this.telInput.disabled && !this.telInput.readOnly) {
        this._showDropdown();
      }
    };
    this.selectedFlag.addEventListener('click', this._handleClickSelectedFlag);

    // open dropdown list if currently focused
    this._handleFlagsContainerKeydown = (e) => {
      const isDropdownHidden = this.countryList.classList.contains('iti__hide');

      if (isDropdownHidden && ['ArrowUp', 'ArrowDown', ' ', 'Enter'].indexOf(e.key) !== -1) {
        // prevent form from being submitted if "ENTER" was pressed
        e.preventDefault();
        // prevent event from being handled again by document
        e.stopPropagation();
        this._showDropdown();
      }

      // allow navigation from dropdown to input on TAB
      if (e.key === 'Tab') this._closeDropdown();
    };
    this.flagsContainer.addEventListener('keydown', this._handleFlagsContainerKeydown);
  }


  // init many requests: utils script / geo ip lookup
  _initRequests() {
    // if the user has specified the path to the utils script, fetch it on window.load, else resolve
    if (this.options.utilsScript && !window.intlTelInputUtils) {
      // if the plugin is being initialised after the window.load event has already been fired
      if (window.intlTelInputGlobals.windowLoaded) {
        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
      } else {
        // wait until the load event so we don't block any other requests e.g. the flags image
        window.addEventListener('load', () => {
          window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
        });
      }
    } else this.resolveUtilsScriptPromise();

    if (this.options.initialCountry === 'auto') this._loadAutoCountry();
    else this.resolveAutoCountryPromise();
  }


  // perform the geo ip lookup
  _loadAutoCountry() {
    // 3 options:
    // 1) already loaded (we're done)
    // 2) not already started loading (start)
    // 3) already started loading (do nothing - just wait for loading callback to fire)
    if (window.intlTelInputGlobals.autoCountry) {
      this.handleAutoCountry();
    } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
      // don't do this twice!
      window.intlTelInputGlobals.startedLoadingAutoCountry = true;

      if (typeof this.options.geoIpLookup === 'function') {
        this.options.geoIpLookup((countryCode) => {
          window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
          // tell all instances the auto country is ready
          // TODO: this should just be the current instances
          // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
          // away (e.g. if they have already done the geo ip lookup somewhere else). Using
          // setTimeout means that the current thread of execution will finish before executing
          // this, which allows the plugin to finish initialising.
          setTimeout(() => forEachInstance('handleAutoCountry'));
        }, () => forEachInstance('rejectAutoCountryPromise'));
      }
    }
  }


  // initialize any key listeners
  _initKeyListeners() {
    // update flag on keyup
    this._handleKeyupEvent = () => {
      if (this._updateFlagFromNumber(this.telInput.value)) {
        this._triggerCountryChange();
      }
    };
    this.telInput.addEventListener('keyup', this._handleKeyupEvent);

    // update flag on cut/paste events (now supported in all major browsers)
    this._handleClipboardEvent = () => {
      // hack because "paste" event is fired before input is updated
      setTimeout(this._handleKeyupEvent);
    };
    this.telInput.addEventListener('cut', this._handleClipboardEvent);
    this.telInput.addEventListener('paste', this._handleClipboardEvent);
  }


  // adhere to the input's maxlength attr
  _cap(number) {
    const max = this.telInput.getAttribute('maxlength');
    return (max && number.length > max) ? number.substr(0, max) : number;
  }


  // listen for blur/submit (for autoHideDialCode feature)
  _initBlurListeners() {
    // on blur or form submit: if just a dial code then remove it
    this._handleSubmitOrBlurEvent = () => {
      this._removeEmptyDialCode();
    };
    if (this.telInput.form) this.telInput.form.addEventListener('submit', this._handleSubmitOrBlurEvent);
    this.telInput.addEventListener('blur', this._handleSubmitOrBlurEvent);

    // made the decision not to trigger blur() now, because would only do anything in the case
    // where they manually set the initial value to just a dial code, in which case they probably
    // want it to be displayed.
  }


  // clear the input if it just contains a dial code
  _removeEmptyDialCode() {
    if (this.telInput.value.charAt(0) === '+') {
      const numeric = this._getNumeric(this.telInput.value);
      // if just a plus, or if just a dial code
      if (!numeric || this.selectedCountryData.dialCode === numeric) {
        this.telInput.value = '';
      }
    }
  }


  // extract the numeric digits from the given string
  _getNumeric(s) {
    return s.replace(/\D/g, '');
  }


  // trigger a custom event on the input
  _trigger(name) {
    // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
    const e = document.createEvent('Event');
    e.initEvent(name, true, true); // can bubble, and is cancellable
    this.telInput.dispatchEvent(e);
  }


  // show the dropdown
  _showDropdown() {
    this.countryList.classList.remove('iti__hide');
    this.countryList.setAttribute('aria-expanded', 'true');

    this._setDropdownPosition();

    // update highlighting and scroll to active list item
    if (this.activeItem) {
      this._highlightListItem(this.activeItem, false);
      this._scrollTo(this.activeItem, true);
    }

    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
    this._bindDropdownListeners();

    // update the arrow
    this.dropdownArrow.classList.add('iti__arrow--up');

    this._trigger('open:countrydropdown');
  }


  // make sure the el has the className or not, depending on the value of shouldHaveClass
  _toggleClass(el, className, shouldHaveClass) {
    if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className);
    else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
  }


  // decide where to position dropdown (depends on position within viewport, and scroll)
  _setDropdownPosition() {
    if (this.options.dropdownContainer) {
      this.options.dropdownContainer.appendChild(this.dropdown);
    }

    if (!this.isMobile) {
      const pos = this.telInput.getBoundingClientRect();
      // windowTop from https://stackoverflow.com/a/14384091/217866
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      const inputTop = pos.top + windowTop;
      const dropdownHeight = this.countryList.offsetHeight;
      // dropdownFitsBelow = (dropdownBottom < windowBottom)
      const dropdownFitsBelow = (inputTop + this.telInput.offsetHeight + dropdownHeight
        < (windowTop + window.innerHeight));
      const dropdownFitsAbove = (inputTop - dropdownHeight > windowTop);

      // by default, the dropdown will be below the input. If we want to position it above the
      // input, we add the dropup class.
      this._toggleClass(this.countryList, 'iti__country-list--dropup', (!dropdownFitsBelow && dropdownFitsAbove));

      // if dropdownContainer is enabled, calculate postion
      if (this.options.dropdownContainer) {
        // by default the dropdown will be directly over the input because it's not in the flow.
        // If we want to position it below, we need to add some extra top value.
        const extraTop = (!dropdownFitsBelow && dropdownFitsAbove) ? 0 : this.telInput.offsetHeight;

        // calculate placement
        this.dropdown.style.top = `${inputTop + extraTop}px`;
        this.dropdown.style.left = `${pos.left + document.body.scrollLeft}px`;

        // close menu on window scroll
        this._handleWindowScroll = () => this._closeDropdown();
        window.addEventListener('scroll', this._handleWindowScroll);
      }
    }
  }


  // iterate through parent nodes to find the closest list item
  _getClosestListItem(target) {
    let el = target;
    while (el && el !== this.countryList && !el.classList.contains('iti__country')) el = el.parentNode;
    // if we reached the countryList element, then return null
    return (el === this.countryList) ? null : el;
  }


  // we only bind dropdown listeners when the dropdown is open
  _bindDropdownListeners() {
    // when mouse over a list item, just highlight that one
    // we add the class "highlight", so if they hit "enter" we know which one to select
    this._handleMouseoverCountryList = (e) => {
      // handle event delegation, as we're listening for this event on the countryList
      const listItem = this._getClosestListItem(e.target);
      if (listItem) this._highlightListItem(listItem, false);
    };
    this.countryList.addEventListener('mouseover', this._handleMouseoverCountryList);

    // listen for country selection
    this._handleClickCountryList = (e) => {
      const listItem = this._getClosestListItem(e.target);
      if (listItem) this._selectListItem(listItem);
    };
    this.countryList.addEventListener('click', this._handleClickCountryList);

    // click off to close
    // (except when this initial opening click is bubbling up)
    // we cannot just stopPropagation as it may be needed to close another instance
    let isOpening = true;
    this._handleClickOffToClose = () => {
      if (!isOpening) this._closeDropdown();
      isOpening = false;
    };
    document.documentElement.addEventListener('click', this._handleClickOffToClose);

    // listen for up/down scrolling, enter to select, or letters to jump to country name.
    // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
    // just hit down and hold it to scroll down (no keyup event).
    // listen on the document because that's where key events are triggered if no input has focus
    let query = '';
    let queryTimer = null;
    this._handleKeydownOnDropdown = (e) => {
      // prevent down key from scrolling the whole page,
      // and enter key from submitting a form etc
      e.preventDefault();

      // up and down to navigate
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') this._handleUpDownKey(e.key);
      // enter to select
      else if (e.key === 'Enter') this._handleEnterKey();
      // esc to close
      else if (e.key === 'Escape') this._closeDropdown();
      // alpha chars to perform search
      // regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866)
      else if (/^[a-zA-ZÀ-ÿ ]$/.test(e.key)) {
        // jump to countries that start with the query string
        if (queryTimer) clearTimeout(queryTimer);
        query += e.key.toLowerCase();
        this._searchForCountry(query);
        // if the timer hits 1 second, reset the query
        queryTimer = setTimeout(() => {
          query = '';
        }, 1000);
      }
    };
    document.addEventListener('keydown', this._handleKeydownOnDropdown);
  }


  // highlight the next/prev item in the list (and ensure it is visible)
  _handleUpDownKey(key) {
    let next = (key === 'ArrowUp') ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
    if (next) {
      // skip the divider
      if (next.classList.contains('iti__divider')) {
        next = (key === 'ArrowUp') ? next.previousElementSibling : next.nextElementSibling;
      }
      this._highlightListItem(next, true);
    }
  }


  // select the currently highlighted item
  _handleEnterKey() {
    if (this.highlightedItem) this._selectListItem(this.highlightedItem);
  }


  // find the first list item whose name starts with the query string
  _searchForCountry(query) {
    for (let i = 0; i < this.countries.length; i++) {
      if (this._startsWith(this.countries[i].name, query)) {
        const listItem = this.countryList.querySelector(`#iti-item-${this.countries[i].iso2}`);
        // update highlighting and scroll
        this._highlightListItem(listItem, false);
        this._scrollTo(listItem, true);
        break;
      }
    }
  }


  // check if string a starts with string b
  _startsWith(a, b) {
    return (a.substr(0, b.length).toLowerCase() === b);
  }


  // update the input's value to the given val (format first if possible)
  // NOTE: this is called from _setInitialState, handleUtils and setNumber
  _updateValFromNumber(originalNumber) {
    let number = originalNumber;
    if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
      const useNational = (!this.options.separateDialCode
        && (this.options.nationalMode || number.charAt(0) !== '+'));
      const { NATIONAL, INTERNATIONAL } = intlTelInputUtils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
    }

    number = this._beforeSetNumber(number);
    this.telInput.value = number;
  }


  // check if need to select a new flag based on the given number
  // Note: called from _setInitialState, keyup handler, setNumber
  _updateFlagFromNumber(originalNumber) {
    // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
    // with a +1 so _getDialCode will be able to extract the area code
    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
    // from the number), that means we're initialising the plugin with a number that already has a
    // dial code, so fine to ignore this bit
    let number = originalNumber;
    const selectedDialCode = this.selectedCountryData.dialCode;
    const isNanp = selectedDialCode === '1';
    if (number && this.options.nationalMode && isNanp && number.charAt(0) !== '+') {
      if (number.charAt(0) !== '1') number = `1${number}`;
      number = `+${number}`;
    }

    // update flag if user types area code for another country
    if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== '+') {
      number = `+${selectedDialCode}${number}`;
    }

    // try and extract valid dial code from input
    const dialCode = this._getDialCode(number);
    const numeric = this._getNumeric(number);
    let countryCode = null;
    if (dialCode) {
      const countryCodes = this.countryCodes[this._getNumeric(dialCode)];
      // check if the right country is already selected. this should be false if the number is
      // longer than the matched dial code because in this case we need to make sure that if
      // there are multiple country matches, that the first one is selected (note: we could
      // just check that here, but it requires the same loop that we already have later)
      const alreadySelected = (countryCodes.indexOf(this.selectedCountryData.iso2) !== -1)
        && (numeric.length <= dialCode.length - 1);
      const isRegionlessNanpNumber = (selectedDialCode === '1' && this._isRegionlessNanp(numeric));

      // only update the flag if:
      // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
      // AND
      // B) the right country is not already selected
      if (!isRegionlessNanpNumber && !alreadySelected) {
        // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
        // non-empty index
        for (let j = 0; j < countryCodes.length; j++) {
          if (countryCodes[j]) {
            countryCode = countryCodes[j];
            break;
          }
        }
      }
    } else if (number.charAt(0) === '+' && numeric.length) {
      // invalid dial code, so empty
      // Note: use getNumeric here because the number has not been formatted yet, so could contain
      // bad chars
      countryCode = '';
    } else if (!number || number === '+') {
      // empty, or just a plus, so default
      countryCode = this.defaultCountry;
    }

    if (countryCode !== null) {
      return this._setFlag(countryCode);
    }
    return false;
  }


  // check if the given number is a regionless NANP number (expects the number to contain an
  // international dial code)
  _isRegionlessNanp(number) {
    const numeric = this._getNumeric(number);
    if (numeric.charAt(0) === '1') {
      const areaCode = numeric.substr(1, 3);
      return (regionlessNanpNumbers.indexOf(areaCode) !== -1);
    }
    return false;
  }


  // remove highlighting from other list items and highlight the given item
  _highlightListItem(listItem, shouldFocus) {
    const prevItem = this.highlightedItem;
    if (prevItem) prevItem.classList.remove('iti__highlight');
    this.highlightedItem = listItem;
    this.highlightedItem.classList.add('iti__highlight');

    if (shouldFocus) this.highlightedItem.focus();
  }


  // find the country data for the given country code
  // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
    const countryList = (ignoreOnlyCountriesOption) ? allCountries : this.countries;
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].iso2 === countryCode) {
        return countryList[i];
      }
    }
    if (allowFail) {
      return null;
    }
    throw new Error(`No country data for '${countryCode}'`);
  }


  // select the given flag, update the placeholder and the active list item
  // Note: called from _setInitialState, _updateFlagFromNumber, _selectListItem, setCountry
  _setFlag(countryCode) {
    const prevCountry = (this.selectedCountryData.iso2) ? this.selectedCountryData : {};

    // do this first as it will throw an error and stop if countryCode is invalid
    this.selectedCountryData = (countryCode) ? this._getCountryData(countryCode, false, false) : {};
    // update the defaultCountry - we only need the iso2 from now on, so just store that
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    this.selectedFlagInner.setAttribute('class', `iti__flag iti__${countryCode}`);
    // update the selected country's title attribute
    const title = (countryCode) ? `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}` : 'Unknown';
    this.selectedFlag.setAttribute('title', title);

    if (this.options.separateDialCode) {
      const dialCode = (this.selectedCountryData.dialCode) ? `+${this.selectedCountryData.dialCode}` : '';
      this.selectedDialCode.innerHTML = dialCode;
      // offsetWidth is zero if input is in a hidden container during initialisation
      const selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();

      // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
      this.telInput.style.paddingLeft = `${selectedFlagWidth + 6}px`;
    }

    // and the input's placeholder
    this._updatePlaceholder();

    // update the active list item
    if (this.options.allowDropdown) {
      const prevItem = this.activeItem;
      if (prevItem) {
        prevItem.classList.remove('iti__active');
        prevItem.setAttribute('aria-selected', 'false');
      }
      if (countryCode) {
        const nextItem = this.countryList.querySelector(`#iti-item-${countryCode}`);
        nextItem.setAttribute('aria-selected', 'true');
        nextItem.classList.add('iti__active');
        this.activeItem = nextItem;
        this.countryList.setAttribute('aria-activedescendant', nextItem.getAttribute('id'));
      }
    }

    // return if the flag has changed or not
    return (prevCountry.iso2 !== countryCode);
  }


  // when the input is in a hidden container during initialisation, we must inject some markup
  // into the end of the DOM to calculate the correct offsetWidth
  _getHiddenSelectedFlagWidth() {
    // to get the right styling to apply, all we need is a shallow clone of the container,
    // and then to inject a deep clone of the selectedFlag element
    const containerClone = this.telInput.parentNode.cloneNode();
    containerClone.style.visibility = 'hidden';
    document.body.appendChild(containerClone);

    const selectedFlagClone = this.selectedFlag.cloneNode(true);
    containerClone.appendChild(selectedFlagClone);

    const width = selectedFlagClone.offsetWidth;
    containerClone.remove();
    return width;
  }


  // update the input placeholder to an example number from the currently selected country
  _updatePlaceholder() {
    const shouldSetPlaceholder = (this.options.autoPlaceholder === 'aggressive') || (!this.hadInitialPlaceholder && this.options.autoPlaceholder === 'polite');
    if (window.intlTelInputUtils && shouldSetPlaceholder) {
      const numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
      let placeholder = (this.selectedCountryData.iso2) ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : '';

      placeholder = this._beforeSetNumber(placeholder);
      if (typeof this.options.customPlaceholder === 'function') {
        placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
      }
      this.telInput.setAttribute('placeholder', placeholder);
    }
  }


  // called when the user selects a list item from the dropdown
  _selectListItem(listItem) {
    // update selected flag and active list item
    const flagChanged = this._setFlag(listItem.getAttribute('data-country-code'));
    this._closeDropdown();

    this._updateDialCode(listItem.getAttribute('data-dial-code'), true);

    // focus the input
    this.telInput.focus();
    // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
    // inserting dial code), who try to put the cursor at the beginning the first time
    const len = this.telInput.value.length;
    this.telInput.setSelectionRange(len, len);

    if (flagChanged) {
      this._triggerCountryChange();
    }
  }


  // close the dropdown and unbind any listeners
  _closeDropdown() {
    this.countryList.classList.add('iti__hide');
    this.countryList.setAttribute('aria-expanded', 'false');
    // update the arrow
    this.dropdownArrow.classList.remove('iti__arrow--up');

    // unbind key events
    document.removeEventListener('keydown', this._handleKeydownOnDropdown);
    document.documentElement.removeEventListener('click', this._handleClickOffToClose);
    this.countryList.removeEventListener('mouseover', this._handleMouseoverCountryList);
    this.countryList.removeEventListener('click', this._handleClickCountryList);

    // remove menu from container
    if (this.options.dropdownContainer) {
      if (!this.isMobile) window.removeEventListener('scroll', this._handleWindowScroll);
      if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
    }

    this._trigger('close:countrydropdown');
  }


  // check if an element is visible within it's container, else scroll until it is
  _scrollTo(element, middle) {
    const container = this.countryList;
    // windowTop from https://stackoverflow.com/a/14384091/217866
    const windowTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerHeight = container.offsetHeight;
    const containerTop = container.getBoundingClientRect().top + windowTop;
    const containerBottom = containerTop + containerHeight;
    const elementHeight = element.offsetHeight;
    const elementTop = element.getBoundingClientRect().top + windowTop;
    const elementBottom = elementTop + elementHeight;
    let newScrollTop = elementTop - containerTop + container.scrollTop;
    const middleOffset = (containerHeight / 2) - (elementHeight / 2);

    if (elementTop < containerTop) {
      // scroll up
      if (middle) newScrollTop -= middleOffset;
      container.scrollTop = newScrollTop;
    } else if (elementBottom > containerBottom) {
      // scroll down
      if (middle) newScrollTop += middleOffset;
      const heightDifference = containerHeight - elementHeight;
      container.scrollTop = newScrollTop - heightDifference;
    }
  }


  // replace any existing dial code with the new one
  // Note: called from _selectListItem and setCountry
  _updateDialCode(newDialCodeBare, hasSelectedListItem) {
    const inputVal = this.telInput.value;
    // save having to pass this every time
    const newDialCode = `+${newDialCodeBare}`;

    let newNumber;
    if (inputVal.charAt(0) === '+') {
      // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
      const prevDialCode = this._getDialCode(inputVal);
      if (prevDialCode) {
        // current number contains a valid dial code, so replace it
        newNumber = inputVal.replace(prevDialCode, newDialCode);
      } else {
        // current number contains an invalid dial code, so ditch it
        // (no way to determine where the invalid dial code ends and the rest of the number begins)
        newNumber = newDialCode;
      }
    } else if (this.options.nationalMode || this.options.separateDialCode) {
      // don't do anything
      return;
    } else {
      // nationalMode is disabled
      if (inputVal) {
        // there is an existing value with no dial code: prefix the new dial code
        newNumber = newDialCode + inputVal;
      } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
        // no existing value and either they've just selected a list item, or autoHideDialCode is
        // disabled: insert new dial code
        newNumber = newDialCode;
      } else {
        return;
      }
    }

    this.telInput.value = newNumber;
  }


  // try and extract a valid international dial code from a full telephone number
  // Note: returns the raw string inc plus character and any whitespace/dots etc
  _getDialCode(number) {
    let dialCode = '';
    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';
      // iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        // if char is number (https://stackoverflow.com/a/8935649/217866)
        if (!isNaN(parseInt(c, 10))) {
          numericChars += c;
          // if current numericChars make a valid dial code
          if (this.countryCodes[numericChars]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1);
          }
          if (numericChars.length === this.dialCodeMaxLen) {
            break;
          }
        }
      }
    }
    return dialCode;
  }


  // get the input val, adding the dial code if separateDialCode is enabled
  _getFullNumber() {
    const val = this.telInput.value.trim();
    const { dialCode } = this.selectedCountryData;
    let prefix;
    const numericVal = this._getNumeric(val);

    if (this.options.separateDialCode && val.charAt(0) !== '+' && dialCode && numericVal) {
      // when using separateDialCode, it is visible so is effectively part of the typed number
      prefix = `+${dialCode}`;
    } else {
      prefix = '';
    }
    return prefix + val;
  }


  // remove the dial code if separateDialCode is enabled
  // also cap the length if the input has a maxlength attribute
  _beforeSetNumber(originalNumber) {
    let number = originalNumber;
    if (this.options.separateDialCode) {
      let dialCode = this._getDialCode(number);
      // if there is a valid dial code
      if (dialCode) {
        // in case _getDialCode returned an area code as well
        dialCode = `+${this.selectedCountryData.dialCode}`;
        // a lot of numbers will have a space separating the dial code and the main number, and
        // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
        // rid of it
        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
        const start = (number[dialCode.length] === ' ' || number[dialCode.length] === '-') ? dialCode.length + 1 : dialCode.length;
        number = number.substr(start);
      }
    }

    return this._cap(number);
  }


  // trigger the 'countrychange' event
  _triggerCountryChange() {
    this._trigger('countrychange');
  }


  /**************************
   *  SECRET PUBLIC METHODS
   **************************/


  // this is called when the geoip call returns
  handleAutoCountry() {
    if (this.options.initialCountry === 'auto') {
      // we must set this even if there is an initial val in the input: in case the initial val is
      // invalid and they delete it - they should see their auto country
      this.defaultCountry = window.intlTelInputGlobals.autoCountry;
      // if there's no initial value in the input, then update the flag
      if (!this.telInput.value) {
        this.setCountry(this.defaultCountry);
      }
      this.resolveAutoCountryPromise();
    }
  }


  // this is called when the utils request completes
  handleUtils() {
    // if the request was successful
    if (window.intlTelInputUtils) {
      // if there's an initial value in the input, then format it
      if (this.telInput.value) {
        this._updateValFromNumber(this.telInput.value);
      }
      this._updatePlaceholder();
    }
    this.resolveUtilsScriptPromise();
  }


  /********************
   *  PUBLIC METHODS
   ********************/


  // remove plugin
  destroy() {
    const { form } = this.telInput;

    if (this.options.allowDropdown) {
      // make sure the dropdown is closed (and unbind listeners)
      this._closeDropdown();
      this.selectedFlag.removeEventListener('click', this._handleClickSelectedFlag);
      this.flagsContainer.removeEventListener('keydown', this._handleFlagsContainerKeydown);
      // label click hack
      const label = this._getClosestLabel();
      if (label) label.removeEventListener('click', this._handleLabelClick);
    }

    // unbind hiddenInput listeners
    if (this.hiddenInput && form) form.removeEventListener('submit', this._handleHiddenInputSubmit);

    // unbind autoHideDialCode listeners
    if (this.options.autoHideDialCode) {
      if (form) form.removeEventListener('submit', this._handleSubmitOrBlurEvent);
      this.telInput.removeEventListener('blur', this._handleSubmitOrBlurEvent);
    }

    // unbind key events, and cut/paste events
    this.telInput.removeEventListener('keyup', this._handleKeyupEvent);
    this.telInput.removeEventListener('cut', this._handleClipboardEvent);
    this.telInput.removeEventListener('paste', this._handleClipboardEvent);

    // remove attribute of id instance: data-intl-tel-input-id
    this.telInput.removeAttribute('data-intl-tel-input-id');

    // remove markup (but leave the original input)
    const wrapper = this.telInput.parentNode;
    wrapper.parentNode.insertBefore(this.telInput, wrapper);
    wrapper.parentNode.removeChild(wrapper);

    delete window.intlTelInputGlobals.instances[this.id];
  }


  // get the extension from the current number
  getExtension() {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
    }
    return '';
  }


  // format the number to the given format
  getNumber(format) {
    if (window.intlTelInputUtils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
    }
    return '';
  }


  // get the type of the entered number e.g. landline/mobile
  getNumberType() {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
    }
    return -99;
  }


  // get the country data for the currently selected flag
  getSelectedCountryData() {
    return this.selectedCountryData;
  }


  // get the validation error
  getValidationError() {
    if (window.intlTelInputUtils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
    }
    return -99;
  }


  // validate the input val - assumes the global function isValidNumber (from utilsScript)
  isValidNumber() {
    const val = this._getFullNumber().trim();
    const countryCode = (this.options.nationalMode) ? this.selectedCountryData.iso2 : '';
    return (window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null);
  }


  // update the selected flag, and update the input val accordingly
  setCountry(originalCountryCode) {
    const countryCode = originalCountryCode.toLowerCase();
    // check if already selected
    if (!this.selectedFlagInner.classList.contains(`iti__${countryCode}`)) {
      this._setFlag(countryCode);
      this._updateDialCode(this.selectedCountryData.dialCode, false);
      this._triggerCountryChange();
    }
  }


  // set the input value and update the flag
  setNumber(number) {
    // we must update the flag first, which updates this.selectedCountryData, which is used for
    // formatting the number before displaying it
    const flagChanged = this._updateFlagFromNumber(number);
    this._updateValFromNumber(number);
    if (flagChanged) {
      this._triggerCountryChange();
    }
  }

  // set the placeholder number typ
  setPlaceholderNumberType(type) {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }
}


/********************
 *  STATIC METHODS
 ********************/


// get the country data object
window.intlTelInputGlobals.getCountryData = () => allCountries;


// inject a <script> element to load utils.js
const injectScript = (path, handleSuccess, handleFailure) => {
  // inject a new script element into the page
  const script = document.createElement('script');
  script.onload = () => {
    forEachInstance('handleUtils');
    if (handleSuccess) handleSuccess();
  };
  script.onerror = () => {
    forEachInstance('rejectUtilsScriptPromise');
    if (handleFailure) handleFailure();
  };
  script.className = 'iti-load-utils';
  script.async = true;
  script.src = path;
  document.body.appendChild(script);
};


// load the utils script
window.intlTelInputGlobals.loadUtils = (path) => {
  // 2 options:
  // 1) not already started loading (start)
  // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
  // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
  if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
    // only do this once
    window.intlTelInputGlobals.startedLoadingUtilsScript = true;

    // if we have promises, then return a promise
    if (typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => injectScript(path, resolve, reject));
    } injectScript(path);
  }
  return null;
};


// default options
window.intlTelInputGlobals.defaults = defaults;

// version
window.intlTelInputGlobals.version = '<%= version %>';
