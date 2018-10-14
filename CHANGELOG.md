# Changelog

## v14.0.0 (2018-09-23)
We finally removed the jQuery dependency! This changes how you initialise and use the plugin - see readme for details. All of the tests are currently passing on Chrome/Firefox/Safari/IE11.

- You can no longer initialise the plugin on multiple inputs at once, but other than that AFAICS it should be feature complete
- Instead of jQuery deferred objects we now use ES6 promises (if available)
- `dropdownContainer` option has changed from taking a jQuery selector string, to a node e.g. `document.body`

I also simplified the CSS media queries in this release, so let me know if you notice any problems with that.

## v13.0.0 (2018-07-25)
- changed how hiddenInput option works, to make it compatible with initialising the plugin on multiple inputs at once (so now if your input name contains square brackets then it will give the hidden input the same name, replacing the contents of the brackets with the given name)
- removed an undocumented `utilsScriptDeferred` argument to static method `loadUtils` which is no longer needed
- lots of bug fixes

## v12.4.0 (2018-06-24)


## v12.3.0 (2018-06-10)


## v12.2.0 (2018-06-09)


## v12.1.0 (2017-09-25)
- added new setPlaceholderNumberType public method

## v12.0.0 (2017-07-30)
- added new hiddenInput option
- trigger new open/close dropdown events

## v11.1.0 (2017-07-01)
- now triggers `close:countrydropdown` event

## v11.0.0 (2017-02-05)
- Drop support for IE8 (see readme). There are no actual changes in this release, it just marks a line in the sand where future changes will no longer consider IE8.


## v10.0.0 (2016-12-11)
- rename numberType option to placeholderNumberType
- rename formatOnInit to formatOnDisplay


## v9.2.0 (2016-10-01)
- separate `allowDropdown` and `separateDialCode` options
- make defaults object accessible from outside
- bug fixes


## v9.1.0 (2016-09-29)
- updated autoPlaceholder option to accept "off", "polite" and "aggressive"


## v9.0.3 (2016-07-14)


## v9.0.0 (2016-06-11)
- BREAKING CHANGE: removed 2nd arg from setNumber
- optimize PNGs
- update libphonenumber to v7.3.2
- remove cookie stuff (easy to do yourself)
- added support for jquery 3
- added kosovo


## v8.5.2 (2016-04-27)


## v8.5.0 (2016-04-19)
- autoHideDialCode now works on submit as well


## v8.4.7 (2016-03-09)


## v8.4.6 (2016-03-09)


## v8.4.5 (2016-03-06)


## v8.4.3 (2016-02-23)


## v8.4.0 (2016-02-19)
- added formatOnInit option (defaults to true)


## v8.3.1 (2016-02-19)


## v8.3.0 (2016-02-18)
- bug fixes (along with lots more tests)
- re-added getExtension method, which now uses libphonenumber internally for more reliable results


## v8.2.0 (2016-02-17)
- added separateDialCode option


## v8.1.0 (2016-02-15)
- added allowDropdown option (defaults to true)


## v8.0.1 (2016-02-15)


## v8.0.0 (2016-02-11)
- removed autoFormat functionality - see issue 346
- removed allowExtensions and getExtension as a result
- country dropdown now a custom full-screen popup on mobile
- rename country-change event to countrychange for consistency
- trigger countrychange event whenever the country changes


## v7.1.0 (2016-01-11)
- set autoFormat option to default to false due to known UX issue
- trigger custom `country-change` event when user selects a country


## v7.0.0 (2015-12-20)
- changed loadUtils to be a static method
- rename selectCountry to setCountry
- rename defaultCountry to initialCountry
- lots of tidy up and bug fixes


## v6.4.0 (2015-10-15)
- added excludeCountries option

## v6.3.0 (2015-10-11)
* added dropdownContainer option

## v6.2.0 (2015-09-27)


## v6.1.0 (2015-09-16)
* Made Sass variables overridable
* Updated libphonenumber to v7.0.11
* Added version number into js
* Added customPlaceholder option
* Added CommonJS support
* Lots of bug fixes

## v6.0.0 (2015-06-05)
* BREAKING: Updated defaultCountry=auto system to use new geoIpLookup function option

## v5.8.0 (2015-03-14)
* if set defaultCountry=auto and use jquery-cookie plugin, then store the loaded country code in a cookie for future use
* other bug fixes

## v5.7.0 (2015-03-03)
* setNumber now accepts a 2nd format arg (only works for valid numbers)

## v5.6.0 (2015-03-02)
* new wikimedia commons flag icons

## v5.5.0 (2015-02-28)
* return a deferred object, so dev can use .done() to know when the plugin has finished initialising

## v5.4.0 (2015-02-22)
* use a native select for dropdown on mobile

## v5.3.0 (2015-02-21)
* retina flag icons

## v5.2.0 (2015-02-21)
* on clear input: default to last selected flag
* other bug fixes

## v5.1.0 (2015-02-06)
* Added allowExtensions option - defaults to false

## v5.0.0 (2015-01-20)
* Empty state for flag when invalid dial code
* Removed preventInvalidNumbers as was wrongly using libphonenumber's AsYouTypeFormatter, which was broken and they explicitly said shouldn't be used for that
* Added default flash styling on autoFormat's invalid char event, which can easily be overridden

## v4.0.0 (2015-01-15)
* Defaulted `nationalMode` to true because it's a better experience for the user
* Rename `getCleanNumber` to `getNumber` and take a format type arg
* Remove `responsiveDropdown` option and just trigger automatically on small screens
* Remove useless `setCountryData` method
* Change flag CSS from `.intl-tel-input .flag` to `.iti-flag` to reduce CSS filesize and allow easier re-use

