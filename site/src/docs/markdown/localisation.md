# Localisation

intl-tel-input supports localisation in a few different areas:

- Country names in the dropdown
- User interface strings (search placeholder, empty state, aria-labels, etc.)
- Right-to-left (RTL) layout

If you want to see this in action first, check out the [Internationalisation example](/examples/internationalisation) and the [Right to left example](/examples/right-to-left).

## Contents

- [Localising country names](#localising-country-names)
- [Localising user interface strings](#localising-user-interface-strings)
- [Right-to-left (RTL) languages](#right-to-left-rtl-languages)
- [Alternative numerals](#alternative-numerals)
- [Browser support / fallbacks](#browser-support--fallbacks)


## Localising country names

Country names are generated using the native `Intl.DisplayNames` API.

Use the [`countryNameLocale`](/docs/options#countrynamelocale) option to specify the locale (a BCP 47 language tag):

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


<div class="article-ad">
  <ins class="adsbygoogle"
    style="display:block; text-align:center;"
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-1090343328224651"
    data-ad-slot="6972377388"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>

## Localising user interface strings

Use the [`i18n`](/docs/options#i18n) option to translate the plugin’s user interface strings (search placeholder, empty state, aria-labels, etc.).

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

<!-- I18N_LANGUAGE_LIST -->

Don't see your language? You can provide your own translations by passing a custom object to the [`i18n`](/docs/options#i18n) option, and it's also easy to contribute a new language module — see [Adding a new translation](https://github.com/jackocnr/intl-tel-input/blob/master/.github/CONTRIBUTING.md#adding-a-new-translation).

For the full list of supported keys (and how to provide your own translations), see the [`i18n` option docs](/docs/options#i18n).


## Right-to-left (RTL) languages

For RTL languages, add `dir="rtl"` to the plugin container (or another appropriate ancestor) so the layout flows right-to-left.

Phone numbers and dial codes are still displayed left-to-right, as that’s the standard way to write telephone numbers.

See the [Right to left example](/examples/right-to-left).


## Alternative numerals

intl-tel-input supports alternative numerals for phone number input.

- Arabic-Indic digits (U+0660–U+0669)
- Persian / Extended Arabic-Indic digits (U+06F0–U+06F9)

These are normalised internally to ASCII `0-9` for parsing/validation, and when the plugin updates the input value it preserves the user’s numeral set.

Note: format-as-you-type is only applied when the user is typing ASCII digits (caret positioning gets unreliable with RTL numeral sets).
