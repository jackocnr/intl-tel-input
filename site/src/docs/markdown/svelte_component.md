# Svelte component

A Svelte 5 component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/src/IntlTelInput.svelte).

## Contents

- [Demo](#demo)
- [Getting started](#getting-started)
- [Props](#props)
- [Plugin initialisation options](#plugin-initialisation-options)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)

## Demo

You can see a live demo and example code on the [Svelte component](/examples/svelte-component) example page.

Alternatively, download and build the project yourself in 3 simple steps. You just need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You can then run `npm run svelte:demo` and copy the given URL into your browser. This defaults to the validation demo — to run a different one, set the `DEMO` env var, e.g. `DEMO=simple npm run svelte:demo`. View a list of [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/svelte/demo).

## Getting started

First, install the package: 

```sh
npm install intl-tel-input
```

Then, add something like this to your code:

```html
<script>
  import IntlTelInput from "intl-tel-input/svelteWithUtils";
  import "intl-tel-input/styles";
</script>

<IntlTelInput initialCountry="us" />
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/validation/App.svelte) for a more fleshed-out example of how to handle validation.

> [!NOTE]
> The package ships the raw `.svelte` source file rather than a pre-built `.mjs` bundle, so your project's existing Svelte tooling compiles it alongside your own components. Any standard Svelte setup (SvelteKit, Vite + `@sveltejs/vite-plugin-svelte`, etc.) handles this out of the box.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about file size), then you can just import `IntlTelInput` from `"intl-tel-input/svelteWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/svelte"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the utils.js file, and then set the `loadUtils` option to that URL, or alternatively just point it to a CDN-hosted version, e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/utils.js"`.

## Props

Any of the plugin's [initialisation options](#plugin-initialisation-options) (like `initialCountry`) can also be passed as a prop.

###### disabled
Type: `boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. *Note: We recommend using this instead of `inputProps.disabled`.*

###### initialValue
Type: `string`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). Only used during initialisation — for ongoing reactive updates, use the `value` prop instead.

###### inputProps
Type: `object`  
Default: `{}`  

The props to pass to the input element, e.g. `id`, `class`, `placeholder`, `required`, `onblur`, etc.

> [!NOTE]
> The following keys are reserved for the component/plugin integration and will be ignored: `type`, `value`, `disabled`, `readonly`, `oninput`. Use the component props (`disabled`, `readonly`) and the `onChange...` callback props instead.

###### onChangeCountry
Type: `(iso2: string) => void`  
Default: `null`  

A handler to be called when the selected country changes. Receives the new country's iso2 code (e.g. `"gb"`), or `""` if no country is selected.

###### onChangeErrorCode
Type: `(errorCode: number | null) => void`  
Default: `null`  

A handler to be called when the number validation error changes. Receives an integer that matches the [`intlTelInput.utils.validationError`](/docs/methods#getvalidationerror) enum, or `null` if the number is valid. Requires the utils script to be loaded (see above).

###### onChangeNumber
Type: `(number: string) => void`  
Default: `null`  

A handler to be called when the number changes. Receives the new number in standardised E.164 format (e.g. `"+447700900123"`), or `""` if the input is empty. Requires the utils script to be loaded (see above).

###### onChangeValidity
Type: `(isValid: boolean) => void`  
Default: `null`  

A handler to be called when the number validity changes. Receives the new validity boolean. Requires the utils script to be loaded (see above).

###### onCloseCountryDropdown
Type: `() => void`  
Default: `null`  

A handler to be called when the country dropdown closes.

###### onOpenCountryDropdown
Type: `() => void`  
Default: `null`  

A handler to be called when the country dropdown opens.

###### onStrictReject
Type: `(source: "key" | "paste", rejectedInput: string, reason: "invalid" | "max-length") => void`  
Default: `null`  

A handler to be called when [`strictMode`](/docs/options#strictmode) rejects or modifies input. The handler receives three arguments describing what was rejected and why, so you can give the user appropriate feedback (e.g. a toast or a shake animation):

- `source`: either `"key"` (a keystroke) or `"paste"` (a clipboard paste).
- `rejectedInput`: the raw string that was rejected or stripped — for `"key"` this is the single character pressed, and for `"paste"` it's the full pasted text.
- `reason`: either `"invalid"` (the input contained a disallowed character) or `"max-length"` (accepting the input would have exceeded the maximum valid length for the selected country).

Here is an example that selects a user-facing message based on these args:

```js
if (reason === "max-length") msg = "Maximum length reached for this country";
else if (source === "paste") msg = "Stripped invalid characters from pasted text";
else msg = `Character not allowed: "${rejectedInput}"`;
```

###### readonly
Type: `boolean`  
Default: `false`  

Sets the readonly attribute of the telephone input and disables the selected country button. *Note: We recommend using this instead of `inputProps.readonly`.*

###### usePreciseValidation
Type: `boolean`  
Default: `false`  

By default, we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise`, you can set this to `true`.

###### value
Type: `string`  
Default: `undefined`  

Optional controlled value. If provided, the component becomes controlled — whenever this prop changes, the input is updated via `setNumber` (skipped while the input is focused, to avoid disrupting typing). Leave it `undefined` to keep the component uncontrolled and use `initialValue` for the initial value instead. **Important:** when using `value`, you should also use `onChangeNumber` to keep the value in sync with user input, otherwise programmatic updates (e.g. clearing the input) may not work as expected.


## Plugin initialisation options

All of the plugin's [initialisation options](/docs/options) are supported as individual Svelte component props using the same option name. For example:

```js
<IntlTelInput initialCountry="us" />
```

> [!NOTE]
> If you're migrating from an older version, the previous `initOptions={{ initialCountry: "us" }}` style is no longer supported — pass each option as its own prop instead.

## Accessing instance methods

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc.) by passing a ref into the IntlTelInput component (using `bind:this`), and then calling the `getInstance()` method, e.g. `ref.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/set-number/App.svelte) for a full example. You can also access the input DOM element via: `ref.getInput()`.

## Accessing static methods

You can access all of the plugin's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the same file as the Svelte component, e.g. `import { intlTelInput } from "intl-tel-input/svelte"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
