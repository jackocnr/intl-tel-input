# International Telephone Input
A jQuery plugin for entering international telephone numbers. It adds a flag dropdown to any input, which lists all the countries and their international dial codes next to their flags.

## Demo
http://jackocnr.com/intl-tel-input.html  
Try it for yourself using the included demo.html

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

## Current features
* In the country dropdown you can navigate by typing, or using the up/down keys
* Selecting a country updates the dial code of the entered number
* Typing a different dial code automatically updates the displayed flag
* Option to specify "preferred countries" (which appear at the top of the list) e.g.

        preferredCountries: ["US", "GB"]

* Option to set "america mode" (enabled by default), which doesn't display the +1 for American numbers, because a lot of Americans are unfamiliar with international dial codes

        americaMode: false

* Programatically select a country after initialisation (e.g. when the user is entering their address)

        $('#mobile-number').intlTelInput('selectCountry', 'GB');

## Roadmap
If there's enough interest, I may look into adding the following features:
* Number validation
* Option to use your own country data

## Troubleshooting
* Depending on your project setup, you may need to override the path to flags16.png in your CSS. You can do so like this:

        .f16 .flag {background-image: url("path/to/flags16.png");}

## Attributions
* Flag images and CSS from https://github.com/lafeber/world-flags-sprite
* Country data from https://github.com/mledoze/countries
* Mapping from international dial code to country code from http://libphonenumber.googlecode.com
