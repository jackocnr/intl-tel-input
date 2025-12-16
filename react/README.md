# IntlTelInput React Component
A React component wrapper for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/react/src/intl-tel-input/react.tsx).

## Table of Contents
- [Demo and Examples](#demo-and-examples)
- [Getting Started](#getting-started)
- [Utils Script](#utils-script)
- [Props](#props)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)
- [Troubleshooting](#troubleshooting)

## Demo and Examples
Check out [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--vanilla) where you can play with the various props. Alternatively, try it for yourself by downloading the project and opening /react/demo/validation.html (etc) in a browser.

## Getting Started
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

## Utils Script
A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize), then you can just import IntlTelInput from `"intl-tel-input/reactWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/react"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the [utils.js](https://github.com/jackocnr/intl-tel-input/blob/master/build/js/utils.js) file, and then set the `loadUtils` option to that URL, or just point it to a CDN hosted version e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js"`.

## Props
Here's a list of all of the current props you can pass to the IntlTelInput React component.

**disabled**    
Type: `Boolean`, Default: `false`   
Sets the disabled attribute of both the telephone input and the selected country button. _Note: we recommend using this instead of `inputProps.disabled`._

**initialValue**  
Type: `String`
The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input and so will ignore any changes to this value.

**initOptions**  
Type: `Object`  
An object containing the [initialisation options](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options) to pass to the plugin. These can be used exactly the same way as with the main JavaScript plugin.

**inputProps**  
Type: `Object`  
The props to pass to the input element, e.g. `className`, `placeholder`, `required`, `onBlur`, etc. _Note: we recommend using the separate `disabled` prop instead of `inputProps.disabled`._

**onChangeCountry**  
Type: `Function`  
A handler to be called when the selected country changes. It will receive the new country iso2 code, e.g. "gb" for the UK.

**onChangeErrorCode**  
Type: `Function`  
A handler to be called when the number validation error changes. It will receive the new error code (or `null`). Requires the [utils script](#utils-script) to be loaded.

**onChangeNumber**  
Type: `Function`  
A handler to be called when the number changes. For valid numbers (see `onChangeValidity`), it will receive the new number in the standard E.164 format. Requires the [utils script](#utils-script) to be loaded.

**onChangeValidity**  
Type: `Function`  
A handler to be called when the number validity changes, e.g. to true/false. It will receive the new isValid boolean. Requires the [utils script](#utils-script) to be loaded.

**usePreciseValidation**  
Type: `Boolean`, Default: `false`  
By default, we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise`, you can set this to `true`.

## Accessing Instance Methods

You can access all of the plugin's [instance methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc) by passing a ref into the IntlTelInput component (using the `ref` prop), and then calling `ref.current.getInstance()`, e.g. `ref.current.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/react/demo/set-number/SetNumberApp.tsx) for a full example. You can also access the input DOM element in a similar way: `ref.current.getInput()`.

## Accessing Static Methods

You can access all of the plugin's [static methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#static-methods) by importing `intlTelInput` from the same file as the React component, e.g. `import { intlTelInput } from "intl-tel-input/react"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.

## Troubleshooting

**Error when toggling presence of IntlTelInput component**  

Error message: `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`

Solution: wrap the component in a div, e.g.

```js
{showIntlTelInput && (
    <div>
        <IntlTelInput />
    </div>
)}
```
