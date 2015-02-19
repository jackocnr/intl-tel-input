var pluginName = "intlTelInput",
  id = 1, // give each instance it's own id for namespaced event handling
  defaults = {
    // typing digits after a valid number will be added to the extension part of the number
    allowExtensions: false,
    // automatically format the number according to the selected country
    autoFormat: true,
    // add or remove input placeholder with an example number for the selected country
    autoPlaceholder: true,
    // if there is just a dial code in the input: remove it on blur, and re-add it on focus
    autoHideDialCode: true,
    // default country
    defaultCountry: "",
    // token for ipinfo - required for https or over 1000 daily page views support
    ipinfoToken: "",
    // don't insert international dial codes
    nationalMode: true,
    // number type to use for placeholders
    numberType: "MOBILE",
    // display only these countries
    onlyCountries: [],
    // the countries at the top of the list. defaults to united states and united kingdom
    preferredCountries: ["us", "gb"],
    // specify the path to the libphonenumber script to enable validation/formatting
    utilsScript: ""
  },
  keys = {
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
    DEL: 46,
    CTRL: 17,
    CMD1: 91, // Chrome
    CMD2: 224 // FF
  },
  windowLoaded = false;

// keep track of if the window.load event has fired as impossible to check after the fact
$(window).load(function() {
  windowLoaded = true;
});

function Plugin(element, options) {
  this.element = element;

  this.options = $.extend({}, defaults, options);

  this._defaults = defaults;

  // event namespace
  this.ns = "." + pluginName + (id++);

  // Chrome, FF, Safari, IE9+
  this.isGoodBrowser = Boolean(element.setSelectionRange);

  this.hadInitialPlaceholder = Boolean($(element).attr("placeholder"));

  this._name = pluginName;

  this.init();
}

