# Initialisation options

The options below are shared across the [vanilla JavaScript library](/docs/vanilla-javascript) and the [React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component) and [Svelte](/docs/svelte-component) components. Code examples below show the **value** you pass for each option — with the vanilla JavaScript library, pass them as properties of the options object, e.g. `intlTelInput(input, { initialCountry: "us" })`; with the framework components, pass them as individual props (with the same name), e.g. `<IntlTelInput initialCountry="us" />`.

_Throughout these docs, "iso2 code" means the two-letter country identifier ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g. `"gb"`), and "dial code" means the international calling prefix (e.g. `+44`)._

## User interface options

Control country list behaviour and whether certain UI elements are displayed.

###### containerClass
Type: `string`  
Default: `""`  
Vue: `container-class`

Additional class(es) to add to the injected `<div class="iti">` that wraps the input and selected country. Useful for sizing or positioning the whole component.

###### countrySearch
Type: `boolean`  
Default: `true`  
Vue: `country-search`

Add a search input to the top of the country list, so users can filter the displayed countries. Matches against country name, iso2 code, dial code, and initials. 

View `intl-tel-input` with this disabled in the [Playground](/playground?countrySearch=false#countrySearch).

###### countrySelectorMode
Type: `"DROPDOWN" | "FULLSCREEN" | "AUTO" | "OFF"`  
Default: `"AUTO"`  
Vue: `country-selector-mode`

Controls the country selector — the panel that opens when the user clicks the selected country button, so they can pick a different country.

* `"DROPDOWN"` — render as an inline dropdown attached to the input.
* `"FULLSCREEN"` — render as a fullscreen popup that takes over the viewport. Better suited to mobile / touch devices. See screenshot below.
* `"AUTO"` — pick `"FULLSCREEN"` on narrow viewports and `"DROPDOWN"` otherwise.
* `"OFF"` — the country selector is disabled entirely. The selected country is no longer clickable, and there is no arrow is shown.

_Note: this replaces the previous `allowDropdown` and `useFullscreenPopup` boolean options._

> [!TIP]
> You can either pass a string literal, e.g. `"DROPDOWN"`, or a [constant](/docs/types#constant-objects), e.g. `intlTelInput.COUNTRY_SELECTOR_MODE.DROPDOWN` — useful where typos in the string literal won't be caught at compile time.

Try `intl-tel-input` with this option set to `"OFF"` in the [Playground](/playground?countrySelectorMode=OFF#countrySelectorMode).

_Here's what the fullscreen popup looks like on mobile:_

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/iti-mobile-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/img/iti-mobile-light.png">
  <img width="350" height="642" alt="Mobile fullscreen popup" src="/img/iti-mobile-light.png">
</picture>

###### dropdownParent
Type: `HTMLElement`  
Default: `null`  
Vue: `dropdown-parent`

When using the country selector as a dropdown, sometimes it can get cut-off if an ancestor has `overflow:hidden` (or similar). You can solve this by setting `dropdownParent` to another element on the page (e.g. `document.body`), which means the dropdown will be appended to that element instead of next to the input. It will then be re-positioned next to the input using JavaScript (with `position:fixed`), so it looks the same as the standard inline dropdown. _Note: previously named `dropdownContainer`._

###### matchDropdownWidth
Type: `boolean`  
Default: `true`  
Vue: `match-dropdown-width`

Match the dropdown width to the input width. When disabled, the dropdown is as wide as the longest country name. _Note: previously named `fixDropdownWidth`._

Try `intl-tel-input` with this disabled in the [Playground](/playground?matchDropdownWidth=false#matchDropdownWidth).

###### searchInputClass
Type: `string`  
Default: `""`  
Vue: `search-input-class`

Additional class(es) to add to the country search input element (requires [`countrySearch`](#countrysearch) to be enabled).

###### separateDialCode
Type: `boolean`  
Default: `true`  
Vue: `separate-dial-code`

Display the selected country's international dial code next to the input, so it looks like it's part of the typed number, but is actually separate (they cannot delete it). This makes it clear to the user which dial code is currently selected and that they are entering their number in international format. _Note: previously named `showSelectedDialCode`._

Play with this option in the [Playground](/playground#separateDialCode). 

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/iti-separate-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/img/iti-separate-light.png">
  <img width="271" height="48" alt="Separate dial code" src="/img/iti-separate-light.png">
</picture>

> [!NOTE]  
> If the user tries to type a new dial code (as well as the displayed one), we automatically open the country list and focus the search input, so the dial code appears there instead - this way, if they type +54, then Argentina will be highlighted in the country list, and they can simply press Enter to select it, updating the displayed dial code (this feature requires the country selector to be enabled via [`countrySelectorMode`](#countryselectormode) and [`countrySearch`](#countrysearch) to be enabled).

###### showFlags
Type: `boolean`  
Default: `true`  
Vue: `show-flags`

Display the country flag in the selected country button and next to each country in the list. When disabled, a generic globe icon is shown in place of the selected flag.

Try `intl-tel-input` with this disabled in the [Playground](/playground?showFlags=false#showFlags).

## Country options

Choose which countries are available, the order they're displayed in, and how the initial country is determined.

###### countryOrder
Type: `string[]`  
Default: `null`  
Vue: `country-order`

An array of iso2 codes that is used to order the country list. Any omitted countries will appear after those specified, in alphabetical order, e.g. setting `countryOrder` to `["jp", "kr"]` will result in the list: Japan, South Korea, Afghanistan, Albania, Algeria, etc. _Note: this replaces the legacy `preferredCountries` option, which has now been removed, but you can still re-create the grey divider below the preferred group [with a single CSS rule](/docs/faq#how-do-i-restore-the-preferredcountries-divider)._

Play with the above example in the [Playground](/playground?countryOrder=%5B"jp"%2C"kr"%5D&initialCountry=#countryOrder).

###### excludeCountries
Type: `string[]`  
Default: `null`  
Vue: `exclude-countries`

An array of iso2 codes to exclude from the country list e.g. `["gb", "us"]`. Also see: [`onlyCountries`](#onlycountries) option.

Try `intl-tel-input` with all "A" countries excluded in the [Playground](/playground?excludeCountries=%5B"af"%2C"al"%2C"dz"%2C"as"%2C"ad"%2C"ao"%2C"ai"%2C"ag"%2C"ar"%2C"am"%2C"aw"%2C"ac"%2C"au"%2C"at"%2C"az"%2C"ax"%5D&initialCountry=#excludeCountries) — the country list now starts at Bahamas.

###### initialCountry
Type: `string`  
Default: `""`  
Vue: `initial-country`

Set the initial country selection by specifying its iso2 code, e.g. `"us"` for the United States. If left unset (and no [`initialCountryLookup`](#initialcountrylookup) is provided), the input starts in the empty/globe state. Note: however you use `initialCountry`, it will not update the country selection if the input already contains a number with an international dial code.

View `intl-tel-input` with `initialCountry` set to `"de"` (Germany) in the [Playground](/playground?initialCountry=de#initialCountry).

> [!WARNING]
> Only set this if you're sure of the user's country. If set incorrectly and the user auto-fills their national number and submits without checking, the number can pass validation but be stored with the wrong dial code.

###### initialCountryLookup
Type: `() => Promise<string>`  
Default: `null`  
Vue: `initial-country-lookup`

Provide a custom function that calls a lookup service (e.g. an IP geolocation API) to determine the user's country, and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the relevant iso2 code (or rejects on error). The lookup only runs when [`initialCountry`](#initialcountry) is not set — an explicit `initialCountry` always takes precedence. _Note: previously named `geoIpLookup`._

Here is an example using the [ipapi](https://ipapi.co/api/?javascript#location-of-clients-ip) service<sup>*</sup> (assign this to `initialCountryLookup`):
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

Play with this option in the [Playground](/playground#initialCountryLookup).

###### onlyCountries
Type: `string[]`  
Default: `null`  
Vue: `only-countries`

In the country list, display only the countries you specify here, using their iso2 codes e.g. `["fr", "de", "es"]`. Also see: [`excludeCountries`](#excludecountries) option.

Try `intl-tel-input` with this option set to only European countries in the [Playground](/playground?onlyCountries=%5B"al"%2C"ad"%2C"at"%2C"by"%2C"be"%2C"ba"%2C"bg"%2C"hr"%2C"cz"%2C"dk"%2C"ee"%2C"fo"%2C"fi"%2C"fr"%2C"de"%2C"gi"%2C"gr"%2C"va"%2C"hu"%2C"is"%2C"ie"%2C"it"%2C"lv"%2C"li"%2C"lt"%2C"lu"%2C"mk"%2C"mt"%2C"md"%2C"mc"%2C"me"%2C"nl"%2C"no"%2C"pl"%2C"pt"%2C"ro"%2C"ru"%2C"sm"%2C"rs"%2C"sk"%2C"si"%2C"es"%2C"se"%2C"ch"%2C"ua"%2C"gb"%5D#onlyCountries).



## Formatting options

How numbers are formatted as you type and on initial display.

###### formatAsYouType
Type: `boolean`  
Default: `true`  
Vue: `format-as-you-type`

Automatically format the number as the user types. This feature will be disabled if the user types their own formatting characters. Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note: previously named `autoFormat`._

Try `intl-tel-input` with this disabled in the [Playground](/playground?formatAsYouType=false#formatAsYouType).

###### numberDisplayFormat
Type: `"E164" | "INTERNATIONAL" | "NATIONAL"`  
Default: `"INTERNATIONAL"`  
Vue: `number-display-format`

Controls how numbers are displayed in the input — both the auto-generated placeholder example and any stored value passed in on initialisation or via [`setNumber`](/docs/methods#setnumber).

- `"INTERNATIONAL"` (default): formatted with the dial code, e.g. `+44 7740 123456`.
- `"NATIONAL"`: formatted in the country's national format (no dial code), e.g. `07740 123456`. Forced back to `"INTERNATIONAL"` if [`separateDialCode`](#separatedialcode) is enabled (since the dial code is then part of the typed number) or if the country selector is enabled without flags or a separate dial code (since the user has no way to see the country).
- `"E164"`: standardised international format with no formatting characters, e.g. `+447740123456`.

Note: this is a dev-facing preference for displaying existing numbers. It does **not** override what the user types — if they type a number in national format, it stays in national format. To extract the full international number regardless, use [`getNumber`](/docs/methods#getnumber). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script) (otherwise no formatting can happen and the value is shown as-is). _Note: previously covered by `nationalMode` and `formatOnDisplay` options (now removed)._

> [!TIP]
> You can either pass a string literal, e.g. `"INTERNATIONAL"`, or a [constant](/docs/types#constant-objects), e.g. `intlTelInput.NUMBER_FORMAT.INTERNATIONAL` — useful where typos in the string literal won't be caught at compile time. (Note: only `E164`, `INTERNATIONAL`, and `NATIONAL` are accepted here — `RFC3966` is rejected.)

Try `intl-tel-input` with `separateDialCode` disabled and `numberDisplayFormat` set to `"NATIONAL"` in the [Playground](/playground?separateDialCode=false&numberDisplayFormat=NATIONAL#numberDisplayFormat).

###### strictMode
Type: `boolean`  
Default: `true`  
Vue: `strict-mode`

As the user types (or pastes) in the input, ignore any irrelevant characters (e.g. letters). The user can only enter numeric characters and an optional plus at the beginning. Cap the length at the maximum valid number length (this respects [`allowedNumberTypes`](#allowednumbertypes)). Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). 

Play with this option in the [Playground](/playground#strictMode).

> [!IMPORTANT]
> `strictMode` would silently drop rejected input, so by default we surface that to the user via [`strictRejectAnimation`](#strictrejectanimation), which plays a built-in shake/flash animation. For richer feedback (e.g. a toast explaining _why_ input was rejected), listen for the [`strict:reject`](/docs/vanilla-javascript#strict-reject) event (or use the equivalent `onStrictReject` / `strictReject` callback in the component wrappers). For a live example, try typing an alphabetic character in the telephone input on the [homepage](/), which uses a Bootstrap toast.

###### strictRejectAnimation
Type: `boolean`  
Default: `true`  
Vue: `strict-reject-animation`

When [`strictMode`](#strictmode) is enabled, play a subtle animation any time a keystroke is rejected, or a paste is rejected entirely — a brief shake by default, or a background-colour flash for users with `prefers-reduced-motion`. Partial paste sanitisation (e.g. only some characters stripped) does not trigger it. The flash colour can be customised via the `--iti-strict-reject-flash-color` CSS variable.



## Placeholder options

Configure the automatically generated placeholder numbers.

###### customPlaceholder
Type: `(exampleNumber: string, selectedCountry: Country | null) => string`  
Default: `null`  
Vue: `custom-placeholder`

Customise the placeholder text. Your function receives the example number (used as the default placeholder), along with the [selected country data](/docs/types#country), and whatever string you return is used as the placeholder instead.

For example, the snippet below masks each digit with an `X`, or falls back to `"Enter number"` when no country is selected:

```js
(exampleNumber, selectedCountry) => exampleNumber
  ? exampleNumber.replace(/\d/g, "X")
  : "Enter number"
```

> [!IMPORTANT]
> When no country is selected (globe state), `exampleNumber` is an empty string and `selectedCountry` is `null`, so remember to guard against null when reading properties off it.

View `intl-tel-input` with this enabled in the [Playground](/playground?customPlaceholder=true#customPlaceholder).

###### placeholderNumberPolicy
Type: `"POLITE" | "AGGRESSIVE" | "OFF"`  
Default: `"POLITE"`  
Vue: `placeholder-number-policy`

Policy for setting the input's placeholder to an example number for the selected country (auto-updates on country change).

- `"POLITE"` (default): only set the placeholder if the input doesn't already have one.
- `"AGGRESSIVE"`: replace any existing placeholder.
- `"OFF"`: never set a placeholder.

Requires the [utils script to be loaded](/docs/utils#loading-the-utils-script). _Note: previously named `autoPlaceholder`._

> [!TIP]
> You can either pass a string literal, e.g. `"POLITE"`, or a [constant](/docs/types#constant-objects), e.g. `intlTelInput.PLACEHOLDER_POLICY.POLITE` — useful where typos in the string literal won't be caught at compile time.

Play with this option on an input that contains a placeholder in the [Playground](/playground?initialCountry=gb&placeholder=Phone#placeholderNumberPolicy).

###### placeholderNumberType
Type: `NumberType`  
Default: `"MOBILE"`  
Vue: `placeholder-number-type`

Set the [number type](/docs/types#numbertype) to use for the generated placeholder numbers. We strongly recommend sticking to `"MOBILE"` (the default), `"FIXED_LINE"`, or `"FIXED_LINE_OR_MOBILE"` — these are the only types with an example number for every country. Other values produce an empty placeholder for any country where libphonenumber has no example (e.g. `"PAGER"` only has examples for ~9% of countries).

View `intl-tel-input` with this set to `"FIXED_LINE"` in the [Playground](/playground?placeholderNumberType=FIXED_LINE#placeholderNumberType).

> [!TIP]
> You can either pass a string literal, e.g. `"MOBILE"`, or a [constant](/docs/types#constant-objects), e.g. `intlTelInput.NUMBER_TYPE.MOBILE` — useful where typos in the string literal won't be caught at compile time.



## Validation options

Adjust what is considered a valid number.

###### allowedNumberTypes
Type: `NumberType[] | null`  
Default: `["MOBILE", "FIXED_LINE"]`  
Vue: `allowed-number-types`

Set the [number type(s)](/docs/types#numbertype) to enforce during validation, as well as the maximum number length to enforce with [strictMode](#strictmode). Set it to `null` to not enforce any particular type (not recommended<sup>*</sup>). 

By default, it's set to `["MOBILE", "FIXED_LINE"]` so [`isValidNumber`](/docs/methods#isvalidnumber) (etc) will only return `true` for those kinds of numbers. Alternatively, you could set it to simply `["MOBILE"]` if you only wanted to accept mobile numbers as valid. _Note: previously named `validationNumberTypes`._

<sup>*</sup>It's best to be as specific as possible, rather than using the catch-all value of `null`. `isValidNumber` works by checking the number's length, and some number types allow very short lengths. For example, Norwegian mobile and landline numbers are 8 digits long, so by default that's the only valid length. But Norwegian UAN numbers can be only 5 digits long, so if you set `allowedNumberTypes` to `null`, validation will pass for any number that is 5-8 digits long.

Play with this option in the [Playground](/playground#allowedNumberTypes).

> [!TIP]
> You can also pass [constants](/docs/types#constant-objects), e.g. `allowedNumberTypes: [intlTelInput.NUMBER_TYPE.MOBILE, intlTelInput.NUMBER_TYPE.FIXED_LINE]` — useful in plain JavaScript where typos in the string literal won't be caught at compile time.

###### allowNumberExtensions
Type: `boolean`  
Default: `false`  
Vue: `allow-number-extensions`

Whether or not the validation methods return `true` for numbers containing extensions, e.g. "+1 702 123-1234 ext. 1234". 

Try toggling this option on/off on a number with an extension in the [Playground](/playground?value=%2B447947692123+ext.+12345&strictMode=false#allowNumberExtensions).

> [!NOTE]
> Not compatible with [`strictMode`](#strictmode) (which is enabled by default), as that will prevent the user from typing the extension in the first place. Disable `strictMode` to allow extensions to be entered.

> [!NOTE]
> [`getNumber`](/docs/methods#getnumber) defaults to E.164 format, which strips the extension. Use [`getExtension`](/docs/methods#getextension) to retrieve it separately, or call `getNumber` with `"INTERNATIONAL"`, `"NATIONAL"`, or `"RFC3966"` — those formats include the extension.

###### allowPhonewords
Type: `boolean`  
Default: `false`  
Vue: `allow-phonewords`

Whether or not the validation methods return `true` for numbers containing phonewords, e.g. "+1 702 FLOWERS".

When processing phoneword numbers, the core library will automatically convert them to digits e.g. via [`getNumber`](/docs/methods#getnumber), or when initialising the core library on an input containing a phoneword number. 

Note that the number must contain **at least 3 letters** for them to be treated as phoneword digits — fewer are treated as typos and stripped before validation. So e.g. `+44 7947 123ABC` becomes `+44 7947 123222` (valid), but `+44 7947 1234BC` becomes `+44 7947 1234` (invalid — too short).

> [!NOTE]
> Not compatible with [`strictMode`](#strictmode) (which is enabled by default), as that will prevent the user from typing letters in the first place. Disable `strictMode` to allow phonewords to be entered.



## Translation options

Localise country names and the core library UI strings, e.g. the country search placeholder.

###### countryNameLocale
Type: `string`  
Default: `"en"`  
Vue: `country-name-locale`

The locale to pass to `Intl.DisplayNames` to generate the country names. Should adhere to the [BCP 47](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag) standard, e.g. `"zh"` (Chinese), or `"zh-Hans"` (Simplified Chinese). To override individual country names, see [`countryNameOverrides`](#countrynameoverrides) below. For translating the other UI strings, like the country search placeholder, see [`uiTranslations`](#uitranslations) below. _Note: previously named `localizedCountries`._

Note: some browsers lack `Intl.DisplayNames` country-name data for certain locales (e.g. desktop Chrome lacks Armenian etc). For those locales we bundle a fallback via the `uiTranslations` option - see [Browser support caveat](/docs/localisation#browser-support-caveat).

View `intl-tel-input` in Hindi in the [Playground](/playground?uiTranslations=hi&initialCountry=in#uiTranslations).

###### countryNameOverrides
Type: `object`  
Default: `{}`  
Vue: `country-name-overrides`

Override individual country names, keyed by iso2 code. Useful when the name produced by [`countryNameLocale`](#countrynamelocale) doesn't match your preferred wording. Example use:

```js
{
  us: "United States of America",
}
```

View `intl-tel-input` with the US renamed to "United States of America" in the [Playground](/playground?countryNameOverrides=%7B%22us%22%3A%22United+States+of+America%22%7D&initialCountry=us#countryNameOverrides).

###### uiTranslations
Type: `object`  
Default: `{}`  
Vue: `ui-translations`

Translate the core library's UI strings (country search placeholder, no-results message, ARIA labels). For translating country names, see [`countryNameLocale`](#countrynamelocale) above; to override individual country names, see [`countryNameOverrides`](#countrynameoverrides).

We ship translations for [<!-- LOCALE_COUNT -->  locales](/docs/localisation#supported-ui-locales), named using the [BCP 47](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag) standard — import one and pass it in as the `uiTranslations` option:

```js
import { fr } from "intl-tel-input/locale";
```

See the [Localisation docs](/docs/localisation#localising-user-interface-strings) for overriding individual keys, defining custom translations, and the full list of translatable keys. _Note: previously named `i18n`._

View `intl-tel-input` in Ukrainian in the [Playground](/playground?uiTranslations=uk&initialCountry=ua#uiTranslations).



## Miscellaneous options

Extra features like hidden inputs and loading the utils module.

###### hiddenInputs
Type: `(telInputName: string) => { phone: string, country?: string }`  
Default: `null`  
Vue: `hidden-inputs`

Allows the creation of hidden input fields within a form, which, on submit, get populated with (1) the full international telephone number and (2) the selected country's iso2 code. This is useful for old-fashioned, page-load form submissions to ensure the full international number and iso2 code are captured, especially when [`numberDisplayFormat`](#numberdisplayformat) is `"NATIONAL"` or [`separateDialCode`](#separatedialcode) is enabled. [See example](/examples/vanilla-javascript/hidden-input).

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
Vue: `load-utils`

This is one way to lazy load the included utils.js (to enable formatting/validation, etc) - see [Loading The Utils Script](/docs/utils#loading-the-utils-script) for more options.

The `loadUtils` option takes a function that returns a Promise resolving to the utils module. You can `import` the utils module in different ways (examples below): (A) if you use a bundler like Webpack, Vite or Parcel, you can import it directly from the package, or (B) from a URL, either a CDN or your own hosted version of utils.js. _Note: this replaces the `utilsScript` option (now removed)._ 

(A) with a bundler, import the utils module directly from the package
```js
// modern bundlers will split this out into a separate chunk and fetch it only when needed
() => import("intl-tel-input/utils")
```

(B) import utils module from a URL (CDN or your own hosted version)
```js
() => import("https://cdn.jsdelivr.net/npm/intl-tel-input@29.1.2/dist/js/utils.js"),
```

The module is only loaded once the core library initialises, and additionally, only once the page has finished loading (on the window `load` event) to prevent blocking (the script is ~260KB). The `promise` property on the core library instance resolves once loading is complete — see [Utils Script](/docs/utils) for more information.
