# Events

You can listen for the following events triggered on the `<input>` element.

## Contents

- [countrychange](#countrychange)
- [open:countrydropdown](#open-countrydropdown)
- [close:countrydropdown](#close-countrydropdown)
- [strict:reject](#strict-reject)


## countrychange

This is triggered when the selected country is updated, e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call [`setCountry`](/docs/methods#setcountry) etc.
The selected country data is available at `e.detail` (the same data returned by [`getSelectedCountryData`](/docs/methods#getselectedcountrydata)).

```js
input.addEventListener("countrychange", (e) => {
  // country data
  const { iso2, dialCode, name } = e.detail;
});
```

## open:countrydropdown

This is triggered when the user opens the dropdown.  

## close:countrydropdown

This is triggered when the user closes the dropdown.  

## strict:reject

Only fires when [`strictMode`](/docs/options#strictmode) is enabled. This is triggered when a keystroke or paste is rejected or modified by strict mode — e.g. the character is not allowed, or the input would exceed the maximum valid length for the selected country. Useful for giving the user feedback (e.g. a shake animation, toast, or aria-live announcement) instead of the input being silently dropped.

`e.detail` contains:
- `source`: `"key"` (a keystroke) or `"paste"` (clipboard paste)
- `rejectedInput`: the pressed key (e.g. `"a"`) or the raw pasted string
- `reason`: `"invalid"` (disallowed character(s)) or `"max-length"` (would exceed the max valid length)

```js
input.addEventListener("strict:reject", (e) => {
  const { source, rejectedInput, reason } = e.detail;
});
```