Plugin.prototype = {

  init: function() {
    var that = this;

    // if defaultCountry is set to "auto", we must do a lookup first
    if (this.options.defaultCountry == "auto") {
      // reset this in case lookup fails
      this.options.defaultCountry = "";
      var ipinfoURL = "//ipinfo.io";
      if (this.options.ipinfoToken) {
        ipinfoURL += "?token=" + this.options.ipinfoToken;
      }
      $.get(ipinfoURL, function(response) {
        if (response && response.country) {
          that.options.defaultCountry = response.country.toLowerCase();
        }
      }, "jsonp").always(function() {
        that._ready();
      });
    } else {
      this._ready();
    }
  },

  _ready: function() {
    // if in nationalMode, disable options relating to dial codes
    if (this.options.nationalMode) {
      this.options.autoHideDialCode = false;
    }
    // IE Mobile doesn't support the keypress event (see issue 68) which makes autoFormat impossible
    if (navigator.userAgent.match(/IEMobile/i)) {
      this.options.autoFormat = false;
    }

    // process all the data: onlyCountries, preferredCountries etc
    this._processCountryData();

    // generate the markup
    this._generateMarkup();

    // set the initial state of the input value and the selected flag
    this._setInitialState();

    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
    this._initListeners();
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
        if ($.inArray(allCountries[i].iso2, this.options.onlyCountries) != -1) {
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
      var countryCode = this.options.preferredCountries[i].toLowerCase(),
        countryData = this._getCountryData(countryCode, false, true);
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
    var flagsContainer = $("<div>", {
      "class": "flag-dropdown"
    }).insertAfter(this.telInput);

    // currently selected flag (displayed to left of input)
    var selectedFlag = $("<div>", {
      "class": "selected-flag"
    }).appendTo(flagsContainer);
    this.selectedFlagInner = $("<div>", {
      "class": "iti-flag"
    }).appendTo(selectedFlag);
    // CSS triangle
    $("<div>", {
      "class": "arrow"
    }).appendTo(this.selectedFlagInner);

    // country list contains: preferred countries, then divider, then all countries
    this.countryList = $("<ul>", {
      "class": "country-list v-hide"
    }).appendTo(flagsContainer);
    if (this.preferredCountries.length) {
      this._appendListItems(this.preferredCountries, "preferred");
      $("<li>", {
        "class": "divider"
      }).appendTo(this.countryList);
    }
    this._appendListItems(this.countries, "");

    // now we can grab the dropdown height, and hide it properly
    this.dropdownHeight = this.countryList.outerHeight();
    this.countryList.removeClass("v-hide").addClass("hide");

    // on small screens make the dropdown the same width as the input
    if (window.innerWidth < 500) {
      this.countryList.outerWidth(this.telInput.outerWidth());
    }

    // this is useful in lots of places
    this.countryListItems = this.countryList.children(".country");
  },


  // add a country <li> to the countryList <ul> container
  _appendListItems: function(countries, className) {
    // we create so many DOM elements, I decided it was faster to build a temp string
    // and then add everything to the DOM in one go at the end
    var tmp = "";
    // for each country
    for (var i = 0; i < countries.length; i++) {
      var c = countries[i];
      // open the list item
      tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
      // add the flag
      tmp += "<div class='iti-flag " + c.iso2 + "'></div>";
      // and the country name and dial code
      tmp += "<span class='country-name'>" + c.name + "</span>";
      tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
      // close the list item
      tmp += "</li>";
    }
    this.countryList.append(tmp);
  },


  // set the initial state of the input value and the selected flag
  _setInitialState: function() {
    var val = this.telInput.val();

    // if there is a number, and it's valid, we can go ahead and set the flag, else fall back to default
    if (this._getDialCode(val)) {
      this._updateFlagFromNumber(val);
    } else {
      // check the defaultCountry option, else fall back to the first in the list
      if (this.options.defaultCountry) {
        this.options.defaultCountry = this._getCountryData(this.options.defaultCountry.toLowerCase(), false, false);
      } else {
        this.options.defaultCountry = (this.preferredCountries.length) ? this.preferredCountries[0] : this.countries[0];
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
      this._updateVal(val, false);
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

    // if the user has specified the path to the utils script, fetch it on window.load
    if (this.options.utilsScript) {
      // if the plugin is being initialised after the window.load event has already been fired
      if (windowLoaded) {
        this.loadUtils();
      } else {
        // wait until the load event so we don't block any other requests e.g. the flags image
        $(window).load(function() {
          that.loadUtils();
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
          var isAllowedKey = ((e.which >= keys.ZERO && e.which <= keys.NINE) || e.which == keys.PLUS),
            input = that.telInput[0],
            noSelection = (that.isGoodBrowser && input.selectionStart == input.selectionEnd),
            max = that.telInput.attr("maxlength"),
            val = that.telInput.val(),
            // assumes that if max exists, it is >0
            isBelowMax = (max) ? (val.length < max) : true;
          // first: ensure we dont go over maxlength. we must do this here to prevent adding digits in the middle of the number
          // still reformat even if not an allowed key as they could by typing a formatting char, but ignore if there's a selection as doesn't make sense to replace selection with illegal char and then immediately remove it
          if (isBelowMax && (isAllowedKey || noSelection)) {
            var newChar = (isAllowedKey) ? String.fromCharCode(e.which) : null;
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

    // handle keyup event
    // for autoFormat: we use keyup to catch cut/paste events and also delete events (after the fact)
    this.telInput.on("keyup" + this.ns, function(e) {
      // the "enter" key event from selecting a dropdown item is triggered here on the input, because the document.keydown handler that initially handles that event triggers a focus on the input, and so the keyup for that same key event gets triggered here. weird, but just make sure we dont bother doing any re-formatting in this case (we've already done preventDefault in the keydown handler, so it wont actually submit the form or anything).
      // ALSO: ignore keyup if readonly
      if (e.which == keys.ENTER || that.telInput.prop("readonly")) {
        // do nothing
      } else if (that.options.autoFormat && window.intlTelInputUtils) {
        var isCtrl = (e.which == keys.CTRL || e.which == keys.CMD1 || e.which == keys.CMD2),
          input = that.telInput[0],
          // noSelection defaults to false for bad browsers, else would be reformatting on all ctrl keys e.g. select-all/copy
          noSelection = (that.isGoodBrowser && input.selectionStart == input.selectionEnd),
          // cursorAtEnd defaults to false for bad browsers else they would never get a reformat on delete
          cursorAtEnd = (that.isGoodBrowser && input.selectionStart == that.telInput.val().length);

        // if delete in the middle: reformat with no suffix (no need to reformat if delete at end)
        // if backspace: reformat with no suffix (need to reformat if at end to remove any lingering suffix - this is a feature)
        // if ctrl and no selection (i.e. could have just been a paste): reformat (if cursorAtEnd: add suffix)
        if ((e.which == keys.DEL && !cursorAtEnd) || e.which == keys.BSPACE || (isCtrl && noSelection)) {
          // important to remember never to add suffix on any delete key as can fuck up in ie8 so you can never delete a formatting char at the end
          // UPDATE: pass true for 3rd arg (isAllowedKey) if might have been a paste event - this is just passed through to intlTelInputUtils.formatNumber and used to check an extensions edge case
          that._handleInputKey(null, (isCtrl && cursorAtEnd), isCtrl);
        }
        // prevent deleting the plus (if not in nationalMode)
        if (!that.options.nationalMode) {
          var val = that.telInput.val();
          if (val.charAt(0) != "+") {
            // newCursorPos is current pos + 1 to account for the plus we are about to add
            var newCursorPos = (that.isGoodBrowser) ? input.selectionStart + 1 : 0;
            that.telInput.val("+" + val);
            if (that.isGoodBrowser) {
              input.setSelectionRange(newCursorPos, newCursorPos);
            }
          }
        }
      } else {
        // if no autoFormat, just update flag
        that._updateFlagFromNumber(that.telInput.val());
      }
    });
  },


  // alert the user to an invalid key event
  _handleInvalidKey: function() {
    var that = this;

    this.telInput.trigger("invalidkey").addClass("iti-invalid-key");
    setTimeout(function() {
      that.telInput.removeClass("iti-invalid-key");
    }, 100);
  },


  // when autoFormat is enabled: handle various key events on the input: the 2 main situations are 1) adding a new number character, which will replace any selection, reformat, and preserve the cursor position. and 2) reformatting on backspace, or paste event (etc)
  _handleInputKey: function(newNumericChar, addSuffix, isAllowedKey) {
    var val = this.telInput.val(),
      cleanBefore = this._getClean(val),
      originalLeftChars,
      // raw DOM element
      input = this.telInput[0],
      digitsOnRight = 0;

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
    this.setNumber(val, addSuffix, true, isAllowedKey);

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
      if ($.isNumeric(leftChar) || val.substr(i - 2, 2) == originalLeftChars) {
        return i;
      }
    }
    return 0;
  },


  // after a reformat we need to make sure there are still the same number of digits to the right of the cursor
  _getCursorFromDigitsOnRight: function(val, digitsOnRight) {
    for (var i = val.length - 1; i >= 0; i--) {
      if ($.isNumeric(val.charAt(i))) {
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
        that._updateVal("+" + that.selectedCountryData.dialCode, true);
        // after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one
        that.telInput.one("keypress.plus" + that.ns, function(e) {
          if (e.which == keys.PLUS) {
            // if autoFormat is enabled, this key event will have already have been handled by another keypress listener (hence we need to add the "+"). if disabled, it will be handled after this by a keyup listener (hence no need to add the "+").
            var newVal = (that.options.autoFormat && window.intlTelInputUtils) ? "+" : "";
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
        var value = that.telInput.val(),
          startsPlus = (value.charAt(0) == "+");
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

    // made the decision not to trigger blur() now, because would only do anything in the case where they manually set the initial value to just a dial code, in which case they probably want it to be displayed.
  },


  // extract the numeric digits from the given string
  _getNumeric: function(s) {
    return s.replace(/\D/g, "");
  },


  _getClean: function(s) {
    var prefix = (s.charAt(0) == "+") ? "+" : "";
    return prefix + this._getNumeric(s);
  },


  // show the dropdown
  _showDropdown: function() {
    this._setDropdownPosition();

    // update highlighting and scroll to active list item
    var activeListItem = this.countryList.children(".active");
    if (activeListItem.length) {
      this._highlightListItem(activeListItem);
    }

    // show it
    this.countryList.removeClass("hide");
    if (activeListItem.length) {
      this._scrollTo(activeListItem);
    }

    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
    this._bindDropdownListeners();

    // update the arrow
    this.selectedFlagInner.children(".arrow").addClass("up");
  },


  // decide where to position dropdown (depends on position within viewport, and scroll)
  _setDropdownPosition: function() {
    var inputTop = this.telInput.offset().top,
      windowTop = $(window).scrollTop(),
      // dropdownFitsBelow = (dropdownBottom < windowBottom)
      dropdownFitsBelow = (inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height()),
      dropdownFitsAbove = (inputTop - this.dropdownHeight > windowTop);

    // dropdownHeight - 1 for border
    var cssTop = (!dropdownFitsBelow && dropdownFitsAbove) ? "-" + (this.dropdownHeight - 1) + "px" : "";
    this.countryList.css("top", cssTop);
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
    var query = "",
      queryTimer = null;
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
      } else if ((e.which >= keys.A && e.which <= keys.Z) || e.which == keys.SPACE) {
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
        }, 1000);
      }
    });
  },


  // highlight the next/prev item in the list (and ensure it is visible)
  _handleUpDownKey: function(key) {
    var current = this.countryList.children(".highlight").first();
    var next = (key == keys.UP) ? current.prev() : current.next();
    if (next.length) {
      // skip the divider
      if (next.hasClass("divider")) {
        next = (key == keys.UP) ? next.prev() : next.next();
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
      if (this._startsWith(this.countries[i].name, query)) {
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
    return (a.substr(0, b.length).toUpperCase() == b);
  },


  // update the input's value to the given val
  // if autoFormat=true, format it first according to the country-specific formatting rules
  _updateVal: function(val, addSuffix, preventConversion, isAllowedKey) {
    var formatted;

    if (this.options.autoFormat && window.intlTelInputUtils) {
      // if nationalMode and we have a valid intl number, convert it to ntl
      // preventConversion is false (i.e. we allow conversion) when dev calls setNumber, or on init
      if (!preventConversion && this.options.nationalMode && val.charAt(0) == "+" && intlTelInputUtils.isValidNumber(val, this.selectedCountryData.iso2)) {
        formatted = intlTelInputUtils.formatNumberByType(val, this.selectedCountryData.iso2, intlTelInputUtils.numberFormat.NATIONAL);
      } else {
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
    // if we're in nationalMode and we're on US/Canada, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit
    if (this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
      if (number.charAt(0) != "1") {
        number = "1" + number;
      }
      number = "+" + number;
    }
    // try and extract valid dial code from input
    var dialCode = this._getDialCode(number),
      countryCode = null;
    if (dialCode) {
      // check if one of the matching countries is already selected
      var countryCodes = this.countryCodes[this._getNumeric(dialCode)],
        alreadySelected = (this.selectedCountryData && $.inArray(this.selectedCountryData.iso2, countryCodes) != -1);
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
    } else if (number.charAt(0) == "+") {
      // no valid dial code, but only empty it if they've actually typed an invalid one, not just a plus
      // Note: use getNumeric here because the number has not been formatted yet, so could contain bad shit
      if (this._getNumeric(number).length) {
        countryCode = "";
      } else if (!this.selectedCountryData.iso2) {
        // if just a plus and there's no currently selected country, revert to default
        countryCode = this.options.defaultCountry.iso2;
      }
    } else if (!this.selectedCountryData.iso2 && !number) {
      // if no selected country and no number, revert to default
      countryCode = this.options.defaultCountry.iso2;
    }

    if (countryCode !== null) {
      this._selectFlag(countryCode);
    }
  },


  // check if the given number contains an unknown area code from the North American Numbering Plan i.e. the only dialCode that could be extracted was +1 but the actual number's length is >=4
  _isUnknownNanp: function(number, dialCode) {
    return (dialCode == "+1" && this._getNumeric(number).length >= 4);
  },


  // remove highlighting from other list items and highlight the given item
  _highlightListItem: function(listItem) {
    this.countryListItems.removeClass("highlight");
    listItem.addClass("highlight");
  },


  // find the country data for the given country code
  // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  _getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) {
    var countryList = (ignoreOnlyCountriesOption) ? allCountries : this.countries;
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
  _selectFlag: function(countryCode) {
    // do this first as it will throw an error and stop if countryCode is invalid
    this.selectedCountryData = (countryCode) ? this._getCountryData(countryCode, false, false) : {};

    this.selectedFlagInner.attr("class", "iti-flag " + countryCode);
    // update the selected country's title attribute
    var title = (countryCode) ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
    this.selectedFlagInner.parent().attr("title", title);

    // and the input's placeholder
    this._updatePlaceholder();

    // update the active list item
    this.countryListItems.removeClass("active");
    if (countryCode) {
      this.countryListItems.children(".iti-flag." + countryCode).first().parent().addClass("active");
    }
  },


  // update the input placeholder to an example number from the currently selected country
  _updatePlaceholder: function() {
    if (window.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder) {
      var iso2 = this.selectedCountryData.iso2,
        numberType = intlTelInputUtils.numberType[this.options.numberType || "FIXED_LINE"],
        placeholder = (iso2) ? intlTelInputUtils.getExampleNumber(iso2, this.options.nationalMode, numberType) : "";
      this.telInput.attr("placeholder", placeholder);
    }
  },


  // called when the user selects a list item from the dropdown
  _selectListItem: function(listItem) {
    // update selected flag and active list item
    var countryCode = listItem.attr("data-country-code");
    this._selectFlag(countryCode);
    this._closeDropdown();

    this._updateDialCode(listItem.attr("data-dial-code"), true);

    // always fire the change event as even if nationalMode=true (and we haven't updated the input val), the system as a whole has still changed - see country-sync example. think of it as making a selection from a select element.
    this.telInput.trigger("change");

    // focus the input
    this.telInput.focus();
  },


  // close the dropdown and unbind any listeners
  _closeDropdown: function() {
    this.countryList.addClass("hide");

    // update the arrow
    this.selectedFlagInner.children(".arrow").removeClass("up");

    // unbind key events
    $(document).off(this.ns);
    // unbind click-off-to-close
    $("html").off(this.ns);
    // unbind hover and click listeners
    this.countryList.off(this.ns);
  },


  // check if an element is visible within it's container, else scroll until it is
  _scrollTo: function(element, middle) {
    var container = this.countryList,
      containerHeight = container.height(),
      containerTop = container.offset().top,
      containerBottom = containerTop + containerHeight,
      elementHeight = element.outerHeight(),
      elementTop = element.offset().top,
      elementBottom = elementTop + elementHeight,
      newScrollTop = elementTop - containerTop + container.scrollTop(),
      middleOffset = (containerHeight / 2) - (elementHeight / 2);

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
    var inputVal = this.telInput.val(),
      newNumber;

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
        var existingNumber = (inputVal.charAt(0) != "+") ? $.trim(inputVal) : "";
        newNumber = newDialCode + existingNumber;
      }
    } else {
      newNumber = (!this.options.autoHideDialCode || focusing) ? newDialCode : "";
    }

    this._updateVal(newNumber, focusing);
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

  // remove plugin
  destroy: function() {
    // make sure the dropdown is closed (and unbind listeners)
    this._closeDropdown();

    // key events, and focus/blur events if autoHideDialCode=true
    this.telInput.off(this.ns);
    // click event to open dropdown
    this.selectedFlagInner.parent().off(this.ns);
    // label click hack
    this.telInput.closest("label").off(this.ns);

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
    var val = $.trim(this.telInput.val()),
      countryCode = (this.options.nationalMode) ? this.selectedCountryData.iso2 : "";
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.isValidNumber(val, countryCode);
    }
    return false;
  },


  // load the utils script
  loadUtils: function(path) {
    var utilsScript = path || this.options.utilsScript;
    if (!$.fn[pluginName].loadedUtilsScript && utilsScript) {
      // don't do this twice! (dont just check if the global intlTelInputUtils exists as if init plugin multiple times in quick succession, it may not have finished loading yet)
      $.fn[pluginName].loadedUtilsScript = true;

      // dont use $.getScript as it prevents caching
      $.ajax({
        url: utilsScript,
        success: function() {
          // tell all instances the utils are ready
          $(".intl-tel-input input").intlTelInput("utilsLoaded");
        },
        dataType: "script",
        cache: true
      });
    }
  },


  // update the selected flag, and update the input val accordingly
  selectCountry: function(countryCode) {
    countryCode = countryCode.toLowerCase();
    // check if already selected
    if (!this.selectedFlagInner.hasClass(countryCode)) {
      this._selectFlag(countryCode);
      this._updateDialCode(this.selectedCountryData.dialCode, false);
    }
  },


  // set the input value and update the flag
  setNumber: function(number, addSuffix, preventConversion, isAllowedKey) {
    // ensure starts with plus
    if (!this.options.nationalMode && number.charAt(0) != "+") {
      number = "+" + number;
    }
    // we must update the flag first, which updates this.selectedCountryData, which is used later for formatting the number before displaying it
    this._updateFlagFromNumber(number);
    this._updateVal(number, addSuffix, preventConversion, isAllowedKey);
  },


  // this is called when the utils are ready
  utilsLoaded: function() {
    // if autoFormat is enabled and there's an initial value in the input, then format it
    if (this.options.autoFormat && this.telInput.val()) {
      this._updateVal(this.telInput.val());
    }
    this._updatePlaceholder();
  }

};



// adapted to allow public functions
// using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
$.fn[pluginName] = function(options) {
  var args = arguments;

  // Is the first parameter an object (options), or was omitted,
  // instantiate a new instance of the plugin.
  if (options === undefined || typeof options === "object") {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  } else if (typeof options === "string" && options[0] !== "_" && options !== "init") {
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