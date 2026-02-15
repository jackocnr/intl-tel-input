# Events

You can listen for the following events triggered on the input element.

## countrychange

This is triggered when the selected country is updated, e.g. if the user selects a country from the dropdown, or they type a different dial code into the input, or you call [`setCountry`](/docs/methods#setcountry) etc.
```js
input.addEventListener("countrychange", () => {
  // do something with iti.getSelectedCountryData()
});
```

## open:countrydropdown

This is triggered when the user opens the dropdown.  

## close:countrydropdown

This is triggered when the user closes the dropdown.  
