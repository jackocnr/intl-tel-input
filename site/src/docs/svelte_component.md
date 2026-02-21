# Svelte Component

A Svelte 5 component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/src/intl-tel-input/IntlTelInput.svelte).

## Table of Contents

- [Demo](#demo)
- [Getting Started](#getting-started)
- [Props](#props)
- [Events](#events)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)

## Demo

You can see a live demo and example code on the [Svelte component](/examples/svelte-component) example page.

Try it for yourself by downloading and building the project yourself in 3 simple steps. You just need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You can then run `npm run svelte:demo` and copy the given URL into your browser. By default, this is set up to show the validation demo - you can change this by locating the `"svelte:demo"` task in the scripts section of package.json, and updating the demo path accordingly. View a list of [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/svelte/demo).

## Getting Started

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

<IntlTelInput
  options={{
    initialCountry: 'us',
  }}
/>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/validation/App.svelte) for a more fleshed-out example of how to handle validation.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize) then you can just import IntlTelInput from `"intl-tel-input/svelteWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/svelte"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the utils.js file, and then set the `loadUtils` option to that URL, or just point it to a CDN-hosted version, e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@26.5.0/build/js/utils.js"`.

## Props

Here's a list of all of the current props you can pass to the IntlTelInput Svelte component.

###### disabled
Type: `Boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. *Note: We recommend using this instead of `inputProps.disabled`.*

###### inputProps
Type: `Object`  
Default: `{}`  

The props to pass to the input element, e.g. `id`, `class`, `placeholder`, `required`, etc. *Note: We recommend using the separate `disabled` prop instead of `inputProps.disabled`.*

###### options
Type: `Object`  
Default: `{}`  

An object containing the [initialisation options](/docs/options) to pass to the plugin. You can use these exactly the same way as with the main JavaScript plugin.

###### value
Type: `String`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input, and so will ignore any changes to this value.

###### onChangeCountry
Type: `Function`  
Default: `null`  

A handler to be called when the selected country changes. It will be passed the new country iso2 code, e.g. "gb" for the UK.

###### onChangeErrorCode
Type: `Function`  
Default: `null`  

A handler to be called when the number validation error changes. It will be passed the new error code (or `null`).

###### onChangeNumber
Type: `Function`  
Default: `null`  

A handler to be called when the number changes. It will be passed the new number.

###### onChangeValidity
Type: `Function`  
Default: `null`  

A handler to be called when the number validity changes, e.g. to true/false. It will be passed the new isValid boolean.

###### usePreciseValidation
Type: `Boolean`
Default: `false`  

By default, we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise`, you can set this to `true`.

<div class="article-ad">
  <ins class="adsbygoogle"
    style="display:block; text-align:center;"
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-1090343328224651"
    data-ad-slot="6972377388"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

## Accessing Instance Methods

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc.) by passing a ref into the IntlTelInput component (using `bind:this`), and then calling the `getInstance()` method, e.g. `ref.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/demo/set-number/App.svelte) for a full example. You can also access the input DOM element via: `ref.getInput()`.

## Accessing Static Methods

You can access all of the plugin's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the core package, e.g. `import intlTelInput from "intl-tel-input"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
