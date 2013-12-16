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
First add the stylesheet to your &lt;head&gt;
```html
  <link rel="stylesheet" href="build/css/intlTelInput.css">
```
Then include the plugin and initialise it on your input element
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

**defaultCountry**  
Type: `String` Default: `""`  
Set the default country by it's country code. Otherwise it will just be the first country in the list.

**initialDialCode**  
Type: `Boolean` Default: `false`  
Insert the default country's dial code upon initialisation.

**autoHideDialCode**  
Type: `Boolean` Default: `true`  
If there is just a dial code in the input: remove it on blur, and re-add it on focus. This is to prevent just a dial code getting submitted with the form.

**preferredCountries**  
Type: `Array` Default: `["us", "gb"]`  
Specify the countries to appear at the top of the list.

**americaMode**  
Type: `Boolean` Default: `false`  
Don't display the +1 prefix for American numbers, because a lot of Americans are unfamiliar with international dial codes.

**onlyCountries**  
Type: `Array` Default: `undefined`  
Display only the countries you specify.

**defaultStyling**  
Type: `Boolean` Default: `true`  
Apply the default minimal styling.


## Public methods
* Select a country after initialisation (e.g. when the user is entering their address)

        $('#mobile-number').intlTelInput('selectCountry', 'gb');
        
* Insert a number, and update the selected flag accordingly

        $('#mobile-number').intlTelInput('setNumber', '+44 77333 123 456');
        
* Get and set the country data using these static methods

        var countryData = $.fn.intlTelInput.getCountryData();
        $.fn.intlTelInput.setCountryData(countryData);


## Validation
International number validation is hard (it varies by country/district).
Personally, I just use this regex `/^\+[\d \(\)-.]+$/` to check the number starts with a '+' and then only contains valid characters (numbers, spaces, brackets, hyphens and dots).
After that, I strip out non-numeric characters with `val.replace(/\D/g,'')`, and check the length is between 5 and 15.

If you really want to do this properly though, I would advise using Google's [libphonenumber](https://code.google.com/p/libphonenumber/),
which can be compiled into JavaScript (a pre-compiled script can be found [here](https://github.com/albeebe/phoneformat.js),
but beware that even after minification, this script is still >300kB).


## Troubleshooting
* Depending on your project setup, you may need to override the path to flags16.png in your CSS. You can do so like this:

        .f16 .flag {background-image: url("path/to/flags16.png");}


## Attributions
* Flag images and CSS from https://github.com/lafeber/world-flags-sprite
* Country data from https://github.com/mledoze/countries
* Mapping from international dial code to country code from http://libphonenumber.googlecode.com
