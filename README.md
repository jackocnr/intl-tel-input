# International Telephone Input [![Build Status](https://travis-ci.org/Bluefieldscom/intl-tel-input.png)](https://travis-ci.org/Bluefieldscom/intl-tel-input)
A jQuery plugin for entering international telephone numbers. It adds a flag dropdown to any input, which lists all the countries and their international dial codes next to their flags.


## Demo
http://jackocnr.com/intl-tel-input.html  
Try it for yourself using the included demo.html

![alt tag](https://raw.github.com/Bluefieldscom/intl-tel-input/master/screenshot.png)

## Features
* In the country dropdown you can navigate by typing, or using the up/down keys
* Selecting a country from the dropdown updates the dial code of the entered number
* Typing a different dial code automatically updates the displayed flag
* Country names in the dropdown also include localised versions in brackets


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

**americaMode**  
Type: `Boolean` Default: `false`  
Don't display the +1 prefix for American numbers, because a lot of Americans are unfamiliar with international dial codes.

**autoHideDialCode**  
Type: `Boolean` Default: `true`  
If there is just a dial code in the input: remove it on blur, and re-add it on focus. This is to prevent just a dial code getting submitted with the form.

**defaultCountry**  
Type: `String` Default: `""`  
Set the default country by it's country code. Otherwise it will just be the first country in the list.

**dialCodeDelimiter**  
Type: `String` Default: `" "`  
Choose the delimiter that is inserted after the dial code when the user selects a country from the dropdown.

**defaultStyling**  
Type: `Boolean` Default: `"inside"`  
If you would like the default minimal styling, there are two options to choose from which specify the position of the selected flag: `"inside"` or `"outside"` (relative to the input). You can also disable all styling by choosing `"none"`.

**onlyCountries**  
Type: `Array` Default: `undefined`  
Display only the countries you specify.

**preferredCountries**  
Type: `Array` Default: `["us", "gb"]`  
Specify the countries to appear at the top of the list.


## Public methods
**getSelectedCountryData**  
Get the country data for the currently selected flag  
```js
$("#mobile-number").intlTelInput("getSelectedCountryData");
```

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

**setCountryData**  
Set all of the plugin's country data  
```js
$.fn.intlTelInput.setCountryData(countryData);
```


## Validation
International number validation is hard (it varies by country/district).
Personally, I just use this regex `/^\+[\d \(\)-.]+$/` to check the number starts with a `+` and then only contains valid characters (numbers, spaces, brackets, hyphens and dots).
After that, I strip out non-numeric characters with `val.replace(/\D/g, "")`, and check the length is between 5 and 15.

If you really want to do this properly though, I would advise using Google's [libphonenumber](https://code.google.com/p/libphonenumber/),
which can be compiled into JavaScript (a pre-compiled script can be found [here](https://github.com/albeebe/phoneformat.js),
but beware that even after minification, this script is >300kB).


## CSS
**Image path**  
Depending on your project setup, you may need to override the path to flags.png in your CSS.  
```css
.intl-tel-input .flag {background-image: url("path/to/flags.png");}
```

**Input margin**  
For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want vertical margin, you should add it to the container (with class `intl-tel-input`).


## Attributions
* Flag images and CSS from https://github.com/tkrotoff/famfamfam_flags
* Country data from https://github.com/mledoze/countries
* Mapping from international dial code to country code from http://libphonenumber.googlecode.com
