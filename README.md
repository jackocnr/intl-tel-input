# International Telephone Input [![CI](https://github.com/jackocnr/intl-tel-input/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jackocnr/intl-tel-input/actions/workflows/ci.yml) <img src="https://img.shields.io/github/package-json/v/jackocnr/intl-tel-input.svg" alt="version"/> <img src="https://img.shields.io/npm/dm/intl-tel-input.svg"  alt="downloads"/>

🗣️ NEWS: [v26.0.0](https://github.com/jackocnr/intl-tel-input/releases/tag/v26.0.0) released, with support for:
- Autocomplete
- TypeScript types for the Vue component
- Country names now generated with `Intl.DisplayNames` (reduced bundle size)
- A more easily customisable globe icon SVG
- Modernised CSS
- More control over number extensions
- Lots of other fixes and improvements

International Telephone Input is a JavaScript plugin for entering, formatting and validating international telephone numbers. It takes a regular input field, adds a searchable country dropdown, auto-detects the user's country, displays a relevant placeholder number, formats the number as you type, and provides comprehensive validation methods. [React](https://github.com/jackocnr/intl-tel-input/blob/master/react/README.md), [Vue](https://github.com/jackocnr/intl-tel-input/blob/master/vue/README.md), [Angular](https://github.com/jackocnr/intl-tel-input/blob/master/angular/README.md) and [Svelte (beta)](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/README.md) components are also included.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-light.png">
  <img width="263" height="269" alt="Plugin screenshot showing country dropdown open" src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-light.png">
</picture>
  
If you find the plugin helpful, please consider [supporting the project](https://github.com/sponsors/jackocnr).

## Sponsored by
<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/twilio.webp" height="100" alt="Twilio"/>

Use [Twilio's API to build phone verification, SMS 2FA, appointment reminders, marketing notifications and so much more](https://www.twilio.com/blog/international-telephone-input-twilio?utm_source=github&utm_medium=referral&utm_campaign=intl_tel_input). We can't wait to see what you build.

## React, Vue, Angular and Svelte Components
We provide React, Vue, Angular and Svelte (beta) components alongside the regular JavaScript plugin. This readme is for the JavaScript plugin. View the [React Component](https://github.com/jackocnr/intl-tel-input/blob/master/react/README.md), the [Vue Component](https://github.com/jackocnr/intl-tel-input/blob/master/vue/README.md) the [Angular Component](https://github.com/jackocnr/intl-tel-input/blob/master/angular/README.md), or the [Svelte component (beta)](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/README.md).

## Docs and Examples
We have a newly updated website, where you can find [a full set of docs](https://intl-tel-input.com/docs/getting-started.html), a [live playground](https://intl-tel-input.com/playground/) where you can try out all of the options, as well as plenty of [examples](https://intl-tel-input.com/examples/validation-practical.html) of different setups.

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
* React, Vue, Angular and Svelte components also included
* Translations provided in over 40 languages, as well as support for RTL layout and alternative numeral sets
* Lots of initialisation options for customisation, as well as instance methods/events for interaction

## Contributing
See the [contributing guide](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md) for instructions on setting up the project and making changes, and also on how to update the flag images, or how to add a new translation.

## Attributions
* Flag images from [flag-icons](https://github.com/lipis/flag-icons)
* Original country data from mledoze's [World countries in JSON, CSV and XML](https://github.com/mledoze/countries)
* Formatting/validation/example number code from [libphonenumber](https://github.com/googlei18n/libphonenumber)

User testing powered by [BrowserStack Open-Source Program](https://www.browserstack.com/open-source)  

Browser testing via <a href="https://www.lambdatest.com/" target="_blank"><img src="https://raw.githubusercontent.com/jackocnr/intl-tel-input/44e0e66d01e260a7c39b3405c3229b9446882cba/screenshots/LambdaTest%20logo%20-blue.svg" style="vertical-align: middle;margin-left:5px" width="147" height="26" /></a>
