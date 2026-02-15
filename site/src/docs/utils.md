# Utilities Script

The utilities script (src/js/utils.js) is a custom build of Google's [libphonenumber](https://github.com/googlei18n/libphonenumber) which enables the following features:

* Formatting upon initialisation, as well as with [`getNumber`](/docs/methods#getnumber) and [`setNumber`](/docs/methods#setnumber)
* Validation with [`isValidNumber`](/docs/methods#isvalidnumber), [`getNumberType`](/docs/methods#getnumbertype) and [`getValidationError`](/docs/methods#getvalidationerror) methods
* Placeholder set to an example number for the selected country - even specify the type of number (e.g. mobile) using the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option
* Extract the standardised (E.164) international number with [`getNumber`](/docs/methods#getnumber) even when using the [`nationalMode`](/docs/options#nationalmode) option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution we have found is libphonenumber, from which we have precompiled the relevant parts into a single JavaScript file, included in the build directory. Unfortunately, even after modification, it is still ~260KB. See the section below on the best way to load it.

## Loading The Utilities Script

The utils script provides lots of great functionality (see the above section), but comes at the cost of increased filesize (~260KB). There are two main ways to load the utils script, depending on whether you're concerned about filesize or not.

**Option 1: intlTelInputWithUtils**  
If you're not concerned about filesize (e.g. you're lazy loading the main plugin script), the easiest thing to do is to use the full bundle (`/build/js/intlTelInputWithUtils.js`), which comes with the utils script included. This script can be used exactly like the main intlTelInput.js - so it can either be loaded directly onto the page (which defines `window.intlTelInput` like usual), or it can be imported like so: `import intlTelInput from "intl-tel-input/intlTelInputWithUtils"`.

**Option 2: loadUtils**  
If you *are* concerned about filesize, you can lazy load the utils module when the plugin initialises, using the [`loadUtils`](/docs/options#loadutils) initialisation option.
