# Accessibility

`intl-tel-input` aims to be accessible out of the box, but good accessibility also depends on how you integrate it into your form.


## Accessible naming

Make sure the telephone input has an *accessible name* — a human-readable description that assistive technologies (like screen readers) can announce to identify the field.

Recommended ways to provide one:

- Use a visible `<label>` connected via `for`/`id` (best for most forms)
- Or use `aria-label` / `aria-labelledby` if you can’t use a visible label

Example:

```html
<label for="phone">Phone number</label>
<input id="phone" type="tel" autocomplete="tel" />
```

> [!IMPORTANT]
> Although `intl-tel-input` adds its own ARIA attributes to the country UI, it's still up to you to give the underlying `<input>` an accessible name.


## Keyboard support

The country selector is fully keyboard-operable: focus the selected country button and press Up/Down/Space/Enter to open it, then use Up/Down to navigate, Enter to select, and Esc to close. With country search enabled, users can type to filter; otherwise typing jumps to matching countries like a native `<select>`.


## Screen reader support

`intl-tel-input` is built to work well with screen readers out of the box.

Its country list/search UI includes ARIA attributes to expose state and relationships (e.g. expanded state, controls relationships, listbox semantics), and it provides screen reader text for things like:

- The selected country button label (including the “no country selected” state)
- Country list label
- Search placeholder/label
- Clear-search button label
- A live summary of the number of matching results while searching

Translations for these accessibility strings are provided out of the box in [many languages](/docs/localisation#supported-ui-locales), and it's easy to override or add your own with the [`uiTranslations`](/docs/options#uitranslations) option.


## Reduced motion

The [`strictRejectAnimation`](/docs/options#strictrejectanimation) option automatically respects the user's `prefers-reduced-motion` setting. When reduced motion is requested by the OS or browser, the default shake animation is replaced with a subtle red background flash on the input — a non-motion equivalent that still communicates the rejection.
