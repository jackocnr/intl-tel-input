# Types

Reference for the public types and constant objects exposed by the core library. Methods, options, and component docs link here instead of restating the values inline.

## Contents

- [NumberFormat](#numberformat)
- [NumberType](#numbertype)
- [ValidationError](#validationerror)
- [Country](#country)
- [Constant objects](#constant-objects)

## NumberFormat
Format passed to [`getNumber`](/docs/methods#getnumber). One of:

- `"E164"` — international, no formatting (the default), e.g. `"+17024181234"`.
- `"INTERNATIONAL"` — international, formatted, e.g. `"+1 702-418-1234"`.
- `"NATIONAL"` — national, formatted, e.g. `"(702) 418-1234"`.
- `"RFC3966"` — RFC 3966 `tel:` URI, e.g. `"tel:+1-702-418-1234"`.

## NumberType
The kind of phone number. Returned by [`getNumberType`](/docs/methods#getnumbertype) and used by [`placeholderNumberType`](/docs/options#placeholdernumbertype) and [`allowedNumberTypes`](/docs/options#allowednumbertypes). One of:

- `"FIXED_LINE"` — landline.
- `"MOBILE"` — mobile / cellular.
- `"FIXED_LINE_OR_MOBILE"` — could be either; see note below.
- `"TOLL_FREE"` — toll-free (e.g. `+1 800…`).
- `"PREMIUM_RATE"` — premium-rate.
- `"SHARED_COST"` — shared-cost.
- `"VOIP"` — VoIP.
- `"PERSONAL_NUMBER"` — personal number.
- `"PAGER"` — pager.
- `"UAN"` — universal access number.
- `"VOICEMAIL"` — voicemail access number.
- `"UNKNOWN"` — type couldn't be determined.

> [!NOTE]
> In some countries (e.g. the US) there's no way to differentiate between fixed-line and mobile numbers, so in those cases libphonenumber returns `"FIXED_LINE_OR_MOBILE"`. If you're checking for mobile numbers, check for both `"MOBILE"` and `"FIXED_LINE_OR_MOBILE"`.

## ValidationError
Returned by [`getValidationError`](/docs/methods#getvalidationerror) and the wrapper components' `onChangeErrorCode` / `errorCodeChange` callback. One of:

- `"IS_POSSIBLE"` — the number is valid.
- `"INVALID_COUNTRY_CODE"` — no country has been selected, or the dial code doesn't match any country.
- `"TOO_SHORT"` — number is shorter than the minimum length for the country.
- `"TOO_LONG"` — number exceeds the maximum length for the country.
- `"IS_POSSIBLE_LOCAL_ONLY"` — the number is only valid as a local (intra-area) number.
- `"INVALID_LENGTH"` — length is invalid in some other way.

See [Show a user-facing error message](/docs/best-practices#show-a-user-facing-error-message) for a worked example.

## Country
The shape of each country in the core library's internal data, returned by [`getCountryData`](/docs/methods#getcountrydata) and [`getSelectedCountryData`](/docs/methods#getselectedcountrydata). Properties:

- `name` (`string`): Localised country name (e.g. `"Afghanistan"`). Only populated after the core library has been initialised.
- `iso2` (`string`): Two-letter [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (e.g. `"af"`).
- `dialCode` (`string`): International dial code, without the leading `+` (e.g. `"93"`).
- `priority` (`number`): Sort order when multiple countries share a dial code — lower comes first (e.g. for `+1`, US has priority `0`, Canada `1`).
- `areaCodes` (`string[] | null`): Area codes used to disambiguate countries that share a dial code (e.g. NANP), or `null` if none.
- `nationalPrefix` (`string | null`): The trunk prefix used for domestic calls (e.g. `"0"` in the UK), or `null` if none.

## Constant objects
`intlTelInput.NUMBER_FORMAT`, `intlTelInput.NUMBER_TYPE`, and `intlTelInput.VALIDATION_ERROR` are constant objects whose values are exactly the string unions above (e.g. `intlTelInput.VALIDATION_ERROR.TOO_SHORT === "TOO_SHORT"`). Use them when you want typo-safe property access — e.g. as keys in a lookup table, especially in plain JavaScript where typed string literals don't help.
