# JavaScript plugin

How to get up and running with the JavaScript plugin. For the  React/Angular/Svelte/Vue components instead, see [Getting started](/docs/getting-started).

## Contents
- [Using a bundler, e.g. Vite](#using-a-bundler-e-g-vite)
- [Using a script tag](#using-a-script-tag)
- [Recommended usage](#recommended-usage)
- [Next steps](#next-steps)

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
  // modern bundlers will place utils in a separate bundle, loaded on demand
  loadUtils: () => import("intl-tel-input/utils"),
});
```

3. Customize with any of the plugin's [initialisation options](/docs/options).

### Using a script tag

This example loads the assets from [jsDelivr](https://www.jsdelivr.com/) for a quick start. Alternatively, use your own hosted files.

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

3. Customize with any of the plugin's [initialisation options](/docs/options).

## Recommended usage

**Load the utils module.** [Lazy-load `utils.js`](/docs/utils#loading-the-utils-script) to enable formatting and validation.

**Store and restore numbers in E.164 format.** Since the dial code is embedded in the number (e.g. `"+17024181234"`), you don't need to store the country separately. To read the number out in E.164, use [`getNumber`](/docs/methods#getnumber). To restore it, pass the stored E.164 number as the input value on initialisation — the plugin will automatically set the country<sup>*</sup> and format the number according to your options.

**Validate before saving.** Before storing a number, call [`isValidNumber`](/docs/methods#isvalidnumber) (requires the utils module) and reject invalid input.

**Set the initial country.** If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

**Translate the UI.** If you know the user's language, you can translate the country names and UI strings — see [Localisation](/docs/localisation).

_<sup>*</sup>Except for some small satellite territories, which share number ranges with the main country, in which case we default to selecting the main country._

## Next steps

The plugin has dozens of [initialisation options](/docs/options) for customizing its behaviour — country picker, formatting, validation, placeholders, localisation, and more. Browse the full list, or try them interactively in the [playground](/playground).

