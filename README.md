# International Telephone Input [![CI](https://github.com/jackocnr/intl-tel-input/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jackocnr/intl-tel-input/actions/workflows/ci.yml) <img src="https://img.shields.io/github/package-json/v/jackocnr/intl-tel-input.svg" alt="version"/> <img src="https://img.shields.io/npm/dm/intl-tel-input.svg"  alt="downloads"/>

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vue-icon.png" alt="Vue logo" width="16" />  NEWS: we now have our own <a href="https://github.com/jackocnr/intl-tel-input/tree/master/vue">Vue component</a>!

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/react.webp" alt="React logo" width="16" />  NEWS: we now have our own <a href="https://github.com/jackocnr/intl-tel-input/tree/master/react">React component</a>! Play with it on <a href="https://intl-tel-input.com/storybook/?path=/docs/intltelinput--vanilla">Storybook</a>. 

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/angular.png" alt="Angular logo" width="16" />  NEWS: we now have our own <a href="https://github.com/jackocnr/intl-tel-input/tree/master/angular">Angular component</a>!

🗣️ NEWS: we now provide [translations](#translations) in over 40 languages! [See them in action](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--i18n).

International Telephone Input is a JavaScript plugin for entering and validating international telephone numbers. It takes a regular input field, adds a searchable country dropdown, auto-detects the user's country, displays a relevant placeholder number, formats the number as you type, and provides comprehensive validation methods. React, Vue and Angular components are also included.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-light.png">
  <img width="263" height="269" alt="Plugin screenshot showing country dropdown open" src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-light.png">
</picture>
  
If you find the plugin helpful, please consider [supporting the project](https://github.com/sponsors/jackocnr).

## Sponsored by
<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/twilio.webp" height="100" alt="Twilio"/>

Use [Twilio's API to build phone verification, SMS 2FA, appointment reminders, marketing notifications and so much more](https://www.twilio.com/blog/international-telephone-input-twilio?utm_source=github&utm_medium=referral&utm_campaign=intl_tel_input). We can't wait to see what you build.

## Table of Contents

- [React, Vue and Angular Components](#react-vue-and-angular-components)
- [Demo and Examples](#demo-and-examples)
- [Mobile](#mobile)
- [Features](#features)
- [Browser Compatibility](#browser-compatibility)
- [Getting Started](#getting-started-using-a-cdn)
- [Recommended Usage](#recommended-usage)
- [Initialisation Options](#initialisation-options)
- [Instance Methods](#instance-methods)
- [Static Methods](#static-methods)
- [Events](#events)
- [Theming / Dark Mode](#theming--dark-mode)
- [Translations](#translations)
- [Utilities Script](#utilities-script)
- [Loading The Utilities Script](#loading-the-utilities-script)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Attributions](#attributions)

## React, Vue and Angular Components
We now provide React, Vue and Angular components alongside the regular JavaScript plugin. This readme is for the JavaScript plugin. View the [React Component readme](https://github.com/jackocnr/intl-tel-input/blob/master/react/README.md), the [Vue Component readme](https://github.com/jackocnr/intl-tel-input/blob/master/vue/README.md) or the [Angular Component readme](https://github.com/jackocnr/intl-tel-input/blob/master/angular/README.md).

## Demo and Examples
You can view [a live demo](https://intl-tel-input.com) and see some examples of how to use the various options. Alternatively, try it for yourself by downloading the project and opening demo.html in a browser.

## Mobile
By default, on mobile devices, we show a fullscreen popup instead of the inline dropdown to make better use of the limited screen space. This is similar to how a native `<select>` element works. You can control this behaviour with the `useFullscreenPopup` option. The popup can be closed by either selecting a country from the list or by tapping on the grey area on the sides. [See example](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--usefullscreenpopup) (using the React component).

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/mobile2.png" alt="Mobile screenshot" width="270" height="512" />

## Features
* Automatically select the user's current country using an IP lookup
* Automatically set the input placeholder to an example number for the selected country
* Navigate the country dropdown by typing a country's name, or using the up/down keys
* Automatically format the number as the user types
* Optionally, only allow numeric characters and cap the number at the maximum valid length
* The user types their national number, and the plugin gives you the full standardised international number
* Number validation, including specific error types
* High-resolution flag images
* Accessibility provided via ARIA tags
* Typescript type definitions included
* Easily customise styles by overriding CSS variables, e.g. support dark mode
* React, Vue, and Angular components also included
* Translations for country names (etc) provided in over 40 languages, and support for RTL layout
* Lots of initialisation options for customisation, as well as instance methods/events for interaction

## Browser Compatibility
| Chrome |  Firefox  | Safari | Edge |
| :----: | :-------: | :----: | :--: |
|    ✓   |     ✓     |  v14+  |   ✓  |

_Note: We have now dropped support for all versions of Internet Explorer because it is [no longer supported](https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/) by any version of Windows._

## Getting Started (Using a CDN)
1. Add the CSS
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js"),
    });
  </script>
  ```

## Getting Started (Using a bundler, e.g. Webpack)
1. Install with npm: `npm install intl-tel-input --save` or yarn: `yarn add intl-tel-input`

2. Import the CSS: `import 'intl-tel-input/build/css/intlTelInput.css';`

3. Set the path to flags.webp and globe.webp in your CSS, by overriding the CSS variables
  ```css
  .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
    --iti-path-globe-1x: url('path/to/globe.webp');
    --iti-path-globe-2x: url('path/to/globe@2x.webp');
  }
  ```

4. Import the JS and initialise the plugin on your input element
  ```js
  import intlTelInput from 'intl-tel-input';

  const input = document.querySelector("#phone");
  intlTelInput(input, {
    loadUtils: () => import("intl-tel-input/utils"),
  });
  ```

Most bundlers (such as Webpack, Vite, or Parcel) will see this and place the [utilities script](#utilities-script) in a separate bundle and load it asynchronously, only when needed. If this doesn’t work with your bundler or you want to load the utils module from some other location (such as a CDN or your own hosted version), you can do that as well - see other examples.

## Getting Started (Not using a bundler)
1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Add the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Set the path to flags.webp and globe.webp in your CSS, by overriding the CSS variables
  ```css
  .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
    --iti-path-globe-1x: url('path/to/globe.webp');
    --iti-path-globe-2x: url('path/to/globe@2x.webp');
  }
  ```

4. Add the plugin script and initialise it on your input element
  ```html
  <script src="path/to/intlTelInput.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://my-domain/path/to/utils.js"),
    });
  </script>
  ```

## Recommended Usage
We highly recommend you [load the included utils.js](#loading-the-utilities-script), which enables formatting and validation, etc. Then the plugin is built to always deal with numbers in the full international format (e.g. "+17024181234") and convert them accordingly - even when `nationalMode` or `separateDialCode` is enabled. We recommend you get, store, and set numbers exclusively in this format for simplicity - then you don't have to deal with handling the country code separately, as full international numbers include the country code information*.

You can always get the full international number (including country code) using `getNumber`, then you only have to store that one string in your database (you don't have to store the country separately), and then the next time you initialise the plugin with that number in the input, it will automatically set the country* and format it according to the options you specify (e.g. when using `nationalMode` it will automatically display the number in national format, removing the international dial code).

If you know the user's country, you can set it with `initialCountry` (e.g. `"us"` for the United States). If you don't, we recommend setting `initialCountry` to `"auto"` (along with the `geoIpLookup` option) to determine the user's country based on their IP address - [see example](https://intl-tel-input.com/examples/lookup-country.html).

If you know the user's language, you can use the included translations to localise the country names (etc) - [see example](https://intl-tel-input.com/examples/localise-countries.html).

_*Except for some small satellite territories, which share number ranges with the main country (search data.ts for "shared" for examples). When displaying numbers from those shared ranges, we default to selecting the main country._

## Initialisation Options
When you initialise the plugin, the first argument is the input element, and the second is an object containing any initialisation options you want, which are detailed below. Note: any options that take country codes should be [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes.  

**allowDropdown**  
Type: `Boolean` Default: `true`  
Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected country is not clickable. Also, if showFlags is enabled, we display the selected flag on the right instead, because it is just a marker of state. Note that if `separateDialCode` is enabled, `allowDropdown` is forced to `true` as the dropdown is required when the user types "+" in this case. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--allowdropdown) (using the React component).

**allowPhonewords**  
Type: `Boolean` Default: `false`  
Whether or not the validation methods return `true` for numbers containing phonewords, e.g. "+1 702 FLOWERS".

**autoPlaceholder**  
Type: `String` Default: `"polite"`  
Set the input's placeholder to an example number for the selected country, and update it if the country changes. You can specify the number type using the `placeholderNumberType` option. By default, it is set to `"polite"`, which means it will only set the placeholder if the input doesn't already have one. You can also set it to `"aggressive"`, which will replace any existing placeholder, or `"off"`. Requires the [utils script to be loaded](#loading-the-utilities-script).

**containerClass**  
Type: `String` Default: `""`  
Additional classes to add to the (injected) wrapper `<div>`.

**countryOrder**  
Type: `Array` Default: `null`  
Specify the ordering for the country list with an array of iso2 country codes. Any omitted countries will appear after those specified, in alphabetical order, e.g. setting `countryOrder` to `["jp", "kr"]` will result in the list: Japan, South Korea, Afghanistan, Albania, Algeria etc...

**countrySearch**  
Type: `Boolean` Default: `true`  
Add a search input to the top of the dropdown, so users can filter the displayed countries.

**customPlaceholder**  
Type: `Function` Default: `null`  
Change the placeholder generated by autoPlaceholder. Must return a string.

```js
intlTelInput(input, {
  customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => "e.g. " + selectedCountryPlaceholder,
});
```

**dropdownContainer**  
Type: `Node` Default: `null`  
Expects a node, e.g. `document.body`. Instead of putting the country dropdown markup next to the input, append it to the specified node, and it will then be positioned next to the input using JavaScript (using `position: fixed`). This is useful when the input is inside a container with `overflow: hidden`. Note that the positioning is broken by scrolling, so the dropdown will automatically close on the `window` scroll event.

**excludeCountries**  
Type: `Array` Default: `[]`  
In the dropdown, display all countries except the ones you specify here. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--excludecountries) (using the React component). Also see: `onlyCountries` option.

**fixDropdownWidth**  
Type: `Boolean` Default: `true`  
Fix the dropdown width to the input width (rather than being as wide as the longest country name). Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--fixdropdownwidth) (using the React component).

**formatAsYouType**  
Type: `Boolean` Default: `true`  
Automatically format the number as the user types. This feature will be disabled if the user types their own formatting characters. Requires the [utils script to be loaded](#loading-the-utilities-script).

**formatOnDisplay**  
Type: `Boolean` Default: `true`  
Format the input value (according to the `nationalMode` option) during initialisation, when a new country is selected, on `setNumber` and on `setCountry`. Requires the [utils script to be loaded](#loading-the-utilities-script).

**geoIpLookup**  
Type: `Function` Default: `null`  
When setting `initialCountry` to `"auto"`, you must use this option to specify a custom function that calls an IP lookup service to get the user's location and then invokes the `success` callback with the relevant country code. Also note that when instantiating the plugin, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned under the `promise` instance property, so you can do something like `iti.promise.then(...)` to know when initialisation requests like this have completed.

Here is an example using the [ipapi](https://ipapi.co/api/?javascript#location-of-clients-ip) service:  
```js
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: (success, failure) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => success(data.country_code))
      .catch(() => failure());
  }
});
```
_Note that the `failure` callback must be called in the event of an error, hence the use of `catch()` in this example. Tip: store the result in a cookie to avoid repeat lookups!_

**hiddenInput**  
Type: `Function` Default: `null`  
Allows the creation of hidden input fields within a form, which, on submit, get populated with (1) the full international telephone number and (2) the selected country code. It accepts a function that receives the name of the main telephone input as an argument. This function should return an object with `phone` and (optionally) `country` properties to specify the names of the hidden inputs for the phone number and country code, respectively. This is useful for old-fashioned, page-load form submissions to ensure the full international number and country code are captured, especially when `nationalMode` is enabled.

***Note**: This feature requires the input to be inside a `<form>` element, as it listens for the `submit` event on the closest form element. Also note that since this uses `getNumber` internally, firstly it requires the [utils script to be loaded](#loading-the-utilities-script), and secondly, it expects a valid number and so will only work correctly if you have used `isValidNumber` to validate the number before allowing the form submit to go through.

```js
intlTelInput(input, {
  hiddenInput: (telInputName) => ({
    phone: "phone_full",
    country: "country_code"
  }),
});
```

This will generate the following (hidden) elements, which will be automatically populated on submit:

```html
<input type="hidden" name="phone_full">
<input type="hidden" name="country_code">
```

**i18n**  
Type: `Object` Default: `{}`  
Allows you to specify translation strings for the 200+ country names, as well as other user interface text (e.g. the placeholder text for the country search input). The easiest way to do this is to import one of the [provided translation modules](https://github.com/jackocnr/intl-tel-input/tree/master/src/js/intl-tel-input/i18n) and set `i18n` to that value (see option 1 below). You can also override one or more individual keys this way (see option 1 below). Alternatively, you can provide your own custom translations (see option 2 below). If providing your own, you will need to specify all the country names (which can be copied from the country-list project, e.g. here are the [country names in French](https://github.com/umpirsky/country-list/blob/master/data/fr/country.json)), as well as a few UI strings (listed below). [See example](https://intl-tel-input.com/examples/localise-countries.html).

If we don't currently support a language you need, it's easy to [contribute this](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#adding-a-new-translation) yourself - you only need to provide a handful of UI translation strings, as we automatically pull in the country names from the country-list project.

Option 1: import one of the provided translation modules
```js
import { fr } from "intl-tel-input/i18n";

intlTelInput(input, {
  i18n: fr,
});

// or to override one or more keys, you could do something like this
intlTelInput(input, {
  i18n: {
    ...fr,
    searchPlaceholder: "Recherche de pays",
  },
});
```

Option 2: define your own custom translations
```js
intlTelInput(input, {
  i18n: {
    // Country names - see the full list in src/js/intl-tel-input/i18n/en/countries.ts
    af: "Afghanistan",
    al: "Albania",
    dz: "Algeria",
    as: "American Samoa",
    ad: "Andorra",
    ...
    // Aria label for the selected country element, when there is a country selected
    selectedCountryAriaLabel: "Change country, selected ${countryName} (${dialCode})",
    // Aria label and title text for the selected country element, when no country is selected
    noCountrySelected: "Select country",
    // Aria label for the country list element
    countryListAriaLabel: "List of countries",
    // Placeholder for the search input in the dropdown
    searchPlaceholder: "Search",
    // Aria label for the clear search button
    clearSearchAriaLabel: "Clear search",
    // Visible text and screen reader message for when the search produces no results
    zeroSearchResults: "No results found",
    // Screen reader message for when the search produces 1 result
    oneSearchResult: "1 result found",
    // Screen reader message for when the search produces multiple results
    multipleSearchResults: "${count} results found",
    // OPTIONAL: For more complex pluralisation cases, e.g. Polish or Arabic, you can implement your own logic, like below. In this case, you can omit the "one" and "multiple" keys above.
    searchResultsText(count) {
      // NOTE: zero results are always handled by "zeroSearchResults" above
      if (count === 1) return "1 result found";
      if (count < 5) return `Some ${count} results found`;
      return `Many ${count} results found`;
    }
  }
});
```

**initialCountry**  
Type: `String` Default: `""`  
Set the initial country selection by specifying its country code, e.g. `"us"` for the United States. (Be careful not to do this unless you are sure of the user's country, as it can lead to tricky issues if set incorrectly and the user auto-fills their national number and submits the form without checking - in certain cases, this can pass validation and you can end up storing a number with the wrong dial code). You can also set `initialCountry` to `"auto"`, which will look up the user's country based on their IP address (requires the `geoIpLookup` option - [see example](https://intl-tel-input.com/examples/lookup-country.html)). Note: however you use `initialCountry`, it will not update the country selection if the input already contains a number with an international dial code.

**loadUtils**  
Type: `() => Promise<module>` Default: `null`  
This is one way to lazy load the included utils.js (to enable formatting/validation, etc) - see [Loading The Utilities Script](#loading-the-utilities-script) for more options.

The `loadUtils` option takes a function that returns a Promise resolving to the utils module (see example code below). You can `import` the utils module in different ways: (A) from a CDN, (B) from your own hosted version of [utils.js](https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js), or (C) if you use a bundler like Webpack, Vite or Parcel, you can import it directly from the package.

```js
// (A) import utils module from a CDN
intlTelInput(htmlInputElement, {
  loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js"),
});

// (B) import utils module from your own hosted version of utils.js
intlTelInput(htmlInputElement, {
  loadUtils: () => import("/path/to/utils.js"),
});

// (C) with a bundler, you can import the utils module directly from the package
intlTelInput(htmlInputElement, {
  loadUtils: () => import("intl-tel-input/utils"),
});
```

The module is only loaded when you initialise the plugin, and additionally, only when the page has finished loading (on the window load event) to prevent blocking (the script is ~260KB). When instantiating the plugin, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned under the `promise` instance property, so you can do something like `iti.promise.then(callback)` to know when initialisation requests like this have finished. See [Utilities Script](#utilities-script) for more information.

If you want more control over when this file is lazy-loaded, you can manually invoke the `attachUtils` static method whenever you like, instead of using the `loadUtils` initialisation option.

**nationalMode**  
Type: `Boolean` Default: `true`  
Format numbers in the national format, rather than the international format. This applies to placeholder numbers and when displaying users' existing numbers. Note that it's fine for users to type their numbers in national format - as long as they have selected the right country, you can use `getNumber` to extract a full international number - [see example](https://intl-tel-input.com/examples/national-mode.html). It is recommended to leave this option enabled to encourage users to enter their numbers in national format, as this is usually more familiar to them, and so it creates a better user experience.

**onlyCountries**  
Type: `Array` Default: `[]`  
In the dropdown, display only the countries you specify - [see example](https://intl-tel-input.com/examples/only-countries.html). Also see: `excludeCountries` option.

**placeholderNumberType**  
Type: `String` Default: `"MOBILE"`  
Specify [one of the keys](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L162) from the enum `intlTelInput.utils.numberType` (e.g. `"FIXED_LINE"`) to set the number type to use for the placeholder. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--placeholdernumbertype) (using the React component).

**showFlags**  
Type: `Boolean` Default: `true`  
Set this to false to hide the flags, e.g. for political reasons. Instead, it will show a generic globe icon. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--showflags) (using the React component).

**separateDialCode**  
Type: `Boolean` Default: `false`  
Display the selected country's international dial code next to the input, so it looks like it's part of the typed number. Since the user cannot edit the displayed dial code, they may try to type a new one - in this case, to avoid having two dial codes next to each other, we automatically open the country dropdown and put the new dial code in the search input instead. So if they type +54, then Argentina will be highlighted in the dropdown, and they can simply press Enter to select it, updating the displayed dial code (this feature requires `allowDropdown` and `countrySearch` to be enabled). Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--separatedialcode) (using the React component).  
__Note: if the user enters their number with autofill or by copying and pasting it, and their number includes the international dial code, then this will be shown twice__

<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/separate-dial-code4.png" width="267" height="51" alt="Separate Dial Code">

**strictMode**  
Type: `Boolean` Default: `false`  
As the user types in the input, ignore any irrelevant characters. The user can only enter numeric characters and an optional plus at the beginning. Cap the length at the maximum valid number length (this respects `validationNumberTypes`). Requires the [utils script to be loaded](#loading-the-utilities-script). [See example](https://intl-tel-input.com/examples/strict-mode.html).

**useFullscreenPopup**  
Type: `Boolean` Default: `true on mobile devices, false otherwise`  
Control when the country list appears as a fullscreen popup vs an inline dropdown. By default, it will appear as a fullscreen popup on mobile devices (based on user-agent and screen width), to make better use of the limited space (similar to how a native `<select>` works), and as an inline dropdown on larger devices/screens. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--usefullscreenpopup) (using the React component).

**validationNumberTypes**  
Type: `String[]` Default: `["MOBILE"]`  
Specify an array of [the keys](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L198) from the enum `intlTelInput.utils.numberType` to set the number type(s) to enforce during validation, as well as the number length to enforce with `strictMode`. Set it to `null` to not enforce any particular type. By default, it's set to `["MOBILE"]` so `isValidNumber` will only return `true` for mobile numbers. Alternatively, you could set it to, for example, `["TOLL_FREE", "PREMIUM_RATE"]` to get `isValidNumber` to return `true` for only those kinds of numbers.

## Instance Methods
In these examples, `iti` refers to the plugin instance which gets returned when you initialise the plugin, e.g.
```js
const iti = intlTelInput(input);
```

**destroy**  
Remove the plugin from the input, and unbind any event listeners.  
```js
iti.destroy();
```

**getExtension**  
Get the extension from the current number. Requires the [utils script to be loaded](#loading-the-utilities-script).
```js
const extension = iti.getExtension();
```
Returns a string, e.g. if the input value was `"(702) 555-5555 ext. 1234"`, this would return `"1234"`

**getNumber**  
Get the current number in the given format (defaults to [E.164 standard](https://en.wikipedia.org/wiki/E.164)). The different formats are available in the enum `intlTelInput.utils.numberFormat` - which you can see [here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L153). Requires the [utils script to be loaded](#loading-the-utilities-script). _Note that even if `nationalMode` is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  
```js
const number = iti.getNumber();
// or
const number = iti.getNumber(intlTelInput.utils.numberFormat.E164);
```
Returns a string e.g. `"+17024181234"`

**getNumberType**  
Get the type (fixed-line/mobile/toll-free, etc) of the current number. Requires the [utils script to be loaded](#loading-the-utilities-script).  
```js
const numberType = iti.getNumberType();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L162) in the enum `intlTelInput.utils.numberType`, e.g.  
```js
if (numberType === intlTelInput.utils.numberType.MOBILE) {
    // is a mobile number
}
```
_Note that in the US, there's no way to differentiate between fixed-line and mobile numbers, so instead it will return `FIXED_LINE_OR_MOBILE`._

**getSelectedCountryData**  
Get the country data for the currently selected country.  
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
Get more information about a validation error. Requires the [utils script to be loaded](#loading-the-utilities-script).  
```js
const error = iti.getValidationError();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L178) in the enum `intlTelInput.utils.validationError`, e.g.  
```js
if (error === intlTelInput.utils.validationError.TOO_SHORT) {
    // the number is too short
}
```

**isValidNumber**  
(Note: only returns `true` for valid <ins>mobile numbers</ins> by default - see `validationNumberTypes`)  
Check if the current number is valid based on its length - [see example](https://intl-tel-input.com/examples/validation-practical.html), which should be sufficient for most use cases. See `isValidNumberPrecise` (DANGEROUS) for more precise validation, but the advantage of `isValidNumber` is that it is much more future-proof, as while countries around the world regularly update their number rules, they rarely change their number lengths. If this method returns `false`, you can use `getValidationError` to get more information. Requires the [utils script to be loaded](#loading-the-utilities-script).  
```js
const isValid = iti.isValidNumber();
```
Returns: `true`/`false`

**isValidNumberPrecise** ⚠️ DANGEROUS  
(Note: only returns `true` for valid <ins>mobile numbers</ins> by default - see `validationNumberTypes`)  
Check if the current number is valid using precise matching rules for each country/area code, etc - [see example](https://intl-tel-input.com/examples/validation.html). Note that these rules change each month for various countries around the world, so you need to constantly keep the plugin up-to-date (e.g. via an automated script) else <ins>you will start rejecting valid numbers</ins>. For a simpler and more future-proof form of validation, see `isValidNumber` above. If validation fails, you can use `getValidationError` to get more information. Requires the [utils script to be loaded](#loading-the-utilities-script).  
```js
const isValid = iti.isValidNumberPrecise();
```
Returns: `true`/`false`

**setCountry**  
Change the selected country. It should be rare, if ever, that you need to do this, as the selected country gets updated automatically when calling `setNumber` and passing a number including an international dial code, which is the recommended usage. Note, you can omit the country code argument to set the country to the default empty (globe) state. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number to either national or international format according to the `nationalMode` option._  
```js
iti.setCountry("gb");
```

**setDisabled**  
Updates the disabled attribute of both the telephone input and the selected country button. Accepts a boolean value. _Note: we recommend using this instead of updating the disabled attribute of the input directly._
```js
iti.setDisabled(true);
```

**setNumber**  
Insert a number, and update the selected country accordingly. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number to either national or international format according to the `nationalMode` option._  
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
Retrieve the plugin's country data - either to re-use elsewhere, e.g. to generate your own country dropdown - [see example](https://intl-tel-input.com/examples/country-sync.html), or alternatively, you could use it to modify the country data. Note that any modifications must be done before initialising the plugin.  
```js
const countryData = intlTelInput.getCountryData();
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
const iti = intlTelInput.getInstance(input);
iti.isValidNumber(); // etc
```

**attachUtils**  
An alternative to the `loadUtils` option, this method lets you manually load the utils.js script on demand, to enable formatting/validation etc. See [Loading The Utilities Script](#loading-the-utilities-script) for more information. This method should only be called once per page. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned so you can use `attachUtils().then(...)` to know when it's finished.
```js
const loadUtils = () => import("/build/js/utils.js");
intlTelInput.attachUtils(loadUtils);
```

## Events
You can listen for the following events triggered on the input element.

**countrychange**  
This is triggered when the selected country is updated, e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call `setCountry` etc.
```js
input.addEventListener("countrychange", () => {
  // do something with iti.getSelectedCountryData()
});
```
See an example here: [Country sync](https://intl-tel-input.com/examples/country-sync.html)  

**open:countrydropdown**  
This is triggered when the user opens the dropdown.  

**close:countrydropdown**  
This is triggered when the user closes the dropdown.  

## Theming / Dark Mode
There are lots of CSS variables available for theming. See [intlTelInput.scss](https://github.com/jackocnr/intl-tel-input/blob/master/src/css/intlTelInput.scss) for the full list.

As for the empty state (globe icon), the default version is dark grey, and we also provide a "light" version that should work better with a dark theme. Alternatively, it's easy to [re-generate the globe icon](https://free-icon-rainbow.com/international-call-free-icon) in whatever colour you need for your theme. We recommend you download it in the highest resolution possible, and then scale the image down to the required sizes (20px wide for the default version and 40px wide for the @2x version).

Dark mode example (with screenshot below):
```css
@media (prefers-color-scheme: dark) {
  .iti {
    --iti-border-color: #5b5b5b;
    --iti-dialcode-color: #999999;
    --iti-dropdown-bg: #0d1117;
    --iti-arrow-color: #aaaaaa;
    --iti-hover-color: #30363d;
    --iti-path-globe-1x: url("path/to/globe_light.webp");
    --iti-path-globe-2x: url("path/to/globe_light@2x.webp");
  }
}
```

NOTE: this assumes you already have your own dark mode styling in place for general body/input styling, e.g. something like this:

```css
@media (prefers-color-scheme: dark) {
  body, input {
    color: white;
    background-color: #0d1117;
  }
  input {
    border-color: #5b5b5b;
  }
  input::placeholder {
    color: #8d96a0;
  }
}
```

Example:  
<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-dark.png" alt="Screenshot" width="263" height="269" />

## Translations
We provide [translations](https://github.com/jackocnr/intl-tel-input/tree/master/src/js/intl-tel-input/i18n) for the 200+ country names, as well as other user interface text (e.g. the placeholder text for the country search input) in over 40 languages. See the `i18n` option for details on how to use them. [See them in action](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--i18n).

Supported languages: Arabic, Albanian, Bengali, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian, Marathi, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swedish, Telugu, Thai, Turkish, Ukrainian, Urdu, Uzbek, Vietnamese.

If we don't currently support a language you need, it's easy to [contribute this](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#adding-a-new-translation) yourself - you only need to provide a handful of UI translation strings, as we automatically pull in the country names from the country-list project.

## Utilities Script
The utilities script ([build/js/utils.js](build/js/utils.js)) is a custom build of Google's [libphonenumber](https://github.com/googlei18n/libphonenumber) which enables the following features:

* Formatting upon initialisation, as well as with `getNumber` and `setNumber`
* Validation with `isValidNumber`, `getNumberType` and `getValidationError` methods
* Placeholder set to an example number for the selected country - even specify the type of number (e.g. mobile) using the `placeholderNumberType` option
* Extract the standardised (E.164) international number with `getNumber` even when using the `nationalMode` option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution we have found is libphonenumber, from which we have precompiled the relevant parts into a single JavaScript file, included in the build directory. Unfortunately, even after modification, it is still ~260KB. See the section below on the best way to load it.

To recompile the utils script yourself (e.g. to update the version of libphonenumber it is built from), see the [contributing guide](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#updating-to-a-new-version-of-libphonenumber).

## Loading The Utilities Script 
See [v25 discussion](https://github.com/jackocnr/intl-tel-input/discussions/1842).  

The utils script provides lots of great functionality (see the above section), but comes at the cost of increased filesize (~260KB). There are two main ways to load the utils script, depending on whether you're concerned about filesize or not.

**Option 1: intlTelInputWithUtils**  
If you're not concerned about filesize (e.g. you're lazy loading the main plugin script), the easiest thing to do is to use the full bundle (`/build/js/intlTelInputWithUtils.js`), which comes with the utils script included. This script can be used exactly like the main intlTelInput.js - so it can either be loaded directly onto the page (which defines `window.intlTelInput` like usual), or it can be imported like so: `import intlTelInput from "intl-tel-input/intlTelInputWithUtils"`.

**Option 2: loadUtils**  
If you *are* concerned about filesize, you can lazy load the utils module when the plugin initialises, using the `loadUtils` initialisation option.


## Troubleshooting

**Full-width input**  
If you want your input to be full-width, you need to set the container to be the same, i.e.

```css
.iti { width: 100%; }
```

**dropdownContainer: dropdown not closing on scroll**  
If you have a scrolling container other than `window` which is causing problems by not closing the dropdown on scroll, simply listen for the scroll event on that element, and trigger a scroll event on `window`, which in turn will close the dropdown, e.g.

```js
scrollingElement.addEventListener("scroll", () => {
  const e = document.createEvent('Event');
  e.initEvent("scroll", true, true);
  window.dispatchEvent(e);
});
```

**Input margin**  
For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want a vertical margin, you should add it to the container (with class `iti`).

**Displaying error messages**  
If your error handling code inserts an error message before the `<input>`, it will break the layout. Instead, you must insert it before the container (with class `iti`).

**Dropdown position**  
The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise the plugin after the `<input>` has been added to the DOM.

**Placeholders**  
To get the automatic country-specific placeholder numbers, simply omit the placeholder attribute on the `<input>`, or set `autoPlaceholder` to `"aggressive"` to override any existing placeholder. Note: this requires the utils script to be loaded.

**Bootstrap input groups**  
A couple of CSS fixes are required to get the plugin to play nice with Bootstrap [input groups](https://getbootstrap.com/docs/3.3/components/#input-groups). You can see a Codepen [here](https://codepen.io/jackocnr/pen/EyPXed).  
_Note: there is currently [a bug](https://bugs.webkit.org/show_bug.cgi?id=141822) in Mobile Safari which causes a crash when you click the dropdown arrow (a CSS triangle) inside an input group. The simplest workaround is to remove the CSS triangle with this line:_

```css
.iti__arrow { border: none; }
```

## Contributing
See the [contributing guide](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md) for instructions on setting up the project and making changes, and also on how to update to a new version of libphonenumber, how to update the flag images, or how to add a new translation.

## Attributions
* Flag images from [flag-icons](https://github.com/lipis/flag-icons)
* Original country data from mledoze's [World countries in JSON, CSV and XML](https://github.com/mledoze/countries)
* Formatting/validation/example number code from [libphonenumber](https://github.com/googlei18n/libphonenumber)
* Feature contributions are listed in the wiki: [Contributions](https://github.com/jackocnr/intl-tel-input/wiki/Contributions)

User testing powered by [BrowserStack Open-Source Program](https://www.browserstack.com/open-source)  

Browser testing via <a href="https://www.lambdatest.com/" target="_blank"><img src="https://raw.githubusercontent.com/jackocnr/intl-tel-input/44e0e66d01e260a7c39b3405c3229b9446882cba/screenshots/LambdaTest%20logo%20-blue.svg" style="vertical-align: middle;margin-left:5px" width="147" height="26" /></a>