## v3.8.0 (2015-01-11)
* Added preventInvalidNumbers option
* Set autocomplete="off" on input to prevent inconsistencies
* Support readonly inputs
* Trigger `input` event when autoFormat is enabled

## v3.7.0 (2014-11-02)
* ipinfoToken option, which is required for ipinfo https support
* bug fixes

## v3.6.0 (2014-10-09)
* autoFormat feature: trigger custom `invalidkey` event on invalid key press so can give user feedback
* tweak autoFormat delete key behaviour: no reformat if delete and cursorAtEnd, never add format suffix on delete - this should also fix an IE8 issue with autoFormat

## v3.5.0 (2014-10-03)
* Added numberType option

## v3.4.0 (2014-09-29)
* Can now set defaultCountry to "auto"

## v3.3.0 (2014-09-28)
* Added public method getValidationError
* Updated libphonenumber
* Fail gracefully if call selectCountry with invalid countryCode

## v3.2.0 (2014-09-27)
* Added loadUtils method
* Bug fixes

## v3.1.0 (2014-09-21)
* Added public method getNumberType
* Added public method getCleanNumber
* Added support for maxlength attribute on the input
* autoFormat now prevents further input when the formatting fails i.e. no longer a potentially valid number
* Other bug fixes

## v3.0.0 (2014-09-07)
* isValidNumber now works in nationalMode
* country-specific placeholders, which auto update (and also work in nationalMode)
* autoFormat now works for all countries as now uses libphonenumber (and now works in nationalMode too)
* cursor-to-end on tab (if autoHideDialCode enabled)
* handle North American Numbering Plan area codes (e.g. change to Canada if type "+1204")
* removed static formatNumber method as doesnt really make sense as relies on an instance of the plugin to load the utils script
* reduced filesize of data.js by generating allCountryCodes on the fly, and removing some obscure countries
* reduced filesize of flags.png by removing unused flags
* lots of bug fixes and new tests written

## v2.0.0 (2014-07-13)
* Automatically format the number as the user types
* Full type-to-search in dropdown
* Removed defaultStyling option as hadn't seen anyone using it and it felt like bloat
* Removed dialCodeDelimiter option as superseded by autoFormat option
* Lots of other bug fixes and improvements

## v1.2.0 (2014-07-02)
* reduced filesize from country data
* compress css to reduce filesize
* fixes to country data (canada and Caribbean Netherlands)
* more tests
* added public destroy method
* removed redundant defaultStyling=none option
* added responsiveDropdown option
* full type to search
* lots of bug fixes

## v1.1.0 (2014-03-03)
* validation script now waits for the load event
* fixed issue with specificity on critical input styling
* when auto-inserting DC, if user hits + then assume typing new number so wipe the DC
* added allowNational argument for public isValidNumber method
* fixed issue with unbinding keypress event
* selecting another country then deleting the dial code no longer takes you back to the default country
* replaced americaMode with more generic nationalMode

## v1.0.0 (2014-02-24)
* fixed issue on IE: selecting flag puts cursor at beginning
* position the dropdown above the input depending on layout/scroll
* added validation via the validationScript option

## v0.9.17 (2014-02-22)
* fixed issue with autoHideDialCode option, where sometimes clicking the input to focus it would leave the cursor in the middle of the dial code (or to the left of it)

## v0.9.16 (2014-02-09)


## v0.9.15 (2014-02-09)
* improved vertical centering and made arrow smaller
* renamed option to dialCodeDelimiter
* 2 new examples (plus syntax highlighting on examples)

## v0.9.14 (2014-02-01)
* fixed issue in firefox: vertical margin on input breaks alignment
* CSS tidyup / alignment fixes
* JS abstraction / tidyup
* arrow now points up while dropdown open
* added title attribute to selected flag (try hovering the selected flag!)
* added getSelectedCountryData public method

## v0.9.13 (2014-01-21)
* fixed regression: input with vertical margin breaks flag alignment

## v0.9.12 (2014-01-21)
* fixed issue with default delimiter and autoHideDialCode option

## v0.9.11 (2014-01-21)
* allow dial code delimiter to be overridden
* Wrap in UMD (so that it supports AMD)
* fixed issue: enter on dropdown submits form
* improved default styling
* new flags
* updated country data to show 24 more countries
* abstracted lots of new functions from plugin init method

## v0.9.10 (2014-01-15)
* Bug fixes

## v0.9.9 (2014-01-13)


## v0.9.8 (2014-01-13)
* Examples

## v0.9.7 (2014-01-13)
* fire `change` event on the input when changing countries
* fixed issue where dial codes were ignored if they had a space in
* fixed issue: changing flag doesnt update number when dial code contains space/dot etc
* lots more tests
* disabled dropdown/hover states when input disabled
* support inputs of any height
* fixed issue where hitting enter to select a list item didnt close the dropdown
* updated defaultStyling option to allow positioning selected flag outside input

## v0.9.6 (2013-12-16)
* Removed initialDialCode option as made redundant by autoHideDialCode option
* Added defaultCountry option

## v0.9.5 (2013-11-25)
* Option initialDialCode now defaults to false
* Added option autoHideDialCode, which defaults to true
* Added public method setNumber
* Added static methods getCountryData and setCountryData

## v0.9.4 (2013-10-27)


## v0.9.3 (2013-10-24)
* Fixed issues with instantiating the plugin on multiple inputs
* Added defaultStyling option
* Added localised country names in brackets

## v0.9.2 (2013-10-13)
* Added some tests.
