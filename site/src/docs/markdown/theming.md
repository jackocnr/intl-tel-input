# Theming / dark mode

There are lots of CSS variables available for theming. See [intlTelInput.scss](https://github.com/jackocnr/intl-tel-input/blob/master/src/css/intlTelInput.scss) for the full list.

Dark mode example (with screenshot below):
```css
@media (prefers-color-scheme: dark) {
  .iti {
    --iti-border-color: #5b5b5b;
    --iti-dropdown-bg: #0d1117;
    --iti-icon-color: #aaaaaa;
    --iti-hover-color: #30363d;
  }
}
```

NOTE: this assumes you already have your own dark mode styling in place for general body/input styling, e.g. something like this:

```css
@media (prefers-color-scheme: dark) {
  body, input {
    color: white;
    background-color: #0d1117;
  }
  input {
    border-color: #5b5b5b;
  }
  input::placeholder {
    color: #8d96a0;
  }
}
```

Example:  
<img src="/img/iti-dark-theme.png" alt="Screenshot" width="270" height="280" />

## Scaling down the flag images

The flags are rendered at a generous default size so they look crisp on high-DPI displays. If they're too big for your design, you can shrink them in the CSS by overriding a single variable `--iti-flag-width`. The height is derived automatically from the 4:3 aspect ratio, and the sprite offsets scale along with it, so every flag stays aligned.

```css
:root {
  --iti-flag-width: 16px;
}
```

If you need a non-4:3 box around the flag (e.g. a square placeholder), override `--iti-flag-height` as well.

NOTE: scaling *up* past the default is not recommended — the sprite is rasterised at a fixed resolution and will look soft if enlarged. To show larger flags than the default, re-generate the sprite at a higher resolution instead.
