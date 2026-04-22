# Svelte component

A Svelte 5 component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/src/IntlTelInput.svelte), see a live demo on the [Svelte component](/examples/svelte-component) example page, or follow the [README](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/README.md) to run the full set of demos locally.

## Contents

- [Installation](#installation)
- [Props](#props)
- [Plugin initialisation options](#plugin-initialisation-options)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)

## Installation

First, install the package: 

```sh
npm install intl-tel-input
```

Then, add something like this to your code:

```html
<script>
  import IntlTelInput from "intl-tel-input/svelte";
  import "intl-tel-input/styles";
</script>

<IntlTelInput
  initialCountry="us"
  loadUtils={() => import("intl-tel-input/utils")}
/>
```

> [!NOTE]
> The utils script (~260KB) is loaded separately. The example above passes a dynamic import to [`loadUtils`](/docs/options#loadutils) — modern bundlers split this into its own lazy-loaded chunk, so it doesn't hit your initial bundle. Alternatively, if `IntlTelInput` is already lazy-loaded in your app, import from `"intl-tel-input/svelteWithUtils"` to bundle utils directly.

See [Best practices](/docs/best-practices) for general advice on validation, E.164 storage, initial country, and localisation.

## Props

Any of the plugin's [initialisation options](#plugin-initialisation-options) (like `initialCountry`) can also be passed as a prop.

###### disabled
Type: `boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. Use this instead of `inputProps.disabled`, as this disables the country button too.

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

Sets the readonly attribute of the telephone input and disables the selected country button. Use this instead of `inputProps.readonly`, as this disables the country button too.

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
