# Vue component

A Vue component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/vue/src/IntlTelInput.vue).

## Contents

- [Demo](#demo)
- [Getting started](#getting-started)
- [Props](#props)
- [Initialisation options](#initialisation-options)
- [Events](#events)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)

## Demo

You can see a live demo and example code on the [Vue component](/examples/vue-component) example page.

Alternatively, download and build the project yourself in 3 simple steps. You just need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You can then run `npm run vue:demo` and copy the given URL into your browser. This defaults to the validation demo — to run a different one, set the `DEMO` env var, e.g. `DEMO=simple npm run vue:demo`. View a list of [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/vue/demo).

## Getting started

First, install the package: 

```sh
npm install intl-tel-input
```

Then, add something like this to your code:

```html
<script setup>
  import IntlTelInput from "intl-tel-input/vueWithUtils";
  import "intl-tel-input/styles";
</script>

<template>
  <IntlTelInput initialCountry="us" />
</template>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/vue/demo/validation/App.vue) for a more fleshed-out example of how to handle validation. See the instructions above for how to run this demo (and others) yourself.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about file size), then you can just import `IntlTelInput` from `"intl-tel-input/vueWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/vue"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the utils.js file, and then set the `loadUtils` option to that URL, or alternatively just point it to a CDN-hosted version, e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/utils.js"`.

## Props

###### disabled
Type: `boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. *Note: we recommend using this instead of `inputProps.disabled`.*

###### initialValue
Type: `string`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). Only used during initialisation — for ongoing reactive updates, use `v-model` instead.

###### inputProps
Type: `object`  
Default: `{}`  

The props to pass to the input element, e.g. `id`, `class`, `placeholder`, `required`, `onBlur`.

> [!NOTE]
> The following keys are reserved for the component/plugin integration and will be ignored: `type`, `value`, `disabled`, `readonly`, `onInput`, `oninput`. Use the component props (`disabled`, `readonly`) and component events (`changeNumber`, `changeCountry`, etc.) instead.

###### readonly
Type: `boolean`  
Default: `false`  

Sets the readonly attribute of the telephone input and disables the selected country button. *Note: We recommend using this instead of `inputProps.readonly`.*

###### usePreciseValidation
Type: `boolean`
Default: `false`  

By default, the component uses the plugin's `isValidNumber` method for validation, but if you'd rather use `isValidNumberPrecise`, set this to `true`.

###### v-model (modelValue)
Type: `string`  
Default: `undefined`  

The component supports `v-model` for two-way binding. When the bound value changes, the input is updated via `setNumber` (skipped while the input is focused, to avoid disrupting typing). When the user types, the bound value is kept in sync via the `update:modelValue` event. If you don't use `v-model`, the component is uncontrolled — use `initialValue` for the starting value.

```js
<IntlTelInput v-model="phone" />
```


## Initialisation options

All of the plugin's [initialisation options](/docs/options) are supported as individual Vue component props using the same option name.

For example, if you're migrating from older usage like:

```js
<IntlTelInput :initOptions="{ initialCountry: 'us' }" />
```

Use:

```js
<IntlTelInput initialCountry="us" />
```


## Events

###### changeCountry
Type: `(iso2: string) => void`  
Default: `null`  

Emitted when the selected country changes. The handler receives the new country's iso2 code (e.g. `"gb"`), or `""` if no country is selected.

###### changeErrorCode
Type: `(errorCode: number | null) => void`  
Default: `null`  

Emitted when the number validation error changes. The handler receives an integer that matches the [`intlTelInput.utils.validationError`](/docs/methods#getvalidationerror) enum, or `null` if the number is valid. Requires the utils script to be loaded (see above).

###### changeNumber
Type: `(number: string) => void`  
Default: `null`  

Emitted when the number changes. The handler receives the new number in standardised E.164 format (e.g. `"+447700900123"`), or `""` if the input is empty. Requires the utils script to be loaded (see above).

###### changeValidity
Type: `(isValid: boolean) => void`  
Default: `null`  

Emitted when the number validity changes. The handler receives the new validity boolean. Requires the utils script to be loaded (see above).

## Accessing instance methods

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc.) by passing a ref into the IntlTelInput component (using the `ref` prop), and then accessing `ref.value.instance`, e.g. `ref.value?.instance?.setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/vue/demo/set-number/App.vue) for a full example. You can also access the input DOM element in a similar way: `ref.value?.input`.

## Accessing static methods

You can access all of the plugin's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the same file as the Vue component, e.g. `import { intlTelInput } from "intl-tel-input/vue"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
