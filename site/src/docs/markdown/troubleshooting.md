# Troubleshooting

## Contents

- [General](#general)
  - [Full-width input](#full-width-input)
  - [Dropdown container not closing on scroll](#dropdown-container-not-closing-on-scroll)
  - [Input margin](#input-margin)
  - [Placeholders](#placeholders)
- [Vanilla JavaScript library specifics](#vanilla-javascript-library-specifics)
  - [Displaying error messages](#displaying-error-messages)
  - [Dropdown position](#dropdown-position)


## General

##### Full-width input

If you want your input to be full-width, you need to set the container to be the same, i.e.

```css
.iti { width: 100%; }
```

##### Dropdown container not closing on scroll

If you are using the [`dropdownContainer`](/docs/options#dropdowncontainer) option and you have a scrolling container other than `window` which is causing problems by not closing the dropdown on scroll, simply listen for the scroll event on that element, and trigger a scroll event on `window`, which in turn will close the dropdown, e.g.

```js
scrollingElement.addEventListener("scroll", () => {
  window.dispatchEvent(new Event("scroll"));
});
```

##### Input margin

For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want a vertical margin, you should add it to the container (with class `iti`).

##### Placeholders

To get the automatic country-specific placeholder numbers, simply omit the placeholder attribute on the `<input>`, or set [`autoPlaceholder`](/docs/options#autoplaceholder) to `"aggressive"` to override any existing placeholder. Note: this requires the utils script to be loaded.

## Vanilla JavaScript library specifics

The following issues only apply to the [vanilla JavaScript library](/docs/vanilla-javascript) — the framework components handle them for you.

##### Displaying error messages

If your error handling code inserts an error message before the `<input>`, it will break the layout. Instead, you must insert it before the container (with class `iti`).

##### Dropdown position

The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise after the `<input>` is in the DOM.
