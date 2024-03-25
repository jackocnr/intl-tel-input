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
The props to pass to the input element e.g. `className`, `placeholder`, `required`, `disabled`, `onBlur` etc.
