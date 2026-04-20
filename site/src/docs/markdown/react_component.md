# React component

A React component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/react/src/IntlTelInput.tsx).

## Contents

- [Demo](#demo)
- [Getting started](#getting-started)
- [Props](#props)
- [Initialisation options](#initialisation-options)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)
- [Troubleshooting](#troubleshooting)

## Demo

You can see a live demo and example code on the [React component](/examples/react-component) example page.

Alternatively, download and build the project yourself in 3 simple steps. You just need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You should now be able to open the validation demo page /react/demo/validation/index.html in your browser and give it a try. View other [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/react/demo).

## Getting started

First, install the package: 

```sh
npm install intl-tel-input
```

Then, add something like this to your code:

```js
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";

<IntlTelInput
  onChangeNumber={setNumber}
  onChangeValidity={setIsValid}
  initialCountry="us"
/>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/validation/ValidationApp.tsx) for a more fleshed-out example of how to handle validation.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about file size), then you can just import `IntlTelInput` from `"intl-tel-input/reactWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/react"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the utils.js file, and then set the `loadUtils` option to that URL, or alternatively just point it to a CDN-hosted version, e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.1/dist/js/utils.js"`.

## Props

###### disabled
Type: `Boolean`  
Default: `false`  

Disables both the telephone input and the selected country button. _Note: We recommend using this instead of `inputProps.disabled`._

###### inputProps
Type: `Object`  
Default: `{}`  

The props to pass to the input element, e.g. `id`, `className`, `placeholder`, `required`, `onBlur`, `defaultValue` etc. Use `defaultValue` to set the initial value of the input - this will get auto-formatted on init (according to `formatOnDisplay` initialisation option).

Note: the following keys are reserved for the component/plugin integration and will be ignored: `type`, `ref`, `onInput`, `value`, `disabled`, `readOnly`. Use the component props (`disabled`, `readOnly`) and the callback props instead.

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

###### readOnly
Type: `Boolean`  
Default: `false`  

Makes the telephone input read-only and disables the selected country button. _Note: We recommend using this instead of `inputProps.readOnly`._

###### usePreciseValidation
Type: `Boolean`
Default: `false`  

By default, we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise`, you can set this to `true`.

###### value
Type: `String`  
Default: `undefined`  

Optional controlled value. If provided, the component becomes controlled — whenever this prop changes, the input is updated via `setNumber` (skipped while the input is focused, to avoid disrupting typing). Leave it `undefined` to keep the component uncontrolled and use `inputProps.defaultValue` for the initial value instead. **Important:** when using `value`, you should also use `onChangeNumber` to keep the value in sync with user input, otherwise programmatic updates (e.g. clearing the input) may not work as expected.


## Initialisation options

All of the plugin's [initialisation options](/docs/options) are supported as individual React props using the same option name.

For example, if you're migrating from older usage like:

```js
<IntlTelInput initOptions={{ initialCountry: "us" }} />
```

Use:

```js
<IntlTelInput initialCountry="us" />
```

## Accessing instance methods

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc) by passing a ref into the IntlTelInput component (using the `ref` prop), and then calling `ref.current.getInstance()`, e.g. `ref.current.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/set-number/SetNumberApp.tsx) for a full example. You can also access the input DOM element in a similar way: `ref.current.getInput()`.

## Accessing static methods

You can access all of the plugin's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the same file as the React component, e.g. `import { intlTelInput } from "intl-tel-input/react"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.

## Troubleshooting

###### Error when toggling presence of IntlTelInput component

Error message: `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`

Solution: wrap the component in a div, e.g.

```js
{showIntlTelInput && (
    <div>
        <IntlTelInput />
    </div>
)}
```
