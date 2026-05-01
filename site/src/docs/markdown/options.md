# Initialisation options

The options below are shared across the [vanilla JavaScript library](/docs/vanilla-javascript) and the [React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component) and [Svelte](/docs/svelte-component) components. Code examples below show the **value** you pass for each option — with the vanilla JavaScript library, pass them as properties of the options object, e.g. `intlTelInput(input, { initialCountry: "us" })`; with the framework components, pass them as individual props (with the same name), e.g. `<IntlTelInput initialCountry="us" />`.

_Throughout these docs, "iso2 code" means the two-letter country identifier ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g. `"gb"`), and "dial code" means the international calling prefix (e.g. `+44`)._

## Contents

- [Country options](#country-options)
- [User interface options](#user-interface-options)
- [Placeholder options](#placeholder-options)
- [Formatting options](#formatting-options)
- [Validation options](#validation-options)
- [Translation options](#translation-options)
- [Miscellaneous options](#miscellaneous-options)


## Country options

Choose which countries are available, the order they're displayed in, and how the initial country is determined.

###### countryOrder
Type: `string[]`  
Default: `null`  

An array of iso2 codes that is used to order the country dropdown. Any omitted countries will appear after those specified, in alphabetical order, e.g. setting `countryOrder` to `["jp", "kr"]` will result in the list: Japan, South Korea, Afghanistan, Albania, Algeria, etc. _Note: this replaces the legacy `preferredCountries` option (now removed)._ 

Play with the above example in the [Playground](/playground?countryOrder=%5B"jp"%2C"kr"%5D&initialCountry=#country-options).

###### excludeCountries
Type: `string[]`  
Default: `null`  

An array of iso2 codes to exclude from the country dropdown e.g. `["gb", "us"]`. Also see: [`onlyCountries`](#onlycountries) option.

Try `intl-tel-input` with all "A" countries excluded in the [Playground](/playground?excludeCountries=%5B"af"%2C"al"%2C"dz"%2C"as"%2C"ad"%2C"ao"%2C"ai"%2C"ag"%2C"ar"%2C"am"%2C"aw"%2C"ac"%2C"au"%2C"at"%2C"az"%2C"ax"%5D&initialCountry=#country-options) — the dropdown now starts at Bahamas.

###### geoIpLookup
Type: `() => Promise<string>`  
Default: `null`  

When setting [`initialCountry`](#initialcountry) to `"auto"`, you must use this option to specify a custom function that calls an IP lookup service to get the user's location and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the relevant iso2 code (or rejects on error).

Here is an example using the [ipapi](https://ipapi.co/api/?javascript#location-of-clients-ip) service<sup>*</sup> (assign this to `geoIpLookup`):  
```js
async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
}
```
_Tip: store the result in a cookie to avoid repeat lookups!_

> [!NOTE]  
> <sup>*</sup>The [ipapi](https://ipapi.co) service used in the example above (and across this site) has a limited free tier that stops working once its quota is reached. For production, you should either sign up for a paid plan, swap in another IP-lookup provider, or roll your own solution — the core library just cares that the returned promise eventually resolves with an iso2 code (or rejects).

> [!NOTE]  
> On initialisation, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is exposed via the `promise` property on the core library instance (accessible directly with the vanilla JavaScript library, or via a ref in the framework components), so you can `await` it to know when initialisation requests like this have completed.

Play with this option in the [Playground](/playground#country-options).

###### initialCountry
Type: `string`  
Default: `""`  

Set the initial country selection by specifying its iso2 code, e.g. `"us"` for the United States. You can also set [`initialCountry`](#initialcountry) to `"auto"`, which will look up the user's country based on their IP address (requires the [`geoIpLookup`](#geoiplookup) option - [see example](/examples/vanilla-javascript/lookup-country)). Note: however you use [`initialCountry`](#initialcountry), it will not update the country selection if the input already contains a number with an international dial code. 

View `intl-tel-input` with `initialCountry` set to `"de"` (Germany) in the [Playground](/playground?initialCountry=de#country-options).

> [!WARNING]
> Only set this if you're sure of the user's country. If set incorrectly and the user auto-fills their national number and submits without checking, the number can pass validation but be stored with the wrong dial code.

###### onlyCountries
Type: `string[]`  
Default: `null`  

In the dropdown, display only the countries you specify here, using their iso2 codes e.g. `["fr", "de", "es"]`. Also see: [`excludeCountries`](#excludecountries) option.

Try `intl-tel-input` with this option set to only European countries in the [Playground](/playground?onlyCountries=%5B"al"%2C"ad"%2C"at"%2C"by"%2C"be"%2C"ba"%2C"bg"%2C"hr"%2C"cz"%2C"dk"%2C"ee"%2C"fo"%2C"fi"%2C"fr"%2C"de"%2C"gi"%2C"gr"%2C"va"%2C"hu"%2C"is"%2C"ie"%2C"it"%2C"lv"%2C"li"%2C"lt"%2C"lu"%2C"mk"%2C"mt"%2C"md"%2C"mc"%2C"me"%2C"nl"%2C"no"%2C"pl"%2C"pt"%2C"ro"%2C"ru"%2C"sm"%2C"rs"%2C"sk"%2C"si"%2C"es"%2C"se"%2C"ch"%2C"ua"%2C"gb"%5D#country-options).


## User interface options

Control dropdown behaviour and whether certain UI elements are displayed.

###### allowDropdown
Type: `boolean`  
Default: `true`  

Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected country is not clickable. Also, if [`showFlags`](/docs/options#showflags) is enabled, we display the selected flag on the right instead, because it is just a marker of state. Note that if [`separateDialCode`](#separatedialcode) is enabled, [`allowDropdown`](/docs/options#allowdropdown) is forced to `true` as the dropdown is required when the user types "+" in this case. 

Try `intl-tel-input` with [`allowDropdown`](#allowdropdown) disabled in the [Playground](/playground?allowDropdown=false#user-interface-options).

###### containerClass
Type: `string`  
Default: `""`  

Additional class(es) to add to the (injected) wrapper div element `<div class="iti">`.

###### countrySearch
Type: `boolean`  
Default: `true`  

Add a search input to the top of the dropdown, so users can filter the displayed countries. 

View `intl-tel-input` with this disabled in the [Playground](/playground?countrySearch=false#user-interface-options).

###### dropdownContainer
Type: `HTMLElement`  
Default: `null`  

Expects a node, e.g. `document.body`. Instead of putting the country dropdown markup next to the input, append it to the specified node, and it will then be positioned next to the input using JavaScript (using `position: fixed`). This is useful when the input is inside a container with `overflow: hidden`. 

> [!NOTE]  
> The positioning is broken by scrolling, so the dropdown will automatically close on the `window` scroll event. This also applies to the fullscreen popup.

Play with this option in the [Playground](/playground#user-interface-options).

###### fixDropdownWidth
Type: `boolean`  
Default: `true`  

Fix the dropdown width to the input width (rather than being as wide as the longest country name). 

Try `intl-tel-input` with this disabled in the [Playground](/playground?fixDropdownWidth=false#user-interface-options).

###### searchInputClass
Type: `string`  
Default: `""`  

Additional class(es) to add to the country search input element (requires [`countrySearch`](#countrysearch) to be enabled).

###### separateDialCode
Type: `boolean`  
Default: `true`  

Display the selected country's international dial code next to the input, so it looks like it's part of the typed number, but is actually separate (they cannot delete it). This makes it clear to the user which dial code is currently selected and that they are entering their number in international format. _Note: previously named `showSelectedDialCode`._

Play with this option in the [Playground](/playground#user-interface-options). 

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/iti-separate-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/img/iti-separate-light.png">
  <img width="271" height="48" alt="Separate dial code" src="/img/iti-separate-light.png">
</picture>

> [!NOTE]  
> If the user tries to type a new dial code (as well as the displayed one), we automatically open the country dropdown and focus the search input, so the dial code appears there instead - this way, if they type +54, then Argentina will be highlighted in the dropdown, and they can simply press Enter to select it, updating the displayed dial code (this feature requires [`allowDropdown`](#allowdropdown) and [`countrySearch`](#countrysearch) to be enabled).

###### showFlags
Type: `boolean`  
Default: `true`  

Set this to false to hide the flags. Instead, it will show a generic globe icon. 

Try `intl-tel-input` with this disabled in the [Playground](/playground?showFlags=false#user-interface-options).

###### useFullscreenPopup
Type: `boolean`  
Default: `true on mobile devices, false otherwise`  

Control when the country list appears as a fullscreen popup vs an inline dropdown. By default, it will appear as a fullscreen popup on narrow viewports (or on touch devices with limited vertical space), to make better use of the available space (similar to how a native `<select>` works), and as an inline dropdown on larger screens. 

Try `intl-tel-input` with this option enabled on the [Playground](/playground?useFullscreenPopup=true#user-interface-options).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/iti-mobile-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/img/iti-mobile-light.png">
  <img width="350" height="642" alt="Mobile fullscreen popup" src="/img/iti-mobile-light.png">
</picture>


## Placeholder options

Configure the automatically generated placeholder numbers.

###### autoPlaceholder
Type: `string`  
Default: `"polite"`  

Set the input's placeholder to an example number for the selected country, and update it if the country changes. You can specify the number type using the [`placeholderNumberType`](#placeholdernumbertype) option. By default, it is set to `"polite"`, which means it will only set the placeholder if the input doesn't already have one. You can also set it to `"aggressive"`, which will replace any existing placeholder, or `"off"`. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). 

Play with this option on an input that contains a placeholder in the [Playground](/playground?initialCountry=gb&placeholder=Phone#placeholder-options).

###### customPlaceholder
Type: `(exampleNumber: string, selectedCountryData: Country | null) => string`  
Default: `null`  

Customise the placeholder text. Your function receives the example number (used as the default placeholder), along with the [selected country data](/docs/types#country), and whatever string you return is used as the placeholder instead.

For example, the snippet below masks each digit with an `X`, or falls back to `"Enter number"` when no country is selected:

```js
(exampleNumber, selectedCountryData) => exampleNumber
  ? exampleNumber.replace(/\d/g, "X")
  : "Enter number"
```

> [!IMPORTANT]
> When no country is selected (globe state), `exampleNumber` is an empty string and `selectedCountryData` is `null`, so remember to guard against null when reading properties off it.

View `intl-tel-input` with this enabled in the [Playground](/playground?customPlaceholder=true#placeholder-options).

###### placeholderNumberType
Type: `NumberType`  
Default: `"MOBILE"`  

Set the [number type](/docs/types#numbertype) to use for the generated placeholder numbers. 

View `intl-tel-input` with this set to `"FIXED_LINE"` in the [Playground](/playground?placeholderNumberType=FIXED_LINE#placeholder-options).

> [!TIP]
> You can also pass a [constant](/docs/types#constant-objects), e.g. `placeholderNumberType: intlTelInput.NUMBER_TYPE.FIXED_LINE` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.


## Formatting options

How numbers are formatted as you type and on initial display.

###### formatAsYouType
Type: `boolean`  
Default: `true`  

Automatically format the number as the user types. This feature will be disabled if the user types their own formatting characters. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note: previously named `autoFormat`._

Try `intl-tel-input` with this disabled in the [Playground](/playground?formatAsYouType=false#formatting-options).

###### formatOnDisplay
Type: `boolean`  
Default: `true`  

Format the input value (according to the [`nationalMode`](#nationalmode) option) during initialisation, when a new country is selected, and when calling [`setNumber`](/docs/methods#setnumber) or [`setCountry`](/docs/methods#setcountry). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). 

Try toggling this option on/off on an input containing a number in the [Playground](/playground?formatOnDisplay=false&value=%2B447947123123#formatting-options).

###### nationalMode
Type: `boolean`  
Default: `false`  

Format numbers in the national format, rather than the international format. This applies to placeholder numbers and when displaying users' existing numbers. Note that it's fine for users to type their numbers in national format - as long as they have selected the right country, you can use [`getNumber`](/docs/methods#getnumber) to extract a full international number.

Try `intl-tel-input` with `separateDialCode` disabled and `nationalMode` enabled in the [Playground](/playground?separateDialCode=false&nationalMode=true#formatting-options).

###### strictMode
Type: `boolean`  
Default: `true`  

As the user types (or pastes) in the input, reject any irrelevant characters. The user can only enter numeric characters and an optional plus at the beginning. Cap the length at the maximum valid number length (this respects [`allowedNumberTypes`](#allowednumbertypes)). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). 

Play with this option in the [Playground](/playground#formatting-options).

> [!IMPORTANT]
> `strictMode` would silently drop rejected input, so by default we surface that to the user via [`strictRejectAnimation`](#strictrejectanimation), which plays a built-in shake/flash animation. For richer feedback (e.g. a toast explaining _why_ input was rejected), listen for the [`strict:reject`](/docs/vanilla-javascript#strict-reject) event (or use the equivalent `onStrictReject` / `strictReject` callback in the component wrappers). For a live example, try typing an alphabetic character in the telephone input on the [homepage](/), which uses a Bootstrap toast.

###### strictRejectAnimation
Type: `boolean`  
Default: `true`  

When [`strictMode`](#strictmode) is enabled, play a subtle animation any time a whole keystroke or paste is rejected — a brief shake by default, or a background-colour flash for users with `prefers-reduced-motion`. Partial paste sanitisation (e.g. only some characters stripped) does not trigger it. The flash colour can be customised via the `--iti-strict-reject-flash-color` CSS variable.


## Validation options

Adjust what is considered a valid number.

###### allowedNumberTypes
Type: `NumberType[] | null`  
Default: `["MOBILE", "FIXED_LINE"]`  

Set the [number type(s)](/docs/types#numbertype) to enforce during validation, as well as the maximum number length to enforce with [strictMode](#strictmode). Set it to `null` to not enforce any particular type (not recommended<sup>*</sup>). 

By default, it's set to `["MOBILE", "FIXED_LINE"]` so [`isValidNumber`](/docs/methods#isvalidnumber) (etc) will only return `true` for those kinds of numbers. Alternatively, you could set it to simply `["MOBILE"]` if you only wanted to accept mobile numbers as valid. _Note: previously named `validationNumberTypes`._

<sup>*</sup>It's best to be as specific as possible, rather than using the catch-all value of `null`. `isValidNumber` works by checking the number's length, and some number types allow very short lengths. For example, Norwegian mobile and landline numbers are 8 digits long, so by default that's the only valid length. But Norwegian UAN numbers can be only 5 digits long, so if you set `allowedNumberTypes` to `null`, validation will pass for any number that is 5-8 digits long.

Play with this option in the [Playground](/playground#validation-options).

> [!TIP]
> You can also pass [constants](/docs/types#constant-objects), e.g. `allowedNumberTypes: [intlTelInput.NUMBER_TYPE.MOBILE, intlTelInput.NUMBER_TYPE.FIXED_LINE]` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.

###### allowNumberExtensions
Type: `boolean`  
Default: `false`  

Whether or not the validation methods return `true` for numbers containing extensions, e.g. "+1 702 123-1234 ext. 1234". 

Try toggling this option on/off on a number with an extension in the [Playground](/playground?value=%2B447947692123+ext.+12345&strictMode=false#validation-options).

> [!NOTE]
> Not compatible with [`strictMode`](#strictmode) (which is enabled by default), as that will prevent the user from typing the extension in the first place. Disable `strictMode` to allow extensions to be entered.

###### allowPhonewords
Type: `boolean`  
Default: `false`  

Whether or not the validation methods return `true` for numbers containing phonewords, e.g. "+1 702 FLOWERS".

> [!NOTE]  
> When processing phoneword numbers, the core library will automatically convert them to digits e.g. via [`getNumber`](/docs/methods#getnumber), or when initialising the core library on an input containing a phoneword number.

> [!NOTE]
> Not compatible with [`strictMode`](#strictmode) (which is enabled by default), as that will prevent the user from typing letters in the first place. Disable `strictMode` to allow phonewords to be entered.


## Translation options

Localise country names and the core library UI strings, e.g. the country search placeholder.

###### countryNameLocale
Type: `string`  
Default: `"en"`  

The locale to pass to `Intl.DisplayNames` to generate the country names. Should adhere to the [BCP 47](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag) standard, e.g. `"zh"` (Chinese), or `"zh-Hans"` (Simplified Chinese). For translating the other UI strings, like the country search placeholder, see [`i18n`](#i18n) below.

View `intl-tel-input` in Chinese in the [Playground](/playground?countryNameLocale=zh&i18n=zh&initialCountry=cn#translation-options).

###### countryNameOverrides
Type: `object`  
Default: `{}`  

Override individual country names, keyed by iso2 code. Useful when the name produced by [`countryNameLocale`](#countrynamelocale) doesn't match your preferred wording, e.g.

```js
{
  us: "United States of America",
}
```

View `intl-tel-input` with the US renamed to "United States of America" in the [Playground](/playground?countryNameOverrides=%7B%22us%22%3A%22United+States+of+America%22%7D&initialCountry=us#translation-options).

###### i18n
Type: `object`  
Default: `{}`  

Translate the core library's UI strings (country search placeholder, no-results message, ARIA labels). For translating country names, see [`countryNameLocale`](#countrynamelocale) above; to override individual country names, see [`countryNameOverrides`](#countrynameoverrides).

We ship translations for [<!-- I18N_LOCALE_COUNT -->  locales](/docs/localisation#supported-ui-locales) — import one and pass it in as the `i18n` option:

```js
import { fr } from "intl-tel-input/i18n";
```

See the [Localisation docs](/docs/localisation#localising-user-interface-strings) for overriding individual keys, defining custom translations, and the full list of translatable keys. _Note: previously named `localizedCountries`._

View `intl-tel-input` in Chinese in the [Playground](/playground?countryNameLocale=zh&i18n=zh&initialCountry=cn#translation-options).


## Miscellaneous options

Extra features like hidden inputs and loading the utils module.

###### hiddenInput
Type: `(telInputName: string) => { phone: string, country?: string }`  
Default: `null`  

Allows the creation of hidden input fields within a form, which, on submit, get populated with (1) the full international telephone number and (2) the selected country's iso2 code. This is useful for old-fashioned, page-load form submissions to ensure the full international number and iso2 code are captured, especially when [`nationalMode`](#nationalmode) or [`separateDialCode`](#separatedialcode) is enabled. [See example](/examples/vanilla-javascript/hidden-input).

This option accepts a function that receives the name of the main telephone input as an argument. This function should return an object with `phone` and (optionally) `country` properties to specify the names of the hidden inputs for the phone number and iso2 code, respectively.

> [!NOTE]
> This feature requires the input to be inside a `<form>` element, as it listens for the `submit` event on the closest form element. Also note that since this uses [`getNumber`](/docs/methods#getnumber) internally, firstly it requires the [utils script to be loaded](/docs/utils#loading-the-utils-script), and secondly, it expects a valid number and so will only work correctly if you have used [`isValidNumber`](/docs/methods#isvalidnumber) to validate the number before allowing the form submit to go through.

```js
(telInputName) => ({
  phone: "phone_full",
  country: "country_iso2",
})
```

This will generate the following (hidden) elements, which will be automatically populated on submit:

```html
<input type="hidden" name="phone_full">
<input type="hidden" name="country_iso2">
```

###### loadUtils
Type: `() => Promise<{ default: object }>`  
Default: `null`  

This is one way to lazy load the included utils.js (to enable formatting/validation, etc) - see [Loading The Utils Script](/docs/utils#loading-the-utils-script) for more options.

The [`loadUtils`](#loadutils) option takes a function that returns a Promise resolving to the utils module. You can `import` the utils module in different ways (examples below): (A) if you use a bundler like Webpack, Vite or Parcel, you can import it directly from the package, or (B) from a URL, either a CDN or your own hosted version of utils.js. _Note: this replaces the `utilsScript` option (now removed)._ 

(A) with a bundler, import the utils module directly from the package
```js
// modern bundlers will split this out into a separate chunk and fetch it only when needed
() => import("intl-tel-input/utils")
```

(B) import utils module from a URL (CDN or your own hosted version)
```js
() => import("https://cdn.jsdelivr.net/npm/intl-tel-input@28.0.4/dist/js/utils.js"),
```

The module is only loaded once the core library initialises, and additionally, only once the page has finished loading (on the window `load` event) to prevent blocking (the script is ~260KB). The `promise` property on the core library instance resolves once loading is complete — see [Utils Script](/docs/utils) for more information.
