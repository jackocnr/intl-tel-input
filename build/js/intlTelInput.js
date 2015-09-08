/*
International Telephone Input v6.1.0
https://github.com/Bluefieldscom/intl-tel-input.git
*/
// wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function(factory) {
    if (typeof define === "function" && define.amd) {
        try {
            define("intl-tel-input", [ "jquery" ], function($) {
                factory($, window, document);
            });
        } catch (ex) {
            define("intl-tel-input", function() {
                factory(false, window, document);
            });
        }
    } else if (typeof module !== "undefined") {
        try {
            factory(require("jquery"), window, document);
        } catch (ex) {
            factory(false, window, document);
        }
    } else {
        if (typeof jQuery !== "undefined") {
            factory(jQuery, window, document);
        } else {
            factory(false, window, document);
        }
    }
})(function($, window, document, undefined) {
    "use strict";
    // these vars persist through all instances of the plugin
    var pluginName = "intlTelInput", id = 0, // give each instance it's own id for calling some methods on all instances
    defaults = {
        // typing digits after a valid number will be added to the extension part of the number
        allowExtensions: false,
        // automatically format the number according to the selected country
        autoFormat: true,
        // if there is just a dial code in the input: remove it on blur, and re-add it on focus
        autoHideDialCode: true,
        // add or remove input placeholder with an example number for the selected country
        autoPlaceholder: true,
        // default country
        defaultCountry: "",
        // geoIp lookup function
        geoIpLookup: null,
        // don't insert international dial codes
        nationalMode: true,
        // number type to use for placeholders
        numberType: "MOBILE",
        // display only these countries
        onlyCountries: [],
        // the countries at the top of the list. defaults to united states and united kingdom
        preferredCountries: [ "us", "gb" ],
        // specify the path to the libphonenumber script to enable validation/formatting
        utilsScript: ""
    }, keys = {
        UP: 38,
        DOWN: 40,
        ENTER: 13,
        ESC: 27,
        PLUS: 43,
        A: 65,
        Z: 90,
        ZERO: 48,
        NINE: 57,
        SPACE: 32,
        BSPACE: 8,
        TAB: 9,
        DEL: 46,
        CTRL: 17,
        CMD1: 91,
        // Chrome
        CMD2: 224
    }, windowLoaded = false, allInstances = [];
    function extend(object1, object2) {
        var newObject = {};
        var oldObjects = [ object1, object2 ];
        for (var i = 0; i < oldObjects.length; i++) {
            var currentObject = oldObjects[i];
            for (var key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                    newObject[key] = currentObject[key];
                }
            }
        }
        return newObject;
    }
    function inArray(value, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }
    function trim(text) {
        if (text) {
            return (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        } else {
            return "";
        }
    }
    function hasClass(element, className) {
        return (element.className + " ").indexOf(className + " ") >= 0;
    }
    function removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            var elementClassName = element.className + " ";
            element.className = trim(elementClassName.replace(className + " ", ""));
        }
    }
    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else if (!element.className) {
            element.className = className;
        } else if (!hasClass(element, className)) {
            element.className += " " + className;
        }
    }
    function whichKey(e) {
        if (e.which) {
            return e.which;
        } else {
            return e.charCode !== null && e.charCode !== undefined ? e.charCode : e.keyCode;
        }
    }
    function isNumeric(string) {
        return string - parseFloat(string) + 1 >= 0;
    }
    function getWindowScrollTop() {
        var supportPageOffset = window.pageYOffset !== undefined;
        var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
        if (supportPageOffset) {
            return window.pageYOffset;
        } else if (isCSS1Compat) {
            return document.documentElement.scrollTop;
        } else {
            return document.body.scrollTop;
        }
    }
    function getWindowInnerHeight() {
        if (window.innerHeight === undefined) {
            return document.documentElement.clientHeight;
        } else {
            return window.innerHeight;
        }
    }
    function getDocumentHeight() {
        var html = document.documentElement;
        var body = document.body;
        return Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight);
    }
    function forEach(elements, fn) {
        for (var i = 0; i < elements.length; i++) {
            fn(elements[i]);
        }
    }
    function first(elements, fn) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (fn(element)) {
                return element;
            }
        }
    }
    function hasFocus(element) {
        return element.parentNode && element.parentNode.querySelector(":focus") === element;
    }
    // tagName is lowercased
    function getClosestParent(element, tagName) {
        if (element.tagName && element.tagName.toLowerCase() === tagName) {
            return element;
        } else if (element.parentNode) {
            return getClosestParent(element.parentNode, tagName);
        } else {
            return null;
        }
    }
    function dispatchEvent(element, eventName, bubbles, cancellable) {
        if (document.createEvent) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, bubbles, cancellable);
            element.dispatchEvent(event);
        } else if (element.fireEvent) {
            element.fireEvent("on" + eventName);
        } else {
            throw new Error("-_-");
        }
    }
    function dispatchCustomEvent(element, eventName, bubbles, cancellable, data) {
        if (window.CustomEvent || document.createEvent) {
            var event;
            if (window.CustomEvent) {
                event = new CustomEvent(eventName, data);
            } else if (document.createEvent) {
                event = document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, bubbles, cancellable, data);
            }
            return element.dispatchEvent(event);
        }
    }
    function createHandler(element, fn) {
        if (element.addEventListener) {
            return fn;
        } else if (element.attachEvent) {
            return function(event) {
                fn.call(element, event);
            };
        } else {
            throw new Error("-_-");
        }
    }
    function addEventListener(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, handler);
        } else {
            throw new Error("-_-");
        }
    }
    function removeEventListener(element, eventName, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + eventName, handler);
        } else {
            throw new Error("-_-");
        }
    }
    function stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    function preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    function getOffset(element) {
        var rect = element.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }
    var storage = {
        get: function(key) {
            if (window.localStorage) {
                return window.localStorage.getItem(key);
            } else if ($ && $.cookie) {
                return $.cookie(key);
            } else {
                return "";
            }
        },
        set: function(key, value, options) {
            if (window.localStorage) {
                return window.localStorage.setItem(key, value);
            } else if ($ && $.cookie) {
                return $.cookie(key, value, options);
            }
        }
    };
    // keep track of if the window.load event has fired as impossible to check after the fact
    addEventListener(window, "load", function() {
        windowLoaded = true;
    });
    var methods = {
        getListItemByCode: function(countryList, countryCode) {
            // unfortunately IE8 doesn't support :not css selector -_-
            var listItems = countryList.querySelectorAll("[data-country-code=" + countryCode + "]");
            var listItem = first(listItems, function(item) {
                return !hasClass(item, "preferred");
            });
            return listItem;
        },
        getDropdownHeight: function(countryList) {
            var height;
            countryList.className = "country-list v-hide";
            height = countryList.offsetHeight;
            countryList.className = "country-list hide";
            return height;
        },
        generateMarkup: function(isMobile, anyPreferredCountries) {
            var selectedFlagInner = document.createElement("div");
            var flagsContainer = document.createElement("div");
            var mainContainer = document.createElement("div");
            var selectedFlag = document.createElement("div");
            var arrow = document.createElement("div");
            var countryList;
            var divider;
            selectedFlagInner.className = "iti-flag";
            flagsContainer.className = "flag-dropdown";
            mainContainer.className = "intl-tel-input";
            selectedFlag.className = "selected-flag";
            arrow.className = "arrow";
            // make element focusable and tab naviagable
            selectedFlag.tabIndex = 0;
            // country list
            // mobile is just a native select element
            // desktop is a proper list containing: preferred countries, then divider, then all countries
            if (isMobile) {
                countryList = document.createElement("select");
                countryList.className = "iti-mobile-select";
            } else {
                countryList = document.createElement("ul");
                countryList.className = "country-list hide";
                if (anyPreferredCountries) {
                    divider = document.createElement("li");
                    divider.className = "divider";
                }
            }
            // must do it this way instead of using a literal syntax, otherwise the min version will have a syntax error
            var ret = {};
            ret.selectedFlagInner = selectedFlagInner;
            ret.flagsContainer = flagsContainer;
            ret.mainContainer = mainContainer;
            ret.selectedFlag = selectedFlag;
            ret.countryList = countryList;
            ret.divider = divider;
            ret.arrow = arrow;
            return ret;
        },
        restructureMarkup: function(element, markup) {
            var selectedFlagInner = markup.selectedFlagInner;
            var flagsContainer = markup.flagsContainer;
            var mainContainer = markup.mainContainer;
            var selectedFlag = markup.selectedFlag;
            var countryList = markup.countryList;
            var arrow = markup.arrow;
            // This check is necessary since this element may have been created without a parent using Javascript
            if (element.parentNode) {
                element.parentNode.insertBefore(mainContainer, element);
            }
            mainContainer.appendChild(element);
            mainContainer.insertBefore(flagsContainer, element);
            // currently selected flag (displayed to left of input)
            flagsContainer.appendChild(selectedFlag);
            selectedFlag.appendChild(selectedFlagInner);
            selectedFlag.appendChild(arrow);
            // country list
            // mobile is just a native select element
            // desktop is a proper list containing: preferred countries, then divider, then all countries
            flagsContainer.appendChild(countryList);
        }
    };
    function IntlTelInput(element, options) {
        var instance = this.instance = new Plugin(element, options || {});
        this.inputElement = element;
        instance._init();
    }
    // get the country data object
    IntlTelInput.getCountryData = function() {
        return allCountries;
    };
    IntlTelInput.version = "6.1.0";
    IntlTelInput.prototype = {
        selectCountry: function(countryCode) {
            return this.instance.selectCountry(countryCode);
        },
        getSelectedCountryData: function() {
            return this.instance.getSelectedCountryData();
        },
        setNumber: function(number, format, addSuffix, preventConversion, isAllowedKey) {
            return this.instance.setNumber(number, format, addSuffix, preventConversion, isAllowedKey);
        },
        getValidationError: function() {
            return this.instance.getValidationError();
        },
        autoCountryLoaded: function() {
            return this.instance.autoCountryLoaded();
        },
        isValidNumber: function() {
            return this.instance.isValidNumber();
        },
        getNumber: function(type) {
            return this.instance.getNumber(type);
        },
        loadUtils: function(path) {
            return this.instance.loadUtils(path);
        },
        getNumberType: function() {
            return this.instance.getNumberType();
        },
        getExtension: function() {
            return this.instance.getExtension();
        },
        utilsLoaded: function() {
            return this.instance.utilsLoaded();
        },
        destroy: function() {
            return this.instance.destroy();
        }
    };
    window.IntlTelInput = IntlTelInput;
    function Plugin(element, options) {
        this.element = element;
        this.options = extend(defaults, options);
        this._defaults = defaults;
        // unique identifier for this instance
        allInstances[id] = this;
        this.id = id;
        id++;
        // Chrome, FF, Safari, IE9+
        this.isGoodBrowser = Boolean(element.setSelectionRange);
        this.hadInitialPlaceholder = element.hasAttribute("placeholder");
        this._name = pluginName;
        // For some reason tests fail when this line is omitted
        if ($) {
            $(element);
        }
    }
    Plugin.prototype = {
        _init: function() {
            // if in nationalMode, disable options relating to dial codes
            if (this.options.nationalMode) {
                this.options.autoHideDialCode = false;
            }
            // IE Mobile doesn't support the keypress event (see issue 68) which makes autoFormat impossible
            if (navigator.userAgent.match(/IEMobile/i)) {
                this.options.autoFormat = false;
            }
            // we cannot just test screen size as some smartphones/website meta tags will report desktop resolutions
            // Note: for some reason jasmine fucks up if you put this in the main Plugin function with the rest of these declarations
            // Note: to target Android Mobiles (and not Tablets), we must find "Android" and "Mobile"
            this.isMobile = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            // we return these deferred objects from the _init() call so they can be watched, and then we resolve them when each specific request returns
            // Note: again, jasmine had a spazz when I put these in the Plugin function
            if ($) {
                this.autoCountryDeferred = new $.Deferred();
                this.utilsScriptDeferred = new $.Deferred();
            }
            // process all the data: onlyCountries, preferredCountries etc
            this._processCountryData();
            // generate the markup
            this._generateMarkup(this.isMobile, this.element, this.countries, this.preferredCountries);
            // set the initial state of the input value and the selected flag
            this._setInitialState();
            // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
            this._initListeners();
            // utils script, and auto country
            this._initRequests();
            // return the deferreds
            if ($) {
                return [ this.autoCountryDeferred, this.utilsScriptDeferred ];
            }
        },
        /********************
   *  PRIVATE METHODS
   ********************/
        // prepare all of the country data, including onlyCountries and preferredCountries options
        _processCountryData: function() {
            // set the instances country data objects
            this._setInstanceCountryData();
            // set the preferredCountries property
            this._setPreferredCountries();
        },
        // add a country code to this.countryCodes
        _addCountryCode: function(iso2, dialCode, priority) {
            if (!(dialCode in this.countryCodes)) {
                this.countryCodes[dialCode] = [];
            }
            var index = priority || 0;
            this.countryCodes[dialCode][index] = iso2;
        },
        // process onlyCountries array if present, and generate the countryCodes map
        _setInstanceCountryData: function() {
            var i;
            // process onlyCountries option
            if (this.options.onlyCountries.length) {
                // standardise case
                for (i = 0; i < this.options.onlyCountries.length; i++) {
                    this.options.onlyCountries[i] = this.options.onlyCountries[i].toLowerCase();
                }
                // build instance country array
                this.countries = [];
                for (i = 0; i < allCountries.length; i++) {
                    if (inArray(allCountries[i].iso2, this.options.onlyCountries) != -1) {
                        this.countries.push(allCountries[i]);
                    }
                }
            } else {
                this.countries = allCountries;
            }
            // generate countryCodes map
            this.countryCodes = {};
            for (i = 0; i < this.countries.length; i++) {
                var c = this.countries[i];
                this._addCountryCode(c.iso2, c.dialCode, c.priority);
                // area codes
                if (c.areaCodes) {
                    for (var j = 0; j < c.areaCodes.length; j++) {
                        // full dial code is country code + dial code
                        this._addCountryCode(c.iso2, c.dialCode + c.areaCodes[j]);
                    }
                }
            }
        },
        // process preferred countries - iterate through the preferences,
        // fetching the country data for each one
        _setPreferredCountries: function() {
            this.preferredCountries = [];
            for (var i = 0; i < this.options.preferredCountries.length; i++) {
                var countryCode = this.options.preferredCountries[i].toLowerCase(), countryData = this._getCountryData(countryCode, false, true);
                if (countryData) {
                    this.preferredCountries.push(countryData);
                }
            }
        },
        // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
        _generateMarkup: function(isMobile, element, countries, preferredCountries) {
            var markup = methods.generateMarkup(isMobile, preferredCountries.length);
            methods.restructureMarkup(element, markup);
            // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can easily put the plugin in an inconsistent state e.g. the wrong flag selected for the autocompleted number, which on submit could mean the wrong number is saved (esp in nationalMode)
            element.setAttribute("autocomplete", "off");
            this.selectedFlagInner = markup.selectedFlagInner;
            this.flagsContainer = markup.flagsContainer;
            this.selectedFlag = markup.selectedFlag;
            this.countryList = markup.countryList;
            this.arrow = markup.arrow;
            if (preferredCountries.length && !isMobile) {
                this._appendListItems(preferredCountries, "preferred");
                this.countryList.appendChild(markup.divider);
            }
            this._appendListItems(countries, "");
            if (!isMobile) {
                // now we can grab the dropdown height, and hide it properly
                this.dropdownHeight = methods.getDropdownHeight(this.countryList);
                // this is useful in lots of places
                this.countryListItems = this.countryList.querySelectorAll(".country");
            }
        },
        // add a country <li> to the countryList <ul> container
        // UPDATE: if isMobile, add an <option> to the countryList <select> container
        _appendListItems: function(countries, className) {
            // we create so many DOM elements, it is faster to build a temp string
            // and then add everything to the DOM in one go at the end
            var tmp = "";
            // for each country
            for (var i = 0; i < countries.length; i++) {
                var c = countries[i];
                if (this.isMobile) {
                    tmp += "<option data-dial-code='" + c.dialCode + "' value='" + c.iso2 + "'>";
                    tmp += c.name + " +" + c.dialCode;
                    tmp += "</option>";
                } else {
                    // open the list item
                    tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
                    // add the flag
                    tmp += "<div class='flag'><div class='iti-flag " + c.iso2 + "'></div></div>";
                    // and the country name and dial code
                    tmp += "<span class='country-name'>" + c.name + "</span>";
                    tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
                    // close the list item
                    tmp += "</li>";
                }
            }
            this.countryList.innerHTML += tmp;
        },
        // set the initial state of the input value and the selected flag
        _setInitialState: function() {
            var val = this.element.value;
            // if there is a number, and it's valid, we can go ahead and set the flag, else fall back to default
            if (this._getDialCode(val)) {
                this._updateFlagFromNumber(val, true);
            } else if (this.options.defaultCountry != "auto") {
                // check the defaultCountry option, else fall back to the first in the list
                if (this.options.defaultCountry) {
                    this.options.defaultCountry = this._getCountryData(this.options.defaultCountry.toLowerCase(), false, false);
                } else {
                    this.options.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0] : this.countries[0];
                }
                this._selectFlag(this.options.defaultCountry.iso2);
                // if empty, insert the default dial code (this function will check !nationalMode and !autoHideDialCode)
                if (!val) {
                    this._updateDialCode(this.options.defaultCountry.dialCode, false);
                }
            }
            // format
            if (val) {
                // this wont be run after _updateDialCode as that's only called if no val
                this._updateVal(val);
            }
        },
        // initialise the main event listeners: input keyup, and click selected flag
        _initListeners: function() {
            var that = this;
            this._eventListeners = {};
            this._initKeyListeners();
            // autoFormat prevents the change event from firing, so we need to check for changes between focus and blur in order to manually trigger it
            if (this.options.autoHideDialCode || this.options.autoFormat) {
                this._initFocusListeners();
            }
            if (this.isMobile) {
                this._eventListeners.onMobileCountryListChange = createHandler(this.countryList, function(e) {
                    var selectedItem = this.querySelector("option:checked");
                    if (selectedItem) {
                        that._selectListItem(selectedItem);
                    }
                });
                addEventListener(this.countryList, "change", this._eventListeners.onMobileCountryListChange);
            } else {
                // hack for input nested inside label: clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again
                var label = getClosestParent(this.element, "label");
                if (label) {
                    this._eventListeners.onLabelClicked = createHandler(function(e) {
                        // if the dropdown is closed, then focus the input, else ignore the click
                        if (hasClass(that.countryList, "hide")) {
                            that.element.focus();
                        } else {
                            preventDefault(e);
                        }
                    });
                    addEventListener(label, "click", this._eventListeners.onLabelClicked);
                }
                // toggle country dropdown on click
                this._eventListeners.onSelectedFlagClicked = createHandler(this.selectedFlag, function(e) {
                    // only intercept this event if we're opening the dropdown
                    // else let it bubble up to the top ("click-off-to-close" listener)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    if (hasClass(that.countryList, "hide") && !that.element.disabled && !that.element.readonly) {
                        that._showDropdown();
                    }
                });
                addEventListener(this.selectedFlag, "click", this._eventListeners.onSelectedFlagClicked);
            }
            // open dropdown list if currently focused
            this._eventListeners.onFlagKeydown = createHandler(this.flagsContainer, function(e) {
                var isDropdownHidden = hasClass(that.countryList, "hide");
                var which = whichKey(e);
                if (isDropdownHidden && (which == keys.UP || which == keys.DOWN || which == keys.SPACE || which == keys.ENTER)) {
                    // prevent form from being submitted if "ENTER" was pressed
                    preventDefault(e);
                    // prevent event from being handled again by document
                    stopPropagation(e);
                    that._showDropdown();
                }
                // allow navigation from dropdown to input on TAB
                if (which == keys.TAB) {
                    that._closeDropdown();
                }
            });
            addEventListener(this.flagsContainer, "keydown", this._eventListeners.onFlagKeydown);
        },
        _initRequests: function() {
            var that = this;
            // if the user has specified the path to the utils script, fetch it on window.load
            if (this.options.utilsScript) {
                // if the plugin is being initialised after the window.load event has already been fired
                if (windowLoaded) {
                    this.loadUtils();
                } else {
                    // wait until the load event so we don't block any other requests e.g. the flags image
                    addEventListener(window, "load", createHandler(window, function() {
                        that.loadUtils();
                    }));
                }
            } else if ($) {
                this.utilsScriptDeferred.resolve();
            }
            if (this.options.defaultCountry == "auto") {
                this._loadAutoCountry();
            } else if ($) {
                this.autoCountryDeferred.resolve();
            }
        },
        _loadAutoCountry: function() {
            var that = this;
            // check for cookie
            var cookieAutoCountry = storage.get("itiAutoCountry");
            if (cookieAutoCountry) {
                IntlTelInput.autoCountry = cookieAutoCountry;
            }
            // 3 options:
            // 1) already loaded (we're done)
            // 2) not already started loading (start)
            // 3) already started loading (do nothing - just wait for loading callback to fire)
            if (IntlTelInput.autoCountry) {
                this.autoCountryLoaded();
            } else if (!IntlTelInput.startedLoadingAutoCountry) {
                // don't do this twice!
                IntlTelInput.startedLoadingAutoCountry = true;
                if (typeof this.options.geoIpLookup === "function") {
                    this.options.geoIpLookup(function(countryCode) {
                        IntlTelInput.autoCountry = countryCode.toLowerCase();
                        storage.set("itiAutoCountry", IntlTelInput.autoCountry, {
                            path: "/"
                        });
                        // tell all instances the auto country is ready
                        // TODO: this should just be the current instances
                        // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight away (e.g. if they have already done the geo ip lookup somewhere else). Using setTimeout means that the current thread of execution will finish before executing this, which allows the plugin to finish initialising.
                        setTimeout(function() {
                            forEach(allInstances, function(instance) {
                                if (instance) {
                                    instance.autoCountryLoaded();
                                }
                            });
                        });
                    });
                }
            }
        },
        _initKeyListeners: function() {
            var that = this;
            if (this.options.autoFormat) {
                // format number and update flag on keypress
                // use keypress event as we want to ignore all input except for a select few keys,
                // but we dont want to ignore the navigation keys like the arrows etc.
                // NOTE: no point in refactoring this to only bind these listeners on focus/blur because then you would need to have those 2 listeners running the whole time anyway...
                this._eventListeners.onElementKeypress = createHandler(this.element, function(e) {
                    // 32 is space, and after that it's all chars (not meta/nav keys)
                    // this fix is needed for Firefox, which triggers keypress event for some meta/nav keys
                    // Update: also ignore if this is a metaKey e.g. FF and Safari trigger keypress on the v of Ctrl+v
                    // Update: also ignore if ctrlKey (FF on Windows/Ubuntu)
                    // Update: also check that we have utils before we do any autoFormat stuff
                    var which = whichKey(e);
                    if (which >= keys.SPACE && !e.ctrlKey && !e.metaKey && window.intlTelInputUtils && !that.element.readonly) {
                        preventDefault(e);
                        // allowed keys are just numeric keys and plus
                        // we must allow plus for the case where the user does select-all and then hits plus to start typing a new number. we could refine this logic to first check that the selection contains a plus, but that wont work in old browsers, and I think it's overkill anyway
                        var isAllowedKey = which >= keys.ZERO && which <= keys.NINE || which == keys.PLUS, input = that.element, noSelection = that.isGoodBrowser && input.selectionStart == input.selectionEnd, max = that.element.maxlength || that.element.getAttribute("maxlength"), val = that.element.value, // assumes that if max exists, it is >0
                        isBelowMax = max ? val.length < max : true;
                        // first: ensure we dont go over maxlength. we must do this here to prevent adding digits in the middle of the number
                        // still reformat even if not an allowed key as they could by typing a formatting char, but ignore if there's a selection as doesn't make sense to replace selection with illegal char and then immediately remove it
                        if (isBelowMax && (isAllowedKey || noSelection)) {
                            var newChar = isAllowedKey ? String.fromCharCode(which) : null;
                            that._handleInputKey(newChar, true, isAllowedKey);
                            // if something has changed, trigger the input event (which was otherwised squashed by the preventDefault)
                            if (val != that.element.value) {
                                dispatchEvent(that.element, "input", true, false);
                            }
                        }
                        if (!isAllowedKey) {
                            that._handleInvalidKey();
                        }
                    }
                });
                addEventListener(this.element, "keypress", this._eventListeners.onElementKeypress);
            }
            // handle cut/paste event (now supported in all major browsers)
            this._eventListeners.onElementCutOrPaste = createHandler(this.element, function() {
                // hack because "paste" event is fired before input is updated
                setTimeout(function() {
                    if (that.options.autoFormat && window.intlTelInputUtils) {
                        var cursorAtEnd = that.isGoodBrowser && that.element.selectionStart == that.element.value.length;
                        that._handleInputKey(null, cursorAtEnd);
                        that._ensurePlus();
                    } else {
                        // if no autoFormat, just update flag
                        // FIXME: tests still pass when this line is commented
                        that._updateFlagFromNumber(that.element.value);
                    }
                });
            });
            addEventListener(this.element, "paste", this._eventListeners.onElementCutOrPaste);
            addEventListener(this.element, "cut", this._eventListeners.onElementCutOrPaste);
            // handle keyup event
            // if autoFormat enabled: we use keyup to catch delete events (after the fact)
            // if no autoFormat, this is used to update the flag
            this._eventListeners.onElementKeyup = createHandler(this.element, function(e) {
                // the "enter" key event from selecting a dropdown item is triggered here on the input, because the document.keydown handler that initially handles that event triggers a focus on the input, and so the keyup for that same key event gets triggered here. weird, but just make sure we dont bother doing any re-formatting in this case (we've already done preventDefault in the keydown handler, so it wont actually submit the form or anything).
                // ALSO: ignore keyup if readonly
                var which = whichKey(e);
                if (which == keys.ENTER || that.element.readonly) {} else if (that.options.autoFormat && window.intlTelInputUtils) {
                    // cursorAtEnd defaults to false for bad browsers else they would never get a reformat on delete
                    var cursorAtEnd = that.isGoodBrowser && that.element.selectionStart == that.element.value.length;
                    if (!that.element.value) {
                        // if they just cleared the input, update the flag to the default
                        that._updateFlagFromNumber("");
                    } else if (which == keys.DEL && !cursorAtEnd || which == keys.BSPACE) {
                        // if delete in the middle: reformat with no suffix (no need to reformat if delete at end)
                        // if backspace: reformat with no suffix (need to reformat if at end to remove any lingering suffix - this is a feature)
                        // important to remember never to add suffix on any delete key as can fuck up in ie8 so you can never delete a formatting char at the end
                        that._handleInputKey();
                    }
                    that._ensurePlus();
                } else {
                    // if no autoFormat, just update flag
                    that._updateFlagFromNumber(that.element.value);
                }
            });
            addEventListener(this.element, "keyup", this._eventListeners.onElementKeyup);
        },
        // prevent deleting the plus (if not in nationalMode)
        _ensurePlus: function() {
            if (!this.options.nationalMode) {
                var val = this.element.value;
                if (val.charAt(0) != "+") {
                    // newCursorPos is current pos + 1 to account for the plus we are about to add
                    var newCursorPos = this.isGoodBrowser ? this.element.selectionStart + 1 : 0;
                    // FIXME: tests still pass when this line is commented out -_-
                    this.element.value = "+" + val;
                    if (this.isGoodBrowser) {
                        this.element.setSelectionRange(newCursorPos, newCursorPos);
                    }
                }
            }
        },
        // alert the user to an invalid key event
        _handleInvalidKey: function() {
            var that = this;
            dispatchCustomEvent(this.element, "invalidkey", true, true);
            addClass(this.element, "iti-invalid-key");
            setTimeout(function() {
                removeClass(that.element, "iti-invalid-key");
            }, 100);
        },
        // when autoFormat is enabled: handle various key events on the input:
        // 1) adding a new number character, which will replace any selection, reformat, and preserve the cursor position
        // 2) reformatting on backspace/delete
        // 3) cut/paste event
        _handleInputKey: function(newNumericChar, addSuffix, isAllowedKey) {
            var val = this.element.value, cleanBefore = this._getClean(val), originalLeftChars, digitsOnRight = 0;
            if (this.isGoodBrowser) {
                // cursor strategy: maintain the number of digits on the right. we use the right instead of the left so that A) we dont have to account for the new digit (or multiple digits if paste event), and B) we're always on the right side of formatting suffixes
                digitsOnRight = this._getDigitsOnRight(val, this.element.selectionEnd);
                // if handling a new number character: insert it in the right place
                if (newNumericChar) {
                    // replace any selection they may have made with the new char
                    val = val.substr(0, this.element.selectionStart) + newNumericChar + val.substring(this.element.selectionEnd, val.length);
                } else {
                    // here we're not handling a new char, we're just doing a re-format (e.g. on delete/backspace/paste, after the fact), but we still need to maintain the cursor position. so make note of the char on the left, and then after the re-format, we'll count in the same number of digits from the right, and then keep going through any formatting chars until we hit the same left char that we had before.
                    // UPDATE: now have to store 2 chars as extensions formatting contains 2 spaces so you need to be able to distinguish
                    originalLeftChars = val.substr(this.element.selectionStart - 2, 2);
                }
            } else if (newNumericChar) {
                val += newNumericChar;
            }
            // update the number and flag
            this.setNumber(val, null, addSuffix, true, isAllowedKey);
            // update the cursor position
            if (this.isGoodBrowser) {
                var newCursor;
                val = this.element.value;
                // if it was at the end, keep it there
                if (!digitsOnRight) {
                    newCursor = val.length;
                } else {
                    // else count in the same number of digits from the right
                    newCursor = this._getCursorFromDigitsOnRight(val, digitsOnRight);
                    // but if delete/paste etc, keep going left until hit the same left char as before
                    if (!newNumericChar) {
                        newCursor = this._getCursorFromLeftChar(val, newCursor, originalLeftChars);
                    }
                }
                // set the new cursor
                this.element.setSelectionRange(newCursor, newCursor);
            }
        },
        // we start from the position in guessCursor, and work our way left until we hit the originalLeftChars or a number to make sure that after reformatting the cursor has the same char on the left in the case of a delete etc
        _getCursorFromLeftChar: function(val, guessCursor, originalLeftChars) {
            for (var i = guessCursor; i > 0; i--) {
                var leftChar = val.charAt(i - 1);
                if (isNumeric(leftChar) || val.substr(i - 2, 2) == originalLeftChars) {
                    return i;
                }
            }
            return 0;
        },
        // after a reformat we need to make sure there are still the same number of digits to the right of the cursor
        _getCursorFromDigitsOnRight: function(val, digitsOnRight) {
            for (var i = val.length - 1; i >= 0; i--) {
                if (isNumeric(val.charAt(i))) {
                    if (--digitsOnRight === 0) {
                        return i;
                    }
                }
            }
            return 0;
        },
        // get the number of numeric digits to the right of the cursor so we can reposition the cursor correctly after the reformat has happened
        _getDigitsOnRight: function(val, selectionEnd) {
            var digitsOnRight = 0;
            for (var i = selectionEnd; i < val.length; i++) {
                if (isNumeric(val.charAt(i))) {
                    digitsOnRight++;
                }
            }
            return digitsOnRight;
        },
        // listen for focus and blur
        _initFocusListeners: function() {
            var that = this;
            if (this.options.autoHideDialCode) {
                this._eventListeners.onElementMousedown = createHandler(this.element, function(e) {
                    // FIXME: tests still pass when this statement is commented out -_-
                    if (!hasFocus(that.element) && !that.element.value) {
                        preventDefault(e);
                        // but this also cancels the focus, so we must trigger that manually
                        that.element.focus();
                    }
                });
                // mousedown decides where the cursor goes, so if we're focusing we must preventDefault as we'll be inserting the dial code, and we want the cursor to be at the end no matter where they click
                addEventListener(this.element, "mousedown", this._eventListeners.onElementMousedown);
            }
            this._eventListeners.plusPressedListeners = [];
            this._eventListeners.onElementFocused = createHandler(this.element, function(e) {
                var value = that.element.value;
                // save this to compare on blur
                // FIXME: tests pass when this line is commented out -_-
                that.element.setAttribute("data-focus-val", value);
                // on focus: if empty, insert the dial code for the currently selected flag
                if (that.options.autoHideDialCode && !value && !that.element.readonly && that.selectedCountryData.dialCode) {
                    that._updateVal("+" + that.selectedCountryData.dialCode, null, true);
                    // after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one
                    var onElementPlusPressed = createHandler(that.element, function(e) {
                        var which = whichKey(e);
                        if (which == keys.PLUS) {
                            // if autoFormat is enabled, this key event will have already have been handled by another keypress listener (hence we need to add the "+"). if disabled, it will be handled after this by a keyup listener (hence no need to add the "+").
                            var newVal = that.options.autoFormat && window.intlTelInputUtils ? "+" : "";
                            // FIXME: tests still pass when this line is commented out -_-
                            that.element.value = newVal;
                        }
                        removeEventListener(that.element, "keypress", onElementPlusPressed);
                    });
                    addEventListener(that.element, "keypress", onElementPlusPressed);
                    that._eventListeners.plusPressedListeners.push(onElementPlusPressed);
                    // after tabbing in, make sure the cursor is at the end we must use setTimeout to get outside of the focus handler as it seems the selection happens after that
                    setTimeout(function() {
                        // FIXME: tests still pass when this statement is commented out -_-
                        if (that.isGoodBrowser) {
                            var len = that.element.value.length;
                            that.element.setSelectionRange(len, len);
                        }
                    });
                }
            });
            this._eventListeners.onElementBlurred = createHandler(this.element, function() {
                if (that.options.autoHideDialCode) {
                    // on blur: if just a dial code then remove it
                    var value = that.element.value, startsPlus = value.charAt(0) == "+";
                    if (startsPlus) {
                        var numeric = that._getNumeric(value);
                        // if just a plus, or if just a dial code
                        if (!numeric || that.selectedCountryData.dialCode == numeric) {
                            that.element.value = "";
                        }
                    }
                    // remove the keypress listener we added on focus
                    forEach(that._eventListeners.plusPressedListeners, function(listener) {
                        removeEventListener(that.element, "keypress", listener);
                    });
                    that._eventListeners.plusPressedListeners = [];
                }
                // if autoFormat, we must manually trigger change event if value has changed
                // FIXME: tests pass when this statement is commented out -_-
                if (that.options.autoFormat && window.intlTelInputUtils && that.element.value != that.element.getAttribute("data-focus-val")) {
                    dispatchEvent(that.element, "change", true, false);
                }
            });
            addEventListener(this.element, "focus", this._eventListeners.onElementFocused);
            addEventListener(this.element, "blur", this._eventListeners.onElementBlurred);
        },
        // extract the numeric digits from the given string
        _getNumeric: function(s) {
            return s.replace(/\D/g, "");
        },
        _getClean: function(s) {
            var prefix = s.charAt(0) == "+" ? "+" : "";
            return prefix + this._getNumeric(s);
        },
        // show the dropdown
        _showDropdown: function() {
            this._setDropdownPosition();
            // update highlighting and scroll to active list item
            var activeListItem = this.countryList.querySelector(".active");
            if (activeListItem) {
                this._highlightListItem(activeListItem);
            }
            // show it
            removeClass(this.countryList, "hide");
            if (activeListItem) {
                this._scrollTo(activeListItem);
            }
            // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
            this._bindDropdownListeners();
            // update the arrow
            // FIXED: arrow is a child of selectedFlag not selectedFlagInner
            // FIXME: tests still pass when this line is commented -_-
            addClass(this.arrow, "up");
        },
        // decide where to position dropdown (depends on position within viewport, and scroll)
        _setDropdownPosition: function() {
            var inputTop = getOffset(this.element).top, windowTop = getWindowScrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom)
            dropdownFitsBelow = inputTop + this.element.offsetHeight + this.dropdownHeight < windowTop + getWindowInnerHeight(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
            // dropdownHeight - 1 for border
            // FIXME: cssTop sometimes has two leading negative signs (e.g: --1px)
            var cssTop = !dropdownFitsBelow && dropdownFitsAbove ? "-" + (this.dropdownHeight - 1) + "px" : "";
            this.countryList.style.top = cssTop;
        },
        // we only bind dropdown listeners when the dropdown is open
        _bindDropdownListeners: function() {
            var that = this;
            if (Element.prototype.addEventListener) {
                // when mouse over a list item, just highlight that one
                // we add the class "highlight", so if they hit "enter" we know which one to select
                this._eventListeners.onListItemMouseover = function(e) {
                    // FIXME: tests still pass when this element is commented out -_-
                    that._highlightListItem(this);
                };
                // listen for country selection
                this._eventListeners.onDesktopCountryItemClicked = function(e) {
                    that._selectListItem(this);
                };
            } else {
                // when mouse over a list item, just highlight that one
                // we add the class "highlight", so if they hit "enter" we know which one to select
                this._eventListeners.onListItemMouseover = function(e) {
                    // since IE8 doesn't bind `this` to the clicked element, we have to do some traversing, or add an event listener
                    // for each item -_-
                    var target = e.currentTarget || e.target || e.srcElement;
                    var listItem = getClosestParent(target, "li");
                    // FIXME: tests still pass when this element is commented out -_-
                    if (listItem) {
                        that._highlightListItem(listItem);
                    }
                };
                // listen for country selection
                this._eventListeners.onDesktopCountryItemClicked = function(e) {
                    // since IE8 doesn't bind `this` to the clicked element, we have to do some traversing, or add an event listener
                    // for each item -_-
                    var target = e.currentTarget || e.target || e.srcElement;
                    var listItem = getClosestParent(target, "li");
                    if (listItem) {
                        that._selectListItem(listItem);
                    }
                };
            }
            forEach(this.countryListItems, function(element) {
                addEventListener(element, "click", that._eventListeners.onDesktopCountryItemClicked);
                addEventListener(element, "mouseover", that._eventListeners.onListItemMouseover);
            });
            // click off to close
            // (except when this initial opening click is bubbling up)
            // we cannot just stopPropagation as it may be needed to close another instance
            var isOpening = true;
            this._eventListeners.onHtmlClicked = createHandler(document, function(e) {
                if (!isOpening) {
                    that._closeDropdown();
                }
                isOpening = false;
            });
            addEventListener(document, "click", this._eventListeners.onHtmlClicked);
            // listen for up/down scrolling, enter to select, or letters to jump to country name.
            // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
            // just hit down and hold it to scroll down (no keyup event).
            // listen on the document because that's where key events are triggered if no input has focus
            // FIXME: maybe it's better to only preventDefault() if we know how to handle the key
            var query = "", queryTimer = null;
            this._eventListeners.onDocumentKeydown = createHandler(document, function(e) {
                // prevent down key from scrolling the whole page,
                // and enter key from submitting a form etc
                preventDefault(e);
                var which = whichKey(e);
                if (which == keys.UP || which == keys.DOWN) {
                    // up and down to navigate
                    that._handleUpDownKey(which);
                } else if (which == keys.ENTER) {
                    // enter to select
                    that._handleEnterKey();
                } else if (which == keys.ESC) {
                    // esc to close
                    that._closeDropdown();
                } else if (which >= keys.A && which <= keys.Z || which == keys.SPACE) {
                    // upper case letters (note: keyup/keydown only return upper case letters)
                    // jump to countries that start with the query string
                    if (queryTimer) {
                        clearTimeout(queryTimer);
                    }
                    query += String.fromCharCode(which);
                    that._searchForCountry(query);
                    // if the timer hits 1 second, reset the query
                    queryTimer = setTimeout(function() {
                        query = "";
                    }, 1e3);
                }
            });
            addEventListener(document, "keydown", this._eventListeners.onDocumentKeydown);
        },
        // highlight the next/prev item in the list (and ensure it is visible)
        _handleUpDownKey: function(key) {
            var current = this.countryList.querySelector(".highlight");
            var next = key == keys.UP ? current.previousSibling : current.nextSibling;
            if (next) {
                // skip the divider
                if (hasClass(next, "divider")) {
                    next = key == keys.UP ? next.previousSibling : next.nextSibling;
                }
                this._highlightListItem(next);
                this._scrollTo(next);
            }
        },
        // select the currently highlighted item
        _handleEnterKey: function() {
            var currentCountry = this.countryList.querySelector(".highlight");
            if (currentCountry) {
                this._selectListItem(currentCountry);
            }
        },
        // find the first list item whose name starts with the query string
        // NOTE: consider adding `data-country-name` atrribute and using [data-country-name^=<query>] css selector
        _searchForCountry: function(query) {
            for (var i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this.countries[i].name, query)) {
                    var listItem = methods.getListItemByCode(this.countryList, this.countries[i].iso2);
                    // update highlighting and scroll
                    if (listItem) {
                        this._highlightListItem(listItem);
                        this._scrollTo(listItem, true);
                    }
                    break;
                }
            }
        },
        // check if (uppercase) string a starts with string b
        _startsWith: function(a, b) {
            return a.substr(0, b.length).toUpperCase() == b;
        },
        // update the input's value to the given val
        // if autoFormat=true, format it first according to the country-specific formatting rules
        // Note: preventConversion will be false (i.e. we allow conversion) on init and when dev calls public method setNumber
        _updateVal: function(val, format, addSuffix, preventConversion, isAllowedKey) {
            var formatted;
            if (this.options.autoFormat && window.intlTelInputUtils && this.selectedCountryData) {
                if (typeof format == "number" && intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2)) {
                    // if user specified a format, and it's a valid number, then format it accordingly
                    formatted = intlTelInputUtils.formatNumberByType(val, this.selectedCountryData.iso2, format);
                } else if (!preventConversion && this.options.nationalMode && val.charAt(0) == "+" && intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2)) {
                    // if nationalMode and we have a valid intl number, convert it to ntl
                    formatted = intlTelInputUtils.formatNumberByType(val, this.selectedCountryData.iso2, intlTelInputUtils.numberFormat.NATIONAL);
                } else {
                    // else do the regular AsYouType formatting
                    formatted = intlTelInputUtils.formatNumber(val, this.selectedCountryData.iso2, addSuffix, this.options.allowExtensions, isAllowedKey);
                }
                // ensure we dont go over maxlength. we must do this here to truncate any formatting suffix, and also handle paste events
                var max = this.element.getAttribute("maxlength");
                if (max && formatted.length > max) {
                    formatted = formatted.substr(0, max);
                }
            } else {
                // no autoFormat, so just insert the original value
                formatted = val;
            }
            this.element.value = formatted;
        },
        // check if need to select a new flag based on the given number
        _updateFlagFromNumber: function(number, updateDefault) {
            // if we're in nationalMode and we're on US/Canada, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
            // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit
            if (number && this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
                if (number.charAt(0) != "1") {
                    number = "1" + number;
                }
                number = "+" + number;
            }
            // try and extract valid dial code from input
            var dialCode = this._getDialCode(number), countryCode = null;
            if (dialCode) {
                // check if one of the matching countries is already selected
                var countryCodes = this.countryCodes[this._getNumeric(dialCode)], alreadySelected = this.selectedCountryData && inArray(this.selectedCountryData.iso2, countryCodes) != -1;
                // if a matching country is not already selected (or this is an unknown NANP area code): choose the first in the list
                if (!alreadySelected || this._isUnknownNanp(number, dialCode)) {
                    // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first non-empty index
                    for (var j = 0; j < countryCodes.length; j++) {
                        if (countryCodes[j]) {
                            countryCode = countryCodes[j];
                            break;
                        }
                    }
                }
            } else if (number.charAt(0) == "+" && this._getNumeric(number).length) {
                // invalid dial code, so empty
                // Note: use getNumeric here because the number has not been formatted yet, so could contain bad shit
                countryCode = "";
            } else if (!number || number == "+") {
                // empty, or just a plus, so default
                countryCode = this.options.defaultCountry.iso2;
            }
            if (countryCode !== null) {
                this._selectFlag(countryCode, updateDefault);
            }
        },
        // check if the given number contains an unknown area code from the North American Numbering Plan i.e. the only dialCode that could be extracted was +1 but the actual number's length is >=4
        _isUnknownNanp: function(number, dialCode) {
            return dialCode == "+1" && this._getNumeric(number).length >= 4;
        },
        // remove highlighting from other list items and highlight the given item
        _highlightListItem: function(listItem) {
            forEach(this.countryList.querySelectorAll(".highlight"), function(element) {
                removeClass(element, "highlight");
            });
            addClass(listItem, "highlight");
        },
        // find the country data for the given country code
        // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
        _getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) {
            var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
            for (var i = 0; i < countryList.length; i++) {
                if (countryList[i].iso2 == countryCode) {
                    return countryList[i];
                }
            }
            if (allowFail) {
                return null;
            } else {
                throw new Error("No country data for '" + countryCode + "'");
            }
        },
        // select the given flag, update the placeholder and the active list item
        _selectFlag: function(countryCode, updateDefault) {
            // do this first as it will throw an error and stop if countryCode is invalid
            this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
            // update the "defaultCountry" - we only need the iso2 from now on, so just store that
            if (updateDefault && this.selectedCountryData.iso2) {
                // can't just make this equal to selectedCountryData as would be a ref to that object
                this.options.defaultCountry = {
                    iso2: this.selectedCountryData.iso2
                };
            }
            this.selectedFlagInner.className = "iti-flag " + countryCode;
            // update the selected country's title attribute
            var title = countryCode ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
            this.selectedFlag.setAttribute("title", title);
            // and the input's placeholder
            this._updatePlaceholder();
            if (this.isMobile) {
                // FIXME: tests still pass when this line is commented out
                this.countryList.value = countryCode;
            } else {
                // update the active list item
                forEach(this.countryList.querySelectorAll(".active"), function(element) {
                    removeClass(element, "active");
                });
                if (countryCode) {
                    addClass(this.countryList.querySelector("[data-country-code=" + countryCode + "]"), "active");
                }
            }
        },
        // update the input placeholder to an example number from the currently selected country
        _updatePlaceholder: function() {
            if (window.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder && this.selectedCountryData) {
                var iso2 = this.selectedCountryData.iso2, numberType = intlTelInputUtils.numberType[this.options.numberType || "FIXED_LINE"], placeholder = iso2 ? intlTelInputUtils.getExampleNumber(iso2, this.options.nationalMode, numberType) : "";
                if (typeof this.options.customPlaceholder === "function") {
                    placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                }
                this.element.setAttribute("placeholder", placeholder);
            }
        },
        // called when the user selects a list item from the dropdown
        _selectListItem: function(listItem) {
            var countryCodeAttr = this.isMobile ? "value" : "data-country-code";
            // update selected flag and active list item
            this._selectFlag(listItem.getAttribute(countryCodeAttr), true);
            if (!this.isMobile) {
                this._closeDropdown();
            }
            this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
            // always fire the change event as even if nationalMode=true (and we haven't updated the input val), the system as a whole has still changed - see country-sync example. think of it as making a selection from a select element.
            dispatchEvent(this.element, "change", true, false);
            // focus the input
            this.element.focus();
            // fix for FF and IE11 (with nationalMode=false i.e. auto inserting dial code), who try to put the cursor at the beginning the first time
            if (this.isGoodBrowser) {
                var len = this.element.value.length;
                this.element.setSelectionRange(len, len);
            }
        },
        // close the dropdown and unbind any listeners
        _closeDropdown: function() {
            addClass(this.countryList, "hide");
            // update the arrow
            // FIXED: arrow is a child of selectedFlag not selectedFlagInner
            // FIXME: tests still pass when this line is commented out -_-
            removeClass(this.arrow, "up");
            // unbind key events
            removeEventListener(document, "keydown", this._eventListeners.onDocumentKeydown);
            // unbind click-off-to-close
            removeEventListener(document, "click", this._eventListeners.onHtmlClicked);
            // unbind hover and click listeners
            var onDesktopCountryItemClicked = this._eventListeners.onDesktopCountryItemClicked;
            var onListItemMouseover = this._eventListeners.onListItemMouseover;
            forEach(this.countryListItems, function(element) {
                removeEventListener(element, "mouseover", onListItemMouseover);
                removeEventListener(element, "click", onDesktopCountryItemClicked);
            });
        },
        // check if an element is visible within it's container, else scroll until it is
        _scrollTo: function(element, middle) {
            var container = this.countryList, containerHeight = container.clientHeight, containerTop = getOffset(container).top, containerBottom = containerTop + containerHeight, elementHeight = element.offsetHeight, elementTop = getOffset(element).top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop, middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
                // scroll up
                if (middle) {
                    newScrollTop -= middleOffset;
                }
                container.scrollTop = newScrollTop;
            } else if (elementBottom > containerBottom) {
                // scroll down
                if (middle) {
                    newScrollTop += middleOffset;
                }
                var heightDifference = containerHeight - elementHeight;
                container.scrollTop = newScrollTop - heightDifference;
            }
        },
        // replace any existing dial code with the new one (if not in nationalMode)
        // also we need to know if we're focusing for a couple of reasons e.g. if so, we want to add any formatting suffix, also if the input is empty and we're not in nationalMode, then we want to insert the dial code
        _updateDialCode: function(newDialCode, focusing) {
            var inputVal = this.element.value, newNumber;
            // save having to pass this every time
            newDialCode = "+" + newDialCode;
            if (this.options.nationalMode && inputVal.charAt(0) != "+") {
                // if nationalMode, we just want to re-format
                newNumber = inputVal;
            } else if (inputVal) {
                // if the previous number contained a valid dial code, replace it
                // (if more than just a plus character)
                var prevDialCode = this._getDialCode(inputVal);
                if (prevDialCode.length > 1) {
                    newNumber = inputVal.replace(prevDialCode, newDialCode);
                } else {
                    // if the previous number didn't contain a dial code, we should persist it
                    var existingNumber = inputVal.charAt(0) != "+" ? trim(inputVal) : "";
                    newNumber = newDialCode + existingNumber;
                }
            } else {
                newNumber = !this.options.autoHideDialCode || focusing ? newDialCode : "";
            }
            this._updateVal(newNumber, null, focusing);
        },
        // try and extract a valid international dial code from a full telephone number
        // Note: returns the raw string inc plus character and any whitespace/dots etc
        _getDialCode: function(number) {
            var dialCode = "";
            // only interested in international numbers (starting with a plus)
            if (number.charAt(0) == "+") {
                var numericChars = "";
                // iterate over chars
                for (var i = 0; i < number.length; i++) {
                    var c = number.charAt(i);
                    // if char is number
                    if (isNumeric(c)) {
                        numericChars += c;
                        // if current numericChars make a valid dial code
                        if (this.countryCodes[numericChars]) {
                            // store the actual raw string (useful for matching later)
                            dialCode = number.substr(0, i + 1);
                        }
                        // longest dial code is 4 chars
                        if (numericChars.length == 4) {
                            break;
                        }
                    }
                }
            }
            return dialCode;
        },
        /********************
   *  PUBLIC METHODS
   ********************/
        // this is called when the geoip call returns
        autoCountryLoaded: function() {
            if (this.options.defaultCountry == "auto") {
                this.options.defaultCountry = IntlTelInput.autoCountry;
                this._setInitialState();
                if ($) {
                    this.autoCountryDeferred.resolve();
                }
            }
        },
        // remove plugin
        destroy: function() {
            allInstances[this.id] = null;
            if (!this.isMobile) {
                // make sure the dropdown is closed (and unbind listeners)
                this._closeDropdown();
            }
            removeEventListener(this.element, "paste", this._eventListeners.onElementCutOrPaste);
            removeEventListener(this.element, "cut", this._eventListeners.onElementCutOrPaste);
            removeEventListener(this.element, "keyup", this._eventListeners.onElementKeyup);
            // key events, and focus/blur events if autoHideDialCode=true
            if (this.options.autoHideDialCode || this.options.autoFormat) {
                var element = this.element;
                removeEventListener(element, "focus", this._eventListeners.onElementFocused);
                removeEventListener(element, "blur", this._eventListeners.onElementBlurred);
                forEach(this._eventListeners.plusPressedListeners, function(listener) {
                    removeEventListener(element, "keypress", listener);
                });
                this._eventListeners.plusPressedListeners = [];
            }
            if (this.options.autoHideDialCode) {
                removeEventListener(this.element, "mousedown", this._eventListeners.onElementMousedown);
            }
            if (this.options.autoFormat) {
                removeEventListener(this.element, "keypress", this._eventListeners.onElementKeypress);
            }
            if (this.isMobile) {
                // change event on select country
                removeEventListener(this.countryList, "change", this._eventListeners.onMobileCountryListChange);
            } else {
                // label click hack
                var label = getClosestParent(this.element, "label");
                // click event to open dropdown
                removeEventListener(this.flagsContainer, "keydown", this._eventListeners.onFlagKeydown);
                removeEventListener(this.selectedFlag, "click", this.onSelectedFlagClicked);
                if (label) {
                    removeEventListener(label, "click", this._eventListeners.onLabelClicked);
                }
            }
            // remove markup
            var container = this.element.parentNode;
            if (container.parentNode) {
                container.parentNode.insertBefore(this.element, container);
                container.parentNode.removeChild(container);
            } else {
                // Surprisingly, jQuery does something similar, but more complicated
                var fakeWrapper = document.createElement("div");
                fakeWrapper.appendChild(this.element);
            }
        },
        // extract the phone number extension if present
        getExtension: function() {
            return this.element.value.split(" ext. ")[1] || "";
        },
        // format the number to the given type
        getNumber: function(type) {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.formatNumberByType(this.element.value, this.selectedCountryData.iso2, type);
            }
            return "";
        },
        // get the type of the entered number e.g. landline/mobile
        getNumberType: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getNumberType(this.element.value, this.selectedCountryData.iso2);
            }
            return -99;
        },
        // get the country data for the currently selected flag
        getSelectedCountryData: function() {
            // if this is undefined, the plugin will return it's instance instead, so in that case an empty object makes more sense
            return this.selectedCountryData || {};
        },
        // get the validation error
        getValidationError: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getValidationError(this.element.value, this.selectedCountryData.iso2);
            }
            return -99;
        },
        // validate the input val - assumes the global function isValidNumber (from utilsScript)
        isValidNumber: function() {
            var val = trim(this.element.value), countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.isValidNumber(val, countryCode);
            }
            return false;
        },
        // load the utils script
        loadUtils: function(path) {
            var that = this;
            var utilsScript = path || this.options.utilsScript;
            if (!IntlTelInput.loadedUtilsScript && utilsScript) {
                // don't do this twice! (dont just check if the global intlTelInputUtils exists as if init plugin multiple times in quick succession, it may not have finished loading yet)
                IntlTelInput.loadedUtilsScript = true;
                var req = new XMLHttpRequest();
                if ($) {
                    req.onreadystatechange = function() {
                        // DONE state
                        if (req.readyState == 4) {
                            that.utilsScriptDeferred.resolve();
                        }
                    };
                }
                req.onload = function() {
                    if (req.status >= 200 && req.status < 400) {
                        var script = document.createElement("script");
                        script.innerHTML = req.responseText;
                        document.body.appendChild(script);
                        // tell all instances the utils are ready
                        forEach(allInstances, function(instance) {
                            if (instance) {
                                instance.utilsLoaded();
                            }
                        });
                    }
                };
                req.open("GET", utilsScript, true);
                req.setRequestHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01");
                req.send();
            } else if ($) {
                this.utilsScriptDeferred.resolve();
            }
        },
        // update the selected flag, and update the input val accordingly
        selectCountry: function(countryCode) {
            countryCode = countryCode.toLowerCase();
            // check if already selected
            if (!hasClass(this.selectedFlagInner, countryCode)) {
                this._selectFlag(countryCode, true);
                this._updateDialCode(this.selectedCountryData.dialCode, false);
            }
        },
        // set the input value and update the flag
        setNumber: function(number, format, addSuffix, preventConversion, isAllowedKey) {
            // ensure starts with plus
            if (!this.options.nationalMode && number.charAt(0) != "+") {
                number = "+" + number;
            }
            // we must update the flag first, which updates this.selectedCountryData, which is used later for formatting the number before displaying it
            this._updateFlagFromNumber(number);
            this._updateVal(number, format, addSuffix, preventConversion, isAllowedKey);
        },
        // this is called when the utils are ready
        utilsLoaded: function() {
            // if autoFormat is enabled and there's an initial value in the input, then format it
            if (this.options.autoFormat && this.element.value) {
                this._updateVal(this.element.value);
            }
            this._updatePlaceholder();
        }
    };
    if ($) {
        // adapted to allow public functions
        // using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
        $.fn[pluginName] = function(options) {
            var args = arguments;
            // Is the first parameter an object (options), or was omitted,
            // instantiate a new instance of the plugin.
            if (options === undefined || typeof options === "object") {
                var deferreds = [];
                this.each(function() {
                    if (!$.data(this, "plugin_" + pluginName)) {
                        var instance = new Plugin(this, options);
                        var instanceDeferreds = instance._init();
                        // we now have 2 deffereds: 1 for auto country, 1 for utils script
                        deferreds.push(instanceDeferreds[0]);
                        deferreds.push(instanceDeferreds[1]);
                        $.data(this, "plugin_" + pluginName, instance);
                    }
                });
                // return the promise from the "master" deferred object that tracks all the others
                return $.when.apply(null, deferreds);
            } else if (typeof options === "string" && options[0] !== "_") {
                // If the first parameter is a string and it doesn't start
                // with an underscore or "contains" the `init`-function,
                // treat this as a call to a public method.
                // Cache the method call to make it possible to return a value
                var returns;
                this.each(function() {
                    var instance = $.data(this, "plugin_" + pluginName);
                    // Tests that there's already a plugin-instance
                    // and checks that the requested public method exists
                    if (instance instanceof Plugin && typeof instance[options] === "function") {
                        // Call the method of our plugin instance,
                        // and pass it the supplied arguments.
                        returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                    // Allow instances to be destroyed via the 'destroy' method
                    if (options === "destroy") {
                        $.data(this, "plugin_" + pluginName, null);
                    }
                });
                // If the earlier cached method gives a value back return the value,
                // otherwise return this to preserve chainability.
                return returns !== undefined ? returns : this;
            }
        };
        /********************
   *  STATIC METHODS
   ********************/
        // get the country data object
        $.fn[pluginName].getCountryData = IntlTelInput.getCountryData;
        $.fn[pluginName].version = IntlTelInput.version;
    }
    // Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
    // jshint -W100
    // Array of country objects for the flag dropdown.
    // Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
    // Originally from https://github.com/mledoze/countries
    // then with a couple of manual re-arrangements to be alphabetical
    // then changed Kazakhstan from +76 to +7
    // and Vatican City from +379 to +39 (see issue 50)
    // and Caribean Netherlands from +5997 to +599
    // and Curacao from +5999 to +599
    // Removed: Åland Islands, Christmas Island, Cocos Islands, Guernsey, Isle of Man, Jersey, Kosovo, Mayotte, Pitcairn Islands, South Georgia, Svalbard, Western Sahara
    // UPDATE Sept 12th 2015
    // List of regions that have iso2 country codes, which I have chosen to omit:
    // (based on this information: https://en.wikipedia.org/wiki/List_of_country_calling_codes)
    // AQ - Antarctica - all different country codes depending on which "base"
    // AX - Åland Islands - region of Finland (same calling code)
    // BV - Bouvet Island - no calling code
    // CC - Cocos (Keeling) Islands - territory of Australia (same calling code)
    // CX - Christmas Island - territory of Australia (same calling code)
    // GS - South Georgia and the South Sandwich Islands - "inhospitable collection of islands" - same flag and calling code as Falkland Islands
    // HM - Heard Island and McDonald Islands - no calling code
    // PN - Pitcairn - tiny population (56), same calling code as New Zealand
    // SJ - Svalbard and Jan Mayen - territories of Norway (same calling code)
    // TF - French Southern Territories - no calling code
    // UM - United States Minor Outlying Islands - no calling code
    // Update: converted objects to arrays to save bytes!
    // Update: added "priority" for countries with the same dialCode as others
    // Update: added array of area codes for countries with the same dialCode as others
    // So each country array has the following information:
    // [
    //    Country name,
    //    iso2 code,
    //    International dial code,
    //    Order (if >1 country with same dial code),
    //    Area codes (if >1 country with same dial code)
    // ]
    var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1684" ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1264" ], [ "Antigua and Barbuda", "ag", "1268" ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61" ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1242" ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1246" ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1441" ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1284" ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1 ], [ "Cayman Islands", "ky", "1345" ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1767" ], [ "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358" ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1473" ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1671" ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1 ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2 ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1876" ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44", 3 ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7", 1 ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "Macedonia (FYROM) (Македонија)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1 ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1664" ], [ "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1670" ], [ "Norway (Norge)", "no", "47" ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262", 0 ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy (Saint-Barthélemy)", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1869" ], [ "Saint Lucia", "lc", "1758" ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1784" ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1721" ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Swaziland", "sz", "268" ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1868" ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1649" ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1340" ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "39", 1 ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1 ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ] ];
    // loop over all of the countries above
    for (var i = 0; i < allCountries.length; i++) {
        var c = allCountries[i];
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            dialCode: c[2],
            priority: c[3] || 0,
            areaCodes: c[4] || null
        };
    }
    return IntlTelInput;
});