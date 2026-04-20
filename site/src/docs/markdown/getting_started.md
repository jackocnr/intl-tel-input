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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.1/dist/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.1/dist/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.1/dist/js/utils.js"),
    });
  </script>
  ```


### Using a bundler, e.g. Vite

1. Install with npm

```bash
npm install intl-tel-input
```

2. Import the CSS

```js
import "intl-tel-input/styles";
```

3. Set the path to flags.webp in your CSS, by overriding the CSS variables

```css
.iti {
  --iti-path-flags-1x: url("path/to/flags.webp");
  --iti-path-flags-2x: url("path/to/flags@2x.webp");
}
```

4. Import the JS and initialise the plugin on your input element

```js
import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");
intlTelInput(input, {
  loadUtils: () => import("intl-tel-input/utils"),
});
```

Most bundlers (such as Vite, Turbopack or Parcel) will see this and place the [utilities script](/docs/utils) in a separate bundle and load it asynchronously, only when needed. If this doesn’t work with your bundler or you want to load the utils module from some other location (such as a CDN or your own hosted version), you can do that as well - see other examples.

### Not using a bundler

1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Add the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Set the path to flags.webp in your CSS, by overriding the CSS variables
  ```css
  .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
  }
  ```

4. Add the plugin script and initialise it on your input element
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

- **[Load the utils.js module](/docs/utils#loading-the-utilities-script)** to enable formatting and validation.
- **Store numbers in full international (E.164) format**, e.g. `"+17024181234"`. The dial code is embedded, so you don't need to store the country separately*.
- **Pass the stored E.164 number as the input value on initialisation.** The plugin will automatically set the country* and format the number according to your options (e.g. with [`nationalMode`](/docs/options#nationalmode) it will display the number in national format, stripping the dial code and adding the national prefix if required).

To read the number back out in E.164, use [`getNumber`](/docs/methods#getnumber). This works even when [`nationalMode`](/docs/options#nationalmode) or [`separateDialCode`](/docs/options#separatedialcode) is enabled.

If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

If you know the user's language, you can translate the country names and UI strings — [see example](/playground?countryNameLocale=ru&i18n=ru#translation-options).

_*Except for some small satellite territories, which share number ranges with the main country (search data.ts for "shared" for examples). When displaying numbers from those shared ranges, we default to selecting the main country._

