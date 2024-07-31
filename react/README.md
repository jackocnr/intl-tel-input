# IntlTelInput React Component
A React component wrapper for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the source code [here](https://github.com/jackocnr/intl-tel-input/blob/master/react/src/intl-tel-input/react.tsx).

## Table of Contents
- [Demo and Examples](#demo-and-examples)
- [Getting Started](#getting-started)
- [Props](#props)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)
- [Troubleshooting](#troubleshooting)

## Demo and Examples
Check out [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--vanilla) where you can play with the various props. Alternatively, try it for yourself by downloading the project and opening /react/demo/validation.html (etc) in a browser.

## Getting Started
```js
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

<IntlTelInput
    onChangeNumber={setNumber}
    onChangeValidity={setIsValid}
    initOptions={{
        initialCountry: "us",
        utilsScript: "path/to/utils.js",
    }}
/>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/ValidationApp.tsx) for a more fleshed out example of how to handle validation.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize) then you can just import IntlTelInput from `"intl-tel-input/reactWithUtils"` instead, to include the utils script. Alternatively, if you use the main `"intl-tel-input/react"` import, then you should couple this with the `utilsScript` initialisation option - you will need to host the [utils.js](https://github.com/jackocnr/intl-tel-input/blob/master/build/js/utils.js) file, and then set the `utilsScript` option to that URL, or alternatively just point it to a CDN hosted version e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js"`.

## Props
Here's a list of all of the current props you can pass to the IntlTelInput react component.

**initialValue**  
Type: `String`
The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input, and so will ignore any changes to this value.

**onChangeNumber**  
Type: `Function`  
A handler to be called when the number changes. It will be passed the new number.

**onChangeCountry**  
Type: `Function`  
A handler to be called when the selected country changes. It will be passed the new country iso2 code e.g. "gb" for UK.

**onChangeValidity**  
Type: `Function`  
A handler to be called when the number validity changes e.g. to true/false. It will be passed the new isValid boolean.

**onChangeErrorCode**  
Type: `Function`  
A handler to be called when the number validation error changes. It will be passed the new error code (or `null`).

**usePreciseValidation**  
Type: `Boolean`, Default: `false`  
By default we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise` you can set this to `true`.

**initOptions**  
Type: `Object`  
An object containing all of the [initialisation options](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options) to pass to the plugin. You can use these exactly the same as when using the plugin with pure JavaScript.

**inputProps**  
Type: `Object`  
The props to pass to the input element e.g. `className`, `placeholder`, `required`, `onBlur` etc. _Note: we recommend using the separate `disabled` prop instead of `inputProps.disabled`._

**disabled**    
Type: `Boolean`, Default: `false`   
Sets the disabled attribute of both the telephone input and selected country button. _Note: we recommend using this instead of `inputProps.disabled`._

## Accessing Instance Methods

You can access all of the plugin's [instance methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType` etc) by passing a ref into the IntlTelInput component (using the `ref` prop), and then calling `ref.current.getInstance()` e.g. `ref.current.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/SetNumberApp.tsx) for a full example. You can also access the input DOM element in a similar way: `ref.current.getInput()`.

## Accessing Static Methods

You can access all of the plugin's [static methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#static-methods) by importing `intlTelInput` from the same file as the react component e.g. `import { intlTelInput } from "intl-tel-input/react"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.

## Troubleshooting

**Error when toggle presence of IntlTelInput component**  

Error message: `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`

Solution: wrap the component in a div e.g.

```js
{showIntlTelInput && (
    <div>
        <IntlTelInput />
    </div>
)}
```
