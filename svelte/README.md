# IntlTelInput Svelte Component
A Svelte 5 component wrapper for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/src/intl-tel-input/IntlTelInput.svelte).

## Table of Contents
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Props](#props)
- [Events](#events)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)

## Demo
Try it for yourself by downloading the project and running `npm install` and then `npm run svelte:demo` and then copy the given URL into your browser.

## Getting Started
```svelte
<script>
  import IntlTelInput from "intl-tel-input/svelteWithUtils";
  import "intl-tel-input/styles";
</script>

<IntlTelInput
  options={{ initialCountry: 'us' }}
/>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/validation/App.svelte) for a more fleshed-out example of how to handle validation. Make sure to change the path in the `package.json` script to the correct demo if you're running it locally e.g.:

```
"svelte:demo": "vite --config svelte/demo/[demo variant]/vite.config.mjs"
```

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize) then you can just import IntlTelInput from `"intl-tel-input/svelteWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/svelte"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the [utils.js](https://github.com/jackocnr/intl-tel-input/blob/master/build/js/utils.js) file, and then set the `loadUtils` option to that URL, or alternatively just point it to a CDN hosted version e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@25.14.1/build/js/utils.js"`.

## Props
Here's a list of all of the current props you can pass to the IntlTelInput Svelte component.

**disabled**  
Type: `Boolean`, Default: `false`  
Sets the disabled attribute of both the telephone input and selected country button. *Note: we recommend using this instead of `inputProps.disabled`.*

**inputProps**  
Type: `Object`  
The props to pass to the input element e.g. `id`, `class`, `placeholder`, `required` etc. *Note: we recommend using the separate `disabled` prop instead of `inputProps.disabled`.*

**options**  
Type: `Object`  
An object containing the [initialisation options](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options) to pass to the plugin. You can use these exactly the same way as with the main JavaScript plugin.

**value**  
Type: `String`  
The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input, and so will ignore any changes to this value.

## Events
Here's a list of all of the current event handlers you can pass to the IntlTelInput Svelte component.

**onChangeCountry**  
Type: `Function`  
A handler to be called when the selected country changes. It will be passed the new country iso2 code e.g. "gb" for UK.

**onChangeErrorCode**  
Type: `Function`  
A handler to be called when the number validation error changes. It will be passed the new error code (or `null`).

**onChangeNumber**  
Type: `Function`  
A handler to be called when the number changes. It will be passed the new number.

**onChangeValidity**  
Type: `Function`  
A handler to be called when the number validity changes e.g. to true/false. It will be passed the new isValid boolean.

## Accessing Instance Methods

You can access all of the plugin's [instance methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType` etc) by passing a ref into the IntlTelInput component (using `bind:this`), and then calling the `getInstance()` method e.g. `ref.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/set-number/App.svelte) for a full example. You can also access the input DOM element via: `ref.getInput()`.

## Accessing Static Methods

You can access all of the plugin's [static methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#static-methods) by importing `intlTelInput` from the core package e.g. `import intlTelInput from "intl-tel-input"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
