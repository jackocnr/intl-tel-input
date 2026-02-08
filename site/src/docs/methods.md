# Instance Methods

In these examples, `iti` refers to the plugin instance which gets returned when you initialise the plugin, e.g.
```js
const iti = intlTelInput(input);
```

## destroy

Remove the plugin from the input, and unbind any event listeners.  
```js
iti.destroy();
```

## getExtension

Get the extension from the current number. Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script).
```js
const extension = iti.getExtension();
```
Returns a string, e.g. if the input value was `"(702) 555-5555 ext. 1234"`, this would return `"1234"`

## getNumber

Get the current number in the given format (defaults to [E.164 standard](https://en.wikipedia.org/wiki/E.164)). The different formats are available in the enum `intlTelInput.utils.numberFormat` - which you can see [here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L153). Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script). _Note that even if `nationalMode` is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  
```js
const number = iti.getNumber();
// or
const number = iti.getNumber(intlTelInput.utils.numberFormat.E164);
```
Returns a string e.g. `"+17024181234"`

## getNumberType

Get the type (fixed-line/mobile/toll-free, etc) of the current number. Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script).  
```js
const numberType = iti.getNumberType();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L162) in the enum `intlTelInput.utils.numberType`, e.g.  
```js
if (numberType === intlTelInput.utils.numberType.MOBILE) {
    // is a mobile number
}
```
_Note that in the US, there's no way to differentiate between fixed-line and mobile numbers, so instead it will return `FIXED_LINE_OR_MOBILE`._

## getSelectedCountryData

Get the country data for the currently selected country.  
```js
const countryData = iti.getSelectedCountryData();
```
Returns something like this:
```js
{
  name: "Afghanistan",
  iso2: "af",
  dialCode: "93"
}
```

## getValidationError

Get more information about a validation error. Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script).  
```js
const error = iti.getValidationError();
```
Returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L178) in the enum `intlTelInput.utils.validationError`, e.g.  
```js
if (error === intlTelInput.utils.validationError.TOO_SHORT) {
    // the number is too short
}
```

## isValidNumber

(Note: only returns `true` for valid <ins>mobile numbers</ins> by default - see `allowedNumberTypes`)  
Check if the current number is valid based on its length - [see example](/examples/validation-practical), which should be sufficient for most use cases. See `isValidNumberPrecise` (DANGEROUS) for more precise validation, but the advantage of `isValidNumber` is that it is much more future-proof, as while countries around the world regularly update their number rules, they rarely change their number lengths. If this method returns `false`, you can use `getValidationError` to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script). _Note: previously named `isPossibleNumber`._  
```js
const isValid = iti.isValidNumber();
```
Returns: `true`/`false`

**isValidNumberPrecise** ⚠️ DANGEROUS  
(Note: only returns `true` for valid <ins>mobile numbers</ins> by default - see `allowedNumberTypes`)  
Check if the current number is valid using precise matching rules for each country/area code, etc - [see example](/examples/validation-precise). Note that these rules change each month for various countries around the world, so you need to constantly keep the plugin up-to-date (e.g. via an automated script) else <ins>you will start rejecting valid numbers</ins>. For a simpler and more future-proof form of validation, see `isValidNumber` above. If validation fails, you can use `getValidationError` to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utilities-script).  
```js
const isValid = iti.isValidNumberPrecise();
```
Returns: `true`/`false`

## setCountry

Change the selected country. It should be rare, if ever, that you need to do this, as the selected country gets updated automatically when calling `setNumber` and passing a number including an international dial code, which is the recommended usage. Note, you can omit the country code argument to set the country to the default empty (globe) state. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number to either national or international format according to the `nationalMode` option._  
```js
iti.setCountry("gb");
```

## setDisabled

Updates the disabled attribute of both the telephone input and the selected country button. Accepts a boolean value. _Note: we recommend using this instead of updating the disabled attribute of the input directly._
```js
iti.setDisabled(true);
```

## setNumber

Insert a number, and update the selected country accordingly. _Note that if `formatOnDisplay` is enabled, this will attempt to format the number to either national or international format according to the `nationalMode` option._  
```js
iti.setNumber("+447733123456");
```

## setPlaceholderNumberType

Change the placeholderNumberType option.
```js
iti.setPlaceholderNumberType("FIXED_LINE");
```

## Static Methods

## getCountryData

Retrieve the plugin's country data - either to re-use elsewhere (e.g. to generate your own country dropdown), or alternatively, you could use it to modify the country data. Note that any modifications must be done before initialising the plugin.  
```js
const countryData = intlTelInput.getCountryData();
```
Returns an array of country objects:
```js
[{
  name: "Afghanistan",
  iso2: "af",
  dialCode: "93"
}, ...]
```

## getInstance

After initialising the plugin, you can always access the instance again using this method, by just passing in the relevant input element.
```js
const input = document.querySelector('#phone');
const iti = intlTelInput.getInstance(input);
iti.isValidNumber(); // etc
```

## attachUtils

An alternative to the `loadUtils` option, this method lets you manually load the utils.js script on demand, to enable formatting/validation etc. See [Loading The Utilities Script](/docs/utils#loading-the-utilities-script) for more information. This method should only be called once per page. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned so you can use `attachUtils().then(...)` to know when it's finished.
```js
const loadUtils = () => import("/build/js/utils.js");
intlTelInput.attachUtils(loadUtils);
```
