# Best practices

General advice for getting the most out of `intl-tel-input`, whether you're using the [JavaScript plugin](/docs/javascript-plugin) or one of the framework components ([React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component), [Svelte](/docs/svelte-component)).

## Load the utils module

Load [`utils.js`](/docs/utils#loading-the-utils-script) to enable formatting and validation.

## Store and restore numbers in E.164 format

Since the dial code is embedded in the number (e.g. `"+17024181234"`), you don't need to store the country separately. To read the number out in E.164, use [`getNumber`](/docs/methods#getnumber) (or your component's change callback / bound value). To restore it, pass the stored E.164 number as the input's starting value on initialisation — the plugin will automatically set the country<sup>*</sup> and format the number according to your options.

_<sup>*</sup>Except for some small satellite territories, which share number ranges with the main country, in which case we default to selecting the main country._

## Validate before saving

Check the number is valid before storing it, and reject invalid input. Get the validity from [`isValidNumber`](/docs/methods#isvalidnumber) (plugin) or the `onChangeValidity` / `validityChange` callback (components). Requires the utils module.

## Enable strict mode to prevent invalid input

Enable [`strictMode`](/docs/options#strictmode) to reject non-numeric characters and cap the length at the country's max as the user types. But, importantly, make sure to pair it with the `strict:reject` event or `onStrictReject` / `strictReject` callback to give feedback to the user (e.g. a toast or shake animation) so the rejection isn't silent, to avoid confusion.

## Set the initial country

If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/lookup-country).

## Translate the UI

If you know the user's language, you can translate the country names and UI strings — see [Localisation](/docs/localisation).
