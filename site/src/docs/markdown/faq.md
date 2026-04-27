# FAQ

## Contents

- [Do I need the utils script?](#do-i-need-the-utils-script)
- [What format should I store phone numbers in?](#what-format-should-i-store-phone-numbers-in)
- [How do I submit the full international number in a normal HTML form?](#how-do-i-submit-the-full-international-number-in-a-normal-html-form)
- [How do I set the initial country?](#how-do-i-set-the-initial-country)
- [Can I translate the UI and country names?](#can-i-translate-the-ui-and-country-names)
- [How do I validate a number?](#how-do-i-validate-a-number)
- [Something looks broken — where should I look first?](#something-looks-broken--where-should-i-look-first)


## Do I need the utils script?

It depends on which features you want.

The utils script enables things like:

- Formatting and validation helpers
- Automatic country-specific placeholders

See [Utils script](/docs/utils) for how to load it and what it’s used for.


## What format should I store phone numbers in?

In most cases you should store phone numbers in standardised international format ([E.164](https://en.wikipedia.org/wiki/E.164)), e.g. `+447740123456`. That way, you can just store a single string that contains all the information you need (the phone number and the country it belongs to).

You can always get the E.164 number using [`getNumber`](/docs/methods#getnumber), even if the user has entered their number in national format, or `separateDialCode` is enabled. For displaying numbers back to the user (e.g. on a user profile page), simply initialise it on an input containing an E.164 number, and it will automatically select the right flag and format the number according to your settings (national format by default).


## How do I submit the full international number in a normal HTML form?

Use the [`hiddenInput`](/docs/options#hiddeninput) option.

That option listens for the form submit event and injects hidden input(s) containing the full international number (and optionally the selected country's iso2 code), so they’re included in the form post.

See the [Hidden input example](/examples/vanilla-javascript/hidden-input).



## How do I set the initial country?

Use the [`initialCountry`](/docs/options#initialcountry) option.

- If you already know the user's country, set it to the relevant iso2 code, e.g. `"us"`.
- Or set it to `"auto"` and provide [`geoIpLookup`](/docs/options#geoiplookup) to detect the user’s country.


## Can I translate the UI and country names?

Yes.

- Country names can be localised using [`countryNameLocale`](/docs/options#countrynamelocale) (uses `Intl.DisplayNames`).
- UI strings (including accessibility strings) can be translated using [`i18n`](/docs/options#i18n).

See [Localisation](/docs/localisation) for more information.


## How do I validate a number?

If you’re using the utils script, you can validate numbers and show useful error messages.

- See the [Validation example](/examples/vanilla-javascript/validation)
- See the [Utils script](/docs/utils)


## Something looks broken — where should I look first?

A lot of “broken” behaviour is caused by layout/CSS or initialising on an input that isn't in the DOM yet. Check devtools: is the CSS loading? Have you overridden the flag paths correctly, and are the flag images loading?

Also see [Troubleshooting](/docs/troubleshooting).
