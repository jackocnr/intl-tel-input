# JavaScript plugin

How to get up and running with the JavaScript plugin. For the  React/Angular/Svelte/Vue components instead, see [Getting started](/docs/getting-started).

## Contents
- [Using a bundler, e.g. Vite](#using-a-bundler-e-g-vite)
- [Using a script tag](#using-a-script-tag)
- [Recommended usage](#recommended-usage)
- [Events](#events)
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

**Load the utils module.** Load [`utils.js`](/docs/utils#loading-the-utils-script) to enable formatting and validation.

**Store and restore numbers in E.164 format.** Since the dial code is embedded in the number (e.g. `"+17024181234"`), you don't need to store the country separately. To read the number out in E.164, use [`getNumber`](/docs/methods#getnumber). To restore it, pass the stored E.164 number as the input value on initialisation — the plugin will automatically set the country<sup>*</sup> and format the number according to your options.

**Validate before saving.** Before storing a number, call [`isValidNumber`](/docs/methods#isvalidnumber) (requires the utils module) and reject invalid input.

**Set the initial country.** If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

**Translate the UI.** If you know the user's language, you can translate the country names and UI strings — see [Localisation](/docs/localisation).

_<sup>*</sup>Except for some small satellite territories, which share number ranges with the main country, in which case we default to selecting the main country._

## Events

The plugin triggers the following custom events on the `<input>` element. Listen for them with `input.addEventListener(...)`.

### countrychange

Triggered when the selected country is updated, e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call [`setCountry`](/docs/methods#setcountry) etc. The selected country data is available at `e.detail` (the same data returned by [`getSelectedCountryData`](/docs/methods#getselectedcountrydata)).

```js
input.addEventListener("countrychange", (e) => {
  // country data
  const { iso2, dialCode, name } = e.detail;
});
```

### open:countrydropdown

Triggered when the user opens the dropdown.

### close:countrydropdown

Triggered when the user closes the dropdown.

### strict:reject

Only fires when [`strictMode`](/docs/options#strictmode) is enabled. Triggered when a keystroke or paste is rejected or modified by strict mode — e.g. the character is not allowed, or the input would exceed the maximum valid length for the selected country. Useful for giving the user feedback (e.g. a shake animation, toast, or aria-live announcement) instead of the input being silently dropped.

`e.detail` contains:
- `source`: `"key"` (a keystroke) or `"paste"` (clipboard paste)
- `rejectedInput`: the pressed key (e.g. `"a"`) or the raw pasted string
- `reason`: `"invalid"` (disallowed character(s)) or `"max-length"` (would exceed the max valid length)

```js
input.addEventListener("strict:reject", (e) => {
  const { source, rejectedInput, reason } = e.detail;
});
```

#### Worked example: Bootstrap toast

Here is a worked example showing a [Bootstrap toast](https://getbootstrap.com/docs/5.3/components/toasts/) with a contextual message when input is rejected.

First, add the toast markup alongside your input. The outer `toast-container` below pins the toast to the top-right of the viewport as a simple, portable default — adapt the utility classes to suit your layout (on this site, for example, we position the toast directly above the input):

```html
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="strictRejectToast" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
    <div class="d-flex">
      <div class="toast-body" id="strictRejectToastBody"></div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>
```

Then wire up the `strict:reject` listener to populate and show it:

```js
const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
const toast = bootstrap.Toast.getOrCreateInstance(toastEl);

input.addEventListener("strict:reject", (e) => {
  const { source, rejectedInput, reason } = e.detail;
  if (reason === "max-length") {
    toastBody.textContent = "Maximum length reached for this country";
  } else if (source === "paste") {
    toastBody.textContent = "Stripped invalid characters from pasted text";
  } else {
    toastBody.textContent = `Character not allowed: "${rejectedInput}"`;
  }
  toast.show();
});
```

## Next steps

The plugin has dozens of [initialisation options](/docs/options) for customizing its behaviour — country picker, formatting, validation, placeholders, localisation, and more. Browse the full list, or try them interactively in the [playground](/playground).

