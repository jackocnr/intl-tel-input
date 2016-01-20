/*
International Telephone Input v7.1.1
https://github.com/Bluefieldscom/intl-tel-input.git
*/
// wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], function($) {
            factory($, window, document);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }
})(function($, window, document, undefined) {
    "use strict";
    // these vars persist through all instances of the plugin
    var pluginName = "intlTelInput", id = 1, // give each instance it's own id for namespaced event handling
    defaults = {
        // typing digits after a valid number will be added to the extension part of the number
        allowExtensions: false,
        // automatically format the number according to the selected country
        autoFormat: false,
        // if there is just a dial code in the input: remove it on blur, and re-add it on focus
        autoHideDialCode: true,
        // add or remove input placeholder with an example number for the selected country
        autoPlaceholder: true,
        // append menu to a specific element
        dropdownContainer: false,
        // don't display these countries
        excludeCountries: [],
        // geoIp lookup function
        geoIpLookup: null,
        // initial country
        initialCountry: "",
        // show Flag
        selectedShowFlag: true,
        //show flags in dropdown
        showFlags: true,
        //internationaliztion
        locale: "en",
        //custom translations layer
        translations: {},
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
    }, windowLoaded = false;
    // keep track of if the window.load event has fired as impossible to check after the fact
    $(window).load(function() {
        windowLoaded = true;
    });
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        // event namespace
        this.ns = "." + pluginName + id++;
        // Chrome, FF, Safari, IE9+
        this.isGoodBrowser = Boolean(element.setSelectionRange);
        this.hadInitialPlaceholder = Boolean($(element).attr("placeholder"));
        this._name = pluginName;
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
            this.autoCountryDeferred = new $.Deferred();
            this.utilsScriptDeferred = new $.Deferred();
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
            // return the deferreds
            return [ this.autoCountryDeferred, this.utilsScriptDeferred ];
        },
        /********************
   *  PRIVATE METHODS
   ********************/
        // prepare all of the country data, including onlyCountries, excludeCountries and preferredCountries options
        _processCountryData: function() {
            // process this instance's countries
            this._processAllCountries();
            // process the countryCodes map
            this._processCountryCodes();
            // process the preferredCountries
            this._processPreferredCountries();
        },
        // add a country code to this.countryCodes
        _addCountryCode: function(iso2, dialCode, priority) {
            if (!(dialCode in this.countryCodes)) {
                this.countryCodes[dialCode] = [];
            }
            var index = priority || 0;
            this.countryCodes[dialCode][index] = iso2;
        },
        // filter the given countries using the process function
        _filterCountries: function(countryArray, processFunc) {
            var i;
            // standardise case
            for (i = 0; i < countryArray.length; i++) {
                countryArray[i] = countryArray[i].toLowerCase();
            }
            // build instance country array
            this.countries = [];
            for (i = 0; i < allCountries.length; i++) {
                if (processFunc($.inArray(allCountries[i].iso2, countryArray))) {
                    this.countries.push(allCountries[i]);
                }
            }
        },
        // process onlyCountries or excludeCountries array if present
        _processAllCountries: function() {
            // process onlyCountries option
            if (this.options.onlyCountries.length) {
                this._filterCountries(this.options.onlyCountries, function(inArray) {
                    // if country is in array
                    return inArray != -1;
                });
            } else if (this.options.excludeCountries.length) {
                this._filterCountries(this.options.excludeCountries, function(inArray) {
                    // if country is not in array
                    return inArray == -1;
                });
            } else {
                this.countries = allCountries;
            }
        },
        // process the countryCodes map
        _processCountryCodes: function() {
            this.countryCodes = {};
            for (var i = 0; i < this.countries.length; i++) {
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
        // process preferred countries - iterate through the preferences, fetching the country data for each one
        _processPreferredCountries: function() {
            this.preferredCountries = [];
            for (var i = 0; i < this.options.preferredCountries.length; i++) {
                var countryCode = this.options.preferredCountries[i].toLowerCase(), countryData = this._getCountryData(countryCode, false, true);
                if (countryData) {
                    this.preferredCountries.push(countryData);
                }
            }
        },
        // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
        _generateMarkup: function() {
            // telephone input
            this.telInput = $(this.element);
            // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can easily put the plugin in an inconsistent state e.g. the wrong flag selected for the autocompleted number, which on submit could mean the wrong number is saved (esp in nationalMode)
            this.telInput.attr("autocomplete", "off");
            // containers (mostly for positioning)
            this.telInput.wrap($("<div>", {
                "class": "intl-tel-input"
            }));
            this.flagsContainer = $("<div>", {
                "class": "flag-container"
            }).insertBefore(this.telInput);
            // currently selected flag (displayed to left of input)
            var selectedFlag = $("<div>", {
                // make element focusable and tab naviagable
                tabindex: "0",
                "class": "selected-flag" + (this.options.selectedShowFlag ? "" : " selected-code")
            }).appendTo(this.flagsContainer);
            this.selectedFlagInner = $("<div>", {
                "class": this.options.selectedShowFlag ? "iti-flag" : "iti-code"
            }).appendTo(selectedFlag);
            // CSS triangle
            $("<div>", {
                "class": "iti-arrow"
            }).appendTo(selectedFlag);
            // country list
            // mobile is just a native select element
            // desktop is a proper list containing: preferred countries, then divider, then all countries
            if (this.isMobile) {
                this.countryList = $("<select>", {
                    "class": "iti-mobile-select"
                }).appendTo(this.flagsContainer);
            } else {
                this.countryList = $("<ul>", {
                    "class": "country-list hide"
                });
                if (this.preferredCountries.length && !this.isMobile) {
                    this._appendListItems(this.preferredCountries, "preferred");
                    $("<li>", {
                        "class": "divider"
                    }).appendTo(this.countryList);
                }
            }
            this._appendListItems(this.countries, "");
            if (!this.isMobile) {
                // this is useful in lots of places
                this.countryListItems = this.countryList.children(".country");
                // create dropdownContainer markup
                if (this.options.dropdownContainer) {
                    this.dropdown = $("<div>", {
                        "class": "intl-tel-input iti-container"
                    }).append(this.countryList);
                } else {
                    this.countryList.appendTo(this.flagsContainer);
                }
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
                    tmp += this._getCountryName(c) + " +" + c.dialCode;
                    tmp += "</option>";
                } else {
                    // open the list item
                    tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
                    // add the flag
                    if (this.options.showFlags) tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>";
                    // and the country name and dial code
                    tmp += "<span class='country-name'>" + this._getCountryName(c) + "</span>";
                    tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
                    // close the list item
                    tmp += "</li>";
                }
            }
            this.countryList.append(tmp);
        },
        // set the initial state of the input value and the selected flag by either extracting a dial code from the given number, or using initialCountry
        _setInitialState: function() {
            var val = this.telInput.val();
            // if we already have a dial code we can go ahead and set the flag, else fall back to default
            if (this._getDialCode(val)) {
                this._updateFlagFromNumber(val);
            } else if (this.options.initialCountry !== "auto") {
                var codeLength;
                // see if we should select a flag
                if (this.options.initialCountry) {
                    codeLength = this._setFlag(this.options.initialCountry);
                } else {
                    // no dial code and no initialCountry, so default to first in list
                    this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                    if (!val) {
                        codeLength = this._setFlag(this.defaultCountry);
                    }
                }
                if (!this.options.selectedShowFlag) this.telInput.parent().attr("class", "intl-tel-input intl-code-" + codeLength);
                // if empty, insert the default dial code (this function will check !nationalMode and !autoHideDialCode)
                if (!val) {
                    var countryData = this._getCountryData(this.defaultCountry, false, false);
                    this._updateDialCode(countryData.dialCode, false);
                }
            }
            // NOTE: if initialCountry is set to auto, that will be handled separately
            // format
            if (val) {
                // this wont be run after _updateDialCode as that's only called if no val
                this._updateVal(val, null, false, false, false);
            }
        },
        // initialise the main event listeners: input keyup, and click selected flag
        _initListeners: function() {
            var that = this;
            this._initKeyListeners();
            // autoFormat prevents the change event from firing, so we need to check for changes between focus and blur in order to manually trigger it
            if (this.options.autoHideDialCode || this.options.autoFormat) {
                this._initFocusListeners();
            }
            if (this.isMobile) {
                this.countryList.on("change" + this.ns, function(e) {
                    that._selectListItem($(this).find("option:selected"));
                });
            } else {
                // hack for input nested inside label: clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again
                var label = this.telInput.closest("label");
                if (label.length) {
                    label.on("click" + this.ns, function(e) {
                        // if the dropdown is closed, then focus the input, else ignore the click
                        if (that.countryList.hasClass("hide")) {
                            that.telInput.focus();
                        } else {
                            e.preventDefault();
                        }
                    });
                }
                // toggle country dropdown on click
                var selectedFlag = this.selectedFlagInner.parent();
                selectedFlag.on("click" + this.ns, function(e) {
                    // only intercept this event if we're opening the dropdown
                    // else let it bubble up to the top ("click-off-to-close" listener)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled") && !that.telInput.prop("readonly")) {
                        that._showDropdown();
                    }
                });
            }
            // open dropdown list if currently focused
            this.flagsContainer.on("keydown" + that.ns, function(e) {
                var isDropdownHidden = that.countryList.hasClass("hide");
                if (isDropdownHidden && (e.which == keys.UP || e.which == keys.DOWN || e.which == keys.SPACE || e.which == keys.ENTER)) {
                    // prevent form from being submitted if "ENTER" was pressed
                    e.preventDefault();
                    // prevent event from being handled again by document
                    e.stopPropagation();
                    that._showDropdown();
                }
                // allow navigation from dropdown to input on TAB
                if (e.which == keys.TAB) {
                    that._closeDropdown();
                }
            });
        },
        // init many requests: utils script / geo ip lookup
        _initRequests: function() {
            var that = this;
            // if the user has specified the path to the utils script, fetch it on window.load, else resolve
            if (this.options.utilsScript) {
                // if the plugin is being initialised after the window.load event has already been fired
                if (windowLoaded) {
                    $.fn[pluginName].loadUtils(this.options.utilsScript, this.utilsScriptDeferred);
                } else {
                    // wait until the load event so we don't block any other requests e.g. the flags image
                    $(window).load(function() {
                        $.fn[pluginName].loadUtils(that.options.utilsScript, that.utilsScriptDeferred);
                    });
                }
            } else {
                this.utilsScriptDeferred.resolve();
            }
            if (this.options.initialCountry === "auto") {
                this._loadAutoCountry();
            } else {
                this.autoCountryDeferred.resolve();
            }
        },
        // perform the geo ip lookup
        _loadAutoCountry: function() {
            var that = this;
            // check for cookie
            var cookieAutoCountry = window.Cookies ? Cookies.get("itiAutoCountry") : "";
            if (cookieAutoCountry) {
                $.fn[pluginName].autoCountry = cookieAutoCountry;
            }
            // 3 options:
            // 1) already loaded (we're done)
            // 2) not already started loading (start)
            // 3) already started loading (do nothing - just wait for loading callback to fire)
            if ($.fn[pluginName].autoCountry) {
                this.handleAutoCountry();
            } else if (!$.fn[pluginName].startedLoadingAutoCountry) {
                // don't do this twice!
                $.fn[pluginName].startedLoadingAutoCountry = true;
                if (typeof this.options.geoIpLookup === "function") {
                    this.options.geoIpLookup(function(countryCode) {
                        $.fn[pluginName].autoCountry = countryCode.toLowerCase();
                        if (window.Cookies) {
                            Cookies.set("itiAutoCountry", $.fn[pluginName].autoCountry, {
                                path: "/"
                            });
                        }
                        // tell all instances the auto country is ready
                        // TODO: this should just be the current instances
                        // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight away (e.g. if they have already done the geo ip lookup somewhere else). Using setTimeout means that the current thread of execution will finish before executing this, which allows the plugin to finish initialising.
                        setTimeout(function() {
                            $(".intl-tel-input input").intlTelInput("handleAutoCountry");
                        });
                    });
                }
            }
        },
        // initialize any key listeners
        _initKeyListeners: function() {
            var that = this;
            if (this.options.autoFormat) {
                // format number and update flag on keypress
                // use keypress event as we want to ignore all input except for a select few keys,
                // but we dont want to ignore the navigation keys like the arrows etc.
                // NOTE: no point in refactoring this to only bind these listeners on focus/blur because then you would need to have those 2 listeners running the whole time anyway...
                this.telInput.on("keypress" + this.ns, function(e) {
                    // 32 is space, and after that it's all chars (not meta/nav keys)
                    // this fix is needed for Firefox, which triggers keypress event for some meta/nav keys
                    // Update: also ignore if this is a metaKey e.g. FF and Safari trigger keypress on the v of Ctrl+v
                    // Update: also ignore if ctrlKey (FF on Windows/Ubuntu)
                    // Update: also check that we have utils before we do any autoFormat stuff
                    if (e.which >= keys.SPACE && !e.ctrlKey && !e.metaKey && window.intlTelInputUtils && !that.telInput.prop("readonly")) {
                        e.preventDefault();
                        // allowed keys are just numeric keys and plus
                        // we must allow plus for the case where the user does select-all and then hits plus to start typing a new number. we could refine this logic to first check that the selection contains a plus, but that wont work in old browsers, and I think it's overkill anyway
                        var isAllowedKey = e.which >= keys.ZERO && e.which <= keys.NINE || e.which == keys.PLUS, input = that.telInput[0], noSelection = that.isGoodBrowser && input.selectionStart == input.selectionEnd, max = that.telInput.attr("maxlength"), val = that.telInput.val(), // assumes that if max exists, it is >0
                        isBelowMax = max ? val.length < max : true;
                        // first: ensure we dont go over maxlength. we must do this here to prevent adding digits in the middle of the number
                        // still reformat even if not an allowed key as they could by typing a formatting char, but ignore if there's a selection as doesn't make sense to replace selection with illegal char and then immediately remove it
                        if (isBelowMax && (isAllowedKey || noSelection)) {
                            var newChar = isAllowedKey ? String.fromCharCode(e.which) : null;
                            that._handleInputKey(newChar, true, isAllowedKey);
                            // if something has changed, trigger the input event (which was otherwised squashed by the preventDefault)
                            if (val != that.telInput.val()) {
                                that.telInput.trigger("input");
                            }
                        }
                        if (!isAllowedKey) {
                            that._handleInvalidKey();
                        }
                    }
                });
            }
            // handle cut/paste event (now supported in all major browsers)
            this.telInput.on("cut" + this.ns + " paste" + this.ns, function() {
                // hack because "paste" event is fired before input is updated
                setTimeout(function() {
                    if (that.options.autoFormat && window.intlTelInputUtils) {
                        var cursorAtEnd = that.isGoodBrowser && that.telInput[0].selectionStart == that.telInput.val().length;
                        that._handleInputKey(null, cursorAtEnd, true);
                        that._ensurePlus();
                    } else {
                        // if no autoFormat, just update flag
                        that._updateFlagFromNumber(that.telInput.val());
                    }
                });
            });
            // handle keyup event
            // if autoFormat enabled: we use keyup to catch delete events (after the fact)
            // if no autoFormat, this is used to update the flag
            this.telInput.on("keyup" + this.ns, function(e) {
                // the "enter" key event from selecting a dropdown item is triggered here on the input, because the document.keydown handler that initially handles that event triggers a focus on the input, and so the keyup for that same key event gets triggered here. weird, but just make sure we dont bother doing any re-formatting in this case (we've already done preventDefault in the keydown handler, so it wont actually submit the form or anything).
                // ALSO: ignore keyup if readonly
                if (e.which == keys.ENTER || that.telInput.prop("readonly")) {} else if (that.options.autoFormat && window.intlTelInputUtils) {
                    // cursorAtEnd defaults to false for bad browsers else they would never get a reformat on delete
                    var cursorAtEnd = that.isGoodBrowser && that.telInput[0].selectionStart == that.telInput.val().length;
                    if (!that.telInput.val()) {
                        // if they just cleared the input, update the flag to the default
                        that._updateFlagFromNumber("");
                    } else if (e.which == keys.DEL && !cursorAtEnd || e.which == keys.BSPACE) {
                        // if delete in the middle: reformat with no suffix (no need to reformat if delete at end)
                        // if backspace: reformat with no suffix (need to reformat if at end to remove any lingering suffix - this is a feature)
                        // important to remember never to add suffix on any delete key as can fuck up in ie8 so you can never delete a formatting char at the end
                        that._handleInputKey(null, false, false);
                    }
                    that._ensurePlus();
                } else {
                    // if no autoFormat, just update flag
                    that._updateFlagFromNumber(that.telInput.val());
                }
            });
        },
        // prevent deleting the plus (if not in nationalMode)
        _ensurePlus: function() {
            if (!this.options.nationalMode) {
                var val = this.telInput.val(), input = this.telInput[0];
                if (val.charAt(0) != "+") {
                    // newCursorPos is current pos + 1 to account for the plus we are about to add
                    var newCursorPos = this.isGoodBrowser ? input.selectionStart + 1 : 0;
                    this.telInput.val("+" + val);
                    if (this.isGoodBrowser) {
                        input.setSelectionRange(newCursorPos, newCursorPos);
                    }
                }
            }
        },
        // alert the user to an invalid key event
        _handleInvalidKey: function() {
            var that = this;
            this.telInput.trigger("invalidkey").addClass("iti-invalid-key");
            setTimeout(function() {
                that.telInput.removeClass("iti-invalid-key");
            }, 100);
        },
        // when autoFormat is enabled: handle various key events on the input:
        // 1) adding a new number character, which will replace any selection, reformat, and preserve the cursor position
        // 2) reformatting on backspace/delete
        // 3) cut/paste event
        _handleInputKey: function(newNumericChar, addSuffix, isAllowedKey) {
            var val = this.telInput.val(), cleanBefore = this._getClean(val), originalLeftChars, // raw DOM element
            input = this.telInput[0], digitsOnRight = 0;
            if (this.isGoodBrowser) {
                // cursor strategy: maintain the number of digits on the right. we use the right instead of the left so that A) we dont have to account for the new digit (or multiple digits if paste event), and B) we're always on the right side of formatting suffixes
                digitsOnRight = this._getDigitsOnRight(val, input.selectionEnd);
                // if handling a new number character: insert it in the right place
                if (newNumericChar) {
                    // replace any selection they may have made with the new char
                    val = val.substr(0, input.selectionStart) + newNumericChar + val.substring(input.selectionEnd, val.length);
                } else {
                    // here we're not handling a new char, we're just doing a re-format (e.g. on delete/backspace/paste, after the fact), but we still need to maintain the cursor position. so make note of the char on the left, and then after the re-format, we'll count in the same number of digits from the right, and then keep going through any formatting chars until we hit the same left char that we had before.
                    // UPDATE: now have to store 2 chars as extensions formatting contains 2 spaces so you need to be able to distinguish
                    originalLeftChars = val.substr(input.selectionStart - 2, 2);
                }
            } else if (newNumericChar) {
                val += newNumericChar;
            }
            // update the number and flag
            this.setNumber(val, null, addSuffix, true, isAllowedKey);
            // update the cursor position
            if (this.isGoodBrowser) {
                var newCursor;
                val = this.telInput.val();
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
                input.setSelectionRange(newCursor, newCursor);
            }
        },
        // we start from the position in guessCursor, and work our way left until we hit the originalLeftChars or a number to make sure that after reformatting the cursor has the same char on the left in the case of a delete etc
        _getCursorFromLeftChar: function(val, guessCursor, originalLeftChars) {
            for (var i = guessCursor; i > 0; i--) {
                var leftChar = val.charAt(i - 1);
                // UPDATE: now have to store 2 chars as extensions formatting contains 2 spaces so you need to be able to distinguish
                if ($.isNumeric(leftChar) || val.substr(i - 2, 2) == originalLeftChars) {
                    return i;
                }
            }
            return 0;
        },
        // after a reformat we need to make sure there are still the same number of digits to the right of the cursor
        _getCursorFromDigitsOnRight: function(val, digitsOnRight) {
            for (var i = val.length - 1; i >= 0; i--) {
                if ($.isNumeric(val.charAt(i)) && --digitsOnRight === 0) {
                    return i;
                }
            }
            return 0;
        },
        // get the number of numeric digits to the right of the cursor so we can reposition the cursor correctly after the reformat has happened
        _getDigitsOnRight: function(val, selectionEnd) {
            var digitsOnRight = 0;
            for (var i = selectionEnd; i < val.length; i++) {
                if ($.isNumeric(val.charAt(i))) {
                    digitsOnRight++;
                }
            }
            return digitsOnRight;
        },
        // listen for focus and blur
        _initFocusListeners: function() {
            var that = this;
            if (this.options.autoHideDialCode) {
                // mousedown decides where the cursor goes, so if we're focusing we must preventDefault as we'll be inserting the dial code, and we want the cursor to be at the end no matter where they click
                this.telInput.on("mousedown" + this.ns, function(e) {
                    if (!that.telInput.is(":focus") && !that.telInput.val()) {
                        e.preventDefault();
                        // but this also cancels the focus, so we must trigger that manually
                        that.telInput.focus();
                    }
                });
            }
            this.telInput.on("focus" + this.ns, function(e) {
                var value = that.telInput.val();
                // save this to compare on blur
                that.telInput.data("focusVal", value);
                // on focus: if empty, insert the dial code for the currently selected flag
                if (that.options.autoHideDialCode && !value && !that.telInput.prop("readonly") && that.selectedCountryData.dialCode) {
                    that._updateVal("+" + that.selectedCountryData.dialCode, null, true, false, false);
                    // after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one
                    that.telInput.one("keypress.plus" + that.ns, function(e) {
                        if (e.which == keys.PLUS) {
                            // if autoFormat is enabled, this key event will have already have been handled by another keypress listener (hence we need to add the "+"). if disabled, it will be handled after this by a keyup listener (hence no need to add the "+").
                            var newVal = that.options.autoFormat && window.intlTelInputUtils ? "+" : "";
                            that.telInput.val(newVal);
                        }
                    });
                    // after tabbing in, make sure the cursor is at the end we must use setTimeout to get outside of the focus handler as it seems the selection happens after that
                    setTimeout(function() {
                        var input = that.telInput[0];
                        if (that.isGoodBrowser) {
                            var len = that.telInput.val().length;
                            input.setSelectionRange(len, len);
                        }
                    });
                }
            });
            this.telInput.on("blur" + this.ns, function() {
                if (that.options.autoHideDialCode) {
                    // on blur: if just a dial code then remove it
                    var value = that.telInput.val(), startsPlus = value.charAt(0) == "+";
                    if (startsPlus) {
                        var numeric = that._getNumeric(value);
                        // if just a plus, or if just a dial code
                        if (!numeric || that.selectedCountryData.dialCode == numeric) {
                            that.telInput.val("");
                        }
                    }
                    // remove the keypress listener we added on focus
                    that.telInput.off("keypress.plus" + that.ns);
                }
                // if autoFormat, we must manually trigger change event if value has changed
                if (that.options.autoFormat && window.intlTelInputUtils && that.telInput.val() != that.telInput.data("focusVal")) {
                    that.telInput.trigger("change");
                }
            });
        },
        // extract the numeric digits from the given string
        _getNumeric: function(s) {
            return s.replace(/\D/g, "");
        },
        // extract the clean number (numeric with optionally plus)
        _getClean: function(s) {
            var prefix = s.charAt(0) == "+" ? "+" : "";
            return prefix + this._getNumeric(s);
        },
        // show the dropdown
        _showDropdown: function() {
            this._setDropdownPosition();
            // update highlighting and scroll to active list item
            var activeListItem = this.countryList.children(".active");
            if (activeListItem.length) {
                this._highlightListItem(activeListItem);
                this._scrollTo(activeListItem);
            }
            // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
            this._bindDropdownListeners();
            // update the arrow
            this.selectedFlagInner.children(".iti-arrow").addClass("up");
        },
        // decide where to position dropdown (depends on position within viewport, and scroll)
        _setDropdownPosition: function() {
            var that = this, showDropdownContainer = this.options.dropdownContainer && !this.isMobile;
            if (showDropdownContainer) this.dropdown.appendTo(this.options.dropdownContainer);
            // show the menu and grab the dropdown height
            this.dropdownHeight = this.countryList.removeClass("hide").outerHeight();
            var pos = this.telInput.offset(), inputTop = pos.top, windowTop = $(window).scrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom)
            dropdownFitsBelow = inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
            // by default, the dropdown will be below the input. If we want to position it above the input, we add the dropup class.
            this.countryList.toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove);
            // if dropdownContainer is enabled, calculate postion
            if (showDropdownContainer) {
                // by default the dropdown will be directly over the input because it's not in the flow. If we want to position it below, we need to add some extra top value.
                var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.innerHeight();
                // calculate placement
                this.dropdown.css({
                    top: inputTop + extraTop,
                    left: pos.left
                });
                // close menu on window scroll
                $(window).on("scroll" + this.ns, function() {
                    that._closeDropdown();
                });
            }
        },
        // we only bind dropdown listeners when the dropdown is open
        _bindDropdownListeners: function() {
            var that = this;
            // when mouse over a list item, just highlight that one
            // we add the class "highlight", so if they hit "enter" we know which one to select
            this.countryList.on("mouseover" + this.ns, ".country", function(e) {
                that._highlightListItem($(this));
            });
            // listen for country selection
            this.countryList.on("click" + this.ns, ".country", function(e) {
                that._selectListItem($(this));
            });
            // click off to close
            // (except when this initial opening click is bubbling up)
            // we cannot just stopPropagation as it may be needed to close another instance
            var isOpening = true;
            $("html").on("click" + this.ns, function(e) {
                if (!isOpening) {
                    that._closeDropdown();
                }
                isOpening = false;
            });
            // listen for up/down scrolling, enter to select, or letters to jump to country name.
            // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
            // just hit down and hold it to scroll down (no keyup event).
            // listen on the document because that's where key events are triggered if no input has focus
            var query = "", queryTimer = null;
            $(document).on("keydown" + this.ns, function(e) {
                // prevent down key from scrolling the whole page,
                // and enter key from submitting a form etc
                e.preventDefault();
                if (e.which == keys.UP || e.which == keys.DOWN) {
                    // up and down to navigate
                    that._handleUpDownKey(e.which);
                } else if (e.which == keys.ENTER) {
                    // enter to select
                    that._handleEnterKey();
                } else if (e.which == keys.ESC) {
                    // esc to close
                    that._closeDropdown();
                } else if (e.which >= keys.A && e.which <= keys.Z || e.which == keys.SPACE) {
                    // upper case letters (note: keyup/keydown only return upper case letters)
                    // jump to countries that start with the query string
                    if (queryTimer) {
                        clearTimeout(queryTimer);
                    }
                    query += String.fromCharCode(e.which);
                    that._searchForCountry(query);
                    // if the timer hits 1 second, reset the query
                    queryTimer = setTimeout(function() {
                        query = "";
                    }, 1e3);
                }
            });
        },
        // highlight the next/prev item in the list (and ensure it is visible)
        _handleUpDownKey: function(key) {
            var current = this.countryList.children(".highlight").first();
            var next = key == keys.UP ? current.prev() : current.next();
            if (next.length) {
                // skip the divider
                if (next.hasClass("divider")) {
                    next = key == keys.UP ? next.prev() : next.next();
                }
                this._highlightListItem(next);
                this._scrollTo(next);
            }
        },
        // select the currently highlighted item
        _handleEnterKey: function() {
            var currentCountry = this.countryList.children(".highlight").first();
            if (currentCountry.length) {
                this._selectListItem(currentCountry);
            }
        },
        // find the first list item whose name starts with the query string
        _searchForCountry: function(query) {
            for (var i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this._getCountryName(this.countries[i]), query)) {
                    var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred");
                    // update highlighting and scroll
                    this._highlightListItem(listItem);
                    this._scrollTo(listItem, true);
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
                var max = this.telInput.attr("maxlength");
                if (max && formatted.length > max) {
                    formatted = formatted.substr(0, max);
                }
            } else {
                // no autoFormat, so just insert the original value
                formatted = val;
            }
            this.telInput.val(formatted);
        },
        // check if need to select a new flag based on the given number
        _updateFlagFromNumber: function(number) {
            // if we're in nationalMode and we already have US/Canada selected, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
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
                var countryCodes = this.countryCodes[this._getNumeric(dialCode)], alreadySelected = this.selectedCountryData && $.inArray(this.selectedCountryData.iso2, countryCodes) != -1;
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
                countryCode = this.defaultCountry;
            }
            if (countryCode !== null) {
                var codeLength = this._setFlag(countryCode);
                if (!this.options.selectedShowFlag) this.telInput.parent().attr("class", "intl-tel-input intl-code-" + codeLength);
            }
        },
        // check if the given number contains an unknown area code from the North American Numbering Plan i.e. the only dialCode that could be extracted was +1 (instead of say +1 702) and the actual number's length is >=4
        _isUnknownNanp: function(number, dialCode) {
            return dialCode == "+1" && this._getNumeric(number).length >= 4;
        },
        // remove highlighting from other list items and highlight the given item
        _highlightListItem: function(listItem) {
            this.countryListItems.removeClass("highlight");
            listItem.addClass("highlight");
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
        //get Countryname by CountryData
        _getCountryName: function(country) {
            if (this.options.locale && (country.translations[this.options.locale] || Object.prototype.toString.call(this.options.translations) === "[object Object]" && this.options.translations[country.iso2] && this.options.translations[country.iso2][this.options.locale])) return this.options.translations[country.iso2] && this.options.translations[country.iso2][this.options.locale] || country.translations[this.options.locale];
            return country.name;
        },
        // select the given flag, update the placeholder and the active list item
        _setFlag: function(countryCode) {
            // do this first as it will throw an error and stop if countryCode is invalid
            this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
            // update the defaultCountry - we only need the iso2 from now on, so just store that
            if (this.selectedCountryData.iso2) {
                // can't just make this equal to selectedCountryData as would be a ref to that object
                this.defaultCountry = this.selectedCountryData.iso2;
            }
            this.selectedFlagInner.attr("class", (this.options.selectedShowFlag ? "iti-flag " : "iti-code ") + countryCode);
            if (!this.options.selectedShowFlag) this.selectedFlagInner.text("+" + this.selectedCountryData.dialCode);
            // update the selected country's title attribute
            var title = countryCode ? this._getCountryName(this.selectedCountryData) + ": +" + this.selectedCountryData.dialCode : "Unknown";
            this.selectedFlagInner.parent().attr("title", title);
            // and the input's placeholder
            this._updatePlaceholder();
            if (this.isMobile) {
                this.countryList.val(countryCode);
            } else {
                // update the active list item
                this.countryListItems.removeClass("active");
                if (countryCode) {
                    this.countryListItems.filter('.country[data-country-code="' + countryCode + '"]').addClass("active");
                }
            }
            return ("+" + this.selectedCountryData.dialCode).length;
        },
        // update the input placeholder to an example number from the currently selected country
        _updatePlaceholder: function() {
            if (window.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder && this.selectedCountryData) {
                var iso2 = this.selectedCountryData.iso2, numberType = intlTelInputUtils.numberType[this.options.numberType || "FIXED_LINE"], placeholder = iso2 ? intlTelInputUtils.getExampleNumber(iso2, this.options.nationalMode, numberType) : "";
                if (typeof this.options.customPlaceholder === "function") {
                    placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                }
                this.telInput.attr("placeholder", placeholder);
            }
        },
        // called when the user selects a list item from the dropdown
        _selectListItem: function(listItem) {
            var countryCodeAttr = this.isMobile ? "value" : "data-country-code";
            // update selected flag and active list item
            var codeLength = this._setFlag(listItem.attr(countryCodeAttr));
            if (!this.isMobile) {
                this._closeDropdown();
            }
            this._updateDialCode(listItem.attr("data-dial-code"), true);
            // trigger a custom event as even in nationalMode the state has changed
            this.telInput.trigger("country-change");
            if (!this.options.selectedShowFlag) this.telInput.parent().attr("class", "intl-tel-input intl-code-" + codeLength);
            // focus the input
            this.telInput.focus();
            // fix for FF and IE11 (with nationalMode=false i.e. auto inserting dial code), who try to put the cursor at the beginning the first time
            if (this.isGoodBrowser) {
                var len = this.telInput.val().length;
                this.telInput[0].setSelectionRange(len, len);
            }
        },
        // close the dropdown and unbind any listeners
        _closeDropdown: function() {
            this.countryList.addClass("hide");
            // update the arrow
            this.selectedFlagInner.children(".iti-arrow").removeClass("up");
            // unbind key events
            $(document).off(this.ns);
            // unbind click-off-to-close
            $("html").off(this.ns);
            // unbind hover and click listeners
            this.countryList.off(this.ns);
            // remove menu from container
            if (this.options.dropdownContainer && !this.isMobile) {
                $(window).off("scroll" + this.ns);
                this.dropdown.detach();
            }
        },
        // check if an element is visible within it's container, else scroll until it is
        _scrollTo: function(element, middle) {
            var container = this.countryList, containerHeight = container.height(), containerTop = container.offset().top, containerBottom = containerTop + containerHeight, elementHeight = element.outerHeight(), elementTop = element.offset().top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop(), middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
                // scroll up
                if (middle) {
                    newScrollTop -= middleOffset;
                }
                container.scrollTop(newScrollTop);
            } else if (elementBottom > containerBottom) {
                // scroll down
                if (middle) {
                    newScrollTop += middleOffset;
                }
                var heightDifference = containerHeight - elementHeight;
                container.scrollTop(newScrollTop - heightDifference);
            }
        },
        // replace any existing dial code with the new one (if not in nationalMode)
        // also we need to know if we're focusing for a couple of reasons e.g. if so, we want to add any formatting suffix, also if the input is empty and we're not in nationalMode, then we want to insert the dial code
        _updateDialCode: function(newDialCode, focusing) {
            var inputVal = this.telInput.val(), newNumber;
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
                    var existingNumber = inputVal.charAt(0) != "+" ? $.trim(inputVal) : "";
                    newNumber = newDialCode + existingNumber;
                }
            } else {
                newNumber = !this.options.autoHideDialCode || focusing ? newDialCode : "";
            }
            this._updateVal(newNumber, null, focusing, false, false);
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
                    if ($.isNumeric(c)) {
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
        handleAutoCountry: function() {
            if (this.options.initialCountry === "auto") {
                // we must set this even if there is an initial val in the input: in case the initial val is invalid and they delete it - they should see their auto country
                this.defaultCountry = $.fn[pluginName].autoCountry;
                // if there's no initial value in the input, then update the flag
                if (!this.telInput.val()) {
                    this.setCountry(this.defaultCountry);
                }
                this.autoCountryDeferred.resolve();
            }
        },
        // remove plugin
        destroy: function() {
            if (!this.isMobile) {
                // make sure the dropdown is closed (and unbind listeners)
                this._closeDropdown();
            }
            // key events, and focus/blur events if autoHideDialCode=true
            this.telInput.off(this.ns);
            if (this.isMobile) {
                // change event on select country
                this.countryList.off(this.ns);
            } else {
                // click event to open dropdown
                this.selectedFlagInner.parent().off(this.ns);
                // label click hack
                this.telInput.closest("label").off(this.ns);
            }
            // remove markup
            var container = this.telInput.parent();
            container.before(this.telInput).remove();
        },
        // extract the phone number extension if present
        getExtension: function() {
            return this.telInput.val().split(" ext. ")[1] || "";
        },
        // format the number to the given type
        getNumber: function(type) {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.formatNumberByType(this.telInput.val(), this.selectedCountryData.iso2, type);
            }
            return "";
        },
        // get the type of the entered number e.g. landline/mobile
        getNumberType: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getNumberType(this.telInput.val(), this.selectedCountryData.iso2);
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
                return intlTelInputUtils.getValidationError(this.telInput.val(), this.selectedCountryData.iso2);
            }
            return -99;
        },
        // validate the input val - assumes the global function isValidNumber (from utilsScript)
        isValidNumber: function() {
            var val = $.trim(this.telInput.val()), countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.isValidNumber(val, countryCode);
            }
            return false;
        },
        // update the selected flag, and update the input val accordingly ()
        setCountry: function(countryCode) {
            countryCode = countryCode.toLowerCase();
            // check if already selected
            if (!this.selectedFlagInner.hasClass(countryCode)) {
                var codeLength = this._setFlag(countryCode);
                if (!this.options.selectedShowFlag) this.telInput.parent().attr("class", "intl-tel-input intl-code-" + codeLength);
                this._updateDialCode(this.selectedCountryData.dialCode, false);
            }
        },
        // set the input value and update the flag
        // NOTE: format arg is for public method: to allow devs to format how they want
        setNumber: function(number, format, addSuffix, preventConversion, isAllowedKey) {
            // ensure starts with plus
            if (!this.options.nationalMode && number.charAt(0) != "+") {
                number = "+" + number;
            }
            // we must update the flag first, which updates this.selectedCountryData, which is used later for formatting the number before displaying it
            this._updateFlagFromNumber(number);
            this._updateVal(number, format, addSuffix, preventConversion, isAllowedKey);
        },
        // this is called when the utils request completes
        handleUtils: function() {
            // if the request was successful
            if (window.intlTelInputUtils) {
                // if autoFormat is enabled and there's an initial value in the input, then format it
                if (this.options.autoFormat && this.telInput.val()) {
                    this._updateVal(this.telInput.val(), null, false, false, false);
                }
                this._updatePlaceholder();
            }
            this.utilsScriptDeferred.resolve();
        }
    };
    // using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
    // (adapted to allow public functions)
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
    $.fn[pluginName].getCountryData = function() {
        return allCountries;
    };
    // load the utils script
    $.fn[pluginName].loadUtils = function(path, utilsScriptDeferred) {
        if (!$.fn[pluginName].loadedUtilsScript) {
            // don't do this twice! (dont just check if window.intlTelInputUtils exists as if init plugin multiple times in quick succession, it may not have finished loading yet)
            $.fn[pluginName].loadedUtilsScript = true;
            // dont use $.getScript as it prevents caching
            $.ajax({
                url: path,
                complete: function() {
                    // tell all instances that the utils request is complete
                    $(".intl-tel-input input").intlTelInput("handleUtils");
                },
                dataType: "script",
                cache: true
            });
        } else if (utilsScriptDeferred) {
            utilsScriptDeferred.resolve();
        }
    };
    // version
    $.fn[pluginName].version = "7.1.1";
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
    // Removed:  Kosovo, Pitcairn Islands, South Georgia
    // UPDATE Sept 12th 2015
    // List of regions that have iso2 country codes, which I have chosen to omit:
    // (based on this information: https://en.wikipedia.org/wiki/List_of_country_calling_codes)
    // AQ - Antarctica - all different country codes depending on which "base"
    // BV - Bouvet Island - no calling code
    // GS - South Georgia and the South Sandwich Islands - "inhospitable collection of islands" - same flag and calling code as Falkland Islands
    // HM - Heard Island and McDonald Islands - no calling code
    // PN - Pitcairn - tiny population (56), same calling code as New Zealand
    // TF - French Southern Territories - no calling code
    // UM - United States Minor Outlying Islands - no calling code
    // UPDATE the criteria of supported countries or territories (see issue 297)
    // Have an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    // Have a country calling code: https://en.wikipedia.org/wiki/List_of_country_calling_codes
    // Have a flag
    // Must be supported by libphonenumber: https://github.com/googlei18n/libphonenumber
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
    var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93", {
        de: "Islamische Republik Afghanistan",
        fr: "République islamique d'Afghanistan",
        es: "República Islámica de Afganistán"
    } ], [ "Albania (Shqipëri)", "al", "355", {
        de: "Republik Albanien",
        fr: "République d'Albanie",
        es: "República de Albania"
    } ], [ "Algeria (‫الجزائر‬‎)", "dz", "213", {
        de: "Demokratische Volksrepublik Algerien",
        fr: "République démocratique et populaire d'Algérie",
        es: "República Argelina Democrática y Popular"
    } ], [ "American Samoa", "as", "1684", {
        de: "Amerikanisch-Samoa",
        fr: "Samoa américaines",
        es: "Samoa Americana"
    } ], [ "Andorra", "ad", "376", {
        de: "Fürstentum Andorra",
        fr: "Principauté d'Andorre",
        es: "Principado de Andorra"
    } ], [ "Angola", "ao", "244", {
        de: "Republik Angola",
        fr: "République d'Angola",
        es: "República de Angola"
    } ], [ "Anguilla", "ai", "1264", {
        de: "Anguilla",
        fr: "Anguilla",
        es: "Anguila"
    } ], [ "Antigua and Barbuda", "ag", "1268", {
        de: "Antigua und Barbuda",
        fr: "Antigua -et-Barbuda",
        es: "Antigua y Barbuda"
    } ], [ "Argentina", "ar", "54", {
        de: "Argentinische Republik",
        fr: "République argentine",
        es: "República Argentina"
    } ], [ "Armenia (Հայաստան)", "am", "374", {
        de: "Republik Armenien",
        fr: "République d'Arménie",
        es: "República de Armenia"
    } ], [ "Aruba", "aw", "297", {
        de: "Aruba",
        fr: "Aruba",
        es: "Aruba"
    } ], [ "Australia", "au", "61", {
        de: "Commonwealth Australien",
        fr: "Australie",
        es: "Mancomunidad de Australia"
    }, 0 ], [ "Austria (Österreich)", "at", "43", {
        de: "Republik Österreich",
        fr: "République d'Autriche",
        es: "República de Austria"
    } ], [ "Azerbaijan (Azərbaycan)", "az", "994", {
        de: "Republik Aserbaidschan",
        fr: "République d'Azerbaïdjan",
        es: "República de Azerbaiyán"
    } ], [ "Bahamas", "bs", "1242", {
        de: "Commonwealth der Bahamas",
        fr: "Commonwealth des Bahamas",
        es: "Commonwealth de las Bahamas"
    } ], [ "Bahrain (‏البحرين)", "bh", "973", {
        de: "Königreich Bahrain",
        fr: "Royaume de Bahreïn",
        es: "Reino de Bahrein"
    } ], [ "Bangladesh (বাংলাদেশ)", "bd", "880", {
        de: "Volksrepublik Bangladesch",
        fr: "La République populaire du Bangladesh",
        es: "República Popular de Bangladesh"
    } ], [ "Barbados", "bb", "1246", {
        de: "Barbados",
        fr: "Barbade",
        es: "Barbados"
    } ], [ "Belarus (Беларусь)", "by", "375", {
        de: "Republik Belarus",
        fr: "République de Biélorussie",
        es: "República de Belarús"
    } ], [ "Belgium (België)", "be", "32", {
        de: "Königreich Belgien",
        fr: "Royaume de Belgique",
        es: "Reino de Bélgica"
    } ], [ "Belize", "bz", "501", {
        de: "Belize",
        fr: "Belize",
        es: "Belice"
    } ], [ "Benin (Bénin)", "bj", "229", {
        de: "Republik Benin",
        fr: "République du Bénin",
        es: "República de Benin"
    } ], [ "Bermuda", "bm", "1441", {
        de: "Bermuda",
        fr: "Bermudes",
        es: "Bermuda"
    } ], [ "Bhutan (འབྲུག)", "bt", "975", {
        de: "Königreich Bhutan",
        fr: "Royaume du Bhoutan",
        es: "Reino de Bután"
    } ], [ "Bolivia", "bo", "591", {
        de: "Multinationaler Staat von Bolivien",
        fr: "État plurinational de Bolivie",
        es: "Estado Plurinacional de Bolivia"
    } ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387", {
        de: "Bosnien und Herzegowina",
        fr: "Bosnie-et-Herzégovine",
        es: "Bosnia y Herzegovina"
    } ], [ "Botswana", "bw", "267", {
        de: "Republik Botsuana",
        fr: "République du Botswana",
        es: "República de Botswana"
    } ], [ "Brazil (Brasil)", "br", "55", {
        de: "Föderative Republik Brasilien",
        fr: "République fédérative du Brésil",
        es: "República Federativa del Brasil"
    } ], [ "British Indian Ocean Territory", "io", "246", {
        de: "Britisch-Indischer Ozean",
        fr: "Territoire britannique de l' océan Indien",
        es: "Territorio Británico del Océano Índico"
    } ], [ "British Virgin Islands", "vg", "1284", {
        de: "Jungferninseln",
        fr: "îles Vierges",
        es: "Islas Vírgenes"
    } ], [ "Brunei", "bn", "673", {
        de: "Nation von Brunei, Wohnung des Friedens",
        fr: "État de Brunei Darussalam",
        es: "Nación de Brunei, Morada de la Paz"
    } ], [ "Bulgaria (България)", "bg", "359", {
        de: "Republik Bulgarien",
        fr: "République de Bulgarie",
        es: "República de Bulgaria"
    } ], [ "Burkina Faso", "bf", "226", {
        de: "Burkina Faso",
        fr: "République du Burkina",
        es: "Burkina Faso"
    } ], [ "Burundi (Uburundi)", "bi", "257", {
        de: "Republik Burundi",
        fr: "République du Burundi",
        es: "República de Burundi"
    } ], [ "Cambodia (កម្ពុជា)", "kh", "855", {
        de: "Königreich Kambodscha",
        fr: "Royaume du Cambodge",
        es: "Reino de Camboya"
    } ], [ "Cameroon (Cameroun)", "cm", "237", {
        de: "Republik Kamerun",
        fr: "République du Cameroun",
        es: "República de Camerún"
    } ], [ "Canada", "ca", "1", {
        de: "Kanada",
        fr: "Canada",
        es: "Canadá"
    }, 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238", {
        de: "Republik Cabo Verde",
        fr: "République du Cap-Vert",
        es: "República de Cabo Verde"
    } ], [ "Caribbean Netherlands", "bq", "599", 1 ], [ "Cayman Islands", "ky", "1345", {
        de: "Cayman-Inseln",
        fr: "Îles Caïmans",
        es: "Islas Caimán"
    } ], [ "Central African Republic (République centrafricaine)", "cf", "236", {
        de: "Zentralafrikanische Republik",
        fr: "République centrafricaine",
        es: "República Centroafricana"
    } ], [ "Chad (Tchad)", "td", "235", {
        de: "Republik Tschad",
        fr: "République du Tchad",
        es: "República de Chad"
    } ], [ "Chile", "cl", "56", {
        de: "Republik Chile",
        fr: "République du Chili",
        es: "República de Chile"
    } ], [ "China (中国)", "cn", "86", {
        de: "Volksrepublik China",
        fr: "République populaire de Chine",
        es: "República Popular de China"
    } ], [ "Christmas Island", "cx", "61", {
        de: "Gebiet der Weihnachtsinsel",
        fr: "Territoire de l'île Christmas",
        es: "Territorio de la Isla de Navidad"
    }, 2 ], [ "Cocos (Keeling) Islands", "cc", "61", {
        de: "Gebiet der Cocos (Keeling) Islands",
        fr: "Territoire des îles Cocos (Keeling)",
        es: "Territorio de los (Keeling) Islas Cocos"
    }, 1 ], [ "Colombia", "co", "57", {
        de: "Republik Kolumbien",
        fr: "République de Colombie",
        es: "República de Colombia"
    } ], [ "Comoros (‫جزر القمر‬‎)", "km", "269", {
        de: "Union der Komoren",
        fr: "Union des Comores",
        es: "Unión de las Comoras"
    } ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243", {
        de: "Demokratische Republik Kongo",
        fr: "République démocratique du Congo",
        es: "República Democrática del Congo"
    } ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242", {
        de: "Republik Kongo",
        fr: "République du Congo",
        es: "República del Congo"
    } ], [ "Cook Islands", "ck", "682", {
        de: "Cook-Inseln",
        fr: "Îles Cook",
        es: "Islas Cook"
    } ], [ "Costa Rica", "cr", "506", {
        de: "Republik Costa Rica",
        fr: "République du Costa Rica",
        es: "República de Costa Rica"
    } ], [ "Côte d’Ivoire", "ci", "225", {
        de: "Republik Côte d'Ivoire",
        fr: "République de Côte d' Ivoire",
        es: "República de Côte d'Ivoire"
    } ], [ "Croatia (Hrvatska)", "hr", "385", {
        de: "Republik Kroatien",
        fr: "République de Croatie",
        es: "República de Croacia"
    } ], [ "Cuba", "cu", "53", {
        de: "Republik Kuba",
        fr: "République de Cuba",
        es: "República de Cuba"
    } ], [ "Curaçao", "cw", "599", {
        es: "País de Curazao"
    }, 0 ], [ "Cyprus (Κύπρος)", "cy", "357", {
        de: "Republik Zypern",
        fr: "République de Chypre",
        es: "República de Chipre"
    } ], [ "Czech Republic (Česká republika)", "cz", "420", {
        de: "Tschechische Republik",
        fr: "République tchèque",
        es: "República Checa"
    } ], [ "Denmark (Danmark)", "dk", "45", {
        de: "Königreich Dänemark",
        fr: "Royaume du Danemark",
        es: "Reino de Dinamarca"
    } ], [ "Djibouti", "dj", "253", {
        de: "Republik Dschibuti",
        fr: "République de Djibouti",
        es: "República de Djibouti"
    } ], [ "Dominica", "dm", "1767", {
        de: "Commonwealth von Dominica",
        fr: "Commonwealth de la Dominique",
        es: "Mancomunidad de Dominica"
    } ], [ "Dominican Republic (República Dominicana)", "do", "1", {
        de: "Dominikanische Republik",
        fr: "République Dominicaine",
        es: "República Dominicana"
    }, 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593", {
        de: "Republik Ecuador",
        fr: "République de l'Équateur",
        es: "República del Ecuador"
    } ], [ "Egypt (‫مصر‬‎)", "eg", "20", {
        de: "Arabische Republik Ägypten",
        fr: "République arabe d'Égypte",
        es: "República Árabe de Egipto"
    } ], [ "El Salvador", "sv", "503", {
        de: "Republik El Salvador",
        fr: "République du Salvador",
        es: "República de El Salvador"
    } ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240", {
        de: "Republik Äquatorialguinea",
        fr: "République de Guinée équatoriale",
        es: "República de Guinea Ecuatorial"
    } ], [ "Eritrea", "er", "291", {
        de: "Staat Eritrea",
        fr: "État d'Érythrée",
        es: "Estado de Eritrea"
    } ], [ "Estonia (Eesti)", "ee", "372", {
        de: "Republik Estland",
        fr: "République d'Estonie",
        es: "República de Estonia"
    } ], [ "Ethiopia", "et", "251", {
        de: "Demokratische Bundesrepublik Äthiopien",
        fr: "République fédérale démocratique d'Éthiopie",
        es: "República Democrática Federal de Etiopía"
    } ], [ "Falkland Islands (Islas Malvinas)", "fk", "500", {
        de: "Falkland-Inseln",
        fr: "Îles Malouines",
        es: "islas Malvinas"
    } ], [ "Faroe Islands (Føroyar)", "fo", "298", {
        de: "Färöer",
        fr: "Îles Féroé",
        es: "Islas Feroe"
    } ], [ "Fiji", "fj", "679", {
        de: "Republik Fidschi",
        fr: "République des Fidji",
        es: "República de Fiji"
    } ], [ "Finland (Suomi)", "fi", "358", {
        de: "Republik Finnland",
        fr: "République de Finlande",
        es: "República de Finlandia"
    }, 0 ], [ "France", "fr", "33", {
        de: "Französische Republik",
        fr: "République française",
        es: "República francés"
    } ], [ "French Guiana (Guyane française)", "gf", "594", {
        de: "Guayana",
        fr: "Guyane",
        es: "Guayana"
    } ], [ "French Polynesia (Polynésie française)", "pf", "689", {
        de: "Französisch-Polynesien",
        fr: "Polynésie française",
        es: "Polinesia francés"
    } ], [ "Gabon", "ga", "241", {
        de: "Gabunische Republik",
        fr: "République gabonaise",
        es: "República de Gabón"
    } ], [ "Gambia", "gm", "220", {
        de: "Republik Gambia",
        fr: "République de Gambie",
        es: "República de Gambia"
    } ], [ "Georgia (საქართველო)", "ge", "995", {
        de: "Georgia",
        fr: "République de Géorgie",
        es: "Georgia"
    } ], [ "Germany (Deutschland)", "de", "49", {
        de: "Bundesrepublik Deutschland",
        fr: "République fédérale d'Allemagne",
        es: "República Federal de Alemania"
    } ], [ "Ghana (Gaana)", "gh", "233", {
        de: "Republik Ghana",
        fr: "République du Ghana",
        es: "República de Ghana"
    } ], [ "Gibraltar", "gi", "350", {
        de: "Gibraltar",
        fr: "Gibraltar",
        es: "Gibraltar"
    } ], [ "Greece (Ελλάδα)", "gr", "30", {
        de: "Hellenische Republik",
        fr: "République hellénique",
        es: "República Helénica"
    } ], [ "Greenland (Kalaallit Nunaat)", "gl", "299", {
        de: "Grönland",
        fr: "Groenland",
        es: "Groenlandia"
    } ], [ "Grenada", "gd", "1473", {
        de: "Grenada",
        fr: "Grenade",
        es: "Granada"
    } ], [ "Guadeloupe", "gp", "590", {
        de: "Guadeloupe",
        fr: "Guadeloupe",
        es: "Guadalupe"
    }, 0 ], [ "Guam", "gu", "1671", {
        de: "Guam",
        fr: "Guam",
        es: "Guam"
    } ], [ "Guatemala", "gt", "502", {
        de: "Republik Guatemala",
        fr: "République du Guatemala",
        es: "República de Guatemala"
    } ], [ "Guernsey", "gg", "44", {
        de: "Guernsey",
        fr: "Bailliage de Guernesey",
        es: "Bailía de Guernsey"
    }, 1 ], [ "Guinea (Guinée)", "gn", "224", {
        de: "Republik Guinea",
        fr: "République de Guinée",
        es: "República de Guinea"
    } ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245", {
        de: "Republik Guinea-Bissau",
        fr: "République de Guinée-Bissau",
        es: "República de Guinea-Bissau"
    } ], [ "Guyana", "gy", "592", {
        de: "Kooperative Republik Guyana",
        fr: "République coopérative de Guyana",
        es: "República Cooperativa de Guyana"
    } ], [ "Haiti", "ht", "509", {
        de: "Republik Haiti",
        fr: "République d'Haïti",
        es: "República de Haití"
    } ], [ "Honduras", "hn", "504", {
        de: "Republik Honduras",
        fr: "République du Honduras",
        es: "República de Honduras"
    } ], [ "Hong Kong (香港)", "hk", "852", {
        de: "Sonderverwaltungszone der Volksrepublik China",
        fr: "Région administrative spéciale de Hong Kong de la République populaire de Chine",
        es: "Hong Kong Región Administrativa Especial de la República Popular China"
    } ], [ "Hungary (Magyarország)", "hu", "36", {
        de: "Ungarn",
        fr: "Hongrie",
        es: "Hungría"
    } ], [ "Iceland (Ísland)", "is", "354", {
        de: "Island",
        fr: "République d'Islande",
        es: "Islandia"
    } ], [ "India (भारत)", "in", "91", {
        de: "Republik Indien",
        fr: "République de l'Inde",
        es: "República de la India"
    } ], [ "Indonesia", "id", "62", {
        de: "Republik Indonesien",
        fr: "République d'Indonésie",
        es: "República de Indonesia"
    } ], [ "Iran (‫ایران‬‎)", "ir", "98", {
        de: "Islamische Republik Iran",
        fr: "République islamique d'Iran",
        es: "República Islámica de Irán"
    } ], [ "Iraq (‫العراق‬‎)", "iq", "964", {
        de: "Republik Irak",
        fr: "République d'Irak",
        es: "República de Irak"
    } ], [ "Ireland", "ie", "353", {
        de: "Republik Irland",
        fr: "République d'Irlande",
        es: "República de Irlanda"
    } ], [ "Isle of Man", "im", "44", {
        de: "Isle of Man",
        fr: "Isle of Man",
        es: "Isla de Man"
    }, 2 ], [ "Israel (‫ישראל‬‎)", "il", "972", {
        de: "Staat Israel",
        fr: "État d'Israël",
        es: "Estado de Israel"
    } ], [ "Italy (Italia)", "it", "39", {
        de: "Italienische Republik",
        fr: "République italienne",
        es: "República Italiana"
    }, 0 ], [ "Jamaica", "jm", "1876", {
        de: "Jamaika",
        fr: "Jamaïque",
        es: "Jamaica"
    } ], [ "Japan (日本)", "jp", "81", {
        de: "Japan",
        fr: "Japon",
        es: "Japón"
    } ], [ "Jersey", "je", "44", {
        de: "Vogtei Jersey",
        fr: "Bailliage de Jersey",
        es: "Bailía de Jersey"
    }, 3 ], [ "Jordan (‫الأردن‬‎)", "jo", "962", {
        de: "Haschemitisches Königreich Jordanien",
        fr: "Royaume hachémite de Jordanie",
        es: "Reino Hachemita de Jordania"
    } ], [ "Kazakhstan (Казахстан)", "kz", "7", {
        de: "Republik Kasachstan",
        fr: "République du Kazakhstan",
        es: "República de Kazajstán"
    }, 1 ], [ "Kenya", "ke", "254", {
        de: "Republik Kenia",
        fr: "République du Kenya",
        es: "República de Kenya"
    } ], [ "Kiribati", "ki", "686", {
        de: "Unabhängige und souveräne Republik Kiribati",
        fr: "République de Kiribati",
        es: "República Independiente y Soberano de Kiribati"
    } ], [ "Kuwait (‫الكويت‬‎)", "kw", "965", {
        de: "Staat Kuwait",
        fr: "État du Koweït",
        es: "Estado de Kuwait"
    } ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996", {
        de: "Kirgisische Republik",
        fr: "République kirghize",
        es: "República Kirguisa"
    } ], [ "Laos (ລາວ)", "la", "856", {
        de: "Laos, Demokratische Volksrepublik",
        fr: "République démocratique populaire lao",
        es: "República Democrática Popular Lao"
    } ], [ "Latvia (Latvija)", "lv", "371", {
        de: "Republik Lettland",
        fr: "République de Lettonie",
        es: "República de Letonia"
    } ], [ "Lebanon (‫لبنان‬‎)", "lb", "961", {
        de: "Libanesische Republik",
        fr: "République libanaise",
        es: "República Libanesa"
    } ], [ "Lesotho", "ls", "266", {
        de: "Königreich Lesotho",
        fr: "Royaume du Lesotho",
        es: "Reino de Lesotho"
    } ], [ "Liberia", "lr", "231", {
        de: "Republik Liberia",
        fr: "République du Libéria",
        es: "República de Liberia"
    } ], [ "Libya (‫ليبيا‬‎)", "ly", "218", {
        de: "Staat Libyen",
        fr: "Grande République arabe libyenne populaire et socialiste",
        es: "Estado de Libia"
    } ], [ "Liechtenstein", "li", "423", {
        de: "Fürstentum Liechtenstein",
        fr: "Principauté du Liechtenstein",
        es: "Principado de Liechtenstein"
    } ], [ "Lithuania (Lietuva)", "lt", "370", {
        de: "Republik Litauen",
        fr: "République de Lituanie",
        es: "República de Lituania"
    } ], [ "Luxembourg", "lu", "352", {
        de: "Großherzogtum Luxemburg,",
        fr: "Grand-Duché de Luxembourg",
        es: "Gran Ducado de Luxemburgo"
    } ], [ "Macau (澳門)", "mo", "853", {
        de: "Sonderverwaltungsregion Macau der Volksrepublik China",
        fr: "Région administrative spéciale de Macao de la République populaire de Chine",
        es: "Macao, Región Administrativa Especial de la República Popular China"
    } ], [ "Macedonia (FYROM) (Македонија)", "mk", "389", {
        de: "Republik Mazedonien",
        fr: "République de Macédoine",
        es: "República de Macedonia"
    } ], [ "Madagascar (Madagasikara)", "mg", "261", {
        de: "Republik Madagaskar",
        fr: "République de Madagascar",
        es: "República de Madagascar"
    } ], [ "Malawi", "mw", "265", {
        de: "Republik Malawi",
        fr: "République du Malawi",
        es: "República de Malawi"
    } ], [ "Malaysia", "my", "60", {
        de: "Malaysia",
        fr: "Fédération de Malaisie",
        es: "Malasia"
    } ], [ "Maldives", "mv", "960", {
        de: "Republik Malediven",
        fr: "République des Maldives",
        es: "República de las Maldivas"
    } ], [ "Mali", "ml", "223", {
        de: "Republik Mali",
        fr: "République du Mali",
        es: "República de Malí"
    } ], [ "Malta", "mt", "356", {
        de: "Republik Malta",
        fr: "République de Malte",
        es: "República de Malta"
    } ], [ "Marshall Islands", "mh", "692", {
        de: "Republik der Marshall-Inseln",
        fr: "République des Îles Marshall",
        es: "República de las Islas Marshall"
    } ], [ "Martinique", "mq", "596", {
        de: "Martinique",
        fr: "Martinique",
        es: "Martinica"
    } ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222", {
        de: "Islamische Republik Mauretanien",
        fr: "République islamique de Mauritanie",
        es: "República Islámica de Mauritania"
    } ], [ "Mauritius (Moris)", "mu", "230", {
        de: "Republik Mauritius",
        fr: "République de Maurice",
        es: "República de Mauricio"
    } ], [ "Mayotte", "yt", "262", {
        de: "Übersee-Département Mayotte",
        fr: "Département de Mayotte",
        es: "Departamento de Mayotte"
    }, 1 ], [ "Mexico (México)", "mx", "52", {
        de: "Vereinigte Mexikanische Staaten",
        fr: "États-Unis du Mexique",
        es: "Estados Unidos Mexicanos"
    } ], [ "Micronesia", "fm", "691", {
        de: "Föderierte Staaten von Mikronesien",
        fr: "États fédérés de Micronésie",
        es: "Estados Federados de Micronesia"
    } ], [ "Moldova (Republica Moldova)", "md", "373", {
        de: "Republik Moldau",
        fr: "République de Moldavie",
        es: "República de Moldova"
    } ], [ "Monaco", "mc", "377", {
        de: "Fürstentum Monaco",
        fr: "Principauté de Monaco",
        es: "Principado de Mónaco"
    } ], [ "Mongolia (Монгол)", "mn", "976", {
        de: "Mongolei",
        fr: "Mongolie",
        es: "Mongolia"
    } ], [ "Montenegro (Crna Gora)", "me", "382", {
        de: "Montenegro",
        fr: "Monténégro",
        es: "Montenegro"
    } ], [ "Montserrat", "ms", "1664", {
        de: "Montserrat",
        fr: "Montserrat",
        es: "Montserrat"
    } ], [ "Morocco (‫المغرب‬‎)", "ma", "212", {
        de: "Königreich Marokko",
        fr: "Royaume du Maroc",
        es: "Reino de Marruecos"
    }, 0 ], [ "Mozambique (Moçambique)", "mz", "258", {
        de: "Republik Mosambik",
        fr: "République du Mozambique",
        es: "República de Mozambique"
    } ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95", {
        de: "Republik der Union von Myanmar",
        fr: "République de l'Union du Myanmar",
        es: "República de la Unión de Myanmar"
    } ], [ "Namibia (Namibië)", "na", "264", {
        de: "Republik Namibia",
        fr: "République de Namibie",
        es: "República de Namibia"
    } ], [ "Nauru", "nr", "674", {
        de: "Republik Nauru",
        fr: "République de Nauru",
        es: "República de Nauru"
    } ], [ "Nepal (नेपाल)", "np", "977", {
        de: "Demokratischen Bundesrepublik Nepal",
        fr: "République du Népal",
        es: "República Democrática Federal de Nepal"
    } ], [ "Netherlands (Nederland)", "nl", "31", {
        de: "Niederlande",
        fr: "Pays-Bas",
        es: "Países Bajos"
    } ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687", {
        de: "Neukaledonien",
        fr: "Nouvelle-Calédonie",
        es: "nueva Caledonia"
    } ], [ "New Zealand", "nz", "64", {
        de: "Neuseeland",
        fr: "Nouvelle-Zélande",
        es: "nueva Zelanda"
    } ], [ "Nicaragua", "ni", "505", {
        de: "Republik Nicaragua",
        fr: "République du Nicaragua",
        es: "República de Nicaragua"
    } ], [ "Niger (Nijar)", "ne", "227", {
        de: "Republik Niger",
        fr: "République du Niger",
        es: "República de Níger"
    } ], [ "Nigeria", "ng", "234", {
        de: "Bundesrepublik Nigeria",
        fr: "République fédérale du Nigeria",
        es: "República Federal de Nigeria"
    } ], [ "Niue", "nu", "683", {
        de: "Niue",
        fr: "Niue",
        es: "Niue"
    } ], [ "Norfolk Island", "nf", "672", {
        de: "Gebiet der Norfolk-Insel",
        fr: "Territoire de l'île Norfolk",
        es: "Territorio de la Isla Norfolk"
    } ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850", {
        de: "Demokratische Volksrepublik Korea",
        fr: "République populaire démocratique de Corée",
        es: "República Popular Democrática de Corea"
    } ], [ "Northern Mariana Islands", "mp", "1670", {
        de: "Commonwealth der Nördlichen Marianen",
        fr: "Commonwealth des îles Mariannes du Nord",
        es: "Mancomunidad de las Islas Marianas del Norte"
    } ], [ "Norway (Norge)", "no", "47", {
        de: "Königreich Norwegen",
        fr: "Royaume de Norvège",
        es: "Reino de Noruega"
    }, 0 ], [ "Oman (‫عُمان‬‎)", "om", "968", {
        de: "Sultanat Oman",
        fr: "Sultanat d'Oman",
        es: "Sultanato de Omán"
    } ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92", {
        de: "Islamische Republik Pakistan",
        fr: "République islamique du Pakistan",
        es: "República Islámica de Pakistán"
    } ], [ "Palau", "pw", "680", {
        de: "Palau",
        fr: "République des Palaos (Palau)",
        es: "República de Palau"
    } ], [ "Palestine (‫فلسطين‬‎)", "ps", "970", {
        de: "Staat Palästina",
        fr: "État de Palestine",
        es: "Estado de Palestina"
    } ], [ "Panama (Panamá)", "pa", "507", {
        de: "Republik Panama",
        fr: "République du Panama",
        es: "República de Panamá"
    } ], [ "Papua New Guinea", "pg", "675", {
        de: "Unabhängige Staat Papua-Neuguinea",
        fr: "État indépendant de Papouasie-Nouvelle-Guinée",
        es: "Estado Independiente de Papúa Nueva Guinea"
    } ], [ "Paraguay", "py", "595", {
        de: "Republik Paraguay",
        fr: "République du Paraguay",
        es: "República de Paraguay"
    } ], [ "Peru (Perú)", "pe", "51", {
        de: "Republik Peru",
        fr: "République du Pérou",
        es: "República de Perú"
    } ], [ "Philippines", "ph", "63", {
        de: "Republik der Philippinen",
        fr: "République des Philippines",
        es: "República de las Filipinas"
    } ], [ "Poland (Polska)", "pl", "48", {
        de: "Republik Polen",
        fr: "République de Pologne",
        es: "República de Polonia"
    } ], [ "Portugal", "pt", "351", {
        de: "Portugiesische Republik",
        fr: "République portugaise",
        es: "República Portuguesa"
    } ], [ "Puerto Rico", "pr", "1", {
        de: "Commonwealth von Puerto Rico",
        fr: "Porto Rico",
        es: "Asociado de Puerto Rico"
    }, 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974", {
        de: "Staat Katar",
        fr: "État du Qatar",
        es: "Estado de Qatar"
    } ], [ "Réunion (La Réunion)", "re", "262", {
        de: "Réunion",
        fr: "Ile de la Réunion",
        es: "Isla de la Reunión"
    }, 0 ], [ "Romania (România)", "ro", "40", {
        de: "Rumänien",
        fr: "Roumanie",
        es: "Rumania"
    } ], [ "Russia (Россия)", "ru", "7", {
        de: "Russische Föderation",
        fr: "Fédération de Russie",
        es: "Federación de Rusia"
    }, 0 ], [ "Rwanda", "rw", "250", {
        de: "Republik Ruanda",
        fr: "République rwandaise",
        es: "República de Rwanda"
    } ], [ "Saint Barthélemy (Saint-Barthélemy)", "bl", "590", {
        de: "Gebietskörperschaft Saint -Barthélemy",
        fr: "Collectivité de Saint-Barthélemy",
        es: "Colectividad de San Barthélemy"
    }, 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1869", {
        de: "Föderation von Saint Kitts und Nevisa",
        fr: "Fédération de Saint -Christophe-et Nevisa",
        es: "Federación de San Cristóbal y Nevisa"
    } ], [ "Saint Lucia", "lc", "1758", {
        de: "St. Lucia",
        fr: "Sainte-Lucie",
        es: "Santa Lucía"
    } ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", {
        de: "St. Martin",
        fr: "Saint-Martin",
        es: "Saint Martin"
    }, 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508", {
        de: "St. Pierre und Miquelon",
        fr: "Saint-Pierre-et-Miquelon",
        es: "San Pedro y Miquelón"
    } ], [ "Saint Vincent and the Grenadines", "vc", "1784", {
        de: "St. Vincent und die Grenadinen",
        fr: "Saint-Vincent-et-les Grenadines",
        es: "San Vicente y las Granadinas"
    } ], [ "Samoa", "ws", "685", {
        de: "Unabhängige Staat Samoa",
        fr: "Samoa",
        es: "Estado Independiente de Samoa"
    } ], [ "San Marino", "sm", "378", {
        de: "Republik San Marino",
        fr: "République de Saint-Marin",
        es: "Serenísima República de San Marino"
    } ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239", {
        de: "Demokratische Republik São Tomé und Príncipe",
        fr: "République démocratique de São Tomé et Príncipe",
        es: "República Democrática de Santo Tomé y Príncipe"
    } ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966", {
        de: "Königreich Saudi-Arabien",
        fr: "Royaume d'Arabie Saoudite",
        es: "Reino de Arabia Saudita"
    } ], [ "Senegal (Sénégal)", "sn", "221", {
        de: "Republik Senegal",
        fr: "République du Sénégal",
        es: "República de Senegal"
    } ], [ "Serbia (Србија)", "rs", "381", {
        de: "Republik Serbien",
        fr: "République de Serbie",
        es: "República de Serbia"
    } ], [ "Seychelles", "sc", "248", {
        de: "Republik der Seychellen",
        fr: "République des Seychelles",
        es: "República de las Seychelles"
    } ], [ "Sierra Leone", "sl", "232", {
        de: "Republik Sierra Leone",
        fr: "République de Sierra Leone",
        es: "República de Sierra Leona"
    } ], [ "Singapore", "sg", "65", {
        de: "Republik Singapur",
        fr: "République de Singapour",
        es: "República de Singapur"
    } ], [ "Sint Maarten", "sx", "1721", {
        de: "Sint Maarten",
        fr: "Sint Maarten",
        es: "Sint Maarten"
    } ], [ "Slovakia (Slovensko)", "sk", "421", {
        de: "Slowakische Republik",
        fr: "République slovaque",
        es: "República Eslovaca"
    } ], [ "Slovenia (Slovenija)", "si", "386", {
        de: "Republik Slowenien",
        fr: "République de Slovénie",
        es: "República de Eslovenia"
    } ], [ "Solomon Islands", "sb", "677", {
        de: "Salomon-Inseln",
        fr: "Îles Salomon",
        es: "islas Salomón"
    } ], [ "Somalia (Soomaaliya)", "so", "252", {
        de: "Bundesrepublik Somalia",
        fr: "République fédérale de Somalie",
        es: "República Federal de Somalia"
    } ], [ "South Africa", "za", "27", {
        de: "Republik Südafrika",
        fr: "République d'Afrique du Sud",
        es: "República de Sudáfrica"
    } ], [ "South Korea (대한민국)", "kr", "82", {
        de: "Republik Korea",
        fr: "République de Corée",
        es: "República de Corea"
    } ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211", {
        de: "Republik Südsudan",
        fr: "République du Soudan du Sud",
        es: "República de Sudán del Sur"
    } ], [ "Spain (España)", "es", "34", {
        de: "Königreich Spanien",
        fr: "Royaume d'Espagne",
        es: "Reino de España"
    } ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94", {
        de: "Demokratische Sozialistische Republik Sri Lanka",
        fr: "République démocratique socialiste du Sri Lanka",
        es: "República Democrática Socialista de Sri Lanka"
    } ], [ "Sudan (‫السودان‬‎)", "sd", "249", {
        de: "Republik Sudan",
        fr: "République du Soudan",
        es: "República de Sudán"
    } ], [ "Suriname", "sr", "597", {
        de: "Republik Suriname",
        fr: "République du Suriname",
        es: "República de Suriname"
    } ], [ "Svalbard and Jan Mayen", "sj", "47", {
        de: "Inselgruppe Spitzbergen",
        fr: "Jan Mayen Svalbard",
        es: "Svalbard og Jan Mayen"
    }, 1 ], [ "Swaziland", "sz", "268", {
        de: "Königreich Swasiland",
        fr: "Royaume du Swaziland",
        es: "Reino de Swazilandia"
    } ], [ "Sweden (Sverige)", "se", "46", {
        de: "Königreich Schweden",
        fr: "Royaume de Suède",
        es: "Reino de Suecia"
    } ], [ "Switzerland (Schweiz)", "ch", "41", {
        de: "Schweizerische Eidgenossenschaft",
        fr: "Confédération suisse",
        es: "Confederación Suiza"
    } ], [ "Syria (‫سوريا‬‎)", "sy", "963", {
        de: "Arabische Republik Syrien",
        fr: "République arabe syrienne",
        es: "República Árabe Siria"
    } ], [ "Taiwan (台灣)", "tw", "886", {
        de: "Republik China (Taiwan)",
        fr: "République de Chine (Taïwan)",
        es: "República de China en Taiwán"
    } ], [ "Tajikistan", "tj", "992", {
        de: "Republik Tadschikistan",
        fr: "République du Tadjikistan",
        es: "República de Tayikistán"
    } ], [ "Tanzania", "tz", "255", {
        de: "Vereinigte Republik Tansania",
        fr: "République -Unie de Tanzanie",
        es: "República Unida de Tanzania"
    } ], [ "Thailand (ไทย)", "th", "66", {
        de: "Königreich Thailand",
        fr: "Royaume de Thaïlande",
        es: "Reino de Tailandia"
    } ], [ "Timor-Leste", "tl", "670", {
        de: "Demokratische Republik Timor-Leste",
        fr: "République démocratique du Timor oriental",
        es: "República Democrática de Timor-Leste"
    } ], [ "Togo", "tg", "228", {
        de: "Republik Togo",
        fr: "République togolaise",
        es: "República de Togo"
    } ], [ "Tokelau", "tk", "690", {
        de: "Tokelau",
        fr: "Îles Tokelau",
        es: "Tokelau"
    } ], [ "Tonga", "to", "676", {
        de: "Königreich Tonga",
        fr: "Royaume des Tonga",
        es: "Reino de Tonga"
    } ], [ "Trinidad and Tobago", "tt", "1868", {
        de: "Republik Trinidad und Tobago",
        fr: "République de Trinité-et-Tobago",
        es: "República de Trinidad y Tobago"
    } ], [ "Tunisia (‫تونس‬‎)", "tn", "216", {
        de: "Tunesische Republik",
        fr: "République tunisienne",
        es: "República de Túnez"
    } ], [ "Turkey (Türkiye)", "tr", "90", {
        de: "Republik Türkei",
        fr: "République de Turquie",
        es: "República de Turquía"
    } ], [ "Turkmenistan", "tm", "993", {
        de: "Turkmenistan",
        fr: "Turkménistan",
        es: "Turkmenistán"
    } ], [ "Turks and Caicos Islands", "tc", "1649", {
        de: "Turks und Caicos Inseln",
        fr: "Îles Turques et Caïques",
        es: "Islas Turcas y Caicos"
    } ], [ "Tuvalu", "tv", "688", {
        de: "Tuvalu",
        fr: "Tuvalu",
        es: "Tuvalu"
    } ], [ "U.S. Virgin Islands", "vi", "1340", {
        de: "Jungferninseln der Vereinigten Staaten",
        fr: "Îles Vierges des États-Unis",
        es: "Islas Vírgenes de los Estados Unidos"
    } ], [ "Uganda", "ug", "256", {
        de: "Republik Uganda",
        fr: "République de l'Ouganda",
        es: "República de Uganda"
    } ], [ "Ukraine (Україна)", "ua", "380", {
        de: "Ukraine",
        fr: "Ukraine",
        es: "Ucrania"
    } ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971", {
        de: "Vereinigte Arabische Emirate",
        fr: "Émirats arabes unis",
        es: "Emiratos Árabes Unidos"
    } ], [ "United Kingdom", "gb", "44", {
        de: "Vereinigtes Königreich Großbritannien und Nordirland",
        fr: "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord",
        es: "Reino Unido de Gran Bretaña e Irlanda del Norte"
    }, 0 ], [ "United States", "us", "1", {
        de: "Vereinigte Staaten von Amerika",
        fr: "Les états-unis d'Amérique",
        es: "Estados Unidos de América"
    }, 0 ], [ "Uruguay", "uy", "598", {
        de: "Republik Östlich des Uruguay",
        fr: "République orientale de l'Uruguay",
        es: "República Oriental del Uruguay"
    } ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998", {
        de: "Republik Usbekistan",
        fr: "République d'Ouzbékistan",
        es: "República de Uzbekistán"
    } ], [ "Vanuatu", "vu", "678", {
        de: "Vanuatu",
        fr: "République de Vanuatu",
        es: "República de Vanuatu"
    } ], [ "Vatican City (Città del Vaticano)", "va", "39", {
        de: "Staat Vatikanstadt",
        fr: "Cité du Vatican",
        es: "Ciudad del Vaticano"
    }, 1 ], [ "Venezuela", "ve", "58", {
        de: "Bolivarische Republik Venezuela",
        fr: "République bolivarienne du Venezuela",
        es: "República Bolivariana de Venezuela"
    } ], [ "Vietnam (Việt Nam)", "vn", "84", {
        de: "Sozialistische Republik Vietnam",
        fr: "République socialiste du Viêt Nam",
        es: "República Socialista de Vietnam"
    } ], [ "Wallis and Futuna", "wf", "681", {
        de: "Gebiet der Wallis und Futuna",
        fr: "Territoire des îles Wallis et Futuna",
        es: "Territorio de las Islas Wallis y Futuna"
    } ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", {
        de: "Demokratische Arabische Republik Sahara",
        fr: "République arabe sahraouie démocratique",
        es: "República Árabe Saharaui Democrática"
    }, 1 ], [ "Yemen (‫اليمن‬‎)", "ye", "967", {
        de: "Republik Jemen",
        fr: "République du Yémen",
        es: "República de Yemen"
    } ], [ "Zambia", "zm", "260", {
        de: "Republik Sambia",
        fr: "République de Zambie",
        es: "República de Zambia"
    } ], [ "Zimbabwe", "zw", "263", {
        de: "Republik Simbabwe",
        fr: "République du Zimbabwe",
        es: "República de Zimbabue"
    } ], [ "Åland Islands", "ax", "358", {
        de: "Åland-Inseln",
        fr: "Ahvenanmaa",
        es: "Islas Åland"
    }, 1 ] ];
    // loop over all of the countries above
    for (var i = 0; i < allCountries.length; i++) {
        var c = allCountries[i];
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            dialCode: c[2],
            translations: c[3] || {},
            priority: c[4] || 0,
            areaCodes: c[5] || null
        };
    }
});