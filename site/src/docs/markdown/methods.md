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

These methods are called on the plugin instance. The examples below all use a variable named `iti` for the instance — how you get hold of it depends on the integration:

- **JavaScript plugin**: `const iti = intlTelInput(input, options)` — directly from the initialisation call.
- **React**: `const iti = ref.current.getInstance()` — see [Accessing instance methods](/docs/react-component#accessing-instance-methods).
- **Vue**: `const iti = ref.value.instance` — see [Accessing instance methods](/docs/vue-component#accessing-instance-methods).
- **Angular**: `const iti = this.ref.getInstance()` — see [Accessing instance methods](/docs/angular-component#accessing-instance-methods).
- **Svelte**: `const iti = ref.getInstance()` — see [Accessing instance methods](/docs/svelte-component#accessing-instance-methods).

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
Type: `(format?: NumberFormat) => string`  

Get the current number in the given [`NumberFormat`](/docs/types#numberformat) (defaults to `"E164"`). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note that even if [`nationalMode`](/docs/options#nationalmode) is enabled, this can still return a full international number. Also note that this method expects a valid number, and so should only be used after validation._  

```js
const number = iti.getNumber(); // defaults to "E164" e.g. "+17024181234"
// or
const number = iti.getNumber("INTERNATIONAL"); // e.g. "+1 702-418-1234"
```

> [!TIP]
> You can also pass a [constant](/docs/types#constant-objects), e.g. `iti.getNumber(intlTelInput.NUMBER_FORMAT.INTERNATIONAL)` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.

###### getNumberType
Type: `() => NumberType | null`  

Get the [`NumberType`](/docs/types#numbertype) (fixed-line/mobile/toll-free, etc) of the current number, or `null` if it can't be determined. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script).

```js
const numberType = iti.getNumberType();
if (numberType === "MOBILE" || numberType === "FIXED_LINE_OR_MOBILE") {
    // is (or could be) a mobile number
}
```

> [!TIP]
> You can also compare against a [constant](/docs/types#constant-objects), e.g. `numberType === intlTelInput.NUMBER_TYPE.MOBILE` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.

> [!NOTE]
> In some countries (e.g. the US) there's no way to differentiate between fixed-line and mobile numbers, so in those cases it will return `"FIXED_LINE_OR_MOBILE"` — hence the need to check for both values above.

###### getSelectedCountryData
Type: `() => Country | null`  

Get the [`Country`](/docs/types#country) for the currently selected country, or `null` if no country is currently selected (e.g. the empty/globe state).
```js
const countryData = iti.getSelectedCountryData();
```

###### getValidationError
Type: `() => ValidationError | null`  

Get more information about an invalid number — returns a [`ValidationError`](/docs/types#validationerror) string, or `null` if it can't be determined. See [Deriving a user-facing error message](/docs/best-practices#deriving-a-user-facing-error-message) for a worked example. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script).

###### isValidNumber
Type: `() => boolean`  

(Note: only returns `true` for valid **mobile** and **fixed_line** numbers by default - see [`allowedNumberTypes`](/docs/options#allowednumbertypes))  
Check if the current number is valid based on its length - [see example](/examples/javascript-plugin/validation), which should be sufficient for most use cases. See [`isValidNumberPrecise`](/docs/methods#isvalidnumberprecise) (advanced) for more precise validation, but the advantage of [`isValidNumber`](/docs/methods#isvalidnumber) is that it is much more future-proof, as while countries around the world regularly update their number rules, they rarely change their number lengths. If this method returns `false`, you can use [`getValidationError`](/docs/methods#getvalidationerror) to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note: previously named `isPossibleNumber`._  

```js
const isValid = iti.isValidNumber();
```
Returns: `true`/`false`

###### isValidNumberPrecise
Type: `() => boolean`  

⚠️ **ADVANCED**  
(Note: only returns `true` for valid **mobile** and **fixed_line** numbers by default - see [`allowedNumberTypes`](/docs/options#allowednumbertypes))  
Check if the current number is valid using precise matching rules for each country/area code, etc - [see example](/examples/javascript-plugin/validation-precise). Note that these rules change each month for various countries around the world, so you need to constantly keep the plugin up-to-date (e.g. via an automated script) else **you will start rejecting valid numbers**. For a simpler and more future-proof form of validation, see [`isValidNumber`](/docs/methods#isvalidnumber) above. If validation fails, you can use [`getValidationError`](/docs/methods#getvalidationerror) to get more information. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script).  

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
Type: `(type: NumberType) => void`  

Change the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option — see [`NumberType`](/docs/types#numbertype) for the valid values.

```js
iti.setPlaceholderNumberType("FIXED_LINE");
```

> [!TIP]
> You can also pass a [constant](/docs/types#constant-objects), e.g. `iti.setPlaceholderNumberType(intlTelInput.NUMBER_TYPE.FIXED_LINE)` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.

###### setReadonly
Type: `(readonly: boolean) => void`  

Updates the readonly attribute of the telephone input and disables the selected country button. Accepts a boolean value. Use this instead of updating the input's readonly attribute directly, as this disables the country button too.

```js
iti.setReadonly(true);
```

## Static Methods

###### attachUtils
Type: `(source: () => Promise<unknown>) => Promise<unknown> | null`  

An alternative to the [`loadUtils`](/docs/options#loadutils) option (which loads the utils.js script at plugin initialisation time), this method allows you to load the utils at your time of choosing. See [Loading The Utils Script](/docs/utils#loading-the-utils-script) for more information. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object is returned so you can `await` it to know when it's finished.

```js
const loadUtils = () => import("/dist/js/utils.js");
await intlTelInput.attachUtils(loadUtils);
// you can now call methods that use utils
```

> [!NOTE]
> This method should only be called once per page - it will return `null` if utils have already been loaded, or are in the process of being loaded.

###### getCountryData
Type: `() => Country[]`  

Retrieve the plugin's country data — either to re-use elsewhere (e.g. to generate your own country dropdown), or alternatively, you could use it to modify the country data. _Note that any modifications must be done before initialising the plugin._ See [`Country`](/docs/types#country) for the shape of each entry.

```js
const countryData = intlTelInput.getCountryData();
```

###### getInstance
Type: `(input: HTMLInputElement) => Iti | null`  

After initialising the plugin, you can always access the instance again using this method, by just passing in the relevant input element.

```js
const input = document.querySelector('#phone');
const iti = intlTelInput.getInstance(input);
iti.isValidNumber(); // etc
```
