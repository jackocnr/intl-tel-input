#### IMPORTANT: since v14 we have removed the jQuery dependency. See below for how to initialise and use the plugin with pure JavaScript. If you want to stick with the jQuery version, there is now a separate jQuery wrapped version.
---

# International Telephone Input [![Build Status](https://travis-ci.org/jackocnr/intl-tel-input.svg?branch=master)](https://travis-ci.org/jackocnr/intl-tel-input) <img src="https://img.shields.io/github/package-json/v/jackocnr/intl-tel-input.svg" /> <img src="https://img.shields.io/npm/dm/intl-tel-input.svg" />
A JavaScript plugin for entering and validating international telephone numbers. It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla.png" width="424px" height="246px">

If you like it, please consider making a donation, which you can do from [the demo page](http://intl-tel-input.com).

## Table of Contents

- [Demo and Examples](#demo-and-examples)
- [Features](#features)
- [Browser Compatibility](#browser-compatibility)
- [Getting Started](#getting-started-using-a-bundler-eg-webpack)
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
You can view a live demo and some examples of how to use the various options here: http://intl-tel-input.com, or try it for yourself using the included demo.html.


## Features
* Automatically select the user's current country using an IP lookup
* Automatically set the input placeholder to an example number for the selected country
* Navigate the country dropdown by typing a country's name, or using up/down keys
* Handle phone number extensions
* The user types their national number and the plugin gives you the full standardized international number
* Full validation, including specific error types
* Retina flag icons
* Lots of initialisation options for customisation, as well as public methods for interaction


## Browser Compatibility
| Chrome |  FF  | Safari |  IE  | Chrome Android | Mobile Safari | IE Mob |
| :----: | :--: | :----: | :--: | :------------: | :-----------: | :----: |
|    ✓   |   ✓  |    ✓   |  11  |       ✓        |       ✓       |    ✓   |

Note: In v12.0.0 we dropped support for IE9 and IE10, because they are no longer supported by any version of Windows - see https://www.xfive.co/blog/stop-supporting-ie10-ie9-ie8/

## Getting Started (Using a bundler e.g. Webpack)
1. Install with npm: `npm install intl-tel-input --save` or yarn: `yarn add intl-tel-input`

2. Import CSS: `import 'intl-tel-input/build/css/intlTelInput.css';`

3. Override the path to flags.png in your CSS
  ```css
  .iti__flag {background-image: url("path/to/flags.png");}

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .iti__flag {background-image: url("path/to/flags@2x.png");}
  }
  ```

4. Import JS and initialise plugin:
  ```js
  import intlTelInput from 'intl-tel-input';

  const input = document.querySelector("#phone");
  intlTelInput(input, {
      // any initialisation options go here
  });
  ```

5. **Recommended:** initialise the plugin with the `utilsScript` option to enable formatting/validation, and to allow you to extract full international numbers using `getNumber`.

## Getting Started (Not using a bundler)
1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Include the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Override the path to flags.png in your CSS
  ```css
  .iti__flag {background-image: url("path/to/flags.png");}

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .iti__flag {background-image: url("path/to/flags@2x.png");}
  }
  ```

4. Add the plugin script and initialise it on your input element
  ```html
  <input type="tel" id="phone">

  <script src="path/to/intlTelInput.js"></script>
  <script>
    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
      // any initialisation options go here
    });
  </script>
  ```

5. **Recommended:** initialise the plugin with the `utilsScript` option to enable formatting/validation, and to allow you to extract full international numbers using `getNumber`.


## Recommended Usage
We highly recommend you (lazy) load the included utils.js using the `utilsScript` option. Then the plugin is built to always deal with numbers in the full international format (e.g. "+17024181234") and convert them accordingly - even when `nationalMode` or `separateDialCode` is enabled. We recommend you get, store, and set numbers exclusively in this format for simplicity - then you don't have to deal with handling the country code separately, as full international numbers include the country code information.

You can always get the full international number (including country code) using `getNumber`, then you only have to store that one string in your database (you don't have to store the country separately), and then the next time you initialise the plugin with that number it will automatically set the country and format it according to the options you specify (e.g. if you enable `nationalMode` it will automatically remove the international dial code for you).


## Initialisation Options
When you initialise the plugin, the first argument is the input element, and the second is an object containing any initialisation options you want, which are detailed below. Note: any options that take country codes should be [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes  

**allowDropdown**  
Type: `Boolean` Default: `true`  
Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected flag is not clickable. Also we display the selected flag on the right instead because it is just a marker of state.

**~~autoFormat~~ [REMOVED]**  
Automatically format the number as the user types. Unfortunately this had to be removed for the reasons listed here: [#346 Disable and remove autoFormat feature](https://github.com/jackocnr/intl-tel-input/issues/346).

**autoHideDialCode**  
Type: `Boolean` Default: `true`  
If there is just a dial code in the input: remove it on blur or submit. This is to prevent just a dial code getting submitted with the form. Requires `nationalMode` to be set to `false`.

**autoPlaceholder**  
Type: `String` Default: `"polite"`  
Set the input's placeholder to an example number for the selected country, and update it if the country changes. You can specify the number type using the `placeholderNumberType` option. By default it is set to `"polite"`, which means it will only set the placeholder if the input doesn't already have one. You can also set it to `"aggressive"`, which will replace any existing placeholder, or `"off"`. Requires the `utilsScript` option.

**customContainer**  
Type: `String` Default: `""`  
Additional classes to add to the parent div.

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

**dropdownContainer**  
Type: `Node` Default: `null`  
Expects a node e.g. `document.body`. Instead of putting the country dropdown next to the input, append it to the specified node, and it will then be positioned absolutely next to the input using JavaScript. This is useful when the input is inside a container with `overflow: hidden`. Note that the absolute positioning can be broken by scrolling, so it will automatically close on the `window` scroll event.

**excludeCountries**  
Type: `Array` Default: `undefined`  
In the dropdown, display all countries except the ones you specify here.

**formatOnDisplay**  
Type: `Boolean` Default: `true`  
Format the input value (according to the `nationalMode` option) during initialisation, and on `setNumber`. Requires the `utilsScript` option.

**geoIpLookup**  
Type: `Function` Default: `null`  
When setting `initialCountry` to `"auto"`, you must use this option to specify a custom function that looks up the user's location, and then calls the success callback with the relevant country code. Also note that when instantiating the plugin, if the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is defined, one of those is returned under the `promise` instance property, so you can do something like `iti.promise.then(callback)` to know when initialisation requests like this have completed.

Here is an example using the [ipinfo.io](https://ipinfo.io/) service:  
```js
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(success, failure) {
    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      success(countryCode);
    });
  },
});
```
_Note that the callback must still be called in the event of an error, hence the use of `always` in this example._  
_Tip: store the result in a cookie to avoid repeat lookups!_

**hiddenInput**  
Type: `String` Default: `""`  
Add a hidden input with the given name. Alternatively, if your input name contains square brackets (e.g. `name="phone_number[main]"`) then it will give the hidden input the same name, replacing the contents of the brackets with the given name (e.g. if you init the plugin with `hiddenInput: "full"`, then in this case the hidden input would have `name="phone_number[full]"`). On submit, it will automatically populate the hidden input with the full international number (using `getNumber`). This is a quick way for people using non-Ajax forms to get the full international number, even when `nationalMode` is enabled. Avoid this option when using Ajax forms and instead just call `getNumber` to get the full international number to send in the request. _Note: requires the input to be inside a form element, as this feature works by listening for the submit event on the closest form element. Also note that since this uses `getNumber` internally, firstly it requires the `utilsScript` option, and secondly it expects a valid number and so should only be used after validation._

**initialCountry**  
Type: `String` Default: `""`  
Set the initial country selection by specifying its country code. You can also set it to `"auto"`, which will lookup the user's country based on their IP address (requires the `geoIpLookup` option - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/default-country-ip.html)). Note that the `"auto"` option will not update the country selection if the input already contains a number.

If you leave `initialCountry` blank, it will default to the first country in the list.

**localizedCountries**  
Type: `Object` Default: `{}`  
Allows to translate the countries by its given iso code e.g.:

```js
{ 'de': 'Deutschland' }
```

**nationalMode**  
Type: `Boolean` Default: `true`  
Allow users to enter national numbers (and not have to think about international dial codes). Formatting, validation and placeholders still work. Then you can use `getNumber` to extract a full international number - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/national-mode.html). This option now defaults to `true`, and it is recommended that you leave it that way as it provides a better experience for the user.

**onlyCountries**  
Type: `Array` Default: `undefined`  
In the dropdown, display only the countries you specify - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/only-countries-europe.html).

**placeholderNumberType**  
Type: `String` Default: `"MOBILE"`  
Specify [one of the keys](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L119) from the global enum `intlTelInputUtils.numberType` e.g. `"FIXED_LINE"` to set the number type to use for the placeholder.

**preferredCountries**  
Type: `Array` Default: `["us", "gb"]`  
Specify the countries to appear at the top of the list.

**~~preventInvalidNumbers~~ [REMOVED]**  
Prevent the user from entering invalid characters. Unfortunately this had to be removed for the reasons listed here: [#79 Limit Input Characters to Formatted String Length](https://github.com/jackocnr/intl-tel-input/issues/79#issuecomment-121799307).

**separateDialCode**  
Type: `Boolean` Default: `false`  
Display the country dial code next to the selected flag so it's not part of the typed number. Note that this will disable `nationalMode` because technically we are dealing with international numbers, but with the dial code separated.

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/separateDialCode.png" width="257px" height="46px">

**utilsScript**  
Type: `String` Default: `""` Example: `"build/js/utils.js"`  
Enable formatting/validation etc. by specifying the URL of the included utils.js script (or alternatively just point it to the file on [cdnjs.com](https://cdnjs.com/libraries/intl-tel-input)). The script is fetched only when the page has finished loading (on the window load event) to prevent blocking (the script is ~215KB). When instantiating the plugin, if the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is defined, one of those is returned under the `promise` instance property, so you can do something like `iti.promise.then(callback)` to know when initialisation requests like this have finished. See [Utilities Script](#utilities-script) for more information.


## Public Methods
In these examples, `iti` refers to the plugin instance which gets returned when you initialise the plugin e.g. `var iti = intlTelInput(input)`

**destroy**  
Remove the plugin from the input, and unbind any event listeners.  
```js
iti.destroy();
```

**getExtension**  
Get the extension from the current number. Requires the `utilsScript` option.
```js
var extension = iti.getExtension();
```
Returns a string e.g. if the input value was `"(702) 555-5555 ext. 1234"`, this would return `"1234"`

**getNumber**  
Get the current number in the given format (defaults to [E.164 standard](http://en.wikipedia.org/wiki/E.164)). The different formats are available in the enum `intlTelInputUtils.numberFormat` - which you can see [here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L109). Requires the `utilsScript` option. _Note that even if `nationalMode` is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  
```js
var number = iti.getNumber();
// or
var number = iti.getNumber(intlTelInputUtils.numberFormat.E164);
```
Returns a string e.g. `"+17024181234"`

**getNumberType**  
Get the type (fixed-line/mobile/toll-free etc) of the current number. Requires the `utilsScript` option.  
```js
var numberType = iti.getNumberType();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L119) in the global enum `intlTelInputUtils.numberType` e.g.  
```js
if (numberType === intlTelInputUtils.numberType.MOBILE) {
    // is a mobile number
}
```
_Note that in the US there's no way to differentiate between fixed-line and mobile numbers, so instead it will return `FIXED_LINE_OR_MOBILE`._

**getSelectedCountryData**  
Get the country data for the currently selected flag.  
```js
var countryData = iti.getSelectedCountryData();
```
Returns something like this:
```js
{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
  dialCode: "93"
}
```

**getValidationError**  
Get more information about a validation error. Requires the `utilsScript` option.  
```js
var error = iti.getValidationError();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L153) in the global enum `intlTelInputUtils.validationError` e.g.  
```js
if (error === intlTelInputUtils.validationError.TOO_SHORT) {
    // the number is too short
}
```

**isValidNumber**  
Validate the current number - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/is-valid-number.html). Expects an internationally formatted number (unless `nationalMode` is enabled). If validation fails, you can use `getValidationError` to get more information. Requires the `utilsScript` option. Also see `getNumberType` if you want to make sure the user enters a certain type of number e.g. a mobile number.  
```js
var isValid = iti.isValidNumber();
```
Returns: `true`/`false`

**setCountry**  
Change the country selection (e.g. when the user is entering their address).  
```js
iti.setCountry("gb");
```

**setNumber**  
Insert a number, and update the selected flag accordingly. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number according to the `nationalMode` option._  
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
Get all of the plugin's country data - either to re-use elsewhere e.g. to populate a country dropdown - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/country-sync.html), or to modify - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/modify-country-data.html). Note that any modifications must be done before initialising the plugin.  
```js
var countryData = window.intlTelInputGlobals.getCountryData();
```
Returns an array of country objects:
```js
[{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
  dialCode: "93"
}, ...]
```

**getInstance**  
After initialising the plugin, you can always access the instance again using this method, by just passing in the relevant input element.
```js
var input = document.querySelector('#phone');
var iti = window.intlTelInputGlobals.getInstance(input);
iti.isValidNumber(); // etc
```

**loadUtils**  
An alternative to the `utilsScript` option, this method lets you manually load the utils.js script on demand, to enable formatting/validation etc. See [Utilities Script](#utilities-script) for more information. This method should only be called once per page. If the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is defined, one of those is returned so you can use `loadUtils().then(callback)` to know when it's finished.
```js
window.intlTelInputGlobals.loadUtils("build/js/utils.js");
```

**~~setCountryData~~ [REMOVED]**  
Set the plugin's country data. This method was removed because it makes much more sense to just use `getCountryData` and then modify that ([see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/modify-country-data.html)) instead of having to generate the whole thing yourself - the country data has become increasingly complicated and for each country we now have five properties: the name, [iso2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), international dial code, priority (in case two countries have the same international dial code), and finally a list of area codes used in that country - see [data.js](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/data.js#L36) for more info.


## Events
You can listen for the following events on the input.

**countrychange**  
This is triggered when the user selects a country from the dropdown.
```js
input.addEventListener("countrychange", function() {
  // do something with iti.getSelectedCountryData()
});
```
See an example here: [Country sync](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/country-sync.html)  

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
  var e = document.createEvent('Event');
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
A couple of CSS fixes are required to get the plugin to play nice with Bootstrap [input groups](https://getbootstrap.com/docs/3.3/components/#input-groups). You can see a Codepen [here](http://codepen.io/jackocnr/pen/EyPXed).  
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
* List of [sites using intl-tel-input](https://github.com/jackocnr/intl-tel-input/wiki/Sites-using-intl-tel-input)
* List of [integrations with intl-tel-input](https://github.com/jackocnr/intl-tel-input/wiki/Integrations)
* Android native port: [IntlPhoneInput](https://github.com/Rimoto/IntlPhoneInput)
* Typescript type definitions are available in the [DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/intl-tel-input/index.d.ts) (more info [here](https://github.com/jackocnr/intl-tel-input/issues/433#issuecomment-228517623))

<img width="200" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" /><br />
Testing powered by [BrowserStack Open-Source Program](https://www.browserstack.com/open-source)
