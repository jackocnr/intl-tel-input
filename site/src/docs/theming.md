# Theming / Dark Mode

There are lots of CSS variables available for theming. See [intlTelInput.scss](https://github.com/jackocnr/intl-tel-input/blob/master/src/css/intlTelInput.scss) for the full list.

Dark mode example (with screenshot below):
```css
@media (prefers-color-scheme: dark) {
  .iti {
    --iti-border-color: #5b5b5b;
    --iti-dialcode-color: #999999;
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
<img src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/vanilla-dark.png" alt="Screenshot" width="263" height="269" />
