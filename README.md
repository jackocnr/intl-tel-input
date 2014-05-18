# International Telephone Input [![Build Status](https://travis-ci.org/Bluefieldscom/intl-tel-input.png)](https://travis-ci.org/Bluefieldscom/intl-tel-input)
A jQuery plugin for entering and validating international telephone numbers. It adds a flag dropdown to any input, which lists all the countries and their international dial codes next to their flags.


## Demo
http://jackocnr.com/intl-tel-input.html  
Try it for yourself using the included demo.html

![alt tag](https://raw.github.com/Bluefieldscom/intl-tel-input/master/screenshot.png)

## Features
* Navigate the country dropdown by typing (first letter of country name), or using up/down keys
* Selecting a country from the dropdown will update the dial code in the input
* Typing a different dial code will automatically update the displayed flag
* Country names in the dropdown also include localised versions in brackets
* Dropdown appears above or below the input depending on available space/scroll position
* Lots of initialisation options for customisation, as well as public methods for interaction


## Getting started
1. Download the [latest version](https://github.com/Bluefieldscom/intl-tel-input/archive/master.zip), or better yet install it with [Bower](http://bower.io): `bower install intl-tel-input`
2. Link the stylesheet (note that this references the image flags.png)
  ```html
  <link rel="stylesheet" href="build/css/intlTelInput.css">
  ```

3. Add the plugin script and initialise it on your input element (alternatively, use a script loader like [RequireJS](http://requirejs.org))
  ```html
  <input type="tel" id="mobile-number">
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="build/js/intlTelInput.min.js"></script>
  <script>
    $("#mobile-number").intlTelInput();
  </script>
  ```


## Options
Note: any options that take country codes should be lower case [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes  

**autoHideDialCode**  
Type: `Boolean` Default: `true`  
If there is just a dial code in the input: remove it on blur, and re-add it on focus. This is to prevent just a dial code getting submitted with the form.

**defaultCountry**  
Type: `String` Default: `""`  
Set the default country by it's country code. Otherwise it will just be the first country in the list.

**defaultStyling**  
Type: `String` Default: `"inside"`  
The position of the selected flag: `"inside"` or `"outside"` (relative to the input).

**dialCodeDelimiter**  
Type: `String` Default: `" "`  
Choose the delimiter that is inserted after the dial code when the user selects a country from the dropdown.

**nationalMode**  
Type: `Boolean` Default: `false`  
Don't insert the international dial code when the user selects a country from the dropdown.

**onlyCountries**  
Type: `Array` Default: `undefined`  
Display only the countries you specify.

**preferredCountries**  
Type: `Array` Default: `["us", "gb"]`  
Specify the countries to appear at the top of the list.

**validationScript**  
Type: `String` Default: `""` Example: `"lib/libphonenumber/build/isValidNumber.js"`  
Enable validation by specifying the URL to the included libphonenumber script. This ~200k script is fetched only when the page has finished loading (to prevent blocking), and is then accessible through the public `isValidNumber` function.


## Public methods
**destroy**  
Remove the plugin from the input, and unbind any event listeners  
```js
$("#mobile-number").intlTelInput("destroy");
```

**getSelectedCountryData**  
Get the country data for the currently selected flag  
```js
$("#mobile-number").intlTelInput("getSelectedCountryData");
```
Returns something like this:
```js
{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
  dialCode: "93"
}
```

**isValidNumber**  
Validate the current number using Google's [libphonenumber](http://libphonenumber.googlecode.com) (requires the `validationScript` option to be set correctly). Expects an internationally formatted number. Optionally pass the argument `true` to accept national numbers as well.  
```js
$("#mobile-number").intlTelInput("isValidNumber");
```
Returns: true/false

**selectCountry**  
Select a country after initialisation (e.g. when the user is entering their address)  
```js
$("#mobile-number").intlTelInput("selectCountry", "gb");
```

**setNumber**  
Insert a number, and update the selected flag accordingly  
```js
$("#mobile-number").intlTelInput("setNumber", "+44 77333 123 456");
```


## Static methods
**getCountryData**  
Get all of the plugin's country data  
```js
var countryData = $.fn.intlTelInput.getCountryData();
```
Returns an array of country objects:
```js
[{
  name: "Afghanistan (‫افغانستان‬‎)",
  iso2: "af",
  dialCode: "93"
}, ...]
```

**setCountryData**  
Set all of the plugin's country data  
```js
$.fn.intlTelInput.setCountryData(countryData);
```


## Validation
International number validation is hard (it varies by country/district). The only comprehensive solution I have found is Google's [libphonenumber](http://libphonenumber.googlecode.com), which I have precompiled into a single JavaScript file and included in the lib directory. Unfortunately even after minification it is still ~200kb, so I have included it as an optional extra. If you specify the validationScript option then it will fetch the script only when the page has finished loading (to prevent blocking), and will then be accessible through the public `isValidNumber` function.


## CSS
**Image path**  
Depending on your project setup, you may need to override the path to flags.png in your CSS.  
```css
.intl-tel-input .flag {background-image: url("path/to/flags.png");}
```

**Input margin**  
For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want vertical margin, you should add it to the container (with class `intl-tel-input`).

**Displaying error messages**  
If your error handling code inserts an error message before the `<input>` it will break the layout. Instead you must insert it before the container (with class `intl-tel-input`).


## Attributions
* Flag images and CSS from https://github.com/tkrotoff/famfamfam_flags
* Country data from https://github.com/mledoze/countries
* Validation code from http://libphonenumber.googlecode.com
* Feature contributions are listed in the wiki: [Contributions](https://github.com/Bluefieldscom/intl-tel-input/wiki/Contributions)
