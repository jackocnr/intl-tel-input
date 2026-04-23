# JavaScript plugin

How to get up and running with the JavaScript plugin. For the framework components instead, see [React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component), or [Svelte](/docs/svelte-component).


## Contents
- [Installation](#installation)
- [Initialisation options](#initialisation-options)
- [Methods](#methods)
- [Events](#events)
- [Next steps](#next-steps)


## Installation

There are two ways to install the plugin: [using a bundler](#using-a-bundler) (e.g. Vite, webpack), or [using a script tag](#using-a-script-tag) (e.g. via a CDN).

##### Using a bundler

First, install the package: 

```bash
npm install intl-tel-input
```

Then, import the JS and CSS, and initialise the plugin on your input element:

```js
import intlTelInput from "intl-tel-input";
import "intl-tel-input/styles";

const input = document.querySelector("#phone");
intlTelInput(input, {
  loadUtils: () => import("intl-tel-input/utils"),
});
```

> [!NOTE]
> The utils script (~260KB) is loaded separately. The example above passes a dynamic import to [`loadUtils`](/docs/options#loadutils) — modern bundlers split this into its own lazy-loaded chunk, so it doesn't hit your initial bundle. Alternatively, if the plugin is already lazy-loaded in your app, import from `"intl-tel-input/intlTelInputWithUtils"` to bundle utils directly.

##### Using a script tag

This example loads the assets from [jsDelivr](https://www.jsdelivr.com/) for a quick start. Alternatively, use your own hosted files.

First, add the CSS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/css/intlTelInput.css">
```

Then, add the plugin script and initialise it on your input element:

```html
<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/intlTelInput.min.js"></script>
<script>
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/utils.js"),
  });
</script>
```


## Best practices

See [Best practices](/docs/best-practices) for general advice on loading the utils module, E.164 storage, validation, setting the initial country, strict mode, and localisation.


## Initialisation options

The plugin has dozens of options for customising its behaviour — country picker, formatting, validation, placeholders, localisation, and more. See the full list on the [Initialisation options](/docs/options) page, or try them interactively in the [playground](/playground).


## Methods

Once the plugin is initialised, you can call methods on the returned instance — e.g. `setNumber`, `setCountry`, `getNumber`, `isValidNumber`. See the full list on the [Methods](/docs/methods) page.


## Events

The plugin triggers the following custom events on the `<input>` element. Listen for them with `input.addEventListener(...)`.

##### countrychange

Triggered when the selected country is updated, e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call [`setCountry`](/docs/methods#setcountry) etc. The selected country data is available at `e.detail` (the same data returned by [`getSelectedCountryData`](/docs/methods#getselectedcountrydata)).

```js
input.addEventListener("countrychange", (e) => {
  // country data
  const { iso2, dialCode, name } = e.detail;
});
```

##### open:countrydropdown

Triggered when the user opens the dropdown.

##### close:countrydropdown

Triggered when the user closes the dropdown.

##### strict:reject

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

###### Worked example: Bootstrap toast

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
