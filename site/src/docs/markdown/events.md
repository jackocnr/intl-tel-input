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

#### Worked example: Bootstrap toast

Here is a worked example showing a [Bootstrap toast](https://getbootstrap.com/docs/5.3/components/toasts/) with a contextual message when input is rejected.

First, add the toast markup alongside your input. The outer `toast-container` below pins the toast to the top-right of the viewport as a simple, portable default — adapt the utility classes to suit your layout (on this site, for example, we position the toast directly above the input):

```html
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="strictRejectToast" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
    <div class="d-flex">
      <div class="toast-body" id="strictRejectToastBody"></div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>
```

Then wire up the `strict:reject` listener to populate and show it:

```js
const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
const toast = bootstrap.Toast.getOrCreateInstance(toastEl);

input.addEventListener("strict:reject", (e) => {
  const { source, rejectedInput, reason } = e.detail;
  if (reason === "max-length") {
    toastBody.textContent = "Maximum length reached for this country";
  } else if (source === "paste") {
    toastBody.textContent = "Stripped invalid characters from pasted text";
  } else {
    toastBody.textContent = `Character not allowed: "${rejectedInput}"`;
  }
  toast.show();
});
```

