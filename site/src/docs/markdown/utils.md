# Utils script

The utils script is a custom build of Google's [libphonenumber](https://github.com/google/libphonenumber) that powers all formatting, validation, and placeholder generation in the core library.

## Contents

- [Overview](#overview)
- [Loading the utils script](#loading-the-utils-script)
- [Utility functions](#utility-functions)

## Overview

Loading the utils script enables the following features:

* Formatting upon initialisation, as well as with [`getNumber`](/docs/methods#getnumber) and [`setNumber`](/docs/methods#setnumber)
* Validating with [`isValidNumber`](/docs/methods#isvalidnumber), [`getNumberType`](/docs/methods#getnumbertype) and [`getValidationError`](/docs/methods#getvalidationerror) methods
* Generating placeholder numbers for every country - even specify the type of number (e.g. mobile) using the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option
* Extracting the standardised (E.164) international number with [`getNumber`](/docs/methods#getnumber) even when using the [`nationalMode`](/docs/options#nationalmode) option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution we have found is libphonenumber, from which we have precompiled the relevant parts into a single JavaScript file, included in the build directory. Unfortunately, even after modification, it is still ~260KB. See the section below on the best way to load it.

## Loading the utils script

The utils script adds ~260KB on top of the ~30KB core library. There are two ways to load it — **if you're not sure which to pick, use Option 1.** It keeps your initial page load small, which is the safer default for most sites.

**Option 1: Lazy load utils on demand (recommended)**  
Use the [`loadUtils`](/docs/options#loadutils) option to fetch the utils separately. The core library/component loads quickly (~30KB); the ~260KB utils file is fetched in the background after initialisation, so formatting/validation kicks in shortly after the input appears without blocking your initial page load.

**Option 2: Use the all-in-one bundle**  
Each distribution ships a companion entry point that bundles utils directly — `intl-tel-input/intlTelInputWithUtils` for the vanilla JavaScript library, `@intl-tel-input/react/with-utils` for React, `@intl-tel-input/vue/with-utils` for Vue, and so on. Everything works out of the box, with no extra configuration. Best if you're already lazy loading the core library, or if the extra ~260KB up front isn't a concern.

For exact code, see the quick-start on the relevant docs page: [vanilla JavaScript library](/docs/vanilla-javascript), [React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component), or [Svelte](/docs/svelte-component).

## Utility functions

Once the utils script has loaded, its functions are exposed on `intlTelInput.utils`, and can be called directly (without a library instance). Most of the [instance methods](/docs/methods#instance-methods) that require utils are thin wrappers around these — use the instance methods when you have an `iti` to hand, and reach for these directly when you don't (e.g. validating a stored number on its own).

All functions take a lowercase ISO2 country code (e.g. `"us"`), and silently fall back to a safe default (the original input, an empty string, `null`, or `false`) if parsing fails — they don't throw.

> [!IMPORTANT]
> These functions are only available after the utils script has loaded. See [Loading the utils script](#loading-the-utils-script), and either `await iti.promise` (on an instance) or `await intlTelInput.attachUtils(...)` (without one) before calling them.

###### formatNumber
Type: `(number: string, iso2: string | undefined, format?: NumberFormat) => string`  

Format the given number in the given [`NumberFormat`](/docs/types#numberformat) (defaults to `"E164"`). Returns the original input if it can't be parsed.

```js
intlTelInput.utils.formatNumber("7024181234", "us", "INTERNATIONAL"); // "+1 702-418-1234"
intlTelInput.utils.formatNumber("+17024181234", "us"); // "+17024181234"
```

###### formatNumberAsYouType
Type: `(number: string, iso2: string | undefined) => string`  

Format a partial number as the user is typing it — used internally by the [`formatAsYouType`](/docs/options#formatasyoutype) option.

```js
intlTelInput.utils.formatNumberAsYouType("702418", "us"); // "702-418"
```

###### getCoreNumber
Type: `(number: string, iso2: string | undefined) => string`  

Get the [national significant number](https://en.wikipedia.org/wiki/National_significant_number) (NSN) — the number with any international dial code and national prefix stripped off. Returns an empty string if it can't be parsed.

```js
intlTelInput.utils.getCoreNumber("+1 702-418-1234", "us"); // "7024181234"
```

###### getExampleNumber
Type: `(iso2: string | undefined, nationalMode: boolean, numberType: NumberType, useE164?: boolean) => string`  

Get an example number for the given country and [`NumberType`](/docs/types#numbertype). Pass `nationalMode: true` for national format, `false` for international. Set `useE164: true` to override and return E.164 instead. Returns an empty string if no example exists.

```js
intlTelInput.utils.getExampleNumber("gb", false, "MOBILE"); // "+44 7400 123456"
intlTelInput.utils.getExampleNumber("gb", true, "MOBILE"); // "07400 123456"
intlTelInput.utils.getExampleNumber("gb", false, "MOBILE", true); // "+447400123456"
```

###### getExtension
Type: `(number: string, iso2: string | undefined) => string`  

Get the extension from the given number, or an empty string if there isn't one.

```js
intlTelInput.utils.getExtension("(702) 555-5555 ext. 1234", "us"); // "1234"
```

###### getNumberType
Type: `(number: string, iso2: string | undefined) => NumberType | null`  

Get the [`NumberType`](/docs/types#numbertype) (fixed-line/mobile/toll-free, etc.) of the given number, or `null` if it can't be determined.

```js
intlTelInput.utils.getNumberType("7024181234", "us"); // "FIXED_LINE_OR_MOBILE"
```

> [!NOTE]
> In some countries (e.g. the US) there's no way to differentiate between fixed-line and mobile numbers, so in those cases it will return `"FIXED_LINE_OR_MOBILE"`.

###### getValidationError
Type: `(number: string, iso2: string | undefined) => ValidationError | null`  

Get more information about an invalid number — returns a [`ValidationError`](/docs/types#validationerror) string (e.g. `"TOO_SHORT"`, `"TOO_LONG"`, `"INVALID_COUNTRY_CODE"`), or `null` if it can't be determined. See [Show a user-facing error message](/docs/best-practices#show-a-user-facing-error-message) for a worked example.

```js
intlTelInput.utils.getValidationError("702", "us"); // "TOO_SHORT"
```

###### isPossibleNumber
Type: `(number: string, iso2: string | undefined, numberType?: NumberType[] | null) => boolean`  

Check if the given number is possible based on its length — the same lightweight check used by [`iti.isValidNumber()`](/docs/methods#isvalidnumber). Optionally pass an array of [`NumberType`](/docs/types#numbertype) values to restrict the check to specific types. More future-proof than [`isValidNumber`](#isvalidnumber), as country length rules rarely change.

```js
intlTelInput.utils.isPossibleNumber("7024181234", "us"); // true
intlTelInput.utils.isPossibleNumber("7024181234", "us", ["MOBILE"]); // true
```

###### isValidNumber
Type: `(number: string, iso2: string | undefined, numberType?: NumberType[] | null) => boolean`  

Check if the given number is valid using precise country/area-code matching rules — the same check used by [`iti.isValidNumberPrecise()`](/docs/methods#isvalidnumberprecise). Optionally pass an array of [`NumberType`](/docs/types#numbertype) values to restrict the check to specific types. Note that these rules change each month for various countries, so the package needs to be kept up-to-date (e.g. via an automated script) — otherwise you may start rejecting valid numbers. For a simpler and more future-proof check, see [`isPossibleNumber`](#ispossiblenumber).

```js
intlTelInput.utils.isValidNumber("7024181234", "us"); // true
intlTelInput.utils.isValidNumber("7024181234", "us", ["MOBILE"]); // true
intlTelInput.utils.isValidNumber("7024181234", "us", ["TOLL_FREE"]); // false
```

> [!NOTE]
> When you pass `["MOBILE"]` or `["FIXED_LINE"]`, `"FIXED_LINE_OR_MOBILE"` is automatically included — so countries like the US (where the two can't be told apart) still match correctly. The same patching applies to [`isPossibleNumber`](#ispossiblenumber).

