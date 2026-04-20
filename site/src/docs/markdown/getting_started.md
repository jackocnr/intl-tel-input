# Getting started with the JavaScript plugin

This page is for getting started with the JavaScript plugin. For the framework components (React, Vue, Angular and Svelte), see [Choosing your integration](/docs/choose-integration).

## Contents
- [Using a CDN](#using-a-cdn)
- [Using a bundler, e.g. Vite](#using-a-bundler-e-g-vite)
- [Not using a bundler](#not-using-a-bundler)
- [Recommended usage](#recommended-usage)

### Using a CDN

1. Add the CSS
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.2/dist/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.2/dist/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.2/dist/js/utils.js"),
    });
  </script>
  ```


### Using a bundler, e.g. Vite

1. Install with npm

```bash
npm install intl-tel-input
```

2. Import the JS and CSS, then initialise the plugin on your input element

```js
import intlTelInput from "intl-tel-input";
import "intl-tel-input/styles";

const input = document.querySelector("#phone");
intlTelInput(input, {
  loadUtils: () => import("intl-tel-input/utils"),
});
```

Most bundlers (such as Vite, Turbopack or Parcel) will see this and place the [utils script](/docs/utils) in a separate bundle and load it asynchronously, only when needed. If this doesn’t work with your bundler or you want to load the utils module from some other location (such as a CDN or your own hosted version), you can do that as well - see other examples.

### Not using a bundler

1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Add the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Add the plugin script and initialise it on your input element
  ```html
  <script src="path/to/intlTelInput.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://your-domain.com/path/to/utils.js"),
    });
  </script>
  ```

## Recommended usage

We recommend three things:

- **[Load the utils.js module](/docs/utils#loading-the-utils-script)** to enable formatting and validation.
- **Store numbers in full international (E.164) format**, e.g. `"+17024181234"`. The dial code is embedded, so you don't need to store the country separately*.
- **Pass the stored E.164 number as the input value on initialisation.** The plugin will automatically set the country* and format the number according to your options (e.g. with [`nationalMode`](/docs/options#nationalmode) it will display the number in national format, stripping the dial code and adding the national prefix if required).

To read the number back out in E.164, use [`getNumber`](/docs/methods#getnumber). This works even when [`nationalMode`](/docs/options#nationalmode) or [`separateDialCode`](/docs/options#separatedialcode) is enabled.

If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

If you know the user's language, you can translate the country names and UI strings — [see example](/playground?countryNameLocale=ru&i18n=ru#translation-options).

_*Except for some small satellite territories, which share number ranges with the main country. For example, Åland Islands shares the number range +3584 with Finland, so a number like +358 4X XXX XXXX could belong to either — when initialising the plugin with a number like this, we default to selecting the main country (Finland). In order to ensure the user's original selected flag is re-displayed in cases like these, you'd need to store the selected country iso2 code alongside the number, and use it for the `initialCountry` during initialisation. (Search [`data.ts`](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/data.ts) for "shared" for more examples.)_

