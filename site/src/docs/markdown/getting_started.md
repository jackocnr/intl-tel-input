# Getting started with the JavaScript plugin

This page is for getting started with the JavaScript plugin. For the framework components (React, Vue, Angular and Svelte), see [Choosing your integration](/docs/choose-integration).

## Contents
- [Using a bundler, e.g. Vite](#using-a-bundler-e-g-vite)
- [Using a script tag](#using-a-script-tag)
- [Recommended usage](#recommended-usage)

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

### Using a script tag

1. Add the CSS
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/utils.js"),
    });
  </script>
  ```

The examples above load the files from [jsDelivr](https://www.jsdelivr.com/) for a quick start. To host the files yourself instead, download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest) (or install with [npm](https://www.npmjs.com/package/intl-tel-input)) and replace the URLs with your own paths, e.g. `path/to/intlTelInput.css`, `path/to/intlTelInput.js`, and `https://your-domain.com/path/to/utils.js` for the `loadUtils` import.

## Recommended usage

**Load the utils module.** [Lazy-load `utils.js`](/docs/utils#loading-the-utils-script) to enable formatting and validation.

**Store and restore numbers in E.164 format.** Since the dial code is embedded in the number (e.g. `"+17024181234"`), you don't need to store the country separately. To read the number out in E.164, use [`getNumber`](/docs/methods#getnumber). To restore it, pass the stored E.164 number as the input value on initialisation — the plugin will automatically set the country<sup>*</sup> and format the number according to your options.

**Validate before saving.** Before storing a number, call [`isValidNumber`](/docs/methods#isvalidnumber) (requires the utils module) and reject invalid input.

**Set the initial country.** If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

**Translate the UI.** If you know the user's language, you can translate the country names and UI strings — see [Localisation](/docs/localisation).

_<sup>*</sup>Except for some small satellite territories, which share number ranges with the main country, in which case we default to selecting the main country._

