# Troubleshooting

## Contents

- [General](#general)
  - [Full-width input](#full-width-input)
  - [Country selector parent not closing on scroll](#country-selector-parent-not-closing-on-scroll)
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

##### Country selector parent not closing on scroll

If you are using the [`countrySelectorParent`](/docs/options#countryselectorparent) option and you have a scrolling container other than `window` which is causing problems by not closing the dropdown on scroll, simply listen for the scroll event on that element, and trigger a scroll event on `window`, which in turn will close the dropdown, e.g.

```js
scrollingElement.addEventListener("scroll", () => {
  window.dispatchEvent(new Event("scroll"));
});
```

##### Input margin

For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want a vertical margin, you should add it to the container (with class `iti`).

##### Placeholders

To get the automatic country-specific placeholder numbers, simply omit the placeholder attribute on the `<input>`, or set [`placeholderNumberPolicy`](/docs/options#placeholdernumberpolicy) to `"AGGRESSIVE"` to override any existing placeholder. Note: this requires the utils script to be loaded.

## Vanilla JavaScript library specifics

The following issues only apply to the [vanilla JavaScript library](/docs/vanilla-javascript) — the framework components handle them for you.

##### Displaying error messages

If your error handling code inserts an error message before the `<input>`, it will break the layout. Instead, you must insert it before the container (with class `iti`).

##### Dropdown position

The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise after the `<input>` is in the DOM.

## Still stuck?

Try searching the [GitHub issues](https://github.com/jackocnr/intl-tel-input/issues?q=is%3Aissue) — chances are someone has run into the same thing before.
