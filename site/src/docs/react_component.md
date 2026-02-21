# React Component

A React component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/react/src/intl-tel-input/react.tsx).

## Table of Contents

- [Demo and Examples](#demo-and-examples)
- [Getting Started](#getting-started)
- [Props](#props)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)
- [Troubleshooting](#troubleshooting)

## Demo and Examples

You can see a live demo and example code on the [React component](/examples/react-component) example page.

Alternatively, download and build the project yourself in 3 simple steps. You just need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You should now be able to open the validation demo page /react/demo/validation/validation.html in your browser and give it a try. View other available demos [here](https://github.com/jackocnr/intl-tel-input/tree/master/react/demo).

## Getting Started

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
    initOptions={{
        initialCountry: "us",
    }}
/>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/validation/ValidationApp.tsx) for a more fleshed-out example of how to handle validation.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize), then you can just import IntlTelInput from `"intl-tel-input/reactWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/react"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the utils.js file, and then set the `loadUtils` option to that URL, or just point it to a CDN-hosted version, e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@26.5.0/build/js/utils.js"`.

## Props

Here's a list of all of the current props you can pass to the IntlTelInput React component.

###### disabled
Type: `Boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. _Note: We recommend using this instead of `inputProps.disabled`._

###### initialValue
Type: `String`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input and so will ignore any changes to this value.

###### initOptions
Type: `Object`  
Default: `{}`  

An object containing the [initialisation options](/docs/options) to pass to the plugin. These can be used exactly the same way as with the main JavaScript plugin.

###### inputProps
Type: `Object`  
Default: `{}`  

The props to pass to the input element, e.g. `className`, `placeholder`, `required`, `onBlur`, etc. _Note: We recommend using the separate `disabled` prop instead of `inputProps.disabled`._

###### onChangeCountry
Type: `Function`  
Default: `null`  

A handler to be called when the selected country changes. It will receive the new country iso2 code, e.g. "gb" for the UK.

###### onChangeErrorCode
Type: `Function`  
Default: `null`  

A handler to be called when the number validation error changes. It will receive the new error code (or `null`). Requires the [utils script](#utils-script) to be loaded.

###### onChangeNumber
Type: `Function`  
Default: `null`  

A handler to be called when the number changes. For valid numbers (see `onChangeValidity`), it will receive the new number in the standard E.164 format. Requires the [utils script](#utils-script) to be loaded.

###### onChangeValidity
Type: `Function`  
Default: `null`  

A handler to be called when the number validity changes, e.g. to true/false. It will receive the new isValid boolean. Requires the [utils script](#utils-script) to be loaded.

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

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc) by passing a ref into the IntlTelInput component (using the `ref` prop), and then calling `ref.current.getInstance()`, e.g. `ref.current.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/set-number/SetNumberApp.tsx) for a full example. You can also access the input DOM element in a similar way: `ref.current.getInput()`.

## Accessing Static Methods

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
