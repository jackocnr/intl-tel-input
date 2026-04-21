# Accessibility

intl-tel-input aims to be accessible out of the box, but good accessibility also depends on how you integrate it into your form.

This page covers:

- How the country dropdown and search are exposed to assistive tech
- Keyboard interaction
- What you should do to ensure the phone input has an accessible name and helpful errors
- How to translate the plugin’s accessibility strings


## Contents

- [Accessible naming](#accessible-naming)
- [Keyboard support](#keyboard-support)
- [Screen reader support](#screen-reader-support)
- [Translating accessibility strings](#translating-accessibility-strings)
- [Form validation and errors](#form-validation-and-errors)


## Accessible naming

Make sure the telephone input has an accessible name.

Recommended:

- Use a visible `<label>` connected via `for`/`id` (best for most forms)
- Or use `aria-label` / `aria-labelledby` if you can’t use a visible label

Example:

```html
<label for="phone">Phone number</label>
<input id="phone" type="tel" autocomplete="tel" />
```

> [!IMPORTANT]
> The plugin injects its own country UI next to the input, but it does not replace the need for your input to have an accessible name.


## Keyboard support

When the dropdown is enabled, the country selector can be operated with the keyboard:

- From the country button, press Up/Down, Space, or Enter to open the dropdown
- Press Esc to close the dropdown (focus returns to the country button)
- Use Up/Down to move through countries
- Press Enter to select the highlighted country
- If country search is disabled, typing letters will jump to matching countries (like a native `<select>`)

If the country search input is enabled, users can type to filter the list.


## Screen reader support

The plugin’s dropdown/search UI includes ARIA attributes to expose state and relationships (e.g. expanded state, controls relationships, listbox semantics), and it provides screen reader text for things like:

- The selected country button label (including the “no country selected” state)
- Country list label
- Search placeholder/label
- Clear-search button label
- A live summary of the number of matching results while searching


## Translating accessibility strings

If you localise the UI using the [`i18n`](/docs/options#i18n) option, that also covers the accessibility strings listed above (placeholders and ARIA labels).

See the [Localisation docs](/docs/localisation) for the full list of locales and how to provide your own.


## Form validation and errors

intl-tel-input can help you validate numbers (see the [Initialisation options](/docs/options) and the [Validation examples](/examples/validation-practical)), but you are responsible for presenting validation errors accessibly.

General guidance:

- Use a clear, specific error message text
- Ensure the error is programmatically associated with the input (e.g. `aria-describedby`)
- Don’t rely on color alone to convey an error state
