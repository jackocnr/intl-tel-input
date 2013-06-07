# International Telephone Input
A jQuery plugin for entering international telephone numbers. It adds a flag dropdown to any input, which lists all the countries and their international dial codes next to their flags.

## Demo
http://bluefieldscom.github.io/intl-tel-input/

## Getting started
Add the stylesheet in your &lt;head&gt; section, and add the script file at the end of your &lt;body&gt;. You will also need to have jQuery included somewhere. You will then be able to initialise the plugin on your input using the main intlTelInput() function. See below.
```html
<html>
  <head>
    <link rel="stylesheet" href="build/css/intlTelInput.css">
  </head>
  <body>
    <input type="tel" id="mobile-number">

    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="build/js/intlTelInput.js"></script>
    <script>
    $(function() {
      $("#mobile-number").intlTelInput();
    });
    </script>
  </body>
</html>
```

## Current features
* Add the flag dropdown to any of your existing inputs with one line of JavaScript
* Select a country from the dropdown to populate the input with it's international dial code
* Click off the dropdown to close it
* Typing a different dial code will automatically update the displayed flag

## Roadmap
* Type country name to select it
* Option to use your own country data

## Attributions
* Flag images and CSS from https://github.com/lafeber/world-flags-sprite
* Country data from https://github.com/mledoze/countries
* Mapping from international dial code to country code from http://libphonenumber.googlecode.com