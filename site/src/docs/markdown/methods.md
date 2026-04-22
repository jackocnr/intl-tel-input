# Methods

This page lists the plugin's public API methods.

## Contents

- [Instance methods](#instance-methods)
  - [destroy](#destroy)
  - [getExtension](#getextension)
  - [getNumber](#getnumber)
  - [getNumberType](#getnumbertype)
  - [getSelectedCountryData](#getselectedcountrydata)
  - [getValidationError](#getvalidationerror)
  - [isValidNumber](#isvalidnumber)
  - [isValidNumberPrecise](#isvalidnumberprecise)
  - [setCountry](#setcountry)
  - [setDisabled](#setdisabled)
  - [setNumber](#setnumber)
  - [setPlaceholderNumberType](#setplaceholdernumbertype)
  - [setReadonly](#setreadonly)
- [Static methods](#static-methods)
  - [attachUtils](#attachutils)
  - [getCountryData](#getcountrydata)
  - [getInstance](#getinstance)

## Instance Methods

These methods are called on the plugin instance. With the [JavaScript plugin](/docs/javascript-plugin) you get the instance directly from the initialisation call `const iti = intlTelInput(input, options)`; with the [React/Vue/Angular/Svelte components](/docs/getting-started) you access it via a `ref` (see each component's docs for the exact syntax). The examples below all use a variable named `iti` for the instance:

> [!IMPORTANT]
> Methods that require the [utils script](/docs/utils#loading-the-utils-script) (e.g. `getNumber`, `getNumberType`, `isValidNumber`) will throw if called before utils have finished loading. Always await `iti.promise` first:
>
> ```js
> await iti.promise;
> const number = iti.getNumber();
> ```

###### destroy
Type: `() => void`  

Remove the plugin from the input, and unbind any event listeners.

```js
iti.destroy();
```

###### getExtension
Type: `() => string`  

Get the extension from the current number. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script).

```js
const extension = iti.getExtension();
```

For example, if the input value was `"(702) 555-5555 ext. 1234"`, this would return `"1234"`.

###### getNumber
Type: `(format?: number) => string`  

Get the current number in the given format (defaults to [E.164 standard](https://en.wikipedia.org/wiki/E.164)). The different formats are available in the enum [`intlTelInput.utils.numberFormat`](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L198). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note that even if [`nationalMode`](/docs/options#nationalmode) is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  

```js
const number = iti.getNumber(); // format defaults to E.164 e.g. "+17024181234"
// or
const { INTERNATIONAL } = intlTelInput.utils.numberFormat;
const number = iti.getNumber(INTERNATIONAL); // e.g. "+1 702-418-1234"
```

###### getNumberType
Type: `() => number`  

Get the type (fixed-line/mobile/toll-free, etc) of the current number. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). It returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L207) in the enum `intlTelInput.utils.numberType`.

```js
const numberType = iti.getNumberType();
const { MOBILE, FIXED_LINE_OR_MOBILE } = intlTelInput.utils.numberType;
if (numberType === MOBILE || numberType === FIXED_LINE_OR_MOBILE) {
    // is (or could be) a mobile number
}
```
_Note that in some countries (e.g. the US) there's no way to differentiate between fixed-line and mobile numbers, so in those cases it will return `FIXED_LINE_OR_MOBILE` — hence the need to check for both values above._

###### getSelectedCountryData
Type: `() => { name: string, iso2: string, dialCode: string } | null`  

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
Returns `null` if no country is currently selected (e.g. the empty/globe state).

###### getValidationError
Type: `() => number`  

Get more information about an invalid number. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). It returns an integer, which you can match against the [various options](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L223) in the enum `intlTelInput.utils.validationError`.

```js
const errorCode = iti.getValidationError();
const { validationError } = intlTelInput.utils;
if (errorCode === validationError.TOO_SHORT) {
    // the number is too short
}
```

**Deriving a user-facing error message**

Several of the [Example pages](/examples/validation-practical) show a `yourCodeToDeriveErrorMessage(value, errorCode)` call — turning the error code into a message is left to you because the wording (and translations) belong to your app. Here is a reasonable starting point which maps the main error codes to a short message:

```js
const getErrorMessage = (number, errorCode) => {
  if (!number) {
    return "Please enter a number";
  }
  const genericError = "Invalid number";
  const { validationError } = intlTelInput.utils;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};
```


###### isValidNumber
Type: `() => boolean`  

(Note: only returns `true` for valid **mobile** and **fixed_line** numbers by default - see [`allowedNumberTypes`](/docs/options#allowednumbertypes))  
Check if the current number is valid based on its length - [see example](/examples/validation-practical), which should be sufficient for most use cases. See [`isValidNumberPrecise`](/docs/methods#isvalidnumberprecise) (advanced) for more precise validation, but the advantage of [`isValidNumber`](/docs/methods#isvalidnumber) is that it is much more future-proof, as while countries around the world regularly update their number rules, they rarely change their number lengths. If this method returns `false`, you can use [`getValidationError`](/docs/methods#getvalidationerror) to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note: previously named `isPossibleNumber`._  

```js
const isValid = iti.isValidNumber();
```
Returns: `true`/`false`

###### isValidNumberPrecise
Type: `() => boolean`  

⚠️ **ADVANCED**  
(Note: only returns `true` for valid **mobile** and **fixed_line** numbers by default - see [`allowedNumberTypes`](/docs/options#allowednumbertypes))  
Check if the current number is valid using precise matching rules for each country/area code, etc - [see example](/examples/validation-precise). Note that these rules change each month for various countries around the world, so you need to constantly keep the plugin up-to-date (e.g. via an automated script) else **you will start rejecting valid numbers**. For a simpler and more future-proof form of validation, see [`isValidNumber`](/docs/methods#isvalidnumber) above. If validation fails, you can use [`getValidationError`](/docs/methods#getvalidationerror) to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script).  

```js
const isValid = iti.isValidNumberPrecise();
```
Returns: `true`/`false`

###### setCountry
Type: `(iso2?: string) => void`  

Change the selected country. It should be rare, if ever, that you need to do this, as the selected country gets updated automatically when calling [`setNumber`](/docs/methods#setnumber) and passing a number including an international dial code, which is the recommended usage. Note, you can omit the iso2 code argument to set the country to the default empty (globe) state. _Note that if [`formatOnDisplay`](/docs/options#formatondisplay) is enabled, this will attempt to format the number to either national or international format according to the [`nationalMode`](/docs/options#nationalmode) option._  

```js
iti.setCountry("gb");
```

###### setDisabled
Type: `(disabled: boolean) => void`  

Updates the disabled attribute of both the telephone input and the selected country button. Accepts a boolean value. Use this instead of updating the input's disabled attribute directly, as this disables the country button too.

```js
iti.setDisabled(true);
```

###### setNumber
Type: `(number: string) => void`  

Insert a number, and update the selected country accordingly. _Note that if [`formatOnDisplay`](/docs/options#formatondisplay) is enabled, this will attempt to format the number to either national or international format according to the [`nationalMode`](/docs/options#nationalmode) option._  

```js
iti.setNumber("+447733123456");
```

###### setPlaceholderNumberType
Type: `(type: string) => void`  

Change the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option.

```js
iti.setPlaceholderNumberType("FIXED_LINE");
```

###### setReadonly
Type: `(readonly: boolean) => void`  

Updates the readonly attribute of the telephone input and disables the selected country button. Accepts a boolean value. Use this instead of updating the input's readonly attribute directly, as this disables the country button too.

```js
iti.setReadonly(true);
```

## Static Methods

###### attachUtils
Type: `(source: () => Promise<unknown>) => Promise<unknown> | null`  

An alternative to the [`loadUtils`](/docs/options#loadutils) option (which loads the utils.js script at plugin initialisation time), this method allows you to load the utils at your time of choosing. See [Loading The Utils Script](/docs/utils#loading-the-utils-script) for more information. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned so you can `await` it to know when it's finished. _Note: This method should only be called once per page - it will return `null` if utils have already been loaded, or are in the process of being loaded._

```js
const loadUtils = () => import("/dist/js/utils.js");
await intlTelInput.attachUtils(loadUtils);
// you can now call methods that use utils
```

###### getCountryData
Type: `() => Array<{ name: string, iso2: string, dialCode: string }>`  

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

###### getInstance
Type: `(input: HTMLInputElement) => Iti | null`  

After initialising the plugin, you can always access the instance again using this method, by just passing in the relevant input element.

```js
const input = document.querySelector('#phone');
const iti = intlTelInput.getInstance(input);
iti.isValidNumber(); // etc
```
