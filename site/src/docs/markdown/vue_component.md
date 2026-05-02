# Vue component

A Vue component for the `intl-tel-input` library. See a live demo on the [Validation](/examples/vue-component/validation) example page.

## Contents

- [Installation](#installation)
- [Props](#props)
- [Initialisation options](#initialisation-options)
- [Events](#events)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)

## Installation

First, install the package: 

```sh
npm install @intl-tel-input/vue
```

Then, add something like this to your code:

```html
<script setup>
  import IntlTelInput from "@intl-tel-input/vue";
  import "intl-tel-input/styles";
</script>

<template>
  <IntlTelInput
    initialCountry="us"
    :load-utils="() => import('intl-tel-input/utils')"
  />
</template>
```

> [!NOTE]
> The utils script (~260KB) is loaded separately. The example above passes a dynamic import to [`loadUtils`](/docs/options#loadutils) — modern bundlers split this into its own lazy-loaded chunk, so it doesn't hit your initial bundle. Alternatively, if `IntlTelInput` is already lazy-loaded in your app, import from `"@intl-tel-input/vue/with-utils"` to bundle utils directly.

See [Best practices](/docs/best-practices) for general advice on validation, E.164 storage, initial country, and localisation.

## Props

Any of the [initialisation options](#initialisation-options) (like `initialCountry`) can also be passed as a prop.

###### disabled
Type: `boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. Use this instead of `inputProps.disabled`, as this disables the country button too.

###### initialValue
Type: `string`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). Only used during initialisation — for ongoing reactive updates, use `v-model` instead.

###### inputProps
Type: `object`  
Default: `{}`  

The props to pass to the input element, e.g. `id`, `class`, `placeholder`, `required`, `onBlur`.

> [!NOTE]
> The following keys are reserved for the component/core library integration and will be ignored: `type`, `value`, `disabled`, `readonly`, `onInput`, `oninput`. Use the component props (`disabled`, `readonly`) and component events (`changeNumber`, `changeCountry`, etc.) instead.

###### readonly
Type: `boolean`  
Default: `false`  

Sets the readonly attribute of the telephone input and disables the selected country button. Use this instead of `inputProps.readonly`, as this disables the country button too.

###### usePreciseValidation
Type: `boolean`
Default: `false`  

By default, the component uses the core library's `isValidNumber` method for validation, but if you'd rather use `isValidNumberPrecise`, set this to `true`.

###### v-model (modelValue)
Type: `string`  
Default: `undefined`  

The component supports `v-model` for two-way binding. When the bound value changes, the input is updated via `setNumber` (skipped while the input is focused, to avoid disrupting typing). When the user types, the bound value is kept in sync via the `update:modelValue` event. If you don't use `v-model`, the component is uncontrolled — use `initialValue` for the starting value.

```js
<IntlTelInput v-model="phone" />
```


## Initialisation options

All of the core library's [initialisation options](/docs/options) are supported as individual Vue component props using the same option name. For example:

```js
<IntlTelInput initialCountry="us" />
```

In Vue templates you can also use the kebab-case form (e.g. `initial-country`) if you prefer — both work.

> [!NOTE]
> If you're migrating from an older version, the previous `:initOptions="{ initialCountry: 'us' }"` style is no longer supported — pass each option as its own prop instead.


## Events

###### changeCountry
Type: `(iso2: string) => void`  
Default: `null`  

Emitted when the selected country changes. The handler receives the new country's iso2 code (e.g. `"gb"`), or `""` if no country is selected.

###### changeErrorCode
Type: `(errorCode: ValidationError | null) => void`  
Default: `null`  

Emitted when the number validation error changes. The handler receives a [`ValidationError`](/docs/types#validationerror) string, or `null` if the number is valid. See [Show a user-facing error message](/docs/best-practices#show-a-user-facing-error-message) for how to turn the error code into a message. Requires the utils script to be loaded (see above).

###### changeNumber
Type: `(number: string) => void`  
Default: `null`  

Emitted when the number changes. The handler receives the new number in standardised E.164 format (e.g. `"+447700900123"`), or `""` if the input is empty. Requires the utils script to be loaded (see above).

###### changeValidity
Type: `(isValid: boolean) => void`  
Default: `null`  

Emitted when the number validity changes. The handler receives the new validity boolean. Requires the utils script to be loaded (see above).

###### closeCountryDropdown
Type: `() => void`  
Default: `null`  

Emitted when the country dropdown closes.

###### openCountryDropdown
Type: `() => void`  
Default: `null`  

Emitted when the country dropdown opens.

###### strictReject
Type: `(source: "key" | "paste", rejectedInput: string, reason: "invalid" | "max-length") => void`  
Default: `null`  

Emitted when [`strictMode`](/docs/options#strictmode) rejects or modifies input. For most cases, [`strictRejectAnimation`](/docs/options#strictrejectanimation) gives you a built-in shake/flash animation without writing any handler code — only reach for `strictReject` when you need custom feedback (e.g. a toast that explains _why_ the input was rejected).

The handler receives three arguments describing what was rejected and why:

- `source`: either `"key"` (a keystroke) or `"paste"` (a clipboard paste).
- `rejectedInput`: the raw string that was rejected or stripped — for `"key"` this is the single character pressed, and for `"paste"` it's the full pasted text.
- `reason`: either `"invalid"` (the input contained a disallowed character) or `"max-length"` (accepting the input would have exceeded the maximum valid length for the selected country).

Here is an example that selects a user-facing message based on these args:

```js
if (reason === "max-length") msg = "Maximum length reached for this country";
else if (source === "paste") msg = "Stripped invalid characters from pasted text";
else msg = `Character not allowed: "${rejectedInput}"`;
```

## Accessing instance methods

You can access all of the core library's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc.) by passing a ref into the IntlTelInput component (using the `ref` prop), and then accessing `ref.value.instance`, e.g. `ref.value?.instance?.setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/packages/vue/demo/set-number/App.vue) for a full example. You can also access the input DOM element in a similar way: `ref.value?.input`.

## Accessing static methods

You can access all of the core library's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the same file as the Vue component, e.g. `import { intlTelInput } from "@intl-tel-input/vue"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the core library directly, e.g. `intlTelInput.getCountryData()` etc.
