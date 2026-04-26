# Localisation

intl-tel-input supports localisation of country names, UI strings, right-to-left layout, and alternative numerals. You can experiment with the different options in the [Playground](/playground?countryNameLocale=ru&i18n=ru#translation-options), or view the [Right to left example](/examples/javascript-plugin/right-to-left).

## Contents

- [Localising country names](#localising-country-names)
- [Localising user interface strings](#localising-user-interface-strings)
- [Right-to-left (RTL) languages](#right-to-left-rtl-languages)
- [Alternative numerals](#alternative-numerals)


## Localising country names

Country names are generated using the native `Intl.DisplayNames` API, which supports hundreds of locales out of the box. Use the [`countryNameLocale`](/docs/options#countrynamelocale) option to specify the locale — a BCP 47 language tag, e.g. `"fr"` for French.

You can also override individual country names via the [`countryNameOverrides`](/docs/options#countrynameoverrides) option, by passing an object keyed by iso2 code:

```js
{
  us: "États-Unis",
}
```

## Localising user interface strings

Use the [`i18n`](/docs/options#i18n) option to translate the user interface strings (e.g. the country search placeholder, no-results message, and various accessibility labels).

We provide translations for many locales in the `intl-tel-input/i18n` entrypoint — import the one you need and pass it into the [`i18n`](/docs/options#i18n) option:

```js
import { fr } from "intl-tel-input/i18n";
```

You can override one or more keys by spreading the provided translations — pass the following as [`i18n`](/docs/options#i18n):

```js
{
  ...fr,
  // override UI translation (the country search placeholder)
  searchPlaceholder: "Rechercher",
}
```

### Supported UI locales

We currently ship user interface translations for the following <!-- I18N_LOCALE_COUNT --> locales:

<!-- I18N_LOCALE_LIST -->

Don't see your locale? It's easy to contribute a new one yourself — see [Adding a new translation](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#adding-a-new-translation).

Alternatively, you can specify your own translations inline by passing a custom object to the [`i18n`](/docs/options#i18n) option — see the full list of translatable keys below.

### Translatable keys

Here is the full set of UI strings the [`i18n`](/docs/options#i18n) option accepts, shown with their default English values for reference:

```js
{
  // Aria label for the selected country element, when there is a country selected
  selectedCountryAriaLabel: "Change country for phone number, currently selected ${countryName} (${dialCode})",
  // Aria label and title text for the selected country element, when no country is selected
  noCountrySelected: "Select country for phone number",
  // Aria label for the country list element
  countryListAriaLabel: "List of countries",
  // Placeholder for the search input in the dropdown
  searchPlaceholder: "Search",
  // Aria label for the clear search button
  clearSearchAriaLabel: "Clear search",
  // Visible text for when the search produces no results
  searchEmptyState: "No results found",
  // Screen reader summary of search results
  searchSummaryAria(count) {
    if (count === 0) return "No results found";
    if (count === 1) return "1 result found";
    return `${count} results found`;
  },
}
```


## Right-to-left (RTL) languages

On RTL sites (i.e. where `dir="rtl"` is set on the `<html>` element, or any other ancestor), the layout will automatically flow right-to-left.

Phone numbers and dial codes are still displayed left-to-right, as that’s the standard way to write telephone numbers.

See the [Right to left example](/examples/javascript-plugin/right-to-left).


## Alternative numerals

intl-tel-input supports alternative numerals for phone number input.

- Arabic-Indic digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
- Persian / Extended Arabic-Indic digits: ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

These are normalised internally to ASCII `0-9` for parsing/validation, and when the input value is updated it preserves the user’s numeral set.

> [!NOTE]
> Format-as-you-type is automatically disabled when the user types non-ASCII digits, since caret positioning gets unreliable with RTL numeral sets.
