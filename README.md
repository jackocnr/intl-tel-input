# International Telephone Input [![Build Status](https://app.travis-ci.com/jackocnr/intl-tel-input.svg?branch=master)](https://app.travis-ci.com/jackocnr/intl-tel-input) <img src="https://img.shields.io/github/package-json/v/jackocnr/intl-tel-input.svg" /> <img src="https://img.shields.io/npm/dm/intl-tel-input.svg" />

🎉 NEWS: we now have our own <a href="https://intl-tel-input.com/examples/react-component.html">React component</a>! Play with it on <a href="https://intl-tel-input.com/storybook/">Storybook</a>! 🎉  

A JavaScript plugin for entering and validating international telephone numbers. It adds a (searchable) country dropdown to any input, detects the user's country, displays a relevant placeholder number, formats the number as you type, and provides comprehensive validation methods.

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-search.png" alt="Screenshot" width="238px" style="max-width: 100%" />
  
If you find the plugin helpful, please consider [supporting the project](https://github.com/sponsors/jackocnr).

## Sponsored by
<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/twilio.png" height="100" />
Use <a href="https://www.twilio.com/blog/international-telephone-input-twilio?utm_source=github&utm_medium=referral&utm_campaign=intl_tel_input">Twilio's API to build phone verification, SMS 2FA, appointment reminders, marketing notifications and so much more</a>. We can't wait to see what you build.

## Table of Contents

- [Demo and Examples](#demo-and-examples)
- [Features](#features)
- [Browser Compatibility](#browser-compatibility)
- [Getting Started](#getting-started-using-a-cdn)
- [Recommended Usage](#recommended-usage)
- [Options](#initialisation-options)
- [Public Methods](#public-methods)
- [Static Methods](#static-methods)
- [Events](#events)
- [Utilities Script](#utilities-script)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Attributions](#attributions)


## Demo and Examples
You can view [a live demo](https://intl-tel-input.com) and see some examples of how to use the various options. Alternatively, try it for yourself by downloading the project and opening demo.html in a browser.


## Mobile
By default, on mobile devices we show a fullscreen popup instead of the inline dropdown, to make better use of the limited screen space. This is similar to how a native `<select>` element works. You can control this behaviour with the `useFullscreenPopup` option. The popup can be closed by either selecting a country from the list or by tapping on the grey area at the sides. [See example](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--usefullscreenpopup) (using the React component).

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/mobile-fullscreen.jpg" alt="Mobile screenshot" width="270px" style="max-width: 100%" />


## Features
* Automatically select the user's current country using an IP lookup
* Automatically set the input placeholder to an example number for the selected country
* Navigate the country dropdown by typing a country's name, or using up/down keys
* Automatically format the number as the user types
* Handle phone number extensions
* The user types their national number and the plugin gives you the full standardized international number
* Full validation, including specific error types
* Retina flag icons
* Lots of initialisation options for customisation, as well as public methods for interaction
* Accessibility provided via ARIA tags based on [W3's Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)


## Browser Compatibility
| Chrome |  Firefox  | Safari | Edge |
| :----: | :-------: | :----: | :--: |
|    ✓   |     ✓     |    ✓   |   ✓  |

_Note: We have now dropped support for all versions of Internet Explorer because it is [no longer supported](https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/) by any version of Windows._

## Getting Started (Using a CDN)
1. Add the CSS
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.7/build/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.7/build/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.7/build/js/utils.js",
    });
  </script>
  ```

## Getting Started (Using a bundler e.g. Webpack)
1. Install with npm: `npm install intl-tel-input --save` or yarn: `yarn add intl-tel-input`

2. Import the CSS: `import 'intl-tel-input/build/css/intlTelInput.css';`

3. Override the path to globe.png and flags.png in your CSS
  ```css
  .iti__globe { background-image: url("path/to/globe.png"); }
  .iti__flag { background-image: url("path/to/flags.png"); }

  @media (min-resolution: 2x) {
    .iti__globe { background-image: url("path/to/globe@2x.png"); }
    .iti__flag { background-image: url("path/to/flags@2x.png"); }
  }
  ```

4. Import the JS and initialise the plugin on your input element
  ```js
  import intlTelInput from 'intl-tel-input';

  const input = document.querySelector("#phone");
  intlTelInput(input, {
      utilsScript: "path/to/utils.js"
  });
  ```

## Getting Started (Not using a bundler)
1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Add the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Override the path to globe.png and flags.png in your CSS
  ```css
  .iti__globe { background-image: url("path/to/globe.png"); }
  .iti__flag { background-image: url("path/to/flags.png"); }

  @media (min-resolution: 2x) {
    .iti__globe { background-image: url("path/to/globe@2x.png"); }
    .iti__flag { background-image: url("path/to/flags@2x.png"); }
  }
  ```

4. Add the plugin script and initialise it on your input element
  ```html
  <script src="path/to/intlTelInput.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      utilsScript: "path/to/utils.js"
    });
  </script>
  ```

## Recommended Usage
We highly recommend you (lazy) load the included utils.js using the `utilsScript` option. Then the plugin is built to always deal with numbers in the full international format (e.g. "+17024181234") and convert them accordingly - even when `nationalMode` or `showSelectedDialCode` is enabled. We recommend you get, store, and set numbers exclusively in this format for simplicity - then you don't have to deal with handling the country code separately, as full international numbers include the country code information.

You can always get the full international number (including country code) using `getNumber`, then you only have to store that one string in your database (you don't have to store the country separately), and then the next time you initialise the plugin with that number it will automatically set the country and format it according to the options you specify (e.g. when using `nationalMode` it will automatically display the number in national format, removing the international dial code).

Finally, make sure you have `<meta charset="utf-8">` in the `<head>` section of your page, else you will get an error as the JS contains some special unicode characters for localised country names.


## Initialisation Options
When you initialise the plugin, the first argument is the input element, and the second is an object containing any initialisation options you want, which are detailed below. Note: any options that take country codes should be [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes.  

**allowDropdown**  
Type: `Boolean` Default: `true`  
Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected flag is not clickable. Also, we display the selected flag on the right instead because it is just a marker of state. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--allowdropdown) (using the React component).

**autoInsertDialCode**  
Type: `Boolean` Default: `false`  
When enabled (requires `nationalMode` to be disabled), the international dial code will be automatically inserted into the input in 3 situations: (A) upon initialisation, and (B) when the user selects a country from the dropdown, and (C) upon calling `setCountry`. Additionally, the plugin will listen for blur/submit events, and if the input only contains a dial code, it will automatically be removed to avoid submitting just that. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--autoinsertdialcode) (using the React component).

**autoPlaceholder**  
Type: `String` Default: `"polite"`  
Set the input's placeholder to an example number for the selected country, and update it if the country changes. You can specify the number type using the `placeholderNumberType` option. By default it is set to `"polite"`, which means it will only set the placeholder if the input doesn't already have one. You can also set it to `"aggressive"`, which will replace any existing placeholder, or `"off"`. Requires the `utilsScript` option.

**containerClass**  
Type: `String` Default: `""`  
Additional classes to add to the (injected) wrapper `<div>`.

**countrySearch**  
Type: `Boolean` Default: `true`  
Add a search input to the top of the dropdown, so users can filter the displayed countries.

**customPlaceholder**  
Type: `Function` Default: `null`  
Change the placeholder generated by autoPlaceholder. Must return a string.

```js
intlTelInput(input, {
  customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    return "e.g. " + selectedCountryPlaceholder;
  },
});
```

**defaultToFirstCountry**  
Type: `Boolean` Default: `true`  
Upon initialisation, if no country is selected then default to the first country in the list (including `preferredCountries`). If set to `false`, there will be no country selected to begin with, and it will show a generic globe icon (see below). Note that in some cases, setting an (incorrect) initial country for the user can result in them successfully submitting phone numbers with the wrong dial code. This can happen if, for example, Australia is selected by default (e.g. because it's the first of the `preferredCountries`), and then a user from New Zealand autofills their (national) phone number without noticing the wrong country is selected, and submits the form. In this case, the number validates as true because the two countries share very similar number patterns, and it gets saved with an Australian dial code, thus making the phone number unusable. To avoid this issue, set `defaultToFirstCountry` to `false`. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--defaulttofirstcountry) (using the React component).

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/empty-country.png" width="240px" height="53px">

**dropdownContainer**  
Type: `Node` Default: `null`  
Expects a node e.g. `document.body`. Instead of putting the country dropdown markup next to the input, append it to the specified node, and it will then be positioned next to the input using JavaScript (using `position: fixed`). This is useful when the input is inside a container with `overflow: hidden`. Note that the positioning is broken by scrolling, so the dropdown will automatically close on the `window` scroll event.

**excludeCountries**  
Type: `Array` Default: `[]`  
In the dropdown, display all countries except the ones you specify here. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--excludecountries) (using the React component).

**fixDropdownWidth**  
Type: `Boolean` Default: `true`  
Fix the dropdown width to the input width (rather than being as wide as the longest country name). This is automatically enabled when `countrySearch` is enabled for design reasons. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--fixdropdownwidth) (using the React component).

**formatAsYouType**  
Type: `Boolean` Default: `true`  
Automatically format the number as the user types. This feature will be disabled if the user types their own formatting characters. Requires the `utilsScript` option.

**formatOnDisplay**  
Type: `Boolean` Default: `true`  
Format the input value (according to the `nationalMode` option) during initialisation, and on `setNumber`. Requires the `utilsScript` option.

**geoIpLookup**  
Type: `Function` Default: `null`  
When setting `initialCountry` to `"auto"`, you must use this option to specify a custom function that calls an IP lookup service to get the user's location and then invokes the callback with the relevant country code. Also note that when instantiating the plugin, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned under the `promise` instance property, so you can do something like `iti.promise.then(callback)` to know when initialisation requests like this have completed.

Here is an example using the [ipapi](https://ipapi.co/api/?javascript#location-of-clients-ip) service:  
```js
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(callback) {
    fetch("https://ipapi.co/json")
      .then(function(res) { return res.json(); })
      .then(function(data) { callback(data.country_code); })
      .catch(function() { callback(); });
  }
});
```
_Note that the callback must still be called in the event of an error, hence the use of `catch()` in this example. Tip: store the result in a cookie to avoid repeat lookups!_

**hiddenInput**  
Type: `Function` Default: `null`  
Allows the creation of hidden input fields within a form to store the full international telephone number and the selected country code. It accepts a function that receives the name of the main telephone input as an argument. This function can return either a string or an object:

- **String:** The function returns a string to name the hidden input for the full phone number. A second hidden input for the country code is automatically generated, appending "_country" to the provided name.
- **Object:** For more explicit naming, return an object with `phone` and `country` properties to specify the names of the hidden inputs for the phone number and country code, respectively.

This is useful for non-Ajax form submissions to ensure the full international number and country code are captured, especially when `nationalMode` is enabled.

***Note**: This feature requires the input to be inside a `<form>` element, as it listens for the `submit` event on the closest form element. Also note that since this uses `getNumber` internally, firstly it requires the `utilsScript` option, and secondly it expects a valid number and so will only work correctly if you have used `isValidNumber` to validate the number before allowing the form submit to go through.

```js
intlTelInput(input, {
  hiddenInput: function(telInputName) {
    // Return a string or an object with 'phone' and 'country' keys
    return "phone_full"; // or { phone: "phone_full", country: "country_code" }
  }
});
```

**i18n**  
Type: `Object` Default: `{}`  
Allow localisation/customisation of country names and other plugin text. To localise a country name, the key should be the iso2 country code, and the value should be the localised country name. [See example](https://intl-tel-input.com/examples/localise-countries.html).

```js
intlTelInput(input, {
  i18n: {
    // Country names
    fr: "Frankreich",
    de: "Deutschland",
    es: "Spanien",
    it: "Italien",
    ch: "Schweiz",
    nl: "Niederlande",
    at: "Österreich",
    dk: "Dänemark",
    // Other plugin text
    selectedCountryAriaLabel: 'Ausgewähltes Land',
    countryListAriaLabel: 'Liste der Länder',
    searchPlaceholder: 'Suchen',
  }
});
```

**initialCountry**  
Type: `String` Default: `""`  
Set the initial country selection by specifying its country code. You can also set it to `"auto"`, which will lookup the user's country based on their IP address (requires the `geoIpLookup` option - [see example](https://intl-tel-input.com/examples/lookup-country.html)). Note that the `"auto"` option will not update the country selection if the input already contains a number.

If you leave `initialCountry` blank, it will default to the first country in the list.

**nationalMode**  
Type: `Boolean` Default: `true`  
Format numbers in the national format, rather than the international format. This applies to placeholder numbers, and when displaying user's existing numbers. Note that it's fine for user's to type their numbers in national format - as long as they have selected the right country, you can use `getNumber` to extract a full international number - [see example](https://intl-tel-input.com/examples/national-mode.html). It is recommended to leave this option enabled, to encourage users to enter their numbers in national format as this is usually more familiar to them and so it creates a better user experience.

**onlyCountries**  
Type: `Array` Default: `[]`  
In the dropdown, display only the countries you specify - [see example](https://intl-tel-input.com/examples/only-countries.html).

**placeholderNumberType**  
Type: `String` Default: `"MOBILE"`  
Specify [one of the keys](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L162) from the global enum `intlTelInputUtils.numberType` e.g. `"FIXED_LINE"` to set the number type to use for the placeholder. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--placeholdernumbertype) (using the React component).

**preferredCountries**  
Type: `Array` Default: `[]`  
Specify the countries to appear at the top of the list. Note that this option is not compatible with the `countrySearch` feature, and so that needs to be disabled for this to work. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--preferredcountries) (using the React component).

**showFlags**  
Type: `Boolean` Default: `true`  
Set this to false to hide the flags e.g. for political reasons. Must be used in combination with `showSelectedDialCode` option, or with setting `allowDropdown` to `false`. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--showflags) (using the React component).

**showSelectedDialCode**  
Type: `Boolean` Default: `false`  
Display the country dial code next to the selected flag. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--showselecteddialcode) (using the React component).

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/separateDialCode.png" width="257px" height="46px">

**useFullscreenPopup**  
Type: `Boolean` Default: `true on mobile devices, false otherwise`  
Control when the country list appears as a fullscreen popup vs an inline dropdown. By default, it will appear as a fullscreen popup on mobile devices (based on user-agent and screen width), to make better use of the limited space (similar to how a native `<select>` works), and as an inline dropdown on larger devices/screens. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--usefullscreenpopup) (using the React component).

**utilsScript**  
Type: `String` Default: `""` Example: `"build/js/utils.js"`  
Enable formatting/validation etc. by specifying the URL of the included utils.js script (or alternatively just point it to the file on [cdnjs.com](https://cdnjs.com/libraries/intl-tel-input)). The script is fetched only when the page has finished loading (on the window load event) to prevent blocking (the script is ~215KB). When instantiating the plugin, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned under the `promise` instance property, so you can do something like `iti.promise.then(callback)` to know when initialisation requests like this have finished. See [Utilities Script](#utilities-script) for more information.


## Public Methods
In these examples, `iti` refers to the plugin instance which gets returned when you initialise the plugin e.g.
```js
const iti = intlTelInput(input);
```

**destroy**  
Remove the plugin from the input, and unbind any event listeners.  
```js
iti.destroy();
```

**getExtension**  
Get the extension from the current number. Requires the `utilsScript` option.
```js
const extension = iti.getExtension();
```
Returns a string e.g. if the input value was `"(702) 555-5555 ext. 1234"`, this would return `"1234"`

**getNumber**  
Get the current number in the given format (defaults to [E.164 standard](https://en.wikipedia.org/wiki/E.164)). The different formats are available in the enum `intlTelInputUtils.numberFormat` - which you can see [here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L153). Requires the `utilsScript` option. _Note that even if `nationalMode` is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  
```js
const number = iti.getNumber();
// or
const number = iti.getNumber(intlTelInputUtils.numberFormat.E164);
```
Returns a string e.g. `"+17024181234"`

**getNumberType**  
Get the type (fixed-line/mobile/toll-free etc) of the current number. Requires the `utilsScript` option.  
```js
const numberType = iti.getNumberType();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L162) in the global enum `intlTelInputUtils.numberType` e.g.  
```js
if (numberType === intlTelInputUtils.numberType.MOBILE) {
    // is a mobile number
}
```
_Note that in the US there's no way to differentiate between fixed-line and mobile numbers, so instead it will return `FIXED_LINE_OR_MOBILE`._

**getSelectedCountryData**  
Get the country data for the currently selected flag.  
```js
const countryData = iti.getSelectedCountryData();
```
Returns something like this:
```js
{
  name: "Afghanistan",
  iso2: "af",
  dialCode: "93"
}
```

**getValidationError**  
Get more information about a validation error. Requires the `utilsScript` option.  
```js
const error = iti.getValidationError();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L178) in the global enum `intlTelInputUtils.validationError` e.g.  
```js
if (error === intlTelInputUtils.validationError.TOO_SHORT) {
    // the number is too short
}
```

**isValidNumber**  
Check if the current number is valid based on its length - [see example](https://intl-tel-input.com/examples/validation-practical.html), which should be sufficient for most use cases. See `isValidNumberPrecise` for more precise validation, but the advantage of `isValidNumber` is that it is much more future-proof as while countries around the world regularly update their number rules, they very rarely change their number lengths. If it returns false, you can use `getValidationError` to get more information. Requires the `utilsScript` option. Note that in some countries there are several different types of numbers which can be valid at various lengths. For example, in the UK, mobile numbers are always 11 digits long (in national format, e.g. "07400123456"), while other kinds of numbers can be valid at lengths of 8, 9 and 10, and so when the UK is selected, by default `isValidNumber` will return `true` for any number between 8-11 digits. If you're only dealing with mobile numbers, you can pass `true` as the first argument to `isValidNumber` to only validate using mobile number rules, so for the UK, it will only return `true` for numbers with 11 digits.
```js
const isValid = iti.isValidNumber();
// or for mobile only:
const isValidMobile = iti.isValidNumber(true);
```
Returns: `true`/`false`

**isValidNumberPrecise**  
Check if the current number is valid using precise matching rules for each country/area code etc - [see example](https://intl-tel-input.com/examples/validation.html). Note that these rules change each month for various countries around the world, so you need to be careful to keep the plugin up-to-date else you will start rejecting valid numbers. For a simpler and more future-proof form of validation, see `isValidNumber` above. If validation fails, you can use `getValidationError` to get more information. Requires the `utilsScript` option.  
```js
const isValid = iti.isValidNumberPrecise();
```
Returns: `true`/`false`

**setCountry**  
Change the country selection (e.g. when the user is entering their address).  
```js
iti.setCountry("gb");
```

**setNumber**  
Insert a number, and update the selected flag accordingly. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number to either national or international format according to the `nationalMode` option._  
```js
iti.setNumber("+447733123456");
```

**setPlaceholderNumberType**  
Change the placeholderNumberType option.
```js
iti.setPlaceholderNumberType("FIXED_LINE");
```


## Static Methods

**getCountryData**  
Retrieve the plugin's country data - either to re-use elsewhere e.g. to generate your own country dropdown - [see example](https://intl-tel-input.com/examples/country-sync.html), or alternatively, you could use it to modify the country data. Note that any modifications must be done before initialising the plugin.  
```js
const countryData = window.intlTelInputGlobals.getCountryData();
```
Returns an array of country objects:
```js
[{
  name: "Afghanistan",
  iso2: "af",
  dialCode: "93"
}, ...]
```

**getInstance**  
After initialising the plugin, you can always access the instance again using this method, by just passing in the relevant input element.
```js
const input = document.querySelector('#phone');
const iti = window.intlTelInputGlobals.getInstance(input);
iti.isValidNumber(); // etc
```

**loadUtils**  
An alternative to the `utilsScript` option, this method lets you manually load the utils.js script on demand, to enable formatting/validation etc. See [Utilities Script](#utilities-script) for more information. This method should only be called once per page. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned so you can use `loadUtils().then(callback)` to know when it's finished.
```js
window.intlTelInputGlobals.loadUtils("build/js/utils.js");
```

## Events
You can listen for the following events on the input.

**countrychange**  
This is triggered when the selected flag is updated e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call `setCountry` etc.
```js
input.addEventListener("countrychange", function() {
  // do something with iti.getSelectedCountryData()
});
```
See an example here: [Country sync](https://intl-tel-input.com/examples/country-sync.html)  

**open:countrydropdown**  
This is triggered when the user opens the dropdown.  

**close:countrydropdown**  
This is triggered when the user closes the dropdown.  


## Utilities Script
The utilities script ([build/js/utils.js](build/js/utils.js)) is a custom build of Google's [libphonenumber](https://github.com/googlei18n/libphonenumber) which enables the following features:

* Formatting upon initialisation, as well as with `getNumber` and `setNumber`
* Validation with `isValidNumber`, `getNumberType` and `getValidationError` methods
* Placeholder set to an example number for the selected country - even specify the type of number (e.g. mobile) using the `placeholderNumberType` option
* Extract the standardised (E.164) international number with `getNumber` even when using the `nationalMode` option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution I have found is libphonenumber, from which I have precompiled the relevant parts into a single JavaScript file and included in the build directory. Unfortunately even after minification it is still ~215KB, but if you use the `utilsScript` option then it will only fetch the script when the page has finished loading (to prevent blocking). If size is not a concern, then you can manually include the script yourself however you like, and as long as it has loaded before you initialise the plugin then it should work fine.

To recompile the utils script yourself (e.g. to update the version of libphonenumber it is built from), see the [contributing guide](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#updating-to-a-new-version-of-libphonenumber).


## Troubleshooting

**Full width input**  
If you want your input to be full-width, you need to set the container to be the same i.e.

```css
.iti { width: 100%; }
```

**dropdownContainer: dropdown not closing on scroll**  
If you have a scrolling container other than `window` which is causing problems by not closing the dropdown on scroll, simply listen for the scroll event on that element, and trigger a scroll event on `window`, which in turn will close the dropdown e.g.

```js
scrollingElement.addEventListener("scroll", function() {
  const e = document.createEvent('Event');
  e.initEvent("scroll", true, true);
  window.dispatchEvent(e);
});
```

**Input margin**  
For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want vertical margin, you should add it to the container (with class `iti`).

**Displaying error messages**  
If your error handling code inserts an error message before the `<input>` it will break the layout. Instead you must insert it before the container (with class `iti`).

**Dropdown position**  
The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise the plugin after the `<input>` has been added to the DOM.

**Placeholders**  
In order to get the automatic country-specific placeholders, simply omit the placeholder attribute on the `<input>`.

**Bootstrap input groups**  
A couple of CSS fixes are required to get the plugin to play nice with Bootstrap [input groups](https://getbootstrap.com/docs/3.3/components/#input-groups). You can see a Codepen [here](https://codepen.io/jackocnr/pen/EyPXed).  
_Note: there is currently [a bug](https://bugs.webkit.org/show_bug.cgi?id=141822) in Mobile Safari which causes a crash when you click the dropdown arrow (a CSS triangle) inside an input group. The simplest workaround is to remove the CSS triangle with this line:_

```css
.iti__arrow { border: none; }
```


## Contributing
See the [contributing guide](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md) for instructions on setting up the project and making changes, and also for how to update to a new version of libphonenumber, or how to update the flag images.


## Attributions
* Flag images from [region-flags](https://github.com/behdad/region-flags)
* Original country data from mledoze's [World countries in JSON, CSV and XML](https://github.com/mledoze/countries)
* Formatting/validation/example number code from [libphonenumber](https://github.com/googlei18n/libphonenumber)
* Feature contributions are listed in the wiki: [Contributions](https://github.com/jackocnr/intl-tel-input/wiki/Contributions)


## Links
* List of [integrations with intl-tel-input](https://github.com/jackocnr/intl-tel-input/wiki/Integrations)
* Typescript type definitions are available in the [DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/intl-tel-input/index.d.ts) (more info [here](https://github.com/jackocnr/intl-tel-input/issues/433#issuecomment-228517623))

<img width="200" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" /><br />
Testing powered by [BrowserStack Open-Source Program](https://www.browserstack.com/open-source)

