# Theming / dark mode

The core library exposes a set of CSS variables (all prefixed `--iti-`) that you can override on `:root` (or any ancestor of the input) to customise colours, spacing, and icon sizes.

## Contents

- [Supported CSS variables](#supported-css-variables)
- [Dark mode](#dark-mode)
- [Scaling down the flag images](#scaling-down-the-flag-images)


## Supported CSS variables

##### Colour variables

###### --iti-hover-color
Default: `rgba(0, 0, 0, 0.05)`  

Hover background for the selected-country button and dropdown items.

###### --iti-border-color
Default: `#ccc`  

Dropdown border and the divider under the country search input.

###### --iti-dropdown-bg
Default: `white`  

Dropdown background.

###### --iti-icon-color
Default: `#555`  

Colour of the arrow, globe, search, clear, and check icons.

###### --iti-strict-reject-flash-color
Default: `rgba(255, 0, 0, 0.12)`  

Flash colour used by [`strictRejectAnimation`](/docs/options#strictrejectanimation) for users with `prefers-reduced-motion`.

##### Spacing & sizing variables

###### --iti-spacer-horizontal
Default: `10px`  

Horizontal spacing around the flag, country name, and icons.

###### --iti-border-width
Default: `1px`  

Border width used for the dropdown and divider. Should match your input's border width.

###### --iti-mobile-popup-margin
Default: `30px`  

Margin around the fullscreen popup on mobile.

##### Dropdown arrow variables

###### --iti-arrow-size
Default: `5px`  

Arrow size.

###### --iti-arrow-width
Default: `1.5px`  

Arrow line thickness.

###### --iti-arrow-padding
Default: `7px`  

Padding around the arrow.

##### Icon variables

###### --iti-globe-icon-size
Default: `17px`  

Size of the globe icon (empty state) and the search icon.

###### --iti-clear-icon-size
Default: `15px`  

Size of the search clear button and the selected-country check icon.

##### Flag variables

###### --iti-flag-width
Default: `20px`  

Flag width. The sprite offsets and height scale from this — see [Scaling down the flag images](#scaling-down-the-flag-images).

###### --iti-flag-height
Default: `calc(var(--iti-flag-width) * 3 / 4)`  

Flag height. Derived from width via the 4:3 aspect ratio; override only if you need a non-4:3 box, e.g. you're providing your own flags.

###### --iti-path-flags-1x
Default: `url('../img/flags.webp')`  

1x flag sprite URL. Override to serve the sprite from your own host/CDN.

###### --iti-path-flags-2x
Default: `url('../img/flags@2x.webp')`  

2x (retina) flag sprite URL. Override to serve the sprite from your own host/CDN.


## Dark mode

Dark mode example (with screenshot below):
```css
@media (prefers-color-scheme: dark) {
  :root {
    --iti-border-color: #495057;
    --iti-dropdown-bg: #212529;
    --iti-icon-color: #dee2e6;
    --iti-hover-color: #30363d;
  }
}
```

> [!NOTE]
> This assumes you already have your own dark mode styling in place for general body/input styling, e.g. something like this:

```css
@media (prefers-color-scheme: dark) {
  body, input {
    color: #dee2e6;
    background-color: #212529;
  }
  input {
    border-color: #495057;
  }
  input::placeholder {
    color: #666;
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

> [!WARNING]
> Scaling *up* past the default is not recommended — the sprite is rasterised at a fixed resolution and will look soft if enlarged. To show larger flags than the default, re-generate the sprite at a higher resolution instead.
