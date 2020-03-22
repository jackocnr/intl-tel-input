# Changelog

## v16.0.0 (2019-06-23)
Breaking changes

- Switched CSS class names to use BEM, so you shouldn't get any more clashes with generic class names like "highlight"
- All NANP countries now have just +1 as their dialCode, when some used to include the area code e.g. Barbados used to have dial code +1246 and now has just +1.

## v15.1.0 (2019-05-23)
- Accessibility: focus highlighted list item

## v15.0.0 (2019-02-10)
Change behaviour of autoHideDialCode option

It still clears the input on blur/submit if it just contains a dial code, but now it no longer re-adds it on focus. This is due to a bug (#847): when submitting the form with an empty (but required) input, the browser displayed an error on the input and also focusing it, which caused the plugin to automatically add the dial code which then triggered the browser to remove the error again instantly, so it could actually never be seen. I have also just come to believe more generally that injecting a value on focus is unexpected and dangerous, and so should be avoided.

## v14.1.0 (2019-02-09)
- added `getInstance` static method

## v14.0.6 (2019-01-02)


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
