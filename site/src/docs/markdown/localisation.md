# Localisation

intl-tel-input supports localisation of country names, UI strings, right-to-left layout, and alternative numerals. You can experiment with the different options in the [Playground](/playground?countryNameLocale=ru&i18n=ru#translation-options), or view the [Right to left example](/examples/right-to-left).

## Contents

- [Localising country names](#localising-country-names)
- [Localising user interface strings](#localising-user-interface-strings)
- [Right-to-left (RTL) languages](#right-to-left-rtl-languages)
- [Alternative numerals](#alternative-numerals)


## Localising country names

Country names are generated using the native `Intl.DisplayNames` API, which supports hundreds of locales out of the box. Use the [`countryNameLocale`](/docs/options#countrynamelocale) option to specify the locale (a BCP 47 language tag):

```js
intlTelInput(input, {
  countryNameLocale: "fr", // French
});
```

You can also override individual country names via the [`i18n`](/docs/options#i18n) option by providing iso2 keys (e.g. `"gb"`, `"us"`):

```js
intlTelInput(input, {
  countryNameLocale: "fr",
  i18n: {
    gb: "Royaume-Uni",
  },
});
```

## Localising user interface strings

Use the [`i18n`](/docs/options#i18n) option to translate the plugin’s user interface strings (e.g. the country search placeholder, no-results message, and various accessibility labels).

We provide translations for many languages in the `intl-tel-input/i18n` entrypoint, so you can import the one you need and pass it in:

```js
import { fr } from "intl-tel-input/i18n";

intlTelInput(input, {
  i18n: fr,
});
```

You can override one or more keys by spreading the provided translations:

```js
import { fr } from "intl-tel-input/i18n";

intlTelInput(input, {
  i18n: {
    ...fr,
    searchPlaceholder: "Rechercher un pays",
  },
});
```

### Supported languages

Currently, we support the following <!-- I18N_LANGUAGE_COUNT --> languages:

<!-- I18N_LANGUAGE_LIST -->

Don't see your language? It's easy to contribute a new language yourself — see [Adding a new translation](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#adding-a-new-translation).

Alternatively, you can specify your own translations inline by passing a custom object to the [`i18n`](/docs/options#i18n) option.


## Right-to-left (RTL) languages

On RTL sites (i.e. where `dir="rtl"` is set on the `<html>` element, or any other ancestor of the plugin), the plugin layout will automatically flow right-to-left.

Phone numbers and dial codes are still displayed left-to-right, as that’s the standard way to write telephone numbers.

See the [Right to left example](/examples/right-to-left).


## Alternative numerals

intl-tel-input supports alternative numerals for phone number input.

- Arabic-Indic digits: ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
- Persian / Extended Arabic-Indic digits: ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

These are normalised internally to ASCII `0-9` for parsing/validation, and when the plugin updates the input value it preserves the user’s numeral set.

> [!NOTE]
> Format-as-you-type is automatically disabled when the user types non-ASCII digits, since caret positioning gets unreliable with RTL numeral sets.
