# Best practices

General advice for getting the most out of `intl-tel-input`, whether you're using the [vanilla JavaScript library](/docs/vanilla-javascript) or one of the framework components ([React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component), [Svelte](/docs/svelte-component)).

## Contents

- [Load the utils module](#load-the-utils-module)
- [Store and restore numbers in E.164 format](#store-and-restore-numbers-in-e164-format)
- [Validate before saving](#validate-before-saving)
- [Keep strict mode on, with rejection feedback](#keep-strict-mode-on-with-rejection-feedback)
- [Set the initial country](#set-the-initial-country)
- [Translate the UI](#translate-the-ui)


## Load the utils module

Load [`utils.js`](/docs/utils#loading-the-utils-script) to enable formatting and validation.

## Store and restore numbers in E.164 format

Since the dial code is embedded in the number (e.g. `"+17024181234"`), you don't need to store the country separately. To read the number out in E.164, use [`getNumber`](/docs/methods#getnumber) (or your component's change callback / bound value). To restore it, pass the stored E.164 number as the input's starting value on initialisation — the plugin will automatically set the country<sup>*</sup> and format the number according to your options.

_<sup>*</sup>Except for some small satellite territories, which share number ranges with the main country, in which case we default to selecting the main country._

## Validate before saving

Check the number is valid before storing it, and reject invalid input. Get the validity from [`isValidNumber`](/docs/methods#isvalidnumber) (plugin) or the `onChangeValidity` / `validityChange` callback (components). Requires the utils module.

##### Deriving a user-facing error message

When a number is invalid, you'll get an error code (from [`getValidationError`](/docs/methods#getvalidationerror) for the plugin, or via the `onChangeErrorCode` / `errorCodeChange` callback for the components). Mapping the error codes to user-facing messages is left to you because the wording belongs to your app. Here is a reasonable starting point:

```js
const getErrorMessage = (number, errorCode) => {
  if (!number) return "Please enter a number";
  const genericError = "Invalid number";
  const { VALIDATION_ERROR } = intlTelInput;
  const errorMap = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: genericError,
  };
  return (errorCode && errorMap[errorCode]) || genericError;
};
```

## Keep strict mode on, with rejection feedback

[`strictMode`](/docs/options#strictmode) is on by default and rejects non-numeric characters while capping the length at the country's max as the user types. Just as importantly, the rejection shouldn't be silent — by default, [`strictRejectAnimation`](/docs/options#strictrejectanimation) plays a built-in shake/flash animation so the user notices. For richer feedback (e.g. a toast that explains _why_ the input was rejected), listen for the `strict:reject` event (plugin) or use the equivalent `onStrictReject` / `strictReject` callback (components).

## Set the initial country

If you know the user's country, set [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"`). If you don't, set it to `"auto"` along with the [`geoIpLookup`](/docs/options#geoiplookup) option to determine the country from their IP address — [see example](/examples/vanilla-javascript/lookup-country).

## Translate the UI

If you know the user's language, you can translate the country names and UI strings — see [Localisation](/docs/localisation).
